# AP Agent Stack Overview

Sixteen specialised agents plus Orchestrator. ERP-agnostic agent layer across Dynamics 365, SAP, Oracle, NetSuite, Workday and other environments.

```mermaid
flowchart TB
  A1[Invoice Intake] --> A2[Validation] --> A3[Matching] --> A4[Exception Triage]
  A4 --> A5[Goods Receipt]
  A4 --> A6[PO Quality]
  A4 --> A7[Approval]
  A4 --> A8[Supplier Resolution]
  A4 --> A9[Internal Follow-Up]
  A4 --> A10[Duplicate and Anomaly]
  A11[Vendor Statement Rec] --> A12[Payment Proposal Review]
  A4 --> A12 --> A13[AP Close]
  A14[AP Reporting] --> A16[Orchestrator]
  A15[Root Cause] --> A16
  A16 -.-> A1
  A16 -.-> A4
  A16 -.-> A12
```

Payment authorisation remains human. Autonomy defaults to Level 0/1.
