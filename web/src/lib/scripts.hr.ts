import type { Script } from "./scripts";

// Hrvatska verzija skriptiranih razgovora. Isti čvorovi i isti tijek kao scripts.ts.

export const intakeScript: Script = {
  start: {
    id: "start",
    bot: [
      "Bok, ja sam Vita. Vi putujete, mi brinemo: organiziram pomoć, prijevoz i smještaj da vi ne morate nikoga zvati.",
      "Recite mi što se dogodilo, na bilo kojem jeziku.",
    ],
    replies: [
      {
        label: "Poskliznula sam se na stepenicama gradskih zidina u Dubrovniku. Desni gležanj mi je natečen i ne mogu stati na nogu.",
        next: "safety",
        patch: {
          situation: "Poskliznula se na stepenicama gradskih zidina, desni gležanj natečen, ne može stati na nogu",
          location: "Stari grad Dubrovnik",
        },
      },
    ],
    freeTextNext: "safety",
    freeTextPatch: (t) => ({ situation: t, location: "Stari grad Dubrovnik" }),
  },
  safety: {
    id: "safety",
    bot: [
      "Žao mi je, to zvuči bolno. Prvo brza sigurnosna provjera.",
      "Krvarite li jako, vidi li se kost, jesu li prsti utrnuli ili hladni, ili ste sami?",
    ],
    replies: [
      { label: "Ne, suprug je sa mnom", next: "er", patch: { companion: "Suprug" } },
      { label: "Da, nešto od toga", next: "call112", tone: "danger" },
    ],
  },
  call112: {
    id: "call112",
    bot: [
      "Molim vas, odmah nazovite 112. Recite im da ste na gradskim zidinama kod tvrđave Minčeta. Vašu lokaciju dijelim na zaslonu poziva.",
      "Držite nogu mirno. Hitna će vas čekati kod Vrata od Pila, jer automobili ne mogu ući u Stari grad.",
    ],
    replies: [{ label: "U redu, pomoć dolazi", next: "later", patch: { companion: "Suprug, hitna od Vrata od Pila" } }],
  },
  er: {
    id: "er",
    bot: [
      "Hvala. Ako ne možete stati na nogu, to treba snimiti danas, a ne rješavati u ljekarni.",
      "Stari grad je bez automobila i pun stepenica, pa sam zamolila osoblje zidina za stolicu za nošenje do Vrata od Pila. Odande je Opća bolnica Dubrovnik oko 6 minuta autom.",
      "Da naručim hitnu ili taksi do Vrata od Pila?",
    ],
    replies: [
      { label: "Taksi je u redu", next: "later", patch: { companion: "Suprug, taksi od Vrata od Pila" } },
      { label: "Hitnu, molim", next: "later", patch: { companion: "Suprug, hitna od Vrata od Pila" } },
    ],
  },
  later: {
    id: "later",
    bot: [
      "Gotovo. Vašu zdravstvenu putovnicu poslala sam hitnom prijemu na hrvatskom: alergija na penicilin i lijekovi koje redovito uzimate.",
      "Europska kartica zdravstvenog osiguranja pokriva nužnu skrb u javnim bolnicama ovdje, pod istim uvjetima kao za domaće.",
    ],
    replies: [
      {
        label: "Rendgen pokazuje prijelom gležnja. Žele operirati u sljedećih nekoliko dana. Živimo u Beču. Mogu li to obaviti ovdje?",
        next: "decide",
        patch: {
          injury: "Prijelom desnog gležnja, imobiliziran u Općoj bolnici Dubrovnik. Operacija preporučena u nekoliko dana",
          destination: "Operacija u Dubrovniku, zatim kući u Beč",
          goal: "Operacija i oporavak u Hrvatskoj, let kući kad liječnik odobri",
        },
      },
    ],
  },
  decide: {
    id: "decide",
    bot: [
      "Da. Letjeti 1.100 km s nestabilnim prijelomom nije idealno, pa tim predlaže operaciju ovdje. Usporedit ću mogućnosti i planirati oporavak oko toga.",
      "Dva pitanja o kretanju. Smijete li uopće opteretiti desnu nogu?",
    ],
    replies: [
      { label: "Ne, nikako", next: "stairs", patch: { weightBearing: "Bez opterećenja desne noge" } },
      { label: "Malo, sa štakama", next: "stairs", patch: { weightBearing: "Djelomično, sa štakama" } },
    ],
  },
  stairs: {
    id: "stairs",
    bot: ["Možete li svladati stepenice, na primjer u autobus ili do hotelske sobe?"],
    replies: [
      { label: "Ne", next: "health", patch: { stairs: "Ne može svladati stepenice", mobilityCode: "WCHS" } },
      { label: "Nekoliko, polako", next: "health", patch: { stairs: "Nekoliko stepenica uz pomoć", mobilityCode: "WCHR" } },
    ],
  },
  health: {
    id: "health",
    bot: ["Još samo jedno. Imate li bolesti, alergije ili lijekove koje liječnici trebaju znati?"],
    replies: [
      {
        label: "Hipotireoza, uzimam levotiroksin. I alergična sam na penicilin.",
        next: "done",
        patch: {
          conditions: "Hipotireoza",
          allergies: "Penicilin",
          medication: "Levotiroksin 75 mcg",
        },
      },
    ],
  },
  done: {
    id: "done",
    bot: [
      "Hvala, Marta. Vaš profil je spreman i koristit će ga svaki dio putovanja.",
      "Vaša oznaka pokretljivosti za zrakoplovne tvrtke je WCHS: možete se kretati na kratke udaljenosti uz pomoć, ali ne po stepenicama. Partnerski hotel u Lapadu drži prilagođenu sobu u prizemlju slobodnom upravo za ovakve slučajeve, pa vi i Thomas možete ostati gdje jeste.",
      "Plan pokriva operaciju, prijevoze, oporavak, rehabilitaciju uz more i let kući. Ostatak vašeg aktivnog tjedna (Ston, kanu safari na Neretvi) čuva se za kad se vratite.",
    ],
    replies: [],
    end: { label: "Pogledaj moj plan", href: "/journey" },
  },
};

