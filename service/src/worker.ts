/*
 * middots sync service - a Cloudflare Worker that keeps a middots reader's state
 * (settings, drafts, fold states, the page he was on) and uploaded fonts, so every
 * device that knows the same code sees the same thing.
 *
 * Codes, first come first served
 *   There are no accounts. A code (4 to 64 characters of any kind, chosen by the reader)
 *   is the key to one bucket. The first device to use a code that nobody has used
 *   claims it: a new bucket is made and bound to it. Any later device that types the
 *   same code joins that bucket. The page asks before claiming, so a typo does not
 *   silently start an empty bucket.
 *   The service never stores a code: a bucket is named by HMAC(CODE_SECRET, code).
 *   A joined device gets a signed token and keeps it, so the code is typed once per device.
 *
 * How strong is this (honestly)
 *   A bucket is exactly as private as its code. A 4-digit code is one of 10,000; a
 *   short code can be found by guessing. The service slows guessing down - every
 *   address gets 10 tries per 15 minutes (the wait doubles each time it runs out),
 *   and after 300 lookups of unknown codes in an hour from anywhere, joining pauses
 *   for everyone for an hour - but a longer code is the real protection.
 *   Stored data is encrypted (AES-GCM) with a key made from DATA_KEY and the code, so
 *   the storage alone is unreadable; for a short code that encryption is only as
 *   strong as the code. Whoever runs the Cloudflare account could read buckets while
 *   serving them - this is convenience sync, not a vault.
 *
 * Storage (one KV namespace, binding SYNC)
 *   b:<bucket>:state          the latest state: rev (a counter), saved time, state
 *   b:<bucket>:fonts          the list of uploaded fonts
 *   b:<bucket>:font:<slug>    one uploaded font (bytes)
 *   b:<bucket>:archive        the reader's pieces (pieces.json shape)
 *   b:<bucket>:audio:<file>   a recording's size and slicing; :audio:<file>:<i> holds slice i
 *   b:<bucket>:moved          set when the code was changed: the bucket's tokens are refused
 *   lock:<ip>, lock:all       guessing limits (expire on their own)
 *
 * Endpoints (JSON; everything but /join needs "Authorization: Bearer <token>")
 *   POST   /join            {code, claim?} -> {token, created}; {exists: false} (404) when the code is
 *                           unused and claim is not set - the page then asks before claiming
 *   GET    /state           -> {rev, saved, state} (rev 0 when nothing is saved yet)
 *   PUT    /state           {baseRev, state} -> {rev}; 409 with the current copy if baseRev is behind
 *   GET    /fonts           -> {fonts: [{slug, name, file}]}
 *   GET    /fonts/<slug>    -> the font bytes
 *   PUT    /fonts/<slug>?name=&file=   body: font bytes
 *   DELETE /fonts/<slug>
 *   GET    /archive         -> the reader's own pieces (pieces.json shape); 404 when the code has none
 *   PUT    /archive         body: that JSON
 *   GET    /audio/<file>?t=<token>   a recording, in 1 MB slices (HTTP Range, 206). The token rides in the
 *                           query because an <audio> element can't send headers; no Origin is needed here
 *   PUT    /audio/<file>/<i>    one encrypted 1 MB slice; PUT /audio/<file> {size, chunk, n} finishes it
 *   POST   /rekey/start     {code} -> {keys: n}; 409 when the new code is taken
 *   POST   /rekey/move      {code, i} -> moves entry i (decrypt with the old key, encrypt with the new)
 *   POST   /rekey/finish    {code} -> {token}; the old code stops working, other devices are signed out
 *
 * Changing the code
 *   The bucket's name and its encryption key both come from the code, so a new code means a new
 *   bucket: every entry is re-encrypted into it and the old one is deleted. The page drives it one
 *   entry per request (a recording slice is 1 MB) so no request runs past the Worker's time limit.
 *   The old bucket keeps only a "moved" marker, and a token for a moved bucket is refused, so the
 *   old code's devices are signed out. (Claiming the old code again later clears the marker.)
 *
 * Private archive
 *   The published pieces and their recordings are not in the public site. They live in the owner's
 *   bucket (encrypted like everything else) and reach a page only after it has joined with that code.
 *
 * Free-plan note: Workers KV on the free plan allows 1,000 writes a day for the
 * whole service; the page batches its saves to stay far below that.
 */

