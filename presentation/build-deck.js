// Builds VitaNatura365-pitch.pptx (16:9, 12 slides, 6 minutes).
// Run from presentation/:  npm install  then  node build-deck.js
// The story: we change the destination for year-round tourism (we are not a travel agency).
// Stretched events, new activities, the local community, audience, influencer marketing,
// the partner hotel, and the jury's criteria. No price list.
const path = require("path");
const fs = require("fs");
const pptxgen = require("pptxgenjs");
const sharp = require("sharp");
const QRCode = require("qrcode");
const { applyTheme } = require("./apply_theme.js");

const SITE = "https://dk129213.github.io/VitaNatura/";
const WEB_IMG = path.join(__dirname, "..", "web", "public", "img");
const DECK_IMG = path.join(__dirname, "img"); // photos used only in the deck
const ICONS = path.join(__dirname, "node_modules", "@phosphor-icons", "core", "assets", "duotone");

const THEME = {
  name: "VitaNatura",
  headFontFace: "Calibri",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "15201B", // ink
    lt1: "FFFFFF",
    dk2: "1D6B4F", // pine green, the one accent
    lt2: "EEF3EF", // pale green-grey for cards
    accent1: "1D6B4F",
    accent2: "5CC49A",
    accent3: "9A5B00",
    accent4: "B3261E",
    accent5: "66746D",
    accent6: "DCEFE5",
    hlink: "1D6B4F",
    folHlink: "47554E",
  },
};
const HEX = THEME.colors;
const W = 13.333;
const H = 7.5;
const M = 0.6;

// Photo credits shown on the closing slide (the CC licences require attribution).
const CREDITS =
  "Photos, Wikimedia Commons: Neretva at Opuzen, croatiatipscom (CC0); Neretva delta, Draceane (CC BY-SA 4.0); St. Blaise feast, Mariobonacic (public domain); " +
  "Mali Ston bay, Eranyo (CC BY 3.0); Fortifications at Ston, Tony Hisgett (CC BY 2.0); Grey heron, Ljeto (CC BY-SA 4.0); " +
  "Mandarins, SKas (CC BY-SA 4.0); Lapad, Jules Verne Times Two (CC BY 4.0).";

// ---------- assets ----------
async function photo(file, w = 1600) {
  const src = fs.existsSync(path.join(DECK_IMG, file)) ? path.join(DECK_IMG, file) : path.join(WEB_IMG, file);
  const buf = await sharp(src).resize({ width: w, withoutEnlargement: true }).jpeg({ quality: 80 }).toBuffer();
  const meta = await sharp(buf).metadata();
  return { data: "image/jpeg;base64," + buf.toString("base64"), ratio: meta.width / meta.height };
}
async function icon(name, color = HEX.dk2) {
  const svg = fs.readFileSync(path.join(ICONS, `${name}-duotone.svg`), "utf8").replace(/currentColor/g, "#" + color);
  const buf = await sharp(Buffer.from(svg)).resize(256, 256).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}
const qr = (url) => QRCode.toDataURL(url, { margin: 1, width: 600, color: { dark: "#15201B", light: "#FFFFFF" } });

// Crop an image to fill a box (object-fit: cover). anchorY: 0 keeps the top, 1 the bottom.
function cover(slide, img, x, y, w, h, objectName, anchorY = 0.5) {
  const boxRatio = w / h;
  const sizing =
    img.ratio > boxRatio
      ? { type: "crop", w, h, x: (h * img.ratio - w) / 2, y: 0 }
      : { type: "crop", w, h, x: 0, y: (w / img.ratio - h) * anchorY };
  const fullW = img.ratio > boxRatio ? h * img.ratio : w;
  const fullH = img.ratio > boxRatio ? h : w / img.ratio;
  slide.addImage({ data: img.data, x, y, w: fullW, h: fullH, sizing, objectName });
}

