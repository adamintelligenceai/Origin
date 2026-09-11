import { pick } from "./rng";

type Rng = () => number;

const ADJECTIVES = [
  "Harbour",
  "Bayside",
  "Northridge",
  "Ironbark",
  "Saltmarsh",
  "Redgum",
  "Wharfside",
  "Mallee",
  "Cliffton",
  "Driftwood",
] as const;

const NOUNS = [
  "Mechanical",
  "Electrical",
  "Plumbing",
  "Fasteners",
  "Safety",
  "HVAC",
  "Industrial",
  "Trade",
  "Supplies",
  "Works",
] as const;

const FIRST = [
  "Asha",
  "Blair",
  "Chen",
  "Dara",
  "Ellis",
  "Farah",
  "Glen",
  "Hana",
  "Ivo",
  "Jules",
] as const;
const LAST = [
  "Moreton",
  "Keel",
  "Sander",
  "Pryor",
  "Vale",
  "Quill",
  "Hart",
  "Nash",
  "Rowe",
  "Bell",
] as const;

export function fictionalCompany(rng: Rng, index: number): string {
  return `${pick(rng, ADJECTIVES)} ${pick(rng, NOUNS)} ${String(index + 1).padStart(3, "0")}`;
}

export function fictionalPerson(rng: Rng): string {
  return `${pick(rng, FIRST)} ${pick(rng, LAST)}`;
}

export const BRANCHES = [
  "Sydney",
  "Melbourne",
  "Brisbane",
  "Adelaide",
  "Perth",
  "Newcastle",
] as const;

export const PRODUCT_GROUPS = ["HVAC", "electrical", "plumbing"] as const;
