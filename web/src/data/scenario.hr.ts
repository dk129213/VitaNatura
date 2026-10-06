// Hrvatska verzija demo scenarija. Isti oblik kao scenario.ts (provjerava se u useScenario.ts).
// Koordinate i brojke dijele se s engleskom verzijom.
import type { ClinicMatch, TransportOption, FarmMatch } from "./scenario";

export { pileGate, apartment, airport, recoveryDays } from "./scenario";
export type { ClinicMatch, TransportOption, RecoveryDay, FarmMatch } from "./scenario";

export const persona = {
  name: "Marta",
  initial: "M",
  age: 54,
  role: "Profesorica biologije iz Beča. Djeca su otišla od kuće, pa su ona i Thomas rezervirali aktivni i zdravstveni tjedan u Dubrovniku",
};

export const incident = {
  place: "Dubrovačke gradske zidine, kod tvrđave Minčeta",
  date: "4. listopada 2026.",
  lat: 42.6421,
  lon: 18.1083,
};

// ---------- Modul 6: pomoć na putu ----------
export const emergencyNumbers = [
  { number: "112", label: "Sve hitne situacije", note: "Radi u cijelom EU, besplatno s bilo kojeg telefona" },
  { number: "194", label: "Hitna medicinska pomoć", note: "Hitna služba u Hrvatskoj" },
];

export const healthPassport = {
  allergies: ["Penicilin"],
  medication: ["Levotiroksin 75 mcg, svako jutro"],
  conditions: ["Hipotireoza, dobro regulirana"],
  bloodType: "A+",
  contact: "Thomas (suprug), dijeljeno uz pristanak",
};

// ---------- Modul 1: gdje obaviti operaciju ----------
export const clinicMatches: ClinicMatch[] = [
  {
    osmId: "w428336702",
    name: "Opća bolnica Dubrovnik",
    address: "Ulica dr. Ante Šercera 2, Dubrovnik",
    match: 93,
    kind: "public",
    reasons: [
      "Hitni prijem i ortopedska kirurgija na istom mjestu",
      "EHIC kartica pokriva nužno liječenje pod istim uvjetima kao za domaće",
      "Oko 1 km od partnerskog hotela u Lapadu",
    ],
  },
  {
    name: "Klinika za traumatologiju, Zagreb",
    address: "Draškovićeva ulica 19, Zagreb",
    match: 71,
    kind: "public",
    reasons: ["Specijalizirana klinika za traumatologiju i ortopediju"],
    caution: "Prije operacije treba letjeti s nestabilnim prijelomom",
  },
  {
    name: "Operacija kod kuće u Beču",
    address: "Martina lokalna bolnica",
    match: 58,
    kind: "public",
    reasons: ["Blizu obitelji i njezinog liječnika"],
    caution: "1.100 km puta prije nego što je prijelom zbrinut. Dubrovački tim to ne preporučuje",
  },
];

export const stayOption = {
  title: "Prilagođena soba u prizemlju partnerskog hotela, Lapad",
  tag: "primjer partnera",
  reason:
    "Marta i Thomas već odsjedaju u našem partnerskom hotelu u Lapadu, ali do njihove sobe vode stepenice. Po ugovoru hotel drži nekoliko prilagođenih soba slobodnima, pa se samo presele u prizemlje i ostaju na istom mjestu, s istim osobljem i grijanim bazenom za kasnije.",
  features: ["Prizemlje, ulaz bez stepenica", "Tuš bez rubova sa sjedalicom", "Oko 1 km od bolnice", "Grijani unutarnji bazen, od 3. tjedna uz odobrenje"],
};

// ---------- Modul 2: svaki prijevoz bez stepenica ----------
export const arrangedMoves = [
  {
    date: "4. lis.",
    title: "Od zidina do Vrata od Pila",
    detail: "Stari grad je zatvoren za automobile. Osoblje zidina donosi stolicu za nošenje, hitna čeka kod Vrata od Pila.",
  },
  {
    date: "8. lis.",
    title: "Iz bolnice u partnerski hotel u Lapadu",
    detail: "Prilagođeni taksi s rampom, oko 5 minuta. Invalidska kolica posuđena iz bolnice.",
  },
  {
    date: "2. stu.",
    title: "Iz Lapada u Kalos, Vela Luka",
    detail: "Prilagođeni kombi preko Pelješkog mosta i trajektom na Korčulu. Noga ostaje podignuta.",
  },
];

