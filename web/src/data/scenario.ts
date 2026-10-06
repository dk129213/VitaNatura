// Demo scenario for the hackathon pitch, set in the Dubrovnik region.
// Places marked `real` come from OpenStreetMap (see osm-facilities.json).
// Anything marked `sample` is invented for the demo and must not be read as a live offer.

export const persona = {
  name: "Marta",
  initial: "M",
  age: 54,
  role: "Biology teacher from Vienna. Her children have left home, so she and Thomas booked an active and health week in Dubrovnik",
};

export const incident = {
  place: "Dubrovnik City Walls, near the Minčeta tower",
  lat: 42.6421,
  lon: 18.1083,
  date: "4 October 2026",
};

// The Old Town is car-free: ambulances and taxis stop at Pile Gate.
export const pileGate = { lat: 42.6416, lon: 18.1058 };
export const apartment = { lat: 42.6556, lon: 18.07 };
export const airport = { lat: 42.5614, lon: 18.2682 };

// ---------- Module 6: help on the road ----------
export const emergencyNumbers = [
  { number: "112", label: "All emergencies", note: "Works across the EU, free from any phone" },
  { number: "194", label: "Ambulance in Croatia", note: "Emergency medical service" },
];

export const healthPassport = {
  allergies: ["Penicillin"],
  medication: ["Levothyroxine 75 mcg, every morning"],
  conditions: ["Hypothyroidism, well controlled"],
  bloodType: "A+",
  contact: "Thomas (husband), shared with consent",
};

// ---------- Module 1: where to have the surgery ----------
export type ClinicMatch = {
  osmId?: string;
  name: string;
  address: string;
  match: number; // demo score
  reasons: string[];
  caution?: string;
  kind: "public" | "private";
};

export const clinicMatches: ClinicMatch[] = [
  {
    osmId: "w428336702",
    name: "Opća bolnica Dubrovnik",
    address: "Ulica dr. Ante Šercera 2, Dubrovnik",
    match: 93,
    kind: "public",
    reasons: [
      "Emergency department and orthopaedic surgery on site",
      "EHIC covers necessary treatment on the same terms as for locals",
      "About 1 km from the step-free apartment in Lapad",
    ],
  },
  {
    name: "Klinika za traumatologiju, Zagreb",
    address: "Draškovićeva ulica 19, Zagreb",
    match: 71,
    kind: "public",
    reasons: ["Dedicated trauma and orthopaedic surgery clinic"],
    caution: "Needs a flight with an unstable fracture before surgery",
  },
  {
    name: "Surgery at home in Vienna",
    address: "Marta's local hospital",
    match: 58,
    kind: "public",
    reasons: ["Close to family and her own doctor"],
    caution: "1,100 km trip before the fracture is fixed. The Dubrovnik team advises against it",
  },
];

export const stayOption = {
  title: "Adapted ground-floor room in the partner hotel, Lapad",
  tag: "sample partner",
  reason:
    "Marta and Thomas already stay at our partner hotel in Lapad, but their room is up a flight of steps. Under our contract the hotel keeps a few adapted rooms free, so they move downstairs and stay in the same place, with the same staff and the heated pool for later.",
  features: ["Ground floor, step-free entrance", "Walk-in shower with seat", "About 1 km from the hospital", "Heated indoor pool, from week 3 with approval"],
};

// ---------- Module 2: every move, step-free ----------
export const arrangedMoves = [
  {
    date: "4 Oct",
    title: "City walls to Pile Gate",
    detail: "The Old Town is car-free. Walls staff bring a carry chair, the ambulance waits at Pile Gate.",
  },
  {
    date: "8 Oct",
    title: "Hospital to the partner hotel in Lapad",
    detail: "Adapted taxi with a ramp, about 5 minutes. Wheelchair on loan from the hospital.",
  },
  {
    date: "2 Nov",
    title: "Lapad to Kalos, Vela Luka",
    detail: "Adapted van over the Pelješac bridge and the car ferry to Korčula. The leg stays raised.",
  },
];

