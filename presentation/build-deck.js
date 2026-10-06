// Builds VitaNatura365-pitch.pptx (16:9, 11 slides, 6 minutes).
// Run from presentation/:  npm install  then  node build-deck.js
// Order follows the hackathon brief: what we change on the ground first, then audience,
// feasibility, nature, locals, stakeholders, money and marketing, and the jury's criteria.
const path = require("path");
const fs = require("fs");
const pptxgen = require("pptxgenjs");
const sharp = require("sharp");
const QRCode = require("qrcode");
const { applyTheme } = require("./apply_theme.js");

const SITE = "https://dk129213.github.io/VitaNatura/";
const IMG = path.join(__dirname, "..", "web", "public", "img");
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

// ---------- assets ----------
async function photo(name, w = 1600) {
  const buf = await sharp(path.join(IMG, name)).resize({ width: w, withoutEnlargement: true }).jpeg({ quality: 80 }).toBuffer();
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
  for (const n of ["opuzen-neretva", "neretva", "neretva-birds", "mandarins", "ston-walls", "mali-ston", "olives", "konavle", "mljet-lake-road", "elaphiti", "trsteno", "lapad"]) {
    P[n] = await photo(`${n}.jpg`);
  }
  const I = {};
  for (const n of ["hammer", "camera", "boat", "bird", "plant", "map-pin", "users-three", "leaf", "handshake", "coins", "megaphone", "first-aid",
    "baby", "calendar-dots", "lightbulb", "shield-check", "sparkle", "star", "arrows-clockwise", "trend-up", "compass", "globe", "heart", "briefcase", "bank", "recycle"]) {
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
  // A clickable "open on the site" link in the corner: the deck doubles as a menu of the live site.
  const siteLink = (slide, page, label) =>
    T(slide, [{ text: `${label}  →`, options: { hyperlink: { url: SITE + page, tooltip: SITE + page } } }], {
      x: W - M - 4, y: 0.52, w: 4, h: 0.35, fontSize: 13, color: C.text2, align: "right", bold: true,
    });

  // ---------- 1. Title ----------
  pres.addSection({ title: "Idea" });
  let s = pres.addSlide({ masterName: "DARK", sectionTitle: "Idea" });
  darkPhoto(s, P["opuzen-neretva"], 40);
  T(s, "AROUND DUBROVNIK · OCTOBER TO MAY", { x: M, y: 1.5, w: 8, h: 0.4, fontSize: 16, bold: true, color: "B8E6CF", charSpacing: 3 });
  T(s, "You travel.\nWe care.", { x: M, y: 2.0, w: 8.4, h: 2.7, fontSize: 80, bold: true, color: "FFFFFF", valign: "top", lineSpacingMultiple: 0.92 });
  T(s, "The Dubrovnik nobody shows you: the Neretva delta, Ston, Konavle and quiet islands, out of season.", {
    x: M, y: 4.8, w: 7.6, h: 0.9, fontSize: 20, color: "E3EEE8", valign: "top",
  });
  T(s, "VitaNatura 365 · Tourism 365 hackathon", { x: M, y: H - 0.9, w: 6, h: 0.4, fontSize: 14, color: "C9D6CF" });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 9.6, y: 2.1, w: 3.0, h: 3.45, rectRadius: 0.15, fill: { color: "FFFFFF" }, line: { type: "none" } });
  s.addImage({ data: QR_HOME, x: 9.85, y: 2.35, w: 2.5, h: 2.5, hyperlink: { url: SITE } });
  T(s, "Scan: see every tour", { x: 9.6, y: 4.95, w: 3.0, h: 0.4, fontSize: 14, bold: true, align: "center" });
  s.addNotes("20 s. Slogan first, then: we turn the countryside around Dubrovnik into a destination for the months it stands empty. The QR code opens the site, the jury can follow along on their phones.");

  // ---------- 2. The need ----------
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Idea" });
  s.addText("Full for 3 months. Empty for 6.", { placeholder: "title" });
  const needs = [
    [I["users-three"], "For the destination", "The Old Town is packed on cruise days in summer. From November to March hotels close and the region goes quiet."],
    [I.briefcase, "For the local community", "Boatmen, farms, guides and hotel staff lose their income for half the year. Young people leave the valley."],
    [I.compass, "What is already there", "A bird-filled delta, mandarin and olive harvests, Europe's longest walls, oysters at their best in winter, car-free islands."],
  ];
  needs.forEach(([ic, head, body], i) => {
    const y = 1.6 + i * 1.6;
    iconCircle(s, ic, M, y);
    T(s, head, { x: M + 0.9, y, w: 5.6, h: 0.4, fontSize: 19, bold: true });
    T(s, body, { x: M + 0.9, y: y + 0.42, w: 5.6, h: 1.0, fontSize: 15, color: C.accent5, valign: "top" });
  });
  cover(s, P.neretva, 7.4, 1.5, W - M - 7.4, 5.2, "Neretva delta");
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 7.65, y: 5.6, w: 4.8, h: 0.85, rectRadius: 0.1, fill: { color: HEX.dk1, transparency: 15 }, line: { type: "none" } });
  T(s, "The reasons to come exist. The destination just isn't set up for them.", { x: 7.85, y: 5.65, w: 4.4, h: 0.75, fontSize: 14, color: "FFFFFF", valign: "middle" });
  s.addNotes("35 s. The need, for both sides: seasonality hurts the city and the people around it. And the countryside already has what visitors want in winter.");

  // ---------- 3. The offer ----------
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Idea" });
  s.addText("10 tours, October to May. Kids welcome.", { placeholder: "title" });
  siteLink(s, "tours/", "All tours and prices");
  const tiles = [
    [P["opuzen-neretva"], "Neretva photo safari by lađa", "€45 · kids €25"],
    [P["neretva-birds"], "Birdwatching in the delta", "€30 · kids €15"],
    [P.mandarins, "Mandarin harvest and lunch", "€39 · kids €19"],
    [P["ston-walls"], "Ston walls, salt and oysters", "€65 · kids €30"],
    [P.konavle, "Konavle mills, folklore, silk", "€45 · kids €22"],
    [P["mljet-lake-road"], "Mljet National Park by bike", "€79 · kids €39"],
  ];
  tiles.forEach(([img, cap, price], i) => {
    const x = M + (i % 3) * 4.1;
    const y = 1.5 + Math.floor(i / 3) * 2.75;
    cover(s, img, x, y, 3.9, 2.0, cap);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + 2.25, y: y + 1.55, w: 1.55, h: 0.36, rectRadius: 0.18, fill: { color: "FFFFFF" }, line: { type: "none" } });
    T(s, price.split(" · ")[0], { x: x + 2.25, y: y + 1.55, w: 1.55, h: 0.36, fontSize: 13, bold: true, align: "center", valign: "middle" });
    T(s, cap, { x, y: y + 2.08, w: 3.9, h: 0.32, fontSize: 15, bold: true });
    T(s, price, { x, y: y + 2.38, w: 3.9, h: 0.28, fontSize: 12, color: C.accent5 });
  });
  s.addNotes("35 s. The content: ten tours away from the Old Town, every one open to children, every one with a realistic price checked against similar tours today. Plus a 7-night week with the partner hotel: €790 adult, €350 child.");

  // ---------- 4. What changes on the ground (most important point of the brief) ----------
  pres.addSection({ title: "On the ground" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "On the ground" });
  s.addText("Not an ad campaign: what we build", { placeholder: "title" });
  const builds = [
    [I.camera, "Photo hides at 3 viewpoints", "Neretva delta"],
    [I.boat, "2 canoe launch points with ramps", "Opuzen"],
    [I.bird, "Marked birdwatching route, boards in 4 languages", "Neretva delta"],
    [I["map-pin"], "Benches, water and winter hours on the Ston walls", "Ston"],
    [I.plant, "Shade, seats and step-free paths at partner farms", "Neretva, Pelješac"],
    [I.sparkle, "Monthly winter folklore show and silk workshop", "Čilipi, Konavle"],
    [I.compass, "Winter walking loops and a picnic shelter", "Koločep, Lopud"],
    [I["users-three"], "Local boatmen and youth certified as guides, with first aid", "Whole region"],
  ];
  builds.forEach(([ic, head, where], i) => {
    const x = M + (i % 2) * 6.1;
    const y = 1.5 + Math.floor(i / 2) * 1.25;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 5.9, h: 1.05, rectRadius: 0.12, fill: { color: C.background2 }, line: { type: "none" } });
    iconCircle(s, ic, x + 0.2, y + 0.2, 0.65);
    T(s, head, { x: x + 1.05, y: y + 0.14, w: 4.7, h: 0.5, fontSize: 15, bold: true, valign: "top" });
    T(s, where, { x: x + 1.05, y: y + 0.64, w: 4.7, h: 0.3, fontSize: 12, color: C.accent5 });
  });
  s.addNotes("45 s. The most important point of the brief: concrete changes, not marketing. Small, cheap, real things in places that exist today. Every one has a local owner.");

  // ---------- 5. Calendar 365 ----------
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "On the ground" });
  s.addText("Calendar 365: one-day festivals, stretched", { placeholder: "title" });
  siteLink(s, "calendar/", "Calendar 365");
  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  const rows = [
    ["Nature: photo safari, canoe, birds", [1, 2, 3, 4, 5, 10, 11, 12], false],
    ["Harvests", [10, 11, 12], false],
    ["Traditions", [1, 2, 3, 4, 5, 6, 9, 10, 11, 12], false],
    ["Islands and gardens", [1, 2, 3, 4, 5, 10, 11, 12], false],
    ["Summer tourism (already full)", [6, 7, 8, 9], true],
  ];
  const gx = M + 3.4;
  const cw = 0.68;
  months.forEach((m, i) => T(s, m, { x: gx + i * cw, y: 1.5, w: cw - 0.06, h: 0.3, fontSize: 12, color: C.accent5, align: "center" }));
  rows.forEach(([label, on, summer], r) => {
    const y = 1.85 + r * 0.42;
    T(s, label, { x: M, y, w: 3.3, h: 0.34, fontSize: 13, valign: "middle" });
    months.forEach((_, i) =>
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: gx + i * cw, y, w: cw - 0.06, h: 0.34, rectRadius: 0.05,
        fill: { color: on.includes(i + 1) ? (summer ? "B9C2BD" : HEX.dk2) : HEX.lt2 }, line: { type: "none" },
      }),
    );
  });
  const trad = [
    ["Feb", "St. Blaise (UNESCO)", "A week, with village day trips"],
    ["Feb to Apr", "Ston Oyster Days", "A season-long oyster trail"],
    ["Spring, autumn", "Moreška sword dance", "Shows outside July"],
    ["Oct to Nov", "Mandarin harvest", "Weeks of picking, not 3 days"],
  ];
  trad.forEach(([when, head, body], i) => {
    const x = M + i * 3.07;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 4.25, w: 2.9, h: 2.35, rectRadius: 0.12, fill: { color: C.background2 }, line: { type: "none" } });
    T(s, when, { x: x + 0.2, y: 4.4, w: 2.5, h: 0.3, fontSize: 12, color: C.text2, bold: true });
    T(s, head, { x: x + 0.2, y: 4.75, w: 2.5, h: 0.7, fontSize: 17, bold: true, valign: "top" });
    T(s, body, { x: x + 0.2, y: 5.5, w: 2.5, h: 0.9, fontSize: 14, color: C.accent5, valign: "top" });
  });
  s.addNotes("30 s. Diversity and adaptability: nature, harvests, traditions and islands cover every month outside summer. Traditions that last a day become weeks.");

  // ---------- 6. Who and the experience ----------
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "On the ground" });
  s.addText("For anyone who travels outside the summer", { placeholder: "title" });
  const who = [
    [I.baby, "Families", "Autumn, February and Easter school holidays. Every tour has a child price."],
    [I.heart, "Couples whose children have left home", "Time, savings and no school calendar."],
    [I["users-three"], "Grandparents with grandchildren", "Like Marta, Thomas and Lena, 9."],
  ];
  who.forEach(([ic, head, body], i) => {
    const y = 1.55 + i * 1.3;
    iconCircle(s, ic, M, y);
    T(s, head, { x: M + 0.9, y, w: 5.2, h: 0.4, fontSize: 18, bold: true });
    T(s, body, { x: M + 0.9, y: y + 0.42, w: 5.2, h: 0.7, fontSize: 15, color: C.accent5, valign: "top" });
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: M, y: 5.5, w: 5.9, h: 1.15, rectRadius: 0.12, fill: { color: C.text2 }, line: { type: "none" } });
  T(s, "Neretva and Ston week: 7 nights, 4 tours, transfers", { x: M + 0.25, y: 5.6, w: 5.5, h: 0.4, fontSize: 15, bold: true, color: "FFFFFF" });
  T(s, "€790 adult · €350 child", { x: M + 0.25, y: 6.0, w: 5.5, h: 0.5, fontSize: 24, bold: true, color: "B8E6CF" });
  cover(s, P.mandarins, 7.0, 1.5, 2.75, 2.5, "Mandarins");
  cover(s, P["mali-ston"], 9.95, 1.5, 2.75, 2.5, "Mali Ston");
  cover(s, P.elaphiti, 7.0, 4.2, 2.75, 2.45, "Lopud");
  cover(s, P.trsteno, 9.95, 4.2, 2.75, 2.45, "Trsteno");
  s.addNotes("30 s. Audience and experience: a slow, outdoor week with real local people, small groups, children welcome. One package makes it easy to book.");

  // ---------- 7. We care ----------
  pres.addSection({ title: "We care" });
  s = pres.addSlide({ masterName: "DARK", sectionTitle: "We care" });
  darkPhoto(s, P.neretva, 30);
  T(s, "WE CARE", { x: M, y: 0.7, w: 6, h: 0.4, fontSize: 16, bold: true, color: "B8E6CF", charSpacing: 3 });
  T(s, "Marta slips on the jetty. The holiday goes on.", { x: M, y: 1.15, w: 11, h: 0.9, fontSize: 34, bold: true, color: "FFFFFF" });
  const care = [
    ["08:40", "Falls on a wet jetty on the photo safari. Our guide gives first aid."],
    ["08:46", "No street address, Sunday, clinic closed: Vita finds the right hospital and sends GPS and her health card in Croatian."],
    ["08:50", "Guide drives her to Dubrovnik. Granddaughter Lena stays with the group."],
    ["Next days", "Sprain, not broken. Step-free room, seated tours instead of canoeing, airport assistance home."],
  ];
  care.forEach(([t, body], i) => {
    const y = 2.4 + i * 1.08;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: M, y, w: 8.6, h: 0.9, rectRadius: 0.1, fill: { color: HEX.dk1, transparency: 20 }, line: { type: "none" } });
    T(s, t, { x: M + 0.25, y, w: 1.5, h: 0.9, fontSize: 16, bold: true, color: "B8E6CF", valign: "middle" });
    T(s, body, { x: M + 1.8, y, w: 6.6, h: 0.9, fontSize: 15, color: "FFFFFF", valign: "middle" });
  });
  T(s, [{ text: "Try Marta's chat  →", options: { hyperlink: { url: SITE + "start/" } } }], {
    x: 9.6, y: 6.3, w: 3.2, h: 0.4, fontSize: 15, bold: true, color: "B8E6CF", align: "right",
  });
  s.addNotes("35 s. Uniqueness: rural tours far from help are exactly where tourists hesitate. Our guides have first aid and Vita handles the rest, so one accident doesn't end the trip. Health is a safety net, not the product.");

  // ---------- 8. Locals, partners, nature ----------
  pres.addSection({ title: "Feasibility" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Feasibility" });
  s.addText("Run by locals, light on nature", { placeholder: "title" });
  siteLink(s, "community/", "Locals and partners");
  const cols = [
    [I.briefcase, "Local jobs", ["Boatmen and youth as guides", "Farm hosts and island families", "Folklore groups, embroiderers", "Drivers, hotel staff in winter"]],
    [I.handshake, "Stakeholders", ["Partner hotel in Lapad", "Family farms (OPG), outfitters", "Museum Metković, Ston salt works", "Tourist boards, Mljet NP, Trsteno"]],
    [I.leaf, "Nature", ["Groups of 8 in the delta, fixed routes", "No new buildings", "One shared minibus per group", "Island clean-ups with Green Sea Safari"]],
  ];
  cols.forEach(([ic, head, items], i) => {
    const x = M + i * 4.1;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.5, w: 3.9, h: 3.55, rectRadius: 0.15, fill: { color: C.background2 }, line: { type: "none" } });
    iconCircle(s, ic, x + 0.3, 1.7, 0.62);
    T(s, head, { x: x + 1.1, y: 1.78, w: 2.6, h: 0.5, fontSize: 21, bold: true });
    s.addText(
      items.map((t, j) => ({ text: t, options: { bullet: true, breakLine: j < items.length - 1 } })),
      { isTextBox: true, x: x + 0.3, y: 2.55, w: 3.4, h: 2.4, fontSize: 15, color: C.text1, paraSpaceAfter: 8, valign: "top", margin: 0 },
    );
    cover(s, [P.olives, P["mali-ston"], P["neretva-birds"]][i], x, 5.2, 3.9, 1.5, head);
  });
  s.addNotes("35 s. Sustainability and inclusion: locals earn from every tour, residents use the same paths and shows, and nature is protected by small groups and no new building.");

  // ---------- 9. Funding and marketing ----------
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Feasibility" });
  s.addText("€114,000 to start. Break-even in year 2.", { placeholder: "title" });
  siteLink(s, "plan/", "Full plan");
  iconCircle(s, I.bank, M, 1.5);
  T(s, "Who pays", { x: M + 0.85, y: 1.6, w: 5, h: 0.45, fontSize: 20, bold: true });
  const fund = [["EU and national tourism grants", 45], ["Founders and partner hotel", 25], ["County and tourist boards", 20], ["LAG / LEADER rural funds", 10]];
  fund.forEach(([label, share], i) => {
    const y = 2.35 + i * 0.72;
    T(s, label, { x: M, y, w: 4.6, h: 0.3, fontSize: 14 });
    T(s, `${share}%`, { x: M + 4.9, y, w: 0.8, h: 0.3, fontSize: 14, bold: true, align: "right" });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: M, y: y + 0.34, w: 5.7, h: 0.14, rectRadius: 0.07, fill: { color: HEX.lt2 }, line: { type: "none" } });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: M, y: y + 0.34, w: (5.7 * share) / 100, h: 0.14, rectRadius: 0.07, fill: { color: HEX.dk2 }, line: { type: "none" } });
  });
  T(s, "Earns from: 25% margin on tours, 21% on week packages, transfers. 600 guests in the pilot, 1,500 in year 2.", {
    x: M, y: 5.35, w: 5.7, h: 1.0, fontSize: 14, color: C.accent5, valign: "top",
  });
  iconCircle(s, I.megaphone, 7.0, 1.5);
  T(s, "How guests find us", { x: 7.85, y: 1.6, w: 5, h: 0.45, fontSize: 20, bold: true });
  const mk = [
    ["Summer guests come back", "Flyers and QR codes in Dubrovnik hotels: \"Come back in October.\""],
    ["Guests' own photos", "10 edited photos per photo safari, shared as #Neretva365"],
    ["Marketplaces and agencies", "GetYourGuide, Viator; family and senior agencies in AT and DE"],
    ["Fairs and press trips", "Ferien-Messe Wien, ITB Berlin, winter trips for bloggers"],
  ];
  mk.forEach(([head, body], i) => {
    const y = 2.35 + i * 1.0;
    T(s, head, { x: 7.0, y, w: 5.7, h: 0.35, fontSize: 15, bold: true });
    T(s, body, { x: 7.0, y: y + 0.36, w: 5.7, h: 0.55, fontSize: 13, color: C.accent5, valign: "top" });
  });
  s.addNotes("35 s. Feasibility: most of the €114,000 comes from grants and partners; we earn a margin on every tour and package. Marketing budget €20,000 in year 1, mostly online and turning summer guests into autumn guests.");

  // ---------- 10. Jury criteria ----------
  pres.addSection({ title: "Close" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Close" });
  s.addText("Why it works", { placeholder: "title" });
  const crit = [
    [I.compass, "Content", "10 priced tours, a week package, a calendar"],
    [I.lightbulb, "Innovation", "Photo safari by lađa, guides with first aid, help app"],
    [I["shield-check"], "Feasibility", "Existing places, real prices, one hotel to start"],
    [I.recycle, "Sustainability", "Small groups, no new buildings, local income"],
    [I["calendar-dots"], "Diversity", "Nature, harvests, heritage, islands"],
    [I.star, "Uniqueness", "The countryside nobody shows, with a safety net"],
    [I.heart, "Attractivity", "Mandarins, oysters, herons, kids welcome"],
    [I["arrows-clockwise"], "Adaptability", "Tours swap by season, weather or an injury"],
  ];
  crit.forEach(([ic, head, body], i) => {
    const x = M + (i % 4) * 3.07;
    const y = 1.5 + Math.floor(i / 4) * 2.6;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 2.9, h: 2.4, rectRadius: 0.12, fill: { color: C.background2 }, line: { type: "none" } });
    iconCircle(s, ic, x + 0.22, y + 0.22, 0.62);
    T(s, head, { x: x + 0.22, y: y + 0.98, w: 2.5, h: 0.4, fontSize: 18, bold: true });
    T(s, body, { x: x + 0.22, y: y + 1.42, w: 2.5, h: 0.85, fontSize: 15, color: C.accent5, valign: "top" });
  });
  s.addNotes("30 s. One line per jury criterion. Don't read them all: pick innovation, feasibility and uniqueness.");

  // ---------- 11. Closing ----------
  s = pres.addSlide({ masterName: "DARK", sectionTitle: "Close" });
  darkPhoto(s, P["ston-walls"], 35);
  T(s, "You travel.\nWe care.", { x: M, y: 1.6, w: 8, h: 2.6, fontSize: 76, bold: true, color: "FFFFFF", valign: "top", lineSpacingMultiple: 0.92 });
  T(s, "Around Dubrovnik, October to May. Kids welcome.", { x: M, y: 4.35, w: 8, h: 0.6, fontSize: 22, color: "E3EEE8" });
  T(s, "Thank you. Questions?", { x: M, y: 5.3, w: 6, h: 0.6, fontSize: 24, bold: true, color: "B8E6CF" });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 9.6, y: 2.0, w: 3.0, h: 3.45, rectRadius: 0.15, fill: { color: "FFFFFF" }, line: { type: "none" } });
  s.addImage({ data: QR_HOME, x: 9.85, y: 2.25, w: 2.5, h: 2.5, hyperlink: { url: SITE } });
  T(s, "dk129213.github.io/VitaNatura", { x: 9.6, y: 4.85, w: 3.0, h: 0.4, fontSize: 12, bold: true, align: "center" });
  s.addNotes("15 s, then questions. Repeat the slogan and point at the QR code. Likely questions: who pays for the hides (grants, 45%), is the photo safari new (yes, the boats exist, the format is new), what if it rains (indoor swaps: museum, oil mill, silk workshop).");

  const out = path.join(__dirname, "VitaNatura365-pitch.pptx");
  await pres.writeFile({ fileName: out });
  await applyTheme(out, THEME);
  console.log("Saved " + out);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
