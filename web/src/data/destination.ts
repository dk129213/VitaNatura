// The year-round plan for the area around Dubrovnik: what changes on the ground,
// who takes part, and how it is paid for and sold. Figures marked as estimates are ours.

export const audience = {
  title: "Anyone who travels outside the summer",
  text: "Families in the autumn, winter and spring school holidays, couples whose children have left home, grandparents with grandchildren, and people who simply want the region without the crowds. Every tour welcomes children.",
  facts: [
    "Every tour has a child price, most are free under 4",
    "Small groups of 8 to 20",
    "Autumn, winter and Easter school holidays in Austria, Germany and the UK",
    "Direct flights to Dubrovnik from many European cities",
  ],
};

// Concrete changes in the destination, the core of the plan.
export const changes = [
  { what: "Photo hides at 3 viewpoints in the Neretva delta", where: "Neretva delta" },
  { what: "Two canoe launch points with ramps, shared by local outfitters", where: "Opuzen" },
  { what: "A marked birdwatching route with boards in four languages", where: "Neretva delta" },
  { what: "Benches and water on the Ston walls, and a winter timetable", where: "Ston" },
  { what: "Shade, seating and step-free paths at partner farms", where: "Neretva, Pelješac" },
  { what: "A monthly winter folklore show and a silk workshop room", where: "Čilipi, Konavle" },
  { what: "Winter walking loops and a picnic shelter on car-free islands", where: "Koločep, Lopud" },
  { what: "Bike racks and child seats on Mljet in the off-season", where: "Mljet" },
  { what: "Local boatmen and young people certified as guides, with first aid", where: "Whole region" },
];

// ---------- Calendar 365: traditions stretched into seasons ----------
export type CalendarItem = {
  months: string;
  title: string;
  place: string;
  today: string;
  stretched: string;
  kind: "tradition" | "harvest" | "nature";
  image?: string;
};

export const calendar: CalendarItem[] = [
  {
    months: "January to March",
    title: "Winter in the delta",
    place: "Neretva delta, Metković",
    today: "Thousands of birds winter here, but almost nobody comes to see them.",
    stretched: "Birdwatching walks, sunrise photo safaris by lađa and the Ornithological Collection in Metković.",
    kind: "nature",
    image: "/img/neretva-birds.jpg",
  },
  {
    months: "Early February",
    title: "Feast of St. Blaise (Festa sv. Vlaha)",
    place: "Dubrovnik, 3 February",
    today: "Dubrovnik's patron saint festival, on the UNESCO intangible heritage list. The main events last a few days.",
    stretched: "A St. Blaise Week with day trips to the villages around the city, so visitors also see the countryside.",
    kind: "tradition",
  },
  {
    months: "February to April",
    title: "Ston oyster trail",
    place: "Mali Ston and the Ston walls",
    today: "Ston Oyster Days happen around St. Joseph's Day (19 March). Mali Ston oysters are best in the cool months.",
    stretched: "A season-long oyster trail: farm boats, tastings (mussels and juice for kids), the walls and the salt works.",
    kind: "tradition",
    image: "/img/mali-ston.jpg",
  },
  {
    months: "April to June, September to October",
    title: "Moreška and Kumpanija sword dances",
    place: "Korčula town, Blato, Pupnat",
    today: "Moreška is tied to 29 July and runs only a couple of evenings a week in summer.",
    stretched: "Spring and autumn shows, open rehearsals and a small costume exhibition. Children love the sword fights.",
    kind: "tradition",
  },
  {
    months: "November to March",
    title: "Konavle folklore and silk",
    place: "Čilipi, Konavle",
    today: "Sunday folklore shows after Mass, from Palm Sunday to early November only.",
    stretched: "One winter show a month, with embroidery workshops and the Ljuta river mills.",
    kind: "tradition",
    image: "/img/konavle.jpg",
  },
  {
    months: "Spring training, October weekend",
    title: "Neretva Boat Marathon (Maraton lađa)",
    place: "Metković to Ploče",
    today: "A one-day race in August, when the coast is already full.",
    stretched: "Watch the crews train in spring, and a small autumn lađa weekend with rides for families.",
    kind: "tradition",
    image: "/img/neretva.jpg",
  },
  {
    months: "October to December",
    title: "Mandarin harvest",
    place: "Neretva valley",
    today: "The harvest festival lasts a few days, but picking goes on for weeks.",
    stretched: "Pick-your-own mornings, family lunches and lađa rides for the whole harvest.",
    kind: "harvest",
    image: "/img/mandarins.jpg",
  },
  {
    months: "October to December",
    title: "Olive picking and the oil mill",
    place: "Pelješac",
    today: "Family work, rarely open to visitors.",
    stretched: "Picking on the nets, pressing at the mill and the new oil on fresh bread.",
    kind: "harvest",
    image: "/img/olives.jpg",
  },
];

