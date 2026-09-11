import { describe, expect, it } from 'vitest';
import { defaultMethodConfig } from '../config';
import { decryptProject, encryptProject, type ProjectPayload } from '../ingest/project';

describe('.msproj envelope', () => {
  it('round-trips findings without uploading a passphrase', async () => {
    const payload: ProjectPayload = {
      mapping: { files: { 'sales.csv': 'sales' }, confirmed_semantics: { invoice_revenue: 'NET_SALES_EX_FREIGHT' } },
      method_config: defaultMethodConfig(),
      findings: [],
      headlines: {
        detected_leakage: '1.0000',
        modelled_opportunity: '2.0000',
        addressable_margin: '3.0000',
        bankable_low: '0.5000',
        bankable_base: '1.0000',
        bankable_high: '1.5000',
        cash_claimable: '0.2500',
        billing_risk: '0.0000',
        t12m_net_sales: '100.0000',
        mii: 90,
        coverage: 80,
        comparability_warning: false,
      },
      evidence: [],
      outcomes: [],
      period: { start: '2024-07-01', end: '2025-06-30', t12m_start: '2024-07-01', t12m_end: '2025-06-30' },
      run_hash: 'abc',
      engine_version: '1.0.0',
      method_version: '1.0.0',
    };
    const envelope = await encryptProject(payload, 'harbourline-passphrase');
    expect(envelope.kdf).toBe('argon2id');
    expect(envelope.includes_raw).toBe(false);
    const opened = await decryptProject(envelope, 'harbourline-passphrase');
    expect(opened.headlines.detected_leakage).toBe('1.0000');
    await expect(decryptProject(envelope, 'wrong')).rejects.toThrow(/passphrase/i);
  });
});
