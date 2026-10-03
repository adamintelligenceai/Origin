export const SCORE_LABELS = [
  "Absent",
  "Informal",
  "Documented",
  "Used",
  "Gated / sampled",
];

export const DIMENSIONS = [
  {
    id: "Process",
    code: "A",
    description: "How work moves",
    questions: [
      [
        "A1",
        "Coded exceptions",
        "Are parked or rejected invoices coded from a closed list, rather than free text only?",
      ],
      [
        "A2",
        "Named path",
        "Is there a written path for PO 3-way, PO 2-way, non-PO, recurring, and intercompany invoices?",
      ],
      [
        "A3",
        "Owner on the clock",
        "Does every open exception have a named human owner and an ageing start date?",
      ],
      [
        "A4",
        "Match policy is written",
        "Can a new specialist apply match rules and tolerances without asking a neighbour?",
      ],
      [
        "A5",
        "Payment run is a procedure",
        "Are proposal build, review, authorise, and transmit separate written steps with named roles?",
      ],
      [
        "A6",
        "Close is a checklist",
        "Does period-end AP have a checklist for accruals, cut-off, and attestation?",
      ],
    ],
  },
  {
    id: "Data",
    code: "B",
    description: "Whether a packet can exist",
    questions: [
      [
        "B1",
        "Invoice source completeness",
        "Can you measure last month's PDF, XML/EDI, portal, and paper sources and identify missing files?",
      ],
      [
        "B2",
        "Extract quality is sampled",
        "Is field-level extraction accuracy sampled against a gold label or dual key?",
      ],
      [
        "B3",
        "Vendor master fitness",
        "Can AP see a unique vendor, payee status, and bank-change date without a tribal expert?",
      ],
      [
        "B4",
        "PO and receipt availability",
        "Are PO and GR/IR or service-entry records queryable in the matcher's working window?",
      ],
      [
        "B5",
        "Work-object identity",
        "Does each invoice, exception, statement line, or proposal line have a stable ID?",
      ],
      [
        "B6",
        "Evidence reopen",
        "Can a Controller reopen source, extract, match worksheet, and approval for a recent invoice in one sitting?",
      ],
    ],
  },
  {
    id: "Controls",
    code: "C",
    description: "Who may do what",
    questions: [
      [
        "C1",
        "Payment hold is real",
        "Is payment authorisation human in both policy and the system that transmits the file?",
      ],
      [
        "C2",
        "Vendor bank dual control",
        "Does a bank-detail change require two humans and leave a before-and-after record?",
      ],
      [
        "C3",
        "DOA is applied, not edited",
        "Can a bot or copilot route approvals without permission to edit the delegation table?",
      ],
      [
        "C4",
        "Anomaly clearance",
        "Does every duplicate or anomaly flag receive a named human outcome?",
      ],
      [
        "C5",
        "Segregation still holds",
        "Do capture/match, vendor master, and payment release remain separate human roles?",
      ],
      [
        "C6",
        "Autonomy register",
        "Is every live model, copilot, or bot listed with an owner, object type, and autonomy level?",
      ],
    ],
  },
  {
    id: "Technology",
    code: "D",
    description: "The stack you will keep",
    questions: [
      [
        "D1",
        "System of record is named",
        "Is it written that the ERP—not a chat window—is the accounting system of record?",
      ],
      [
        "D2",
        "Capture stack is known",
        "Can you name the capture, IDR, and portal products and whether they are supported?",
      ],
      [
        "D3",
        "Workflow tools are known",
        "Can you name the match, park, and approval workflow tools and their owners?",
      ],
      [
        "D4",
        "Integration fabric",
        "Is there a named, owned way work moves: iPaaS, RPA, API, or human re-key?",
      ],
      [
        "D5",
        "Least-privilege pattern",
        "Would a pilot use a service account instead of sharing a specialist's login?",
      ],
      [
        "D6",
        "Prompt change control",
        "Is a prompt or model change treated as a configuration change with a ticket?",
      ],
    ],
  },
  {
    id: "Talent",
    code: "E",
    description: "Names, not “the SSC”",
    questions: [
      [
        "E1",
        "AP Process Owner exists",
        "Is there a named person who can accept or reject an Orchestrator charter?",
      ],
      [
        "E2",
        "Controls Lead exists",
        "Is there a named person for duplicate and anomaly clearance above threshold?",
      ],
      [
        "E3",
        "Match skill has a backup",
        "If the best matcher is away for two weeks, can the path still run?",
      ],
      [
        "E4",
        "Time to sit evidence",
        "Are hours reserved for sampling and charter work in the next 30 days?",
      ],
      [
        "E5",
        "Audit is invited",
        "Has Internal Audit been invited to sample packets as an observer?",
      ],
      [
        "E6",
        "Language discipline",
        "Have specialists been told not to write “fraud,” “compliant,” or “the AI approved it”?",
      ],
    ],
  },
  {
    id: "Economics",
    code: "F",
    description: "Visibility, not a promise",
    questions: [
      [
        "F1",
        "Volume is known",
        "Are invoice volumes known by scope from a system for the last two quarters?",
      ],
      [
        "F2",
        "Loaded AP cost is known",
        "Is the fully loaded AP team cost known using the organisation's own method?",
      ],
      [
        "F3",
        "Exception rate is known",
        "Is first-pass failure measured with a written definition?",
      ],
      [
        "F4",
        "Cost per invoice is ranged",
        "Is cost per invoice estimated as a range with a documented method?",
      ],
      [
        "F5",
        "Layer cost is budgeted",
        "Can tools, model, implementation, and exception minutes be recorded per thousand invoices?",
      ],
      [
        "F6",
        "Success is broader than savings",
        "Can operating discipline count as success even if cycle time does not move in 90 days?",
      ],
    ],
  },
];

