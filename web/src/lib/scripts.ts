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
      "Hi, I'm Vita. You travel, we care. If something goes wrong on a tour, I find help and rearrange the rest of your trip.",
      "Tell me what happened, in any language.",
    ],
    replies: [
      {
        label: "I slipped on the wet jetty getting off the boat in the Neretva delta. My right ankle is swollen and I can't stand on it.",
        next: "safety",
        patch: {
          situation: "Slipped on a wet jetty getting off the lađa, right ankle swollen, cannot stand on it",
          location: "Lađa jetty, Opuzen (GPS 43.0141, 17.5636)",
        },
      },
    ],
    freeTextNext: "safety",
    freeTextPatch: (t) => ({ situation: t, location: "Lađa jetty, Opuzen (GPS 43.0141, 17.5636)" }),
  },
  safety: {
    id: "safety",
    bot: [
      "I'm sorry. First, a quick safety check.",
      "Is there heavy bleeding, bone visible through the skin, or are your toes numb or cold?",
    ],
    replies: [
      { label: "No. Our guide is with me and has raised my leg.", next: "where", patch: { companion: "Husband Thomas, granddaughter Lena (9), our guide" } },
      { label: "Yes, one of those", next: "call112", tone: "danger" },
    ],
  },
  call112: {
    id: "call112",
    bot: [
      "Please call 112 now. The jetty has no street address, so I've put your exact GPS position on the call screen. Read it out: 43.0141 north, 17.5636 east.",
      "Keep the leg still. Your guide will meet the ambulance at the road above the jetty.",
    ],
    replies: [{ label: "OK, help is on the way", next: "family" }],
  },
  where: {
    id: "where",
    bot: [
      "Thanks. Not being able to stand on it means you need an X-ray today.",
      "It's Sunday, so the Opuzen clinic is closed. The nearest emergency department with X-ray is Opća bolnica Dubrovnik, about 1 h 40 min by car. Your guide can drive you there now.",
    ],
    replies: [{ label: "Yes, please. What about my granddaughter?", next: "family", patch: { plan: "X-ray at Opća bolnica Dubrovnik today" } }],
  },
  family: {
    id: "family",
    bot: [
      "Lena can stay with the group and finish the photo safari. She'll come back to the hotel in our shared minibus at 13:00, and Thomas can choose to stay with her or go with you.",
      "I've sent your health passport to the hospital in Croatian: penicillin allergy and your regular medication. Your European Health Insurance Card covers necessary care in public hospitals here.",
    ],
    replies: [{ label: "Thomas comes with me. Thank you.", next: "health", patch: { companion: "Thomas with Marta; Lena with the group" } }],
  },
  health: {
    id: "health",
    bot: ["One more thing for the doctors: any other conditions or regular medication?"],
    replies: [
      {
        label: "Hypothyroidism, I take levothyroxine. And I'm allergic to penicillin.",
        next: "after",
        patch: { conditions: "Hypothyroidism", allergies: "Penicillin", medication: "Levothyroxine 75 mcg" },
      },
    ],
  },
  after: {
    id: "after",
    bot: ["Noted. Message me when the doctor has seen you."],
    replies: [
      {
        label: "It's a bad sprain, not a fracture. Brace, crutches for a few days, no long walks for 10 days.",
        next: "done",
        patch: { result: "Bad sprain, no fracture. Brace and crutches, no long walks for 10 days", mobilityCode: "WCHR" },
      },
    ],
  },
  done: {
    id: "done",
    bot: [
      "Good news that it's not broken. Your holiday isn't over: I've rearranged the rest of the week.",
      "The hotel is moving you to a step-free ground-floor room. Tomorrow's canoe safari becomes a seated birdwatching hide, and at Ston, Thomas and Lena walk the walls while you meet them on the oyster boat.",
      "For the flight home I've requested airport assistance with the code WCHR: you can walk short distances, but not stairs.",
    ],
    replies: [],
    end: { label: "See the new plan", href: "/journey" },
  },
};

export const triageScript: Script = {
  start: {
    id: "start",
    bot: ["Describe what you feel, in any language. I'll point you to the right kind of help nearby."],
    replies: [
      { label: "I twisted my ankle on a wet jetty. It's swollen and I can't stand on it.", next: "q1" },
      { label: "My child has a fever and a sore throat", next: "pharmacy" },
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
      "Recommended: an X-ray today.",
      "Not being able to stand after a fall is a common reason for an X-ray. On a weekday, start at the health centre in Metković. On a Sunday, go to Opća bolnica Dubrovnik. Keep the ankle raised and cool on the way.",
      "This is guidance, not a diagnosis. If the pain gets much worse or your toes go numb, call 112.",
    ],
    replies: [],
  },
  pharmacy: {
    id: "pharmacy",
    bot: [
      "Recommended: the pharmacy in Opuzen, 2 minutes from the jetty. A pharmacist can advise on fever medicine for the child's age and weight.",
      "If the child is very drowsy, has trouble breathing or a rash that doesn't fade when pressed, call 112.",
    ],
    replies: [],
  },
  emergency: {
    id: "emergency",
    bot: ["Call 112 now. This needs emergency help. Your exact GPS position is on the call screen, because there may be no street address here."],
    replies: [],
  },
};