export interface Env {
    SYNC: KVNamespace;
    CODE_SECRET: string; // names buckets: HMAC(CODE_SECRET, code)
    TOKEN_SECRET: string; // signs device tokens; changing it signs every device out
    DATA_KEY: string; // with the code, makes each bucket's encryption key
    ALLOWED_ORIGIN: string; // https://goreda.github.io (plus http://localhost:* while testing)
}

const MAX_FONT = 10 * 1024 * 1024;
const CHUNK = 1024 * 1024; // recordings are stored and served in slices this big, so no request decrypts a whole file
const enc = new TextEncoder();

/* ---- small helpers ---- */
const hex = (b: ArrayBuffer) => [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join('');
const b64 = (b: ArrayBuffer) => btoa(String.fromCharCode(...new Uint8Array(b)));
const unb64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

function cors(env: Env, req: Request): Record<string, string> {
    const origin = req.headers.get('Origin') ?? '';
    const ok = origin === env.ALLOWED_ORIGIN || (env.ALLOWED_ORIGIN.includes('localhost') && /^http:\/\/localhost(:\d+)?$/.test(origin));
    return ok
        ? { 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Headers': 'Authorization, Content-Type', 'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE', Vary: 'Origin' }
        : {};
}

function json(body: unknown, status: number, headers: Record<string, string>) {
    return new Response(JSON.stringify(body), { status, headers: { ...headers, 'Content-Type': 'application/json' } });
}

/* constant-time compare, so a wrong PIN or token takes as long as a right one */
function same(a: string, b: string) {
    if (a.length !== b.length) return false;
    let d = 0;
    for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
    return d === 0;
}

/* ---- tokens: "<bucket>.<key>.<hmac>" ----
   The bucket's data key is carried inside the token (it is derived from the code, which
   the service does not keep), so a device can read its bucket without the code again. */
async function hmacHex(secret: string, msg: string) {
    const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    return hex(await crypto.subtle.sign('HMAC', key, enc.encode(msg)));
}
interface Device { bucket: string; key: CryptoKey }
async function device(env: Env, req: Request, token?: string): Promise<Device | null> {
    const [bucket, k, sig] = (token ?? (req.headers.get('Authorization') ?? '').replace(/^Bearer /, '')).split('.');
    if (!bucket || !k || !sig || !same(sig, await hmacHex(env.TOKEN_SECRET, `${bucket}.${k}`))) return null;
    // a changed code leaves a "moved" marker on its old bucket; tokens for it stop working here
    if ((await env.SYNC.get(`b:${bucket}:moved`)) !== null) return null;
    return { bucket, key: await crypto.subtle.importKey('raw', unb64(k.replace(/-/g, '+').replace(/_/g, '/')), 'AES-GCM', false, ['encrypt', 'decrypt']) };
}
async function bucketKeyBytes(env: Env, code: string) {
    return unb64(b64(await crypto.subtle.sign('HMAC', await crypto.subtle.importKey('raw', unb64(env.DATA_KEY), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']), enc.encode('data:' + code))));
}

/* ---- encryption at rest ---- */
async function seal(d: Device, plain: ArrayBuffer): Promise<ArrayBuffer> {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, d.key, plain);
    const out = new Uint8Array(12 + ct.byteLength);
    out.set(iv);
    out.set(new Uint8Array(ct), 12);
    return out.buffer;
}
async function unseal(d: Device, sealed: ArrayBuffer): Promise<ArrayBuffer> {
    const b = new Uint8Array(sealed);
    return crypto.subtle.decrypt({ name: 'AES-GCM', iv: b.slice(0, 12) }, d.key, b.slice(12));
}
async function getJson<T>(env: Env, d: Device, key: string): Promise<T | null> {
    const raw = await env.SYNC.get(`b:${d.bucket}:${key}`, 'arrayBuffer');
    return raw ? JSON.parse(new TextDecoder().decode(await unseal(d, raw))) : null;
}
async function putJson(env: Env, d: Device, key: string, value: unknown) {
    await env.SYNC.put(`b:${d.bucket}:${key}`, await seal(d, enc.encode(JSON.stringify(value)).buffer as ArrayBuffer));
}

/* the bucket name, key and token for a code */
async function forCode(env: Env, code: string) {
    const bucket = (await hmacHex(env.CODE_SECRET, 'bucket:' + code)).slice(0, 32);
    const raw = await bucketKeyBytes(env, code);
    const k = b64(raw.buffer as ArrayBuffer).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const key = await crypto.subtle.importKey('raw', raw, 'AES-GCM', false, ['encrypt', 'decrypt']);
    return { bucket, key, token: `${bucket}.${k}.${await hmacHex(env.TOKEN_SECRET, `${bucket}.${k}`)}` };
}

/* ---- join: claim a new code or join an existing one, with guessing limits ---- */
interface Lock { tries: number; until: number; strikes: number }
// any typable sign: letters, digits, symbols, spaces, any script or emoji; only control characters are out.
// Length counts characters (code points), 4 to 64.
const CODE_OK = (c: unknown): c is string => typeof c === 'string' && !/[\u0000-\u001f\u007f]/.test(c) && Array.from(c).length >= 4 && Array.from(c).length <= 64;

async function join(env: Env, req: Request, h: Record<string, string>) {
    const ip = req.headers.get('CF-Connecting-IP') ?? 'unknown';
    const now = Date.now();
    const mine: Lock = (await env.SYNC.get(`lock:${ip}`, 'json')) ?? { tries: 0, until: 0, strikes: 0 };
    const all: Lock = (await env.SYNC.get('lock:all', 'json')) ?? { tries: 0, until: 0, strikes: 0 };
    const wait = Math.max(mine.until, all.until) - now;
    if (wait > 0) return json({ error: 'locked', retryInSeconds: Math.ceil(wait / 1000) }, 429, h);

    const { code, claim } = (await req.json().catch(() => ({}))) as { code?: string; claim?: boolean };
    if (!CODE_OK(code)) return json({ error: 'a code is 4 to 64 characters' }, 400, h);

    // every attempt from this address counts; 10 per window, then a wait that doubles
    mine.tries++;
    if (mine.tries >= 10) { mine.strikes++; mine.until = now + 15 * 60_000 * 2 ** (mine.strikes - 1); mine.tries = 0; }
    await env.SYNC.put(`lock:${ip}`, JSON.stringify(mine), { expirationTtl: 7 * 86400 });

    const { bucket, token } = await forCode(env, code);
    const exists = (await env.SYNC.get(`b:${bucket}:claimed`)) !== null;
    if (!exists && !claim) {
        // an unknown code: count it overall, so wide guessing pauses joining for an hour
        all.tries++;
        if (all.tries >= 300) { all.until = now + 60 * 60_000; all.tries = 0; }
        await env.SYNC.put('lock:all', JSON.stringify(all), { expirationTtl: 3600 });
        return json({ exists: false }, 404, h);
    }
    if (!exists) {
        await env.SYNC.put(`b:${bucket}:claimed`, String(now));
        await env.SYNC.delete(`b:${bucket}:moved`); // a code given up earlier starts clean
    }
    return json({ token, created: !exists }, 200, h);
}

/* ---- the state document ---- */
interface Saved { rev: number; saved: number; state: unknown }

async function getState(env: Env, d: Device, h: Record<string, string>) {
    return json((await getJson<Saved>(env, d, 'state')) ?? { rev: 0, saved: 0, state: null }, 200, h);
}

async function putState(env: Env, d: Device, req: Request, h: Record<string, string>) {
    const body = (await req.json().catch(() => null)) as { baseRev?: number; state?: unknown } | null;
    if (!body || typeof body.baseRev !== 'number' || body.state === undefined) return json({ error: 'bad request' }, 400, h);
    const cur = (await getJson<Saved>(env, d, 'state')) ?? { rev: 0, saved: 0, state: null };
    // another device saved since this one last pulled: hand back the newer copy instead of overwriting it
    if (body.baseRev !== cur.rev) return json(cur, 409, h);
    const next: Saved = { rev: cur.rev + 1, saved: Date.now(), state: body.state };
    await putJson(env, d, 'state', next);
    return json({ rev: next.rev, saved: next.saved }, 200, h);
}

/* ---- fonts ---- */
interface FontEntry { slug: string; name: string; file: string }

async function fonts(env: Env, d: Device, req: Request, slug: string, h: Record<string, string>) {
    const index = (await getJson<FontEntry[]>(env, d, 'fonts')) ?? [];
    if (!slug) return json({ fonts: index }, 200, h);
    if (!/^upload-[a-z0-9-]{1,80}$/.test(slug)) return json({ error: 'bad slug' }, 400, h);
    const key = `b:${d.bucket}:font:${slug}`;
    if (req.method === 'GET') {
        const raw = await env.SYNC.get(key, 'arrayBuffer');
        if (!raw) return json({ error: 'not found' }, 404, h);
        return new Response(await unseal(d, raw), { headers: { ...h, 'Content-Type': 'application/octet-stream', 'Cache-Control': 'no-store' } });
    }
    if (req.method === 'PUT') {
        const bytes = await req.arrayBuffer();
        if (!bytes.byteLength || bytes.byteLength > MAX_FONT) return json({ error: 'font must be 1 byte to 10 MB' }, 413, h);
        const u = new URL(req.url);
        const entry = { slug, name: (u.searchParams.get('name') ?? slug).slice(0, 80), file: (u.searchParams.get('file') ?? `${slug}.ttf`).slice(0, 90) };
        await env.SYNC.put(key, await seal(d, bytes));
        await putJson(env, d, 'fonts', [entry, ...index.filter((f) => f.slug !== slug)]);
        return json({ ok: true }, 200, h);
    }
    if (req.method === 'DELETE') {
        await env.SYNC.delete(key);
        await putJson(env, d, 'fonts', index.filter((f) => f.slug !== slug));
        return json({ ok: true }, 200, h);
    }
    return json({ error: 'method' }, 405, h);
}

/* ---- the private archive: pieces and recordings ---- */
async function archive(env: Env, d: Device, req: Request, h: Record<string, string>) {
    if (req.method === 'GET') {
        const a = await getJson<unknown>(env, d, 'archive');
        return a ? json(a, 200, { ...h, 'Cache-Control': 'no-store' }) : json({ error: 'no archive' }, 404, h);
    }
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object' || !Array.isArray((body as { pieces?: unknown }).pieces)) return json({ error: 'bad request' }, 400, h);
    await putJson(env, d, 'archive', body);
    return json({ ok: true }, 200, h);
}

interface AudioMeta { size: number; chunk: number; n: number }
const AUDIO_NAME = /^[a-z0-9][a-z0-9._-]{0,90}\.mp3$/;

async function putAudio(env: Env, d: Device, req: Request, file: string, part: string | undefined, h: Record<string, string>) {
    if (!AUDIO_NAME.test(file)) return json({ error: 'bad name' }, 400, h);
    if (part === undefined) { // the closing call: size and slicing
        const m = (await req.json().catch(() => null)) as AudioMeta | null;
        if (!m || !(m.size > 0) || m.chunk !== CHUNK || m.n !== Math.ceil(m.size / CHUNK)) return json({ error: 'bad meta' }, 400, h);
        await putJson(env, d, `audio:${file}`, m);
        return json({ ok: true }, 200, h);
    }
    const bytes = await req.arrayBuffer();
    if (!/^\d{1,3}$/.test(part) || !bytes.byteLength || bytes.byteLength > CHUNK) return json({ error: 'bad slice' }, 400, h);
    await env.SYNC.put(`b:${d.bucket}:audio:${file}:${part}`, await seal(d, bytes));
    return json({ ok: true }, 200, h);
}

/* one slice per request: from the asked start to the end of its slice (a 206 may return less than asked;
   the player asks again for the rest) */
async function getAudio(env: Env, d: Device, req: Request, file: string) {
    const plain = { 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'private, max-age=86400' };
    const m = AUDIO_NAME.test(file) ? await getJson<AudioMeta>(env, d, `audio:${file}`) : null;
    if (!m) return new Response('not found', { status: 404, headers: plain });
    const r = /bytes=(\d+)-(\d*)/.exec(req.headers.get('Range') ?? '');
    const start = r ? Number(r[1]) : 0;
    if (start >= m.size) return new Response(null, { status: 416, headers: { ...plain, 'Content-Range': `bytes */${m.size}` } });
    const i = Math.floor(start / m.chunk);
    const raw = await env.SYNC.get(`b:${d.bucket}:audio:${file}:${i}`, 'arrayBuffer');
    if (!raw) return new Response('missing slice', { status: 500, headers: plain });
    const slice = new Uint8Array(await unseal(d, raw));
    const askedEnd = r && r[2] ? Number(r[2]) : m.size - 1;
    const end = Math.min(askedEnd, i * m.chunk + slice.byteLength - 1);
    const body = slice.slice(start - i * m.chunk, end - i * m.chunk + 1);
    return new Response(body, {
        status: 206,
        headers: { ...plain, 'Content-Type': 'audio/mpeg', 'Accept-Ranges': 'bytes', 'Content-Range': `bytes ${start}-${end}/${m.size}`, 'Content-Length': String(body.byteLength) },
    });
}

/* ---- changing the code ---- */
/* every entry of a bucket except its claim marker, in a stable order */
async function entries(env: Env, bucket: string) {
    const names: string[] = [];
    let cursor: string | undefined;
    do {
        const page = await env.SYNC.list({ prefix: `b:${bucket}:`, cursor });
        names.push(...page.keys.map((k) => k.name.slice(bucket.length + 3)).filter((n) => n !== 'claimed' && n !== 'moved'));
        cursor = page.list_complete ? undefined : page.cursor;
    } while (cursor);
    return names.sort();
}

async function rekey(env: Env, d: Device, req: Request, step: string, h: Record<string, string>) {
    const { code, i } = (await req.json().catch(() => ({}))) as { code?: string; i?: number };
    if (!CODE_OK(code)) return json({ error: 'a code is 4 to 64 characters' }, 400, h);
    const next = await forCode(env, code);
    if (next.bucket === d.bucket) return json({ error: 'that is already the code' }, 400, h);
    const names = await entries(env, d.bucket);
    if (step === 'start') {
        // asking whether a code is free is a guess too: it counts against the same per-address limit as /join
        const ip = req.headers.get('CF-Connecting-IP') ?? 'unknown';
        const now = Date.now();
        const mine: Lock = (await env.SYNC.get(`lock:${ip}`, 'json')) ?? { tries: 0, until: 0, strikes: 0 };
        if (mine.until > now) return json({ error: 'locked', retryInSeconds: Math.ceil((mine.until - now) / 1000) }, 429, h);
        mine.tries++;
        if (mine.tries >= 10) { mine.strikes++; mine.until = now + 15 * 60_000 * 2 ** (mine.strikes - 1); mine.tries = 0; }
        await env.SYNC.put(`lock:${ip}`, JSON.stringify(mine), { expirationTtl: 7 * 86400 });
        // the new code must be free: nobody may be moved into someone else's bucket
        if ((await env.SYNC.get(`b:${next.bucket}:claimed`)) !== null) return json({ error: 'that code is taken' }, 409, h);
        return json({ keys: names.length }, 200, h);
    }
    if (step === 'move') {
        const name = typeof i === 'number' ? names[i] : undefined;
        if (!name) return json({ error: 'no such entry' }, 400, h);
        const raw = await env.SYNC.get(`b:${d.bucket}:${name}`, 'arrayBuffer');
        if (raw) await env.SYNC.put(`b:${next.bucket}:${name}`, await seal({ bucket: next.bucket, key: next.key }, await unseal(d, raw)));
        return json({ ok: true }, 200, h);
    }
    // finish: claim the new bucket, then remove the old one (its tokens stop working with the claim marker)
    if ((await env.SYNC.get(`b:${next.bucket}:claimed`)) !== null) return json({ error: 'that code is taken' }, 409, h);
    await env.SYNC.put(`b:${next.bucket}:claimed`, String(Date.now()));
    await env.SYNC.put(`b:${d.bucket}:moved`, String(Date.now()));
    await env.SYNC.delete(`b:${d.bucket}:claimed`);
    for (const name of names) await env.SYNC.delete(`b:${d.bucket}:${name}`);
    return json({ token: next.token }, 200, h);
}

/* ---- routing ---- */
export default {
    async fetch(req: Request, env: Env): Promise<Response> {
        const h = cors(env, req);
        // recordings are fetched by <audio> itself: token in the query, no Origin header to check
        const url = new URL(req.url);
        const am = url.pathname.match(/^\/audio\/([^/]+)$/);
        if (am && req.method === 'GET') {
            const d = await device(env, req, url.searchParams.get('t') ?? '');
            return d ? getAudio(env, d, req, am[1]) : new Response('not joined', { status: 401 });
        }
        if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: h });
        if (!h['Access-Control-Allow-Origin']) return json({ error: 'origin' }, 403, h);
        const path = new URL(req.url).pathname.replace(/\/+$/, '');
        if (path === '/join' && req.method === 'POST') return join(env, req, h);
        const d = await device(env, req);
        if (!d) return json({ error: 'not joined' }, 401, h);
        if (path === '/state' && req.method === 'GET') return getState(env, d, h);
        if (path === '/state' && req.method === 'PUT') return putState(env, d, req, h);
        const m = path.match(/^\/fonts(?:\/([^/]+))?$/);
        if (m) return fonts(env, d, req, m[1] ?? '', h);
        const rk = path.match(/^\/rekey\/(start|move|finish)$/);
        if (rk && req.method === 'POST') return rekey(env, d, req, rk[1], h);
        if (path === '/archive' && (req.method === 'GET' || req.method === 'PUT')) return archive(env, d, req, h);
        const up = path.match(/^\/audio\/([^/]+)(?:\/(\d+))?$/);
        if (up && req.method === 'PUT') return putAudio(env, d, req, up[1], up[2], h);
        return json({ error: 'not found' }, 404, h);
    },
};
