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
      "Hi, I'm Vita. You travel, we care: I organise help, transport and stays so you don't have to call around.",
      "Tell me what happened, in any language.",
    ],
    replies: [
      {
        label: "I slipped on the steps of the city walls in Dubrovnik. My right ankle is swollen and I can't stand on it.",
        next: "safety",
        patch: {
          situation: "Slipped on the steps of the city walls, right ankle swollen, cannot stand on it",
          location: "Dubrovnik Old Town",
        },
      },
    ],
    freeTextNext: "safety",
    freeTextPatch: (t) => ({ situation: t, location: "Dubrovnik Old Town" }),
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
      "Please call 112 now. Tell them you are on the city walls near the Minčeta tower. I'm sharing your location in the call screen.",
      "Keep the leg still. The ambulance will meet you at Pile Gate, because no cars can enter the Old Town.",
    ],
    replies: [{ label: "OK, help is on the way", next: "later", patch: { companion: "Husband, ambulance from Pile Gate" } }],
  },
  er: {
    id: "er",
    bot: [
      "Thanks. Not being able to stand on it means this needs an X-ray today, not a pharmacy.",
      "The Old Town is car-free and full of steps, so I've asked the walls staff for a carry chair down to Pile Gate. From there Opća bolnica Dubrovnik is about 6 minutes by car.",
      "Shall I order an ambulance or a taxi to Pile Gate?",
    ],
    replies: [
      { label: "A taxi is fine", next: "later", patch: { companion: "Husband, taxi from Pile Gate" } },
      { label: "Ambulance, please", next: "later", patch: { companion: "Husband, ambulance from Pile Gate" } },
    ],
  },
  later: {
    id: "later",
    bot: [
      "Done. I've sent your health passport to the emergency department in Croatian: penicillin allergy and your regular medication.",
      "Your European Health Insurance Card covers necessary care in public hospitals here, on the same terms as for locals.",
    ],
    replies: [
      {
        label: "The X-ray shows a fractured ankle. They want to operate in the next few days. We live in Vienna. Can I have it done here?",
        next: "decide",
        patch: {
          injury: "Right ankle fracture, splinted at Opća bolnica Dubrovnik. Surgery advised within days",
          destination: "Surgery in Dubrovnik, then home to Vienna",
          goal: "Surgery and recovery in Croatia, flight home when cleared",
        },
      },
    ],
  },
  decide: {
    id: "decide",
    bot: [
      "Yes. Flying 1,100 km with an unstable fracture is not ideal, so the team suggests operating here. I'll compare the options and plan the recovery around it.",
      "Two questions about getting around. Are you allowed to put any weight on the right leg?",
    ],
    replies: [
      { label: "No, none at all", next: "stairs", patch: { weightBearing: "None on the right leg" } },
      { label: "A little, with crutches", next: "stairs", patch: { weightBearing: "Partial, with crutches" } },
    ],
  },
  stairs: {
    id: "stairs",
    bot: ["Can you manage steps, for example into a bus or up to a hotel room?"],
    replies: [
      { label: "No", next: "health", patch: { stairs: "Cannot manage steps", mobilityCode: "WCHS" } },
      { label: "A few, slowly", next: "health", patch: { stairs: "A few steps with help", mobilityCode: "WCHR" } },
    ],
  },
  health: {
    id: "health",
    bot: ["Last one. Any conditions, allergies or regular medication the doctors should know about?"],
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
      "Your mobility code for airlines is WCHS: you can move a short distance with help, but not steps. Your hotel is inside the Old Town with steps everywhere, so I'm looking for a step-free place in Lapad.",
      "Your plan covers the surgery, the moves, recovery, rehabilitation by the sea and the flight home.",
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
      { label: "Twisted my ankle on the city walls. Very swollen, I can't stand on it.", next: "q1" },
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
      "Not being able to bear weight after a fall is a common reason for an X-ray. Nearest: Opća bolnica Dubrovnik, about 6 minutes from Pile Gate. Keep the ankle raised and cool.",
      "This is guidance, not a diagnosis. If pain gets much worse or toes go numb, call 112.",
    ],
    replies: [],
  },
  pharmacy: {
    id: "pharmacy",
    bot: [
      "Recommended: pharmacy. There is one on Placa, inside the Old Town. A pharmacist can help with after-sun care and pain relief.",
      "If you get a high fever, confusion or vomiting, go to the tourist clinic or an emergency department.",
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
      "I've marked today as yellow and sent a short summary to Dr. Horvat's team at the hospital, with this morning's wound photo.",
      "They usually reply within 2 hours. If you get a fever above 38 °C or the redness spreads, call the clinic or 112.",
    ],
    replies: [],
  },
  better: {
    id: "better",
    bot: ["Good progress. Your short walk in the garden is unlocked for today. Keep the leg raised afterwards."],
    replies: [],
  },
};