export const triageScript: Script = {
  start: {
    id: "start",
    bot: ["Opišite što osjećate, na bilo kojem jeziku. Uputit ću vas na pravu vrstu pomoći."],
    replies: [
      { label: "Iskrenula sam gležanj na zidinama. Jako je natečen, ne mogu stati na nogu.", next: "q1" },
      { label: "Jake opekline od sunca i glavobolja", next: "pharmacy" },
      { label: "Bol u prsima i nedostaje mi zraka", next: "emergency", tone: "danger" },
    ],
    freeTextNext: "q1",
  },
  q1: {
    id: "q1",
    bot: ["Možete li micati prstima i jesu li topli?"],
    replies: [
      { label: "Da, u redu su", next: "er" },
      { label: "Ne, utrnuli su ili hladni", next: "emergency", tone: "danger" },
    ],
  },
  er: {
    id: "er",
    bot: [
      "Preporuka: hitni prijem danas.",
      "Ako nakon pada ne možete stati na nogu, to je čest razlog za rendgen. Najbliže: Opća bolnica Dubrovnik, oko 6 minuta od Vrata od Pila. Držite gležanj podignut i hladan.",
      "Ovo je smjernica, ne dijagnoza. Ako bol jako poraste ili prsti utrnu, nazovite 112.",
    ],
    replies: [],
  },
  pharmacy: {
    id: "pharmacy",
    bot: [
      "Preporuka: ljekarna. Jedna je na Stradunu, u Starom gradu. Ljekarnik može pomoći s njegom nakon sunca i lijekom protiv bolova.",
      "Ako dobijete visoku temperaturu, smetenost ili povraćate, idite u turističku ambulantu ili na hitni prijem.",
    ],
    replies: [],
  },
  emergency: {
    id: "emergency",
    bot: ["Odmah nazovite 112. Ovo treba hitnu pomoć. Vaša lokacija je podijeljena na zaslonu poziva."],
    replies: [],
  },
};

export const checkinScript: Script = {
  start: {
    id: "start",
    bot: ["Dobro jutro, Marta. Kako ste danas? Koliko je jaka bol, od 1 do 10?"],
    replies: [
      { label: "Oko 6, gore nego jučer", next: "worse" },
      { label: "3, sve je bolje", next: "better" },
    ],
  },
  worse: {
    id: "worse",
    bot: ["Hvala što ste rekli. Je li koža oko rane toplija ili crvenija nego jučer? Imate li temperaturu?"],
    replies: [{ label: "Malo crvenija pri dnu. Bez temperature.", next: "flag" }],
  },
  flag: {
    id: "flag",
    bot: [
      "Današnji dan označila sam žutom i poslala kratki sažetak timu dr. Horvata u bolnici, s jutrošnjom fotografijom rane.",
      "Obično odgovore unutar 2 sata. Ako temperatura prijeđe 38 °C ili se crvenilo širi, nazovite kliniku ili 112.",
    ],
    replies: [],
  },
  better: {
    id: "better",
    bot: ["Dobar napredak. Kratka šetnja po hotelskom vrtu danas je otključana. Poslije držite nogu podignutu."],
    replies: [],
  },
};
