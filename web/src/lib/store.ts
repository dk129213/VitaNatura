"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// The traveller's profile, filled in by the chat when something goes wrong.
export type Profile = {
  situation?: string;
  location?: string;
  companion?: string;
  plan?: string;
  result?: string;
  mobilityCode?: string;
  conditions?: string;
  allergies?: string;
  medication?: string;
};

type State = {
  profile: Profile;
  intakeDone: boolean;
  patch: (p: Partial<Profile>) => void;
  setIntakeDone: (v: boolean) => void;
  reset: () => void;
};

export const useVita = create<State>()(
  persist(
    (set) => ({
      profile: {},
      intakeDone: false,
      patch: (p) => set((s) => ({ profile: { ...s.profile, ...p } })),
      setIntakeDone: (v) => set({ intakeDone: v }),
      reset: () => set({ profile: {}, intakeDone: false }),
    }),
    {
      name: "vitanatura-demo-v4",
      storage: createJSONStorage(() => {
        try {
          return localStorage;
        } catch {
          // Private mode or blocked storage: keep state in memory only.
          const mem = new Map<string, string>();
          return {
            getItem: (k) => mem.get(k) ?? null,
            setItem: (k, v) => void mem.set(k, v),
            removeItem: (k) => void mem.delete(k),
          };
        }
      }),
    },
  ),
);

// Profile filled in one go, used by "Fill for demo".
export const demoProfile: Profile = {
  situation: "Slipped on a wet jetty getting off the lađa, right ankle swollen, cannot stand on it",
  location: "Lađa jetty, Opuzen (GPS 43.0141, 17.5636)",
  companion: "Thomas with Marta; Lena with the group",
  plan: "X-ray at Opća bolnica Dubrovnik today",
  result: "Bad sprain, no fracture. Brace and crutches, no long walks for 10 days",
  mobilityCode: "WCHR",
  conditions: "Hypothyroidism",
  allergies: "Penicillin",
  medication: "Levothyroxine 75 mcg",
};