(async () => {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.title = "VitaNatura 365: You travel. We care.";
  pres.author = "VitaNatura 365 team";
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  const C = pres.SchemeColor;

  const P = {};
  for (const n of ["opuzen-neretva", "neretva", "neretva-birds", "mandarins", "ston-walls", "lapad", "st-blaise", "mali-ston-bay"]) {
    P[n] = await photo(`${n}.jpg`);
  }
  const I = {};
  for (const n of ["hammer", "camera", "bird", "users-three", "handshake", "baby", "calendar-dots", "lightbulb", "shield-check", "star",
    "arrows-clockwise", "compass", "heart", "briefcase", "recycle", "basket", "binoculars", "video-camera", "hand-heart", "buildings"]) {
    I[n] = await icon(n);
  }
  const QR_HOME = await qr(SITE);

  // ---------- layouts ----------
  pres.defineSlideMaster({
    title: "CONTENT",
    background: { color: "FFFFFF" },
    objects: [
      { text: { text: "VitaNatura 365 · You travel. We care.", options: { x: M, y: H - 0.5, w: 6, h: 0.3, fontSize: 10, color: HEX.accent5, margin: 0 } } },
      {
        placeholder: {
          options: { name: "title", type: "title", x: M, y: 0.45, w: W - 2 * M, h: 0.9, fontSize: 34, bold: true, color: C.text1, align: "left", valign: "top", margin: 0 },
          text: "",
        },
      },
    ],
    slideNumber: { x: W - M - 0.6, y: H - 0.5, w: 0.6, h: 0.3, fontSize: 10, color: HEX.accent5, align: "right" },
  });
  pres.defineSlideMaster({ title: "DARK", background: { color: HEX.dk1 } });

  function darkPhoto(slide, img, transparency = 35) {
    cover(slide, img, 0, 0, W, H, "Background photo");
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: W, h: H, fill: { color: HEX.dk1, transparency }, line: { type: "none" }, objectName: "Scrim" });
  }
  function iconCircle(slide, data, x, y, d = 0.62) {
    slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: C.accent6 }, line: { type: "none" } });
    slide.addImage({ data, x: x + d * 0.2, y: y + d * 0.2, w: d * 0.6, h: d * 0.6 });
  }
  const T = (slide, text, opts) => slide.addText(text, { isTextBox: true, margin: 0, color: C.text1, fontSize: 16, ...opts });
  const card = (slide, x, y, w, h, color = C.background2) =>
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.12, fill: { color }, line: { type: "none" } });
  const bullets = (slide, items, opts) =>
    slide.addText(
      items.map((t, j) => ({ text: t, options: { bullet: true, breakLine: j < items.length - 1 } })),
      { isTextBox: true, margin: 0, fontSize: 15, color: C.text1, paraSpaceAfter: 8, valign: "top", ...opts },
    );
  const label = (slide, text, x, y, color = C.accent5) =>
    T(slide, text, { x, y, w: 3.5, h: 0.3, fontSize: 12, bold: true, color, charSpacing: 2 });

  // ---------- 1. Title ----------
  pres.addSection({ title: "Idea" });
  let s = pres.addSlide({ masterName: "DARK", sectionTitle: "Idea" });
  darkPhoto(s, P["opuzen-neretva"], 40);
  T(s, "DUBROVNIK-NERETVA COUNTY · ALL YEAR", { x: M, y: 1.5, w: 8, h: 0.4, fontSize: 16, bold: true, color: "B8E6CF", charSpacing: 3 });
  T(s, "You travel.\nWe care.", { x: M, y: 2.0, w: 8.4, h: 2.7, fontSize: 80, bold: true, color: "FFFFFF", valign: "top", lineSpacingMultiple: 0.92 });
  T(s, "We change the region around Dubrovnik so it works for visitors and locals in every season, not only in summer.", {
    x: M, y: 4.8, w: 7.8, h: 0.9, fontSize: 20, color: "E3EEE8", valign: "top",
  });
  T(s, "VitaNatura 365 · Tourism 365 hackathon", { x: M, y: H - 0.9, w: 6, h: 0.4, fontSize: 14, color: "C9D6CF" });
  card(s, 9.6, 2.1, 3.0, 3.45, "FFFFFF");
  s.addImage({ data: QR_HOME, x: 9.85, y: 2.35, w: 2.5, h: 2.5, hyperlink: { url: SITE } });
  T(s, "Scan to follow along", { x: 9.6, y: 4.95, w: 3.0, h: 0.4, fontSize: 14, bold: true, align: "center" });
  s.addNotes("20 s. Slogan, then the one-sentence idea: we are not a travel agency, we change the destination itself. The QR code opens our site so the jury can follow on their phones.");

  // ---------- 2. The need ----------
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Idea" });
  s.addText("Full for 3 months. Empty for 6.", { placeholder: "title" });
  const needs = [
    [I["users-three"], "The destination", "In summer the Old Town is packed. From November to March hotels close and the region goes quiet."],
    [I.briefcase, "The local community", "Boatmen, farmers, guides and hotel staff lose their income for half the year. Young people leave the valley."],
    [I.compass, "What is already there", "A delta full of birds, mandarin and olive harvests, Ston's walls and oysters, feasts like St. Blaise. All at their best outside summer."],
  ];
  needs.forEach(([ic, head, body], i) => {
    const y = 1.6 + i * 1.6;
    iconCircle(s, ic, M, y);
    T(s, head, { x: M + 0.9, y, w: 5.6, h: 0.4, fontSize: 19, bold: true });
    T(s, body, { x: M + 0.9, y: y + 0.42, w: 5.6, h: 1.0, fontSize: 15, color: C.accent5, valign: "top" });
  });
  cover(s, P.neretva, 7.4, 1.5, W - M - 7.4, 5.2, "Neretva delta");
  card(s, 7.65, 5.6, 4.8, 0.85, HEX.dk1);
  T(s, "The reasons to come exist. The destination just isn't set up for them.", { x: 7.85, y: 5.65, w: 4.4, h: 0.75, fontSize: 14, color: "FFFFFF", valign: "middle" });
  s.addNotes("30 s. The need, for both sides: seasonality hurts the city and the people around it, and the region already has what visitors want outside summer.");

  // ---------- 3. Our idea ----------
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Idea" });
  s.addText("We change the destination, in three ways", { placeholder: "title" });
  const ways = [
    [I["calendar-dots"], P["st-blaise"], "1. Stretch the events", "One-day feasts become weeks of workshops and activities. St. Blaise and the Ston oysters first."],
    [I.binoculars, P["opuzen-neretva"], "2. New activities in the countryside", "Photo safari by lađa, birdwatching and harvests in the Neretva valley, Pelješac and Konavle."],
    [I.hammer, P["ston-walls"], "3. Small things we build", "Photo hides, canoe launch points, a birdwatching route, benches and winter hours on the Ston walls."],
  ];
  ways.forEach(([ic, img, head, body], i) => {
    const x = M + i * 4.1;
    card(s, x, 1.5, 3.9, 5.15);
    cover(s, img, x, 1.5, 3.9, 2.3, head, 0.3);
    iconCircle(s, ic, x + 0.25, 4.0, 0.6);
    T(s, head, { x: x + 0.25, y: 4.75, w: 3.4, h: 0.45, fontSize: 18, bold: true });
    T(s, body, { x: x + 0.25, y: 5.25, w: 3.4, h: 1.3, fontSize: 14, color: C.accent5, valign: "top" });
  });
  s.addNotes("30 s. The core of the brief: concrete changes on the ground, not marketing. Three kinds of change, explained on the next slides.");

  // ---------- 4. St. Blaise ----------
  pres.addSection({ title: "Changes" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Changes" });
  s.addText("St. Blaise: from one feast day to a festival week", { placeholder: "title" });
  cover(s, P["st-blaise"], M, 1.5, 4.0, 5.15, "St. Blaise feast, Dubrovnik", 0.3);
  card(s, 4.85, 1.5, 3.6, 5.15);
  label(s, "TODAY", 5.1, 1.7);
  T(s, "3 February", { x: 5.1, y: 2.05, w: 3.1, h: 0.5, fontSize: 24, bold: true });
  T(s, "Dubrovnik's patron saint feast, on the UNESCO intangible heritage list: processions, flags, the blessing of throats. Then everyone goes home.", {
    x: 5.1, y: 2.7, w: 3.1, h: 2.4, fontSize: 15, color: C.accent5, valign: "top",
  });
  card(s, 8.65, 1.5, W - M - 8.65, 5.15, HEX.accent6);
  label(s, "WITH US", 8.9, 1.7, C.text2);
  T(s, "St. Blaise Week, 3 to 9 Feb", { x: 8.9, y: 2.05, w: 3.7, h: 0.5, fontSize: 22, bold: true });
  bullets(s, [
    "3 Feb: the feast as it is today",
    "4 to 5 Feb: workshops in festive cooking, flag and costume making, and a children's day",
    "6 to 7 Feb: guided history walks and an exhibition of costumes and relics",
    "8 to 9 Feb: day trips to Konavle and Ston, where the villages host lunch",
  ], { x: 8.9, y: 2.7, w: 3.75, h: 3.8, fontSize: 14 });
  s.addNotes("35 s. Example one of stretching an event. The feast stays as it is; we add days after it, run by local associations, cooks, folklore groups and guides, who are paid. Visitors stay a week instead of a day, in February.");

  // ---------- 5. Ston oysters ----------
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Changes" });
  s.addText("Ston: from Oyster Days to an oyster season", { placeholder: "title" });
  card(s, M, 1.5, 3.6, 5.15);
  label(s, "TODAY", M + 0.25, 1.7);
  T(s, "A few days in March", { x: M + 0.25, y: 2.05, w: 3.1, h: 0.5, fontSize: 22, bold: true });
  T(s, "Ston Oyster Days happen around St. Joseph's Day (19 March). Yet Mali Ston oysters are at their best through the whole cool season.", {
    x: M + 0.25, y: 2.7, w: 3.1, h: 2.4, fontSize: 15, color: C.accent5, valign: "top",
  });
  card(s, 4.4, 1.5, 4.2, 5.15, HEX.accent6);
  label(s, "WITH US", 4.65, 1.7, C.text2);
  T(s, "Every weekend, Feb to Apr", { x: 4.65, y: 2.05, w: 3.8, h: 0.5, fontSize: 22, bold: true });
  bullets(s, [
    "Boat visits to the oyster farms in Mali Ston bay",
    "Shucking and cooking workshops with the farmers",
    "The salt works: how sea salt is made by hand",
    "A walk on the Ston walls, with new benches, water and winter opening hours",
    "Mussels and a bag of salt for the kids",
  ], { x: 4.65, y: 2.7, w: 3.75, h: 3.8, fontSize: 14 });
  cover(s, P["mali-ston-bay"], 8.8, 1.5, W - M - 8.8, 2.5, "Mali Ston bay");
  cover(s, P["ston-walls"], 8.8, 4.15, W - M - 8.8, 2.5, "Ston walls");
  s.addNotes("30 s. Example two. Same idea: a few festival days become a three-month season. Oyster farmers sell directly, restaurants open in winter, and the walls get benches and winter hours.");

  // ---------- 6. New activities ----------
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Changes" });
  s.addText("New in the Neretva valley, and what we build for it", { placeholder: "title" });
  const acts = [
    [P["opuzen-neretva"], I.camera, "Photo safari by lađa", "Sunrise trips through the channels with a local boatman and a photographer.", "We build: wooden photo hides at 3 viewpoints"],
    [P["neretva-birds"], I.bird, "Birdwatching", "Herons, cormorants and ducks winter in the delta, October to April.", "We build: a marked route with boards in 4 languages"],
    [P.mandarins, I.basket, "Harvests", "Mandarins and olives, October to December, picked with the families.", "We build: shade, seats and step-free paths on the farms"],
  ];
  acts.forEach(([img, ic, head, body, build], i) => {
    const x = M + i * 4.1;
    card(s, x, 1.5, 3.9, 5.15);
    cover(s, img, x, 1.5, 3.9, 2.2, head);
    iconCircle(s, ic, x + 0.25, 3.9, 0.58);
    T(s, head, { x: x + 1.0, y: 3.98, w: 2.8, h: 0.45, fontSize: 18, bold: true });
    T(s, body, { x: x + 0.25, y: 4.65, w: 3.4, h: 0.9, fontSize: 14, color: C.accent5, valign: "top" });
    card(s, x + 0.25, 5.6, 3.4, 0.85, "FFFFFF");
    T(s, build, { x: x + 0.4, y: 5.6, w: 3.1, h: 0.85, fontSize: 13, bold: true, color: C.text2, valign: "middle" });
  });
  s.addNotes("30 s. New activities in places tourists rarely see. Each one needs a small, concrete change on the ground: hides, a route, seating on the farms.");

  // ---------- 7. Local community ----------
  pres.addSection({ title: "People" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "People" });
  s.addText("Locals earn from it, and use it too", { placeholder: "title" });
  card(s, M, 1.5, 6.0, 5.15);
  iconCircle(s, I["video-camera"], M + 0.3, 1.75, 0.65);
  T(s, "The photo safari creates jobs", { x: M + 1.1, y: 1.85, w: 4.7, h: 0.45, fontSize: 19, bold: true });
  bullets(s, [
    "Boatmen become certified photo-safari guides, with a first-aid course",
    "Young people from the valley work as photographers and photo editors: every guest takes home edited photos",
    "Farm families serve breakfast after the sunrise trip",
    "Local drivers bring guests from Dubrovnik",
  ], { x: M + 0.3, y: 2.65, w: 5.4, h: 3.9, fontSize: 15 });
  card(s, 6.75, 1.5, W - M - 6.75, 3.1, HEX.accent6);
  iconCircle(s, I["hand-heart"], 7.05, 1.75, 0.65);
  T(s, "Harvests help the farms directly", { x: 7.85, y: 1.85, w: 4.4, h: 0.45, fontSize: 19, bold: true });
  bullets(s, [
    "Visitors help pick when farms are short of hands",
    "Families sell mandarins and oil straight to the guests, for about 3 times what wholesale buyers pay",
  ], { x: 7.05, y: 2.6, w: 5.2, h: 1.9, fontSize: 15 });
  card(s, 6.75, 4.8, W - M - 6.75, 1.85);
  iconCircle(s, I["users-three"], 7.05, 5.05, 0.6);
  T(s, "For residents too", { x: 7.8, y: 5.12, w: 4.4, h: 0.4, fontSize: 17, bold: true });
  T(s, "The hides, paths and benches are public, and the festival weeks are for locals as much as for guests.", {
    x: 7.8, y: 5.55, w: 4.6, h: 0.9, fontSize: 14, color: C.accent5, valign: "top",
  });
  s.addNotes("40 s. Inclusion and work. The photo safari is a new local product: boatmen, young photographers, farm breakfasts, drivers. Harvests are the most direct help: in 2026 buyers paid about €0.65 a kilo for mandarins while they sold for about €2 at market, so selling to guests triples the farm's income per kilo.");

  // ---------- 8. Target audience ----------
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "People" });
  s.addText("Who we bring: empty nesters first", { placeholder: "title" });
  card(s, M, 1.5, 6.6, 5.15, HEX.accent6);
  iconCircle(s, I.heart, M + 0.3, 1.8, 0.7);
  T(s, "Empty nesters, 50 to 65", { x: M + 1.2, y: 1.85, w: 5.2, h: 0.5, fontSize: 24, bold: true });
  T(s, "Their children have left home. Our main focus, because they:", { x: M + 0.3, y: 2.7, w: 6.0, h: 0.4, fontSize: 15, color: C.accent5 });
  bullets(s, [
    "Travel outside school holidays, so the off-season suits them",
    "Have time and savings, and stay longer",
    "Want culture, food and nature, at a slow pace",
    "Come back, and tell their friends",
  ], { x: M + 0.3, y: 3.2, w: 6.0, h: 3.2, fontSize: 16 });
  const also = [
    [I.baby, "Families", "Autumn, February and Easter school holidays. Every activity is open to children."],
    [I.binoculars, "Nature lovers", "Photographers and birdwatchers, October to April."],
  ];
  also.forEach(([ic, head, body], i) => {
    const y = 1.5 + i * 2.65;
    card(s, 7.45, y, W - M - 7.45, 2.5);
    iconCircle(s, ic, 7.7, y + 0.3, 0.6);
    T(s, "ALSO WELCOME", { x: 8.45, y: y + 0.32, w: 3.5, h: 0.25, fontSize: 11, bold: true, color: C.accent5, charSpacing: 2 });
    T(s, head, { x: 8.45, y: y + 0.58, w: 3.8, h: 0.4, fontSize: 19, bold: true });
    T(s, body, { x: 7.7, y: y + 1.2, w: 4.7, h: 1.1, fontSize: 15, color: C.accent5, valign: "top" });
  });
  s.addNotes("25 s. Everyone is welcome, but we focus on empty nesters: they are free to travel off-season and they stay longer.");

  // ---------- 9. Marketing: influencers ----------
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "People" });
  s.addText("Marketing: influencers who come and take part", { placeholder: "title" });
  const who = [
    [I.heart, "Slow travel, food and culture creators, 45+", "For empty nesters"],
    [I.baby, "Family travel creators", "For families"],
    [I.camera, "Wildlife and landscape photographers", "For nature lovers"],
  ];
  label(s, "WHO", M, 1.5);
  who.forEach(([ic, head, body], i) => {
    const y = 1.9 + i * 1.5;
    card(s, M, y, 5.4, 1.3);
    iconCircle(s, ic, M + 0.25, y + 0.33, 0.62);
    T(s, head, { x: M + 1.05, y: y + 0.22, w: 4.2, h: 0.6, fontSize: 16, bold: true, valign: "top" });
    T(s, body, { x: M + 1.05, y: y + 0.85, w: 4.2, h: 0.3, fontSize: 13, color: C.accent5 });
  });
  label(s, "HOW", 6.4, 1.5);
  const how = [
    ["Creator weeks", "We invite 6 to 8 creators to St. Blaise Week, the oyster season and the photo safari. They join the workshops, not a press tour."],
    ["Local faces", "They film the boatmen, oyster farmers and harvest families, so the story is about people, not ads."],
    ["Our markets", "Austria, Germany, the UK and Scandinavia, where off-season travel is common."],
    ["We measure it", "Every creator gets their own link: we count visits and bookings in February to April."],
  ];
  how.forEach(([head, body], i) => {
    const y = 1.9 + i * 1.15;
    s.addShape(pres.shapes.OVAL, { x: 6.4, y: y + 0.05, w: 0.42, h: 0.42, fill: { color: C.text2 }, line: { type: "none" } });
    T(s, String(i + 1), { x: 6.4, y: y + 0.05, w: 0.42, h: 0.42, fontSize: 14, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    T(s, head, { x: 7.0, y, w: 5.7, h: 0.35, fontSize: 16, bold: true });
    T(s, body, { x: 7.0, y: y + 0.36, w: 5.7, h: 0.75, fontSize: 13, color: C.accent5, valign: "top" });
  });
  s.addNotes("35 s. Marketing through influencers, matched to each audience. They come in the off-season, take part in the new events and show the local people behind them. First creator week: St. Blaise Week, February 2027.");

  // ---------- 10. Partner hotel ----------
  pres.addSection({ title: "Close" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Close" });
  s.addText("One partner hotel that stays open all winter", { placeholder: "title" });
  cover(s, P.lapad, M, 1.5, 5.6, 5.15, "Lapad bay");
  const hotel = [
    [I.buildings, "The deal", "A contract with one hotel in Lapad: rooms for our guests from October to May, family rooms, early breakfast on activity days."],
    [I.handshake, "What the hotel gets", "Guests in months it used to close, and staff kept on all year."],
    [I["arrows-clockwise"], "Step by step", "Winter 2026/27: 10 rooms. 2027/28: 25 rooms every week. Then a second hotel in Ston or the Neretva valley."],
  ];
  hotel.forEach(([ic, head, body], i) => {
    const y = 1.5 + i * 1.75;
    iconCircle(s, ic, 6.6, y);
    T(s, head, { x: 7.45, y, w: 5.2, h: 0.4, fontSize: 18, bold: true });
    T(s, body, { x: 7.45, y: y + 0.42, w: 5.2, h: 1.2, fontSize: 15, color: C.accent5, valign: "top" });
  });
  s.addNotes("25 s. Feasibility: one hotel is enough to start. It learns to work off-season with guests guaranteed, and keeps its staff.");

  // ---------- 11. Jury criteria ----------
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Close" });
  s.addText("Why it works", { placeholder: "title" });
  const crit = [
    [I.compass, "Content", "Festival weeks, oyster season, photo safari, harvests"],
    [I.lightbulb, "Innovation", "Stretching feasts into weeks; photo safari by lađa"],
    [I["shield-check"], "Feasibility", "Existing events and places, one hotel to start"],
    [I.recycle, "Sustainability", "Small groups, no new buildings, local income"],
    [I["calendar-dots"], "Diversity", "Culture, food, nature, harvests"],
    [I.star, "Uniqueness", "St. Blaise, Ston oysters and the Neretva exist only here"],
    [I.heart, "Attractivity", "Real people, real food, quiet places"],
    [I["arrows-clockwise"], "Adaptability", "The same model fits any feast or harvest"],
  ];
  crit.forEach(([ic, head, body], i) => {
    const x = M + (i % 4) * 3.07;
    const y = 1.5 + Math.floor(i / 4) * 2.6;
    card(s, x, y, 2.9, 2.4);
    iconCircle(s, ic, x + 0.22, y + 0.22, 0.62);
    T(s, head, { x: x + 0.22, y: y + 0.98, w: 2.5, h: 0.4, fontSize: 18, bold: true });
    T(s, body, { x: x + 0.22, y: y + 1.42, w: 2.5, h: 0.85, fontSize: 15, color: C.accent5, valign: "top" });
  });
  s.addNotes("25 s. One line per jury criterion. Don't read them all: highlight innovation, feasibility and uniqueness.");

  // ---------- 12. Closing ----------
  s = pres.addSlide({ masterName: "DARK", sectionTitle: "Close" });
  darkPhoto(s, P["ston-walls"], 35);
  T(s, "You travel.\nWe care.", { x: M, y: 1.4, w: 8, h: 2.6, fontSize: 76, bold: true, color: "FFFFFF", valign: "top", lineSpacingMultiple: 0.92 });
  T(s, "A region that works in every season, for visitors and for the people who live there.", { x: M, y: 4.15, w: 8, h: 0.9, fontSize: 21, color: "E3EEE8", valign: "top" });
  T(s, "Thank you. Questions?", { x: M, y: 5.2, w: 6, h: 0.6, fontSize: 24, bold: true, color: "B8E6CF" });
  card(s, 9.6, 1.9, 3.0, 3.45, "FFFFFF");
  s.addImage({ data: QR_HOME, x: 9.85, y: 2.15, w: 2.5, h: 2.5, hyperlink: { url: SITE } });
  T(s, "dk129213.github.io/VitaNatura", { x: 9.6, y: 4.75, w: 3.0, h: 0.4, fontSize: 12, bold: true, align: "center" });
  T(s, CREDITS, { x: M, y: H - 0.85, w: W - 2 * M, h: 0.6, fontSize: 8, color: "C9D6CF", valign: "bottom" });
  s.addNotes("15 s, then questions. Likely questions: who pays for the hides and benches (tourism grants, the county and tourist boards, partners), who runs the workshops (local associations and families, paid per event), what if it rains (indoor workshops, the oil mill, the salt works).");

  const out = path.join(__dirname, "VitaNatura365-pitch.pptx");
  await pres.writeFile({ fileName: out });
  await applyTheme(out, THEME);
  console.log("Saved " + out);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
