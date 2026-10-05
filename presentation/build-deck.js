// Builds VitaNatura365-pitch.pptx (16:9, 10 slides, about 8 minutes with the live demo).
// Run from presentation/:  npm install  then  node build-deck.js
const path = require("path");
const fs = require("fs");
const pptxgen = require("pptxgenjs");
const sharp = require("sharp");
const QRCode = require("qrcode");
const { applyTheme } = require("./apply_theme.js");

const APP_URL = "https://dk129213.github.io/VitaNatura/";
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
    lt2: "EEF3EF", // pale green-grey tint for cards
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
async function qr() {
  return QRCode.toDataURL(APP_URL, { margin: 1, width: 600, color: { dark: "#15201B", light: "#FFFFFF" } });
}

// Crop an image to fill a box (object-fit: cover).
// anchorY: 0 = keep the top, 0.5 = centre, 1 = keep the bottom.
function cover(slide, img, x, y, w, h, objectName, anchorY = 0.5) {
  const boxRatio = w / h;
  const sizing =
    img.ratio > boxRatio
      ? { type: "crop", w, h, x: ((h * img.ratio - w) / 2), y: 0 }
      : { type: "crop", w, h, x: 0, y: (w / img.ratio - h) * anchorY };
  const fullW = img.ratio > boxRatio ? h * img.ratio : w;
  const fullH = img.ratio > boxRatio ? h : w / img.ratio;
  slide.addImage({ data: img.data, x, y, w: fullW, h: fullH, sizing, objectName });
}

