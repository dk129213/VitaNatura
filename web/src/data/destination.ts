// The year-round destination plan: what changes on the ground in Dubrovnik-Neretva County.
// Every text is in both languages. Anything marked `proposal` is our plan, not something that exists today.
import type { Bi } from "@/lib/i18n";

const b = (en: string, hr: string): Bi => ({ en, hr });

// ---------- Target audience ----------
export const audience = {
  title: b("Empty nesters", "Empty nesters: roditelji čija su djeca otišla od kuće"),
  text: b(
    "Couples and singles of about 50 to 65 whose children have left home. They have time, savings and good health insurance, they are not tied to school holidays, and they want to stay active and healthy rather than lie on a crowded beach.",
    "Parovi i samci od otprilike 50 do 65 godina čija su djeca otišla od kuće. Imaju vremena, ušteđevine i dobro zdravstveno osiguranje, nisu vezani uz školske praznike i žele ostati aktivni i zdravi, a ne ležati na prepunoj plaži.",
  ),
  facts: [
    b("Travel outside July and August", "Putuju izvan srpnja i kolovoza"),
    b("Stay longer: 7 to 14 nights", "Ostaju dulje: 7 do 14 noćenja"),
    b("Usually insured, so check-ups are easy to add", "Uglavnom osigurani, pa je lako dodati preglede"),
    b("Come from Austria, Germany, the UK and Scandinavia, with direct flights", "Dolaze iz Austrije, Njemačke, Velike Britanije i Skandinavije, s izravnim letovima"),
  ],
};

// ---------- Two pillars ----------
export type Offer = {
  id: string;
  title: Bi;
  place: Bi;
  when: Bi;
  text: Bi;
  onGround: Bi; // the concrete change in the destination
  jobs?: Bi;
  image?: string;
  proposal?: boolean;
};

