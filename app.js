import {
    r as reactExports,
    j as jsxRuntimeExports,
    R as React,
    c as createRoot,
} from './vendor.js';

/* ==========================================================================
 * pieces - loads the archive content
 * --------------------------------------------------------------------------
 * The pieces themselves are data, not code: pieces.json, next to index.html,
 * is the one canonical source (the hosted archive File is built from the same
 * file). This module fetches it once at startup and hands App the list, newest
 * first. Each piece has an id, a title, a date stamp (YY.MM.DD HH:MM), its text
 * as blocks (a string is one paragraph, an array is a run of paragraphs), and
 * optional flags, note and voice recordings. Rendering lives in App.
 * ========================================================================== */

// Mirror build of the pieces module: same exports as the archive File's version,
// but the text is loaded at runtime from pieces.json instead of being bundled.
// Top-level await: App imports PIECES as a plain array, so the module holds the
// page back until the data has arrived. pieces.json sits next to index.html.
const response = await fetch(new URL('./pieces.json', import.meta.url));
if (!response.ok) throw new Error(`pieces.json: HTTP ${response.status}`);
const data = await response.json();
// Recordings are published flat next to index.html, so "audio/x.mp3" -> "./x.mp3".
const audioUrl = (file) => new URL('./' + file.split('/').pop(), import.meta.url).href;
/* All published pieces, newest first. */
const PIECES = data.pieces.map((p) => ({
    ...p,
    audio: (p.audio ?? []).map((a) => ({ src: audioUrl(a.file), label: a.label })),
}));
data.project;
const FOLDERS = data.folders;
/* which folder a piece lives in: its own "folder", or the first folder */
const folderOf = (p) => p.folder ?? FOLDERS[0].id;

/* ==========================================================================
 * sound - synthesized typewriter eras
 * --------------------------------------------------------------------------
 * Every keystroke sound is generated live with the Web Audio API; no samples.
 * Five eras, each with distinct key, space, delete and carriage-return voices.
 * Signal path:  voice -> per-era/per-kind trim -> master gain -> speakers
 * Levels were matched across eras by measuring each voice offline
 * (calibrateSound), so switching eras never changes loudness.
 * Latency: playSound() fires on keydown and the audio device is kept awake, so
 * the click lands with the key rather than after it.
 * ========================================================================== */

/* typewriter soundscapes, synthesized in-page — five eras, each with its own
   key, spacebar, delete and carriage return. researched from real machines:
   1900s heavy standard (underwood no.5: deep iron clack, long metal ring),
   1930s noiseless (remington noiseless: muted soft thud, no ring),
   1950s portable (olivetti lettera 22: crisp light snap),
   1970s electric (ibm selectric ii: golf-ball thock, motor whir, margin bell),
   1980s keys (buckling spring: two-stage click, spring ping, faint pc beep) */
const ERAS = [
    { id: 'iron', label: '1900s' },
    { id: 'noiseless', label: '1930s' },
    { id: 'portable', label: '1950s' },
    { id: 'electric', label: '1970s' },
    { id: 'keys', label: '1980s' },
];
let ctx = null;
let master = null;
let noiseBuf = null;
/* where voices write: the live era/kind trim bus, or the calibration graph */
let C = null;
let bus = null;
function makeNoise(c) {
    const b = c.createBuffer(1, Math.floor(c.sampleRate * 0.5), c.sampleRate);
    const d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return b;
}
/* no compressor in the chain: its look-ahead delays every attack. a silent source keeps the output
   device awake, so a keystroke after a pause doesn't wait for the hardware to spin up */
function ac() {
    if (!ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        try {
            ctx = new AC({ latencyHint: 'interactive' });
        } catch {
            ctx = new AC();
        }
        master = ctx.createGain();
        master.gain.value = 0.42;
        master.connect(ctx.destination);
        noiseBuf = makeNoise(ctx);
        try {
            const keep = ctx.createConstantSource();
            keep.offset.value = 0;
            const g = ctx.createGain();
            g.gain.value = 0;
            keep.connect(g);
            g.connect(ctx.destination);
            keep.start();
        } catch {
            /* no constant source: fine */
        }
    }
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
}
function warmAudio() {
    try {
        ac();
    } catch {
        /* audio unavailable */
    }
}
/* slight per-stroke detune so repeated keys never sound sampled */
const r = (v, amt = 0.08) => v * (1 + (Math.random() - 0.5) * 2 * amt);
function noise(o) {
    const c = C;
    const t0 = c.currentTime + (o.at ?? 0);
    const src = c.createBufferSource();
    src.buffer = noiseBuf;
    src.playbackRate.value = r(1, 0.12);
    const f = c.createBiquadFilter();
    f.type = o.type ?? 'bandpass';
    f.frequency.setValueAtTime(r(o.f), t0);
    f.Q.value = o.q ?? 1;
    if (o.slideTo) f.frequency.exponentialRampToValueAtTime(o.slideTo, t0 + o.t);
    const g = c.createGain();
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(o.g, t0 + 0.001);
    g.gain.exponentialRampToValueAtTime(0.0004, t0 + o.t);
    src.connect(f);
    f.connect(g);
    g.connect(bus);
    src.start(t0, Math.random() * 0.25);
    src.stop(t0 + o.t + 0.05);
}
function tone(o) {
    const c = C;
    const t0 = c.currentTime + (o.at ?? 0);
    const osc = c.createOscillator();
    osc.type = o.type ?? 'sine';
    osc.frequency.setValueAtTime(r(o.f, 0.035), t0);
    if (o.slideTo) osc.frequency.exponentialRampToValueAtTime(o.slideTo, t0 + o.t);
    const g = c.createGain();
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(o.g, t0 + 0.0015);
    g.gain.exponentialRampToValueAtTime(0.0004, t0 + o.t);
    osc.connect(g);
    g.connect(bus);
    osc.start(t0);
    osc.stop(t0 + o.t + 0.05);
}
/* every keystroke is a little machine cycle: the key dips, the mechanism
   strikes, the linkage releases. strike = thump + bandpassed impact noise +
   inharmonic metal partials that ring out at different speeds. velocity and
   timing jitter per stroke so fast typing sounds like a machine, not a loop */
const j = () => (Math.random() - 0.5) * 0.006; // mechanical timing slop (only after the strike)
const v = () => 0.82 + Math.random() * 0.36; // finger velocity
/* a struck metal bar: inharmonic partials, longest ring on the lowest */
function ring(base, partials, g, t, at) {
    partials.forEach((p, i) => {
        tone({ f: base * p, g: g / (i + 1), t: t / (1 + i * 0.7), at });
    });
}
/* carriage return shared shape: bell, then the ratchet zip home, then the stop */
function carriage(opts) {
    ring(
        opts.bell[0],
        [1, ...opts.bell.slice(1).map((f) => f / opts.bell[0])],
        opts.bellG,
        opts.bellT,
        0,
    );
    for (let i = 0; i < opts.ticks; i++) {
        noise({
            f: opts.tickF - i * (opts.tickF * 0.06),
            q: 3,
            g: 0.07,
            t: 0.011,
            at: opts.at + i * opts.tickGap,
        });
    }
    noise({
        f: opts.zipF,
        q: 0.9,
        g: opts.zipG,
        t: opts.ticks * opts.tickGap + 0.06,
        at: opts.at,
        slideTo: opts.zipF * 0.28,
    });
    const stop = opts.at + opts.ticks * opts.tickGap + 0.035;
    tone({ f: opts.thudF, g: 0.5, t: 0.07, at: stop });
    noise({ f: 480, q: 0.7, type: 'lowpass', g: 0.28, t: 0.05, at: stop });
}
const VOICES = {
    /* 1900s heavy standard (underwood): long key dip, typebar SLAMS the platen,
       the whole iron frame rings; big bell and a heavy ratcheted carriage */
    iron: {
        key: () => {
            const vel = v(),
                s = Math.abs(j()) * 0.25;
            noise({ f: 520, q: 0.8, type: 'lowpass', g: 0.1 * vel, t: 0.012 }); // key-dip
            tone({ f: 92, g: 0.55 * vel, t: 0.08, at: s }); // platen thump
            noise({ f: 1250, q: 0.7, g: 0.5 * vel, t: 0.032, at: s }); // impact
            ring(2330, [1, 1.36, 1.92, 2.61], 0.055 * vel, 0.26, s); // frame ring
            noise({ f: 850, q: 0.9, g: 0.1 * vel, t: 0.014, at: s + 0.078 }); // release clack
        },
        space: () => {
            tone({ f: 70, g: 0.75, t: 0.1 });
            noise({ f: 360, q: 0.7, type: 'lowpass', g: 0.5, t: 0.055 });
            noise({ f: 1150, q: 1, g: 0.13, t: 0.02, at: 0.012 });
            noise({ f: 700, q: 0.8, g: 0.09, t: 0.02, at: 0.085 });
        },
        delete: () => {
            tone({ f: 88, g: 0.42, t: 0.055 });
            noise({ f: 600, q: 0.8, g: 0.3, t: 0.045 });
            noise({ f: 950, q: 1, g: 0.07, t: 0.014, at: 0.062 });
        },
        return: () =>
            carriage({
                bell: [1568, 2093, 3136],
                bellG: 0.15,
                bellT: 1.0,
                ticks: 7,
                tickF: 2450,
                tickGap: 0.033,
                zipF: 1600,
                zipG: 0.2,
                thudF: 66,
                at: 0.11,
            }),
    },
    /* 1930s noiseless (remington): the typebar lands on a felt-packed mechanism —
       a hushed, padded thud, almost no ring, a small soft bell */
    noiseless: {
        key: () => {
            const vel = v(),
                s = Math.abs(j()) * 0.25;
            noise({ f: 700, q: 0.6, type: 'lowpass', g: 0.14 * vel, t: 0.01 });
            noise({ f: 620, q: 0.6, type: 'lowpass', g: 0.24 * vel, t: 0.042, at: s });
            tone({ f: 98, g: 0.15 * vel, t: 0.045, at: s });
            tone({ f: 1180, g: 0.012 * vel, t: 0.05, at: s }); // the ghost of a ring, felt-killed
            noise({ f: 480, q: 0.6, type: 'lowpass', g: 0.06 * vel, t: 0.02, at: s + 0.082 });
        },
        space: () => {
            noise({ f: 400, q: 0.6, type: 'lowpass', g: 0.32, t: 0.06 });
            tone({ f: 74, g: 0.24, t: 0.06 });
        },
        delete: () => {
            noise({ f: 420, q: 0.6, type: 'lowpass', g: 0.18, t: 0.045 });
        },
        return: () =>
            carriage({
                bell: [1760, 2637],
                bellG: 0.05,
                bellT: 0.4,
                ticks: 5,
                tickF: 1650,
                tickGap: 0.037,
                zipF: 950,
                zipG: 0.1,
                thudF: 62,
                at: 0.09,
            }),
    },
    /* 1950s portable (lettera 22): light, tight, fast — a crisp snappy strike with
       a bright short ping, quick little zip of a return, bright small bell */
    portable: {
        key: () => {
            const vel = v(),
                s = Math.abs(j()) * 0.25;
            noise({ f: 2100, q: 1.2, g: 0.12 * vel, t: 0.007 }); // dip click
            noise({ f: 3050, q: 1.8, g: 0.33 * vel, t: 0.017, at: s }); // snap
            tone({ f: 205, g: 0.24 * vel, t: 0.026, at: s });
            ring(4250, [1, 1.41, 2.09], 0.03 * vel, 0.1, s); // bright short ping
            noise({ f: 2350, q: 1.2, g: 0.07 * vel, t: 0.009, at: s + 0.052 }); // release
        },
        space: () => {
            noise({ f: 1450, q: 1, g: 0.37, t: 0.028 });
            tone({ f: 132, g: 0.37, t: 0.038 });
            noise({ f: 950, q: 1, g: 0.1, t: 0.018, at: 0.044 });
        },
        delete: () => {
            noise({ f: 1700, q: 1.2, g: 0.2, t: 0.018 });
            tone({ f: 148, g: 0.16, t: 0.028 });
        },
        return: () =>
            carriage({
                bell: [2637, 3955],
                bellG: 0.08,
                bellT: 0.45,
                ticks: 5,
                tickF: 2850,
                tickGap: 0.026,
                zipF: 2300,
                zipG: 0.13,
                thudF: 88,
                at: 0.07,
            }),
    },
    /* 1970s electric (selectric ii): a solenoid fires the golf ball — one deep
       authoritative THOCK, motor bleed underneath, motor-driven carriage home */
    electric: {
        key: () => {
            const vel = v(),
                s = Math.abs(j()) * 0.25;
            tone({ f: 345, type: 'triangle', g: 0.05 * vel, t: 0.007 }); // solenoid pull-in
            noise({ f: 1120, q: 4.2, g: 0.5 * vel, t: 0.015, at: s }); // thock
            tone({ f: 250, type: 'triangle', g: 0.34 * vel, t: 0.02, at: s });
            noise({ f: 320, q: 1.1, g: 0.03 * vel, t: 0.09, at: s, slideTo: 480 }); // motor bleed
            noise({ f: 880, q: 3, g: 0.09 * vel, t: 0.011, at: s + 0.048 }); // ball settles
        },
        space: () => {
            noise({ f: 770, q: 3, g: 0.52, t: 0.022 });
            tone({ f: 168, type: 'triangle', g: 0.42, t: 0.03 });
            noise({ f: 300, q: 1.1, g: 0.03, t: 0.08, slideTo: 460 });
        },
        delete: () => {
            noise({ f: 990, q: 3.4, g: 0.38, t: 0.015 });
            tone({ f: 222, type: 'triangle', g: 0.24, t: 0.018 });
            noise({ f: 300, q: 1.1, g: 0.025, t: 0.07, slideTo: 440 });
        },
        return: () => {
            ring(1975, [1, 1.5], 0.045, 0.25, 0);
            noise({ f: 240, q: 1.4, g: 0.1, t: 0.15, at: 0.016, slideTo: 520 }); // carrier motor whir
            noise({ f: 720, q: 1, g: 0.16, t: 0.16, at: 0.016, slideTo: 330 });
            tone({ f: 58, g: 0.34, t: 0.05, at: 0.185 }); // carrier stop
            noise({ f: 420, q: 0.8, g: 0.16, t: 0.03, at: 0.185 });
        },
    },
    /* 1980s keys (buckling spring): the spring buckles — a sharp click, then the
       spring's own descending ping, then the keycap bottoms out; upstroke clicks */
    keys: {
        key: () => {
            const vel = v(),
                s = Math.abs(j()) * 0.25;
            noise({ f: 5300, q: 0.8, type: 'highpass', g: 0.22 * vel, t: 0.005 }); // buckle crack
            noise({ f: 2600, q: 2.2, g: 0.14 * vel, t: 0.008, at: s }); // click body
            tone({ f: 1176, g: 0.02 * vel, t: 0.045, at: s + 0.003 }); // spring: two detuned
            tone({ f: 1189, g: 0.02 * vel, t: 0.045, at: s + 0.003 }); // wires beat, then die
            tone({ f: 196, g: 0.2 * vel, t: 0.016, at: s }); // bottom-out
            noise({ f: 4300, q: 0.9, type: 'highpass', g: 0.07 * vel, t: 0.005, at: s + 0.058 }); // upstroke
        },
        space: () => {
            tone({ f: 122, g: 0.48, t: 0.042 });
            noise({ f: 810, q: 1.2, g: 0.3, t: 0.025 });
            noise({ f: 1800, q: 1.6, g: 0.08, t: 0.02, at: 0.004 });
            noise({ f: 3600, q: 0.9, type: 'highpass', g: 0.08, t: 0.005, at: 0.062 });
        },
        delete: () => {
            noise({ f: 3700, q: 0.9, type: 'highpass', g: 0.17, t: 0.007 });
            tone({ f: 172, g: 0.16, t: 0.02 });
        },
        return: () => {
            noise({ f: 2700, q: 1, g: 0.3, t: 0.018 });
            noise({ f: 1900, q: 1.8, g: 0.12, t: 0.012, at: 0.003 });
            tone({ f: 118, g: 0.24, t: 0.032, at: 0.005 });
            noise({ f: 4200, q: 0.9, type: 'highpass', g: 0.09, t: 0.005, at: 0.06 });
        },
    },
};
/* loudness trims per era and sound, measured in-page: every voice is rendered offline through a rough
   ear-weighting (low cut + presence lift), its loudest 30ms window is taken, and each era is trimmed to the
   median of all eras for that sound. so no era needs the volume knob */
const KINDS = ['key', 'space', 'delete', 'return'];
const TRIM = {};
const trimBus = {};
let calibrating = null;
async function measure(id, kind, sr) {
    const OAC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    let sum = 0;
    const takes = 4;
    for (let n = 0; n < takes; n++) {
        const off = new OAC(1, Math.floor(sr * 1.3), sr);
        const hp = off.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 90;
        hp.Q.value = 0.7;
        const sh = off.createBiquadFilter();
        sh.type = 'highshelf';
        sh.frequency.value = 1500;
        sh.gain.value = 4;
        hp.connect(sh);
        sh.connect(off.destination);
        const savedC = C,
            savedBus = bus,
            savedNoise = noiseBuf;
        C = off;
        bus = hp;
        noiseBuf = makeNoise(off);
        try {
            VOICES[id][kind]();
        } finally {
            C = savedC;
            bus = savedBus;
            noiseBuf = savedNoise;
        }
        const buf = await off.startRendering();
        const d = buf.getChannelData(0);
        const win = Math.floor(sr * 0.03),
            step = Math.floor(sr * 0.005);
        let best = 0;
        for (let i = 0; i + win <= d.length; i += step) {
            let e = 0;
            for (let k = i; k < i + win; k++) e += d[k] * d[k];
            if (e > best) best = e;
        }
        sum += Math.sqrt(best / win);
    }
    return 20 * Math.log10(sum / takes + 1e-9);
}
function calibrateSound() {
    if (calibrating) return calibrating;
    calibrating = (async () => {
        var _a;
        try {
            const sr = 44100;
            const L = {};
            for (const e of ERAS) {
                L[e.id] = {};
                for (const k of KINDS) L[e.id][k] = await measure(e.id, k, sr);
            }
            const report = [];
            for (const k of KINDS) {
                const vals = ERAS.map((e) => L[e.id][k]).sort((a, b) => a - b);
                const target = vals[Math.floor(vals.length / 2)];
                for (const e of ERAS) {
                    const g = Math.min(6, Math.max(0.1, Math.pow(10, (target - L[e.id][k]) / 20)));
                    (TRIM[(_a = e.id)] ?? (TRIM[_a] = {}))[k] = g;
                    const node = trimBus[`${e.id}:${k}`];
                    if (node) node.gain.value = g;
                    report.push(`${e.id}:${k}:${L[e.id][k].toFixed(1)}dB>x${g.toFixed(2)}`);
                }
            }
            document.documentElement.dataset.wtTrim = report.join(' ');
        } catch {
            calibrating = null;
        }
    })();
    return calibrating;
}
function busFor(c, id, kind) {
    const key = `${id}:${kind}`;
    let node = trimBus[key];
    if (!node) {
        node = c.createGain();
        node.gain.value = TRIM[id]?.[kind] ?? 1;
        node.connect(master);
        trimBus[key] = node;
    }
    return node;
}
function playSound(eraId, kind) {
    try {
        // random era: each keystroke draws from a different machine
        const id = eraId === 'random' ? ERAS[(Math.random() * ERAS.length) | 0].id : eraId;
        const c = ac();
        C = c;
        bus = busFor(c, id, kind);
        document.documentElement.dataset.wtLastPlay = `${eraId}>${id}:${kind}:${Date.now()}`;
        VOICES[id]?.[kind]?.();
    } catch {
        /* audio unavailable */
    }
}
function classifyKeydown(e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return null;
    if (e.key === ' ') return 'space';
    if (e.key === 'Enter') return 'return';
    if (e.key === 'Backspace' || e.key === 'Delete') return 'delete';
    if (e.key && e.key.length === 1) return 'key';
    return null;
}