(async () => {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.title = "VitaNatura 365";
  pres.author = "VitaNatura 365 team";
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  const C = pres.SchemeColor;

  const P = {
    dubrovnik: await photo("dubrovnik.jpg"),
    walls: await photo("dubrovnik-walls.jpg"),
    lapad: await photo("lapad.jpg"),
    spa: await photo("spa.jpg", 1200),
    mandarins: await photo("mandarins.jpg", 900),
    grapes: await photo("grapes.jpg", 900),
    olives: await photo("olives.jpg", 900),
    elaphiti: await photo("elaphiti.jpg", 900),
    velaLuka: await photo("vela-luka.jpg", 1200),
  };
  const I = {};
  for (const n of ["translate", "wheelchair", "hospital", "first-aid", "heartbeat", "tree", "basket", "user-circle",
    "map-pin", "cloud-sun", "scales", "shield-check", "currency-eur", "rocket-launch", "handshake", "leaf", "check-circle"]) {
    I[n] = await icon(n);
  }
  const QR = await qr();

  // ---------- layouts ----------
  pres.defineSlideMaster({
    title: "CONTENT",
    background: { color: "FFFFFF" },
    objects: [
      { text: { text: "VitaNatura 365", options: { x: M, y: H - 0.5, w: 4, h: 0.3, fontSize: 10, color: HEX.accent5, margin: 0 } } },
      {
        placeholder: {
          options: { name: "title", type: "title", x: M, y: 0.45, w: W - 2 * M, h: 0.9, fontSize: 36, bold: true, color: C.text1, align: "left", valign: "top", margin: 0 },
          text: "",
        },
      },
    ],
    slideNumber: { x: W - M - 0.6, y: H - 0.5, w: 0.6, h: 0.3, fontSize: 10, color: HEX.accent5, align: "right" },
  });
  pres.defineSlideMaster({ title: "DARK", background: { color: HEX.dk1 } });

  // Full-bleed photo with a dark scrim so white text stays readable.
  function darkPhoto(slide, img) {
    cover(slide, img, 0, 0, W, H, "Background photo");
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: W, h: H, fill: { color: HEX.dk1, transparency: 35 }, line: { type: "none" }, objectName: "Scrim" });
  }
  function iconCircle(slide, data, x, y, d = 0.7) {
    slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: C.accent6 }, line: { type: "none" } });
    slide.addImage({ data, x: x + d * 0.2, y: y + d * 0.2, w: d * 0.6, h: d * 0.6 });
  }
  const T = (slide, text, opts) => slide.addText(text, { isTextBox: true, margin: 0, color: C.text1, fontSize: 16, ...opts });

  // ---------- 1. Title ----------
  pres.addSection({ title: "Intro" });
  let s = pres.addSlide({ masterName: "DARK", sectionTitle: "Intro" });
  darkPhoto(s, P.dubrovnik);
  T(s, "HEALTH IN YOUR POCKET", { x: M, y: 1.7, w: 8, h: 0.4, fontSize: 16, bold: true, color: "B8E6CF", charSpacing: 3 });
  T(s, "You travel.\nWe care.", { x: M, y: 2.2, w: 9, h: 2.6, fontSize: 72, bold: true, color: "FFFFFF", valign: "top", lineSpacingMultiple: 0.95 });
  T(s, "VitaNatura 365: one app for help on the road, treatment, recovery and time in nature, all year round.", {
    x: M, y: 4.9, w: 7.5, h: 0.9, fontSize: 20, color: "E3EEE8", valign: "top",
  });
  T(s, "Tourism 365 hackathon", { x: M, y: H - 0.9, w: 6, h: 0.4, fontSize: 14, color: "C9D6CF" });
  s.addNotes("About 30 seconds. Open with the slogan: You travel, we care. VitaNatura 365 is health in your pocket for every traveller in Croatia. Today we show it with one story set in Dubrovnik.");

  // ---------- 2. Problem ----------
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Intro" });
  s.addText("Today, the traveller is their own travel agent", { placeholder: "title" });
  const problems = [
    [I.translate, "Dozens of bookings, often in a foreign language", "Hospital, transport, accommodation and recovery are each arranged separately."],
    [I.wheelchair, "Is the trip even possible?", "Travellers with reduced mobility can't tell which flights, taxis and rooms work for them."],
    [I.hospital, "The clinic loses sight of the patient", "Once the patient leaves the hospital, nobody follows the recovery."],
  ];
  problems.forEach(([ic, head, body], i) => {
    const y = 1.75 + i * 1.3;
    iconCircle(s, ic, M, y);
    T(s, head, { x: M + 0.95, y, w: 5.6, h: 0.4, fontSize: 18, bold: true });
    T(s, body, { x: M + 0.95, y: y + 0.42, w: 5.6, h: 0.75, fontSize: 15, color: C.accent5, valign: "top" });
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: M, y: 5.7, w: 6.55, h: 0.95, rectRadius: 0.12, fill: { color: C.background2 }, line: { type: "none" } });
  T(s, "Meanwhile, spas, hotels and islands stand half empty from October to May, while the Old Town fills up on cruise days.", {
    x: M + 0.25, y: 5.75, w: 6.1, h: 0.85, fontSize: 15, valign: "middle",
  });
  cover(s, P.walls, 7.55, 1.75, W - M - 7.55, 4.9, "Dubrovnik photo");
  s.addNotes("About 45 seconds. The problem: the traveller becomes their own travel agent, in a foreign language, and people in a wheelchair often give up before they start. On the other side, Croatia has empty capacity outside the summer.");

  // ---------- 3. For every tourist ----------
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Intro" });
  s.addText("For every tourist, not only patients", { placeholder: "title" });
  const groups = [
    [P.dubrovnik, "When something goes wrong on the trip", "A fall, a fever, a toothache. Help nearby, in your language, and the rest of the trip rebuilt.", ["Nearest hospital, clinic or pharmacy", "112 and 194 in one tap", "Insurance and costs explained"]],
    [P.spa, "When the trip is for your health", "Dental work, orthopaedics, rehabilitation or a spa programme, planned with transport and a stay that fit.", ["Clinic matched to your needs", "Step-free transport and rooms", "Recovery followed after you leave"]],
  ];
  groups.forEach(([img, head, body, pts], i) => {
    const x = M + i * 6.17;
    const w = 5.9;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.6, w, h: 5.15, rectRadius: 0.15, fill: { color: C.background2 }, line: { type: "none" } });
    cover(s, img, x, 1.6, w, 2.1, head, img === P.spa ? 0.92 : 0.5);
    T(s, head, { x: x + 0.3, y: 3.9, w: w - 0.6, h: 0.45, fontSize: 20, bold: true });
    T(s, body, { x: x + 0.3, y: 4.38, w: w - 0.6, h: 0.75, fontSize: 15, color: C.accent5, valign: "top" });
    pts.forEach((p, j) => {
      s.addImage({ data: I["check-circle"], x: x + 0.3, y: 5.3 + j * 0.42, w: 0.3, h: 0.3 });
      T(s, p, { x: x + 0.75, y: 5.27 + j * 0.42, w: w - 1.05, h: 0.36, fontSize: 15 });
    });
  });
  s.addNotes("About 45 seconds. Two kinds of travellers use the same app: anyone whose trip goes wrong, and people who come to Croatia for a health trip on purpose. That includes travellers with reduced mobility, seniors and the people who travel with them.");

  // ---------- 4. Solution ----------
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Intro" });
  s.addText("One profile, six connected modules", { placeholder: "title" });
  s.addShape(pres.shapes.OVAL, { x: M + 0.35, y: 2.0, w: 3.6, h: 3.6, fill: { color: C.text2 }, line: { type: "none" } });
  s.addImage({ data: await icon("user-circle", "FFFFFF"), x: M + 1.65, y: 2.45, w: 1.0, h: 1.0 });
  T(s, "One profile", { x: M + 0.55, y: 3.5, w: 3.2, h: 0.5, fontSize: 24, bold: true, color: "FFFFFF", align: "center" });
  T(s, "Told once in the chat: needs, mobility, health", { x: M + 0.75, y: 4.0, w: 2.8, h: 0.9, fontSize: 15, color: "E3EEE8", align: "center", valign: "top" });
  const mods = [
    [I["first-aid"], "Help on the road", "Nearest care, 112, health passport"],
    [I.hospital, "Clinic and stay", "Right hospital, step-free room"],
    [I.wheelchair, "Accessible transport", "Every transfer checked for steps"],
    [I.heartbeat, "Recovery", "One daily summary for the doctor"],
    [I.tree, "Rehab and nature", "Spas and quiet islands, off-season"],
    [I.basket, "Crowd-free trips", "Harvests, farms, sea clean-ups"],
  ];
  mods.forEach(([ic, head, body], i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 5.15 + col * 2.57;
    const y = 1.75 + row * 2.5;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 2.37, h: 2.3, rectRadius: 0.12, fill: { color: C.background2 }, line: { type: "none" } });
    iconCircle(s, ic, x + 0.25, y + 0.25, 0.65);
    T(s, head, { x: x + 0.25, y: y + 1.0, w: 1.95, h: 0.45, fontSize: 16, bold: true });
    T(s, body, { x: x + 0.25, y: y + 1.45, w: 1.95, h: 0.7, fontSize: 14, color: C.accent5, valign: "top" });
  });
  s.addNotes("About 45 seconds. What the traveller says once in the chat is used everywhere. Example: the mobility code from the chat books airport assistance, and the recovery stage decides which paths and pools are unlocked.");

  // ---------- 5. Meet Marta ----------
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Intro" });
  s.addText("Meet Marta: one fall, one connected plan", { placeholder: "title" });
  T(s, "Marta, 54, a teacher from Vienna, slips on the Dubrovnik city walls in October.", { x: M, y: 1.45, w: 11, h: 0.5, fontSize: 18, color: C.accent5 });
  const steps = [
    ["4 Oct", "Fall on the city walls", "Carry chair to Pile Gate, ER in 6 min"],
    ["6 Oct", "Surgery in Dubrovnik", "Covered by her EHIC card"],
    ["8 Oct", "Step-free stay in Lapad", "Adapted taxi, ground floor"],
    ["October", "Recovery, monitored", "Watch data and a daily check-in"],
    ["2 - 15 Nov", "Rehab at Kalos", "Seawater pool on Korčula"],
    ["17 Nov", "Flight home", "Wheelchair at both airports"],
  ];
  const lineY = 3.05;
  s.addShape(pres.shapes.LINE, { x: M + 0.3, y: lineY, w: W - 2 * M - 0.6, h: 0, line: { color: HEX.accent2, width: 2 } });
  steps.forEach(([d, head, body], i) => {
    const x = M + i * 2.02;
    s.addShape(pres.shapes.OVAL, { x: x + 0.15, y: lineY - 0.17, w: 0.34, h: 0.34, fill: { color: i === 0 ? C.text2 : "FFFFFF" }, line: { color: HEX.dk2, width: 2 } });
    T(s, d, { x, y: 2.2, w: 1.9, h: 0.4, fontSize: 16, bold: true, color: C.text2 });
    T(s, head, { x, y: 3.45, w: 1.9, h: 0.75, fontSize: 16, bold: true, valign: "top" });
    T(s, body, { x, y: 4.2, w: 1.9, h: 0.75, fontSize: 14, color: C.accent5, valign: "top" });
  });
  cover(s, P.velaLuka, M, 5.25, 5.9, 1.5, "Vela Luka photo");
  cover(s, P.elaphiti, M + 6.2, 5.25, 5.9, 1.5, "Elaphiti islands photo");
  s.addNotes("About 30 seconds. This is the story you will see in the live demo. Real hospital, real routes, live weather. Then switch to the browser.");

  // ---------- 6. Live demo ----------
  pres.addSection({ title: "Demo" });
  s = pres.addSlide({ masterName: "DARK", sectionTitle: "Demo" });
  darkPhoto(s, P.lapad);
  T(s, "Live demo", { x: M, y: 2.2, w: 8, h: 1.3, fontSize: 66, bold: true, color: "FFFFFF" });
  T(s, "Follow Marta through the app, from the first message to the flight home.", { x: M, y: 3.6, w: 7, h: 0.9, fontSize: 20, color: "E3EEE8", valign: "top" });
  T(s, APP_URL.replace("https://", ""), { x: M, y: 4.8, w: 8, h: 0.5, fontSize: 18, bold: true, color: "B8E6CF" });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 9.2, y: 2.0, w: 3.3, h: 3.75, rectRadius: 0.15, fill: { color: "FFFFFF" }, line: { type: "none" } });
  s.addImage({ data: QR, x: 9.45, y: 2.25, w: 2.8, h: 2.8 });
  T(s, "Scan to try it", { x: 9.2, y: 5.12, w: 3.3, h: 0.45, fontSize: 15, bold: true, align: "center" });
  s.addNotes("About 4 minutes in the browser. Order: landing page, Profile chat (click the answers, profile fills in), My plan, Help on the road (map, tourist clinic, Croatian passport), Transport (flight home, assistance request), Recovery (click day 6), Rehab (live weather in Vela Luka), Crowd-free trips (harvests, Green Sea Safari). Click Restart demo in the sidebar before you start.");

  // ---------- 7. Real data ----------
  pres.addSection({ title: "Close" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Close" });
  s.addText("Built on real data, responsibly", { placeholder: "title" });
  const stats = [
    ["22", "health places around Dubrovnik", "OpenStreetMap"],
    ["6 min", "from Pile Gate to the emergency department", "OSRM routing"],
    ["Live", "weather, air quality and pollen", "Open-Meteo"],
    ["48 h", "notice that guarantees airport assistance", "EU Regulation 1107/2006"],
  ];
  stats.forEach(([big, label, src], i) => {
    const x = M + (i % 2) * 3.55;
    const y = 1.65 + Math.floor(i / 2) * 2.55;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 3.35, h: 2.35, rectRadius: 0.12, fill: { color: C.background2 }, line: { type: "none" } });
    T(s, big, { x: x + 0.3, y: y + 0.25, w: 2.8, h: 0.9, fontSize: 44, bold: true, color: C.text2 });
    T(s, label, { x: x + 0.3, y: y + 1.15, w: 2.8, h: 0.7, fontSize: 15, valign: "top" });
    T(s, src, { x: x + 0.3, y: y + 1.85, w: 2.8, h: 0.3, fontSize: 11, color: C.accent5 });
  });
  const rx = 7.95;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rx, y: 1.65, w: W - M - rx, h: 4.9, rectRadius: 0.12, fill: { color: C.text2 }, line: { type: "none" } });
  s.addImage({ data: await icon("shield-check", "FFFFFF"), x: rx + 0.35, y: 1.95, w: 0.6, h: 0.6 });
  T(s, "Responsible by design", { x: rx + 0.35, y: 2.7, w: 4.1, h: 0.5, fontSize: 20, bold: true, color: "FFFFFF" });
  s.addText(
    [
      { text: "Supports doctors and travellers, never diagnoses", options: { bullet: true, breakLine: true } },
      { text: "Every recommendation shows its reason and source", options: { bullet: true, breakLine: true } },
      { text: "Health data stays on the phone unless shared (GDPR)", options: { bullet: true, breakLine: true } },
      { text: "Designed for EU AI Act rules on high-risk health AI", options: { bullet: true } },
    ],
    { isTextBox: true, x: rx + 0.35, y: 3.3, w: 4.15, h: 3.0, fontSize: 15, color: "FFFFFF", paraSpaceAfter: 10, valign: "top", margin: 0 },
  );
  s.addNotes("About 45 seconds. Hospitals, routes and weather are real open data; prices and partners in the demo are labelled as samples. Health AI is high risk under the EU AI Act, so the app supports decisions and always shows its sources.");

  // ---------- 8. Why it matters ----------
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Close" });
  s.addText("Why it matters for Dubrovnik, all year", { placeholder: "title" });
  const why = [
    [I.leaf, "Longer stays outside July and August", "Recovery and rehab guests stay weeks, from October to May."],
    [I.handshake, "Money stays with local families", "Family farms, adapted taxis, spas and local guides."],
    [I["map-pin"], "Fewer people in the Old Town on cruise days", "Vita suggests the Neretva delta, Ston or Lokrum instead."],
  ];
  why.forEach(([ic, head, body], i) => {
    const y = 1.75 + i * 1.5;
    iconCircle(s, ic, M, y);
    T(s, head, { x: M + 0.95, y, w: 5.3, h: 0.45, fontSize: 18, bold: true });
    T(s, body, { x: M + 0.95, y: y + 0.45, w: 5.3, h: 0.75, fontSize: 15, color: C.accent5, valign: "top" });
  });
  const tiles = [[P.mandarins, "Mandarin harvest"], [P.grapes, "Grape harvest"], [P.olives, "Olive picking"], [P.elaphiti, "Green Sea Safari clean-ups"]];
  tiles.forEach(([img, cap], i) => {
    const x = 7.2 + (i % 2) * 2.85;
    const y = 1.6 + Math.floor(i / 2) * 2.6;
    cover(s, img, x, y, 2.65, 1.95, cap);
    T(s, cap, { x, y: y + 2.02, w: 2.65, h: 0.35, fontSize: 14, bold: true });
  });
  s.addNotes("About 45 seconds. This is the 365 part: a health and recovery guest comes outside the season, stays longer and spends locally. Partners include family farms, rehab centres and projects like Green Sea Safari.");

  // ---------- 9. Business and next steps ----------
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Close" });
  s.addText("How it earns, and what comes next", { placeholder: "title" });
  iconCircle(s, I["currency-eur"], M, 1.7);
  T(s, "How it earns", { x: M + 0.95, y: 1.82, w: 4.5, h: 0.45, fontSize: 20, bold: true });
  s.addText(
    [
      { text: "Commission on clinic, rehab and stay bookings", options: { bullet: true, breakLine: true } },
      { text: "Partner fees from adapted transport and hotels", options: { bullet: true, breakLine: true } },
      { text: "B2B: insurers and hotels offer the safety net to their guests", options: { bullet: true, breakLine: true } },
      { text: "Free for travellers in an emergency", options: { bullet: true } },
    ],
    { isTextBox: true, x: M, y: 2.7, w: 5.6, h: 3.6, fontSize: 16, color: C.text1, paraSpaceAfter: 12, valign: "top", margin: 0 },
  );
  iconCircle(s, I["rocket-launch"], 7.0, 1.7);
  T(s, "Next steps", { x: 7.95, y: 1.82, w: 4.5, h: 0.45, fontSize: 20, bold: true });
  const next = [
    "Pilot in Dubrovnik with a rehab centre, adapted taxis and local farms",
    "Real AI chatbot in Croatian, English and German",
    "Live flight and transfer booking through official APIs",
    "Dashboard for doctors with the daily recovery summaries",
  ];
  next.forEach((t, i) => {
    const y = 2.7 + i * 0.95;
    s.addShape(pres.shapes.OVAL, { x: 7.0, y, w: 0.5, h: 0.5, fill: { color: C.text2 }, line: { type: "none" } });
    T(s, String(i + 1), { x: 7.0, y, w: 0.5, h: 0.5, fontSize: 16, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    T(s, t, { x: 7.7, y: y - 0.05, w: 5.0, h: 0.75, fontSize: 16, valign: "top" });
  });
  s.addNotes("About 45 seconds. Revenue comes from partners and B2B, so the traveller in trouble never pays for help. Next: a pilot in Dubrovnik and a real multilingual AI assistant.");

  // ---------- 10. Closing ----------
  s = pres.addSlide({ masterName: "DARK", sectionTitle: "Close" });
  darkPhoto(s, P.walls);
  T(s, "You travel.\nWe care.", { x: M, y: 1.7, w: 8, h: 2.6, fontSize: 72, bold: true, color: "FFFFFF", valign: "top", lineSpacingMultiple: 0.95 });
  T(s, "Health in your pocket, for every traveller in Croatia.", { x: M, y: 4.4, w: 7.5, h: 0.6, fontSize: 22, color: "E3EEE8" });
  T(s, "Thank you", { x: M, y: 5.4, w: 6, h: 0.6, fontSize: 24, bold: true, color: "B8E6CF" });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 9.2, y: 2.0, w: 3.3, h: 3.75, rectRadius: 0.15, fill: { color: "FFFFFF" }, line: { type: "none" } });
  s.addImage({ data: QR, x: 9.45, y: 2.25, w: 2.8, h: 2.8 });
  T(s, "dk129213.github.io/VitaNatura", { x: 9.2, y: 5.12, w: 3.3, h: 0.45, fontSize: 13, bold: true, align: "center" });
  s.addNotes("About 20 seconds, then questions. Repeat the slogan, point to the QR code so the jury can try the app on their phones.");

  const out = path.join(__dirname, "VitaNatura365-pitch.pptx");
  await pres.writeFile({ fileName: out });
  await applyTheme(out, THEME);
  console.log("Saved " + out);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
