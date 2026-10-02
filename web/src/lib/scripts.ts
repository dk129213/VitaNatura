import type { Profile } from "./store";

// Scripted conversations for the demo. No model is called: every reply is written here,
// so the pitch runs the same way every time and works offline.

export type Reply = {
  label: string;
  next: string;
  patch?: Partial<Profile>;
  tone?: "danger";
};

export type ChatNode = {
  id: string;
  bot: string[];
  replies: Reply[];
  // When set, free typing is allowed and moves to this node.
  freeTextNext?: string;
  freeTextPatch?: (text: string) => Partial<Profile>;
  end?: { label: string; href: string };
};

export type Script = Record<string, ChatNode> & { start: ChatNode };

export const intakeScript: Script = {
  start: {
    id: "start",
    bot: [
      "Hi, I'm Vita. I organise care, transport and stays so you don't have to call around.",
      "Tell me what happened, in your own words.",
    ],
    replies: [
      {
        label: "I slipped on a trail in Paklenica. My right ankle is swollen and I can't stand on it.",
        next: "safety",
        patch: {
          situation: "Slipped on a hiking trail, right ankle swollen, cannot stand on it",
          location: "Paklenica National Park",
        },
      },
    ],
    freeTextNext: "safety",
    freeTextPatch: (t) => ({ situation: t, location: "Paklenica National Park" }),
  },
  safety: {
    id: "safety",
    bot: [
      "I'm sorry, that sounds painful. First, a quick safety check.",
      "Is there heavy bleeding, bone visible through the skin, numb or cold toes, or are you alone?",
    ],
    replies: [
      { label: "No, my husband is with me", next: "er", patch: { companion: "Husband" } },
      { label: "Yes, one of those", next: "call112", tone: "danger" },
    ],
  },
  call112: {
    id: "call112",
    bot: [
      "Please call 112 now. Tell them you are on the Velika Paklenica trail. I'm sharing your location in the call screen.",
      "Keep the leg still and stay warm. I'll stay here and prepare everything for the hospital.",
    ],
    replies: [{ label: "OK, help is on the way", next: "later", patch: { companion: "Mountain rescue" } }],
  },
  er: {
    id: "er",
    bot: [
      "Thanks. Not being able to stand on it means this needs an X-ray today, not a pharmacy.",
      "The nearest emergency department with X-ray is Opća bolnica Zadar, about 55 minutes by car. Starigrad has an outpatient clinic for first aid, but no X-ray.",
      "Can your husband drive you there?",
    ],
    replies: [
      { label: "Yes, we have the car here", next: "later", patch: { companion: "Husband, with a car" } },
      { label: "No, we came by bus", next: "taxi" },
    ],
  },
  taxi: {
    id: "taxi",
    bot: [
      "Then the safest option is 194, the ambulance service. If it's not urgent, I can book a taxi with a large rear seat from Starigrad, about 15 minutes away.",
    ],
    replies: [{ label: "Book the taxi", next: "later", patch: { companion: "Husband, taxi to hospital" } }],
  },
  later: {
    id: "later",
    bot: [
      "I've sent your health passport to the emergency department in Croatian: penicillin allergy and your regular medication.",
      "Let me know when you have news from the doctors.",
    ],
    replies: [
      {
        label: "The X-ray shows a fractured ankle. They put on a splint and want surgery within a week. I'd like it done in Zagreb, where I live.",
        next: "mobility",
        patch: {
          injury: "Right ankle fracture, splinted at Opća bolnica Zadar. Surgery advised within a week",
          destination: "Zagreb",
          goal: "Surgery and recovery in Zagreb, then rehabilitation",
        },
      },
    ],
  },
  mobility: {
    id: "mobility",
    bot: [
      "Understood. I'll plan the trip to Zagreb and the clinic. Two questions about getting around.",
      "Are you allowed to put any weight on the right leg?",
    ],
    replies: [
      { label: "No, none at all", next: "stairs", patch: { weightBearing: "None on the right leg" } },
      { label: "A little, with crutches", next: "stairs", patch: { weightBearing: "Partial, with crutches" } },
    ],
  },
  stairs: {
    id: "stairs",
    bot: ["Can you manage steps, for example into a bus or up to a flat?"],
    replies: [
      { label: "No", next: "health", patch: { stairs: "Cannot manage steps", mobilityCode: "WCHS" } },
      { label: "A few, slowly", next: "health", patch: { stairs: "A few steps with help", mobilityCode: "WCHR" } },
    ],
  },
  health: {
    id: "health",
    bot: [
      "Last one. Any conditions, allergies or regular medication the clinic should know about?",
    ],
    replies: [
      {
        label: "Hypothyroidism, I take levothyroxine. And I'm allergic to penicillin.",
        next: "done",
        patch: {
          conditions: "Hypothyroidism",
          allergies: "Penicillin",
          medication: "Levothyroxine 75 mcg",
        },
      },
    ],
  },
  done: {
    id: "done",
    bot: [
      "Thank you, Marta. Your profile is ready, and every part of the trip will use it.",
      "Your mobility code for airlines and rail is WCHS: you can walk a short distance with help, but not steps. I've also flagged that your own flat is on the 3rd floor with no lift.",
      "Your plan has five steps: transport, clinic, recovery, rehabilitation and, later, something nice.",
    ],
    replies: [],
    end: { label: "See my plan", href: "/journey" },
  },
};