// What runs in each month (1 = Jan). Summer is already full.
export const yearRound: { label: string; months: number[]; summer?: boolean }[] = [
  { label: "Nature: photo safari, canoe, birds", months: [1, 2, 3, 4, 5, 10, 11, 12] },
  { label: "Harvests", months: [10, 11, 12] },
  { label: "Traditions", months: [1, 2, 3, 4, 5, 6, 9, 10, 11, 12] },
  { label: "Islands and gardens", months: [1, 2, 3, 4, 5, 10, 11, 12] },
  { label: "Summer tourism (already full)", months: [6, 7, 8, 9], summer: true },
];

// ---------- Partner hotel ----------
export const hotelDeal = {
  terms: [
    "Guaranteed rooms for our guests from October to May, at an agreed rate",
    "Family rooms and cots, early breakfast on tour days, packed lunches",
    "Indoor pool kept open in winter, so families have something on rainy days",
    "Two step-free ground-floor rooms kept free for guests who get hurt",
  ],
  weGet: ["Safe, known rooms for every client", "A better margin than booking room by room", "One base where every tour starts"],
  hotelGets: ["Guests in months it used to close", "Staff kept on all year", "A slow, safe start with off-season work"],
  phases: [
    { when: "Winter 2026/27", what: "1 hotel, 10 rooms, 2 weeks a month" },
    { when: "2027/28", what: "Same hotel, 25 rooms, every week from October to May" },
    { when: "2028 onwards", what: "A second hotel in Ston or the Neretva valley, open all year" },
  ],
};

// ---------- Local community, partners, nature ----------
export const jobs = [
  { title: "Photo-safari and birdwatching guides", who: "Boatmen and young people from the Neretva valley, after a short course with first aid" },
  { title: "Canoe guides", who: "Local outfitters in Opuzen" },
  { title: "Farm hosts", who: "Family farms (OPG) in the valley and on Pelješac" },
  { title: "Island guides and picnic makers", who: "Families on Koločep and Lopud" },
  { title: "Folklore groups, embroiderers, mill owners", who: "Paid shows and workshops in Konavle outside summer" },
  { title: "Minibus drivers and hotel staff", who: "Work in winter that used to stop in October" },
];

export const stakeholders = [
  { name: "Partner hotel in Lapad", role: "Rooms and the base for every tour" },
  { name: "Family farms (OPG)", role: "Mandarin and olive harvests, lunches" },
  { name: "Neretva boatmen and canoe outfitters", role: "Photo safari and canoe safari" },
  { name: "Natural History Museum Metković", role: "Ornithological Collection, birding experts" },
  { name: "Ston salt works and oyster farmers", role: "Ston day" },
  { name: "Folklore group Čilipi, Ljuta mills", role: "Konavle day" },
  { name: "Mljet National Park, Trsteno Arboretum", role: "Tickets, off-season opening" },
  { name: "Green Sea Safari", role: "Sea clean-ups on the islands" },
  { name: "Tourist boards of the county and towns", role: "Event calendar, permits, co-funding" },
  { name: "Health centres and Opća bolnica Dubrovnik", role: "Care if something goes wrong" },
];

