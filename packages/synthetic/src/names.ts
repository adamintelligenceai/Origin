export const BRANCHES = [
  { id: 'BR-SYD', name: 'Sydney Metro', state: 'NSW' },
  { id: 'BR-MEL', name: 'Melbourne East', state: 'VIC' },
  { id: 'BR-BNE', name: 'Brisbane North', state: 'QLD' },
  { id: 'BR-ADL', name: 'Adelaide Central', state: 'SA' },
  { id: 'BR-PER', name: 'Perth South', state: 'WA' },
  { id: 'BR-NCL', name: 'Newcastle Hub', state: 'NSW' },
] as const;

export const SECTORS = ['HVAC', 'electrical', 'plumbing'] as const;

const FIRST = [
  'Avery', 'Blair', 'Casey', 'Drew', 'Eden', 'Finley', 'Grey', 'Harper', 'Indigo', 'Jordan',
  'Kai', 'Logan', 'Morgan', 'Noa', 'Oakley', 'Parker', 'Quinn', 'Reese', 'Sage', 'Taylor',
];

const LAST = [
  'Ashford', 'Bramley', 'Colton', 'Dunstan', 'Ellery', 'Fairbanks', 'Gresham', 'Hadley',
  'Iverson', 'Jarrow', 'Kingsley', 'Larkspur', 'Merrick', 'Northam', 'Orwell', 'Pritchard',
];

const COMPANY = [
  'Meridian', 'Northbridge', 'Harbourline', 'Ridgeway', 'Clearwater', 'Ironbark', 'Sandstone',
  'Bluegum', 'Cedarline', 'Redrock', 'Silverstream', 'Amberfield', 'Granite', 'Coastal',
];

const SUFFIX = [
  'Mechanical', 'Electrical', 'Plumbing', 'Services', 'Projects', 'Installations', 'Systems',
  'Contracting', 'Solutions', 'Works', 'Group', 'Partners',
];

const SKU_WORDS = [
  'Compressor', 'Valve', 'Conduit', 'Fitting', 'Breaker', 'Actuator', 'Sensor', 'Gasket',
  'Coupling', 'Thermostat', 'Pump', 'Filter', 'Relay', 'Cable', 'Elbow', 'Flange',
];

export function customerName(i: number): string {
  return `${COMPANY[i % COMPANY.length]} ${SUFFIX[(i * 7) % SUFFIX.length]} Pty Ltd`;
}

export function personName(i: number): string {
  return `${FIRST[i % FIRST.length]} ${LAST[(i * 3) % LAST.length]}`;
}

export function skuName(i: number): string {
  return `${SKU_WORDS[i % SKU_WORDS.length]} ${1000 + (i % 9000)}`;
}

export function supplierName(i: number): string {
  return `${COMPANY[(i * 5) % COMPANY.length]} ${SUFFIX[(i * 11) % SUFFIX.length]} Supply`;
}
