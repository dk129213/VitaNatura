// Demo scenario for the hackathon pitch.
// Places marked `real` come from OpenStreetMap (see osm-facilities.json).
// Anything marked `sample` is invented for the demo and must not be read as a live offer.

export const persona = {
  name: "Marta",
  initial: "M",
  age: 54,
  role: "Biology professor from Zagreb",
  photo: "/img/paklenica.jpg",
};

export const incident = {
  place: "Velika Paklenica canyon trail, Paklenica National Park",
  lat: 44.3005,
  lon: 15.4725,
  date: "2 October 2026",
};

// ---------- Module 6: help near the incident ----------
export const emergencyNumbers = [
  { number: "112", label: "All emergencies", note: "Works across the EU, free from any phone" },
  { number: "194", label: "Ambulance in Croatia", note: "Emergency medical service" },
];

export const healthPassport = {
  allergies: ["Penicillin"],
  medication: ["Levothyroxine 75 mcg, every morning"],
  conditions: ["Hypothyroidism, well controlled"],
  bloodType: "A+",
  contact: "Ivan (husband), shared with consent",
};

// ---------- Module 2: accessible transport Zadar -> Zagreb ----------
export type TransportOption = {
  id: string;
  title: string;
  verdict: "recommended" | "possible" | "not-suitable";
  duration: string;
  priceNote: string;
  summary: string;
  checks: { ok: boolean; text: string }[];
};

export const transportOptions: TransportOption[] = [
  {
    id: "van",
    title: "Adapted van with ramp, door to door",
    verdict: "recommended",
    duration: "about 3 h 15 min, 285 km via A1",
    priceNote: "Sample partner price: 340 EUR",
    summary:
      "Leg stays elevated on a reclining seat, wheelchair rolls in on the ramp, no transfers on the way.",
    checks: [
      { ok: true, text: "Ramp and wheelchair restraint (verified partner)" },
      { ok: true, text: "Reclining seat with leg rest" },
      { ok: true, text: "Can leave the hospital tomorrow at 09:00" },
      { ok: true, text: "Stops every 90 minutes for circulation" },
    ],
  },
  {
    id: "medical",
    title: "Medical transport (ambulance vehicle)",
    verdict: "possible",
    duration: "about 3 h 30 min",
    priceNote: "Covered only with a hospital referral",
    summary:
      "Possible if the treating doctor finds it medically necessary. The hospital arranges it, timing is less flexible.",
    checks: [
      { ok: true, text: "Stretcher or seated transport" },
      { ok: false, text: "Needs a referral from the treating doctor" },
      { ok: false, text: "Departure time set by the hospital" },
    ],
  },
  {
    id: "flight",
    title: "Flight Zadar to Zagreb with assistance (WCHS)",
    verdict: "possible",
    duration: "45 min flight, about 4 h door to door",
    priceNote: "Sample fare, schedule not live",
    summary:
      "EU Regulation 1107/2006 gives free assistance, guaranteed when requested at least 48 hours before the flight.",
    checks: [
      { ok: true, text: "WCHS: cannot manage aircraft steps, assistance to the seat" },
      { ok: false, text: "48 h notice: earliest guaranteed assistance is 4 October" },
      { ok: false, text: "Leg cannot stay elevated in an economy seat" },
      { ok: false, text: "Two extra transfers (car to airport, airport to clinic)" },
    ],
  },
  {
    id: "bus",
    title: "Intercity coach",
    verdict: "not-suitable",
    duration: "about 3 h 30 min",
    priceNote: "Not offered for this profile",
    summary:
      "Assistance must be requested 36 hours ahead (EU Regulation 181/2011), and the leg cannot stay elevated.",
    checks: [
      { ok: false, text: "Steps at the door, boarding needs a lift the route may not have" },
      { ok: false, text: "No space to keep the leg elevated" },
    ],
  },
];

export const routeSegments = [
  { from: "Opća bolnica Zadar", to: "Van pick-up at the hospital entrance", mode: "Wheelchair, staff assisted", time: "08:45", risk: null },
  { from: "Zadar", to: "A1 rest area in Lika", mode: "Adapted van", time: "09:00 - 10:35", risk: null },
  { from: "Lika", to: "A1 rest area near Karlovac", mode: "Adapted van", time: "10:50 - 11:40", risk: "Accessible toilet reported by users, not yet verified" },
  { from: "A1", to: "Step-free apartment, Martićeva ulica (sample)", mode: "Adapted van", time: "12:20", risk: null },
];

