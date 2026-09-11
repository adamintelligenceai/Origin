# MarginShield Design Decisions

Record departures from `BLUEPRINT.md` here.

## Phase 0

- Initial repository scaffold created from blueprint v2.0.
- Barlow fonts loaded via Next.js font pipeline (self-hosted at build time, no runtime Google Fonts request).

## Phase 1

- Ledger design tokens and family hues added to `@marginshield/ui`.
- Core components: Money, Percentage, BasisPoints, EvidenceGrade, ValueClassBadge, FindingStatus, LedgerTable, DoubleRuleTotal, RedInkBar, BankabilityRange, CoverageMeter, RiskIndicator, RunHash, AppShell, MarketingShell, Button.
- Styleguide at `/styleguide` uses synthetic demonstration values only.