/* ==========================================================================
 * faces - the type shelf
 * --------------------------------------------------------------------------
 * Registry of every typeface the reader can choose for the two type slots:
 *   text   the body of each piece        (CSS variable --font-body)
 *   index  titles, dates, labels, chrome (CSS variable --font-mono)
 * Faces are declared with @font-face in fonts.css and fetched by the browser
 * only when first shown, so offering 44 faces costs nothing until one is used.
 * loadFace() asks the browser to load a face ahead of applying it, which keeps
 * a switch from flashing the fallback font.
 * ========================================================================== */

const FACES = [
    {
        slug: 'eb-garamond',
        name: 'EB Garamond',
        family: "'EB Garamond', Georgia, serif",
        kind: 'serif',
    },
    {
        slug: 'cormorant',
        name: 'Cormorant',
        family: "'shelf-cormorant', Georgia, serif",
        kind: 'serif',
        shelf: true,
    },
    {
        slug: 'spectral',
        name: 'Spectral',
        family: "'shelf-spectral', Georgia, serif",
        kind: 'serif',
        shelf: true,
    },
    {
        slug: 'newsreader',
        name: 'Newsreader',
        family: "'shelf-newsreader', Georgia, serif",
        kind: 'serif',
        shelf: true,
    },
    {
        slug: 'crimson-pro',
        name: 'Crimson Pro',
        family: "'shelf-crimson-pro', Georgia, serif",
        kind: 'serif',
        shelf: true,
    },
    {
        slug: 'fraunces',
        name: 'Fraunces',
        family: "'shelf-fraunces', Georgia, serif",
        kind: 'serif',
        shelf: true,
    },
    {
        slug: 'playfair-display',
        name: 'Playfair Display',
        family: "'shelf-playfair-display', Georgia, serif",
        kind: 'serif',
        shelf: true,
    },
    {
        slug: 'libre-caslon',
        name: 'Libre Caslon',
        family: "'shelf-libre-caslon', Georgia, serif",
        kind: 'serif',
        shelf: true,
    },
    {
        slug: 'alegreya',
        name: 'Alegreya',
        family: "'shelf-alegreya', Georgia, serif",
        kind: 'serif',
        shelf: true,
    },
    {
        slug: 'lora',
        name: 'Lora',
        family: "'shelf-lora', Georgia, serif",
        kind: 'serif',
        shelf: true,
    },
    {
        slug: 'source-serif',
        name: 'Source Serif',
        family: "'shelf-source-serif', Georgia, serif",
        kind: 'serif',
        shelf: true,
    },
    {
        slug: 'vollkorn',
        name: 'Vollkorn',
        family: "'shelf-vollkorn', Georgia, serif",
        kind: 'serif',
        shelf: true,
    },
    {
        slug: 'zilla-slab',
        name: 'Zilla Slab',
        family: "'shelf-zilla-slab', Georgia, serif",
        kind: 'serif',
        shelf: true,
    },
    {
        slug: 'bitter',
        name: 'Bitter',
        family: "'shelf-bitter', Georgia, serif",
        kind: 'serif',
        shelf: true,
    },
    {
        slug: 'bodoni-moda',
        name: 'Bodoni Moda',
        family: "'shelf-bodoni-moda', Georgia, serif",
        kind: 'serif',
        shelf: true,
    },
    {
        slug: 'old-standard-tt',
        name: 'Old Standard TT',
        family: "'shelf-old-standard-tt', Georgia, serif",
        kind: 'serif',
        shelf: true,
    },
    {
        slug: 'cardo',
        name: 'Cardo',
        family: "'shelf-cardo', Georgia, serif",
        kind: 'serif',
        shelf: true,
    },
    {
        slug: 'marcellus',
        name: 'Marcellus',
        family: "'shelf-marcellus', Georgia, serif",
        kind: 'serif',
        shelf: true,
    },
    {
        slug: 'gentium-book',
        name: 'Gentium Book',
        family: "'shelf-gentium-book', Georgia, serif",
        kind: 'serif',
        shelf: true,
    },
    {
        slug: 'rosarivo',
        name: 'Rosarivo',
        family: "'shelf-rosarivo', Georgia, serif",
        kind: 'serif',
        shelf: true,
    },
    {
        slug: 'inter',
        name: 'Inter',
        family: "'shelf-inter', system-ui, sans-serif",
        kind: 'sans',
        shelf: true,
    },
    {
        slug: 'ibm-plex-sans',
        name: 'IBM Plex Sans',
        family: "'shelf-ibm-plex-sans', system-ui, sans-serif",
        kind: 'sans',
        shelf: true,
    },
    {
        slug: 'work-sans',
        name: 'Work Sans',
        family: "'shelf-work-sans', system-ui, sans-serif",
        kind: 'sans',
        shelf: true,
    },
    {
        slug: 'archivo',
        name: 'Archivo',
        family: "'shelf-archivo', system-ui, sans-serif",
        kind: 'sans',
        shelf: true,
    },
    {
        slug: 'space-grotesk',
        name: 'Space Grotesk',
        family: "'shelf-space-grotesk', system-ui, sans-serif",
        kind: 'sans',
        shelf: true,
    },
    {
        slug: 'public-sans',
        name: 'Public Sans',
        family: "'shelf-public-sans', system-ui, sans-serif",
        kind: 'sans',
        shelf: true,
    },
    {
        slug: 'manrope',
        name: 'Manrope',
        family: "'shelf-manrope', system-ui, sans-serif",
        kind: 'sans',
        shelf: true,
    },
    {
        slug: 'dm-sans',
        name: 'DM Sans',
        family: "'shelf-dm-sans', system-ui, sans-serif",
        kind: 'sans',
        shelf: true,
    },
    {
        slug: 'karla',
        name: 'Karla',
        family: "'shelf-karla', system-ui, sans-serif",
        kind: 'sans',
        shelf: true,
    },
    {
        slug: 'rubik',
        name: 'Rubik',
        family: "'shelf-rubik', system-ui, sans-serif",
        kind: 'sans',
        shelf: true,
    },
    {
        slug: 'libre-franklin',
        name: 'Libre Franklin',
        family: "'shelf-libre-franklin', system-ui, sans-serif",
        kind: 'sans',
        shelf: true,
    },
    {
        slug: 'jost',
        name: 'Jost',
        family: "'shelf-jost', system-ui, sans-serif",
        kind: 'sans',
        shelf: true,
    },
    {
        slug: 'outfit',
        name: 'Outfit',
        family: "'shelf-outfit', system-ui, sans-serif",
        kind: 'sans',
        shelf: true,
    },
    {
        slug: 'instrument-sans',
        name: 'Instrument Sans',
        family: "'shelf-instrument-sans', system-ui, sans-serif",
        kind: 'sans',
        shelf: true,
    },
    {
        slug: 'hanken-grotesk',
        name: 'Hanken Grotesk',
        family: "'shelf-hanken-grotesk', system-ui, sans-serif",
        kind: 'sans',
        shelf: true,
    },
    {
        slug: 'fragment-mono',
        name: 'Fragment Mono',
        family: "'Fragment Mono', monospace",
        kind: 'mono',
    },
    {
        slug: 'courier-prime',
        name: 'Courier Prime',
        family: "'shelf-courier-prime', monospace",
        kind: 'mono',
        shelf: true,
    },
    {
        slug: 'ibm-plex-mono',
        name: 'IBM Plex Mono',
        family: "'shelf-ibm-plex-mono', monospace",
        kind: 'mono',
        shelf: true,
    },
    {
        slug: 'space-mono',
        name: 'Space Mono',
        family: "'shelf-space-mono', monospace",
        kind: 'mono',
        shelf: true,
    },
    {
        slug: 'cutive-mono',
        name: 'Cutive Mono',
        family: "'shelf-cutive-mono', monospace",
        kind: 'mono',
        shelf: true,
    },
    {
        slug: 'dm-mono',
        name: 'DM Mono',
        family: "'shelf-dm-mono', monospace",
        kind: 'mono',
        shelf: true,
    },
    {
        slug: 'jetbrains-mono',
        name: 'JetBrains Mono',
        family: "'shelf-jetbrains-mono', monospace",
        kind: 'mono',
        shelf: true,
    },
    {
        slug: 'special-elite',
        name: 'Special Elite',
        family: "'shelf-special-elite', monospace",
        kind: 'mono',
        shelf: true,
    },
];
function loadFace(face, withItalic = true) {
    if (!face || !face.shelf) return Promise.resolve();
    const fam = `'shelf-${face.slug}'`;
    const jobs = [document.fonts.load(`16px ${fam}`)];
    if (withItalic) jobs.push(document.fonts.load(`italic 16px ${fam}`));
    return Promise.all(jobs).then(
        () => undefined,
        () => undefined,
    );
}
/* faces the reader uploaded in this browser, newest first (filled by uploads.ts) */
const UPLOADED = [];
const faceBySlug = (slug) =>
    FACES.find((f) => f.slug === slug) ?? UPLOADED.find((f) => f.slug === slug);

/*
 * host - what the page is allowed to do where it runs.
 *
 * The same source builds two fronts. The hosted archive File runs inside a
 * sandboxed viewer frame with no storage and no downloads, so there settings and
 * drafts live only for the visit and "save file" goes through a helper tab.
 * The GitHub Pages mirror is a normal page: the mirror build flips STANDALONE to
 * true, which turns on saving settings and drafts in localStorage and a direct
 * file download for "save file".
 */
/* localStorage key for the saved state (settings, drafts, mode) on the mirror */
const STATE_KEY = 'middots-state';
/* the sync service (service/ in the repo, a Cloudflare Worker); '' turns syncing off.
   The archive File never syncs: its viewer allows no outside requests or storage. */
const SYNC_URL = 'https://middots-sync.middots.workers.dev';

/*
 * sync - the page's side of the sync service (service/src/worker.ts in the repo).
 *
 * A device joins with a code the reader chooses; the first device to use a code
 * claims it (the page asks first), later devices type the same code to join. The
 * service answers with a token that this browser keeps, so the code is typed once.
 *
 * What syncs: the saved state the page already writes locally (settings, drafts,
 * fold states, the page he was on - see "saved state" in App.tsx) and uploaded
 * fonts (through the FontShare in sharing.ts). Saves are batched: a push goes out
 * a few seconds after the last change and when the page is hidden, which keeps
 * the service far under its free-plan write limit.
 * Conflicts: each save names the version it was based on. If another device saved
 * in between, the service refuses and hands back its copy, which this page then
 * shows - the newest save wins. The page pulls again whenever it comes back into
 * view, so switching devices picks up where the other left off.
 */
const TOKEN_KEY = 'middots-sync-token';
const REV_KEY = 'middots-sync-rev';
const PUSH_DELAY = 4000;
function read(key) {
    try {
        return localStorage.getItem(key) ?? '';
    } catch {
        return '';
    }
}
function write(key, v) {
    try {
        if (v) localStorage.setItem(key, v);
        else localStorage.removeItem(key);
    } catch {
        /* no storage */
    }
}
const isJoined = () => !!read(TOKEN_KEY);
const token = () => read(TOKEN_KEY);
const knownRev = () => Number(read(REV_KEY)) || 0;
async function call(path, init = {}) {
    return fetch(SYNC_URL + path, {
        ...init,
        headers: {
            ...(init.headers ?? {}),
            ...(token() ? { Authorization: `Bearer ${token()}` } : {}),
            ...(typeof init.body === 'string' ? { 'Content-Type': 'application/json' } : {}),
        },
    });
}
/* claim=false first: an unused code comes back as {unknown}, and the page asks before claiming it */
async function join(code, claim = false) {
    try {
        const r = await call('/join', { method: 'POST', body: JSON.stringify({ code, claim }) });
        const j = await r.json();
        if (r.status === 404 && j.exists === false)
            return { ok: false, unknown: true, error: 'new code' };
        if (r.status === 429)
            return {
                ok: false,
                error: `too many tries, wait ${Math.ceil(j.retryInSeconds / 60)} min`,
            };
        if (!r.ok) return { ok: false, error: j.error ?? `error ${r.status}` };
        write(TOKEN_KEY, j.token);
        write(REV_KEY, '0'); // nothing pulled yet: the first pull always applies
        return { ok: true, created: j.created };
    } catch {
        return { ok: false, error: 'the sync service did not answer' };
    }
}
function leave() {
    write(TOKEN_KEY, '');
    write(REV_KEY, '');
}
/* the service's copy, when it is newer than what this device last saw; null otherwise */
async function pull() {
    if (!isJoined()) return null;
    try {
        const r = await call('/state', { cache: 'no-store' });
        if (r.status === 401) {
            leave();
            return null;
        }
        if (!r.ok) return null;
        const j = await r.json();
        if (!j.state || j.rev <= knownRev()) return null;
        write(REV_KEY, String(j.rev));
        pending = null; // an unsent local change based on the older copy would overwrite the newer one
        return { rev: j.rev, state: j.state };
    } catch {
        return null;
    }
}
let timer;
let pending = null;
let onRemote = () => {};
/* the page tells sync what to do when a newer copy arrives from another device */
function onNewer(apply) {
    onRemote = apply;
}
/* called on every local save; the push itself waits for a pause */
function schedulePush(state) {
    if (!isJoined()) return;
    pending = state;
    window.clearTimeout(timer);
    timer = window.setTimeout(() => void pushNow(), PUSH_DELAY);
}
async function pushNow(keepalive = false) {
    if (!isJoined() || pending === null) return;
    const state = pending;
    pending = null;
    window.clearTimeout(timer);
    try {
        const r = await call('/state', {
            method: 'PUT',
            body: JSON.stringify({ baseRev: knownRev(), state }),
            keepalive,
        });
        const j = await r.json();
        if (r.ok) write(REV_KEY, String(j.rev));
        else if (r.status === 409) {
            write(REV_KEY, String(j.rev));
            onRemote({ rev: j.rev, state: j.state });
        }
    } catch {
        pending = pending ?? state; /* offline: try again with the next save */
    }
}
async function listFonts() {
    const r = await call('/fonts', { cache: 'no-store' });
    return r.ok ? (await r.json()).fonts : [];
}
async function getFont(slug) {
    const r = await call(`/fonts/${slug}`, { cache: 'no-store' });
    if (!r.ok) throw new Error(`font ${r.status}`);
    return r.arrayBuffer();
}
async function putFont(f, data) {
    const q = new URLSearchParams({ name: f.name, file: f.file });
    const r = await call(`/fonts/${f.slug}?${q}`, { method: 'PUT', body: data });
    if (!r.ok) throw new Error(`font upload ${r.status}`);
}
async function deleteFont(slug) {
    await call(`/fonts/${slug}`, { method: 'DELETE' });
}

/*
 * sharing - where uploaded fonts go so every joined device has them.
 *
 * uploads.ts keeps every font in this browser (IndexedDB) and talks to the
 * FontShare below for the cross-device copy. Today that is the sync service
 * (sync.ts): fonts are stored there encrypted, per code, and fetched with the
 * device's token - they never get a public address. When this device has not
 * joined, or on the archive File, there is no share and fonts stay local.
 */
const SyncShare = {
    canRead: isJoined,
    list: listFonts,
    fetch: (f) => getFont(f.slug),
    put: putFont,
    remove: deleteFont,
};

/*
 * uploads - fonts the owner brings in, shown on the first shelf of both font lists.
 *
 * An uploaded font lives in this browser's IndexedDB, next to the saved drafts
 * and settings: usable at once, back after every reload, until removed. It is
 * never sent anywhere, never put in the repo and never given a URL - the bytes
 * go straight to the browser's font engine (FontFace) - so visitors to the site
 * cannot fetch it. (Nothing stops the owner's own browser from reading it back;
 * that is the limit of any font a page can draw.)
 * On a device joined to the sync service (sharing.ts, sync.ts) every upload is
 * also stored there, encrypted, and the other joined devices fetch it on load; a
 * font that is both local and shared is listed once.
 * Where storage is blocked (the archive File's sandboxed viewer) an upload lasts
 * for the visit only. Draft exports carry only the face's name, never the font.
 */