// ---------- Module 1: clinic and plan in Zagreb ----------
export type ClinicMatch = {
  osmId: string;
  name: string;
  address: string;
  match: number; // demo score
  reasons: string[];
  caution?: string;
  kind: "public" | "private";
};

export const clinicMatches: ClinicMatch[] = [
  {
    osmId: "w171840875",
    name: "Klinika za traumatologiju",
    address: "Draškovićeva ulica 19, Zagreb",
    match: 94,
    kind: "public",
    reasons: [
      "Dedicated trauma and orthopaedic surgery clinic",
      "Emergency department, step-free entrance (OSM: wheelchair=yes)",
      "About 400 m from the step-free apartment",
    ],
  },
  {
    osmId: "w78326996",
    name: "Klinička bolnica Dubrava",
    address: "Avenija Gojka Šuška 6, Zagreb",
    match: 81,
    kind: "public",
    reasons: ["Emergency department", "Large orthopaedics and traumatology department"],
    caution: "4.4 km from the apartment, longer trips for check-ups",
  },
  {
    osmId: "w29273986",
    name: "Klinička bolnica Sveti Duh",
    address: "Sveti Duh 64, Zagreb",
    match: 76,
    kind: "public",
    reasons: ["Emergency department", "Close to Marta's own home in Trešnjevka"],
    caution: "OSM marks wheelchair access as limited",
  },
  {
    osmId: "w1253297761",
    name: "Akromion",
    address: "Ulica Savezne Republike Njemačke 5, Zagreb",
    match: 68,
    kind: "private",
    reasons: ["Private orthopaedic specialist practice", "Short waiting times"],
    caution: "Private, self-paid unless covered by supplementary insurance",
  },
];

export const stayOption = {
  title: "Step-free apartment, Martićeva ulica",
  tag: "sample listing",
  reason:
    "Marta's own flat is on the 3rd floor with no lift. For the first 3 weeks she needs a lift or ground floor, a walk-in shower and a quiet street.",
  features: ["Ground floor, no steps", "Walk-in shower with seat", "About 400 m from the clinic", "Quiet courtyard side"],
};

// ---------- Module 3: recovery after surgery ----------
// Day 0 = surgery. Values are a scripted demo series.
export type RecoveryDay = {
  day: number;
  restingHr: number;
  sleepH: number;
  steps: number;
  pain: number; // 1-10 from the daily check-in
  wound: "calm" | "watch" | "review";
  risk: "green" | "yellow" | "red";
};

export const recoveryDays: RecoveryDay[] = [
  { day: 1, restingHr: 74, sleepH: 5.1, steps: 310, pain: 6, wound: "calm", risk: "green" },
  { day: 2, restingHr: 72, sleepH: 5.9, steps: 420, pain: 5, wound: "calm", risk: "green" },
  { day: 3, restingHr: 70, sleepH: 6.4, steps: 610, pain: 4, wound: "calm", risk: "green" },
  { day: 4, restingHr: 69, sleepH: 6.8, steps: 780, pain: 4, wound: "calm", risk: "green" },
  { day: 5, restingHr: 76, sleepH: 6.1, steps: 540, pain: 5, wound: "watch", risk: "yellow" },
  { day: 6, restingHr: 81, sleepH: 5.4, steps: 390, pain: 6, wound: "watch", risk: "yellow" },
  { day: 7, restingHr: 74, sleepH: 6.6, steps: 720, pain: 4, wound: "calm", risk: "green" },
  { day: 8, restingHr: 70, sleepH: 7.0, steps: 950, pain: 3, wound: "calm", risk: "green" },
  { day: 9, restingHr: 68, sleepH: 7.2, steps: 1120, pain: 3, wound: "calm", risk: "green" },
  { day: 10, restingHr: 67, sleepH: 7.1, steps: 1260, pain: 2, wound: "calm", risk: "green" },
];

export const doctorSummaries: Record<number, string> = {
  6: "Day 6 after ORIF of the right ankle. Resting heart rate 81 bpm, 12 above her personal baseline, with lower activity and pain 6/10. Wound photo shows mild redness at the lower edge, no discharge reported. No fever reported. Suggest a phone check today and wound review at the next visit.",
  10: "Day 10 after ORIF of the right ankle. Resting heart rate back to baseline (67 bpm), sleep 7.1 h, pain 2/10. Wound calm on daily photos. Patient follows non-weight-bearing instructions. Stitch removal planned for day 14 as scheduled.",
};