export const triageScript: Script = {
  start: {
    id: "start",
    bot: ["Describe what you feel, in any language. I'll point you to the right kind of help."],
    replies: [
      { label: "Twisted my ankle on the trail. Very swollen, I can't stand on it.", next: "q1" },
      { label: "Bad sunburn and a headache", next: "pharmacy" },
      { label: "Chest pain and short of breath", next: "emergency", tone: "danger" },
    ],
    freeTextNext: "q1",
  },
  q1: {
    id: "q1",
    bot: ["Can you move your toes, and do they feel warm?"],
    replies: [
      { label: "Yes, they're fine", next: "er" },
      { label: "No, they're numb or cold", next: "emergency", tone: "danger" },
    ],
  },
  er: {
    id: "er",
    bot: [
      "Recommended: emergency department today.",
      "Not being able to bear weight after a fall is a common reason for an X-ray. Nearest with X-ray: Opća bolnica Zadar. Keep the ankle raised and cool on the way.",
      "This is guidance, not a diagnosis. If pain gets much worse or toes go numb, call 112.",
    ],
    replies: [],
  },
  pharmacy: {
    id: "pharmacy",
    bot: [
      "Recommended: pharmacy. A pharmacist can help with after-sun care and pain relief.",
      "If you get a high fever, confusion or vomiting, go to an emergency department.",
    ],
    replies: [],
  },
  emergency: {
    id: "emergency",
    bot: ["Call 112 now. This needs emergency help. Your location is shared on the call screen."],
    replies: [],
  },
};

export const checkinScript: Script = {
  start: {
    id: "start",
    bot: ["Good morning, Marta. How are you today? How strong is the pain, from 1 to 10?"],
    replies: [
      { label: "About a 6, worse than yesterday", next: "worse" },
      { label: "A 3, getting better", next: "better" },
    ],
  },
  worse: {
    id: "worse",
    bot: ["Thanks for telling me. Is the skin around the wound warmer or redder than yesterday? Any fever?"],
    replies: [{ label: "A bit redder at the bottom. No fever.", next: "flag" }],
  },
  flag: {
    id: "flag",
    bot: [
      "I've marked today as yellow and sent a short summary to Dr. Horvat's team, with this morning's wound photo.",
      "They usually reply within 2 hours. If you get a fever above 38 °C or the redness spreads, call the clinic or 112.",
    ],
    replies: [],
  },
  better: {
    id: "better",
    bot: ["Good progress. Your short walk in the courtyard is unlocked for today. Keep the leg raised afterwards."],
    replies: [],
  },
};
