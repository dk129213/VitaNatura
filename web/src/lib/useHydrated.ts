"use client";

import { useSyncExternalStore } from "react";

// True only in the browser after hydration, so persisted state never mismatches the server HTML.
export function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
