# Enterprise governance pack

**Product:** Evidence Room — AP Agent OS · Team  
**Use:** Overlay when there is more than one legal entity, country, ERP, or SSC pod.  
**Rule:** A Dynamics path at L1 does not confer L1 on an Oracle path. New class, new L0 clock.

This overlay does not certify multi-entity compliance (tax, statutory, SOX). Local policy wins.

---

## 1. Objects that must be unique

| Object | Enterprise rule |
|---|---|
| Charter | One per agent **and** object class (entity × doc type × match tree) |
| Autonomy register | One enterprise register with class as a column — no orphan copilots in a plant |
| Payment sentence | Same words everywhere; *procedures* may differ (local bank) |
| Exception codes | Core list shared; local codes prefixed `EX-LOC-` via change control |
| Work-object ID | Include company code / entity |
| Service accounts | Per ERP; no cross-ERP shared login |

---

## 2. Hub and spoke

| Hub (enterprise) | Spoke (entity / ERP) |
|---|---|
| Method, banned claims, Wave policy | Path map, tolerances, tax desks |
| Steering ToR | Local exception mix |
| Promotion gate *tables* | Promotion *cases* for that class |
| Agent 10 language | Local clearance thresholds |
| Toolkit edition | Local SOP IDs |

Hub may **decline** a spoke promotion. Hub may not **grant** L3 over a spoke Controller’s dissent on posting classes.

---

## 3. Multi-ERP

| Topic | Practice |
|---|---|
| Mapping | Same sixteen roles; different field names |
| Orchestrator | May be one store with `source_system` or one store per ERP — pick one and write it |
| Connectors | Out of product scope. IAM and integration remain the organisation’s |
| Vendor AI features | Register per ERP tenant |
| Wave 1 | One ERP first |

Do not write a common API client “because it is all REST.” Hosts differ.

---

## 4. Multi-country

| Topic | Practice |
|---|---|
| Tax | Agent 02 flags fields; local Tax decides position |
| Language | Operator-facing output in the language of the SSC that acts |
| Payment | Local dual-control procedure; same human-only rule |
| Data residency | Packets stay in systems the organisation already approved — not Evidence Room |
| Works councils | Use change toolkit; no headcount story |

---

## 5. Shared-service pods

If Cleveland and a second pod both touch the same entity, **one** Process Owner remains A. Two As is a design smell. RACI the pod as R, not A.

Northline (fictional): four company codes, one SSC, one Process Owner. Monterrey paper is a class, not a second OS.

---

## 6. Enterprise steering addenda

Add seats: tax lead (when CA/MX or equivalent in scope), a second ERP owner when Wave 10 extend starts. Keep quorum as Chair + Process Owner + Controls. Do not expand quorum until it cannot meet.

Papers: register filtered by class; incidents by entity. Still no ROI paper.

---

## 7. Extend checklist (new entity or ERP)

- [ ] Diagnostic dimensions B and D re-sat for that path.
- [ ] Holds tested on *that* bank file / *that* vendor master.
- [ ] Map and five invoices.
- [ ] New charters (do not photocopy dollars from another DOA).
- [ ] New L0 clock.
- [ ] IAM on that system.
- [ ] Hub notes the class on the enterprise register.

---

## 8. When to apply for Custom Blueprint

Use `05_CUSTOM_BLUEPRINT/` when: more than two ERPs in year one; a political split between SSC and plants; a recent acquisition with no map; or InfoSec will not accept the method without a facilitated design against *their* stack.

---

## Document control

| Field | Value |
|---|---|
| Toolkit | Evidence Room — AP Agent OS · Team |
| Object | Enterprise governance pack |
| Status | Edition 1.0.0 |
