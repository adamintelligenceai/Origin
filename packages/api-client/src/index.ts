import { z } from 'zod';

export const licenceResponseSchema = z.object({
  token: z.string(),
  plan: z.enum(['scan', 'founding', 'monitor', 'demo']),
  entitlements: z.object({
    scans_remaining: z.number(),
    ai_commentary: z.boolean(),
    method_version: z.string(),
  }),
  expires_at: z.string(),
});
export type LicenceResponse = z.infer<typeof licenceResponseSchema>;

export const narrativeRequestSchema = z.object({
  facts: z.record(
    z.string(),
    z.object({
      label: z.string(),
      formatted: z.string(),
    }),
  ),
  template: z.enum(['executive', 'family', 'check', 'action']),
});
export type NarrativeRequest = z.infer<typeof narrativeRequestSchema>;

export const FACT_TOKEN = /\{\{(F\d{3})\}\}/g;

export function substituteFacts(template: string, facts: Record<string, { formatted: string }>): string | { error: string } {
  const unknown: string[] = [];
  const text = template.replace(FACT_TOKEN, (_, token: string) => {
    const fact = facts[token];
    if (!fact) {
      unknown.push(token);
      return '';
    }
    return fact.formatted;
  });
  if (unknown.length) return { error: `Unknown fact tokens: ${unknown.join(', ')}` };
  return text;
}

export function deterministicExecutive(facts: Record<string, { formatted: string }>): string {
  const template =
    'MarginShield identified {{F001}} of detected leakage and {{F002}} of modelled commercial opportunity. Under base-case planning assumptions, {{F003}} is classified as expected bankable value (range {{F004}}). Cash claimable now is {{F005}}.';
  const result = substituteFacts(template, facts);
  if (typeof result !== 'string') return 'Narrative unavailable.';
  return result;
}