export const transportOptions: TransportOption[] = [
  {
    id: "flight",
    title: "Let Dubrovnik - Beč s asistencijom (WCHS)",
    verdict: "recommended",
    duration: "oko 1 h 30 min leta, 4 h od vrata do vrata",
    priceNote: "Primjer cijene, raspored nije uživo",
    summary:
      "Uredba EU 1107/2006 jamči besplatnu asistenciju u obje zračne luke ako se zatraži najmanje 48 sati prije leta.",
    checks: [
      { ok: true, text: "Invalidska kolica od prijave do sjedala, i u Beču (WCHS)" },
      { ok: true, text: "Medicinski obrazac (MEDIF) pripremljen, potpisuje ga kirurg" },
      { ok: true, text: "Zatraženo sjedalo u prvom redu s više mjesta za noge" },
      { ok: true, text: "Prilagođeni taksi do zračne luke, oko 25 minuta" },
    ],
  },
  {
    id: "car",
    title: "Prilagođeni automobil, od vrata do vrata",
    verdict: "possible",
    duration: "oko 11 h, 1.100 km, najbolje u dva dana",
    priceNote: "Primjer cijene partnera na upit",
    summary: "Bez presjedanja, ali vrlo dugo sjedenje nakon operacije i noćenje usput.",
    checks: [
      { ok: true, text: "Bez presjedanja između vozila" },
      { ok: false, text: "Dugo sjedenje nakon operacije povećava rizik od ugrušaka" },
      { ok: false, text: "Za noćenje treba hotel bez stepenica" },
    ],
  },
  {
    id: "bus",
    title: "Međugradski autobus",
    verdict: "not-suitable",
    duration: "noćna vožnja, s presjedanjima",
    priceNote: "Ne nudi se za ovaj profil",
    summary: "Asistencija se mora tražiti 36 sati ranije (Uredba EU 181/2011), a noga ne može ostati podignuta.",
    checks: [
      { ok: false, text: "Stepenice na ulazu, za ukrcaj treba dizalo koje linija možda nema" },
      { ok: false, text: "Nema mjesta za podignutu nogu" },
    ],
  },
  {
    id: "train",
    title: "Vlak",
    verdict: "not-suitable",
    duration: "nije dostupno",
    priceNote: "Dubrovnik nema željeznicu",
    summary: "Dubrovnik nema željezničku stanicu, pa svako putovanje vlakom počinje dugim prijevozom cestom.",
    checks: [{ ok: false, text: "Nema izravne željezničke veze" }],
  },
];

export const routeSegments = [
  { time: "08:30", to: "Prilagođeni taksi iz partnerskog hotela u Lapadu", mode: "Rampa, kolica ostaju s njom", risk: null },
  { time: "09:00", to: "Šalter za asistenciju, Zračna luka Dubrovnik", mode: "Kolicima do izlaza i do sjedala", risk: null },
  { time: "10:40 - 12:15", to: "Let za Beč", mode: "Sjedalo u prvom redu, noga podignuta na osloncu", risk: "Sjedalo u prvom redu još čeka potvrdu zrakoplovne tvrtke" },
  { time: "12:30", to: "Zračna luka Beč, dočekuju je na vratima zrakoplova", mode: "Asistencija do dolaznog terminala, Thomas čeka s autom", risk: null },
];

// ---------- Modul 3: oporavak nakon operacije ----------
export const doctorSummaries: Record<number, string> = {
  6: "6. dan nakon ORIF-a desnog gležnja. Puls u mirovanju 81/min, 12 iznad osobne osnovice, uz manju aktivnost i bol 6/10. Na fotografiji rane blago crvenilo uz donji rub, bez iscjetka. Bez temperature. Predlaže se telefonska provjera danas i pregled rane na sljedećoj kontroli.",
  10: "10. dan nakon ORIF-a desnog gležnja. Puls u mirovanju vratio se na osnovicu (67/min), san 7,1 h, bol 2/10. Rana mirna na dnevnim fotografijama. Pacijentica se pridržava uputa bez opterećenja noge. Vađenje šavova planirano 14. dan.",
};

export const recoveryPhases = [
  { fromDay: 1, title: "Mirovanje i podignuta noga", detail: "Vježbe u sjedećem položaju za zdravu nogu i gornji dio tijela, 3 puta dnevno.", unlocked: true },
  { fromDay: 3, title: "Kratke šetnje sa štakama", detail: "U hotelu i njegovom vrtu, bez opterećenja desne noge.", unlocked: true },
  { fromDay: 14, title: "Grijani hotelski bazen i hidroterapija", detail: "U partnerskom hotelu, nakon vađenja šavova i uz odobrenje kirurga.", unlocked: false },
  { fromDay: 21, title: "Šetnica u Lapadu", detail: "Ravna šetnica uz more, prvo u kolicima, zatim sa štakama.", unlocked: false },
  { fromDay: 42, title: "Staze u prirodi", detail: "Ravne otočne staze, s djelomičnim opterećenjem ako je odobreno.", unlocked: false },
];

// ---------- Modul 4: rehabilitacija i priroda ----------
export const wellnessPlace = {
  name: "Kalos, Vela Luka",
  island: "Otok Korčula",
  image: "/img/vela-luka.jpg",
  summary:
    "Javna specijalna bolnica za medicinsku rehabilitaciju uz more, poznata po bazenima s morskom vodom i ljekovitom blatu. Mirna od listopada do svibnja.",
  lat: 42.9682,
  lon: 16.7129,
};

