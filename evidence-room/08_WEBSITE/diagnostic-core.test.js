import test from "node:test";
import assert from "node:assert/strict";

import { QUESTIONS, getProgress, scoreDiagnostic } from "./diagnostic-core.js";

function answersAt(score) {
  return Object.fromEntries(QUESTIONS.map((question) => [question.id, score]));
}

test("requires all 36 evidence checks before placement", () => {
  const answers = answersAt(2);
  delete answers.F6;

  const result = scoreDiagnostic(answers);

  assert.equal(result.complete, false);
  assert.deepEqual(result.missing, ["F6"]);
  assert.equal(getProgress(answers).percent, 97);
});

test("applies the payment-system veto before reporting maturity", () => {
  const answers = answersAt(4);
  answers.C1 = 0;

  const result = scoreDiagnostic(answers);

  assert.equal(result.complete, true);
  assert.equal(result.maturity.level, 1);
  assert.equal(result.cap, 1);
  assert.match(result.holds[0], /Payment authorisation/);
});

test("applies the written payment-run cap", () => {
  const answers = answersAt(4);
  answers.A5 = 1;

  const result = scoreDiagnostic(answers);

  assert.equal(result.maturity.level, 2);
  assert.equal(result.cap, 2);
});

test("keeps six dimension scores instead of hiding them in one grade", () => {
  const answers = answersAt(3);
  for (const id of ["F1", "F2", "F3", "F4", "F5", "F6"]) answers[id] = 1;

  const result = scoreDiagnostic(answers);

  assert.equal(result.dimensions.length, 6);
  assert.equal(result.weakest.id, "Economics");
  assert.equal(result.weakest.average, 1);
});