export const activeOffers: Offer[] = [
  {
    id: "photo",
    title: b("Photo safari", "Foto safari"),
    place: b("Neretva delta, by traditional lađa boat", "Delta Neretve, tradicionalnom lađom"),
    when: b("All year: birds in winter, orchards in spring, mandarins in autumn", "Cijele godine: ptice zimi, voćnjaci u proljeće, mandarine u jesen"),
    text: b(
      "Small groups of 6 to 8 glide through the channels with a local boatman and a photographer, at sunrise or in the golden hour.",
      "Male grupe od 6 do 8 ljudi plove kanalima s lokalnim lađarom i fotografom, u zoru ili u zlatnom satu.",
    ),
    onGround: b(
      "Wooden photo hides at 3 viewpoints in the delta, and a short course that turns local boatmen into certified photo-safari guides.",
      "Drvena skrovišta za fotografiranje na 3 vidikovca u delti i kratki tečaj koji lokalne lađare pretvara u certificirane vodiče foto safarija.",
    ),
    jobs: b("Boatmen, local photographers, young people from the valley as guides", "Lađari, lokalni fotografi, mladi iz doline kao vodiči"),
    image: "/img/neretva.jpg",
    proposal: true,
  },
  {
    id: "canoe",
    title: b("Canoe safari", "Kanu safari"),
    place: b("Neretva channels and the river mouth", "Kanali Neretve i ušće"),
    when: b("March to November", "Ožujak do studeni"),
    text: b(
      "Calm-water paddling for beginners, 2 to 3 hours, with a stop at a family farm for mandarin juice or a lunch of local food.",
      "Veslanje po mirnoj vodi za početnike, 2 do 3 sata, sa stankom na obiteljskom gospodarstvu za sok od mandarina ili ručak od domaćih namirnica.",
    ),
    onGround: b(
      "Two small launch points with a ramp and a rack for canoes, shared by local outfitters.",
      "Dva mala mjesta za spuštanje kanua s rampom i stalkom, koja dijele lokalni pružatelji usluga.",
    ),
    jobs: b("Canoe guides, farm hosts", "Vodiči kanua, domaćini na gospodarstvima"),
    image: "/img/neretva.jpg",
  },
  {
    id: "birds",
    title: b("Birdwatching", "Promatranje ptica"),
    place: b("Neretva delta wetlands", "Močvare delte Neretve"),
    when: b("Best from October to April, during migration and wintering", "Najbolje od listopada do travnja, za vrijeme seobe i zimovanja"),
    text: b(
      "The delta is one of the most important Adriatic wetlands for migrating and wintering birds, exactly when the coast is empty.",
      "Delta je jedno od najvažnijih jadranskih močvarnih područja za ptice selice i zimovalice, baš kad je obala prazna.",
    ),
    onGround: b(
      "Marked birdwatching route with information boards in four languages, and binoculars to borrow at the partner hotel.",
      "Označena staza za promatranje ptica s pločama na četiri jezika i dalekozori za posudbu u partnerskom hotelu.",
    ),
    image: "/img/neretva.jpg",
    proposal: true,
  },
  {
    id: "harvest",
    title: b("Harvests", "Berbe"),
    place: b("Neretva valley, Pelješac, Konavle, Korčula", "Dolina Neretve, Pelješac, Konavle, Korčula"),
    when: b("Grapes Sep to Oct, mandarins Oct to Dec, olives Oct to Dec, pruning Jan to Mar", "Grožđe ruj. - lis., mandarine lis. - pro., masline lis. - pro., rezidba sij. - ožu."),
    text: b(
      "Pick-your-own mornings with the family, then lunch at their table. Light jobs for guests who prefer to sit and sort.",
      "Jutro branja s obitelji, zatim ručak za njihovim stolom. Lagani poslovi za goste koji radije sjede i sortiraju.",
    ),
    onGround: b(
      "Shaded tables, seating and a step-free path at each partner farm, paid from a small shared fund.",
      "Hladovina, mjesta za sjedenje i staza bez stepenica na svakom partnerskom gospodarstvu, iz malog zajedničkog fonda.",
    ),
    jobs: b("Extra income for family farms (OPG) outside the market season", "Dodatni prihod za OPG-ove izvan sezone prodaje"),
    image: "/img/mandarins.jpg",
  },
  {
    id: "ston",
    title: b("Walk on the Ston walls", "Šetnja Stonskim zidinama"),
    place: b("Ston and Mali Ston, Pelješac", "Ston i Mali Ston, Pelješac"),
    when: b("All year, best from October to May when it is cool", "Cijele godine, najbolje od listopada do svibnja kad nije vruće"),
    text: b(
      "The longest fortification walls in Europe, between two small towns. In winter you walk them in the sun, without the summer heat.",
      "Najdulje obrambene zidine u Europi, između dva mala mjesta. Zimi se njima hoda na suncu, bez ljetne vrućine.",
    ),
    onGround: b(
      "Benches and a water point at the halfway tower, and a winter timetable so the walls stay open all year.",
      "Klupe i točka s vodom na pola puta i zimsko radno vrijeme da zidine budu otvorene cijele godine.",
    ),
    proposal: true,
  },
  {
    id: "lada",
    title: b("Lađa rowing", "Veslanje lađom"),
    place: b("Metković to Ploče, Neretva", "Od Metkovića do Ploča, Neretva"),
    when: b("Spring and autumn training days, plus a small autumn lađa weekend", "Proljetni i jesenski treninzi i mali jesenski vikend lađa"),
    text: b(
      "Row a traditional lađa with a local team that trains for the August Neretva Boat Marathon.",
      "Veslajte tradicionalnom lađom s lokalnom ekipom koja trenira za kolovoški Maraton lađa.",
    ),
    onGround: b("Guest seats on training days, with the rowing clubs as hosts.", "Mjesta za goste na treninzima, a domaćini su veslački klubovi."),
    jobs: b("Income for the rowing clubs", "Prihod za veslačke klubove"),
    proposal: true,
  },
];