export const wellnessProgram = [
  { day: "1. dan", items: ["Dolazak prilagođenim kombijem, smještaj u prizemlju", "Fizioterapijska procjena"] },
  { day: "2. - 5. dan", items: ["Bazen s morskom vodom, 30 min", "Vježbe hoda sa štakama", "Odmor poslijepodne"] },
  { day: "6. dan", items: ["Vođena šetnja obalnom stazom, 40 min", "Savjetovanje o prehrani: proteini i vitamin D za zacjeljivanje kosti"] },
  { day: "7. - 12. dan", items: ["Vježbe s djelomičnim opterećenjem, uz odobrenje", "Blato za gležanj", "Po želji: večernje predavanje o zaštićenim područjima otoka"] },
  { day: "13. - 14. dan", items: ["Izvješće prije i poslije: san, bol, broj koraka", "Plan vježbi za kod kuće u Beču"] },
];

export const trails = [
  {
    name: "Šetnica u Lapadu",
    park: "Dubrovnik",
    image: "/img/lapad.jpg",
    surface: "Popločana šetnica uz more bez automobila",
    length: "oko 1,5 km",
    slope: "Ravno",
    fit: "Od 3. tjedna, prvo kolicima, zatim sa štakama",
    crowd: "Mirno ujutro izvan ljeta",
  },
  {
    name: "Botanički vrt na Lokrumu",
    park: "Rezervat Lokrum",
    image: "/img/lokrum.jpg",
    surface: "Šljunčane i kamene staze",
    length: "kružna staza 1 km",
    slope: "Uglavnom ravno",
    fit: "Od 6. tjedna, brodom iz gradske luke",
    crowd: "Najbolje u dane bez kruzera u luci",
  },
  {
    name: "Cesta uz Veliko jezero",
    park: "Nacionalni park Mljet",
    image: "/img/mljet-lake-road.jpg",
    surface: "Asfaltirana cesta uz jezero",
    length: "2 km u jednom smjeru i natrag",
    slope: "Ravno",
    fit: "Od 8. tjedna, uz odobrenje kirurga",
    crowd: "U studenom gotovo prazno",
  },
];

export const otherRehab = [
  { name: "Thalassotherapia Opatija", image: "/img/thalasso-opatija.jpg", text: "Bolnica za rehabilitaciju uz more na Kvarneru" },
  { name: "Istarske Toplice", image: "/img/spa.jpg", text: "Termalno lječilište u zelenoj dolini u Istri" },
  { name: "Varaždinske Toplice", image: "/img/varazdinske-toplice.jpg", text: "Rehabilitacija termalnom vodom sjeverno od Zagreba" },
];

// ---------- Modul 5: izleti bez gužvi ----------
export const harvestCalendar = [
  { months: "Sij - Ožu", what: "Rezidba maslina i loze, zimski boravak na selu, ptice selice", where: "Konavle, Pelješac, delta Neretve" },
  { months: "Tra - Lip", what: "Cvatnja, šetnje otocima prije sezone", where: "Konavle, Mljet, Elafiti" },
  { months: "Lip - Ruj", what: "Čišćenje mora s Green Sea Safari, smokve i lavanda na otocima", where: "Elafiti, Korčula, Mljet" },
  { months: "Ruj - Lis", what: "Berba grožđa i rad u vinariji", where: "Pelješac, Konavle" },
  { months: "Lis - Pro", what: "Berba mandarina, branje maslina i prešanje u uljari", where: "Dolina Neretve, Pelješac, Korčula" },
];

// Obiteljska poljoprivredna gospodarstva (OPG) su primjeri za demo.
export const farmMatches: FarmMatch[] = [
  {
    name: "OPG Matić, uljara",
    region: "Ston, Pelješac",
    image: "/img/olives.jpg",
    activity: "Gledanje prešanja, kušanje mladog ulja, ručak s obitelji",
    effort: "low",
    accessible: true,
    languages: "hrvatski, engleski, njemački",
    when: "Studeni, uljara radi svaki dan",
    note: "Pod uljare bez stepenica, posvuda mjesta za sjesti. Branje nije obavezno.",
  },
  {
    name: "OPG Bralić",
    region: "Pelješac",
    image: "/img/grapes.jpg",
    activity: "Jutro berbe grožđa i obilazak podruma",
    effort: "medium",
    accessible: false,
    languages: "hrvatski, engleski",
    when: "Kraj rujna, ovisno o vremenu",
    note: "Vinograd na terasama, neravan teren.",
  },
  {
    name: "OPG Vukelić",
    region: "Dolina Neretve",
    image: "/img/mandarins.jpg",
    activity: "Branje mandarina i vožnja lađom kroz deltu",
    effort: "medium",
    accessible: false,
    languages: "hrvatski, engleski, talijanski",
    when: "Listopad do prosinca",
    note: "Za ulazak u tradicionalnu lađu treba malo ravnoteže.",
  },
];