export const ecology = [
  { risk: "Disturbing birds in the delta", answer: "Groups of 8 or fewer, fixed routes and hides, no boats in nesting zones" },
  { risk: "New buildings", answer: "None: we use existing farms, jetties, paths and one hotel" },
  { risk: "Car traffic between sites", answer: "One shared minibus per group, lađe and canoes on the water" },
  { risk: "Summer overcrowding in Dubrovnik", answer: "The same number of visitors spread over 12 months, outside the Old Town" },
  { risk: "Waste on the islands", answer: "Sea clean-up hour with Green Sea Safari on every island walk" },
  { risk: "Food miles", answer: "Lunches from the farms on the route" },
];

// ---------- Financing (estimates for the pilot year) ----------
export const startCosts = [
  { item: "Photo hides at 3 viewpoints", eur: 12000 },
  { item: "2 canoe launch points with ramps", eur: 12000 },
  { item: "Birdwatching route, boards and a hide", eur: 8000 },
  { item: "Shade, seating and paths at 6 farms", eur: 15000 },
  { item: "Guide training and first aid, 20 locals", eur: 8000 },
  { item: "Website, booking and the help service", eur: 15000 },
  { item: "Shared minibus lease, first year", eur: 9000 },
  { item: "Marketing, first year", eur: 20000 },
  { item: "Working capital", eur: 15000 },
];

export const funding = [
  { source: "EU and national grants for sustainable tourism", share: 45, note: "Ministry of Tourism and Sport calls, EU cohesion funds" },
  { source: "County and tourist boards", share: 20, note: "Co-funding for off-season events and signs" },
  { source: "LAG / LEADER funds for rural areas", share: 10, note: "Farm improvements in the Neretva valley and Pelješac" },
  { source: "Founders and partners", share: 25, note: "Our capital and the partner hotel's share" },
];

export const revenue = [
  { stream: "Tours", how: "About 25% margin on each ticket; the rest goes to the local partner" },
  { stream: "Week packages", how: "About 21% margin on the hotel, tours and transfers" },
  { stream: "Transfers", how: "Shared minibus seats" },
  { stream: "Partner fees", how: "Small yearly fee from listed farms and outfitters after year 1" },
];

export const targets = [
  { year: "Pilot 2026/27", guests: "600 guests", note: "Learn, fix prices, collect photos and reviews" },
  { year: "2027/28", guests: "1,500 guests", note: "Break even" },
  { year: "2028/29", guests: "3,000 guests", note: "Second hotel, new tours in Konavle and Pelješac" },
];

// ---------- Marketing plan ----------
export const marketing = {
  markets: [
    "Austria, Germany and the UK: school holidays in autumn, February and at Easter",
    "Scandinavia: winter sun",
    "Croatia: weekend trips from Split and Zagreb",
  ],
  channels: [
    { name: "Summer guests come back", how: "Flyers and QR codes in Dubrovnik hotels in summer: \"Come back in October, it's quieter and cheaper.\"" },
    { name: "Guests' own photos", how: "Every photo-safari guest gets 10 edited photos to share, tagged #Neretva365" },
    { name: "Tour marketplaces", how: "Single tours on GetYourGuide and Viator, packages on our site" },
    { name: "Travel agencies", how: "B2B deals with family and senior travel agencies in Austria and Germany" },
    { name: "Tourist boards", how: "Joint off-season campaigns with the county and Croatian tourist boards" },
    { name: "Fairs and press trips", how: "Ferien-Messe Wien and ITB Berlin, winter trips for photographers and family bloggers" },
  ],
  budget: [
    { item: "Social media and online ads", share: 40 },
    { item: "Fairs", share: 25 },
    { item: "Press and blogger trips", share: 20 },
    { item: "Flyers in hotels", share: 15 },
  ],
  timeline: [
    { when: "Spring 2027", what: "Press trips, first photos and videos" },
    { when: "Summer 2027", what: "Flyers in Dubrovnik hotels, sell autumn to summer guests" },
    { when: "Autumn 2027", what: "Harvest season launch, marketplace listings" },
    { when: "Winter 2027/28", what: "Fairs in Vienna and Berlin, birdwatching season" },
  ],
};