export const recoveryPhases = [
  { fromDay: 1, title: "Rest and elevation", detail: "Seated exercises for the healthy leg and upper body, 3 times a day.", unlocked: true },
  { fromDay: 3, title: "Short walks on crutches", detail: "Inside the apartment and courtyard, no weight on the right leg.", unlocked: true },
  { fromDay: 14, title: "Thermal pool and hydrotherapy", detail: "After stitch removal and the surgeon's approval.", unlocked: false },
  { fromDay: 42, title: "Flat nature trails", detail: "Boardwalks and paved forest paths, with partial weight bearing if approved.", unlocked: false },
];

// ---------- Module 4: wellness and nature ----------
export const wellnessPlace = {
  name: "Varaždinske Toplice",
  lat: 46.2097,
  lon: 16.4216,
  image: "/img/varazdinske-toplice.jpg",
  summary:
    "A spa town with a long tradition of thermal-water rehabilitation, 80 km from Zagreb. Quiet from October to May.",
};

export const wellnessProgram = [
  { day: "Day 1", items: ["Arrival by adapted van, check-in on the ground floor", "Physiotherapy assessment"] },
  { day: "Day 2-5", items: ["Hydrotherapy in the thermal pool, 30 min", "Gait training with crutches", "Rest in the afternoon"] },
  { day: "Day 6", items: ["Guided forest bathing walk on a paved path, 40 min", "Nutrition session: protein and vitamin D for bone healing"] },
  { day: "Day 7-12", items: ["Partial weight-bearing exercises, as approved", "Thermal pool", "Optional: evening talk on Croatian protected areas"] },
  { day: "Day 13-14", items: ["Before and after report: sleep, pain, step count", "Plan for home exercises"] },
];

export const trails = [
  {
    name: "Kopački rit boardwalk",
    park: "Kopački rit Nature Park",
    image: "/img/kopacki-boardwalk.jpg",
    surface: "Wooden boardwalk with railings",
    length: "about 2 km loop",
    slope: "Flat",
    fit: "From week 6 with the surgeon's approval",
    crowd: "Quiet on weekday mornings in October",
  },
  {
    name: "Medvednica forest road",
    park: "Medvednica Nature Park, Zagreb",
    image: "/img/medvednica-forest.jpg",
    surface: "Paved forest road",
    length: "1.5 km out and back",
    slope: "Gentle, up to 5 %",
    fit: "From week 8, crutches or a walking frame",
    crowd: "Busy on Sunday afternoons, quiet on weekdays",
  },
  {
    name: "Učka forest path",
    park: "Učka Nature Park",
    image: "/img/ucka-forest.jpg",
    surface: "Compacted gravel",
    length: "3 km",
    slope: "Moderate",
    fit: "Later stage, full weight bearing",
    crowd: "Quiet outside summer",
  },
];

// ---------- Module 5: crowd-free experiences ----------
export const harvestCalendar = [
  { months: "Jan - Mar", what: "Pruning olives and vines, winter village stays, migrating birds", where: "Dalmatia, Istria, Kopački rit" },
  { months: "Apr - Jun", what: "Blossom season, planting gardens, protected areas before the season", where: "Istria, Konavle, Učka" },
  { months: "Jul - Aug", what: "Lavender, figs, mountains and islands off the main routes", where: "Hvar, Velebit, Lastovo" },
  { months: "Sep - Oct", what: "Grape harvest, working in a winery", where: "Pelješac, Slavonia, Istria" },
  { months: "Oct - Dec", what: "Olive and mandarin harvest, pressing at the oil mill", where: "Neretva valley, Dalmatia, Istria" },
];

export type FarmMatch = {
  name: string;
  region: string;
  activity: string;
  effort: "low" | "medium" | "high";
  accessible: boolean;
  languages: string;
  when: string;
  note: string;
};

// Family farms (OPG) are sample entries for the demo.
export const farmMatches: FarmMatch[] = [
  {
    name: "OPG Matić, olive mill",
    region: "Kaštela, Dalmatia",
    activity: "Watch the pressing, taste the new oil, lunch with the family",
    effort: "low",
    accessible: true,
    languages: "Croatian, English, German",
    when: "November, mill open daily",
    note: "Step-free mill floor, seating throughout. Picking can be skipped.",
  },
  {
    name: "OPG Bralić",
    region: "Pelješac",
    activity: "Grape harvest morning and cellar tour",
    effort: "medium",
    accessible: false,
    languages: "Croatian, English",
    when: "Late September, depends on the weather",
    note: "Terraced vineyard, uneven ground.",
  },
  {
    name: "OPG Vukelić",
    region: "Neretva valley",
    activity: "Mandarin picking and boat trip through the delta",
    effort: "medium",
    accessible: false,
    languages: "Croatian, English, Italian",
    when: "October to December",
    note: "Boarding a traditional boat needs some balance.",
  },
];
