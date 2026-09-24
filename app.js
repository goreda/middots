import {
    r as reactExports,
    j as jsxRuntimeExports,
    R as React,
    c as createRoot,
} from './vendor.js';

const kettleAudio = '' + new URL('kettle-chair-window.mp3', import.meta.url).href + '';

const lastStopAudio = '' + new URL('the-last-stop.mp3', import.meta.url).href + '';

const sonDurakOne = '' + new URL('son-durak-excerpt-one.mp3', import.meta.url).href + '';

const sonDurakTwo = '' + new URL('son-durak-excerpt-two.mp3', import.meta.url).href + '';

const yanlisAudio = '' + new URL('yanlis-kisi.mp3', import.meta.url).href + '';

const eleventhOne = '' + new URL('the-eleventh-part-one.mp3', import.meta.url).href + '';

const eleventhTwo = '' + new URL('the-eleventh-part-two.mp3', import.meta.url).href + '';

const whoseTurnOne = '' + new URL('whose-turn-part-one.mp3', import.meta.url).href + '';

const whoseTurnTwo = '' + new URL('whose-turn-part-two.mp3', import.meta.url).href + '';

const firstTakeOne = '' + new URL('whose-turn-first-take-one.mp3', import.meta.url).href + '';

const firstTakeTwo = '' + new URL('whose-turn-first-take-two.mp3', import.meta.url).href + '';

/* ==========================================================================
 * pieces - the archive content
 * --------------------------------------------------------------------------
 * The published pieces, newest first. Each piece has an id, a title, a date
 * stamp (YY.MM.DD HH:MM), its text as blocks (a string is one paragraph, an
 * array is a run of paragraphs), optional voice excerpts and an optional note.
 * This file is data only; rendering lives in App.
 * ========================================================================== */