export const healthOffers: Offer[] = [
  {
    id: "salt",
    title: b("Salt therapy (halotherapy) in Ston", "Haloterapija u Stonu"),
    place: b("Next to the Ston salt pans", "Uz stonsku solanu"),
    when: b("All year, indoors", "Cijele godine, u zatvorenom"),
    text: b(
      "A quiet salt room using salt from the Ston salt pans, one of the oldest working salt pans in Europe. A rest after the walk on the walls.",
      "Mirna slana soba sa solju iz stonske solane, jedne od najstarijih solana u Europi koje još rade. Odmor nakon šetnje zidinama.",
    ),
    onGround: b(
      "A new salt room in an existing building in Ston, run with the salt pans. Wellbeing only, no medical claims.",
      "Nova slana soba u postojećoj zgradi u Stonu, u suradnji sa solanom. Za dobrobit, bez medicinskih tvrdnji.",
    ),
    jobs: b("Year-round staff in Ston", "Zaposleni u Stonu cijele godine"),
    proposal: true,
  },
  {
    id: "pool",
    title: b("Heated hotel pools in Dubrovnik", "Grijani hotelski bazeni u Dubrovniku"),
    place: b("The partner hotel in Lapad", "Partnerski hotel u Lapadu"),
    when: b("October to May", "Listopad do svibnja"),
    text: b(
      "The guests' own hotel keeps its indoor pool heated in winter, with morning aqua fitness and evening swims.",
      "Hotel u kojem gosti odsjedaju drži unutarnji bazen grijanim i zimi, s jutarnjim aqua fitnessom i večernjim plivanjem.",
    ),
    onGround: b(
      "Pool open in winter under the hotel contract, and a physiotherapist 3 mornings a week. Residents can buy a pool pass.",
      "Bazen otvoren zimi po ugovoru s hotelom i fizioterapeut 3 jutra tjedno. Lokalni stanovnici mogu kupiti kartu za bazen.",
    ),
    jobs: b("Physiotherapist and pool staff in winter", "Fizioterapeut i osoblje bazena zimi"),
    image: "/img/lapad.jpg",
  },
  {
    id: "checkup",
    title: b("Preventive check-up", "Preventivni pregled"),
    place: b("Partner polyclinic in Dubrovnik", "Partnerska poliklinika u Dubrovniku"),
    when: b("All year, booked before arrival", "Cijele godine, dogovoreno prije dolaska"),
    text: b(
      "A morning check-up on day 2: blood tests, heart, skin and eyes. Results in the guest's language before the end of the stay.",
      "Jutarnji pregled 2. dana: krvne pretrage, srce, koža i oči. Nalazi na jeziku gosta prije kraja boravka.",
    ),
    onGround: b(
      "Fixed weekly slots for guests at a local polyclinic, so its winter calendar fills up.",
      "Stalni tjedni termini za goste u lokalnoj poliklinici, pa se njezin zimski raspored popuni.",
    ),
    jobs: b("Work for local doctors and nurses in the quiet months", "Posao za lokalne liječnike i medicinske sestre u mirnim mjesecima"),
  },
  {
    id: "watch",
    title: b("Smartwatch health plan", "Zdravstveni plan s pametnim satom"),
    place: b("Throughout the stay", "Tijekom cijelog boravka"),
    when: b("All year", "Cijele godine"),
    text: b(
      "Sleep, heart rate and steps set the daily plan: a longer canoe tour on a good day, the pool and the salt room on a tired one.",
      "San, puls i koraci određuju dnevni plan: dulja kanu tura u dobrom danu, bazen i slana soba u umornom.",
    ),
    onGround: b(
      "Watches to borrow at the hotel for guests who do not have one. Data stays with the guest unless they share it.",
      "Satovi za posudbu u hotelu za goste koji ga nemaju. Podaci ostaju gostu, osim ako ih sam ne podijeli.",
    ),
  },
  {
    id: "safety",
    title: b("Safety net if something goes wrong", "Sigurnosna mreža ako nešto pođe po zlu"),
    place: b("Hospital, transport, rehab at Kalos", "Bolnica, prijevoz, rehabilitacija u Kalosu"),
    when: b("All year", "Cijele godine"),
    text: b(
      "Active holidays carry some risk. If a guest falls, like Marta, the same programme organises the hospital, an adapted room and rehabilitation by the sea.",
      "Aktivni odmor nosi neki rizik. Ako gost padne, kao Marta, isti program organizira bolnicu, prilagođenu sobu i rehabilitaciju uz more.",
    ),
    onGround: b(
      "Adapted rooms kept free in the partner hotel, and a referral route to Kalos in Vela Luka.",
      "Prilagođene sobe koje partnerski hotel drži slobodnima i dogovoreni put upućivanja u Kalos u Veloj Luci.",
    ),
    image: "/img/vela-luka.jpg",
  },
];

