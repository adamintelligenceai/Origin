export const FIRST = [
  'Harper',
  'Jonah',
  'Mira',
  'Callum',
  'Siena',
  'Rory',
  'Elodie',
  'Nash',
  'Priya',
  'Felix',
  'Willa',
  'Arlo',
  'Tamsin',
  'Hugo',
  'Nerida',
  'Pax',
];

export const LAST = [
  'Bramwell',
  'Calders',
  'Dunmore',
  'Eastfield',
  'Fenwick',
  'Greaves',
  'Hartwell',
  'Kingsley',
  'Larkin',
  'Northam',
  'Osborne',
  'Pritchard',
  'Quill',
  'Ravenshaw',
  'Sutcliffe',
  'Thornbury',
];

export const COMPANY_SUFFIX = ['Pty Ltd', 'Trading Co', 'Supplies', 'Services', 'Industrial', 'Wholesale'];

export const BRANCHES = ['Sydney', 'Melbourne', 'Brisbane', 'Adelaide', 'Perth', 'Newcastle'] as const;
export const GROUPS = ['HVAC', 'Electrical', 'Plumbing'] as const;
export const SEGMENTS = ['Trade', 'Project', 'Retail-trade'] as const;

export function fictionalCompany(rng: () => number, idx: number): string {
  const a = LAST[idx % LAST.length];
  const b = COMPANY_SUFFIX[idx % COMPANY_SUFFIX.length];
  return `${a} ${b}`;
}