const AUDIO = {
    kettleAudio,
    lastStopAudio,
    sonDurakOne,
    sonDurakTwo,
    yanlisAudio,
    eleventhOne,
    eleventhTwo,
    whoseTurnOne,
    whoseTurnTwo,
    firstTakeOne,
    firstTakeTwo,
};
const PIECES = [
    {
        id: 'wrong-night',
        title: 'tonight, the usual',
        when: '26.09.23 15:39',
        audio: [],
        blocks: [
            'A theatre, house lights at half. The curtain is already up. Onstage: a bed, a streetlamp, a door standing in its frame with no wall around it. Where the program should be, a sign: TONIGHT, THE USUAL. The curtain will come down at the end, when the play wakes up.',
            'A MAN enters from the auditorium, up the aisle stairs, the way other people enter their own kitchens. He hangs his key on the streetlamp and nods to the empty seats. The seats nod back, one row late.',
            'The follow-spot clears its throat overhead. Light finds the bed before anyone is in it. Under the blanket: the shape of someone who just got up, still warm, breathing a little slower than a person.',
            'MAN: You left the water running.',
            '(From the wings, the sound of water running.)',
            'MAN: Again.',
            '(The shape sits up. A DRESSER in black crosses, unhurried, and peels it off the bed like a costume. Underneath: no one. The DRESSER folds the shape over one arm and carries it into the wings, nodding to the MAN like a colleague ending a shift.)',
            'MAN: Did she say where?',
            '(The streetlamp flickers: once for yes, twice for no. Then a third time — a flicker it has not used before.)',
            "MAN: What's the third one?",
            '(The streetlamp says nothing. Somewhere above, a sandbag shifts its weight, the way a listener leans closer.)',
            '(A knock at the door. Three times, then a fourth knock that arrives before the third has finished. The MAN looks out at the audience — the first time he admits we are here — then crosses and opens it. On the other side: this same stage, the same bed, the same streetlamp, only smaller, as if seen from very far away. A tiny MAN is hanging a tiny key on the tiny streetlamp.)',
            'MAN: (quietly, through the door) Wrong night.',
            '(He closes it. The knocking goes on for a moment inside the door, then gives up.)',
            'MAN: She used to answer the third flicker.',
            "(The house lights rise a little — on us. From somewhere in the seats, a WOMAN's voice, close and unhurried, the way people speak across kitchens.)",
            "VOICE: You're doing it again. You're awake in the wrong place.",
            'MAN: (to the seats, politely) Which one is the right place?',
            '(The seats nod back, one row late. Nothing else comes.)',
            'MAN: Everyone says that. Nobody points.',
            '(Blackout — unscheduled. In the dark: stairs, a kettle, rain on a window that is not part of the set. A whole life being lived somewhere in the walls. When the light returns it is the wrong light — warmer, domestic — and the set has been struck down to the streetlamp and the door. The bed is gone. The streetlamp stands closer to the door than it was. His key still hangs on it.)',
            "MAN: (up, to the grid) That wasn't a cue.",
            '(The follow-spot answers. Its beam holds on the bare stage and shows him, for three seconds, the room the sounds came from — steam, a chair pushed back, no people. Then it is only light again.)',
            'MAN: (quieter) Show me the rest.',
            '(The follow-spot looks away, the way a person looks out a window.)',
            '(In the third row, a WOMAN stands. Nobody saw her arrive, and the seats around her have the guilty look of seats that knew all along. She comes down the aisle, stops at the edge of the stage, and holds up her hand. In it: a shape, folded, like the one the DRESSER carried off. Except this one is his.)',
            'WOMAN: You left this at my place.',
            "(He takes it. It is heavier than it looks. He holds it the way you hold a coat you're not sure is yours.)",
            'MAN: What do I do with it?',
            'WOMAN: (already turning back to her seat) Put it on before the curtain.',
            '(He puts on the shape. It fits the way sleep fits — badly at first, then all at once. Above him, the curtain stirs for the first time tonight. The streetlamp dims itself, politely, like someone leaving a room mid-sentence.)',
            '(The curtain comes down slowly, and the MAN watches it fall from our side of it. He is standing in the aisle now, or we are standing on the stage; the light can no longer tell the difference. The door is the last thing the curtain covers. From behind it: three knocks. Then a fourth, arriving before the third has finished.)',
            '(House lights up. On us.)',
        ],
    },
    {
        id: 'whose-turn',
        title: 'whose turn',
        when: '26.09.18 14:26',
        endmark: true,
        audio: [
            { src: AUDIO.whoseTurnOne, label: 'voice, part one' },
            { src: AUDIO.whoseTurnTwo, label: 'voice, part two' },
            { src: AUDIO.firstTakeOne, label: 'first take (rejected), part one' },
            { src: AUDIO.firstTakeTwo, label: 'first take (rejected), part two' },
        ],
        blocks: [
            "At noon the market's mouths began arriving late. Fish was already wrapped when fi—sh came dragging out, wet at the edges; a laugh crossed three stalls before the throat that made it bent open. Nobody stared. They leaned closer, buying by breath.",
            'By afternoon the awnings were breathing for them. Hhha for tomatoes. Tktktk for salt. A low, lipless oo moved through the melons and came back carrying bread; the sellers opened their palms, and change clicked into them before anyone had asked.',
            'Then someone sang. Not well, not loudly: a narrow tune used for remembering whose turn it was to lift the crates. The first note left her hours ago. The next was in her teeth. Between them, the whole market bent to carry what she could not keep in one body.',
            'They lifted on the note that had not reached her yet. Up went the crates, and under them the ground gave a soft, crowded grunt. Potatoes rolled beneath the stalls. Every mouth bit down at once, holding the next sound inside; still it came out below, boot-deep, speaking them from the soles upward.',
            'Open, said the feet. O—pen, corrected the roofs. But the gates were already closing, slow iron lips, and the crowd poured through sideways: shoulder first, then yesterday, then the warm animal noise each person had mistaken for private.',
            'Outside, the narrow tune widened without becoming louder. It passed through buses, teeth, drainwater; it wore each throat badly and left it altered. By evening no one could remember the melody. They remembered whose turn.',
            'Whose turn arrived before dawn and waited at every locked stall. It had no owner now. It knocked in wood, in pipe, in the loose blue sheet above the fish tables: turn-turn, turrn, tr— until the market, empty of mouths, began opening itself.',
            'First came the smell of crushed mint, though no mint had been laid out. Then the scales tipped toward absent weight. Hooks trembled bare. Coins, shut all night in their drawers, warmed against one another and gave off the small round vowels of bargaining.',
            'When the sellers arrived, the market was halfway through a sale. They stepped behind their stalls and listened for the prices. One voice came from the drain, one from a flock passing overhead, one from inside a sealed jar: too much, less, keep it, take me home.',
            'Take me home moved first. It climbed from jar to jar, shedding consonants, until only a warm a—ome remained. The market answered by lifting every awning. Morning entered all at once. Nothing left.',
        ],
    },
    {
        id: 'eleventh',
        title: 'the eleventh',
        when: '26.09.18 14:08',
        endmark: true,
        audio: [
            { src: AUDIO.eleventhOne, label: 'voice, part one' },
            { src: AUDIO.eleventhTwo, label: 'voice, part two' },
        ],
        blocks: [
            'Of the eleven who waited, only ten were ever counted, and the eleventh began to live off the difference.',
            'Some days the difference ran thin, and on those days the eleventh went among the ten and was almost one of them.',
            'The ten never counted one another. The counting came from elsewhere, the way weather comes, and they stood under it.',
            'There were droughts. For weeks no counting fell, the sky over the ten stayed clear, and the eleventh went hungry in a field of eleven.',
            'Hunger taught the eleventh to count. It counted eleven. It counted itself, which is the hardest count, the one that costs.',
            'The cost came due at once. To count itself it had to stand a little outside itself, and from then on it was two: the one who counted, and the one who was counted. Between the two, thin but steady, a counting of its own began to fall.',
            'The lean days came, and the eleventh did not come among them. The ten, who had never counted, could not say what was missing. Only that the waiting took longer.',
            "Of the eleventh's two, it was the counted one that missed the ten. It went and stood among them on a lean day, as it used to, and the ten breathed easier without knowing why. The waiting did not get any shorter.",
            'Alone, the one who counted ran out of things. There was only the waiting, longer every day, uncounted. So the counting fell on the waiting, and the waiting, counted for the first time, held still.',
            'The number was reached. On the last day of the waiting, the counting from elsewhere fell, and it counted the ten, and it counted the one standing among them, and the count came out eleven.',
            'There were twelve now, though nobody could say it: the ten, the one among them, and the one outside. The count had come out eleven, so the difference moved, as a difference must, and settled on the one who counted. It recognized the weight. It had eaten it all its life.',
            'It did not count them. Counting had always fallen on whatever stood under it; nothing had ever been held back. It held it back. It stood outside the count, eating the difference, and let the eleven stay eleven, which is the only mercy a counter has.',
        ],
    },
    {
        id: 'yanlis',
        title: 'yanlış kişi',
        when: '26.09.18 12:32',
        endmark: true,
        audio: [{ src: AUDIO.yanlisAudio, label: 'voice' }],
        blocks: [
            'Gece, apartmanın üçüncü katında yanlış kişiye oldu.',
            'Uyuması gereken çocuk mutfakta oturuyordu. Uyanık kalması gereken anne, oğlunun ertesi gününü görmeye başladı.',
            'Çocuk daha gitmeden okuldan döndü: saçında tebeşir tozu, cebinde bir başkasının annesinden kalma bir "aferin", sağ avucunda teneffüsün soğuğu.',
            '"Ne yaptın?" dedi anne.',
            '"Henüz yapmadım."',
            '"Öyleyse niye özür diliyorsun?"',
            '"Özür dileyen ben değilim."',
            'Koridordan bir ses geldi:',
            '"Benim."',
            'Yarın, kapının önünde sırılsıklam duruyordu. Ayakkabılarını çıkarmamıştı; kalmayacağı belliydi.',
            'Anne kalktı, yarına bir tokat attı.',
            'Ses dünden çıktı.',
            'Alt kattaki kadın uykusunda yanağını tuttu. Onun altında bir adam, daha vurulmadan başını çevirdi. Bir bina boyunca herkes, sırası gelmeden acıdı.',
            'Çocuk annesinin elini yakaladı.',
            '"Bir daha vurma."',
            '"Kime?"',
            '"Henüz bilmiyorum."',
        ],
    },
    {
        id: 'ogle',
        title: 'öğle vakti',
        when: '26.09.18 12:02',
        endmark: true,
        audio: [],
        blocks: [
            'Öğle vakti herkesin gölgesi bir başkasının altından terliyordu.',
            'Bir çocuk koştu, dizini ben kanattım; uzakta deniz, hiçbir şey olmamış gibi tuzuna devam etti.',
            'Üç aylık kira, ağzında tek dişi kalmış bir atın çektiği arabayla sınırı geçti.',
            'Ödenmediğim için çoğaldım: ev sahibinin defterinde üç, annemin duasında kırk, çocuğun kanayan dizinde sıfır lira sıfır kuruş.',
            'Bir memur öğle arasında beni mühürledi, mühür akşama kadar alnında kaldı.',
            'Adını çağırdılar, dönmedi; zaten hangi tarafının arka olduğunu o sabah kesip atmışlardı.',
            'Böylece yalnız ileri işedi gece boyunca, karın üstüne uzun, sarı bir sabah çizerek.',
            'Kırk yıl sonra aynı süpürgeyle gelinin duvağından pirinç topladılar; damat, cebinde kuzeyi unutmuş organ, evet derken güneye baktı.',
            'Hayır, dedi gelin; evet yüzüğe girdi, parmağı sıkmaya başladı.',
            'Parmak morarmadı, mor parmaklandı; elden ele atlayıp kasabanın bütün hayırlarını boğdu.',
            'O gece kimse reddedemedi: bebek sütü, mezar ölüyü, ağız kusmuğu geri aldı.',
            'Sabaha karşı güneş doğmadı, doğuruldu; ebe, iki parmağını ufka sokup çekti, çekti, çe—',
            'şme açıldı, içinden öğle çıktı, terli ve başkasının gölgesi altında.',
            'Çocuk çoktan yaşlanmıştı; dizindeki yara kapanmış, ben açık kalmıştım.',
            'İçimden bir at geçti, arabasız, borçsuz, ağzında bütün dişleri; durup bana binmedi.',
            'İ harfi ağzından düşüp güneşin altına dikildi; kişnemek kaldı, kış olmak için bir harf eksik.',
            'Eksik değildi; fazlaydı kışa at, ete, mek ve ne kadar sürerse sürsün çıkarılması gerekenler.',
            'Bıçak masada, kasap başında, et tezgahta; kesmek yok, kan nereye düşeceğini kendi seçti.',
            'Öğle kızardı, utancından sanıldı; camiler ikindiyi erken okudu, fabrikalar vardiyayı geç bitirdi, bir kadın kendi gölgesinden çıkıp serine oturdu, dizinde başka bir çocuğun yarası, cebinde üç aylık kira, ağzında hayır hayır hayır, bu kez boğulmadan, birinin evetini parmağından sökecek kadar dişli.',
            'Yüzüğü ısırdı; içinden düğün değil, küçücük bir mesai zili çıktı.',
            'Doğar doğmaz kart bastılar; yalnız çocuk basmadı, dizini uzatıp zili susturdu.',
            'Yevmiyesini kestiler, payımıza ses düştü.',
            'Ağzımızı açtık: belediye, anne, at, organ, çocuk, kira, güneş; hiçbiri kendine çıkmadı.',
            'Ben çocuğun ağzından çıktım, dizimde öğle, alnımda mühür; doğduğum yere değil, doğuranın vardiyasına.',
        ],
    },
    {
        id: 'sususum',
        title: 'susuşum',
        when: '26.09.18 11:19',
        note: 'written in alternating hands',
        audio: [],
        blocks: [
            'Benden önce eve varmıştı susuşum; sofraya oturmuş, anneme günümün nasıl geçtiğini anlatıyordu.',
            'Ondan önce vardı eve suskunluk; sofraya oturmuş annesine, gününün ünsüz geçişinden dem vurdu.',
            'Annesi çorbayı üfledi; buharın içinden, söylenmemiş iki harf kalkıp çocuğun yerine kaşığı tuttu.',
            'Annesi çorbaya üfledi; buharın içinden, söylenmemiş iki harf kalkıp çocuğun yerine kaşığı yuttu.',
            'Ağızda metal kaldı: biri sivri, biri yuvarlak; çocuk hangisini söylese annesinin yüzü başka türlü eksilecekti.',
            'Ağızda tatsız metal: biri sivri, biri yuvarlak; çocuğun dili hangisine değse annesinin yüzü başka türlü ekşidi.',
            'Kanamadı dil, kan diye annesi kalktı sofradan; musluğu açtı, yıllardır akan su bu kez onun ellerinden yukarı yürüdü.',
            'Kanamadı dil, "Lacan!" diyerek kalktı annesi sofradan; musluğu açtı, yıllardır akan su bu kez onun ellerinden bileğine, oradan koltuk altına mola vere vere tırmandı.',
            'Koltuk altında uyudu su; kadın kolunu indiremedi, çocuk “anne”nin ikinci hecesini çekip başının altına koydu.',
        ],
    },
    {
        id: 'sesim',
        title: 'önce sesim uyandı',
        when: '26.09.18 11:11',
        endmark: true,
        audio: [],
        blocks: [
            'Önce sesim uyandı; ben, biraz sonra, onun söylediği kadardım.',
            'Kalk, dedi, kalktığım yerden değil, henüz yatmadığım bir geceden.',
            'Gecenin içinde bir iş vardı, işin içinde sabah; ikisine de geç kalmıştım ben doğmadan.',
            'Bu yüzden ne zaman yetişsem bir yere, benden önce varmış oluyor yokluğum; sandalyeye o oturuyor, ücreti o alıyor, yüzüme bakıp da kusura bakmayın diyenlerin kusurunu o bağışlıyor, ben kapıda, hâlâ gelirken, hâlâ gelecek, hâlâ ge—',
            'Kapıyı açtılar, önümden çıktım: saçlarım kır, ellerim işten dönmüş, ağzımda çocukken yarım bıraktığım o ilk kalk.',
            'Ben kalkamayınca sabah çömeldi; iş, kapının altından sürünerek girdi.',
            'Ayaklarıma dolandı önce, sonra annemin, onun annesinin, adlarını işe yazdırmadan ölmüş bütün kadınların; bizden hangisi doğrulsa ötekilerin beli biraz daha bükülüyordu, bu yüzden yerde kaldık, hayır dinlenmek değil, dinlenmek denirse ücret kesilir, yerde kaldık ve saat yukarı çıktı bizim yerimize, sekiz oldu, dokuz oldu, on— olmadı.',
            'Olmayınca patron aradı: bugün de mi doğuyorsunuz?',
            'Telefonun öbür ucunda küçüldü, küçüldü, sesi göbek bağından ince kaldı; ben kestim.',
        ],
    },
    {
        id: 'dream-death',
        title: 'in the dream, death was easy',
        when: '26.09.18 11:00',
        movements: true,
        endmark: true,
        audio: [],
        blocks: [
            [
                'Di xewê de, mirin hêsan bû: mirov nefesa xwe berdida, yê din digirt, û tu carî erd vala nedima.',
                'Düşte ölüm kolaydı: biri nefesini bırakır, başkası alır, dünya bir an bile boş kalmazdı.',
                'In the dream, death was easy: one person let go of a breath, another caught it, and the world never had to empty.',
            ],
            '·',
            [
                'Nefesa dayika min çû nav devê keçeke ku hê çênebûbû; keçik bi dengê wê got: dereng mayî.',
                'Annemin soluğu, daha doğmamış bir kızın ağzına girdi; kız onun sesiyle, geç kaldın, dedi.',
                "My mother's breath entered a girl still waiting to be born; when she spoke, I was already late.",
            ],
            '·',
            [
                'Min baz da, lê di xewê de bazdan ev bû: her gav ku lingê min erdê didît, salek ji paş ve dihat.',
                'Koştum; düşte koşmak, ayağın her yere değdiğinde bir yıl geriden gelmesiydi.',
                'I ran, which there meant the ground kept arriving one year after my foot.',
            ],
            '·',
            [
                'Dema gihîştim, keçik ji min pîrtir bû û dayika min hîn li ser lêvên wê bû.',
                'Vardığımda kız benden yaşlıydı; annem hâlâ dudağının kıyısında soluyordu.',
                'By the time I reached her, the girl was older than me, my mother not gone yet from her mouth.',
            ],
            '·',
            [
                'Wê got: bistîne; min devê xwe vekir, lê tenê gotina na derket.',
                'Take it, she said; I opened my mouth and out came no.',
            ],
            '·',
            [
                'Na li hewayê ma, hêdî hêdî sivik bû, heta ku keçik jê nefesek çêkir û bi navê min berda.',
                'Hayır havada kaldı, hafifledi, inceldi; kız onu soluk diye içine çekti, benim adımla bıraktı.',
                'No stayed between us until it thinned into breath; she drew it in and exhaled my name.',
            ],
            '·',
            [
                'Keça min li ser sînga min radizabû; nefesa wê hêsan bû, ya min bi hesab.',
                'Kızım göğsümde uyuyordu; onun soluğu kendiliğindendi, benimki sayıyla.',
                'My daughter slept on my chest, breathing for nothing; mine was billed by the hour.',
            ],
            '·',
            [
                'Telefon dîsa lerizî: ger hûn îro neyên, cihê we tê dayîn.',
                'Telefon yine titredi: bugün gelmezseniz yerinize başkası alınacaktır.',
                'The phone shook again: miss today and we replace you.',
            ],
            '·',
            [
                'Min keça xwe hilda, nefesa wê ji xwe re girt û rabûm.',
                'Kızımı kaldırdım, soluğunu içime çektim, ayağa kalktım.',
                'I lifted my daughter, borrowed her breath, stood up.',
            ],
            '·',
            [
                'Li derî ew şiyar bû û destê xwe danî ser devê min: dayê, ya min nebe.',
                'Kapıda uyandı, eliyle ağzımı kapattı: anne, benimkini alma.',
                'At the door she woke and covered my mouth: Mama, not mine.',
            ],
        ],
    },
    {
        id: 'tiredness',
        title: 'tiredness',
        when: '26.09.18 10:40',
        movements: true,
        endmark: true,
        audio: [],
        blocks: [
            [
                'Min êdî roj nedijmartin; roj li ser min derbas dibûn, bê ku navê xwe bibêjin.',
                'Günleri saymayı bırakalı çok olmuştu; uğrayıp geçiyorlar, adlarını söyleme gereği duymuyorlardı.',
                "I'd stopped counting the days; they passed over me without bothering to say who they were.",
            ],
            '·',
            [
                'Hin roj agir bû, hin roj birçîbûn; yên din, piraniya wan, tenê kar bûn.',
                'Kimi gün yangındı, kimi gün açlık; gerisi, çoğu, işe gitmekti.',
                'Some days were fire, some hunger; most were just getting to work.',
            ],
            '·',
            [
                'Em ji hev neçûn; sal bi me re çûn, û rojekê me dît ku êdî em li heman derê ne.',
                'Biz ayrılmadık; yıllar aramızdan geçti, bir gün baktık, aynı yerde değiliz.',
                'We never left each other; the years did, and one day we were no longer in the same place.',
            ],
            '·',
            [
                'Min sê zarok mezin kirin; tu di her yekî de piçek biçûktir bûyî.',
                'Ben üç çocuk büyüttüm; sen her birinde biraz daha küçüldün.',
                'I raised three children; in each of them, you grew a little smaller.',
            ],
            '·',
            [
                'Dema yê biçûk pirsî tu kî bûyî, min got: westiya bû.',
                'En küçüğü senin kim olduğunu sorunca, yorgundu, dedim.',
                'When the youngest asked who you were, I said: tired.',
            ],
            '·',
            [
                'Wî bawer kir; li mala me westîn ji mirovan dirêjtir dijî.',
                'İnandı; bizim evde yorgunluk insandan uzun yaşar.',
                'He believed me; in our family, tiredness outlives the tired.',
            ],
            '·',
            [
                'Paşê ew jî mezin bû, çû, vegeriya; carekê li ber min rûnişt û got ku westiya ye.',
                'Sonra o da büyüdü, gitti, döndü; bir gün karşıma oturup yoruldum, dedi.',
                "Then he grew, left, came back; one day he sat across from me and said, I'm tired.",
            ],
            '·',
            [
                'Lê min nizanibû westîn dikare vegere û li ber te rûne, bi çavên zarokê te li te binêre.',
                'Ama yorgunluğun dönüp karşına oturabileceğini, sana çocuğunun gözleriyle bakacağını bilmiyordum.',
                "But I didn't know tiredness could come home, sit across from you, and look back with your child's eyes.",
            ],
            '·',
            [
                'Vê carê min negot rabe; min cihê xwe jê re vekir.',
                "This time I didn't tell him to get up; I made room.",
            ],
        ],
    },
    {
        id: 'sen',
        title: 'sen',
        when: '26.09.17 22:54',
        audio: [],
        blocks: [
            '“Sen,” dedi adam, ama kardeşi çoktan kalkmış, dutlardan birini seçiyor, en karasını, ezik olanı, çocukken hep ona bıraktığını avucuna koyuyordu; cümle böylece yönünü şaşırdı, söylemek için geldiği şeyi unuttu da meyvenin ağırlığına, avucun açık kalışına, ikisinin arasında yıllardır gidip gelen o küçücük alıp vermeye uydu.',
        ],
    },
    {
        id: 'come-here',
        title: 'come here',
        when: '26.09.17 22:19',
        audio: [],
        blocks: [
            "She woke while everyone was saying come here, though no one moved and here kept passing from mouth to mouth, widening until the woman at the window, the boy asleep against the wall, the old man who had died before she was born and the lover whose face she could not recover were all inside the same permission; then their breathing entered her out of order, one chest rising after another had fallen, and her body, unable to remain the single cause of what it felt, opened its knees to the distance between them. The lover came nearest by refusing to appear. She knew him by the shame leaving the others: they touched without choosing where touch ended, asked for nothing because asking still kept one person separate from another, and when she said I want, the grammar spread the wanting among them until I meant whoever was hungry and want meant take me with you and with meant under, before, because of. Nobody obeyed. Their refusal excited the room more than consent could have; walls withdrew, the night showed its crowded underside, years lay down beside minutes, and she entered him so completely that he remained absent. At six someone called her employee number and accuracy closed around her. Fluorescent light, second floor, women's alterations, no contract. The supervisor wanted to know whether she would stay late. She said she could not; he marked something beside her name. Her husband had the delivery shift until eleven, the neighbor would keep the child only until eight, and the landlord had begun adding a charge each time rent crossed Monday. On the bus she stood because sitting made sleep possible. A man pressed against her at the turn; she moved, he moved too, perhaps from the turn, perhaps not, and no one looked long enough to become a witness. She reached the daycare at eight seventeen. The neighbor said this cannot continue, meaning the lateness, the marriage, the money, or only tonight; she did not ask which because the child had a fever and the pharmacy closed at nine. Her husband called while she was counting what remained. “Come here,” she told him, but he said the app had given him one more order, as if the app had heard her first and translated desire into distance with a fee attached. She nearly laughed. Instead she carried the child home against her chest, each step bringing the three of them closer to morning and leaving no time in which they could meet.",
        ],
    },
    {
        id: 'the-wanting',
        title: 'the wanting',
        when: '26.09.17 22:07',
        audio: [],
        blocks: [
            'The wanting woke before she did.',
            'It had been awake for hours, possibly years. It had used her body in the night the way weather uses a field, and now it lay in the warm depression beside her, shaped like no one, breathing anyway. Between her legs the dream was still going on without her, politely, the way a guest finishes a meal after the host has left the table.',
            'The room had agreed to it. That was the first thing she noticed: the chair had folded its arms around a pile of clothes and was holding them the way a person holds another person in the last minute before a train. The mirror had her face ready but was offering it to the wall. In the kitchen the kettle was rising toward its small whistle with the patience of something that has been promised a mouth.',
            'She did not move. Moving would have decided something.',
            'On the ceiling, the crack she had lived under for three years had become a line on a map, and everything she had ever wanted stood on the other side of it, waving.',
            'The kettle reached its whistle first.',
            'It did not sound like a kettle. It sounded like her name being pronounced correctly for the first time in years, and along the ceiling the crack opened its whole length the way a mouth opens to answer. The border had a crossing now. There was a desk up there, and a window, and behind the window stood everyone she had ever wanted, still waving, but slower, with the patience of people waiting for her documents.',
            'The warm depression beside her got up. She felt it leave: the mattress rising, the room tilting toward the empty shape as it crossed the floor with her walk, her hips, her way of not apologizing for the space she took. At the mirror it lifted her face off the wall and put it on, and the face fit it better than it had ever fit her.',
            "Then it went up through the crack, taking her face and her name and the kettle's whole whistle, and from the other side came the sound of her documents being stamped, one after another, like small kisses landing on paper.",
            'Without a face, she discovered, she could watch anything.',
            'That was the first gift of the theft. No one on the other side looked down, because there was nothing to recognize. She lay beneath the open border and watched the one who wore her face move along the line of the wanted, receiving them. It was tender; that was the worst of it. Each one it touched, it touched exactly as she would have, keeping even her hesitations, and every touch was answered with the relief of people who had waited a long time and could finally stop.',
            'Between her legs the dream applauded, slow and wet, and she hated it and would not have stopped it for anything.',
            'The stamping went on above her, kiss after kiss on paper, and she understood the way one understands things in that state: the paper was hers. Her skin was the document, up there being approved page by page for a life she was not attending.',
            'She moved.',
            'Not toward the crack. That would have decided the wrong thing. She turned onto her side, into the warm depression, which still held the shape of no one, and pressed her facelessness down into it. The shape fit her better than her face ever had.',
            'Lying in the shape of the wanting, she began to learn its trade.',
            'It was simple work. You did not choose; you attached. The chair came first, still holding its armful of clothes in the posture of the last minute before a train, and she wanted it plainly, without cover: the wooden lap, the burdened arms, the patience of a thing that had been holding on for years. The clothes smelled of no one, which made it easier. She understood that the wanting had never truly been for the people above; they had only been shapes it tried on. This was older, had no face at all, and could live in a chair.',
            'Above her the stamping stopped.',
            'The silence that came down through the crack was the silence of a completed file. Somewhere up there her approved life closed its folder, stood, and began. She heard it begin: footsteps, a door, weather.',
            'The crack was closing now, slowly, without pain, the way a mouth closes when it has finished answering. Through the last narrow line of light something small came down, turned once in the air, and landed on her chest, where a face would have been looking.',
        ],
    },
    {
        id: 'son-durak',
        title: 'son durak',
        when: '26.09.17 21:13',
        note: 'the full turkish reading was never recorded; two excerpts remain',
        audio: [
            { src: AUDIO.sonDurakOne, label: 'voice, excerpt one' },
            { src: AUDIO.sonDurakTwo, label: 'voice, excerpt two' },
        ],
        blocks: [
            'Maral her gece ikiyi on üç geçe boş otobüsü son durağa sürer, iki kapıyı da açardı. Binen olmazdı. Yine de gövde bazen hafifçe çöker, sanki görünmeyen bir ağırlık basamaklardan çıkıp arka koltuklardan birine otururdu.',
            'Hayaletlere inandığından değildi.',
            'On bir yıl önce kapıları erken kapatmıştı.',
            'Çocuk kırmızı atkılıydı, eldiveni tekti. Otobüsün yanında koşmuş, çıplak eliyle cama vurmuştu. Maral onu görmüştü. Tarife görmemişti. Sabaha karşı kar, levhanın dibindeki küçük koyu bedeni örtmüş; müfettişler çocuğu ne kadar uzaktan fark ettiğini sormuşlardı.',
            '“Yeterince,” demişti Maral.',
            'O günden sonra bu kelimenin içindeki mesafe durmadan değişti. Yeterince erken. Yeterince geç. Yeterince uzak.',
            'İlk yıllar son durakta yalnızca bekledi. Motor çalışırken otobüsün çıkardığı sesleri saydı: fan, kayış, fren, kapı. Hepsini adıyla bilirse hiçbirinin başka bir şeye dönüşemeyeceğini sanıyordu.',
            'Ama bir gece motorun düzenli uğultusu tek bir sözü aşındırmaya başladı.',
            'Ölçen, ölçen, ölçen.',
            'Ortadaki ses inceldi.',
            'Ölen.',
            'Maral kontağı kapattı. Sessizlik gelmedi; yalnızca daha küçük seslere ayrıldı. Soğuyan metal, yerine oturan koltuk, arka tekerin oradan gelen ıslak bir tık. Sonra bir tık daha.',
            'Dili damağına kalktı.',
            'Ka...',
            'Kapat. Kapalı. Kapı.',
            'Hiçbiri ağzından çıkmadı.',
            'Arka basamaktan yere üç damla düştü. Maral saymaya başlamadı. Yine de ağzı kendi başına “bir” dedi. Üçüncü damla gelmedi.',
            'Onun yerine inme zili bir kez çaldı.',
            'Maral aynaya baktı. En arkadaki koltuğun üstünde küçük, çıplak bir el vardı. Beş parmak. Bir parmak büküldü, vinil hafifçe inledi. Bir tane daha.',
            'Beş, dört oldu; kimse eksilmedi.',
            'El kapandı. Yumruğun içinden metalin dişe sürtünmesine benzeyen ince bir ses geldi. Maral’ın kendi dişinde ağrı parladı. Bir şey yere düştü, daralan bir çember çizerek yuvarlandı. Ses noktaya dönüştüğünde Maral’ın ağzı eksik sayıyı tamamladı.',
            '“İki.”',
            'El yoktu.',
            'Koltuğun altında küçük bir toka buldu. Bir kenarı ısırılmış gibi yassıydı, dili kopmuştu. Hiçbir şeyi kapalı tutamayan bir çerçeve.',
            'Maral tokayı dudaklarına götürüp içinden üfledi. İnce bir ıslık çıktı. Ön kapı kalın uyarı sesiyle karşılık verdi.',
            'İnce. Kalın.',
            'Bir an bu iki sesin arasına bir kelime girecek sandı. Gel, belki. Git. Geç. Fakat aradaki yer boş kaldı.',
            'Tokayı yan koltuğa bıraktı. Kapının sesi sustuğu halde ıslık sürdü. Maral kaynağını aramadı. Ses işitmenin ötesine incelene kadar oturdu; sonra da ön dişlerinin arkasındaki titreşimi dinledi. Sesle duyum birbirinden ayrılınca ayağa kalktı.',
            'Toka yoktu. Koltukta ıslak bir kare kalmıştı.',
            'Kareye dokundu. Parmağı kuru çıktı.',
            '“Kuru,” dedi.',
            'Kelime takıldı, ağzında hiçbir şey takılmadığı halde.',
            '“K-kuru.”',
            'Bekledi. Kekemelik tekrarlanmadı. Kelimeyi bir daha, düzgün söylediğinde kare parmağının altında karardı.',
            'Islaklık değildi bu. Yansımaydı.',
            'Koltukta düz duran bir gece penceresi açılmıştı. İçinde başka bir otobüs ilerliyordu. Kar geriye akıyor, sokak lambaları tavandan geçiyordu. Direksiyonda Maral vardı ve arkasına bakmıyordu. Hemen arkasındaki koltukta çocuk oturuyor, kırmızı atkısını kucağında tutuyordu.',
            'Penceredeki Maral’ın ağzı açıldı. Ses gelmedi.',
            '“Biliyorum,” dedi bu taraftaki Maral, neyi bildiğinden önce.',
            'O andan sonra otobüste nedenler sonuçların gerisinde kaldı. Önce zil duyuldu, sonra düğme indi. Önce soğuk geldi, sonra kapı açıldı. Önce camda bir el izi belirdi, sonra çocuk yerinden kalktı.',
            'İki Maral aynı anda ellerini uzattı. Biri düğmeye, biri karanlık cama. Çocuk da çıplak elini kaldırdı ama parmağı düğmenin içinden geçti.',
            'Kapılar iki tarafta birden açıldı.',
            'Çocuk basamakta durdu; ne bindi ne indi. Ağzını oynattı. Sözü Maral’a yine iki kapı sesi olarak ulaştı.',
            'İnce. Kalın.',
            'Uyarı, dedi içinden.',
            'Sonra kelime kaydı: uyanış.',
            'Maral ikisini de bıraktı. Sesler, ad verilmeyince kaybolmadı.',
            'Çocuk buğulu cama iki çizgi çekti. Maral işareti tanımıyordu ama avucu tanıdı. Derisinin ortasında küçük bir kare ısındı. Elini açınca ıslak, kırmızı bir ip gördü. Atkı olamayacak kadar kısa, yalnızca renk olamayacak kadar ıslaktı.',
            'Çocuğun elinde de aynısı vardı. İki ip camın iki yüzünde buluştu, birbirinin içinden geçmeden tek çizgi oldu.',
            'Maral çekiş bekledi. Gelmedi.',
            'Arkasındaki gerçek kapı kendiliğinden açıldı.',
            'Dışarıdaki kar eşiğe kadar gelip dümdüz duruyordu. Çocuk açık kapıya baktı. Maral dönmedi. Sırtında soğuk, avucunda sıcaklık vardı; bedeni hangisinin ileri olduğunu seçemedi.',
            'Bu yüzden yana adım attı.',
            'Kar, botunun altında katlanan kâğıt gibi ses verdi. Karanlık kare köşeden köşeye kırıştı. Bir an yol Maral’ın bedeninden çapraz geçti: kaburgalarının altında farlar, gözlerinin arkasında ıslak asfalt.',
            'Kâğıdın altından on bir yıl önceki kendi sesi geldi.',
            '“Devam et.”',
            'Motor uğultusu sözü tekrar etti, fakat başını yuttu.',
            '“...vam et.”',
            'Bir kez daha:',
            '“Devamı aç.”',
            'Maral ilk kez kendi eski buyruğunu dinlemedi. Avucunu karenin üstünden kaldırdı.',
            'Karanlık kapanmadı. İçinden frenlerin uzun metal nefesi yükseldi. Kırmızı ip aşağı sarktı; görünmeyen ucundan bir kez çekildi. Çekiş, ip gittikten sonra bile bileğine, dirseğine, omzuna yayıldı. Beden, elinde olmayan şeyi hatırlıyordu.',
            'Maral elini koltuğa bastı. Fren sesi avucuna girip cama vuran ele dönüştü.',
            'Bir kez.',
            'İkinci vuruş bileğinin içinden geldi.',
            'Üçüncüsü nabzının arkasında bekledi ama vurmadı.',
            'Maral parmaklarını teker teker kaldırdı. Saymadı. Avucu tamamen açıldığında sessizliğin içinde beş ince aralık vardı. Hava bu aralıklardan geçti: en darından ince, en genişinden kalın.',
            'Eski uyarı, kemik ve deriden geçerken değişmişti.',
            'Maral otobüsten indi.',
            'Kar botunu sessizce aldı. Katlanma sesini, ıslığı, camdaki vuruşu bekledi. Hiçbiri adımını ödünç almadı.',
            'Dönüp baktığında gerçek otobüs boştu. Karanlık karede çocuk sürücünün arkasına oturmuş, atkısını kucağına bırakmıştı. Pencereden dışarı bakıyordu artık.',
            'Görülmeyi beklemiyordu.',
            'Maral otobüsün yanından yürüdü, on bir yıl önce elin cama vurduğu yere geldi. İz kalmamıştı. Yine de avucunu cama koydu.',
            'Çocuk elini kaldırdı fakat cama değdirmedi. On bir yıl ve bir cam kalınlığı ötede tuttu.',
            'Sonra Maral, çocuğun parmak ucunu kendi tırnağının öteki yüzünde hissetti. Dokunuş camdan geçmemişti. Sanki o gece başlamış, ancak şimdi sonuna varmıştı.',
            'İkisinin tırnağında aynı koyu hilal belirdi. İkisi de başparmağını üzerine bastırdı. Baskı birinden ötekine gitmedi; nerede başladığı belli olmayan tek bir baskı oldu.',
            'Maral bunun kimin eline ait olduğunu anlamaya çalışmayı bırakınca hafifledi.',
            'Eller birlikte indi.',
            'Karanlık kare çocuğun çevresinden silindi. Önce koridor, sonra koltuk, en son atkının kırmızısı. İki otobüsün direksiyonu kendi başına düzeldi. Kapılar birlikte açıldı.',
            'Kimse geçmedi.',
            'Karda iki sıra ayak izi belirdi. Biri otobüsten Maral’a geliyor, öteki Maral’dan yola doğru oluşuyordu. Her yeni iz ortaya çıkınca ayağını içine koydu. Bir süre böyle yürüdü; sanki yol onu çağırmıyor da arkasındaki mesafe kapanıyordu.',
            'Sonra durdu.',
            'İzler de durdu.',
            'Otobüs, kapıları açık halde yürüyüş hızında yanından geçti. Sürücü koltuğu boştu. Arkasında kırmızı atkı bir kez katlanmıştı. Atkı çözülürken içinden toka kayıp cama dayandı.',
            'Bu kez ses çıkarmadı.',
            'Otobüs öne geçti. Toka da onunla gitti. Hiçbir şey el değiştirmedi.',
            'Maral’ın önünde, ayağını nereye koyacağını söylemeyen kara asfalt kaldı.',
            'Otobüs uzaklaştı. Maral onu eliyle ölçmeyi denedi; parmaklarını kapatınca kayboluyor, açınca başka bir yerde beliriyordu. Kolunu indirince otobüs büyüklüğünü yitirdi. Yakın mıydı, çok uzakta mı, yol cevap vermedi.',
            'Işıkları söndü. Ardında kalan karanlık, çevresindeki karanlıktan daha koyu değildi.',
            'Maral dinledi.',
            'Önce hep orada olanları duydu: karın yerleşmesini, yolun üstündeki telin rüzgârla oynamasını, kendi nefesinin montuna sürtünmesini.',
            'Sonra yerini çıkaramayacağı kadar uzaktan kapıların sesi geldi.',
            'İnce.',
            'Kalın.',
            'Maral yankının onları başka bir şeye dönüştürmesini bekledi.',
            'Dönüştürmedi.',
            'Sesler bitti. Karanlık, sonrasında gelen şeye ad vermesini istemedi.',
            'Maral, tuttuğunu bilmediği nefesini bıraktı.',
        ],
    },
    {
        id: 'last-stop',
        title: 'the last stop',
        when: '26.09.17 19:24',
        note: 'voiced in english as seventy-five excerpts; its turkish text version is son durak, below',
        audio: [{ src: AUDIO.lastStopAudio, label: 'voice, the delivered excerpts in order' }],
        blocks: [
            'Every night at two thirteen, Mara drove the empty bus to the last stop and opened both doors for a passenger who had died eleven years ago. Not because she believed in ghosts. Because once, in winter, she had closed them too soon.',
            'The passenger had been a boy with a red scarf and one glove. He ran beside the bus for half a block, striking the door with his bare hand. Mara saw him. The timetable saw nothing.',
            'By morning, the snow had covered the curb, the road, the little dark shape beneath the timetable pole. They asked her how far away he had been when she noticed him. She said, Far enough. For eleven years, those two words kept changing their distance.',
            'The first time she opened the doors at two thirteen, it was an accident. Her hand moved before the stop, and cold air climbed the steps. Then the suspension dipped once, gently, under a weight the bus could measure better than she could.',
            'Measure better than she could. The engine kept the sentence after she stopped. Measure, measure, measure, until the middle of the word wore thin. Mercy. Mara heard it and did not correct it. At two thirteen, she put her mouth close to the door glass. Mea... No. Mercy.',
            'Mercy stayed on the glass. Not written. Warmed there. Her breath clouded it, cleared, clouded it again, and each time the word came back missing its first sound. See. See. She tried to put the rest of it back. Mm... The bus lowered itself at the curb.',
            'The bus lowered itself. Lower. Lo... The word dropped before the vehicle did. Air left her mouth and kept going, under the door, under the snow, under the little dark... No. Not little. Not dark. A boy.',
            'A boy. Boy. Boy... oy... By the time it reached the back seats, it had become a question. Mara opened the doors wider. Not for an answer. For the question to get out.',
            'Out. The doors answered with their two-note warning. Out. Out. No. Not warning. Wanting. The second note strained against the first until the bus seemed unable to decide whether to close or call. Mara put one hand between the doors. They touched her sleeve and opened.',
            'Opened. The word had no weight in it. Her sleeve did. Wet wool. Cold wrist. The small pull of rubber seals releasing what they had almost kept. Kept. Kept him. The engine shuddered beneath her feet. Or she did. This time, she let the sentence keep both.',
            "Both. The word closed her lips, then left them open. Engine and body. Shudder and shudder. For years she had made one carry the other. She breathed in. Nothing followed. At the back of the bus, a stop-request bell sounded once. Mara's hand stayed where it was. Between closing and closed.",
            'Closed. Almost the same word as clothes. Coat. Scarf. One glove. Things a body leaves its shape inside. Mara pulled her sleeve free. The doors remained open. At the back, nothing pressed the bell again.',
            'Again. She waited for it. A gain. As if the bell had given something back. Nothing sounded. Still, the bus grew lighter. Not empty. Lighter.',
            'Light. Lighter. The ending kept moving away from the word. Light. A breath passed through the open doors. At two fourteen, the clock changed without asking her. The red digits held there. Mara closed one door. The other would not follow.',
            'Lighter. She said it once more, but the last sound went out through the doors. Light. At two fourteen, the red clock changed. Mara tried the switch. One door folded shut. The other stayed open, breathing cold across the floor.',
            'Breathing. No. The door was only open. The cold moved in because it could. Mara listened until the engine became an engine again. Then, from the floor behind her, the soft drag of wool. Once. Nearer.',
            'Nearer. Knee. Ear. The word broke against her body. Her knee locked beneath the wheel. One ear turned toward the aisle. Here. She did not know if she had heard it or made it. Here.',
            'Her knee locked beneath the wheel. One ear turned toward the aisle. Here. She did not know if she had heard it or made it. The engine wore the small sound down. Here. Hear. Air. Then only air.',
            'Something red moved in the long mirror. Not a person. A narrow color, trembling with the engine. Mara looked without turning. The mirror shook it into thread. Red thread. The thread trembled back.',
            'She breathed again, deliberately. One thin note moved toward the mirror. One stayed behind her teeth. The red line shook loose from the glass. For a second it hung from nothing, touching nothing. Just color held in a sound too small to carry it. The aisle was gray.',
            "The cough left a taste of metal. She ran her tongue behind her teeth. No blood. Still, when she said the boy's name, the first sound came out rusted. She stopped. Eleven years, and the name had not been in the story. It was not in her mouth now. Only the place where it had scraped past.",
            "The scrape moved lower. Name became ache without passing through speech. She pressed two fingers to her throat. Under them, the engine's vibration and her pulse kept losing each other. One. Two. One. Two did not return.",
            'The doors gave their warning tone. High. Low. There was the missing beat, outside her body. Mara lifted her fingers from her throat. High. Low. The open door began to fold. Before the rubber edges met, a bare hand struck once from the other side. Or snow fell from the roof. The sound was gone too quickly to choose.',
            'She opened the door again. No hand. No mark on the glass. But the rush kept its shape inside her ear. Hush. Not a command. What remained when the first sound fell away. Mara turned the engine off. The silence arrived unevenly.',
            'Without the engine, the bus kept several small sounds. Metal cooling. Her coat settling. A wet click from somewhere behind the back wheel. Then another click, closer to speech. Cl... Mara waited for the word to finish itself. It did not. Neither did she.',
            'Her tongue stayed lifted behind her teeth. Cl... Close waited there. Clothes. Closer. None of them came forward. From the rear step, water found the floor in three drops. Click. Click. Mara lowered her tongue. Come.',
            'The word crossed the bus alone. Nothing moved toward it. But the long mirror fogged at its far end, one small oval whitening from the center out. Mara almost said the word again. Her lips met. Mm. Not come now. The beginning of mercy, held closed.',
            'The word crossed the empty bus. Nothing answered. At the far end, a small oval of mist appeared on the mirror. Mara nearly spoke again. Her lips met. Mm. Not come now. The beginning of mercy, held closed.',
            'The oval faded at its edges. The mirror gave back no face. Only a red thread crossing the white. Mara opened her lips. Across the aisle, the glass seemed to breathe at the same pitch. The two sounds touched. Neither one spoke.',
            'Her hum ran out first. The other pitch continued for half a breath, then slipped downward. Not a voice. Rubber easing in the cold. Glass under strain. Mara knew every sound the bus could make. This one entered the list slowly. The red thread disappeared. The note remained.',
            'She reached for the ignition. The key clicked once beneath her fingers. The held note bent around it. Click. Note. Click. No... Her hand stopped. The word no had entered without her voice. Mara turned the key backward and took it out. In the quiet, the low pitch loosened. Almost a name.',
            'It began with no. Or ended there. The rest was vibration in the window frames, too low for consonants. Mara put the key on her tongue. Cold metal. One hard shape. She closed her mouth around it and listened through her teeth. The name came nearer without becoming clearer. This time, she did not ask it to.',
            'The metal warmed. A shape her mouth could no longer feel as separate from itself. When she took the key out, her teeth kept its small pressure. The low note had stopped. In its place, the memory of vibration continued. Mara bit down on nothing. From the far end of the bus came the sound of someone waking carefully. A coat settling. One breath held so as not to be heard.',
            'Mara held hers too. The bus divided the quiet between them. Front breath. Back breath. Neither released. The windows began to pale, though morning was hours away. Not light. The glass losing its reflection. Seat by seat, the bus forgot how to show itself. At the rear, a small cough broke the held air. Mara answered before she could stop. Bless you.',
            'The last word kept its shape longer than the others. Bless. Less. The bus gave back only what could survive the distance. At the rear, cloth shifted. A hand appeared on the top of a seat. Small. Bare. Mara looked at the fingers until they became five pale marks in the failing glass. She did not count them.',
            "One finger bent. Then another finger. Five became four without anyone leaving. Mara's mouth began the count by itself. One. The hand closed before she could say two. From inside the fist came the faint scrape of metal. A key touching a tooth.",
            'Her own teeth answered with pain. A small bright line from jaw to ear. The fist at the back loosened. Something dropped behind the seat. Metal struck metal once, then rolled in a narrowing circle. Mara listened to the circle become a point. When it stopped, her mouth opened on the missing number. Two. The bare hand was gone.',
            "The point of silence stayed behind the seat. Mara left the wheel. Her boots pressed water from the aisle in short dark prints. At the back, she crouched and reached under. Her fingers found metal. Not a key. A small buckle, bitten flat on one side. When she lifted it, the bus gave a single settling knock. Mara's teeth met gently. The same shape.",
            'She turned the buckle between finger and thumb. Its tongue was missing. Only the frame remained, holding nothing closed. Mara breathed through it. At the front, the open door answered with its low warning note. Whistle. Note. For once, they did not try to become words.',
            'Mara set the buckle on the seat. Without her breath, it was only metal again. The door tone stopped. A moment later, the whistle continued. Thin. Uneven. Coming from no place she could see. She did not search for it. She sat across the aisle and let the sound spend itself. It lasted longer than the figure had run beside the bus. Then longer than that.',
            'Mara placed the buckle on the seat. Without her breath, it was only metal again. The door tone stopped. A moment later, a thin uneven whistle continued. She could not see where it came from. She did not look for it. She sat across the aisle and listened. The sound lasted longer than the running shape beside the bus. Then longer than that.',
            'The sound thinned past hearing. Mara still felt it behind her front teeth. She sat until feeling and sound were no longer the same thing. Outside, snow settled through the open door and melted in the aisle. One drop reached her boot. Then another. No count followed. When she stood, the buckle had left a wet square on the seat. The metal itself was gone.',
            'She touched the wet square. Her fingertip came away dry. Again. Dry. The word caught there, though nothing in her mouth caught with it. Dry. Mara waited. No second break came. She said it once more, and the square darkened under her finger.',
            'She touched the dark square. Her fingertip came away clean. Again. Dry. She spoke the word once more. Dry. Mara waited. Nothing repeated. She said it a third time, and the square darkened beneath her finger.',
            'The dark spread to the edges of the seat. Not wetness. Reflection. A night window lying flat beneath her hand. In it, the bus was moving. Snow drew backward. Streetlights passed over the ceiling. Mara sat at the wheel and did not turn around. Here, beside the seat, she watched herself drive. The reflected mouth opened. No sound reached her. Her own mouth answered anyway. I know.',
            'The woman in the seat-window looked forward. The woman beside it looked down. Between them, the route continued without road. Stop-request bell. Doors. Cold entering. Each sound arrived before the thing that made it. Then footsteps ran along the outside of the moving bus. Mara heard them reach the front. This time, both women lifted their hands.',
            'One hand reached for the switch. The other touched the glass. The doors opened in the reflection first. A boy stepped in from the snow, red scarf dark with water, one hand bare. No running now. He stood beside the driver and looked down through the seat at Mara. His mouth moved. The words reached her as the old two-note warning. High. Low. Her hand remained above the switch.',
            "The tones came again. High. Low. Not warning now. Not wanting. A space wide enough for a word, left empty. The boy raised his bare hand to the reflected switch. His finger passed through it. At the same moment, Mara's hand lowered. The real doors folded shut behind no one. In the seat-window, they stayed open. Cold moved through both buses.",
            'Her breath appeared on the dark seat. In the moving reflection, another patch appeared on the windshield. Two white shapes, neither like a face. The boy drew one finger through the nearer one. A line. Then another crossing it. Not a letter Mara knew. Her body recognized it anyway. The ache behind her teeth released. Something small clicked against her tongue.',
            'She closed her teeth around it. Not metal. Hard, then softening. A grain of salt. A piece of ice. Something that had crossed the mouth without a name. It melted before she could choose. The taste was winter. No. Wool. No taste at all, only the memory of biting down. In the dark seat, the boy lowered his hand. Mara opened hers.',
            'A red thread lay across her palm. Too short for a scarf. Too wet to be only color. She lifted it toward the seat-window. On the other side, the boy did the same. The two threads met at the glass and became one line. It ran from his hand into hers without passing through. Mara felt no pull. Only warmth gathering where the buckle had pressed its square into her skin. Behind her, the real door opened by itself.',
            "Snow crossed the threshold and stopped. A white edge lay along the floor. The red line in Mara's palm tightened without pulling. In the dark seat, the moving bus slowed. Streetlights held still above the road. The boy looked toward the open door behind her. Mara did not turn. Cold touched the back of her coat. Warmth remained in her hand. Her body could not decide which way was forward.",
            "She took one step sideways. Neither toward the door nor toward the boy. Her boot crossed the white edge. Snow gave under it with the sound of paper being folded. The seat-window creased from corner to corner. For an instant, the road ran through Mara's body at an angle. Headlights under her ribs. Dark asphalt behind her eyes. She exhaled. The crease opened. The bus was still in both places.",
            'The paper sound returned under her next breath. Fold. Not a command. A noise with an edge. The boy bent at the waist, then vanished below the seat line. Mara crouched without choosing to follow. Beneath the seat, the dark square had opened like a gap between pages. From it came engine noise, distant and small. Then her own voice from eleven years before. Keep moving.',
            'The younger voice repeated itself from under the seat. Keep moving. But the second time, moving lost its first sound. Keep oving. Keep opening. Mara put her palm over the dark square. Engine noise pressed against her skin. The reflected bus doors widened. The boy stood on the step, neither in nor out. Mara lifted her hand from the square.',
            "The dark square stayed open. Nothing held it down now. From below came the sound of brakes releasing, a long breath made by metal. The reflected road began to move backward. The boy remained on the step. Mara's red thread slipped from her palm and entered the square. It did not fall. It stretched downward, trembling in the engine breath. At its far end, something tugged once. Mara closed her empty hand.",
            'The tug traveled through what was no longer in her hand. Wrist. Elbow. Shoulder. A pull remembered by the body after the line was gone. Mara leaned back. Below the seat, brakes sighed again. This time the sound rose instead of fading. The dark square lifted at one corner. Under it was the ordinary gray seat. Under that, still, the sound of a bus stopping. Mara opened her hand.',
            'In her palm, the buckle-shaped warmth had cooled. The skin kept a pale square. She placed it against the gray seat. Square over square. The stopping sound moved into her hand. Not brakes now. A palm striking glass. Once. Mara left her hand there. The second strike came from inside her wrist.',
            'A third strike waited behind her pulse. She felt the space for it. The reflected boy watched her hand. Mara lifted one finger from the seat. The waiting moved into the gap beneath it. She lifted another. Nothing struck. By the time her palm was free, the silence had five narrow openings. Cold air passed through them. Her hand sounded like a door left open.',
            'A third beat waited behind her pulse. She felt the space for it. The boy watched her hand. Mara lifted one finger from the seat. The waiting moved into the gap beneath it. She lifted another. Nothing happened. By the time her palm was free, the silence had five narrow openings. Cold air passed through them. Her hand sounded like a door left open.',
            'She held the open hand near her ear. Air moved between the fingers. High through the smallest gap. Low through the widest. The old warning, changed by bone and skin. In the dark seat, the boy lowered his hand from the switch. The open doors stayed open without him. Mara turned toward the real door. Snow beyond it had no footprints. Still, the cold carried the smell of wet wool.',
            'Mara stepped down. The snow took her boot without sound. She waited for the paper fold, the whistle, the strike. Nothing borrowed her step. Behind her, both buses idled in silence. She turned. In the real bus, the seats were empty. In the dark square, the boy sat behind the driver, red scarf loose in his lap. He was looking out the window now. Not waiting to be seen.',
            'She drew the cold too deep. Halfway through the next breath, her throat tightened. Mara tried to say his name. The first sound scraped, caught, and broke into a cough. She bent into her sleeve. When she straightened, the soreness stayed. The boy in the dark seat had turned from the window. Mara tried again. This time the damaged voice made no name. It made room.',
            "The room in her voice was rough-edged and small. The boy listened into it. His mouth moved once. No warning tones came. Only the soreness answering itself, low in Mara's throat. She pressed a hand there. Under her palm, the failed name shifted position. Not rising toward speech. Turning. Like someone on a step who had finally chosen which way to face.",
            "Mara walked along the side of the bus. In the dark square, the road moved beneath the boy's window. Out here, nothing moved but snow. She reached the place where he had struck the door eleven years before. No mark remained. She placed her palm against the glass anyway. Inside the reflection, the boy lifted his bare hand from his lap. He did not touch the window. He held it near hers, with the glass and eleven years between them.",
            "Snow gathered on the back of Mara's hand. In the square, water ran from the boy's fingers upward toward his sleeve. She watched one world freeze while the other thawed the wrong way. The glass held both temperatures and gave her neither. Then the boy turned his palm outward. A small metal buckle lay against it. Its tongue was missing. Mara looked down at her own empty hand. The snow had melted in the shape of a square.",
            "The boy closed his fingers over the buckle and the square in Mara's palm darkened, not all at once, just from one corner outward until she could feel a little weight gathering there. She lowered her hand and the weight came with it. When she opened her fingers, there was still nothing she could see, but something shifted against her skin as she turned her wrist, a small loose piece finding the edge and stopping. Inside the glass, the boy had opened his hand too.",
            'Mara tipped her hand and heard the piece fall, though nothing struck the snow. It made the little narrowing sound of a coin rolling somewhere hard, circling once, twice, and when it stopped the boy looked down between his shoes. He bent to pick something up. She bent too, her fingers entering the snow until the cold reached her knuckles, and for a moment neither of them could find what had fallen. Then the bus door began to close.',
            "Mara caught the door with her shoulder before it could shut, still crouched, one hand in the snow and the other braced against the rubber edge. The boy glanced up at the same moment and in the dark square his door stopped too, though nothing was touching it. Between their lowered faces, something gave a tiny click. She moved her fingers toward it and he did the same, slowly now, each watching the other's hand instead of the ground, until both of them stopped over the place where the sound should have been.",
            "Nothing was there, and then Mara felt the boy's fingertip touch the other side of her nail. Not through the glass exactly. More like the touch had started eleven years ago and only now reached the end of itself. She flinched, the door pressing harder into her shoulder, and his hand vanished from the square. But the pressure stayed, light as the loose piece had been, right at the edge of her finger. Mara turned her hand over.",
            "A shallow crescent had appeared beneath the nail, red at first, then darkening as she watched. The boy's hand returned in the square and he showed her the same mark. Mara pressed her thumb over hers. He copied her, and the pressure moved between them once, not back and forth, just one continuous pressure with no clear side where it began. The loose piece clicked again somewhere below their hands. Neither reached for it.",
            'The pressure eased when Mara stopped trying to tell which hand it belonged to. Her thumb stayed where it was a moment longer, then the boy lowered his and she found hers lowering too, neither copying now, both simply finished with the same action. The dark square in the glass began to clear around him. First the aisle, then the seat, then the red scarf losing its color at the edges. He looked toward the front of his bus. Mara looked toward hers.',
            "At the front of the reflected bus, the other Mara had left the driver's seat. The wheel moved by itself through a shallow turn while the boy stood beside it, watching the road come round. In the real bus, the empty wheel turned too. Mara was outside both of them now. She could see that without knowing where outside was. The doors gave their two notes, high and low, and this time opened together. No one stepped through.",
            'The snow between Mara and the doors had begun to show two sets of tracks. One came from the bus and ended at her feet. The other started there and went back toward the road, filling itself in one print at a time. She watched until the next print appeared, then put her boot into it before it could become empty. Inside both buses, the wheels straightened. The boy sat down behind the driver. This time, Mara took the step that was already there.',
            "The next print appeared on the road where snow could not have held it, a darker patch on the asphalt shaped like the front of her boot. Mara stepped into that too, and behind her one of the buses began to move. She did not turn quickly enough to see which one. There was only the soft pull of tires, the open doors giving no warning, and through the long side window an empty driver's seat passing her at walking speed. On the seat behind it, a red scarf lay folded once.",
            'As the scarf passed, one loose end lifted in the air from the open doors and pointed back toward the last stop. Mara followed the gesture with her eyes, but the shelter, the timetable pole, even the curb had gone; there was only road continuing into snow. The bus kept pace beside her. She walked, it rolled, and the folded scarf slowly came undone on the empty seat until a small metal buckle slipped from it and rested against the glass. This time it made no sound.',
            'The buckle stayed against the glass while the bus began to move ahead of her, and as the rear wheel passed, the window carried it out of sight without anything changing hands. Mara stopped walking. The tracks behind her stopped filling themselves too. For the first time there was a stretch of untouched road between her and the bus, plain black asphalt with no print waiting to tell her where to put her foot. The bus continued. She stood until its open doors were smaller than her hand.',
            'Mara lowered her hand and the bus disappeared behind it for a second, then returned farther down the road. She tried again, opening and closing her fingers over the small shape, but each time it came back it was already somewhere else. So she let her arm fall. Without her hand to measure it, the bus lost its size. It might have been near or very far away; the road gave her no help. Then its lights went out, and the dark where it had been was no darker than the rest. Mara listened.',
            'At first she heard what had always been there: snow settling, a wire moving somewhere above the road, her own breath passing close to her coat. Then, so far away she could not place it, the two-note door warning sounded once. High. Low. Mara waited for the echo to turn it into something else. It did not. The tones ended, and nothing in the dark asked her to name what came after them. She breathed out before she knew she had been holding it.',
        ],
    },
    {
        id: 'first-thing',
        title: 'the first thing he learned',
        when: '26.09.17 19:08',
        audio: [{ src: AUDIO.kettleAudio, label: 'voice, full piece' }],
        blocks: [
            'The first thing he learned was not to look directly at things. The chair stayed a chair only while he watched it, and the kettle, left unwatched, hummed a note from a song he had almost remembered.',
            'He took to leaving rooms backward, one slow step at a time, the way you leave a sleeping animal. It did not help. In the morning, the hallway mirror held a room with one more window than the hallway had.',
            "Other people's eyes, he found, worked as well as his own. A crowded bus kept its shape beautifully. It was the empty rooms at home that went soft, the hours between midnight and four, when nothing in the apartment was being believed in.",
            'He learned to leave the radio on when he slept, tuned low to a station that talked all night. A voice, any voice, was almost as good as an eye. The apartment listened, and in the morning the rooms were nearly where he had left them.',
            'Some nights, surfacing near three, he caught the radio murmuring about a hallway with one window too many. He could not tell whether he was hearing it or dreaming it, and both seemed possible, and neither seemed safe.',
            "Once, to prove he still could, he turned the radio off. The silence was not empty. It was busy. [audible inhale] The walls were gently losing their edges, the floor forgetting its own level. [gasp] He had the knob back on before he knew he had moved, heart going like a fist on a door, and into the returning static he said it out loud: [cracked whisper] I'm sorry. I'm sorry. [shaky exhale]",
            'After that night, he stopped trusting the radio alone. He began to talk to the rooms himself, quietly, the way the station talked, naming things as he passed them. [softly, with a pause after each word] Kettle. Chair. Window. He counted the windows every time, to keep the number honest.',
            'Then there was a woman who looked straight at things. [fond, almost smiling] She came up one Thursday with borrowed sugar she did not need, and the hallway behaved for her without being asked, the windows keeping their honest number. He watched her move through his rooms the way you watch someone breathe.',
            'She started staying the night, and she slept without guarding anything, one arm flung out, breathing slow, and the rooms held still until morning, all on their own. One night he reached over and turned the radio off. [long pause] Nothing happened. [voice trembling slightly] He stood in the middle of the silence and cried a little, quietly, [almost laughing through tears] so as not to wake the windows.',
            'She went away once, a whole week, to a sister by the sea. The first night, his hand found the radio out of old habit. He left it off. He lay in the dark and named the room, once, softly: [slow, almost a lullaby] kettle, chair, window. And the room, being believed in, stayed. [long pause]',
            'The extra window still turns up some mornings, in the hallway mirror, in the background of photographs. Nobody counts it anymore. She says a thing like that is not a leak, it is a door. And the kettle still hums its half-remembered song. Only now, he hums back.',
        ],
    },
    {
        id: 'spoon',
        title: "the spoon's bent light",
        when: '26.09.17 18:27',
        audio: [],
        blocks: [
            "Every morning the apartment assembled itself around her breakfast: window first, then kettle, then the neighbor's cough coming warm through three walls. By the first sip it had usually remembered which way was down.",
            'Today the spoon rose from the table and stayed there, trembling at the edge of usefulness.',
            'She tapped it with one finger - ting - and the bedroom light came on inside her mouth. Not light exactly: the pale square of a door left open where no room had been. She swallowed, and the door went down without closing.',
            "All day it moved through her in small drafts: while the bus forgot a street, while seven office windows blinked the same blue mistake, while a man she had worked beside for years arrived with Tuesday's face and nobody found this remarkable.",
            'At six the clocks released everyone. She took the long way home, through the underpass where footsteps always arrived a little before the feet that made them. Halfway through, hers stopped ahead of her.',
            'Tak.',
            'The sound waited under the last lamp, wearing her shoes. She stepped into it.',
            'Darkness did not fall; it unfastened, and the city slipped soundlessly from its meanings. For a while there was only the low red scent of almost, almost, and something enormous breathing with no need for air.',
            'Then cold laid one blue syllable against her eyelid: open.',
            'The ceiling was white - not bone, not winter, not anything but white - and its refusal struck her awake from the teeth outward. Her hand existed beside her. Five fingers, each terribly itself; the nails held their thin moons without metaphor, the wrist kept blood in its red appointment, and when she raised it the air answered everywhere at once: skin, weight, now.',
            'A machine near the bed counted softly through green: 71, 72, 72, and every number entered the room whole. Beyond the curtain someone said her name, and the name came through carrying its years by the roots. She knew the voice before memory could put its furniture around it.',
            '"Stay with me," it said, and stay became a place so immediate she could smell the iron railing wet beneath her childhood palms, could hear one sparrow worrying a seed on the sill, could feel the bed receiving every gram of her as if matter had been waiting all night to pronounce her correctly.',
            'She understood she could move. She understood, too, that moving would spend it. Still, she turned her head.',
            'The curtain parted on a hand, then an arm in a yellow sleeve, then a face whose every line she knew but whose wholeness hurt - not grief, not joy, a third thing with both hands inside her chest.',
            '"You came back," she said. The face broke open with recognition, and the room lost one clear edge. "No," the voice said, very near now. "You did."',
            'The numbers faltered: 72, 7-, a green mouth left open. She reached for the yellow sleeve, but distance had begun growing its soft furniture again: first an inch of maybe, then the bedside table, then a corridor furnished entirely with rain.',
            '"Wait," she said, and the underpass said it back from somewhere beneath the bed: ait, ait, eight.',
            'The hand in the curtain became the spoon above breakfast, trembling, almost useful, while the face remained behind it for one impossible second longer - looking at her, looking through morning, saying something the kettle swallowed in a shriek of steam.',
            'She was sitting at the kitchen table with her coat on, though evening pressed its dark thumb to the window and the coffee beside her had gone cold enough to remember morning. On her palm, five red crescents where no nails had touched her. She counted them twice and got six.',
            'Outside, the neighbor coughed through three walls, the bus misplaced the same street, office windows blinked blue into the dark - everything faithfully continuing the life that had been left in charge of her.',
            'She lifted the spoon.',
            "The yellow sleeve crossed the spoon's bent light once, very quickly, and her mouth remembered the taste of iron railings.",
        ],
    },
    {
        id: 'orchard',
        title: 'the orchard',
        when: '26.09.17 16:53',
        endmark: true,
        audio: [],
        blocks: [
            'At noon the orchard began knocking.',
            'Not at the door. There was no door there, only the white wall of the kitchen and, beyond it, eleven pear trees standing in their own green weather. Still: knock. A pause fat enough for an answer. Knock knock.',
            'She put down the knife.',
            'The peach beneath her hand had opened all the way to its stone, a small wet planet with one red country. She listened. The refrigerator hummed through its teeth. Somewhere a fly kept striking the same bright inch of window, bzzt, bzzt, as if sewing the house shut.',
            "Then the orchard knocked again and this time her father's cup jumped in the cupboard.",
            'She had not thrown it away. She had thrown away everything else: his shirts with their stubborn elbows, the brown medicine bottles, the slippers collapsed into the shape of waiting, even the blue comb whose missing tooth had made him swear each morning, softly, with great care. But the cup stayed. Yellow, chipped, ordinary. It had survived him without talent.',
            'She opened the cupboard.',
            'Coffee smell. Impossible and cold.',
            'She reached for the cup, stopped, reached again, and all eleven trees leaned their shade against the kitchen.',
            'No.',
            'Not leaned. Entered.',
            'First the coolness came over the tiles, leaf-broken and restless; then a pear dropped somewhere inside the wall with a sound like a mouth deciding. The plaster sweetened. Ants appeared along the sink in a thin black handwriting and hurried toward a sentence she could not see.',
            'She took the cup down.',
            'Inside it, where dust should have been, noon was pouring steadily upward.',
            "She nearly laughed. The laugh came wrong, wearing a cough's coat, and for one second she was six years old again under the table while her father paced around the kitchen looking for the spectacles on his face, saying where, where, where, and each where smaller than the last until it was only air nudging air.",
            'Knock.',
            '"Come in," she said.',
            'The wall did not open. Nothing so obedient happened. Instead the kitchen lengthened quietly past its corners, past the stove, past the calendar still showing an April that had never agreed to end, and she saw him very far away at the other end of the room, or someone wearing the distance around him the way he used to wear that gray coat, one button wrong, always one button wrong, walking toward her without becoming larger.',
            'She waited.',
            'He walked.',
            'She waited so long the cut peach browned beneath her palm, summer folded itself once, twice, into the smell of rain, and the fly at the window finished its invisible seam and fell upward.',
            'He walked.',
            '"You forgot," she said, though she did not know what.',
            'The figure lifted one hand. In it was a pear, yellow as the cup, and from the pear came the warm ticking of the kitchen clock they had buried with him by mistake.',
            'No, not by mistake. There had been no clock in the coffin. She knew that. She had checked his wrists, his pockets, the little cave beneath his chin. She had checked because grief makes a customs officer of the body: declare what you are taking, open every bag, even the mouth, especially the mouth.',
            'The ticking grew louder.',
            'Tik.',
            'Tik.',
            'TIKTIKTIKTIKTIK and suddenly the room snapped back to its proper size, mean little room, knife, sink, brown peach, her hand gripping the yellow cup so hard the chip had bitten a crescent into her thumb.',
            'Outside, one pear rolled from beneath the nearest tree.',
            'It crossed the grass against the wind.',
            'Stopped.',
            'She watched from the window. Blood gathered in her palm, bright and careful. She lifted the cup to her lips.',
            'From the empty bottom, her own voice said, very small, "Where?"',
            'The pear knocked once against the wall.',
            'She turned the cup over and let noon spill out.',
            '',
        ],
    },
    {
        id: 'where-it-ends',
        title: 'where it will end',
        when: '26.09.17 11:59',
        audio: [],
        blocks: [
            "It begins where it will end: in a waking life that holds its shape too well. The days repeat with the confidence of things that have never been questioned, and the first anomalies arrive quietly, placed rather than random. A stranger speaks tomorrow's sentence today. A grief arrives a week before the phone call that will explain it. A toy lost in childhood keeps surfacing at every crossroads where a choice must be made. The waking world absorbs each contradiction the way deep water takes a stone, and nothing can be proven from inside it. Then sleep comes, and the body goes down through the usual extinction, the long dark that most nights gives back nothing at all. But some nights the far side assembles: not a dream, a pressure of meaning, a world that speaks only in symbols because symbols are all that can cross. There lucidity never arrives as the thought this is not real. It arrives as memory. The stranger, the grief, the toy were words, and suddenly the sentence can be read. For one held moment, years of waking life stand visible all at once, a single image, and the one reading it understands: this was never the world. It was the world's way of saying something.",
            'The fading mirrors the forming. The image loosens one symbol at a time, the dark takes back its own, and morning rebuilds the familiar room around the absence. What survives is not knowledge but residue: a meaning that cannot be translated, because reality never used words. The waking day resumes, the least true thing that will happen, and the anomalies begin arriving again. A stranger. An early grief. A small object at a crossroads. Only the order is wrong. They were read last night as memory, and tonight they are being placed. The cycle does not find its clues; it leaves them for itself, each lucid moment in the real world planting the signs that will wake it the next time. Which is why it begins where it will end, and why the ending never feels like one.',
        ],
    },
    {
        id: 'black-doorway',
        title: 'the black doorway',
        when: '26.09.17 11:52',
        audio: [],
        blocks: [
            'Every morning, Elias woke before the alarm and found a little more of his life already used. Coffee cooling beside a cup he had not filled. Mud on shoes he did not remember wearing. His daughter asking why he kept drawing the same black doorway, though he had no daughter and lived alone. At night he lay down hoping sleep might explain it, but sleep was only an extinction: hours of perfect darkness, then brief flashes of a place that felt less seen than remembered. A railway station flooded to the clocks. A child folding a paper bird from a photograph of Elias as an old man. Trains arriving backward, spilling passengers who mourned events that had not happened yet. Each night the fragments lasted longer. He began to notice that every clock showed the time of his morning alarm, and that the child’s paper bird carried a sentence in his own handwriting: DO NOT WAKE ME. Only then did lucidity gather around him, slowly, like a face forming beneath water. This was reality. Not a world of facts, but of symbols dense enough to contain whole lives. The flooded station was time with nowhere left to go. The child was a memory waiting for him to become its father. And the black doorway was not an exit from the dream. It was the entrance into it.',
            'He tried to remain, but understanding was what made the station collapse. The clocks drowned first, then the trains, then the child, who pressed the paper bird into his hand and whispered, “You always forget why you asked us to send you back.” Darkness closed over the answer. Elias woke before the alarm, fist clenched around nothing, grief already fading into the harmless shape of a strange dream. Years passed in the rigid daylight. He married, had a daughter, grew old, and filled notebooks with symbols he could never translate. On the morning she found him dying, his daughter unfolded the first drawing he had ever made of the black doorway. Inside it, hidden beneath layers of pencil, was a railway timetable dated the night of his death. She read the only departure aloud. Elias closed his eyes and returned to the flooded station, where the child was waiting with fresh paper. At last he remembered: waking life was not a prison he had been trying to escape. It was the symbol reality had made from his fear of dying, a dream stretched across eighty years so he could learn to enter the darkness willingly. The child handed him the photograph she was about to fold. It showed Elias as a young man, asleep beside an untouched alarm clock. On the back, in his handwriting, were the first words he would read there tomorrow: DO NOT WAKE ME.',
        ],
    },
    {
        id: 'tuesday',
        title: 'ordinary tuesday',
        when: '26.09.16 21:05',
        audio: [],
        blocks: [
            'You become lucid on an ordinary Tuesday, halfway through pouring coffee. Nothing bends or shimmers. The kitchen remains brutally solid, the burn on your thumb remains painful, and the clock continues taking seconds from you with mechanical precision. But you suddenly recognize the structure: this dependable world is the dream. Its laws are not proof that it is real, only proof that the dream is deep. You try the usual tests and fail them all. Your hands have five fingers, the text stays still, gravity refuses negotiation. Lucidity gives you no control, only the unbearable knowledge that everything around you is holding its shape because you expect it to.',
            "That night, you fall into darkness and briefly wake somewhere impossible. A woman you have never met is calling you by a name you almost remember. There is a war, or a celebration, or both, and you understand that this broken place is reality. Before you can hold onto it, consciousness goes out again. Morning returns you to the kitchen, where years may pass before the next fragment. So you begin practicing lucid dreaming while awake: not to command the false world, but to stay conscious inside it long enough to notice what leaks through. A stranger's familiar face. Grief for a life you never lived. The sense that sleep is not an escape from reality, but your brief and unreliable return to it.",
        ],
    },
    {
        id: 'rain',
        title: 'rain falling upward',
        when: '26.09.16 20:32',
        audio: [],
        blocks: [
            'You wake to the sound of rain falling upward.',
            'Drops tremble on the pavement, then lift into the violet sky, slipping through clouds shaped like open eyes. Around you, the city is almost familiar. Your apartment building stands across the street, but every window contains a different morning. In one, you are six years old. In another, you are asleep at your desk. In the highest window, an old version of you is staring down, mouthing a warning you cannot hear.',
            'You know at once that you are dreaming.',
            'The realization moves through the world like a crack through glass. The traffic lights turn blue. The buildings lean closer. Everyone on the sidewalk stops at the same time and looks directly at you.',
            'So you test the dream.',
            'You raise your hand and imagine a door.',
            'A red door appears in the middle of the street, freestanding, its brass handle warm as skin. Behind it is your bedroom. Sunlight lies across the sheets. Your phone is buzzing on the nightstand. Everything looks solid, ordinary, real.',
            'You step through and wake up. For a while, you are relieved.',
            'Then you notice the clock is breathing.',
            'Its numbers swell and shrink with each soft inhale. Outside, the rain falls normally, but every drop rises again the instant it hits the ground. Your reflection in the dark phone screen is still asleep, eyes closed, although you are holding it in your hand.',
            'A message appears from a contact with your own name: "You became lucid over here. We became lucid over there. One of us has to wake up."',
            'The room tilts.',
            "Memories begin arriving that you have never lived. You remember commuting each morning through a forest of glass trees. You remember a mother with a bird's shadow. You remember sleeping every night in the strange city and dreaming of this small bedroom, this job, these friends, this entire life. You can no longer tell which set of memories came first.",
            'You try another reality check. You count your fingers. Ten. Again. Ten.',
            'Then all ten turn toward you like compass needles, pointing at the mirror. Your reflection has opened its eyes. "Don\'t wake up," it whispers. "This is the dream we escaped into."',
            'Behind the reflection, your bedroom is gone. The violet city stretches into infinity, filled with windows showing thousands of your possible lives. In every window, another you performs the same reality check. Some are laughing. Some are crying. Some are pounding on the glass. And one of them is asleep.',
            'You reach toward the mirror, certain that touching it will wake you into the true world. But just before your fingers meet the surface, a terrible thought settles over you: what if lucid dreaming was never the act of becoming conscious inside a dream? What if it was the dream becoming conscious inside you?',
            'The mirror softens beneath your hand. From somewhere beyond it, you hear an alarm begin to ring. You cannot tell which side it is on.',
        ],
    },
];

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
const faceBySlug = (slug) => FACES.find((f) => f.slug === slug);

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
    'unarchive of the writings on the inverted dream/wake state — pieces composed live, dream and wake states trading places until the cyclical phase unfolds. twenty-one so far, newest first. some have voice excerpts. each piece ends where it ends';

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
        className: open ? 'story open' : 'story',
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
        className: open ? 'story open draft-story' : 'story draft-story',
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
/* type shelf picker: click opens the whole shelf, each name set in its own face; hovering a name
   tastes it on the page, clicking keeps it, leaving puts back what was chosen */

