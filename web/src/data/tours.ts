// Off-season tours around Dubrovnik (not the Old Town). Every tour welcomes children.
// Prices are our proposed prices, set against what similar tours and tickets cost today
// (see `priceBasis` and the sources on the Tours page). They are not live offers.

export type Category = "nature" | "harvest" | "heritage" | "islands";

export type Tour = {
  id: string;
  name: string;
  area: string; // region around Dubrovnik
  meet: string; // meeting point
  months: number[]; // 1-12, when it runs
  season: string;
  duration: string;
  adult: number; // EUR
  child: number; // EUR
  childAges: string;
  groupMax: number;
  category: Category;
  image: string;
  pitch: string; // one line for the card
  includes: string[];
  kids: string; // what children do
  onGround: string; // the concrete change in the destination
  locals: string; // who earns from it
  priceBasis: string;
  isNew?: boolean; // the product does not exist in this form yet
};

export const tours: Tour[] = [
  {
    id: "photo-safari",
    name: "Neretva photo safari by lađa",
    area: "Neretva delta",
    meet: "Lađa jetty, Opuzen",
    months: [10, 11, 12, 1, 2, 3, 4],
    season: "October to April",
    duration: "3 hours",
    adult: 45,
    child: 25,
    childAges: "4 to 12, under 4 free",
    groupMax: 8,
    category: "nature",
    image: "/img/opuzen-neretva.jpg",
    pitch: "Glide through the channels at sunrise with a local boatman and a photographer.",
    includes: ["Traditional lađa boat and boatman", "Photographer guide and photo tips", "Fresh mandarin juice and a farm snack", "Your best 10 photos, edited"],
    kids: "A kids' photo challenge: spot a heron, a kingfisher and a mandarin boat.",
    onGround: "Wooden photo hides at 3 viewpoints, and a course that certifies local boatmen as photo-safari guides.",
    locals: "Boatmen and young photographers from the valley",
    priceBasis: "Neretva boat trips from Opuzen sell from €80 for half or full days with lunch; our shorter 3-hour trip without lunch is €45.",
    isNew: true,
  },
  {
    id: "canoe",
    name: "Canoe safari in the Neretva channels",
    area: "Neretva delta",
    meet: "Canoe launch, Opuzen",
    months: [3, 4, 5, 10, 11],
    season: "March to May, October to November",
    duration: "3 hours",
    adult: 35,
    child: 20,
    childAges: "6 to 12, in a family canoe",
    groupMax: 10,
    category: "nature",
    image: "/img/neretva.jpg",
    pitch: "Calm, flat water between mandarin orchards. Easy for beginners and families.",
    includes: ["Canoe, paddles and life jackets", "Guide", "Stop at a family farm for mandarin juice", "Dry bag"],
    kids: "Three-seat canoes: two adults paddle, the child sits in the middle.",
    onGround: "Two canoe launch points with a ramp and racks, shared by local outfitters.",
    locals: "Canoe guides and outfitters in Opuzen",
    priceBasis: "River kayak safaris on the Neretva cost €20 to €50 per adult; kids up to 7 are often free.",
    isNew: true,
  },
  {
    id: "birds",
    name: "Birdwatching walk and the Ornithological Collection",
    area: "Neretva delta and Metković",
    meet: "Natural History Museum, Metković",
    months: [10, 11, 12, 1, 2, 3, 4],
    season: "October to April, during migration and wintering",
    duration: "3.5 hours",
    adult: 30,
    child: 15,
    childAges: "6 to 12, under 6 free",
    groupMax: 10,
    category: "nature",
    image: "/img/neretva-birds.jpg",
    pitch: "Herons, cormorants and ducks winter in the delta, one of Croatia's Ramsar wetlands.",
    includes: ["Museum ticket: more than 300 birds of the Neretva", "Guided walk on the marked route", "Binoculars for everyone", "Bird checklist"],
    kids: "Kids get their own binoculars and a sticker book of the birds they see.",
    onGround: "A marked birdwatching route with boards in four languages and a hide on the reserve edge.",
    locals: "Local ornithologists and the museum in Metković",
    priceBasis: "The museum is €6.70 for a family; guided birding in the delta has been priced at about €13 per hour per person.",
    isNew: true,
  },
  {
    id: "mandarins",
    name: "Mandarin harvest and family lunch",
    area: "Neretva valley",
    meet: "Partner family farm near Opuzen",
    months: [10, 11, 12],
    season: "October to December",
    duration: "4 hours",
    adult: 39,
    child: 19,
    childAges: "3 to 12, under 3 free",
    groupMax: 16,
    category: "harvest",
    image: "/img/mandarins.jpg",
    pitch: "Pick your own mandarins, then sit down to lunch at the family's table.",
    includes: ["Picking with the family", "2 kg of mandarins to take home", "Home-cooked lunch with local food", "Short lađa ride to the orchard"],
    kids: "Low trees, small baskets and a race to fill the first crate.",
    onGround: "Shade, seating and a step-free path at each partner farm, paid from a small shared fund.",
    locals: "Family farms (OPG) in the valley",
    priceBasis: "A farm lunch in the valley costs €20 to €25; mandarins sell for about €2 a kilo at market.",
  },
  {
    id: "ston",
    name: "Ston walls, salt works and oyster boat",
    area: "Ston and Mali Ston, Pelješac",
    meet: "Ston walls ticket office",
    months: [2, 3, 4, 5, 10, 11],
    season: "February to May, October to November",
    duration: "5 hours",
    adult: 65,
    child: 30,
    childAges: "4 to 12, under 4 free",
    groupMax: 12,
    category: "heritage",
    image: "/img/ston-walls.jpg",
    pitch: "Walk Europe's longest defensive walls, see sea salt made by hand, taste oysters on the farm.",
    includes: ["Ston walls ticket", "Salt works visit and film", "Boat to the oyster farm", "Oysters and mussels (juice and bread for kids)"],
    kids: "Kids rake a little salt and take a bag of it home.",
    onGround: "Benches and a water point at the halfway tower, and a winter timetable so the walls stay open all year.",
    locals: "Oyster farmers, the salt works and Ston guides",
    priceBasis: "Walls €10 adult / €5 child, salt works €10, oyster farm boat with 3 oysters from €40.",
  },
  {
    id: "olives",
    name: "Olive picking and the oil mill",
    area: "Pelješac",
    meet: "Partner olive grove near Ston",
    months: [10, 11, 12],
    season: "October to December",
    duration: "4 hours",
    adult: 49,
    child: 22,
    childAges: "3 to 12, under 3 free",
    groupMax: 16,
    category: "harvest",
    image: "/img/olives.jpg",
    pitch: "Pick olives on the nets, then watch them become oil at the mill the same day.",
    includes: ["Picking with the family", "Visit to the oil mill during pressing", "Tasting of the new oil and lunch", "A small bottle of oil to take home"],
    kids: "Kids shake the low branches and collect olives from the nets.",
    onGround: "Seating, shade and a step-free mill floor at the partner farms.",
    locals: "Olive growers and the village oil mill",
    priceBasis: "Mill visits with tasting sell for about €60; full picking days on the islands reach €330, ours is simpler and shorter.",
  },
  {
    id: "konavle",
    name: "Konavle: Ljuta river mills, folklore and silk",
    area: "Konavle valley",
    meet: "Čilipi village square",
    months: [11, 12, 1, 2, 3],
    season: "November to March, one Sunday a month",
    duration: "4 hours",
    adult: 45,
    child: 22,
    childAges: "4 to 12, under 4 free",
    groupMax: 20,
    category: "heritage",
    image: "/img/konavle.jpg",
    pitch: "Old water mills on the Ljuta river, a folklore show and a silk embroidery workshop.",
    includes: ["Ljuta mills and spring walk", "Winter folklore performance in Čilipi", "Silk and embroidery workshop", "Konavle lunch"],
    kids: "Kids try a simple embroidery pattern and a folk dance step.",
    onGround: "A monthly winter folklore show (today the shows run only from spring to autumn) and a workshop room in Čilipi.",
    locals: "Folklore group, embroiderers and mill owners",
    priceBasis: "Guided Čilipi folklore tours cost about €20; agency Konavle tours with lunch run €35 to €50.",
    isNew: true,
  },
  {
    id: "mljet",
    name: "Mljet National Park by bike, off-season",
    area: "Island of Mljet",
    meet: "Gruž port, Dubrovnik",
    months: [10, 11, 3, 4, 5],
    season: "October to November, March to May",
    duration: "Full day",
    adult: 79,
    child: 39,
    childAges: "7 to 17, under 7 €15",
    groupMax: 16,
    category: "islands",
    image: "/img/mljet-lake-road.jpg",
    pitch: "Flat lakeside roads, a monastery on an island in a lake, and almost nobody else.",
    includes: ["Return catamaran", "National park ticket", "Bike or child seat", "Boat to St. Mary's islet"],
    kids: "Child seats and small bikes; the lake road is flat and closed to most cars.",
    onGround: "Bike racks and child seats kept on the island in the off-season.",
    locals: "Bike rental and guides in Pomena and Polače",
    priceBasis: "Park off-season €15 adult / €5 child, catamaran about €25 each way, bikes €15 to €25 a day; Mljet day tours sell at €65 to €80.",
  },
  {
    id: "elaphiti",
    name: "Car-free islands: Koločep and Lopud walk",
    area: "Elaphiti islands",
    meet: "Gruž port, Dubrovnik",
    months: [10, 11, 12, 1, 2, 3, 4],
    season: "October to April",
    duration: "7 hours",
    adult: 39,
    child: 19,
    childAges: "4 to 12, under 4 free",
    groupMax: 16,
    category: "islands",
    image: "/img/elaphiti.jpg",
    pitch: "Two islands without cars, olive paths, chapels and a sandy bay, by local ferry.",
    includes: ["Local ferry tickets", "Guided walk on both islands", "Picnic lunch from island producers", "Sea clean-up hour with Green Sea Safari (optional)"],
    kids: "Šunj beach on Lopud is shallow sand, and the paths are short.",
    onGround: "Marked winter walking loops on both islands, and a picnic shelter on Lopud.",
    locals: "Island families who make the picnic, local guides",
    priceBasis: "Off-season ferry €6.80 return; Elaphiti boat tours with lunch sell at €30 to €50.",
    isNew: true,
  },
  {
    id: "trsteno",
    name: "Trsteno Arboretum and the coast",
    area: "Trsteno, 20 minutes from Dubrovnik",
    meet: "Arboretum entrance, Trsteno",
    months: [1, 2, 3, 4, 5, 10, 11, 12],
    season: "All year, best October to May",
    duration: "2.5 hours",
    adult: 25,
    child: 12,
    childAges: "7 to 12, under 7 free",
    groupMax: 20,
    category: "heritage",
    image: "/img/trsteno.jpg",
    pitch: "A Renaissance garden by the sea with giant plane trees, open every day of the year.",
    includes: ["Arboretum ticket", "Guided walk", "Hot drink and local cake"],
    kids: "A garden treasure hunt and the 500-year-old plane trees in the village.",
    onGround: "Winter guided walks on weekends, with wheelchairs and pushchairs to borrow.",
    locals: "Local guides and the village café",
    priceBasis: "Arboretum tickets are €10 adult / €7 child, under 7 free.",
  },
];