const DB = 'middots-fonts';
const STORE = 'fonts';
function openDb() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB, 1);
        req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: 'slug' });
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}
async function withStore(mode, run) {
    const db = await openDb();
    return new Promise((resolve, reject) => {
        const req = run(db.transaction(STORE, mode).objectStore(STORE));
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}
/* a stable slug from the file name, so the same font uploaded on two devices is one entry */
function slugFor(fileName) {
    const ext = (fileName.match(/\.(woff2?|ttf|otf)$/i)?.[1] ?? 'ttf').toLowerCase();
    const name =
        fileName
            .replace(/\.(woff2?|ttf|otf)$/i, '')
            .replace(/[-_]+/g, ' ')
            .trim() || 'uploaded font';
    const base =
        name
            .toLowerCase()
            .normalize('NFKD')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '') || 'font';
    return { slug: `upload-${base}`, name, file: `${base}.${ext}` };
}
/* hand a font to the font engine and put it on the first shelf; throws when it is not a usable font */
async function register(slug, name, source, shared) {
    const ff = new FontFace(slug, source);
    await ff.load();
    document.fonts.add(ff);
    const face = {
        slug,
        name,
        family: `'${slug}', Georgia, serif`,
        kind: 'serif',
        uploaded: true,
        shared,
    };
    const at = UPLOADED.findIndex((f) => f.slug === slug);
    if (at >= 0) UPLOADED.splice(at, 1, face);
    else UPLOADED.unshift(face);
    return face;
}
/* on load: this browser's fonts first, then any shared font this browser lacks */
async function restoreFonts() {
    let local = [];
    try {
        local = await withStore('readonly', (s) => s.getAll());
    } catch {
        /* no storage */
    }
    let shared = [];
    if (SyncShare.canRead()) {
        try {
            shared = await SyncShare.list();
        } catch {
            /* offline */
        }
    }
    const sharedSlugs = new Set(shared.map((f) => f.slug));
    for (const f of local) {
        try {
            await register(f.slug, f.name, f.data, sharedSlugs.has(f.slug));
        } catch {
            /* damaged */
        }
    }
    const localSlugs = new Set(local.map((f) => f.slug));
    for (const f of shared.slice().reverse()) {
        if (localSlugs.has(f.slug)) continue;
        try {
            const data = await SyncShare.fetch(f);
            await register(f.slug, f.name, data.slice(0), true);
            try {
                await withStore('readwrite', (s) => s.put({ ...f, data }));
            } catch {
                /* storage blocked */
            }
        } catch {
            /* unreachable now; tried again next load */
        }
    }
    return [...UPLOADED];
}
/* a file from the picker: check it is a font, show it, and keep it in this browser */
async function addFontFile(file) {
    const id = slugFor(file.name);
    const data = await file.arrayBuffer();
    const face = await register(id.slug, id.name, data.slice(0), false);
    try {
        await withStore('readwrite', (s) => s.put({ ...id, data }));
    } catch {
        /* storage blocked: this visit only */
    }
    if (SyncShare.canRead()) {
        try {
            await SyncShare.put(id, data);
            face.shared = true;
        } catch {
            /* kept here; shared on the next join */
        }
    }
    return face;
}
/* remove from this browser; a font in the repo stays listed there (it comes back as a repo face) */
async function removeFont(slug) {
    if (SyncShare.canRead()) {
        try {
            await SyncShare.remove(slug);
        } catch {
            /* offline */
        }
    }
    try {
        await withStore('readwrite', (s) => s.delete(slug));
    } catch {
        /* nothing kept */
    }
    const i = UPLOADED.findIndex((f) => f.slug === slug);
    if (i >= 0) UPLOADED.splice(i, 1);
}
/* after joining: send fonts that only this browser has, then bring in the shared ones */
async function shareLocalFonts() {
    if (!SyncShare.canRead()) return [...UPLOADED];
    let local = [];
    try {
        local = await withStore('readonly', (s) => s.getAll());
    } catch {
        /* none */
    }
    let shared = [];
    try {
        shared = await SyncShare.list();
    } catch {
        /* offline */
    }
    const there = new Set(shared.map((f) => f.slug));
    for (const f of local)
        if (!there.has(f.slug)) {
            try {
                await SyncShare.put({ slug: f.slug, name: f.name, file: f.file }, f.data);
            } catch {
                /* later */
            }
        }
    return restoreFonts();
}

/* ==========================================================================
 * App - reading page and draft bench
 * --------------------------------------------------------------------------
 * One component tree, two modes:
 *   reading  the archive as published: fold/unfold pieces, play excerpts
 *   draft    the same pieces become editable, with versions, sound, formatting
 * Layout:  a fixed control column (right) over one inner scroller that holds
 * the pieces; each piece is a sticky side title plus a folding body.
 * Draft text model (see "text model" below): a piece version is a list of
 * paragraph strings. Inline marks are stored as private-use code points
 * wrapped around the marked run, so a version is plain JSON yet keeps
 * overstrike (commitment mode), italic, bold, underline and strikethrough.
 * State lives in React; the browser owns contentEditable DOM while typing and
 * is read back into strings on mode switch, version change and export.
 * Persistence: export/import of a JSON file carrying all versions + settings.
 * ========================================================================== */

/* ---- audio excerpts ------------------------------------------------------
 * Minimal player for voice excerpts: play/pause, seekable track, time readout.
 */
function fmt(s) {
    if (!isFinite(s) || s <= 0) return '0:00';
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}
function AudioPart({ id, src, label }) {
    const ref = reactExports.useRef(null);
    const [playing, setPlaying] = reactExports.useState(false);
    const [time, setTime] = reactExports.useState(0);
    const [dur, setDur] = reactExports.useState(0);
    reactExports.useEffect(() => {
        const stop = (e) => {
            if (e.detail !== id) ref.current?.pause();
        };
        window.addEventListener('wt-play', stop);
        return () => window.removeEventListener('wt-play', stop);
    }, [id]);
    const toggle = () => {
        const el = ref.current;
        if (!el) return;
        if (el.paused) {
            window.dispatchEvent(new CustomEvent('wt-play', { detail: id }));
            void el.play().catch(() => setPlaying(false));
        } else {
            el.pause();
        }
    };
    const seek = (e) => {
        const el = ref.current;
        if (!el || !dur) return;
        const r = e.currentTarget.getBoundingClientRect();
        const ratio = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
        el.currentTime = ratio * dur;
    };
    const pct = dur ? (time / dur) * 100 : 0;
    return jsxRuntimeExports.jsxs('div', {
        className: 'audio-part',
        children: [
            jsxRuntimeExports.jsx('audio', {
                ref: ref,
                src: src,
                preload: 'metadata',
                onLoadedMetadata: (e) => setDur(e.currentTarget.duration),
                onTimeUpdate: (e) => setTime(e.currentTarget.currentTime),
                onPlay: () => setPlaying(true),
                onPause: () => setPlaying(false),
                onEnded: () => {
                    setPlaying(false);
                    setTime(0);
                },
            }),
            jsxRuntimeExports.jsx('button', {
                type: 'button',
                className: 'audio-button',
                'aria-label': playing ? `Pause ${label}` : `Play ${label}`,
                onClick: toggle,
                children: playing
                    ? jsxRuntimeExports.jsxs('svg', {
                          width: '9',
                          height: '10',
                          viewBox: '0 0 9 10',
                          'aria-hidden': 'true',
                          children: [
                              jsxRuntimeExports.jsx('rect', {
                                  x: '0',
                                  y: '0',
                                  width: '3',
                                  height: '10',
                                  fill: 'currentColor',
                              }),
                              jsxRuntimeExports.jsx('rect', {
                                  x: '6',
                                  y: '0',
                                  width: '3',
                                  height: '10',
                                  fill: 'currentColor',
                              }),
                          ],
                      })
                    : jsxRuntimeExports.jsx('svg', {
                          width: '9',
                          height: '10',
                          viewBox: '0 0 9 10',
                          'aria-hidden': 'true',
                          children: jsxRuntimeExports.jsx('path', {
                              d: 'M0 0 L9 5 L0 10 Z',
                              fill: 'currentColor',
                          }),
                      }),
            }),
            jsxRuntimeExports.jsx('button', {
                type: 'button',
                className: 'audio-track',
                'aria-label': `Seek in ${label}`,
                onClick: seek,
                children: jsxRuntimeExports.jsx('span', {
                    className: 'audio-fill',
                    style: { width: `${pct}%` },
                }),
            }),
            jsxRuntimeExports.jsxs('span', {
                className: 'audio-time',
                children: [fmt(time), ' / ', fmt(dur)],
            }),
            jsxRuntimeExports.jsx('span', { className: 'audio-label', children: label }),
        ],
    });
}

/* ---- reading-mode text ---------------------------------------------------
 * Renders published blocks; parentheticals in some pieces are set in italic.
 */
function ParenText({ text }) {
    const parts = text.split(/(\([^)]*\))/g);
    return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
        children: parts.map((part, i) =>
            part.startsWith('(') && part.endsWith(')')
                ? jsxRuntimeExports.jsx('em', { children: part }, i)
                : jsxRuntimeExports.jsx(React.Fragment, { children: part }, i),
        ),
    });
}
function BlockText({ block, italics }) {
    if (Array.isArray(block)) {
        return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
            children: block.map((line, i) =>
                jsxRuntimeExports.jsx(
                    'p',
                    { children: italics ? jsxRuntimeExports.jsx(ParenText, { text: line }) : line },
                    i,
                ),
            ),
        });
    }
    return jsxRuntimeExports.jsx('p', {
        children: italics ? jsxRuntimeExports.jsx(ParenText, { text: block }) : block,
    });
}
const ARCHIVE_SUMMARY =
    'unarchive of the writings on the inverted dream/wake state — pieces composed live, dream and wake states trading places until the cyclical phase unfolds. twenty-three so far, newest first. some have voice excerpts. each piece ends where it ends';
/*
 * Cover - the main page: the folders in one centered column, and a + under them.
 * The + turns into a bare name field (just the crimson caret); Enter makes the folder and opens it in
 * draft mode with a new piece. A folder's name is edited in the same field: double-click it, or hold
 * it on a phone. Folders from pieces.json come first; folders made on the page follow.
 */
function NameField({ initial, onDone }) {
    const [name, setName] = reactExports.useState(initial);
    const finish = (keep) => onDone(keep && name.trim() ? name.trim() : null);
    return jsxRuntimeExports.jsx('input', {
        className: 'cover-name',
        autoFocus: true,
        value: name,
        maxLength: 60,
        size: Math.max(1, name.length + 1),
        'aria-label': 'folder name',
        onFocus: (e) => e.currentTarget.setSelectionRange(name.length, name.length),
        onChange: (e) => setName(e.target.value),
        onKeyDown: (e) => {
            if (e.key === 'Enter') finish(true);
            if (e.key === 'Escape') finish(false);
        },
        onBlur: () => finish(!!initial),
    });
}
function Cover({ folders, count, onOpen, onCreate, onRename }) {
    const [naming, setNaming] = reactExports.useState(false); // the + is a name field
    const [editing, setEditing] = reactExports.useState(null); // a folder being renamed
    const hold = reactExports.useRef(undefined);
    const held = reactExports.useRef(false);
    const press = (id) => {
        held.current = false;
        hold.current = window.setTimeout(() => {
            held.current = true;
            setEditing(id);
        }, 550);
    };
    const release = () => window.clearTimeout(hold.current);
    return jsxRuntimeExports.jsxs('div', {
        className: 'cover',
        children: [
            jsxRuntimeExports.jsx('nav', {
                className: 'cover-folders',
                'aria-label': 'folders',
                children: folders.map((f) =>
                    editing === f.id
                        ? jsxRuntimeExports.jsx(
                              NameField,
                              {
                                  initial: f.title,
                                  onDone: (n) => {
                                      if (n) onRename(f.id, n);
                                      setEditing(null);
                                  },
                              },
                              f.id,
                          )
                        : jsxRuntimeExports.jsxs(
                              'button',
                              {
                                  type: 'button',
                                  className: 'cover-folder',
                                  onClick: () => {
                                      if (!held.current) onOpen(f.id);
                                  },
                                  onDoubleClick: () => setEditing(f.id),
                                  onPointerDown: () => press(f.id),
                                  onPointerUp: release,
                                  onPointerLeave: release,
                                  onContextMenu: (e) => e.preventDefault(),
                                  children: [
                                      jsxRuntimeExports.jsx('span', {
                                          className: 'cover-folder-title',
                                          children: f.title,
                                      }),
                                      jsxRuntimeExports.jsx('span', {
                                          className: 'cover-folder-count',
                                          children: count(f.id),
                                      }),
                                  ],
                              },
                              f.id,
                          ),
                ),
            }),
            jsxRuntimeExports.jsx('div', {
                className: 'cover-new',
                children: naming
                    ? jsxRuntimeExports.jsx(NameField, {
                          initial: '',
                          onDone: (n) => {
                              setNaming(false);
                              if (n) onCreate(n);
                          },
                      })
                    : jsxRuntimeExports.jsx('button', {
                          type: 'button',
                          className: 'cover-add',
                          'aria-label': 'new folder',
                          onClick: () => setNaming(true),
                          children: '+',
                      }),
            }),
        ],
    });
}

/* ---- archive end ---------------------------------------------------------
 * The closing middots of the archive; they unfold a short summary.
 */
function ArchiveEnd() {
    const [open, setOpen] = reactExports.useState(false);
    return jsxRuntimeExports.jsxs('div', {
        className: open ? 'archive-end open' : 'archive-end',
        children: [
            jsxRuntimeExports.jsx('button', {
                type: 'button',
                className: 'archive-middots',
                onClick: () => setOpen((o) => !o),
                'aria-expanded': open,
                'aria-label': 'about this archive',
                children: '\u00B7 \u00B7',
            }),
            jsxRuntimeExports.jsx('div', {
                className: 'archive-fold',
                children: jsxRuntimeExports.jsxs('div', {
                    className: 'archive-fold-inner',
                    children: [
                        jsxRuntimeExports.jsx('div', {
                            className: 'archive-summary',
                            children: jsxRuntimeExports.jsx('p', { children: ARCHIVE_SUMMARY }),
                        }),
                        jsxRuntimeExports.jsx('p', {
                            className: 'endmark archive-endmark',
                            children: '\u00B7 \u00B7',
                        }),
                    ],
                }),
            }),
        ],
    });
}

/* ---- reading-mode piece --------------------------------------------------
 * Sticky side title + date; the body folds open under it.
 */
