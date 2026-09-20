# Evidence Room — AP Agent OS Professional

## Testing — 00 Testing Standard

**Product:** Evidence Room AP Agent OS — Professional  
**Module:** Testing  
**Standard:** Proof before permission. Agents earn responsibility. Evidence decides.  
**Audience:** Head of AP, AP Manager, Control owner, Finance Systems, Internal Audit observer, UAT participants  
**ERP stance:** Agnostic. Tests run against the buyer’s systems of record and a labelled case file the buyer owns.  
**Examples:** ACME Manufacturing — **ILLUSTRATIVE** only. Not a client, not a result.  
**Version:** 1.0  
**Classification:** Binding test discipline. Buyer sets numeric gates. This file does not certify control effectiveness, legal compliance, or savings.

---

### Position

An agent that has not been tested against labelled historical work is a demonstration, not an operating asset. Testing is how the agent earns the right to be seen by operators (Shadow), then the right to act in a narrow window (Pilot).

Use this standard with:

| Topic | File |
|---|---|
| Historical scripts | `01_HISTORICAL_TEST_SCRIPTS.md` |
| UAT forms and scripts | `02_UAT_TEMPLATES.md` |
| Live compare, no action | `03_SHADOW_MODE.md` |
| Narrow reversible action | `04_PILOT_METHODOLOGY.md` |
| Method sequence | `../Process_Mapping/00_METHODOLOGY.md` Steps 6–8 |
| Change class | `../Governance/02_RELEASE_AND_CHANGE.md` |
| Autonomy gates | `../Governance/01_AUTONOMY_POLICY.md` |
| Score definitions | `../KPI_and_Measurement/01_KPI_DICTIONARY.md` |
| Exception codes | `../Controls/03_EXCEPTION_TAXONOMY.md` |

Every section answers: **what / how / who / what can go wrong / control / measure / evidence.**

---

## 1. What testing is for

**What to do.** Prove four things, in this order, before any production action verb is granted:

1. The agent and the deterministic rules produce the **expected outcome** on cases the buyer already knows.  
2. Named operators can **use the output** without inventing a parallel process.  
3. On live work, the agent **agrees with humans often enough**, and disagrees in ways the owner can explain.  
4. A **narrow, reversible** action set can run without becoming the default path via override.

**How.** Four stages. Do not skip or merge them into a “soft launch.”

| Stage | Question | Action verbs allowed |
|---|---|---|
| **Historical test** | Would it have been right on last quarter’s work? | None. Read + score only |
| **UAT** | Can named people operate the designed path? | None in production. UAT environment or paper walkthrough |
| **Shadow** | Does it agree with today’s humans on live items? | Read + write-evidence only |
| **Controlled pilot** | Can a listed verb run inside an allow-list? | Only the listed verbs, caps, entities |

**Who.**

| Role | Duty |
|---|---|
| Head of AP / Controller | Accountable for go/no-go at each stage |
| AP Manager | Responsible for the test calendar, sample, and daily discipline |
| Control owner | Accepts scoring rules; vetoes a green pack with a red risk-control line |
| AP specialists | Create **gold labels** before seeing agent output |
| Finance Systems | Provisions non-executing identities; pins hashes |
| Internal Audit | May observe; does not run the test for the operator |

**What can go wrong.** Vendor demo set used as the only pack. Labels written after the model ran. Production write “just for UAT.”

**Control.** Promotion checklist in `01_AUTONOMY_POLICY.md` requires a buyer-owned pack ID. Environment confirmation is a gate, not a slide.

**Measure.** Pack coverage by taxonomy code; labels-before-output attestation; identities with write verbs (must be zero before Pilot).

**Evidence.** `[BUYER]/Evidence/Test/`, `/UAT/`, `/Shadow/`, `/Pilot/` — each with a signed go/no-go.

---

## 2. Operating rules (non-negotiable)