export const transfers = [
  { to: "Neretva delta (Opuzen, Metković)", time: "1 h 40 min", adult: 20, child: 10 },
  { to: "Ston and Mali Ston", time: "1 h", adult: 15, child: 8 },
  { to: "Konavle (Čilipi)", time: "30 min", adult: 10, child: 5 },
  { to: "Trsteno", time: "20 min", adult: 8, child: 4 },
];

export const categoryLabel: Record<Category, string> = {
  nature: "Nature",
  harvest: "Harvest",
  heritage: "Heritage",
  islands: "Islands",
};

// A full week built from the tours, sold with the partner hotel.
export const weekPackage = {
  name: "Neretva and Ston week",
  nights: 7,
  adult: 790,
  child: 350,
  includes: [
    "7 nights with breakfast and dinner at the partner hotel in Lapad",
    "4 tours: photo safari and mandarin harvest (one Neretva day), Ston and oysters, Konavle",
    "All transfers in a shared minibus",
    "Help on the road, 24/7, in your language",
  ],
  // Adult: hotel 7 x €55 = €385, tours €194, transfers €45 = €624 cost, about €166 (21%) margin.
  // Child: hotel 7 x €25 = €175, tours €96, transfers €23 = €294 cost.
  basis:
    "Off-season half board in Lapad is about €55 a night per adult (€385), the 4 tours cost €194 at our prices and transfers €45: €624 before our margin of about 21%.",
};