// ---------- Calendar 365: date-bound traditions stretched into longer seasons ----------
export type CalendarItem = {
  month: number; // 1-12, when it starts
  months: Bi;
  title: Bi;
  place: Bi;
  today: Bi; // how it works now
  stretched: Bi; // how we stretch it
  kind: "tradition" | "harvest" | "nature" | "health";
  image?: string;
};

export const calendar: CalendarItem[] = [
  {
    month: 1,
    months: b("January to March", "Siječanj do ožujak"),
    title: b("Pruning and winter on the farm", "Rezidba i zima na selu"),
    place: b("Konavle, Pelješac", "Konavle, Pelješac"),
    today: b("Farm work with no visitors.", "Posao na imanju bez posjetitelja."),
    stretched: b(
      "Pruning mornings with olive and vine growers, winter village stays, birdwatching in the Neretva delta.",
      "Jutra rezidbe s maslinarima i vinogradarima, zimski boravak na selu, promatranje ptica u delti Neretve.",
    ),
    kind: "harvest",
    image: "/img/olives.jpg",
  },
  {
    month: 2,
    months: b("Early February, St. Blaise Week", "Početak veljače, Tjedan sv. Vlaha"),
    title: b("Feast of St. Blaise (Festa sv. Vlaha)", "Festa sv. Vlaha"),
    place: b("Dubrovnik, 3 February", "Dubrovnik, 3. veljače"),
    today: b(
      "Dubrovnik's patron saint festival, with processions, flags and the blessing of throats, on the UNESCO intangible heritage list. The main events last a few days.",
      "Festa zaštitnika Dubrovnika, s procesijama, barjacima i blagoslovom grla, na UNESCO-voj listi nematerijalne baštine. Glavni događaji traju nekoliko dana.",
    ),
    stretched: b(
      "A full St. Blaise Week: guided history walks, exhibitions of the relics and costumes, and traditional food tied to the feast.",
      "Cijeli Tjedan sv. Vlaha: vođene povijesne šetnje, izložbe relikvija i nošnji i tradicionalna hrana vezana uz Festu.",
    ),
    kind: "tradition",
    image: "/img/dubrovnik.jpg",
  },
  {
    month: 2,
    months: b("February to April", "Veljača do travanj"),
    title: b("Ston oyster trail", "Stonski put kamenica"),
    place: b("Mali Ston, Ston walls", "Mali Ston, Stonske zidine"),
    today: b(
      "Ston Oyster Days happen around St. Joseph's Day (19 March). Mali Ston oysters are best in the cool months.",
      "Dani malostonskih kamenica održavaju se oko Josipova (19. ožujka). Malostonske kamenice najbolje su u hladnijim mjesecima.",
    ),
    stretched: b(
      "A season-long oyster trail: farm boat tours, tastings, the walk on the Ston walls and the salt room.",
      "Put kamenica kroz cijelu sezonu: obilazak uzgajališta brodom, kušanja, šetnja Stonskim zidinama i slana soba.",
    ),
    kind: "tradition",
  },
  {
    month: 4,
    months: b("April to June, and September to October", "Travanj do lipanj i rujan do listopad"),
    title: b("Moreška and Kumpanija sword dances", "Viteški plesovi s mačevima: Moreška i Kumpanija"),
    place: b("Korčula town, Blato, Pupnat", "Grad Korčula, Blato, Pupnat"),
    today: b(
      "Moreška is tied to 29 July (St. Theodore) and runs only a couple of evenings a week in summer.",
      "Moreška je vezana uz 29. srpnja (sv. Todor) i izvodi se samo nekoliko večeri tjedno ljeti.",
    ),
    stretched: b(
      "Spring and autumn performances, open rehearsals, and a small dance and costume exhibition. The Kumpanija villages do the same.",
      "Proljetne i jesenske izvedbe, otvorene probe i mala izložba plesa i nošnji. Isto i sela s Kumpanijom.",
    ),
    kind: "tradition",
  },
  {
    month: 4,
    months: b("All year, once a month in winter", "Cijele godine, zimi jednom mjesečno"),
    title: b("Konavle folklore and silk", "Konavoski folklor i svila"),
    place: b("Čilipi, Konavle", "Čilipi, Konavle"),
    today: b(
      "Sunday folklore shows after Mass, mainly in the tourist season.",
      "Nedjeljni folklorni nastupi nakon mise, uglavnom u turističkoj sezoni.",
    ),
    stretched: b(
      "Monthly winter shows, embroidery workshops and the Konavle silk-making tradition, as a year-round cultural circuit.",
      "Mjesečni zimski nastupi, radionice veza i konavoska tradicija svilarstva, kao kulturna tura cijele godine.",
    ),
    kind: "tradition",
  },
  {
    month: 8,
    months: b("Training days in spring, lađa weekend in October", "Treninzi u proljeće, vikend lađa u listopadu"),
    title: b("Neretva Boat Marathon (Maraton lađa)", "Maraton lađa"),
    place: b("Metković to Ploče", "Od Metkovića do Ploča"),
    today: b("A one-day race in August, when the coast is already full.", "Utrka od jednog dana u kolovozu, kad je obala ionako puna."),
    stretched: b(
      "Lađa-rowing experiences, visits on training days and a smaller autumn lađa weekend.",
      "Veslanje lađom za goste, posjeti treninzima i manji jesenski vikend lađa.",
    ),
    kind: "tradition",
    image: "/img/neretva.jpg",
  },
  {
    month: 9,
    months: b("September to October", "Rujan do listopad"),
    title: b("Grape harvest", "Berba grožđa"),
    place: b("Pelješac, Konavle", "Pelješac, Konavle"),
    today: b("Wine events cluster around the harvest.", "Vinski događaji skupljeni su oko berbe."),
    stretched: b(
      "Harvest mornings now, and a winter and spring open cellars calendar for Plavac Mali, Dingač and Postup, paired with local food.",
      "Jutra berbe sada, a zimi i u proljeće kalendar otvorenih podruma za Plavac mali, Dingač i Postup, uz domaću hranu.",
    ),
    kind: "harvest",
    image: "/img/grapes.jpg",
  },
  {
    month: 10,
    months: b("October to November", "Listopad do studeni"),
    title: b("Mandarin harvest", "Berba mandarina"),
    place: b("Neretva valley", "Dolina Neretve"),
    today: b(
      "The harvest festival lasts a few days, but the picking season lasts weeks.",
      "Fešta berbe traje nekoliko dana, ali branje traje tjednima.",
    ),
    stretched: b(
      "Pick-your-own visits, farm stays and lađa trips through the delta for the whole harvest.",
      "Branje za goste, boravak na gospodarstvima i vožnje lađom kroz deltu tijekom cijele berbe.",
    ),
    kind: "harvest",
    image: "/img/mandarins.jpg",
  },
  {
    month: 10,
    months: b("October to December", "Listopad do prosinac"),
    title: b("Olive picking and the oil mill", "Branje maslina i uljara"),
    place: b("Pelješac, Korčula", "Pelješac, Korčula"),
    today: b("Family work, rarely open to visitors.", "Obiteljski posao, rijetko otvoren posjetiteljima."),
    stretched: b(
      "Picking with the family, the pressing at the mill and a tasting of the new oil.",
      "Branje s obitelji, prešanje u uljari i kušanje mladog ulja.",
    ),
    kind: "harvest",
    image: "/img/olives.jpg",
  },
  {
    month: 11,
    months: b("November to March", "Studeni do ožujak"),
    title: b("Winter health weeks", "Zimski zdravstveni tjedni"),
    place: b("Dubrovnik, Ston, Vela Luka", "Dubrovnik, Ston, Vela Luka"),
    today: b("Hotels close or run half empty.", "Hoteli se zatvaraju ili rade poluprazni."),
    stretched: b(
      "Heated pool, check-up, salt room and walks in the mild sun, built around the partner hotel.",
      "Grijani bazen, pregled, slana soba i šetnje na blagom suncu, oko partnerskog hotela.",
    ),
    kind: "health",
    image: "/img/lapad.jpg",
  },
];