function Story({ piece, open, onToggle }) {
    return jsxRuntimeExports.jsxs('section', {
        className: `story${open ? ' open' : ''}${piece.dialogue ? ' dialogue' : ''}`,
        id: piece.id,
        children: [
            jsxRuntimeExports.jsxs('div', {
                className: 'story-head',
                children: [
                    jsxRuntimeExports.jsx('button', {
                        type: 'button',
                        className: 'fold-dot',
                        onClick: onToggle,
                        'aria-expanded': open,
                        'aria-label': open ? `fold ${piece.title}` : `unfold ${piece.title}`,
                        children: '\u00B7',
                    }),
                    jsxRuntimeExports.jsxs('button', {
                        type: 'button',
                        className: 'story-head-main',
                        onClick: onToggle,
                        'aria-expanded': open,
                        children: [
                            jsxRuntimeExports.jsx('span', {
                                className: 'story-title',
                                children: piece.title,
                            }),
                            jsxRuntimeExports.jsx('span', {
                                className: 'story-when',
                                children: piece.when,
                            }),
                        ],
                    }),
                ],
            }),
            jsxRuntimeExports.jsx('div', {
                className: 'story-fold',
                children: jsxRuntimeExports.jsxs('div', {
                    className: 'story-body',
                    children: [
                        jsxRuntimeExports.jsx('div', {
                            className: 'story-text',
                            children: piece.blocks.map((b, i) =>
                                jsxRuntimeExports.jsx(
                                    BlockText,
                                    { block: b, italics: piece.id === 'wrong-night' },
                                    i,
                                ),
                            ),
                        }),
                        piece.audio.length > 0 &&
                            jsxRuntimeExports.jsx('div', {
                                className: 'story-audio',
                                children: piece.audio.map((a, i) =>
                                    jsxRuntimeExports.jsx(
                                        AudioPart,
                                        { id: `${piece.id}-${i}`, src: a.src, label: a.label },
                                        i,
                                    ),
                                ),
                            }),
                        piece.note &&
                            jsxRuntimeExports.jsx('div', {
                                className: 'story-note',
                                children: piece.note,
                            }),
                        jsxRuntimeExports.jsx('p', {
                            className: 'endmark',
                            children: '\u00B7 \u00B7',
                        }),
                    ],
                }),
            }),
        ],
    });
}
const nowStamp = () => {
    const d = new Date();
    const p = (n) => String(n).padStart(2, '0');
    return `${String(d.getFullYear()).slice(2)}.${p(d.getMonth() + 1)}.${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
};
const flatLines = (p) => {
    const lines = p.blocks.flatMap((b) => (Array.isArray(b) ? b : [b]));
    // the reading page sets this piece's parentheticals in italic; the draft carries that as real italic runs
    return p.id === 'wrong-night'
        ? lines.map((l) => l.replace(/(\([^)]*\))/g, '\uE002$1\uE003'))
        : lines;
};
const TEXT_PT = [8, 48];
const INDEX_PT = [6, 24];
const clampPt = (v, [lo, hi]) => Math.round(Math.min(hi, Math.max(lo, v)) * 2) / 2;
/* a size you type: digits in the circle, Enter or leaving sets it, arrows nudge by one */
function SizeField({ label, value, range, onSet }) {
    const [draft, setDraft] = reactExports.useState(null);
    const commitDraft = () => {
        if (draft === null) return;
        const n = parseFloat(draft.replace(',', '.'));
        if (!isNaN(n)) onSet(clampPt(n, range));
        setDraft(null);
    };
    return jsxRuntimeExports.jsx('label', {
        className: 'size-field',
        'data-tip': `${label} size · pt`,
        children: jsxRuntimeExports.jsx('input', {
            type: 'text',
            inputMode: 'decimal',
            'aria-label': `${label} size in points`,
            value: draft ?? String(value),
            onFocus: (e) => {
                setDraft(String(value));
                requestAnimationFrame(() => e.target.select());
            },
            onChange: (e) => setDraft(e.target.value.replace(/[^0-9.,]/g, '').slice(0, 4)),
            onBlur: commitDraft,
            onKeyDown: (e) => {
                e.stopPropagation();
                if (e.key === 'Enter') {
                    commitDraft();
                    e.target.blur();
                } else if (e.key === 'Escape') {
                    setDraft(null);
                    e.target.blur();
                } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    const base = parseFloat((draft ?? String(value)).replace(',', '.'));
                    const next = clampPt(
                        (isNaN(base) ? value : base) + (e.key === 'ArrowUp' ? 1 : -1),
                        range,
                    );
                    onSet(next);
                    setDraft(String(next));
                }
            },
        }),
    });
}
const ERA_TIPS = {
    iron: '1900s heavy standard',
    noiseless: '1930s noiseless',
    portable: '1950s portable',
    electric: '1970s electric',
    keys: '1980s keys',
};

/* ---- local persistence helpers -------------------------------------------
 * Best-effort localStorage wrappers; silently no-op where storage is blocked.
 */
function storeGet(key) {
    try {
        return window.localStorage.getItem(key);
    } catch {
        return null;
    }
}
function storeSet(key, value) {
    try {
        window.localStorage.setItem(key, value);
    } catch {
        /* storage unavailable in the sandboxed frame */
    }
}
/* sound fires on keydown - the earliest event a key produces */

/* ---- typing sound hook ---------------------------------------------------
 * Attaches keydown -> playSound to an editable element once.
 */
function attachTypeSound(el, pref) {
    if (!el || el.__wtSound) return;
    el.__wtSound = true;
    el.addEventListener('keydown', (e) => {
        const s = pref.current;
        if (!s.on || e.isComposing) return;
        const k = classifyKeydown(e);
        if (k) playSound(s.era, k);
    });
    el.addEventListener('focus', () => warmAudio());
}
/* ---- text model: paragraphs as strings; soft line breaks are \n inside a paragraph;
   overstruck runs (commitment mode) are wrapped in U+E000 ... U+E001 ---- */
const OV_OPEN = '\uE000';
const OV_CLOSE = '\uE001';
const BLOCK = /^(P|DIV|LI|H[1-6]|BLOCKQUOTE|PRE)$/;
/* hand formatting rides the same way: italic E002..E003, bold E004..E005, underline E006..E007,
   strikethrough E008..E009 (a chosen strike, separate from commitment mode's overstrike) */
const FX = [
    { key: 'i', tag: 'EM', open: '\uE002', close: '\uE003' },
    { key: 'b', tag: 'STRONG', open: '\uE004', close: '\uE005' },
    { key: 'u', tag: 'U', open: '\uE006', close: '\uE007' },
    { key: 's', tag: 'DEL', open: '\uE008', close: '\uE009' },
];
const FX_TAG = {
    EM: ['\uE002', '\uE003'],
    I: ['\uE002', '\uE003'],
    STRONG: ['\uE004', '\uE005'],
    B: ['\uE004', '\uE005'],
    U: ['\uE006', '\uE007'],
    DEL: ['\uE008', '\uE009'],
    S: ['\uE008', '\uE009'],
    STRIKE: ['\uE008', '\uE009'],
};
function readInline(node) {
    let out = '';
    node.childNodes.forEach((c) => {
        if (c.nodeType === 3) out += c.data.replace(/\u00a0/g, ' ').replace(/\u200b/g, '');
        else if (c.nodeName === 'BR') out += '\n';
        else if (c instanceof HTMLElement && c.classList.contains('ov')) {
            const inner = readInline(c).replace(/[\uE000\uE001]/g, '');
            if (inner) out += OV_OPEN + inner + OV_CLOSE;
        } else if (c instanceof HTMLElement && FX_TAG[c.nodeName] && !c.classList.contains('ov')) {
            const [o, cl] = FX_TAG[c.nodeName];
            const inner = readInline(c);
            if (inner.replace(/[\uE000-\uE009]/g, '')) out += o + inner + cl;
        } else out += readInline(c);
    });
    return out;
}
/* reads an editable body back into paragraphs exactly as they sit on screen:
   every block is a paragraph (empty ones included), <br> and newline text are soft breaks */
function readParas(root) {
    const paras = [];
    let loose = null;
    const flushLoose = () => {
        if (loose !== null) {
            paras.push(loose);
            loose = null;
        }
    };
    root.childNodes.forEach((c) => {
        if (c.nodeType === 1 && BLOCK.test(c.nodeName)) {
            flushLoose();
            paras.push(readInline(c));
        } else {
            const t =
                c.nodeType === 3
                    ? c.data.replace(/\u00a0/g, ' ')
                    : c.nodeName === 'BR'
                      ? '\n'
                      : readInline(c);
            loose = (loose ?? '') + t;
        }
    });
    flushLoose();
    // an empty block that only holds its placeholder <br> is an empty paragraph
    return paras.map((p) =>
        p === '\n'
            ? ''
            : p
                  .replace(/\uE000\uE001/g, '')
                  .replace(/\uE001\uE000/g, '')
                  .replace(/\uE002\uE003|\uE004\uE005|\uE006\uE007|\uE008\uE009/g, '')
                  .replace(/\uE003\uE002/g, '')
                  .replace(/\uE005\uE004/g, '')
                  .replace(/\uE007\uE006/g, '')
                  .replace(/\uE009\uE008/g, ''),
    );
}
function readTitle(el) {
    return (el.textContent || '').replace(/\u00a0/g, ' ').replace(/\s*\n\s*/g, ' ');
}
/* renders a paragraph string with its marks as nested elements (marks nest properly: they were read off a DOM tree) */
function ParaText({ text }) {
    if (!/[\uE000-\uE009]/.test(text))
        return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: text });
    let i = 0;
    let k = 0;
    const walk = (closer) => {
        const out = [];
        let buf = '';
        const flush = () => {
            if (buf) {
                out.push(jsxRuntimeExports.jsx(React.Fragment, { children: buf }, k++));
                buf = '';
            }
        };
        while (i < text.length) {
            const ch = text[i];
            if (closer !== null && ch === closer) {
                i++;
                flush();
                return out;
            }
            if (ch === OV_OPEN) {
                i++;
                flush();
                out.push(
                    jsxRuntimeExports.jsx('s', { className: 'ov', children: walk(OV_CLOSE) }, k++),
                );
                continue;
            }
            const fx = FX.find((f) => f.open === ch);
            if (fx) {
                i++;
                flush();
                const kids = walk(fx.close);
                out.push(
                    fx.key === 'i'
                        ? jsxRuntimeExports.jsx('em', { children: kids }, k++)
                        : fx.key === 'b'
                          ? jsxRuntimeExports.jsx('strong', { children: kids }, k++)
                          : fx.key === 'u'
                            ? jsxRuntimeExports.jsx('u', { children: kids }, k++)
                            : jsxRuntimeExports.jsx('del', { children: kids }, k++),
                );
                continue;
            }
            if (/[\uE000-\uE009]/.test(ch)) {
                i++;
                continue;
            } // a stray closer
            buf += ch;
            i++;
        }
        flush();
        return out;
    };
    return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: walk(null) });
}

/* ---- hand formatting -----------------------------------------------------
 * Italic / bold / underline / strikethrough applied to a selection by wrapping
 * or lifting text nodes. The palette appears after a short rest on a selection.
 */
function fxAncestor(n, root, tag) {
    const tags = Object.keys(FX_TAG).filter((t) => FX_TAG[t][0] === FX_TAG[tag][0]);
    while (n && n !== root) {
        if (n instanceof HTMLElement && tags.includes(n.nodeName) && !n.classList.contains('ov'))
            return n;
        n = n.parentNode;
    }
    return null;
}
/* text nodes inside the range, split so each one lies wholly within it */
function rangeTextNodes(root, range) {
    const nodes = textNodesIn(root).filter((t) => range.intersectsNode(t) && t.data.length);
    const out = [];
    nodes.forEach((t) => {
        let node = t;
        const from = node === range.startContainer ? range.startOffset : 0;
        const to = node === range.endContainer ? range.endOffset : node.data.length;
        if (from >= to) return;
        if (to < node.data.length) node.splitText(to);
        if (from > 0) node = node.splitText(from);
        out.push(node);
    });
    return out;
}
/* pull one text node out of a formatting ancestor, splitting the ancestor around it */
function liftOut(node, anc) {
    const before = document.createRange();
    before.setStart(anc, 0);
    before.setEndBefore(node);
    const pre = before.extractContents();
    if (pre.textContent) {
        const c = anc.cloneNode(false);
        c.appendChild(pre);
        anc.before(c);
    }
    const after = document.createRange();
    after.setStartAfter(node);
    after.setEnd(anc, anc.childNodes.length);
    const post = after.extractContents();
    if (post.textContent) {
        const c = anc.cloneNode(false);
        c.appendChild(post);
        anc.after(c);
    }
    while (anc.firstChild) anc.before(anc.firstChild);
    anc.remove();
}
function fxState(root, range, tag) {
    const nodes = textNodesIn(root).filter((t) => range.intersectsNode(t) && t.data.trim().length);
    return nodes.length > 0 && nodes.every((t) => fxAncestor(t, root, tag));
}
function toggleFx(root, tag) {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return;
    const range = sel.getRangeAt(0);
    if (range.collapsed || !root.contains(range.commonAncestorContainer)) return;
    const on = fxState(root, range, tag);
    const nodes = rangeTextNodes(root, range);
    if (!nodes.length) return;
    nodes.forEach((t) => {
        if (on) {
            let a = fxAncestor(t, root, tag);
            while (a) {
                liftOut(t, a);
                a = fxAncestor(t, root, tag);
            }
        } else if (!fxAncestor(t, root, tag)) {
            const w = document.createElement(tag.toLowerCase());
            t.before(w);
            w.appendChild(t);
        }
    });
    // merge touching twins so the marks stay tidy
    root.querySelectorAll('em, strong, u, del').forEach((el) => {
        const next = el.nextSibling;
        if (
            next instanceof HTMLElement &&
            next.nodeName === el.nodeName &&
            !next.classList.contains('ov')
        ) {
            while (next.firstChild) el.appendChild(next.firstChild);
            next.remove();
        }
    });
    const nr = document.createRange();
    nr.setStartBefore(nodes[0]);
    nr.setEndAfter(nodes[nodes.length - 1]);
    sel.removeAllRanges();
    sel.addRange(nr);
    root.dispatchEvent(new Event('input', { bubbles: true }));
}
/* the style palette: rises near a selection in a draft body after a short rest */
function FxPalette() {
    const [pos, setPos] = reactExports.useState(null);
    const [, bump] = reactExports.useState(0);
    const timer = reactExports.useRef(undefined);
    const hovering = reactExports.useRef(false);
    reactExports.useEffect(() => {
        const check = () => {
            window.clearTimeout(timer.current);
            const sel = window.getSelection();
            const r = sel && sel.rangeCount ? sel.getRangeAt(0) : null;
            const host =
                r && !r.collapsed
                    ? (r.commonAncestorContainer.nodeType === 1
                          ? r.commonAncestorContainer
                          : r.commonAncestorContainer.parentElement
                      )?.closest('.story-text.editable')
                    : null;
            if (!r || !host) {
                if (!hovering.current) setPos(null);
                return;
            }
            timer.current = window.setTimeout(() => {
                const rects = r.getClientRects();
                const first = rects[0] ?? r.getBoundingClientRect();
                const box = r.getBoundingClientRect();
                setPos({
                    x: Math.max(8, Math.min(first.left, window.innerWidth - 150)),
                    y: box.top,
                    root: host,
                });
            }, 450);
        };
        document.addEventListener('selectionchange', check);
        const onScroll = () => {
            if (!hovering.current) setPos(null);
        };
        window.addEventListener('scroll', onScroll, true);
        return () => {
            document.removeEventListener('selectionchange', check);
            window.removeEventListener('scroll', onScroll, true);
            window.clearTimeout(timer.current);
        };
    }, []);
    if (!pos) return null;
    const sel = window.getSelection();
    const r = sel && sel.rangeCount ? sel.getRangeAt(0) : null;
    const above = pos.y > 52;
    return jsxRuntimeExports.jsx('div', {
        className: 'fx-palette',
        style: { left: pos.x, top: above ? pos.y - 40 : pos.y + 28 },
        onMouseEnter: () => {
            hovering.current = true;
        },
        onMouseLeave: () => {
            hovering.current = false;
        },
        onMouseDown: (e) => e.preventDefault(),
        children: FX.map((f) =>
            jsxRuntimeExports.jsx(
                'button',
                {
                    type: 'button',
                    'aria-label': { i: 'italic', b: 'bold', u: 'underline', s: 'strikethrough' }[
                        f.key
                    ],
                    className: `fx-${f.key}${r && fxState(pos.root, r, f.tag) ? ' on' : ''}`,
                    onClick: () => {
                        toggleFx(pos.root, f.tag);
                        bump((n) => n + 1);
                    },
                    children:
                        f.key === 'i'
                            ? jsxRuntimeExports.jsx('em', { children: 'i' })
                            : f.key === 'b'
                              ? jsxRuntimeExports.jsx('strong', { children: 'b' })
                              : f.key === 'u'
                                ? jsxRuntimeExports.jsx('u', { children: 'u' })
                                : jsxRuntimeExports.jsx('del', { children: 's' }),
                },
                f.key,
            ),
        ),
    });
}
const sameLines = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);

/* ---- commitment mode -----------------------------------------------------
 * Deleting strikes text through instead of removing it. These helpers walk,
 * split and merge the <s class="ov"> runs while keeping the caret in place.
 */
function ovAncestor(n, root) {
    while (n && n !== root) {
        if (n instanceof HTMLElement && n.classList.contains('ov')) return n;
        n = n.parentNode;
    }
    return null;
}
function textNodesIn(root) {
    const out = [];
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = w.nextNode())) out.push(n);
    return out;
}
function wrapOv(root, node, from, to) {
    if (ovAncestor(node, root) || from >= to) return;
    let target = node;
    if (from > 0) target = target.splitText(from);
    if (to - from < target.data.length) target.splitText(to - from);
    const s = document.createElement('s');
    s.className = 'ov';
    target.parentNode.insertBefore(s, target);
    s.appendChild(target);
}
function mergeOv(root) {
    root.querySelectorAll('s.ov').forEach((el) => {
        const next = el.nextSibling;
        if (next instanceof HTMLElement && next.classList.contains('ov')) {
            while (next.firstChild) el.appendChild(next.firstChild);
            next.remove();
        }
        if (!el.textContent) el.remove();
    });
    root.querySelectorAll('s.ov').forEach((el) => el.normalize());
}
/* strike every unstruck character inside a range */
function strikeRange(root, range) {
    const nodes = textNodesIn(root).filter((t) => range.intersectsNode(t));
    nodes.forEach((t) => {
        const from = t === range.startContainer ? range.startOffset : 0;
        const to = t === range.endContainer ? range.endOffset : t.data.length;
        wrapOv(root, t, from, to);
    });
    mergeOv(root);
}
/* backspace on paper: the nearest unstruck characters before the caret get struck,
   the carriage stays where it was */
function strikeBack(root, caret, word, forward) {
    const nodes = textNodesIn(root);
    // flatten unstruck positions in document order
    const pos = [];
    nodes.forEach((t) => {
        if (!ovAncestor(t, root)) for (let i = 0; i < t.data.length; i++) pos.push({ t, i });
    });
    const before = (p) => {
        const r = document.createRange();
        r.setStart(p.t, p.i);
        return r.compareBoundaryPoints(Range.START_TO_START, caret) < 0;
    };
    let idx;
    if (!forward) {
        idx = -1;
        for (let k = pos.length - 1; k >= 0; k--)
            if (before(pos[k])) {
                idx = k;
                break;
            }
        if (idx < 0) return;
        let lo = idx;
        if (word) {
            while (lo > 0 && /\s/.test(pos[lo].t.data[pos[lo].i])) lo--;
            while (lo > 0 && !/\s/.test(pos[lo - 1].t.data[pos[lo - 1].i])) lo--;
        }
        for (let k = idx; k >= lo; k--) wrapOv(root, pos[k].t, pos[k].i, pos[k].i + 1);
    } else {
        idx = pos.findIndex((p) => !before(p));
        if (idx < 0) return;
        let hi = idx;
        if (word) {
            while (hi < pos.length - 1 && /\s/.test(pos[hi].t.data[pos[hi].i])) hi++;
            while (hi < pos.length - 1 && !/\s/.test(pos[hi + 1].t.data[pos[hi + 1].i])) hi++;
        }
        for (let k = hi; k >= idx; k--) wrapOv(root, pos[k].t, pos[k].i, pos[k].i + 1);
    }
    mergeOv(root);
}
/* caret after a struck run: new letters must land outside the strike */
function caretOutsideOv(root) {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return false;
    const r = sel.getRangeAt(0);
    const ov = ovAncestor(r.startContainer, root);
    if (ov) {
        const after = document.createRange();
        after.setStartAfter(ov);
        after.collapse(true);
        sel.removeAllRanges();
        sel.addRange(after);
        return true;
    }
    return false;
}
/* is the caret touching a struck run (inside it, or right after it)? */
function ovAtCaret(root, r) {
    if (ovAncestor(r.startContainer, root)) return true;
    const c = r.startContainer;
    let prev = null;
    if (c.nodeType === 3) prev = r.startOffset === 0 ? c.previousSibling : null;
    else prev = c.childNodes[r.startOffset - 1] ?? null;
    return prev instanceof HTMLElement && prev.classList.contains('ov');
}
function insertPlain(root, text) {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return;
    const r = sel.getRangeAt(0);
    const node = document.createTextNode(text);
    r.insertNode(node);
    const after = document.createRange();
    after.setStart(node, node.data.length);
    after.collapse(true);
    sel.removeAllRanges();
    sel.addRange(after);
    root.normalize();
}
/* Enter makes a real paragraph (its own block, indented like the archive's), Shift+Enter a soft line */
function splitParagraph(root) {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return;
    const r = sel.getRangeAt(0);
    let block = r.startContainer;
    while (block && block.parentNode !== root) block = block.parentNode;
    const np = document.createElement('p');
    if (
        !block ||
        block === root ||
        !(block instanceof HTMLElement) ||
        !BLOCK.test(block.nodeName)
    ) {
        // loose text at the root: wrap everything up to the caret into its own paragraph first
        const head = document.createElement('p');
        const pre = document.createRange();
        pre.setStart(root, 0);
        pre.setEnd(r.startContainer, r.startOffset);
        head.appendChild(pre.extractContents());
        const tail = document.createRange();
        tail.selectNodeContents(root);
        np.appendChild(tail.extractContents());
        root.appendChild(head);
        root.appendChild(np);
    } else {
        const tail = document.createRange();
        tail.setStart(r.startContainer, r.startOffset);
        tail.setEnd(block, block.childNodes.length);
        np.appendChild(tail.extractContents());
        block.after(np);
        block.querySelectorAll('s.ov').forEach((e) => {
            if (!e.textContent) e.remove();
        });
        if (!block.textContent) block.innerHTML = '<br>';
    }
    np.querySelectorAll('s.ov').forEach((e) => {
        if (!e.textContent) e.remove();
    });
    if (!np.textContent) np.innerHTML = '<br>';
    // a trailing newline left at the split point would render nothing but survive as a stray break
    const c = document.createRange();
    c.setStart(np, 0);
    c.collapse(true);
    sel.removeAllRanges();
    sel.addRange(c);
}

/* ---- editor input pipeline -----------------------------------------------
 * Intercepts beforeinput/keydown on draft bodies: Enter makes a real paragraph,
 * formatting shortcuts, and commitment-mode deletes.
 */
function attachCommit(el, pref) {
    if (!el || el.__wtCommit) return;
    el.__wtCommit = true;
    const fire = () => el.dispatchEvent(new Event('input', { bubbles: true }));
    // Enter = new paragraph block; Shift+Enter stays a soft line inside the paragraph
    el.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && !e.altKey && el.classList.contains('story-text')) {
            const k = e.key.toLowerCase();
            const tag =
                k === 'i'
                    ? 'EM'
                    : k === 'b'
                      ? 'STRONG'
                      : k === 'u'
                        ? 'U'
                        : k === 'x' && e.shiftKey
                          ? 'DEL'
                          : '';
            if (tag) {
                e.preventDefault();
                toggleFx(el, tag);
                return;
            }
        }
        if (e.key !== 'Enter' || e.shiftKey || e.isComposing || e.metaKey || e.ctrlKey || e.altKey)
            return;
        e.preventDefault();
        const sel = window.getSelection();
        if (!sel || !sel.rangeCount) return;
        const range = sel.getRangeAt(0);
        if (!range.collapsed) {
            if (pref.current.commit) strikeRange(el, range);
            else range.deleteContents();
            const end = document.createRange();
            end.setStart(range.endContainer, range.endOffset);
            sel.removeAllRanges();
            sel.addRange(end);
            caretOutsideOv(el);
        }
        splitParagraph(el);
        fire();
    });
    el.addEventListener('beforeinput', (ev) => {
        const e = ev;
        const sel = window.getSelection();
        if (!sel || !sel.rangeCount) return;
        const range = sel.getRangeAt(0);
        const t = e.inputType;
        if (t === 'insertParagraph') {
            e.preventDefault();
            if (!range.collapsed) {
                if (pref.current.commit) strikeRange(el, range);
                else range.deleteContents();
                const end = document.createRange();
                end.setStart(range.endContainer, range.endOffset);
                sel.removeAllRanges();
                sel.addRange(end);
                caretOutsideOv(el);
            }
            splitParagraph(el);
            fire();
            return;
        }
        if (!pref.current.commit) {
            if (t === 'insertText' && e.data && range.collapsed && ovAtCaret(el, range)) {
                e.preventDefault();
                caretOutsideOv(el);
                insertPlain(el, e.data);
                fire();
            }
            return;
        }
        if (t.startsWith('delete')) {
            e.preventDefault();
            if (!range.collapsed) {
                strikeRange(el, range);
                const end = document.createRange();
                end.setStart(range.endContainer, range.endOffset);
                sel.removeAllRanges();
                sel.addRange(end);
            } else {
                // a comment marks the carriage so splitting text around it can't move the caret
                const mark = document.createComment('c');
                range.insertNode(mark);
                const at = document.createRange();
                at.setStartAfter(mark);
                at.collapse(true);
                if (
                    t === 'deleteContentBackward' ||
                    t === 'deleteWordBackward' ||
                    t === 'deleteSoftLineBackward' ||
                    t === 'deleteHardLineBackward'
                ) {
                    strikeBack(el, at, t !== 'deleteContentBackward', false);
                } else {
                    strikeBack(el, at, t !== 'deleteContentForward', true);
                }
                const back = document.createRange();
                if (mark.parentNode) {
                    back.setStartBefore(mark);
                    back.collapse(true);
                }
                mark.remove();
                sel.removeAllRanges();
                sel.addRange(back);
            }
            // keep the carriage outside the strike it just made
            caretOutsideOv(el);
            fire();
            return;
        }
        if (
            t === 'insertText' ||
            t === 'insertReplacementText' ||
            t === 'insertFromPaste' ||
            t === 'insertLineBreak'
        ) {
            // typing over a selection strikes it first, then writes after it
            if (!range.collapsed) {
                strikeRange(el, range);
                const end = document.createRange();
                end.setStart(range.endContainer, range.endOffset);
                sel.removeAllRanges();
                sel.addRange(end);
                caretOutsideOv(el);
                if (t === 'insertText' && e.data) {
                    e.preventDefault();
                    insertPlain(el, e.data);
                    fire();
                }
                return;
            }
            if (ovAtCaret(el, range) && t === 'insertText' && e.data) {
                e.preventDefault();
                caretOutsideOv(el);
                insertPlain(el, e.data);
                fire();
            }
        }
    });
}
/* contentEditable regions capture their seed once per version identity so React
   re-renders never reconcile against browser-mutated DOM (which duplicates text) */

/* ---- draft-mode piece ----------------------------------------------------
 * Editable title/body seeded once per version, so React never reconciles
 * against DOM the browser is editing. WorkStory adds the version stack.
 */
function EditableTitle({ id, title, register, onInput }) {
    const [initial] = reactExports.useState(title);
    return jsxRuntimeExports.jsx('span', {
        className: 'story-title editable',
        contentEditable: 'plaintext-only',
        suppressContentEditableWarning: true,
        spellCheck: false,
        'data-ph': 'title',
        ref: (el) => register(id, 'title', el),
        onInput: onInput,
        children: initial,
    });
}
function EditableBody({ id, lines, register, onInput }) {
    const [initial] = reactExports.useState(lines);
    return jsxRuntimeExports.jsx('div', {
        className: 'story-text editable',
        contentEditable: 'plaintext-only',
        suppressContentEditableWarning: true,
        spellCheck: false,
        ref: (el) => register(id, 'text', el),
        onInput: onInput,
        children: (initial.length ? initial : ['']).map((line, i) =>
            jsxRuntimeExports.jsx(
                'p',
                { children: line ? jsxRuntimeExports.jsx(ParaText, { text: line }) : null },
                i,
            ),
        ),
    });
}
function WorkStory({
    wp,
    open,
    onToggle,
    register,
    onEditInput,
    onLoadVersion,
    onDuplicate,
    onRemove,
}) {
    const v = wp.versions[wp.current];
    const [hoverV, setHoverV] = reactExports.useState(null);
    return jsxRuntimeExports.jsxs('section', {
        className: `story${open ? ' open' : ''} draft-story${PIECES.find((p) => p.id === wp.id)?.dialogue ? ' dialogue' : ''}`,
        id: wp.id,
        children: [
            jsxRuntimeExports.jsxs('div', {
                className: 'story-head',
                children: [
                    jsxRuntimeExports.jsx('button', {
                        type: 'button',
                        className: 'fold-dot',
                        onClick: onToggle,
                        'aria-expanded': open,
                        'aria-label': open ? 'fold piece' : 'unfold piece',
                        children: '\u00B7',
                    }),
                    jsxRuntimeExports.jsx(
                        EditableTitle,
                        {
                            id: wp.id,
                            title: v.title,
                            register: register,
                            onInput: () => onEditInput(wp.id),
                        },
                        `t-${wp.seat}`,
                    ),
                    jsxRuntimeExports.jsxs('span', {
                        className: 'version-stack',
                        children: [
                            wp.versions.map((ver, i) =>
                                jsxRuntimeExports.jsx(
                                    'span',
                                    {
                                        className: i === wp.current ? 'vrow current' : 'vrow',
                                        children: jsxRuntimeExports.jsx('span', {
                                            className: 'vrow-inner',
                                            children: jsxRuntimeExports.jsx('button', {
                                                type: 'button',
                                                tabIndex: open || i === wp.current ? 0 : -1,
                                                className:
                                                    i === wp.current
                                                        ? 'story-when version current'
                                                        : 'story-when version',
                                                onClick: () => onLoadVersion(wp.id, i),
                                                onMouseEnter: () => setHoverV(i),
                                                onMouseLeave: () => setHoverV(null),
                                                children:
                                                    hoverV === i && ver.born !== ver.when
                                                        ? ver.born
                                                        : ver.when,
                                            }),
                                        }),
                                    },
                                    ver.vid,
                                ),
                            ),
                            jsxRuntimeExports.jsx('span', {
                                className: 'vrow add',
                                children: jsxRuntimeExports.jsx('span', {
                                    className: 'vrow-inner',
                                    children: jsxRuntimeExports.jsx('button', {
                                        type: 'button',
                                        tabIndex: open ? 0 : -1,
                                        className: 'version-add',
                                        'aria-label': 'new version',
                                        title: 'new version',
                                        onClick: () => onDuplicate(wp.id),
                                        children: '+',
                                    }),
                                }),
                            }),
                        ],
                    }),
                    !wp.published &&
                        jsxRuntimeExports.jsx('button', {
                            type: 'button',
                            className: 'draft-remove',
                            'aria-label': 'remove draft',
                            title: 'remove draft',
                            onClick: () => onRemove(wp.id),
                            children: '\u00D7',
                        }),
                ],
            }),
            jsxRuntimeExports.jsx('div', {
                className: 'story-fold',
                children: jsxRuntimeExports.jsxs('div', {
                    className: 'story-body',
                    children: [
                        jsxRuntimeExports.jsx(
                            EditableBody,
                            {
                                id: wp.id,
                                lines: v.lines,
                                register: register,
                                onInput: () => onEditInput(wp.id),
                            },
                            `b-${wp.seat}`,
                        ),
                        wp.audio.length > 0 &&
                            jsxRuntimeExports.jsx('div', {
                                className: 'story-audio',
                                children: wp.audio.map((a, i) =>
                                    jsxRuntimeExports.jsx(
                                        AudioPart,
                                        { id: `${wp.id}-${i}`, src: a.src, label: a.label },
                                        i,
                                    ),
                                ),
                            }),
                        wp.note &&
                            jsxRuntimeExports.jsx('div', {
                                className: 'story-note',
                                children: wp.note,
                            }),
                        wp.hasEndmark &&
                            jsxRuntimeExports.jsx('p', {
                                className: 'endmark',
                                children: '\u00B7 \u00B7',
                            }),
                    ],
                }),
            }),
        ],
    });
}
/*
 * placePanel - put a pop-out panel (type shelf, sync) to the left of its button and keep it
 * on screen: centred on the button where it fits, pushed in where it doesn't, and never wider
 * than the room left of the button (narrow phones).
 */
function placePanel(list, widget) {
    const w = widget.getBoundingClientRect();
    list.style.maxWidth = `${Math.max(120, w.left - 10 - 8)}px`;
    const h = list.offsetHeight;
    const top = Math.max(12, Math.min(w.top + w.height / 2 - h / 2, window.innerHeight - h - 12));
    list.style.top = `${top}px`;
    list.style.right = `${window.innerWidth - w.left + 10}px`;
}
/* type shelf picker: click opens the whole shelf, each name set in its own face; hovering a name
   tastes it on the page, clicking keeps it, leaving puts back what was chosen */

/* ---- type shelf picker ---------------------------------------------------
 * Opens the full shelf beside its button; hover previews, click keeps.
 */
function FacePicker({ slot, value, onPick, onTaste, open, setOpen, uploads, onUpload, onRemove }) {
    const listRef = reactExports.useRef(null);
    const uploadRef = reactExports.useRef(null);
    const [uploadNote, setUploadNote] = reactExports.useState('');
    reactExports.useEffect(() => {
        if (!open) return;
        FACES.forEach((f) => void loadFace(f, false));
        const list = listRef.current;
        const widget = list?.parentElement;
        if (list && widget) {
            placePanel(list, widget);
            const el = list.querySelector('.face-choice.current');
            if (el) list.scrollTop = el.offsetTop - list.clientHeight / 2 + el.offsetHeight / 2;
        }
        const onDoc = (e) => {
            if (!e.target.closest(`.face-widget.${slot}`)) {
                setOpen(false);
                onTaste(null);
            }
        };
        const onKey = (e) => {
            if (e.key === 'Escape') {
                setOpen(false);
                onTaste(null);
            }
        };
        document.addEventListener('mousedown', onDoc);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('mousedown', onDoc);
            document.removeEventListener('keydown', onKey);
        };
    }, [open]);
    const label = slot === 'body' ? 'text' : 'index';
    let lastKind = '';
    return jsxRuntimeExports.jsxs('div', {
        className: `face-widget ${slot}${open ? ' open' : ''}`,
        children: [
            open &&
                jsxRuntimeExports.jsxs('div', {
                    className: 'face-list',
                    ref: listRef,
                    onMouseLeave: () => onTaste(null),
                    children: [
                        jsxRuntimeExports.jsx('button', {
                            type: 'button',
                            className: 'face-choice face-upload',
                            onClick: () => uploadRef.current?.click(),
                            children: 'upload',
                        }),
                        jsxRuntimeExports.jsx('input', {
                            ref: uploadRef,
                            type: 'file',
                            accept: '.woff2,.woff,.ttf,.otf,font/woff2,font/woff,font/ttf,font/otf',
                            style: { display: 'none' },
                            onChange: (e) => {
                                const file = e.target.files?.[0];
                                e.target.value = '';
                                if (!file) return;
                                setUploadNote('');
                                onUpload(file).catch(() =>
                                    setUploadNote(
                                        'that file isn\u2019t a font this browser can read',
                                    ),
                                );
                            },
                        }),
                        uploadNote &&
                            jsxRuntimeExports.jsx('p', {
                                className: 'face-upload-note',
                                children: uploadNote,
                            }),
                        uploads.map((f) =>
                            jsxRuntimeExports.jsxs(
                                'span',
                                {
                                    className: 'face-own',
                                    children: [
                                        jsxRuntimeExports.jsx('button', {
                                            type: 'button',
                                            className: 'face-remove',
                                            'aria-label': `remove ${f.name}`,
                                            onClick: () => onRemove(f.slug),
                                            children: '\u00D7',
                                        }),
                                        jsxRuntimeExports.jsx('button', {
                                            type: 'button',
                                            className: `face-choice${f.slug === value ? ' current' : ''}`,
                                            style: { fontFamily: f.family },
                                            onMouseEnter: () => onTaste(f.slug),
                                            onFocus: () => onTaste(f.slug),
                                            onClick: () => {
                                                onPick(f.slug);
                                                onTaste(null);
                                                setOpen(false);
                                            },
                                            children: f.name,
                                        }),
                                    ],
                                },
                                f.slug,
                            ),
                        ),
                        FACES.map((f, i) => {
                            const gap = (lastKind !== '' && f.kind !== lastKind) || i === 0;
                            lastKind = f.kind;
                            return jsxRuntimeExports.jsx(
                                'button',
                                {
                                    type: 'button',
                                    className: `face-choice${f.slug === value ? ' current' : ''}${gap ? ' wing' : ''}`,
                                    style: { fontFamily: f.family },
                                    onMouseEnter: () => onTaste(f.slug),
                                    onFocus: () => onTaste(f.slug),
                                    onClick: () => {
                                        onPick(f.slug);
                                        onTaste(null);
                                        setOpen(false);
                                    },
                                    children: f.name,
                                },
                                f.slug,
                            );
                        }),
                    ],
                }),
            jsxRuntimeExports.jsx('button', {
                type: 'button',
                className: open ? 'on' : '',
                'aria-label': label,
                'data-tip': open ? undefined : label,
                'aria-expanded': open,
                onClick: () => {
                    setOpen(!open);
                    if (open) onTaste(null);
                },
                children:
                    slot === 'body'
                        ? jsxRuntimeExports.jsxs('svg', {
                              width: '14',
                              height: '14',
                              viewBox: '0 0 14 14',
                              'aria-hidden': 'true',
                              children: [
                                  jsxRuntimeExports.jsx('path', {
                                      d: 'M1.6 11.4 4.6 2.8l3 8.6M2.6 8.6h4',
                                      fill: 'none',
                                      stroke: 'currentColor',
                                      strokeWidth: '1.1',
                                  }),
                                  jsxRuntimeExports.jsx('path', {
                                      d: 'M11.8 11.4V7.6a1.9 1.9 0 0 0-3.4-1.1M11.8 9.2c-2.6-.3-3.6.4-3.6 1.3 0 .6.5 1 1.2 1 1.1 0 2.4-.8 2.4-2.3',
                                      fill: 'none',
                                      stroke: 'currentColor',
                                      strokeWidth: '1',
                                  }),
                              ],
                          })
                        : jsxRuntimeExports.jsx('svg', {
                              width: '14',
                              height: '14',
                              viewBox: '0 0 14 14',
                              'aria-hidden': 'true',
                              children: jsxRuntimeExports.jsx('path', {
                                  d: 'M2 3.4h10M7 3.4v8.2M5.2 11.6h3.6',
                                  fill: 'none',
                                  stroke: 'currentColor',
                                  strokeWidth: '1.1',
                              }),
                          }),
            }),
        ],
    });
}
/*
 * SyncControl - join this device to the sync service with a code (sync.ts).
 * The first device to use a code claims it (asked once); later devices type the same code.
 */
function SyncControl({ onJoined }) {
    const [open, setOpen] = reactExports.useState(false);
    const [code, setCode] = reactExports.useState('');
    const [note, setNote] = reactExports.useState('');
    const [askClaim, setAskClaim] = reactExports.useState(false);
    const [joined, setJoined] = reactExports.useState(isJoined());
    const go = async (claim) => {
        setNote('\u2026');
        const r = await join(code.trim(), claim);
        if (r.ok) {
            setJoined(true);
            setCode('');
            setAskClaim(false);
            setNote(r.created ? 'code claimed, synced' : 'joined, synced');
            onJoined();
            return;
        }
        if (r.unknown) {
            setAskClaim(true);
            setNote('nobody uses this code yet. make it yours?');
            return;
        }
        setNote(r.error);
    };
    const panelRef = reactExports.useRef(null);
    // same placement as the type shelf, redone whenever the panel's content changes size
    reactExports.useEffect(() => {
        const list = panelRef.current;
        if (open && list && list.parentElement) placePanel(list, list.parentElement);
    }, [open, note, joined, askClaim]);
    reactExports.useEffect(() => {
        if (!open) return;
        const onDoc = (e) => {
            if (!e.target.closest('.sync-widget')) setOpen(false);
        };
        const onKey = (e) => {
            if (e.key === 'Escape') setOpen(false);
        };
        document.addEventListener('mousedown', onDoc);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('mousedown', onDoc);
            document.removeEventListener('keydown', onKey);
        };
    }, [open]);
    const label = joined ? 'synced' : 'sync';
    return jsxRuntimeExports.jsxs('div', {
        className: 'face-widget sync-widget',
        children: [
            open &&
                jsxRuntimeExports.jsx('div', {
                    className: 'face-list sync-panel',
                    ref: panelRef,
                    children: joined
                        ? jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
                              children: [
                                  jsxRuntimeExports.jsx('p', {
                                      className: 'sync-note',
                                      children: note || 'this device is synced',
                                  }),
                                  jsxRuntimeExports.jsx('button', {
                                      type: 'button',
                                      className: 'face-choice',
                                      onClick: () => {
                                          leave();
                                          setJoined(false);
                                          setNote('this device left sync');
                                      },
                                      children: 'leave',
                                  }),
                              ],
                          })
                        : jsxRuntimeExports.jsxs('form', {
                              onSubmit: (e) => {
                                  e.preventDefault();
                                  void go(askClaim);
                              },
                              children: [
                                  jsxRuntimeExports.jsx('input', {
                                      className: 'sync-code',
                                      'aria-label': 'sync code',
                                      placeholder: 'code',
                                      autoComplete: 'off',
                                      autoCapitalize: 'off',
                                      spellCheck: false,
                                      maxLength: 64,
                                      value: code,
                                      onChange: (e) => {
                                          setCode(e.target.value.replace(/[^A-Za-z0-9]/g, ''));
                                          setAskClaim(false);
                                          setNote('');
                                      },
                                  }),
                                  jsxRuntimeExports.jsx('button', {
                                      type: 'submit',
                                      className: 'face-choice face-upload',
                                      disabled: code.trim().length < 4,
                                      children: askClaim ? 'make it mine' : 'join',
                                  }),
                                  note &&
                                      jsxRuntimeExports.jsx('p', {
                                          className: 'sync-note',
                                          children: note,
                                      }),
                              ],
                          }),
                }),
            jsxRuntimeExports.jsx('button', {
                type: 'button',
                className: open ? 'on' : '',
                'aria-label': label,
                'data-tip': open ? undefined : label,
                'aria-expanded': open,
                onClick: () => setOpen(!open),
                children: jsxRuntimeExports.jsxs('svg', {
                    width: '14',
                    height: '14',
                    viewBox: '0 0 14 14',
                    'aria-hidden': 'true',
                    children: [
                        jsxRuntimeExports.jsx('path', {
                            d: 'M2.4 6.2a4.7 4.7 0 0 1 8.3-2.1M11.6 7.8a4.7 4.7 0 0 1-8.3 2.1',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '1.1',
                        }),
                        jsxRuntimeExports.jsx('path', {
                            d: 'M10.9 1.9v2.4H8.5M3.1 12.1V9.7h2.4',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '1.1',
                        }),
                        joined &&
                            jsxRuntimeExports.jsx('circle', {
                                cx: '7',
                                cy: '7',
                                r: '1.1',
                                fill: 'currentColor',
                            }),
                    ],
                }),
            }),
        ],
    });
}
/* '#/<folder>' in the address -> that folder's id; null for anything else */
function viewFromHash(own = []) {
    const m = location.hash.match(/^#\/(.+)$/);
    const id = m ? decodeURIComponent(m[1]) : '';
    return [...FOLDERS, ...own].some((f) => f.id === id) ? id : null;
}
/* folders made on the page, as found in a saved state: only well-formed {id, title} entries */
function readFolders(v) {
    if (!Array.isArray(v)) return [];
    return v.filter(
        (f) =>
            !!f && typeof f.id === 'string' && typeof f.title === 'string' && f.id.startsWith('f-'),
    );
}

/* ---- App -----------------------------------------------------------------
 * Top-level state, effects and the control column. Effects are grouped:
 * appearance -> scrolling/pinning -> draft mode -> export/import.
 */
function App() {
    const [inverted, setInverted] = reactExports.useState(() => storeGet('wt-invert') === '1');
    const [textPt, setTextPt] = reactExports.useState(19);
    const [indexPt, setIndexPt] = reactExports.useState(10);
    const [open, setOpen] = reactExports.useState(() => ({ [PIECES[0].id]: true }));
    const [mode, setMode] = reactExports.useState('read');
    /* where the reader is: the main page ('home') or a folder id. Mirrored in the address as #/<folder>,
       so a folder can be linked and the back button leaves it; saved with the rest of the state */
    const [view, setView] = reactExports.useState(() => viewFromHash() ?? 'home');
    // folders made on the page (the + on the main page); saved and synced with the rest of the state
    const [ownFolders, setOwnFolders] = reactExports.useState([]);
    const allFolders = [...FOLDERS, ...ownFolders];
    const ownFoldersRef = reactExports.useRef(ownFolders);
    ownFoldersRef.current = ownFolders; // for the back/forward handler, registered once
    const createFolder = (title) => {
        const slug =
            title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '')
                .slice(0, 24) || 'folder';
        const id = `f-${slug}-${Date.now().toString(36)}`;
        setOwnFolders((fs) => [...fs, { id, title }]);
        // a new folder opens straight into draft mode with a new piece, caret in its text
        enterDraft(id);
        addDraft(id);
    };
    /* rename a folder (any folder, pieces.json ones included): kept as a name override in the saved state */
    const [folderNames, setFolderNames] = reactExports.useState({});
    const renameFolder = (id, title) => setFolderNames((m) => ({ ...m, [id]: title }));
    const named = (f) => (folderNames[f.id] ? { ...f, title: folderNames[f.id] } : f);
    /* opening a folder: one with nothing published in it (a folder made on the page) opens in draft mode,
       with a new piece if it holds no drafts yet; the others open for reading */
    const openFolder = (id) => {
        if (PIECES.some((p) => folderOf(p) === id)) {
            openView(id);
            return;
        }
        enterDraft(id);
        if (!(workRef.current ?? []).some((wp) => wp.folder === id)) addDraft(id);
    };
    const folderCount = (id) =>
        PIECES.filter((p) => folderOf(p) === id).length +
        (work ?? []).filter((wp) => wp.folder === id && !wp.published).length;
    const [work, setWork] = reactExports.useState(null);
    const [lh, setLh] = reactExports.useState(1.42);
    const [seamH, setSeamH] = reactExports.useState(264);
    const [bg, setBg] = reactExports.useState('');
    const [eraId, setEraId] = reactExports.useState(ERAS[2].id);
    const [soundOn, setSoundOn] = reactExports.useState(true);
    const [overlay, setOverlay] = reactExports.useState(null);
    const scrollerRef = reactExports.useRef(null);
    const colorRef = reactExports.useRef(null);
    const fileRef = reactExports.useRef(null);
    const editRefs = reactExports.useRef(new Map());
    const [platen, setPlaten] = reactExports.useState(false);
    const [bodyFace, setBodyFace] = reactExports.useState('eb-garamond');
    const [titleFace, setTitleFace] = reactExports.useState('fragment-mono');
    const [taste, setTaste] = reactExports.useState(null);
    const [faceOpen, setFaceOpen] = reactExports.useState(null);
    const [commit, setCommit] = reactExports.useState(false);
    const [uploads, setUploads] = reactExports.useState([]);
    const soundPref = reactExports.useRef({ on: true, era: ERAS[2].id, commit: false });
    const platenRef = reactExports.useRef(false);
    platenRef.current = platen && mode === 'draft';
    const workRef = reactExports.useRef(null);
    workRef.current = work;
    soundPref.current = { on: soundOn, era: eraId, commit };
    reactExports.useEffect(() => {
        document.documentElement.classList.toggle('inverted', inverted);
        storeSet('wt-invert', inverted ? '1' : '0');
    }, [inverted]);
    reactExports.useEffect(() => {
        document.documentElement.style.setProperty('--fs', `${textPt}pt`);
        document.documentElement.style.setProperty('--fs-mono', `${indexPt}pt`);
    }, [textPt, indexPt]);
    reactExports.useEffect(() => {
        document.documentElement.style.setProperty('--lh', String(lh));
    }, [lh]);
    reactExports.useEffect(() => {
        document.documentElement.style.setProperty('--seam-h', `${seamH}px`);
    }, [seamH]);
    reactExports.useEffect(() => {
        if (bg) document.documentElement.style.setProperty('--bg', bg);
        else document.documentElement.style.removeProperty('--bg');
    }, [bg]);
    reactExports.useEffect(() => {
        document.documentElement.classList.toggle('draft-mode', mode === 'draft');
    }, [mode]);
    // faces: the tasted one wins while the pointer rests on it; otherwise the chosen one
    reactExports.useEffect(() => {
        const apply = (slot, slug) => {
            const f =
                faceBySlug(slug) ?? faceBySlug(slot === 'body' ? 'eb-garamond' : 'fragment-mono');
            const prop = slot === 'body' ? '--font-body' : '--font-mono';
            void loadFace(f, true).then(() =>
                document.documentElement.style.setProperty(prop, f.family),
            );
            if (!f.shelf) document.documentElement.style.setProperty(prop, f.family);
            document.documentElement.dataset[slot === 'body' ? 'faceBody' : 'faceTitle'] = f.slug;
        };
        apply('body', taste?.slot === 'body' ? taste.slug : bodyFace);
        apply('title', taste?.slot === 'title' ? taste.slug : titleFace);
    }, [bodyFace, titleFace, taste, uploads]); // uploads: a restored own font arrives after the first paint
    // ghost controls: any deliberate activity wakes them, idle hides them
    reactExports.useEffect(() => {
        let timer;
        let over = false;
        const wake = (e) => {
            const t = e?.target;
            if (e && (e.type === 'mousemove' || e.type === 'pointerover'))
                over = !!t?.closest?.('.controls');
            document.documentElement.classList.add('ui-awake');
            window.clearTimeout(timer);
            timer = window.setTimeout(() => {
                if (!over) document.documentElement.classList.remove('ui-awake');
            }, 1800);
        };
        // a pointer resting on the controls (reading a label, picking an era) keeps them up
        const onOver = (e) => wake(e);
        window.addEventListener('pointerover', onOver, { passive: true });
        window.addEventListener('mousemove', wake, { passive: true });
        window.addEventListener('touchstart', wake, { passive: true });
        window.addEventListener('keydown', wake);
        const sc = scrollerRef.current;
        sc?.addEventListener('scroll', wake, { passive: true });
        return () => {
            window.removeEventListener('mousemove', wake);
            window.removeEventListener('pointerover', onOver);
            window.removeEventListener('touchstart', wake);
            window.removeEventListener('keydown', wake);
            sc?.removeEventListener('scroll', wake);
            window.clearTimeout(timer);
        };
    }, []);
    // when embedded, keep wheel deltas at the scroller edges from scrolling the host page
    reactExports.useEffect(() => {
        const sc = scrollerRef.current;
        if (!sc) return;
        const atEdge = (dy) => {
            const max = sc.scrollHeight - sc.clientHeight;
            return (sc.scrollTop <= 0 && dy < 0) || (sc.scrollTop >= max - 1 && dy > 0);
        };
        const onWheel = (e) => {
            const t = e.target;
            if (t && t.closest('.io-panel textarea, .face-list')) return;
            if (atEdge(e.deltaY)) e.preventDefault();
        };
        const scrollKeys = {
            ArrowDown: 40,
            ArrowUp: -40,
            PageDown: 600,
            PageUp: -600,
            ' ': 600,
            End: 1e9,
            Home: -1e9,
        };
        const onKey = (e) => {
            const t = e.target;
            if (t && t.closest('.editable, .io-panel')) return;
            const dy = scrollKeys[e.key];
            if (dy && atEdge(dy)) e.preventDefault();
        };
        let lastTouchY = null;
        const onTouchStart = (e) => {
            lastTouchY = e.touches[0]?.clientY ?? null;
        };
        const onTouchMove = (e) => {
            const y = e.touches[0]?.clientY;
            if (y == null || lastTouchY == null) return;
            if (atEdge(lastTouchY - y)) e.preventDefault();
            lastTouchY = y;
        };
        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('keydown', onKey);
        window.addEventListener('touchstart', onTouchStart, { passive: true });
        window.addEventListener('touchmove', onTouchMove, { passive: false });
        return () => {
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('keydown', onKey);
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchmove', onTouchMove);
        };
    }, []);
    /* when framed, keep the host page pinned so its own scroll range never shows around the frame.
       (in the Instinct viewer this also read a viewport message; the mirror leaves that listener inert) */
    reactExports.useEffect(() => {
        if (window === window.parent) return;
        const sentinel = document.createElement('div');
        sentinel.setAttribute('aria-hidden', 'true');
        sentinel.style.cssText =
            'position:absolute;left:0;bottom:0;width:1px;height:1px;pointer-events:none;opacity:0';
        document.body.appendChild(sentinel);
        let raf = 0;
        const pin = () => {
            window.cancelAnimationFrame(raf);
            raf = window.requestAnimationFrame(() => {
                const sc = scrollerRef.current;
                const keep = sc ? sc.scrollTop : 0;
                try {
                    sentinel.scrollIntoView({ block: 'end', inline: 'nearest' });
                } catch {
                    /* old engines */
                }
                if (sc && sc.scrollTop !== keep) sc.scrollTop = keep;
            });
        };
        const onMsg = (e) => {
            const m = e.data;
            if (e.source !== window.parent || !m || true) return;
        };
        window.addEventListener('message', onMsg);
        window.addEventListener('resize', pin);
        const timers = [0, 250, 800, 1600, 3000, 6000].map((t) => window.setTimeout(pin, t));
        return () => {
            window.removeEventListener('message', onMsg);
            window.removeEventListener('resize', pin);
            timers.forEach((t) => window.clearTimeout(t));
            window.cancelAnimationFrame(raf);
            sentinel.remove();
        };
    }, []);
    // platen: the line being typed holds at the pin line; the page rolls under it
    const platenFollow = () => {
        const sc = scrollerRef.current;
        const sel = window.getSelection();
        if (!sc || !sel || !sel.rangeCount) return;
        const r = sel.getRangeAt(0);
        const host =
            r.startContainer.nodeType === 1 ? r.startContainer : r.startContainer.parentElement;
        if (!host || !host.closest('.story-text.editable')) return;
        let rect = r.getClientRects()[0];
        if (!rect || (rect.top === 0 && rect.height === 0)) rect = host.getBoundingClientRect();
        const line = parseFloat(getComputedStyle(host).lineHeight) || 30;
        const caretMid = rect.top + rect.height / 2;
        const pinY =
            parseFloat(getComputedStyle(document.querySelector('.page')).paddingTop) + line / 2;
        const delta = caretMid - pinY;
        if (Math.abs(delta) < 2) return;
        sc.scrollTo({
            top: sc.scrollTop + delta,
            behavior: Math.abs(delta) > line * 3 ? 'auto' : 'smooth',
        });
    };
    reactExports.useEffect(() => {
        document.documentElement.classList.toggle('platen', platen && mode === 'draft');
        if (!(platen && mode === 'draft')) return;
        let raf = 0;
        const onSel = () => {
            window.cancelAnimationFrame(raf);
            raf = window.requestAnimationFrame(platenFollow);
        };
        document.addEventListener('selectionchange', onSel);
        onSel();
        return () => {
            document.removeEventListener('selectionchange', onSel);
            window.cancelAnimationFrame(raf);
        };
    }, [platen, mode]);
    reactExports.useEffect(() => {
        document.documentElement.classList.toggle('commit', commit && mode === 'draft');
    }, [commit, mode]);
    // audio: wake the engine on the first gesture so the first keystroke is not the one paying for startup
    reactExports.useEffect(() => {
        if (mode !== 'draft') return;
        const warm = () => warmAudio();
        window.addEventListener('pointerdown', warm, { passive: true });
        window.addEventListener('keydown', warm);
        const t = window.setTimeout(() => calibrateSound(), 400);
        return () => {
            window.removeEventListener('pointerdown', warm);
            window.removeEventListener('keydown', warm);
            window.clearTimeout(t);
        };
    }, [mode]);
    const register = (id, part, el) => {
        const cur = editRefs.current.get(id) ?? { title: null, text: null };
        cur[part] = el;
        editRefs.current.set(id, cur);
        attachTypeSound(el, soundPref);
        attachCommit(el, soundPref);
    };
    const harvestPiece = (wp) => {
        const r = editRefs.current.get(wp.id);
        if (!r?.text || !r.title) return wp;
        const title = readTitle(r.title);
        const lines = readParas(r.text);
        const cur = wp.versions[wp.current];
        if (title === cur.title && sameLines(lines, cur.lines)) return wp;
        if (cur.original) return wp; // originals never absorb edits; the first keystroke spawns a version instead
        return {
            ...wp,
            versions: wp.versions.map((v, i) => (i === wp.current ? { ...v, title, lines } : v)),
        };
    };
    const harvestAll = (w) => w.map(harvestPiece);
    /* fold / unfold a piece. Folding while reading inside it (its title pinned at the top) would collapse
       the text out from under the view and drop the reader somewhere further down the archive. So the view
       first steps back to the piece's own start, putting its title where the pinned title was, and then
       the piece closes: the reader stays level with the closed piece. */
    const toggleFold = (id) => {
        const sc = scrollerRef.current;
        const section = document.getElementById(id);
        const head = section?.querySelector('.story-head');
        if (open[id] && sc && section && head) {
            const pinY = head.getBoundingClientRect().top; // where the title sits now (pinned, or natural)
            const naturalY = section.getBoundingClientRect().top; // where it sits when not pinned: the piece's top edge
            if (naturalY < pinY - 1) sc.scrollTop -= pinY - naturalY;
        }
        setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
    };
    /* the owner's fonts (uploads.ts): restored on load from this browser and the repo.
       Removing the face in use falls back to the default for that slot */
    reactExports.useEffect(() => {
        void restoreFonts().then(setUploads);
    }, []);
    /* a device just joined: bring in what the code already holds, else send up what this device has */
    const syncJoined = () => {
        void pull().then((r) => {
            if (r) applyRemote(r);
            else {
                saveStateRef.current();
                void pushNow();
            }
        });
        void shareLocalFonts().then((f) => setUploads(f));
    };
    const uploadFace = async (file) => {
        await addFontFile(file);
        setUploads([...UPLOADED]);
    };
    const dropFace = (slug) => {
        void removeFont(slug).finally(() => setUploads([...UPLOADED]));
        if (bodyFace === slug) setBodyFace('eb-garamond');
        if (titleFace === slug) setTitleFace('fragment-mono');
    };
    // view <-> address: #/<folder> for a folder, no hash for the main page
    reactExports.useEffect(() => {
        const want = view === 'home' ? '' : `#/${view}`;
        if (location.hash !== want)
            history.pushState(null, '', want || location.pathname + location.search);
    }, [view]);
    reactExports.useEffect(() => {
        const onPop = () => setView(viewFromHash(ownFoldersRef.current) ?? 'home');
        window.addEventListener('popstate', onPop);
        return () => window.removeEventListener('popstate', onPop);
    }, []);
    const onCover = mode === 'read' && view === 'home'; // the main page: folders only
    // the main page is never in draft mode: arriving there (back button, address) closes the drafts first
    reactExports.useEffect(() => {
        if (view === 'home' && mode === 'draft') leaveDraft();
    }, [view, mode]);
    const openView = (next) => {
        setView(next);
        scrollerRef.current?.scrollTo({ top: 0 });
    };
    /* draft mode, inside a folder: the current one, or `into` (a folder just made). From the main page it
       opens the first folder. Only the pieces of that folder are shown (see the draft list below). */
    const enterDraft = (into) => {
        setWork(
            (w) =>
                w ??
                PIECES.map((p) => ({
                    id: p.id,
                    published: true,
                    versions: [
                        {
                            vid: `v-${p.id}-base`,
                            when: p.when,
                            born: p.when,
                            title: p.title,
                            lines: flatLines(p),
                            original: true,
                        },
                    ],
                    current: 0,
                    seat: 0,
                    audio: p.audio,
                    note: p.note,
                    hasEndmark: true,
                    folder: folderOf(p),
                })),
        );
        if (into) setView(into);
        else if (view === 'home') setView(FOLDERS[0].id); // drafts are worked on inside a folder
        setMode('draft');
    };
    const leaveDraft = () => {
        setWork((w) => (w ? harvestAll(w) : w));
        setMode('read');
    };
    const newVid = () => `v-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    // editing re-stamps the version's date and rises it to the top of its stack.
    // an original is never edited: the first keystroke on it becomes a new version carrying that edit,
    // the original stays untouched at the bottom. the live editor keeps its DOM (seat unchanged), so the caret never jumps
    const stampEdit = (id) => {
        setWork((w) => {
            if (!w) return w;
            const idx = w.findIndex((p) => p.id === id);
            if (idx < 0) return w;
            const wp = w[idx];
            const stamp = nowStamp();
            const cur = wp.versions[wp.current];
            const next = [...w];
            if (cur.original) {
                const r = editRefs.current.get(id);
                const title = r?.title ? readTitle(r.title) : cur.title;
                const lines = r?.text ? readParas(r.text) : [...cur.lines];
                const spawned = { vid: newVid(), when: stamp, born: stamp, title, lines };
                next[idx] = { ...wp, versions: [spawned, ...wp.versions], current: 0 };
                return next;
            }
            if (wp.current === 0 && cur.when === stamp) return w;
            const versions = [...wp.versions];
            versions[wp.current] = { ...cur, when: stamp };
            const [moved] = versions.splice(wp.current, 1);
            versions.unshift(moved);
            next[idx] = { ...wp, versions, current: 0 };
            return next;
        });
        if (platenRef.current) window.requestAnimationFrame(() => platenFollow());
    };
    const loadVersion = (id, vIdx) => {
        setWork((w) =>
            !w
                ? w
                : w.map((wp) => {
                      if (wp.id !== id || vIdx === wp.current) return wp;
                      const h = harvestPiece(wp);
                      return { ...h, current: vIdx, seat: h.seat + 1 };
                  }),
        );
    };
    const duplicateVersion = (id) => {
        setWork((w) =>
            !w
                ? w
                : w.map((wp) => {
                      if (wp.id !== id) return wp;
                      const h = harvestPiece(wp);
                      const cur = h.versions[h.current];
                      const stamp = nowStamp();
                      return {
                          ...h,
                          versions: [
                              {
                                  vid: newVid(),
                                  when: stamp,
                                  born: stamp,
                                  title: cur.title,
                                  lines: [...cur.lines],
                              },
                              ...h.versions,
                          ],
                          current: 0,
                          seat: h.seat + 1,
                      };
                  }),
        );
    };
    const addDraft = (into) => {
        const folder = into ?? (view === 'home' ? FOLDERS[0].id : view);
        const stamp = nowStamp();
        const id = `draft-${Date.now()}`;
        setOpen((prev) => ({ ...prev, [id]: true }));
        setWork((w) => [
            {
                id,
                published: false,
                versions: [
                    { vid: `v-${Date.now()}-new`, when: stamp, born: stamp, title: '', lines: [] },
                ],
                current: 0,
                seat: 0,
                audio: [],
                hasEndmark: false,
                folder,
            },
            ...(w ?? []),
        ]);
        focusNewRef.current = id;
        scrollerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    };
    /* a new piece opens ready to write: once its editor exists, the caret goes into its text */
    const focusNewRef = reactExports.useRef(null);
    reactExports.useEffect(() => {
        const id = focusNewRef.current;
        const el = id ? editRefs.current.get(id)?.text : null;
        if (!id || !el) return;
        focusNewRef.current = null;
        el.focus({ preventScroll: true });
        const range = document.createRange();
        range.selectNodeContents(el.firstElementChild ?? el);
        range.collapse(true);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
    }, [work]);
    const removeDraft = (id) => {
        setWork((w) => (w ?? []).filter((p) => p.id !== id));
        editRefs.current.delete(id);
    };
    /* the export payload: settings plus every piece with its versions. The same shape is what the mirror
       keeps in localStorage, so a saved state and an exported file restore through one path (doImport) */
    const makePayload = (harvested) => ({
        kind: 'dreamwake-drafts',
        version: 4,
        exported: nowStamp(),
        settings: {
            fontSizePt: textPt,
            indexSizePt: indexPt,
            lineHeight: Math.round(lh * 100) / 100,
            background: bg || 'default',
            seamHeight: seamH,
            inverted,
            soundEra: eraId,
            sound: soundOn,
            platen,
            commitment: commit,
            textFace: bodyFace,
            titleFace,
        },
        pieces:
            harvested === null
                ? null
                : harvested.map(({ id, published, versions, current, folder }) => ({
                      id,
                      title: versions[current].title,
                      published,
                      folder,
                      versions: versions.map(({ vid, when, born, title, lines, original }) => ({
                          vid,
                          when,
                          born,
                          title,
                          lines,
                          ...(original ? { original: true } : {}),
                      })),
                      current,
                  })),
    });
    const doExport = () => {
        const w = workRef.current;
        if (!w) return;
        const harvested = harvestAll(w);
        setWork(harvested);
        const payload = makePayload(harvested);
        setOverlay({ kind: 'export', text: JSON.stringify(payload, null, 2) });
    };
    /* restore: set when the mirror brings back its saved state on load - pieces may then be null (settings
       only), and the saved mode is reopened instead of jumping into draft */
    const doImport = (text, restore) => {
        try {
            const data = JSON.parse(text);
            if (!data || !(Array.isArray(data.pieces) || (restore && data.pieces === null)))
                throw new Error('bad shape');
            const pieces =
                data.pieces === null
                    ? null
                    : data.pieces.map((p) => {
                          const src = PIECES.find((x) => x.id === p.id);
                          const published = !!p.published;
                          const rawVersions =
                              Array.isArray(p.versions) && p.versions.length
                                  ? p.versions
                                  : [{ when: nowStamp(), born: nowStamp(), lines: [] }];
                          const pieceTitle = String(p.title ?? '');
                          let versions = rawVersions.map((v, vi) => ({
                              vid: String(v.vid ?? `v-import-${Date.now()}-${vi}`),
                              when: String(v.when ?? ''),
                              born: String(v.born ?? v.when ?? ''),
                              title: typeof v.title === 'string' ? v.title : pieceTitle,
                              lines: Array.isArray(v.lines) ? v.lines.map(String) : [],
                              original:
                                  !!v.original ||
                                  (published && String(v.vid ?? '').endsWith('-base')),
                          }));
                          let current = Math.min(
                              Math.max(0, Number(p.current) || 0),
                              versions.length - 1,
                          );
                          if (published && src) {
                              // the original is sacred: if an older export carries edits on it, those edits become their own
                              // version and the original is restored from the archive, at the bottom
                              const base = {
                                  vid: `v-${src.id}-base`,
                                  when: src.when,
                                  born: src.when,
                                  title: src.title,
                                  lines: flatLines(src),
                                  original: true,
                              };
                              const curVid = versions[current]?.vid;
                              const rest = [];
                              versions.forEach((v) => {
                                  if (!v.original) {
                                      rest.push(v);
                                      return;
                                  }
                                  if (v.title !== base.title || !sameLines(v.lines, base.lines))
                                      rest.push({ ...v, original: false, vid: `${v.vid}-kept` });
                              });
                              versions = [...rest, base];
                              const ci = versions.findIndex(
                                  (v) => v.vid === curVid || v.vid === `${curVid}-kept`,
                              );
                              current = ci >= 0 ? ci : 0;
                          }
                          return {
                              id: String(p.id ?? `piece-${Date.now()}-${Math.random()}`),
                              published,
                              versions,
                              current,
                              seat: Date.now() % 100000,
                              audio: published && src ? src.audio : [],
                              note: published && src ? src.note : undefined,
                              hasEndmark: published,
                              // published pieces live where pieces.json puts them; drafts keep the folder they were made in
                              folder:
                                  published && src
                                      ? folderOf(src)
                                      : typeof p.folder === 'string'
                                        ? p.folder
                                        : FOLDERS[0].id,
                          };
                      });
            const s = data.settings ?? {};
            if (typeof s.fontSizePt === 'number') setTextPt(clampPt(s.fontSizePt, TEXT_PT));
            if (typeof s.indexSizePt === 'number') setIndexPt(clampPt(s.indexSizePt, INDEX_PT));
            if (typeof s.lineHeight === 'number') setLh(Math.min(2, Math.max(1.1, s.lineHeight)));
            if (typeof s.seamHeight === 'number')
                setSeamH(Math.min(528, Math.max(88, s.seamHeight)));
            if (typeof s.background === 'string')
                setBg(s.background === 'default' ? '' : s.background);
            if (typeof s.inverted === 'boolean') setInverted(s.inverted);
            if (typeof s.sound === 'boolean') setSoundOn(s.sound);
            if (typeof s.platen === 'boolean') setPlaten(s.platen);
            if (
                typeof s.textFace === 'string' &&
                (faceBySlug(s.textFace) || s.textFace.startsWith('upload-'))
            )
                setBodyFace(s.textFace);
            if (
                typeof s.titleFace === 'string' &&
                (faceBySlug(s.titleFace) || s.titleFace.startsWith('upload-'))
            )
                setTitleFace(s.titleFace);
            if (typeof s.commitment === 'boolean') setCommit(s.commitment);
            if (
                typeof s.soundEra === 'string' &&
                (s.soundEra === 'random' || ERAS.some((e) => e.id === s.soundEra))
            )
                setEraId(s.soundEra);
            if (restore) {
                if (pieces) setWork(pieces);
                setMode(pieces ? restore.mode : 'read');
                return;
            }
            setWork(pieces);
            setOverlay(null);
            setMode('draft');
        } catch {
            if (restore) return; // a damaged saved state is ignored; the page starts fresh
            setOverlay((o) =>
                o ? { ...o, error: 'that doesn’t parse as a dreamwake export' } : o,
            );
        }
    };
    /* ---- saved state (mirror only) ----
       On the standalone page, settings, drafts, the current mode, which pieces are unfolded and the scroll
       position survive a reload. The state is written
       as an export payload (makePayload) and read back through doImport, so it follows the same rules as an
       imported file: published originals are restored from the archive, edits live in their own versions.
       Typing does not re-render the app (the editor owns its DOM), so edits are harvested on a short pause
       after input and again when the page is hidden or closed. */
    // false until the saved state has been handed to React; nothing is written before that
    const [restored, setRestored] = reactExports.useState(false);
    const saveStateRef = reactExports.useRef(() => {});
    saveStateRef.current = () => {
        if (!restored) return;
        const w = workRef.current;
        const sc = scrollerRef.current;
        // besides the export payload: which pieces are unfolded and where the page was scrolled to
        const payload = {
            ...makePayload(w ? harvestAll(w) : null),
            mode,
            open,
            view,
            folders: ownFolders,
            folderNames,
            scroll: sc ? Math.round(sc.scrollTop) : 0,
        };
        storeSet(STATE_KEY, JSON.stringify(payload));
        schedulePush(payload); // to the sync service, batched (sync.ts); nothing happens when not joined
    };
    /* put a saved state on the page: from this browser on load, or from the sync service */
    const applySaved = (saved) => {
        let mode = 'read';
        let data = {};
        try {
            data = JSON.parse(saved);
            mode = data.mode === 'draft' ? 'draft' : 'read';
        } catch {
            /* ignored below */
        }
        doImport(saved, { mode });
        // fold state: only true/false flags are taken back; pieces that no longer exist just never render
        if (data.open && typeof data.open === 'object') {
            const flags = {};
            for (const [id, v] of Object.entries(data.open))
                if (typeof v === 'boolean') flags[id] = v;
            setOpen(flags);
        }
        // the page he was on, unless the address already names a folder
        const own = readFolders(data.folders);
        setOwnFolders(own);
        const names = {};
        if (data.folderNames && typeof data.folderNames === 'object') {
            for (const [id, t] of Object.entries(data.folderNames))
                if (typeof t === 'string' && t.trim()) names[id] = t;
        }
        setFolderNames(names);
        const fromHash = viewFromHash(own);
        if (fromHash) setView(fromHash);
        else if (
            typeof data.view === 'string' &&
            (data.view === 'home' || [...FOLDERS, ...own].some((f) => f.id === data.view))
        )
            setView(data.view);
        // scroll position: applied after the restored pieces have laid out (two frames)
        const top = typeof data.scroll === 'number' ? data.scroll : 0;
        if (top > 0)
            requestAnimationFrame(() =>
                requestAnimationFrame(() => scrollerRef.current?.scrollTo({ top })),
            );
    };
    const applyRemote = (r) => {
        const text = JSON.stringify(r.state);
        storeSet(STATE_KEY, text);
        applySaved(text);
    };
    // once, on load: bring back the saved state before anything is written over it,
    // then ask the sync service for anything newer from another device
    reactExports.useEffect(() => {
        const saved = storeGet(STATE_KEY);
        if (saved) applySaved(saved);
        onNewer(applyRemote);
        void pull().then((r) => {
            if (r) applyRemote(r);
        });
        setRestored(true); // batched with the restore, so the first save already sees the restored state
    }, []);
    // any change to settings, pieces or mode is saved on the next render
    reactExports.useEffect(() => {
        saveStateRef.current();
    }, [
        restored,
        textPt,
        indexPt,
        lh,
        bg,
        seamH,
        inverted,
        eraId,
        soundOn,
        platen,
        commit,
        bodyFace,
        titleFace,
        work,
        mode,
        open,
        view,
        ownFolders,
        folderNames,
    ]);
    // edits in progress: save after a pause in typing, and when the page goes away
    reactExports.useEffect(() => {
        let timer;
        const onInput = () => {
            window.clearTimeout(timer);
            timer = window.setTimeout(() => saveStateRef.current(), 700);
        };
        const flush = () => saveStateRef.current();
        // hidden: save and send now; visible again: pick up what another device saved meanwhile
        const onVisibility = () => {
            if (document.visibilityState === 'hidden') {
                flush();
                void pushNow(true);
            } else
                void pull().then((r) => {
                    if (r) applyRemote(r);
                });
        };
        document.addEventListener('input', onInput, true);
        const sc = scrollerRef.current;
        let scrollTimer;
        const onScroll = () => {
            window.clearTimeout(scrollTimer);
            scrollTimer = window.setTimeout(() => saveStateRef.current(), 400);
        };
        sc?.addEventListener('scroll', onScroll, { passive: true });
        document.addEventListener('visibilitychange', onVisibility);
        window.addEventListener('pagehide', flush);
        return () => {
            window.clearTimeout(timer);
            window.clearTimeout(scrollTimer);
            sc?.removeEventListener('scroll', onScroll);
            document.removeEventListener('input', onInput, true);
            document.removeEventListener('visibilitychange', onVisibility);
            window.removeEventListener('pagehide', flush);
        };
    }, []);
    /* the frame's sandbox forbids downloads outright, and a blob: made here belongs to our opaque origin, so the
       helper tab builds its OWN blob from the text we hand it and links to that. the whole export is also printed
       on that page so select-all + copy works even where a browser refuses the save */
    const downloadExport = () => {
        if (!overlay) return;
        const name = `dreamwake-drafts-${nowStamp().replace(/[.: ]/g, '-')}.json`;
        {
            // a normal page may download directly: a blob link with a file name, clicked once
            const url = URL.createObjectURL(new Blob([overlay.text], { type: 'application/json' }));
            const a = document.createElement('a');
            a.href = url;
            a.download = name;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.setTimeout(() => URL.revokeObjectURL(url), 60000);
            return;
        }
    };
    const exportAreaRef = reactExports.useRef(null);
    const copyExport = () => {
        if (!overlay) return;
        let ok = false;
        const ta = exportAreaRef.current;
        if (ta) {
            ta.focus();
            ta.select();
            try {
                ok = document.execCommand('copy');
            } catch {
                ok = false;
            }
        }
        const done = () => setOverlay((o) => (o ? { ...o, copied: true, error: undefined } : o));
        if (ok) {
            done();
            return;
        }
        try {
            void navigator.clipboard
                .writeText(overlay.text)
                .then(done, () =>
                    setOverlay((o) =>
                        o
                            ? {
                                  ...o,
                                  error: 'copy was blocked - the text is selected, press cmd+c',
                              }
                            : o,
                    ),
                );
        } catch {
            setOverlay((o) =>
                o ? { ...o, error: 'copy was blocked - the text is selected, press cmd+c' } : o,
            );
        }
    };
    return jsxRuntimeExports.jsxs('div', {
        className: 'scroller',
        ref: scrollerRef,
        children: [
            jsxRuntimeExports.jsx('div', { className: 'seam standalone', 'aria-hidden': 'true' }),
            jsxRuntimeExports.jsx('main', {
                className: 'page',
                children:
                    mode === 'read' && view === 'home'
                        ? jsxRuntimeExports.jsx(Cover, {
                              folders: allFolders.map(named),
                              count: folderCount,
                              onOpen: openFolder,
                              onCreate: createFolder,
                              onRename: renameFolder,
                          })
                        : mode === 'read'
                          ? jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
                                children: [
                                    PIECES.filter((p) => folderOf(p) === view).map((p) =>
                                        jsxRuntimeExports.jsx(
                                            Story,
                                            {
                                                piece: p,
                                                open: !!open[p.id],
                                                onToggle: () => toggleFold(p.id),
                                            },
                                            p.id,
                                        ),
                                    ),
                                    view === FOLDERS[0].id && jsxRuntimeExports.jsx(ArchiveEnd, {}),
                                ],
                            })
                          : (work ?? [])
                                .filter((wp) => wp.folder === view)
                                .map((wp) =>
                                    jsxRuntimeExports.jsx(
                                        WorkStory,
                                        {
                                            wp: wp,
                                            open: !!open[wp.id],
                                            onToggle: () => toggleFold(wp.id),
                                            register: register,
                                            onEditInput: stampEdit,
                                            onLoadVersion: loadVersion,
                                            onDuplicate: duplicateVersion,
                                            onRemove: removeDraft,
                                        },
                                        wp.id,
                                    ),
                                ),
            }),
            mode === 'draft' && jsxRuntimeExports.jsx(FxPalette, {}),
            jsxRuntimeExports.jsxs('div', {
                className: 'controls',
                'aria-label': 'page controls',
                children: [
                    !onCover &&
                        jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
                            children: [
                                jsxRuntimeExports.jsx('button', {
                                    type: 'button',
                                    className: 'home-button',
                                    'aria-label': 'home',
                                    'data-tip': 'home',
                                    onClick: () => {
                                        if (mode === 'draft') leaveDraft();
                                        openView('home');
                                    },
                                    children: jsxRuntimeExports.jsx('svg', {
                                        width: '14',
                                        height: '14',
                                        viewBox: '0 0 14 14',
                                        'aria-hidden': 'true',
                                        children: jsxRuntimeExports.jsx('path', {
                                            d: 'M2.2 6.6 7 2.5l4.8 4.1M3.6 5.6v5.9h2.5V8.6h1.8v2.9h2.5V5.6',
                                            fill: 'none',
                                            stroke: 'currentColor',
                                            strokeWidth: '1.1',
                                            strokeLinejoin: 'round',
                                        }),
                                    }),
                                }),
                                jsxRuntimeExports.jsx('button', {
                                    type: 'button',
                                    className: 'draft-toggle',
                                    'aria-label': mode === 'draft' ? 'reading mode' : 'draft mode',
                                    'data-tip': mode === 'draft' ? 'reading mode' : 'draft mode',
                                    onClick: () => (mode === 'draft' ? leaveDraft() : enterDraft()),
                                    children:
                                        mode === 'draft'
                                            ? jsxRuntimeExports.jsxs('svg', {
                                                  width: '14',
                                                  height: '14',
                                                  viewBox: '0 0 14 14',
                                                  'aria-hidden': 'true',
                                                  children: [
                                                      jsxRuntimeExports.jsx('path', {
                                                          d: 'M7 3.4C5.9 2.6 4.3 2.3 2.5 2.5v8c1.8-.2 3.3.1 4.5 1 1.2-.9 2.7-1.2 4.5-1v-8c-1.8-.2-3.4.1-4.5 1z',
                                                          fill: 'none',
                                                          stroke: 'currentColor',
                                                          strokeWidth: '1.1',
                                                      }),
                                                      jsxRuntimeExports.jsx('path', {
                                                          d: 'M7 3.4v8',
                                                          stroke: 'currentColor',
                                                          strokeWidth: '1.1',
                                                      }),
                                                  ],
                                              })
                                            : jsxRuntimeExports.jsx('svg', {
                                                  width: '14',
                                                  height: '14',
                                                  viewBox: '0 0 14 14',
                                                  'aria-hidden': 'true',
                                                  children: jsxRuntimeExports.jsx('path', {
                                                      d: 'M2.5 11.5 3.1 9 9.8 2.3a1.4 1.4 0 0 1 2 2L5 11l-2.5.5z',
                                                      fill: 'none',
                                                      stroke: 'currentColor',
                                                      strokeWidth: '1.1',
                                                  }),
                                              }),
                                }),
                                jsxRuntimeExports.jsx('span', {
                                    className: 'controls-gap',
                                    'aria-hidden': 'true',
                                }),
                            ],
                        }),
                    mode === 'draft' &&
                        jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
                            children: [
                                jsxRuntimeExports.jsx('button', {
                                    type: 'button',
                                    'aria-label': 'new piece',
                                    'data-tip': 'new piece',
                                    onClick: () => addDraft(),
                                    children: jsxRuntimeExports.jsx('svg', {
                                        width: '14',
                                        height: '14',
                                        viewBox: '0 0 14 14',
                                        'aria-hidden': 'true',
                                        children: jsxRuntimeExports.jsx('path', {
                                            d: 'M7 2.5v9M2.5 7h9',
                                            stroke: 'currentColor',
                                            strokeWidth: '1.2',
                                        }),
                                    }),
                                }),
                                jsxRuntimeExports.jsx('button', {
                                    type: 'button',
                                    className: platen ? 'on' : '',
                                    'aria-pressed': platen,
                                    'aria-label': 'platen mode',
                                    'data-tip': platen ? 'platen mode · on' : 'platen mode',
                                    onClick: () => setPlaten((v) => !v),
                                    children: jsxRuntimeExports.jsxs('svg', {
                                        width: '14',
                                        height: '14',
                                        viewBox: '0 0 14 14',
                                        'aria-hidden': 'true',
                                        children: [
                                            jsxRuntimeExports.jsx('rect', {
                                                x: '1.8',
                                                y: '5',
                                                width: '10.4',
                                                height: '4',
                                                rx: '2',
                                                fill: 'none',
                                                stroke: 'currentColor',
                                                strokeWidth: '1.1',
                                            }),
                                            jsxRuntimeExports.jsx('path', {
                                                d: 'M4 2.6h6M4 11.4h6',
                                                stroke: 'currentColor',
                                                strokeWidth: '1.1',
                                            }),
                                        ],
                                    }),
                                }),
                                jsxRuntimeExports.jsx('button', {
                                    type: 'button',
                                    className: commit ? 'on' : '',
                                    'aria-pressed': commit,
                                    'aria-label': 'commitment mode',
                                    'data-tip': commit ? 'commitment mode · on' : 'commitment mode',
                                    onClick: () => setCommit((v) => !v),
                                    children: jsxRuntimeExports.jsxs('svg', {
                                        width: '14',
                                        height: '14',
                                        viewBox: '0 0 14 14',
                                        'aria-hidden': 'true',
                                        children: [
                                            jsxRuntimeExports.jsx('path', {
                                                d: 'M4.6 10.8 6.4 3.2h2.2l-1.8 7.6',
                                                fill: 'none',
                                                stroke: 'currentColor',
                                                strokeWidth: '1.1',
                                            }),
                                            jsxRuntimeExports.jsx('path', {
                                                d: 'M2.4 7.2h9.2',
                                                stroke: 'currentColor',
                                                strokeWidth: '1.1',
                                            }),
                                        ],
                                    }),
                                }),
                                jsxRuntimeExports.jsxs('div', {
                                    className: 'era-widget',
                                    children: [
                                        jsxRuntimeExports.jsxs('div', {
                                            className: 'era-menu',
                                            children: [
                                                jsxRuntimeExports.jsx('button', {
                                                    type: 'button',
                                                    className:
                                                        eraId === 'random'
                                                            ? 'era-choice current'
                                                            : 'era-choice',
                                                    'data-tip': 'a random era each keystroke',
                                                    'aria-label': 'a random era each keystroke',
                                                    onClick: () => setEraId('random'),
                                                    children: '?',
                                                }),
                                                ERAS.map((e) =>
                                                    jsxRuntimeExports.jsx(
                                                        'button',
                                                        {
                                                            type: 'button',
                                                            className:
                                                                eraId === e.id
                                                                    ? 'era-choice current'
                                                                    : 'era-choice',
                                                            'data-tip': ERA_TIPS[e.id],
                                                            'aria-label': ERA_TIPS[e.id],
                                                            onClick: () => setEraId(e.id),
                                                            children: e.label,
                                                        },
                                                        e.id,
                                                    ),
                                                ),
                                            ],
                                        }),
                                        jsxRuntimeExports.jsx('button', {
                                            type: 'button',
                                            className: 'era-icon',
                                            'aria-label': 'typing era',
                                            onClick: () => {
                                                const ids = [...ERAS.map((e) => e.id), 'random'];
                                                setEraId(
                                                    ids[(ids.indexOf(eraId) + 1) % ids.length],
                                                );
                                            },
                                            children: jsxRuntimeExports.jsxs('svg', {
                                                width: '14',
                                                height: '14',
                                                viewBox: '0 0 14 14',
                                                'aria-hidden': 'true',
                                                children: [
                                                    jsxRuntimeExports.jsx('path', {
                                                        d: 'M4.2 5.6V3h5.6v2.6',
                                                        fill: 'none',
                                                        stroke: 'currentColor',
                                                        strokeWidth: '1.1',
                                                    }),
                                                    jsxRuntimeExports.jsx('rect', {
                                                        x: '2.2',
                                                        y: '5.6',
                                                        width: '9.6',
                                                        height: '5.6',
                                                        rx: '1.2',
                                                        fill: 'none',
                                                        stroke: 'currentColor',
                                                        strokeWidth: '1.1',
                                                    }),
                                                    jsxRuntimeExports.jsx('path', {
                                                        d: 'M4.8 8.2h4.4',
                                                        stroke: 'currentColor',
                                                        strokeWidth: '1.1',
                                                    }),
                                                ],
                                            }),
                                        }),
                                    ],
                                }),
                                jsxRuntimeExports.jsx('button', {
                                    type: 'button',
                                    'aria-label': soundOn ? 'sound off' : 'sound on',
                                    'data-tip': soundOn ? 'sound off' : 'sound on',
                                    onClick: () => setSoundOn((v) => !v),
                                    children: soundOn
                                        ? jsxRuntimeExports.jsxs('svg', {
                                              width: '14',
                                              height: '14',
                                              viewBox: '0 0 14 14',
                                              'aria-hidden': 'true',
                                              children: [
                                                  jsxRuntimeExports.jsx('path', {
                                                      d: 'M2 5.5h2.5L8.5 2.5v9L4.5 8.5H2z',
                                                      fill: 'currentColor',
                                                  }),
                                                  jsxRuntimeExports.jsx('path', {
                                                      d: 'M10.3 4.8a3.1 3.1 0 0 1 0 4.4',
                                                      fill: 'none',
                                                      stroke: 'currentColor',
                                                      strokeWidth: '1.1',
                                                  }),
                                              ],
                                          })
                                        : jsxRuntimeExports.jsxs('svg', {
                                              width: '14',
                                              height: '14',
                                              viewBox: '0 0 14 14',
                                              'aria-hidden': 'true',
                                              children: [
                                                  jsxRuntimeExports.jsx('path', {
                                                      d: 'M2 5.5h2.5L8.5 2.5v9L4.5 8.5H2z',
                                                      fill: 'currentColor',
                                                  }),
                                                  jsxRuntimeExports.jsx('path', {
                                                      d: 'M10 4.8l3.4 4.4M13.4 4.8 10 9.2',
                                                      stroke: 'currentColor',
                                                      strokeWidth: '1.1',
                                                  }),
                                              ],
                                          }),
                                }),
                                jsxRuntimeExports.jsx('button', {
                                    type: 'button',
                                    'aria-label': 'export drafts',
                                    'data-tip': 'export drafts',
                                    onClick: doExport,
                                    children: jsxRuntimeExports.jsxs('svg', {
                                        width: '14',
                                        height: '14',
                                        viewBox: '0 0 14 14',
                                        'aria-hidden': 'true',
                                        children: [
                                            jsxRuntimeExports.jsx('path', {
                                                d: 'M7 2v7M4 6.3 7 9.3 10 6.3',
                                                fill: 'none',
                                                stroke: 'currentColor',
                                                strokeWidth: '1.2',
                                            }),
                                            jsxRuntimeExports.jsx('path', {
                                                d: 'M2.5 11.5h9',
                                                stroke: 'currentColor',
                                                strokeWidth: '1.2',
                                            }),
                                        ],
                                    }),
                                }),
                                jsxRuntimeExports.jsx('button', {
                                    type: 'button',
                                    'aria-label': 'import drafts',
                                    'data-tip': 'import drafts',
                                    onClick: () => setOverlay({ kind: 'import', text: '' }),
                                    children: jsxRuntimeExports.jsxs('svg', {
                                        width: '14',
                                        height: '14',
                                        viewBox: '0 0 14 14',
                                        'aria-hidden': 'true',
                                        children: [
                                            jsxRuntimeExports.jsx('path', {
                                                d: 'M7 9.3v-7M4 5 7 2l3 3',
                                                fill: 'none',
                                                stroke: 'currentColor',
                                                strokeWidth: '1.2',
                                            }),
                                            jsxRuntimeExports.jsx('path', {
                                                d: 'M2.5 11.5h9',
                                                stroke: 'currentColor',
                                                strokeWidth: '1.2',
                                            }),
                                        ],
                                    }),
                                }),
                                jsxRuntimeExports.jsx('span', {
                                    className: 'controls-gap',
                                    'aria-hidden': 'true',
                                }),
                            ],
                        }),
                    jsxRuntimeExports.jsx('button', {
                        type: 'button',
                        'aria-label': 'invert colors',
                        'data-tip': 'invert colors',
                        onClick: () => setInverted((v) => !v),
                        children: jsxRuntimeExports.jsxs('svg', {
                            width: '14',
                            height: '14',
                            viewBox: '0 0 14 14',
                            'aria-hidden': 'true',
                            children: [
                                jsxRuntimeExports.jsx('circle', {
                                    cx: '7',
                                    cy: '7',
                                    r: '6',
                                    fill: 'none',
                                    stroke: 'currentColor',
                                    strokeWidth: '1.2',
                                }),
                                jsxRuntimeExports.jsx('path', {
                                    d: 'M7 1a6 6 0 0 1 0 12z',
                                    fill: 'currentColor',
                                }),
                            ],
                        }),
                    }),
                    !onCover &&
                        jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
                            children: [
                                jsxRuntimeExports.jsx('button', {
                                    type: 'button',
                                    'aria-label': 'shorter fade',
                                    'data-tip': 'shorter fade',
                                    disabled: seamH <= 88,
                                    onClick: () => setSeamH((v) => v - 44),
                                    children: jsxRuntimeExports.jsx('svg', {
                                        width: '14',
                                        height: '14',
                                        viewBox: '0 0 14 14',
                                        'aria-hidden': 'true',
                                        children: jsxRuntimeExports.jsx('path', {
                                            d: 'M3.8 4.6 10.2 7 3.8 9.4 Z',
                                            fill: 'currentColor',
                                        }),
                                    }),
                                }),
                                jsxRuntimeExports.jsx('button', {
                                    type: 'button',
                                    'aria-label': 'taller fade',
                                    'data-tip': 'taller fade',
                                    disabled: seamH >= 528,
                                    onClick: () => setSeamH((v) => v + 44),
                                    children: jsxRuntimeExports.jsx('svg', {
                                        width: '14',
                                        height: '14',
                                        viewBox: '0 0 14 14',
                                        'aria-hidden': 'true',
                                        children: jsxRuntimeExports.jsx('path', {
                                            d: 'M3 2.8 11 7 3 11.2 Z',
                                            fill: 'currentColor',
                                        }),
                                    }),
                                }),
                                jsxRuntimeExports.jsx(FacePicker, {
                                    slot: 'body',
                                    uploads: uploads,
                                    onUpload: uploadFace,
                                    onRemove: dropFace,
                                    value: bodyFace,
                                    onPick: setBodyFace,
                                    onTaste: (slug) =>
                                        setTaste(slug ? { slot: 'body', slug } : null),
                                    open: faceOpen === 'body',
                                    setOpen: (o) => setFaceOpen(o ? 'body' : null),
                                }),
                                jsxRuntimeExports.jsx(FacePicker, {
                                    slot: 'title',
                                    uploads: uploads,
                                    onUpload: uploadFace,
                                    onRemove: dropFace,
                                    value: titleFace,
                                    onPick: setTitleFace,
                                    onTaste: (slug) =>
                                        setTaste(slug ? { slot: 'title', slug } : null),
                                    open: faceOpen === 'title',
                                    setOpen: (o) => setFaceOpen(o ? 'title' : null),
                                }),
                                jsxRuntimeExports.jsx(SizeField, {
                                    label: 'text',
                                    value: textPt,
                                    range: TEXT_PT,
                                    onSet: setTextPt,
                                }),
                                jsxRuntimeExports.jsx(SizeField, {
                                    label: 'index',
                                    value: indexPt,
                                    range: INDEX_PT,
                                    onSet: setIndexPt,
                                }),
                                jsxRuntimeExports.jsx('button', {
                                    type: 'button',
                                    'aria-label': 'tighter lines',
                                    'data-tip': 'tighter lines',
                                    disabled: lh <= 1.1,
                                    onClick: () => setLh((v) => Math.round((v - 0.08) * 100) / 100),
                                    children: jsxRuntimeExports.jsx('svg', {
                                        width: '14',
                                        height: '14',
                                        viewBox: '0 0 14 14',
                                        'aria-hidden': 'true',
                                        children: jsxRuntimeExports.jsx('path', {
                                            d: 'M3 5h8M3 7h8M3 9h8',
                                            stroke: 'currentColor',
                                            strokeWidth: '1.1',
                                        }),
                                    }),
                                }),
                                jsxRuntimeExports.jsx('button', {
                                    type: 'button',
                                    'aria-label': 'looser lines',
                                    'data-tip': 'looser lines',
                                    disabled: lh >= 2,
                                    onClick: () => setLh((v) => Math.round((v + 0.08) * 100) / 100),
                                    children: jsxRuntimeExports.jsx('svg', {
                                        width: '14',
                                        height: '14',
                                        viewBox: '0 0 14 14',
                                        'aria-hidden': 'true',
                                        children: jsxRuntimeExports.jsx('path', {
                                            d: 'M3 3.5h8M3 7h8M3 10.5h8',
                                            stroke: 'currentColor',
                                            strokeWidth: '1.1',
                                        }),
                                    }),
                                }),
                            ],
                        }),
                    jsxRuntimeExports.jsxs('button', {
                        type: 'button',
                        className: 'swatch',
                        'aria-label': 'background color',
                        'data-tip': 'background',
                        onClick: () => colorRef.current?.click(),
                        children: [
                            jsxRuntimeExports.jsx('span', {
                                className: 'swatch-dot',
                                style: { background: bg || '#000000' },
                            }),
                            jsxRuntimeExports.jsx('input', {
                                type: 'color',
                                ref: colorRef,
                                value: bg || '#000000',
                                onChange: (e) => setBg(e.target.value),
                                'aria-label': 'background color',
                                tabIndex: -1,
                            }),
                        ],
                    }),
                    jsxRuntimeExports.jsx(SyncControl, { onJoined: syncJoined }),
                ],
            }),
            jsxRuntimeExports.jsx('input', {
                type: 'file',
                accept: 'application/json,.json,text/plain,.txt',
                ref: fileRef,
                style: { display: 'none' },
                onChange: (e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    const reader = new FileReader();
                    reader.onload = () => doImport(String(reader.result ?? ''));
                    reader.readAsText(f);
                    e.target.value = '';
                },
            }),
            overlay &&
                jsxRuntimeExports.jsx('div', {
                    className: 'io-overlay',
                    onClick: () => setOverlay(null),
                    children: jsxRuntimeExports.jsxs('div', {
                        className: 'io-panel',
                        onClick: (e) => e.stopPropagation(),
                        children: [
                            jsxRuntimeExports.jsx('p', {
                                className: 'io-title',
                                children:
                                    overlay.kind === 'export' ? 'draft export' : 'draft import',
                            }),
                            jsxRuntimeExports.jsx('p', {
                                className: 'io-note',
                                children:
                                    overlay.kind === 'export'
                                        ? 'copy puts the whole export on your clipboard. save opens a small tab, click the file name there'
                                        : 'paste a dreamwake export below, or choose the file',
                            }),
                            jsxRuntimeExports.jsx('textarea', {
                                ref: exportAreaRef,
                                value: overlay.text,
                                readOnly: overlay.kind === 'export',
                                onChange: (e) =>
                                    setOverlay((o) =>
                                        o ? { ...o, text: e.target.value, error: undefined } : o,
                                    ),
                                onFocus: (e) => {
                                    if (overlay.kind === 'export') e.target.select();
                                },
                                spellCheck: false,
                            }),
                            overlay.error &&
                                jsxRuntimeExports.jsx('p', {
                                    className: 'io-error',
                                    children: overlay.error,
                                }),
                            jsxRuntimeExports.jsxs('div', {
                                className: 'io-row',
                                children: [
                                    overlay.kind === 'export'
                                        ? jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
                                              children: [
                                                  jsxRuntimeExports.jsx('button', {
                                                      type: 'button',
                                                      onClick: copyExport,
                                                      children: overlay.copied ? 'copied' : 'copy',
                                                  }),
                                                  jsxRuntimeExports.jsx('button', {
                                                      type: 'button',
                                                      onClick: downloadExport,
                                                      children: 'save file',
                                                  }),
                                              ],
                                          })
                                        : jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
                                              children: [
                                                  jsxRuntimeExports.jsx('button', {
                                                      type: 'button',
                                                      onClick: () => fileRef.current?.click(),
                                                      children: 'choose file',
                                                  }),
                                                  jsxRuntimeExports.jsx('button', {
                                                      type: 'button',
                                                      onClick: () => doImport(overlay.text),
                                                      children: 'apply',
                                                  }),
                                              ],
                                          }),
                                    jsxRuntimeExports.jsx('button', {
                                        type: 'button',
                                        onClick: () => setOverlay(null),
                                        children: 'close',
                                    }),
                                ],
                            }),
                        ],
                    }),
                }),
        ],
    });
}

/* ==========================================================================
 * main - entry point
 * --------------------------------------------------------------------------
 * Mounts the single <App /> component into #root. There is no router and no
 * host framework: the page is self-contained and makes no network calls beyond
 * its own files (fonts are inlined in fonts.css, audio sits next to index.html).
 * ========================================================================== */

createRoot(document.getElementById('root')).render(jsxRuntimeExports.jsx(App, {}));
