// Builds VitaNatura365-pitch.pptx (16:9, 8 slides, 6 minutes, 3 speakers with 2 slides each).
// Run from presentation/:  npm install  then  node build-deck.js
//
// Design rules (from the academic-pptx and presentation-master skills):
// - every title is a full sentence stating the point; read in order, the titles tell the story
// - about 40 words of body text per slide at most, one main visual, lots of white space
// - white content slides, one font, one accent colour; photos only, no decorative icons
// - the closing slide is a conclusion that stays up during questions, with the only QR code
const path = require("path");
const fs = require("fs");
const pptxgen = require("pptxgenjs");
const sharp = require("sharp");
const QRCode = require("qrcode");
const { applyTheme } = require("./apply_theme.js");

const SITE = "https://dk129213.github.io/VitaNatura/";
const WEB_IMG = path.join(__dirname, "..", "web", "public", "img");
const DECK_IMG = path.join(__dirname, "img"); // photos used only in the deck

const THEME = {
  name: "VitaNatura",
  headFontFace: "Calibri",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "15201B", // ink
    lt1: "FFFFFF",
    dk2: "1D6B4F", // pine green, the one accent
    lt2: "EEF3EF", // pale green-grey for panels
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

// The CC licences require attribution; shown small on the closing slide.
const CREDITS =
  "Photos, Wikimedia Commons: Neretva at Opuzen, croatiatipscom (CC0); St. Blaise feast, Mariobonacic (public domain); Mali Ston bay, Eranyo (CC BY 3.0); " +
  "Fortifications at Ston, Tony Hisgett (CC BY 2.0); Neretva delta, Draceane (CC BY-SA 4.0); Mandarins, SKas (CC BY-SA 4.0); Olives, Anna.Massini (CC BY-SA 4.0).";

async function photo(file, w = 1800) {
  const src = fs.existsSync(path.join(DECK_IMG, file)) ? path.join(DECK_IMG, file) : path.join(WEB_IMG, file);
  const buf = await sharp(src).resize({ width: w, withoutEnlargement: true }).jpeg({ quality: 80 }).toBuffer();
  const meta = await sharp(buf).metadata();
  return { data: "image/jpeg;base64," + buf.toString("base64"), ratio: meta.width / meta.height };
}

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
  for (const n of ["opuzen-neretva", "neretva", "mandarins", "olives", "ston-walls", "st-blaise", "mali-ston-bay"]) P[n] = await photo(`${n}.jpg`);
  const QR = await QRCode.toDataURL(SITE, { margin: 1, width: 600, color: { dark: "#15201B", light: "#FFFFFF" } });

  pres.defineSlideMaster({
    title: "CONTENT",
    background: { color: "FFFFFF" },
    objects: [
      {
        placeholder: {
          options: { name: "title", type: "title", x: M, y: 0.5, w: W - 2 * M, h: 1.0, fontSize: 30, bold: true, color: C.text1, align: "left", valign: "top", margin: 0 },
          text: "",
        },
      },
    ],
    slideNumber: { x: W - M - 0.6, y: H - 0.5, w: 0.6, h: 0.3, fontSize: 11, color: HEX.accent5, align: "right" },
  });
  pres.defineSlideMaster({ title: "DARK", background: { color: HEX.dk1 } });

  const T = (slide, text, opts) => slide.addText(text, { isTextBox: true, margin: 0, color: C.text1, fontSize: 20, ...opts });
  const panel = (slide, x, y, w, h, color = C.background2) =>
    slide.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color }, line: { type: "none" } });
  const small = (slide, text, x, y, w, color = C.accent5) =>
    T(slide, text.toUpperCase(), { x, y, w, h: 0.3, fontSize: 13, bold: true, color, charSpacing: 2 });
  // Short bullet list. Body text stays at 18-20 pt so it reads from the back of the room.
  const list = (slide, items, opts) =>
    slide.addText(
      items.map((t, j) => ({ text: t, options: { bullet: true, breakLine: j < items.length - 1 } })),
      { isTextBox: true, margin: 0, fontSize: 19, color: C.text1, paraSpaceAfter: 10, valign: "top", ...opts },
    );
  const darkPhoto = (slide, img, transparency) => {
    cover(slide, img, 0, 0, W, H, "Background photo");
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: W, h: H, fill: { color: HEX.dk1, transparency }, line: { type: "none" } });
  };

  // ---------- 1. Intro ----------
  let s = pres.addSlide({ masterName: "DARK" });
  darkPhoto(s, P["opuzen-neretva"], 38);
  T(s, "DUBROVNIK-NERETVA COUNTY · ALL YEAR", { x: M, y: 1.7, w: 9, h: 0.4, fontSize: 16, bold: true, color: "B8E6CF", charSpacing: 3 });
  T(s, "You travel.\nWe care.", { x: M, y: 2.2, w: 10, h: 2.7, fontSize: 84, bold: true, color: "FFFFFF", valign: "top", lineSpacingMultiple: 0.92 });
  T(s, "We change the region around Dubrovnik so it works in every season, for visitors and for the people who live there.", {
    x: M, y: 5.0, w: 8.5, h: 1.0, fontSize: 22, color: "E3EEE8", valign: "top",
  });
  s.addNotes("Intro, about 20 s. Slogan, then one sentence: we are not a travel agency; we change the destination itself so it works all year.");

  // ---------- 2. Speaker 1: the need ----------
  s = pres.addSlide({ masterName: "CONTENT" });
  s.addText("The region is full for 3 months and empty for 6, though its best moments come in winter", { placeholder: "title" });
  list(s, [
    "November to March: hotels close, locals lose their income",
    "Yet winter brings St. Blaise, Ston oysters, birds in the delta and the mandarin harvest",
    "The reasons to come exist. The destination isn't set up for them",
  ], { x: M, y: 2.0, w: 5.9, h: 4.6 });
  cover(s, P.neretva, 7.0, 1.85, W - M - 7.0, 4.9, "Neretva delta");
  s.addNotes("Speaker 1, about 45 s. The need for both the destination and the local community. Everything we propose builds on what is already here.");

  // ---------- 3. Speaker 1: stretch the events ----------
  s = pres.addSlide({ masterName: "CONTENT" });
  s.addText("We stretch one-day feasts into weeks that local people run", { placeholder: "title" });
  const events = [
    [P["st-blaise"], "St. Blaise", "3 February only", "St. Blaise Week, 3 to 9 Feb: cooking, flag and costume workshops, history walks, village day trips", 0.3],
    [P["mali-ston-bay"], "Ston oysters", "A few days in March", "Every weekend, Feb to Apr: oyster farm boats, cooking workshops, the salt works and the walls", 0.5],
  ];
  events.forEach(([img, name, today, after, anchor], i) => {
    const x = M + i * 6.17;
    cover(s, img, x, 1.85, 5.9, 2.2, name, anchor);
    small(s, `${name} · today`, x, 4.25, 5.9);
    T(s, today, { x, y: 4.6, w: 5.9, h: 0.4, fontSize: 19, color: C.accent5 });
    small(s, "With us", x, 5.2, 5.9, C.text2);
    T(s, after, { x, y: 5.55, w: 5.9, h: 1.2, fontSize: 19, valign: "top" });
  });
  s.addNotes("Speaker 1, about 45 s. Two examples. The feast and the festival stay as they are; we add days after them, run by local associations, cooks, folklore groups and oyster farmers, who are paid. Visitors stay a week in February instead of a day.");

  // ---------- 4. Speaker 2: new activities ----------
  s = pres.addSlide({ masterName: "CONTENT" });
  s.addText("New activities in the countryside need only small, concrete changes on the ground", { placeholder: "title" });
  cover(s, P["opuzen-neretva"], M, 1.85, 5.6, 4.9, "Photo safari by lađa, Opuzen");
  const builds = [
    ["Photo safari by lađa", "Wooden photo hides at 3 viewpoints"],
    ["Birdwatching, Oct to Apr", "A marked route with boards in 4 languages"],
    ["Mandarin and olive harvests", "Shade, seats and paths on the farms"],
    ["Ston walls in winter", "Benches, water and winter opening hours"],
  ];
  small(s, "Activity", 6.6, 1.9, 2.9);
  small(s, "What we build", 9.6, 1.9, 3.1, C.text2);
  builds.forEach(([act, build], i) => {
    const y = 2.35 + i * 1.08;
    s.addShape(pres.shapes.LINE, { x: 6.6, y: y - 0.12, w: W - M - 6.6, h: 0, line: { color: "D5DDD8", width: 1 } });
    T(s, act, { x: 6.6, y, w: 2.9, h: 0.85, fontSize: 18, bold: true, valign: "top" });
    T(s, build, { x: 9.6, y, w: W - M - 9.6, h: 0.85, fontSize: 18, valign: "top" });
  });
  s.addNotes("Speaker 2, about 45 s. The most important point of the brief: concrete enhancements, not marketing. Each activity uses a place that exists today and needs only a small build.");

  // ---------- 5. Speaker 2: local community ----------
  s = pres.addSlide({ masterName: "CONTENT" });
  s.addText("Local people earn from every activity, and harvests help farms directly", { placeholder: "title" });
  panel(s, M, 1.85, 5.9, 4.9);
  small(s, "Photo safari creates jobs", M + 0.35, 2.1, 5.2, C.text2);
  list(s, [
    "Boatmen become certified guides",
    "Young locals work as photographers and photo editors",
    "Farm families serve breakfast",
    "Local drivers bring guests",
  ], { x: M + 0.35, y: 2.6, w: 5.2, h: 3.9 });
  cover(s, P.mandarins, 6.75, 1.85, W - M - 6.75, 2.3, "Mandarins");
  small(s, "Harvests help farms", 6.75, 4.35, W - M - 6.75, C.text2);
  list(s, [
    "Visitors help pick when farms lack hands",
    "Families sell fruit and oil straight to guests, for about 3 times the wholesale price",
  ], { x: 6.75, y: 4.8, w: W - M - 6.75, h: 1.9 });
  s.addNotes("Speaker 2, about 45 s. Inclusion of the local community. In 2026 buyers paid about €0.65 a kilo for Neretva mandarins while they sold for about €2 at market, so selling to guests triples the farm's income per kilo. Residents also use the hides, paths and festival weeks.");

  // ---------- 6. Speaker 3: audience and marketing ----------
  s = pres.addSlide({ masterName: "CONTENT" });
  s.addText("We bring empty nesters first, through influencers who join the events", { placeholder: "title" });
  panel(s, M, 1.85, 5.9, 2.75, HEX.accent6);
  cover(s, P.olives, M, 4.75, 5.9, 2.0, "Olive harvest");
  small(s, "Who", M + 0.35, 2.1, 5.2, C.text2);
  T(s, "Empty nesters, 50 to 65", { x: M + 0.35, y: 2.5, w: 5.2, h: 0.5, fontSize: 24, bold: true });
  T(s, "Free to travel off-season, they stay longer and come back. Families and nature lovers are welcome too.", {
    x: M + 0.35, y: 3.1, w: 5.2, h: 1.4, fontSize: 18, color: C.accent5, valign: "top",
  });
  small(s, "How: influencers", 6.75, 2.1, W - M - 6.75, C.text2);
  list(s, [
    "Slow-travel, food and photo creators, 45+",
    "Invited to St. Blaise Week, oyster season and the photo safari",
    "They film the boatmen, farmers and cooks",
    "Own links show the bookings",
  ], { x: 6.75, y: 2.6, w: W - M - 6.75, h: 4.1 });
  s.addNotes("Speaker 3, about 45 s. Target audience and marketing. Main markets: Austria, Germany, the UK and Scandinavia. Family travel creators and wildlife photographers reach the other groups. First creator week: St. Blaise Week, February 2027.");

  // ---------- 7. Speaker 3: EU funds and feasibility ----------
  s = pres.addSlide({ masterName: "CONTENT" });
  s.addText("EU funds can cover 80 to 85% of what we build, so it is realistic to start now", { placeholder: "title" });
  const funds = [
    ["Programme Competitiveness and Cohesion", "€40M call for public tourism infrastructure", "85%", "Hides, routes, benches; the municipality applies"],
    ["Interreg Italy-Croatia", "€34.5M for culture and tourism", "80%", "Festival weeks, guide training"],
    ["EU rural development (CAP)", "Up to €200,000 per farm", "50-85%", "Farm seating, paths, tasting rooms"],
  ];
  funds.forEach(([name, size, rate, use], i) => {
    const y = 1.95 + i * 1.18;
    s.addShape(pres.shapes.LINE, { x: M, y: y - 0.12, w: 8.0, h: 0, line: { color: "D5DDD8", width: 1 } });
    T(s, rate, { x: M, y, w: 1.6, h: 0.9, fontSize: 30, bold: true, color: C.text2, valign: "top" });
    T(s, name, { x: M + 1.7, y, w: 6.3, h: 0.4, fontSize: 18, bold: true });
    T(s, `${size} · ${use}`, { x: M + 1.7, y: y + 0.42, w: 6.3, h: 0.5, fontSize: 15, color: C.accent5 });
  });
  panel(s, 9.0, 1.85, W - M - 9.0, 4.9, HEX.accent6);
  small(s, "Feasible", 9.3, 2.1, 3.3, C.text2);
  list(s, [
    "Uses events, places and people that exist",
    "Small builds, no new buildings",
    "One partner hotel open in winter to start",
    "Pilot in winter 2026/27",
  ], { x: 9.3, y: 2.6, w: W - M - 9.3, h: 4.0, fontSize: 18 });
  T(s, "Sources: Ministry of Tourism and Sport; Interreg Italy-Croatia 2021-2027; CAP Strategic Plan 2023-2027, intervention 73.14.", {
    x: M, y: 5.6, w: 8.0, h: 0.6, fontSize: 12, color: C.accent5, valign: "top",
  });
  s.addNotes("Speaker 3, about 50 s. Funding and feasibility. Municipalities such as Opuzen, Ston and Metković apply to the 85% infrastructure call; we join an Interreg partnership (80%) for the festival weeks and training; farms apply for CAP 73.14 themselves. Smaller sources: LAG Neretva (€10,000 to €25,000 per project), the Ministry's competitiveness call for hotels and farms (up to 70%), and the tourist boards for events.");

  // ---------- 8. Closing with the QR code ----------
  s = pres.addSlide({ masterName: "DARK" });
  darkPhoto(s, P["ston-walls"], 30);
  T(s, "You travel. We care.", { x: M, y: 1.3, w: 8.5, h: 1.0, fontSize: 54, bold: true, color: "FFFFFF" });
  s.addText(
    [
      { text: "Feasts become festival weeks", options: { bullet: true, breakLine: true } },
      { text: "The countryside gets small, real changes", options: { bullet: true, breakLine: true } },
      { text: "Locals earn all year", options: { bullet: true, breakLine: true } },
      { text: "EU funds cover most of it", options: { bullet: true } },
    ],
    { isTextBox: true, x: M, y: 2.6, w: 8.0, h: 2.6, fontSize: 24, color: "FFFFFF", paraSpaceAfter: 12, valign: "top", margin: 0 },
  );
  T(s, "Questions?", { x: M, y: 5.4, w: 6, h: 0.6, fontSize: 26, bold: true, color: "B8E6CF" });
  s.addShape(pres.shapes.RECTANGLE, { x: 9.5, y: 1.6, w: 3.2, h: 3.75, fill: { color: "FFFFFF" }, line: { type: "none" } });
  s.addImage({ data: QR, x: 9.75, y: 1.85, w: 2.7, h: 2.7, hyperlink: { url: SITE } });
  T(s, "Scan to explore the website", { x: 9.5, y: 4.7, w: 3.2, h: 0.45, fontSize: 14, bold: true, align: "center" });
  T(s, CREDITS, { x: M, y: H - 0.8, w: W - 2 * M, h: 0.55, fontSize: 8, color: "C9D6CF", valign: "bottom" });
  s.addNotes("Closing, about 15 s, then questions. Leave this slide up during Q&A so the jury can scan the QR code. Likely questions: who runs the workshops (local associations and families, paid per event), what if it rains (indoor workshops, the oil mill, the salt works).");

  const out = path.join(__dirname, "VitaNatura365-pitch.pptx");
  await pres.writeFile({ fileName: out });
  await applyTheme(out, THEME);
  console.log("Saved " + out);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