export const priceSources = [
  { label: "Neretva boat trips from €80 (onlycroatia.com)", url: "https://www.onlycroatia.com/excursions-details,45,by-boat-delta-neretve" },
  { label: "Neretva kayak safari, €20 adult (happytovisit.com)", url: "https://happytovisit.com/neretva-kayak-safari/" },
  { label: "Ston walls ticket prices (The Dubrovnik Times)", url: "https://www.thedubrovniktimes.com/news/dubrovnik/item/14760-ticket-prices-for-ston-walls-increase" },
  { label: "Ston salt works visit, €10 (ston.hr)", url: "https://www.ston.hr/?u=saltworks%2Fen%2Fst%2F59%2F24" },
  { label: "Mali Ston oyster farm boat, €40 (onlycroatia.com)", url: "https://onlycroatia.com/excursions-details,20,by-boat-shellfish-farming-oysters-tasting-mali-ston-bay" },
  { label: "Mljet National Park price list 2025 (np-mljet.hr)", url: "https://np-mljet.hr/wp-content/uploads/2025/02/ENG-Cjenik-ulaznica-za-posjetitelje-za-2025.g_.pdf" },
  { label: "Elaphiti ferry fares (absolute-croatia.com)", url: "https://www.absolute-croatia.com/dubrovnik/ferries/dubrovnik-to-elaphiti-islands-ferry" },
  { label: "Čilipi folklore (libertasdubrovnik.hr)", url: "https://www.libertasdubrovnik.hr/en/cilipi-folklore" },
  { label: "Trsteno Arboretum tickets (dubrovnik-online.net)", url: "https://www.dubrovnik-online.net/trsteno-arboretum" },
  { label: "Metković birdwatching (tzmetkovic.hr)", url: "https://tzmetkovic.hr/birdwatching/" },
];