export const QUESTIONS = DIMENSIONS.flatMap((dimension) =>
  dimension.questions.map(([id, title, prompt]) => ({
    id,
    title,
    prompt,
    dimension: dimension.id,
  })),
);

const MATURITY = [
  {
    max: 1.4,
    level: 1,
    name: "Undesigned",
    statement: "We do not have a designed agent layer. We may have tools.",
  },
  {
    max: 2.4,
    level: 2,
    name: "Informal activity",
    statement:
      "We have prompts or bots without complete charters, a register, or evidence gates.",
  },
  {
    max: 3.2,
    level: 3,
    name: "Named and held",
    statement:
      "Wave 1 can be named while payment stays human and autonomy stays at L0/L1.",
  },
  {
    max: 3.7,
    level: 4,
    name: "Evidence-gated",
    statement:
      "Promotion can use gates, packets reopen, and flags receive human outcomes.",
  },
  {
    max: 4,
    level: 5,
    name: "Recertified layer",
    statement:
      "Demotion works, costs are visible, and higher autonomy is rare and sampled.",
  },
];

export function scoreDiagnostic(answers) {
  const missing = QUESTIONS.filter(
    (question) => !Number.isInteger(answers[question.id]),
  ).map((question) => question.id);

  const dimensions = DIMENSIONS.map((dimension) => {
    const values = dimension.questions
      .map(([id]) => answers[id])
      .filter((value) => Number.isInteger(value));
    const average = values.length
      ? values.reduce((total, value) => total + value, 0) / values.length
      : null;
    return { id: dimension.id, average, complete: values.length === 6 };
  });

  if (missing.length) {
    return { complete: false, missing, dimensions };
  }

  const arithmetic =
    dimensions.reduce((total, dimension) => total + dimension.average, 0) /
    dimensions.length;
  const firstGuess =
    MATURITY.find((band) => arithmetic <= band.max) ?? MATURITY[0];
  let cap = 5;
  const holds = [];

  if (answers.C1 === 0) {
    cap = 1;
    holds.push(
      "Payment authorisation is not a real human system hold. Keep all agents at L0 and do not open Agent 12.",
    );
  } else if (answers.C1 === 1) {
    cap = Math.min(cap, 2);
    holds.push(
      "Payment authorisation is informal. Write and system-enforce the human hold.",
    );
  }
  if (answers.C2 === 0) {
    cap = Math.min(cap, 2);
    holds.push(
      "Vendor-bank dual control is absent. Fix it before payment-adjacent recommendations.",
    );
  }
  if (answers.A5 <= 1) {
    cap = Math.min(cap, 2);
    holds.push(
      "The payment run is not a fully written procedure. Separate build, review, authorise, and transmit.",
    );
  }
  if (answers.E1 === 0 || answers.E2 === 0) {
    holds.push(
      "Wave 1 owners are incomplete. Name the AP Process Owner and Controls Lead before commissioning.",
    );
  }
  if (answers.F6 === 0) {
    holds.push(
      "Success is framed only as savings. Do not use this diagnostic to authorise spend or guarantee ROI.",
    );
  }

  const level = Math.min(firstGuess.level, cap);
  const maturity = MATURITY.find((band) => band.level === level);
  const weakest = [...dimensions].sort(
    (left, right) => left.average - right.average,
  )[0];

  return {
    complete: true,
    missing: [],
    dimensions,
    arithmetic,
    maturity,
    cap,
    holds,
    weakest,
  };
}

export function getProgress(answers) {
  const answered = QUESTIONS.filter((question) =>
    Number.isInteger(answers[question.id]),
  ).length;
  return {
    answered,
    total: QUESTIONS.length,
    percent: Math.round((answered / QUESTIONS.length) * 100),
    xp: answered * 10,
  };
}
