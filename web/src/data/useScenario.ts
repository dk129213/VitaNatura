"use client";

import * as en from "./scenario";
import * as hr from "./scenario.hr";
import { useLang } from "@/lib/i18n";

// Fails the build if the Croatian file is missing anything the English one has.
const hrChecked: typeof en = hr;

export function useScenario() {
  return useLang() === "hr" ? hrChecked : en;
}