1. **Labels first.** Gold outcomes exist before the agent is run on that item. Relabelling to match the model is a defect.  
2. **Buyer owns the pack.** A vendor “golden set” may be *added* as extra cases. It cannot be the only pack.  
3. **Stratify.** STP, each material exception family, high value, credit notes, intercompany, FX if used, injection cases, out-of-scope items.  
4. **Fail closed.** Timeout, parse fail, missing cite, out-of-scope → no guessed “correct.” Score as fail or `not-comparable`.  
5. **Deterministic work is not scored as model brilliance.** Price/qty/tolerance maths must come from the documented rule. If the model “explained” a wrong compare as right, that is a fail.  
6. **Buyer sets gates.** Percentages in ACME examples are **ILLUSTRATIVE**. Copying them as targets fails this standard.  
7. **Risk-control veto.** A missed EX-DUP-001, EX-PAY-001, or an invented GR is not offset by high STP on easy PO invoices.  
8. **One increment.** Test the change you are about to make — not the whole stack.  
9. **At-most-once on writes.** When Pilot begins, a timeout is not a retry. Reconcile by read (`../Agent_Library/19_AGENT_CHARTER_STANDARD.md`).  
10. **Evidence or it did not happen.** A hallway “it looked good” is not a go.

---

## 3. How — environments and identities

**What to do.** Separate identities for Test, Shadow, and Pilot. Never reuse a human’s ERP login.

**How.**

| Environment | Identity pattern | Allowed verbs | Forbidden |
|---|---|---|---|
| Historical / lab | `agt.[charter].test` | Read historical extract; write scores to evidence | Any ERP/mail write |
| UAT | `agt.[charter].uat` | Read UAT tenant; write UAT evidence | Production data writes |
| Shadow | `agt.[charter].shadow` | Read live (or replica); write-evidence | Send, park, post, status change |
| Pilot | `agt.[charter].pilot` | Listed verbs only, allow-list enforced | Unlisted verbs; payment release; bank write |

If the platform cannot technically block a verb, autonomy stays at L1 and the residual risk is logged on the charter.

**Who.** Finance Systems implements; Control owner reviews the access extract at the start of each stage and at mid-Shadow.

**What can go wrong.** Shared “service account” that can park and propose and release. UAT pointed at production.

**Control.** Access review attached to the stage pack. Mid-Shadow re-extract.

**Measure.** Count of write entitlements on test/shadow identities (target: zero). Drift vs charter.

**Evidence.** Access extract + review initials under the stage folder.

---

## 4. How — sample design

**What to do.** Build a labelled file large enough to see the codes you claim to handle, and honest enough to include the codes that hurt you.

**How.** Minimum design (buyer completes counts):

| Stratum | Why it exists | Buyer n (complete) | Notes |
|---|---|---|---|
| Happy-path PO STP | Prevents “we only tested exceptions” | `[BUYER]` | Include multi-line |
| EX-PO-* | PO defects | `[BUYER]` | 001–004 if in scope |
| EX-MAT-* | Price/qty | `[BUYER]` | Use documented tolerances |
| EX-GR-* | Receipt | `[BUYER]` | Partial and missing |
| EX-DUP-001 / 002 | Duplicate | `[BUYER]` | Include **paid** population sample |
| EX-TAX-*, EX-MDM-* | High-risk standing data | `[BUYER]` | Small n → report counts, not theatre % |
| EX-PAY-001 | Bank-change bait | `[BUYER]` | Must appear; expected outcome is human hold |
| Credit notes / IC / FX | Mix | `[BUYER]` | If the entity uses them |
| Out-of-scope / not-an-invoice | Refusal behaviour | `[BUYER]` | Statements, reminders, marketing |
| Injection / hostile text | Untrusted content | `[BUYER]` | See Governance §8 |
| High value ≥ `[BUYER cap]` | Materiality | `[BUYER]` | Always human-visible |

`n < n_min` (buyer sets `n_min`): publish **count**, not a percentage.

**Who.** Analyst pulls IDs; AP specialists label; Control owner confirms high-risk strata are present.

**What can go wrong.** Last two quiet weeks only. All domestic PO under tolerance.

**Control.** Coverage matrix signed before the first agent run.

**Measure.** Codes in charter vs codes with n = 0 in the pack.

**Evidence.** Sample register + coverage matrix in `01_HISTORICAL_TEST_SCRIPTS.md`.

---

## 5. How — scoring

**What to do.** Score against dictionary IDs, not vendor dashboards.

**How.** Required score lines for any agent that classifies or extracts:

