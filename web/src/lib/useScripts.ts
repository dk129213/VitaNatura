"use client";

import * as en from "./scripts";
import * as hr from "./scripts.hr";
import { useLang } from "./i18n";

export function useScripts() {
  return useLang() === "hr" ? hr : en;
}