// ---------- A sample 7-day Active & Health week (what Marta and Thomas booked) ----------
export const sampleWeek: { day: Bi; plan: Bi; pillar: "active" | "health" | "culture" }[] = [
  { day: b("Day 1", "1. dan"), plan: b("Arrival, partner hotel in Lapad, smartwatch set up, evening swim in the heated pool", "Dolazak, partnerski hotel u Lapadu, postavljanje pametnog sata, večernje plivanje u grijanom bazenu"), pillar: "health" },
  { day: b("Day 2", "2. dan"), plan: b("Preventive check-up in the morning, walk on the Lapad promenade", "Preventivni pregled ujutro, šetnja lapadskom šetnicom"), pillar: "health" },
  { day: b("Day 3", "3. dan"), plan: b("Neretva: sunrise photo safari by lađa, mandarin picking, lunch at a family farm", "Neretva: foto safari lađom u zoru, branje mandarina, ručak na OPG-u"), pillar: "active" },
  { day: b("Day 4", "4. dan"), plan: b("Dubrovnik city walls and Old Town history walk (Marta's fall happens here)", "Dubrovačke zidine i povijesna šetnja Starim gradom (ovdje Marta pada)"), pillar: "culture" },
  { day: b("Day 5", "5. dan"), plan: b("Canoe safari and birdwatching in the delta", "Kanu safari i promatranje ptica u delti"), pillar: "active" },
  { day: b("Day 6", "6. dan"), plan: b("Ston: walk on the walls, oyster tasting, salt room", "Ston: šetnja zidinama, kušanje kamenica, slana soba"), pillar: "health" },
  { day: b("Day 7", "7. dan"), plan: b("Konavle: folklore in Čilipi, silk workshop, farewell dinner", "Konavle: folklor u Čilipima, radionica svile, oproštajna večera"), pillar: "culture" },
];