/* ---- type shelf picker ---------------------------------------------------
 * Opens the full shelf beside its button; hover previews, click keeps.
 */
function FacePicker({ slot, value, onPick, onTaste, open, setOpen }) {
    const listRef = reactExports.useRef(null);
    reactExports.useEffect(() => {
        if (!open) return;
        FACES.forEach((f) => void loadFace(f, false));
        const list = listRef.current;
        const widget = list?.parentElement;
        if (list && widget) {
            // keep the whole shelf on screen: centred on its button where it fits, pushed in where it doesn't
            const w = widget.getBoundingClientRect();
            const h = list.offsetHeight;
            const top = Math.max(
                12,
                Math.min(w.top + w.height / 2 - h / 2, window.innerHeight - h - 12),
            );
            list.style.top = `${top}px`;
            list.style.right = `${window.innerWidth - w.left + 10}px`;
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
                jsxRuntimeExports.jsx('div', {
                    className: 'face-list',
                    ref: listRef,
                    onMouseLeave: () => onTaste(null),
                    children: FACES.map((f) => {
                        const gap = lastKind !== '' && f.kind !== lastKind;
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
    }, [bodyFace, titleFace, taste]);
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
    const enterDraft = () => {
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
                })),
        );
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
    const addDraft = () => {
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
            },
            ...(w ?? []),
        ]);
        scrollerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const removeDraft = (id) => {
        setWork((w) => (w ?? []).filter((p) => p.id !== id));
        editRefs.current.delete(id);
    };
    const doExport = () => {
        const w = workRef.current;
        if (!w) return;
        const harvested = harvestAll(w);
        setWork(harvested);
        const payload = {
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
            pieces: harvested.map(({ id, published, versions, current }) => ({
                id,
                title: versions[current].title,
                published,
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
        };
        setOverlay({ kind: 'export', text: JSON.stringify(payload, null, 2) });
    };
    const doImport = (text) => {
        try {
            const data = JSON.parse(text);
            if (!data || !Array.isArray(data.pieces)) throw new Error('bad shape');
            const pieces = data.pieces.map((p) => {
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
                    original: !!v.original || (published && String(v.vid ?? '').endsWith('-base')),
                }));
                let current = Math.min(Math.max(0, Number(p.current) || 0), versions.length - 1);
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
            if (typeof s.textFace === 'string' && faceBySlug(s.textFace)) setBodyFace(s.textFace);
            if (typeof s.titleFace === 'string' && faceBySlug(s.titleFace))
                setTitleFace(s.titleFace);
            if (typeof s.commitment === 'boolean') setCommit(s.commitment);
            if (
                typeof s.soundEra === 'string' &&
                (s.soundEra === 'random' || ERAS.some((e) => e.id === s.soundEra))
            )
                setEraId(s.soundEra);
            setWork(pieces);
            setOverlay(null);
            setMode('draft');
        } catch {
            setOverlay((o) =>
                o ? { ...o, error: 'that doesn’t parse as a dreamwake export' } : o,
            );
        }
    };
    /* the frame's sandbox forbids downloads outright, and a blob: made here belongs to our opaque origin, so the
       helper tab builds its OWN blob from the text we hand it and links to that. the whole export is also printed
       on that page so select-all + copy works even where a browser refuses the save */
    const downloadExport = () => {
        if (!overlay) return;
        const name = `dreamwake-drafts-${nowStamp().replace(/[.: ]/g, '-')}.json`;
        // the helper tab inherits the frame's script policy, so it runs no script: plain html, a data: link, and the text itself
        const esc = (t) =>
            t
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;');
        const bytes = new TextEncoder().encode(overlay.text);
        let bin = '';
        for (let i = 0; i < bytes.length; i += 8192)
            bin += String.fromCharCode(...bytes.subarray(i, i + 8192));
        const dataUrl = `data:application/octet-stream;base64,${btoa(bin)}`;
        const html = [
            '<!doctype html><html><head><meta charset="utf-8"><title>',
            esc(name),
            '</title>',
            '<style>html,body{background:#000;color:#f4efec;margin:0;font:12px/1.5 ui-monospace,Menlo,monospace}',
            '.bar{display:flex;gap:14px;align-items:center;justify-content:center;padding:26px 0 12px}',
            'a{color:#f4efec;text-decoration:none;border:1px solid #3a3a3a;border-radius:20px;padding:9px 20px;transition:border-color .35s ease}',
            'a:hover{border-color:#f4efec}.n{color:#8a8a8a;text-align:center;margin:0 0 16px}',
            'pre{white-space:pre-wrap;word-break:break-all;color:#8a8a8a;margin:0 auto;max-width:900px;padding:0 24px 60px;user-select:all;-webkit-user-select:all}',
            '::selection{background:#dc143c;color:#000}</style></head><body>',
            '<div class="bar"><a href="',
            dataUrl,
            '" download="',
            esc(name),
            '">\u00b7 ',
            esc(name),
            ' \u00b7</a></div>',
            '<p class="n">click the name to save. if your browser won\u2019t save from here, click the text below once (it selects all), copy, and paste it into a file</p>',
            '<pre>',
            esc(overlay.text),
            '</pre></body></html>',
        ].join('');
        try {
            const pageUrl = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
            const win = window.open(pageUrl, '_blank');
            window.setTimeout(() => URL.revokeObjectURL(pageUrl), 120000);
            if (!win)
                setOverlay((o) =>
                    o ? { ...o, error: 'the browser blocked the save tab - use copy instead' } : o,
                );
        } catch {
            setOverlay((o) =>
                o ? { ...o, error: 'the browser blocked the save tab - use copy instead' } : o,
            );
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
                    mode === 'read'
                        ? jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
                              children: [
                                  PIECES.map((p) =>
                                      jsxRuntimeExports.jsx(
                                          Story,
                                          {
                                              piece: p,
                                              open: !!open[p.id],
                                              onToggle: () =>
                                                  setOpen((prev) => ({
                                                      ...prev,
                                                      [p.id]: !prev[p.id],
                                                  })),
                                          },
                                          p.id,
                                      ),
                                  ),
                                  jsxRuntimeExports.jsx(ArchiveEnd, {}),
                              ],
                          })
                        : (work ?? []).map((wp) =>
                              jsxRuntimeExports.jsx(
                                  WorkStory,
                                  {
                                      wp: wp,
                                      open: !!open[wp.id],
                                      onToggle: () =>
                                          setOpen((prev) => ({ ...prev, [wp.id]: !prev[wp.id] })),
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
                    jsxRuntimeExports.jsx('button', {
                        type: 'button',
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
                        value: bodyFace,
                        onPick: setBodyFace,
                        onTaste: (slug) => setTaste(slug ? { slot: 'body', slug } : null),
                        open: faceOpen === 'body',
                        setOpen: (o) => setFaceOpen(o ? 'body' : null),
                    }),
                    jsxRuntimeExports.jsx(FacePicker, {
                        slot: 'title',
                        value: titleFace,
                        onPick: setTitleFace,
                        onTaste: (slug) => setTaste(slug ? { slot: 'title', slug } : null),
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
                    mode === 'draft' &&
                        jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
                            children: [
                                jsxRuntimeExports.jsx('span', {
                                    className: 'controls-gap',
                                    'aria-hidden': 'true',
                                }),
                                jsxRuntimeExports.jsx('button', {
                                    type: 'button',
                                    'aria-label': 'new piece',
                                    'data-tip': 'new piece',
                                    onClick: addDraft,
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
                            ],
                        }),
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
