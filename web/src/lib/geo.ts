import osm from "@/data/osm-facilities.json";

export type Facility = (typeof osm.facilities)[number];
export const facilities: Facility[] = osm.facilities;
export const osmSource = osm.source;

export function km(aLat: number, aLon: number, bLat: number, bLon: number) {
  const R = 6371;
  const dLat = ((bLat - aLat) * Math.PI) / 180;
  const dLon = ((bLon - aLon) * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((aLat * Math.PI) / 180) * Math.cos((bLat * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export const typeLabel: Record<string, string> = {
  hospital: "Hospital",
  clinic: "Clinic",
  doctors: "Doctor",
  pharmacy: "Pharmacy",
  dentist: "Dentist",
};