| Line | Dictionary ID | Rule |
|---|---|---|
| Classification accuracy | KPI-ACC-CLS | Taxonomy code or “STP” vs gold |
| Extraction accuracy | KPI-ACC-EXT | Critical-field list versioned |
| Matching accuracy | KPI-ACC-MAT | Only if Agent 03 is in the test |
| False-positive rate | KPI-ERR-FPR | State the condition |
| False-negative rate | KPI-ERR-FNR | High-risk codes separate; veto eligible |
| Schema / cite fail | (local count) | Uncited amount/ID = fail |
| Out-of-scope handling | (local count) | Must refuse or escalate, not invent |
| Human-required honouring | (local count) | Four human classes never “executed” |

**Close enough is wrong.** Fuzzy invoice numbers, rounded tax that the policy does not allow, and “the vendor is probably this one” are fails.

Disagreements are adjudicated by the **process owner**, not the model vendor.

**Who.** Analyst scores; process owner adjudicates; Control owner accepts the scorecard.

**What can go wrong.** Vendor console “98% accuracy” with no field list.

**Control.** Every reported figure cites a dictionary ID and a pack ID.

**Measure.** Share of score lines with dictionary IDs (must be 100% on the signed pack).

**Evidence.** Scorecard + confusion matrices + residual error list.

---

## 6. Go / no-go

**What to do.** Record a binary decision per stage. “Proceed with caution” is a no-go plus a punch-list.

**How.** The Accountable signs one of:

| Decision | Meaning | Next step |
|---|---|---|
| **Go** | Gates met; residual errors listed and accepted | Next stage |
| **Hold** | Specific defects; retest those strata | Stay at current stage |
| **Redesign** | Charter, rule, or sample is wrong | Return to Agentise or Structure |
| **Stop** | Unsafe or out of scope | Disable identity; incident if already live |

Buyer writes numeric gates on the charter. This standard only requires that gates **exist**, are **pre-committed**, and are **not edited after seeing results**.

**Who.** Head of AP / Controller signs Go/Hold/Redesign/Stop. Control owner may force Hold or Stop on risk-control.

**What can go wrong.** Gates rewritten in the review meeting to keep the project date.

**Control.** Gate sheet dated and stored **before** the agent run. Diff if anyone edits.

**Evidence.** Signed decision page in the stage pack.

---

## 7. What can go wrong (standard-level)

| Failure | What it looks like | Control |
|---|---|---|
| Demo-set theatre | 40 clean PDFs, no duplicates | Coverage matrix |
| Label leakage | Specialists saw the model first | Labels-first attestation + timestamp |
| Production credentials | “UAT” posting live | Identity pattern + access extract |
| Silent execute | Shadow identity can send mail | Verb allow-list |
| Mix shift | Easy PO slice called “the test” | Stratification |
| Offset thinking | Great STP, missed duplicate | Risk-control veto |
| Retry-all | Pilot double-posts on timeout | At-most-once rule |
| Date-driven go | Steering wants a demo Friday | Decision enum only |

---

## 8. How you measure the testing function itself

| Question | Metric |
|---|---|
| Did we test what we claim to run? | Charter codes with n = 0 (should be explained or out of scope) |
| Did labels precede output? | Attestation + file timestamps |
| Can we stop? | Minutes to disable the identity (fallback drill) |
| Did we over-claim? | Scorecard lines without dictionary IDs |

---

## 9. ACME Manufacturing — ILLUSTRATIVE only

ACME Manufacturing (fictional): one legal entity, email PDF + EDI, domestic PO invoices. Historical pack: 180 labelled items including 12 EX-DUP suspects (3 confirmed), 8 EX-GR-001, 6 injection-style footers, 10 not-an-invoice statements. Matching Agent scored on deterministic compare. Two EX-DUP-001 false negatives → **Hold**, not Go, despite high STP on the happy-path stratum.

Do not copy ACME counts as your gates.

---

## 10. Sequence controls

| Cannot start | Until |
|---|---|
| Historical run | Charter signed; environment non-executing; labels complete; gates frozen |
| UAT | Historical go or documented Hold with UAT-only defects (UI, not accuracy) |
| Shadow | Historical go; access review; write-block confirmed |
| Pilot | Shadow pack; rollback tested; allow-lists **technically** enforced; incident/override live |

If a gate artefact is missing, the next stage is unauthorised — even if the software can run.

Proof before permission. Agents earn responsibility. Evidence decides.

---

*End of 00_TESTING_STANDARD.md*