// ---------- The partner hotel contract ----------
export const hotelDeal = {
  terms: [
    b("Guaranteed rooms for our guests from October to May, at an agreed rate", "Zajamčene sobe za naše goste od listopada do svibnja, po dogovorenoj cijeni"),
    b("Indoor pool heated and open all winter", "Unutarnji bazen grijan i otvoren cijelu zimu"),
    b("2 adapted ground-floor rooms always kept free for guests who get hurt", "2 prilagođene sobe u prizemlju uvijek slobodne za goste koji se ozlijede"),
    b("Breakfast early on excursion days, packed lunches, a meeting room for the check-up nurse", "Rani doručak na dane izleta, paketi za ručak, prostorija za medicinsku sestru"),
  ],
  weGet: [
    b("Safe, known accommodation for every client", "Siguran, provjeren smještaj za svakog klijenta"),
    b("A better margin on each package than with ad-hoc bookings", "Veća zarada po paketu nego kod pojedinačnih rezervacija"),
    b("One place to start every itinerary", "Jedno mjesto odakle kreće svaki itinerar"),
  ],
  hotelGets: [
    b("Guests in months it used to close", "Gosti u mjesecima kad se inače zatvarao"),
    b("Staff kept on all year, not only in summer", "Osoblje zaposleno cijele godine, ne samo ljeti"),
    b("A slow, safe start with off-season, before it opens fully all year", "Polagan i siguran početak rada izvan sezone prije nego otvori cijelu godinu"),
  ],
  phases: [
    { when: b("Winter 2026/27", "Zima 2026./27."), what: b("1 hotel, 10 rooms, 2 weeks a month", "1 hotel, 10 soba, 2 tjedna mjesečno") },
    { when: b("2027/28", "2027./28."), what: b("Same hotel, 25 rooms, every week from October to May", "Isti hotel, 25 soba, svaki tjedan od listopada do svibnja") },
    { when: b("2028+", "2028.+"), what: b("A second hotel in Ston or Korčula, open all year", "Drugi hotel u Stonu ili na Korčuli, otvoren cijele godine") },
  ],
};