export type TransportOption = {
  id: "flight" | "car" | "bus" | "train";
  title: string;
  verdict: "recommended" | "possible" | "not-suitable";
  duration: string;
  priceNote: string;
  summary: string;
  checks: { ok: boolean; text: string }[];
};

export const transportOptions: TransportOption[] = [
  {
    id: "flight",
    title: "Flight Dubrovnik to Vienna with assistance (WCHS)",
    verdict: "recommended",
    duration: "about 1 h 30 min flight, 4 h door to door",
    priceNote: "Sample fare, schedule not live",
    summary:
      "EU Regulation 1107/2006 gives free assistance at both airports, guaranteed when requested at least 48 hours before the flight.",
    checks: [
      { ok: true, text: "Wheelchair from check-in to the seat, and at Vienna (WCHS)" },
      { ok: true, text: "Medical form (MEDIF) drafted, signed by the surgeon" },
      { ok: true, text: "Front-row seat with legroom requested" },
      { ok: true, text: "Adapted taxi to the airport, about 25 minutes" },
    ],
  },
  {
    id: "car",
    title: "Adapted car, door to door",
    verdict: "possible",
    duration: "about 11 h, 1,100 km, best split over two days",
    priceNote: "Sample partner price on request",
    summary: "No transfers, but a very long time sitting after surgery, with an overnight stop on the way.",
    checks: [
      { ok: true, text: "No changes between vehicles" },
      { ok: false, text: "Long sitting raises the risk of blood clots after surgery" },
      { ok: false, text: "Needs a step-free hotel for the overnight stop" },
    ],
  },
  {
    id: "bus",
    title: "Intercity coach",
    verdict: "not-suitable",
    duration: "overnight, with changes",
    priceNote: "Not offered for this profile",
    summary:
      "Assistance must be requested 36 hours ahead (EU Regulation 181/2011), and the leg cannot stay raised.",
    checks: [
      { ok: false, text: "Steps at the door, boarding needs a lift the route may not have" },
      { ok: false, text: "No space to keep the leg raised" },
    ],
  },
  {
    id: "train",
    title: "Train",
    verdict: "not-suitable",
    duration: "not available",
    priceNote: "No railway in Dubrovnik",
    summary: "Dubrovnik has no railway station, so any train journey starts with a long road transfer.",
    checks: [{ ok: false, text: "No direct rail connection" }],
  },
];

// Trip home on 17 November (sample times).
export const routeSegments = [
  { time: "08:30", to: "Adapted taxi from the partner hotel in Lapad", mode: "Ramp, wheelchair stays with her", risk: null },
  { time: "09:00", to: "Dubrovnik Airport assistance desk", mode: "Wheelchair to the gate and up to the seat", risk: null },
  { time: "10:40 - 12:15", to: "Flight to Vienna", mode: "Front-row seat, leg raised on a support", risk: "Front-row seat still waiting for the airline's confirmation" },
  { time: "12:30", to: "Vienna Airport, met at the aircraft door", mode: "Assistance to arrivals, Thomas waits with the car", risk: null },
];

// ---------- Module 3: recovery after surgery ----------
// Day 0 = surgery on 6 October. Values are a scripted demo series.
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
  { fromDay: 3, title: "Short walks on crutches", detail: "Inside the hotel and its garden, no weight on the right leg.", unlocked: true },
  { fromDay: 14, title: "Heated hotel pool and hydrotherapy", detail: "In the partner hotel, after stitch removal and the surgeon's approval.", unlocked: false },
  { fromDay: 21, title: "Lapad promenade", detail: "Flat seaside path, first in the wheelchair, then on crutches.", unlocked: false },
  { fromDay: 42, title: "Nature trails", detail: "Flat island paths, with partial weight bearing if approved.", unlocked: false },
];

// ---------- Module 4: rehabilitation and nature ----------
export const wellnessPlace = {
  name: "Kalos, Vela Luka",
  island: "Island of Korčula",
  lat: 42.9682,
  lon: 16.7129,
  image: "/img/vela-luka.jpg",
  summary:
    "A public special hospital for medical rehabilitation by the sea, known for seawater pools and medicinal mud. Quiet from October to May.",
};

