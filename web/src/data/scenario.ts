// Demo story for the "We care" part: help on the road when something goes wrong on a tour.
// Places from OpenStreetMap are real (see osm-facilities.json); everything else is a sample.

export const persona = {
  name: "Marta",
  age: 54,
  role: "Teacher from Vienna, on the Neretva and Ston week with her husband Thomas and granddaughter Lena (9)",
};

// The lađa jetty in Opuzen has no street address: one reason Vita sends GPS coordinates.
export const incident = {
  place: "Lađa jetty on the Neretva, Opuzen",
  when: "Sunday 4 October 2026, 08:40, on the photo safari",
  lat: 43.0141,
  lon: 17.5636,
};

export const emergencyNumbers = [
  { number: "112", label: "All emergencies", note: "Works across the EU, free from any phone" },
  { number: "194", label: "Ambulance in Croatia", note: "Emergency medical service" },
];

export const healthPassport = {
  allergies: ["Penicillin"],
  medication: ["Levothyroxine 75 mcg, every morning"],
  conditions: ["Hypothyroidism, well controlled"],
  bloodType: "A+",
};

export const healthPassportHr = {
  allergies: ["Penicilin"],
  medication: ["Levotiroksin 75 mcg, svako jutro"],
  conditions: ["Hipotireoza, dobro regulirana"],
  bloodType: "A+",
};

// What our guide and Vita do in the first hour, in a place with no street address.
export const firstHour = [
  { time: "08:40", what: "Marta slips on the wet jetty stepping off the lađa. The guide, trained in first aid, checks her ankle and keeps it raised." },
  { time: "08:44", what: "Vita's triage: no numb toes, no open wound, but she cannot stand on it. It needs an X-ray today, not an ambulance." },
  { time: "08:46", what: "Sunday: the Opuzen clinic is closed. Vita picks Opća bolnica Dubrovnik (emergency department and X-ray) and sends her health passport ahead in Croatian." },
  { time: "08:50", what: "The guide drives Marta and Thomas to Dubrovnik. Lena finishes the photo safari with the group and comes back in the shared minibus." },
  { time: "10:30", what: "X-ray at the hospital: a bad sprain, no fracture. A brace, crutches for a few days, no long walks for 10 days." },
];

export type DayPlan = {
  date: string;
  planned: string;
  adapted?: string; // what Vita changed after the fall
  status: "done" | "now" | "next";
  href?: string;
};

// The family's week, before and after the fall.
export const week: DayPlan[] = [
  { date: "Sat 3 Oct", planned: "Arrival at the partner hotel in Lapad", status: "done" },
  {
    date: "Sun 4 Oct",
    planned: "Neretva photo safari and mandarin harvest",
    adapted: "Marta slips on the jetty. Hospital in Dubrovnik, sprain. Lena and Thomas still pick mandarins in the afternoon.",
    status: "done",
    href: "/help",
  },
  {
    date: "Mon 5 Oct",
    planned: "Rest day, Trsteno Arboretum",
    adapted: "Moved to a step-free ground-floor room in the same hotel. Trsteno with a borrowed wheelchair, on flat paths.",
    status: "now",
  },
  {
    date: "Tue 6 Oct",
    planned: "Canoe safari in the Neretva channels",
    adapted: "Swapped for the birdwatching walk and the Ornithological Collection: seated hide, short flat route.",
    status: "next",
  },
  {
    date: "Wed 7 Oct",
    planned: "Ston walls, salt works and oyster boat",
    adapted: "Thomas and Lena walk the walls. Marta joins them at the salt works and on the oyster boat (seated).",
    status: "next",
  },
  { date: "Thu 8 Oct", planned: "Elaphiti islands walk", adapted: "Kept, but only Koločep: one short flat loop.", status: "next" },
  { date: "Fri 9 Oct", planned: "Olive picking and oil mill", adapted: "Kept: picking is optional, the mill floor is step-free.", status: "next" },
  {
    date: "Sat 10 Oct",
    planned: "Flight home to Vienna",
    adapted: "Airport assistance booked (code WCHR), front-row seat, taxi with space for the crutches.",
    status: "next",
  },
];