// ---------- Local community, stakeholders, ecology ----------
export const jobs: { title: Bi; who: Bi }[] = [
  { title: b("Photo-safari and birdwatching guides", "Vodiči foto safarija i promatranja ptica"), who: b("Boatmen and young people from the Neretva valley, after a short course", "Lađari i mladi iz doline Neretve, nakon kratkog tečaja") },
  { title: b("Canoe guides", "Vodiči kanua"), who: b("Local outfitters and rowing clubs", "Lokalni pružatelji usluga i veslački klubovi") },
  { title: b("Farm hosts", "Domaćini na gospodarstvima"), who: b("Family farms (OPG) in the valley, Pelješac and Konavle", "OPG-ovi u dolini, na Pelješcu i u Konavlima") },
  { title: b("Physiotherapists, nurses, pool staff", "Fizioterapeuti, medicinske sestre, osoblje bazena"), who: b("Winter work that used to stop in October", "Zimski posao koji je prije završavao u listopadu") },
  { title: b("Salt room staff in Ston", "Osoblje slane sobe u Stonu"), who: b("Year-round jobs in a small town", "Posao cijele godine u malom mjestu") },
  { title: b("Folklore groups, dancers, silk and embroidery makers", "Folklorne skupine, plesači, svilari i vezilje"), who: b("Paid shows and workshops outside summer", "Plaćeni nastupi i radionice izvan ljeta") },
];

export const stakeholders: { name: Bi; role: Bi }[] = [
  { name: b("Partner hotel in Lapad", "Partnerski hotel u Lapadu"), role: b("Rooms, heated pool, base for every itinerary", "Sobe, grijani bazen, polazište svakog itinerara") },
  { name: b("Family farms (OPG)", "OPG-ovi"), role: b("Harvests, lunches, farm stays", "Berbe, ručkovi, boravak na imanju") },
  { name: b("Neretva boatmen and canoe outfitters", "Neretvanski lađari i pružatelji kanu tura"), role: b("Photo safari, canoe safari, birdwatching", "Foto safari, kanu safari, promatranje ptica") },
  { name: b("Ston salt pans, oyster farmers", "Stonska solana, uzgajivači kamenica"), role: b("Salt room, oyster trail", "Slana soba, put kamenica") },
  { name: b("Polyclinic and Opća bolnica Dubrovnik", "Poliklinika i Opća bolnica Dubrovnik"), role: b("Check-ups, and care when something goes wrong", "Pregledi i skrb kad nešto pođe po zlu") },
  { name: b("Kalos, Vela Luka", "Kalos, Vela Luka"), role: b("Rehabilitation by the sea", "Rehabilitacija uz more") },
  { name: b("Folklore groups, Moreška and Kumpanija", "Folklorne skupine, Moreška i Kumpanija"), role: b("Shows and workshops outside summer", "Nastupi i radionice izvan ljeta") },
  { name: b("Rowing clubs", "Veslački klubovi"), role: b("Lađa rowing for guests", "Veslanje lađom za goste") },
  { name: b("Tourist boards, city and county", "Turističke zajednice, grad i županija"), role: b("Event calendar, permits, co-funding", "Kalendar događanja, dozvole, sufinanciranje") },
  { name: b("Insurers", "Osiguravatelji"), role: b("Cover check-ups and the safety net", "Pokrivaju preglede i sigurnosnu mrežu") },
];

export const ecology: { risk: Bi; answer: Bi }[] = [
  { risk: b("Disturbing birds in the delta", "Uznemiravanje ptica u delti"), answer: b("Small groups, fixed routes and hides, no boats in nesting zones", "Male grupe, stalne rute i skrovišta, bez brodova u zonama gniježđenja") },
  { risk: b("New buildings", "Nova gradnja"), answer: b("None: we use existing hotels, farms and a building in Ston", "Nema je: koristimo postojeće hotele, imanja i zgradu u Stonu") },
  { risk: b("Energy for heated pools in winter", "Energija za grijane bazene zimi"), answer: b("Pool covers at night and solar or heat-pump heating as a contract goal", "Pokrivači bazena noću i grijanje sunčevom energijom ili dizalicom topline kao cilj ugovora") },
  { risk: b("Car traffic between sites", "Promet automobilima između lokacija"), answer: b("Shared minibus for each group, canoes and lađe on the water", "Zajednički minibus za grupu, kanui i lađe na vodi") },
  { risk: b("Summer overcrowding", "Ljetna prenapučenost"), answer: b("The same number of guests spread over 12 months", "Isti broj gostiju raspoređen na 12 mjeseci") },
  { risk: b("Food miles", "Hrana iz daleka"), answer: b("Meals from the farms on the itinerary", "Obroci s gospodarstava na itineraru") },
];