export const wellnessProgram = [
  { day: "Day 1", items: ["Arrival by adapted van, check-in on the ground floor", "Physiotherapy assessment"] },
  { day: "Day 2-5", items: ["Seawater pool, 30 min", "Gait training with crutches", "Rest in the afternoon"] },
  { day: "Day 6", items: ["Guided walk on the seafront path, 40 min", "Nutrition session: protein and vitamin D for bone healing"] },
  { day: "Day 7-12", items: ["Partial weight-bearing exercises, as approved", "Mud treatment for the ankle", "Optional: evening talk on the island's protected areas"] },
  { day: "Day 13-14", items: ["Before and after report: sleep, pain, step count", "Plan for home exercises in Vienna"] },
];

export const trails = [
  {
    name: "Lapad promenade",
    park: "Dubrovnik",
    image: "/img/lapad.jpg",
    surface: "Paved, car-free seaside path",
    length: "about 1.5 km",
    slope: "Flat",
    fit: "From week 3, wheelchair first, then crutches",
    crowd: "Quiet in the morning outside summer",
  },
  {
    name: "Lokrum botanical garden",
    park: "Lokrum nature reserve",
    image: "/img/lokrum.jpg",
    surface: "Gravel and stone paths",
    length: "1 km loop",
    slope: "Mostly flat",
    fit: "From week 6, boat from the Old Town harbour",
    crowd: "Best on days without cruise ships in port",
  },
  {
    name: "Road along Veliko jezero",
    park: "Mljet National Park",
    image: "/img/mljet-lake-road.jpg",
    surface: "Paved lakeside road",
    length: "2 km out and back",
    slope: "Flat",
    fit: "From week 8, with the surgeon's approval",
    crowd: "Almost empty in November",
  },
];

export const otherRehab = [
  { name: "Thalassotherapia Opatija", image: "/img/thalasso-opatija.jpg", text: "Seaside rehabilitation hospital on the Kvarner coast" },
  { name: "Istarske Toplice", image: "/img/spa.jpg", text: "Thermal spa in a green valley in Istria" },
  { name: "Varaždinske Toplice", image: "/img/varazdinske-toplice.jpg", text: "Thermal-water rehabilitation north of Zagreb" },
];

// ---------- Module 5: crowd-free experiences ----------
export const harvestCalendar = [
  { months: "Jan - Mar", what: "Pruning olives and vines, winter village stays, migrating birds", where: "Konavle, Pelješac, Neretva delta" },
  { months: "Apr - Jun", what: "Blossom season, island walks before the season", where: "Konavle, Mljet, Elaphiti islands" },
  { months: "Jun - Sep", what: "Sea clean-ups with Green Sea Safari, figs and lavender on the islands", where: "Elaphiti islands, Korčula, Mljet" },
  { months: "Sep - Oct", what: "Grape harvest and working in a winery", where: "Pelješac, Konavle" },
  { months: "Oct - Dec", what: "Mandarin harvest, olive picking and pressing at the oil mill", where: "Neretva valley, Pelješac, Korčula" },
];

export type FarmMatch = {
  name: string;
  region: string;
  image: string;
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
    region: "Ston, Pelješac",
    image: "/img/olives.jpg",
    activity: "Watch the pressing, taste the new oil, lunch with the family",
    effort: "low",
    accessible: true,
    languages: "Croatian, English, German",
    when: "November, mill open daily",
    note: "Step-free mill floor, seating throughout. Picking is optional.",
  },
  {
    name: "OPG Bralić",
    region: "Pelješac",
    image: "/img/grapes.jpg",
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
    image: "/img/mandarins.jpg",
    activity: "Mandarin picking and a boat trip through the delta",
    effort: "medium",
    accessible: false,
    languages: "Croatian, English, Italian",
    when: "October to December",
    note: "Boarding a traditional boat needs some balance.",
  },
];
