"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// One profile shared by every module. Filled in by the intake chat.
export type Profile = {
  situation?: string;
  location?: string;
  companion?: string;
  injury?: string;
  weightBearing?: string;
  stairs?: string;
  mobilityCode?: string;
  conditions?: string;
  allergies?: string;
  medication?: string;
  destination?: string;
  goal?: string;
};

type State = {
  profile: Profile;
  intakeDone: boolean;
  transportChoice?: string;
  clinicChoice?: string;
  patch: (p: Partial<Profile>) => void;
  setIntakeDone: (v: boolean) => void;
  setTransport: (id: string) => void;
  setClinic: (id: string) => void;
  reset: () => void;
};

export const useVita = create<State>()(
  persist(
    (set) => ({
      profile: {},
      intakeDone: false,
      patch: (p) => set((s) => ({ profile: { ...s.profile, ...p } })),
      setIntakeDone: (v) => set({ intakeDone: v }),
      setTransport: (id) => set({ transportChoice: id }),
      setClinic: (id) => set({ clinicChoice: id }),
      reset: () => set({ profile: {}, intakeDone: false, transportChoice: undefined, clinicChoice: undefined }),
    }),
    {
      name: "vitanatura-demo-v3",
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

// Profile filled in one go, used by "skip to the plan" in the demo.
export const demoProfile: Profile = {
  situation: "Slipped on the steps of the city walls, right ankle swollen, cannot stand on it",
  location: "Dubrovnik Old Town",
  companion: "Husband, taxi from Pile Gate",
  injury: "Right ankle fracture, splinted at Opća bolnica Dubrovnik. Surgery advised within days",
  weightBearing: "None on the right leg",
  stairs: "Cannot manage steps",
  mobilityCode: "WCHS",
  conditions: "Hypothyroidism",
  allergies: "Penicillin",
  medication: "Levothyroxine 75 mcg",
  destination: "Surgery in Dubrovnik, then home to Vienna",
  goal: "Surgery and recovery in Croatia, flight home when cleared",
};

export const demoProfileHr: Profile = {
  situation: "Poskliznula se na stepenicama gradskih zidina, desni gležanj natečen, ne može stati na nogu",
  location: "Stari grad Dubrovnik",
  companion: "Suprug, taksi od Vrata od Pila",
  injury: "Prijelom desnog gležnja, imobiliziran u Općoj bolnici Dubrovnik. Operacija preporučena u nekoliko dana",
  weightBearing: "Bez opterećenja desne noge",
  stairs: "Ne može svladati stepenice",
  mobilityCode: "WCHS",
  conditions: "Hipotireoza",
  allergies: "Penicilin",
  medication: "Levotiroksin 75 mcg",
  destination: "Operacija u Dubrovniku, zatim kući u Beč",
  goal: "Operacija i oporavak u Hrvatskoj, let kući kad liječnik odobri",
};
