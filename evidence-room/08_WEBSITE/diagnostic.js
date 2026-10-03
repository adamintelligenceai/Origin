import {
  DIMENSIONS,
  QUESTIONS,
  SCORE_LABELS,
  getProgress,
  scoreDiagnostic,
} from "./diagnostic-core.js";

const STORAGE_KEY = "evidence-room-readiness-v2";
const state = {
  answers: loadAnswers(),
  activeIndex: 0,
};

const app = document.querySelector("#diagnostic-app");
const progressBar = document.querySelector("#progress-bar");
const progressText = document.querySelector("#progress-text");
const xpText = document.querySelector("#xp-text");
const result = document.querySelector("#results");

function loadAnswers() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    return typeof saved === "object" && saved !== null ? saved : {};
  } catch {
    return {};
  }
}

function saveAnswers() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.answers));
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function updateProgress() {
  const progress = getProgress(state.answers);
  progressBar.style.width = `${progress.percent}%`;
  progressText.textContent = `${progress.answered} of ${progress.total} evidence checks`;
  xpText.textContent = `${progress.xp} / 360 XP`;

  DIMENSIONS.forEach((dimension) => {
    const badge = document.querySelector(`[data-badge="${dimension.id}"]`);
    const complete = dimension.questions.every(([id]) =>
      Number.isInteger(state.answers[id]),
    );
    badge.classList.toggle("earned", complete);
    badge.setAttribute(
      "aria-label",
      `${dimension.id} ${complete ? "badge earned" : "badge locked"}`,
    );
  });
}

function goTo(index) {
  state.activeIndex = Math.max(0, Math.min(index, QUESTIONS.length - 1));
  document.querySelectorAll(".mission-card").forEach((card, cardIndex) => {
    card.hidden = cardIndex !== state.activeIndex;
  });
  document.querySelector(`[data-card-index="${state.activeIndex}"]`)?.focus();
  document.querySelector("#mission-position").textContent =
    `Mission ${state.activeIndex + 1} / ${QUESTIONS.length}`;
}

function buildMission(question, index) {
  const card = element("article", "mission-card");
  card.dataset.cardIndex = String(index);
  card.tabIndex = -1;
  card.hidden = index !== 0;

  const dimension = DIMENSIONS.find((item) => item.id === question.dimension);
  const meta = element("div", "mission-meta");
  meta.append(
    element("span", "mission-code", question.id),
    element("span", "", `${question.dimension} · ${dimension.description}`),
  );

  card.append(
    meta,
    element("h2", "mission-title", question.title),
    element("p", "mission-prompt", question.prompt),
    element(
      "p",
      "quiet",
      "Choose the lowest score that is fully true. Evidence beats confidence.",
    ),
  );

  const options = element("div", "score-options");
  options.setAttribute("role", "radiogroup");
  options.setAttribute("aria-label", `Score ${question.id}`);

  SCORE_LABELS.forEach((label, score) => {
    const option = element("label", "score-option");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = question.id;
    input.value = String(score);
    input.checked = state.answers[question.id] === score;
    input.addEventListener("change", () => {
      state.answers[question.id] = score;
      saveAnswers();
      updateProgress();
      option.closest(".mission-card").classList.add("answered");
      window.setTimeout(() => {
        if (index < QUESTIONS.length - 1) goTo(index + 1);
      }, 220);
    });

    const scoreNumber = element("strong", "score-number", String(score));
    const scoreLabel = element("span", "score-label", label);
    option.append(input, scoreNumber, scoreLabel);
    options.append(option);
  });

  const controls = element("div", "mission-controls");
  const previous = element("button", "btn secondary", "Previous");
  previous.type = "button";
  previous.disabled = index === 0;
  previous.addEventListener("click", () => goTo(index - 1));

  const next = element(
    "button",
    "btn secondary",
    index === QUESTIONS.length - 1 ? "Review score" : "Skip for now",
  );
  next.type = "button";
  next.addEventListener("click", () => {
    if (index === QUESTIONS.length - 1) showResults();
    else goTo(index + 1);
  });
  controls.append(previous, next);

  card.append(options, controls);
  return card;
}

function renderMissions() {
  const fragment = document.createDocumentFragment();
  QUESTIONS.forEach((question, index) =>
    fragment.append(buildMission(question, index)),
  );
  app.replaceChildren(fragment);

  const firstMissing = QUESTIONS.findIndex(
    (question) => !Number.isInteger(state.answers[question.id]),
  );
  goTo(firstMissing === -1 ? QUESTIONS.length - 1 : firstMissing);
  updateProgress();
}

function heatLabel(average) {
  if (average < 1.5) return "Cold · path or evidence is mostly informal";
  if (average < 3) return "Warm · documented with operating gaps";
  return "Hot · used and sampled";
}

function showResults() {
  const scored = scoreDiagnostic(state.answers);
  result.replaceChildren();

  if (!scored.complete) {
    result.append(
      element("p", "eyebrow", "Debrief locked"),
      element("h2", "", `${scored.missing.length} evidence checks remain`),
      element(
        "p",
        "",
        "Complete every mission to unlock the readiness debrief. Your progress is saved only in this browser.",
      ),
    );
    const resume = element("button", "btn", "Resume assessment");
    resume.type = "button";
    resume.addEventListener("click", () => {
      const firstMissing = QUESTIONS.findIndex((question) =>
        scored.missing.includes(question.id),
      );
      goTo(firstMissing);
      document
        .querySelector("#assessment")
        ?.scrollIntoView({ behavior: "smooth" });
    });
    result.append(resume);
    result.hidden = false;
    result.scrollIntoView({ behavior: "smooth" });
    return;
  }

  const heading = element("div", "result-heading");
  const level = element("div", "level-seal", `L${scored.maturity.level}`);
  const summary = element("div", "");
  summary.append(
    element("p", "eyebrow", "Provisional quantitative placement"),
    element("h2", "", scored.maturity.name),
    element("p", "lede", scored.maturity.statement),
  );
  heading.append(level, summary);
  result.append(heading);

  const grid = element("div", "result-grid");
  scored.dimensions.forEach((dimension) => {
    const card = element("article", "dimension-result");
    const top = element("div", "dimension-top");
    top.append(
      element("strong", "", dimension.id),
      element("span", "dimension-score", dimension.average.toFixed(1)),
    );
    const bar = element("div", "bar");
    const fill = element("span", "");
    fill.style.width = `${(dimension.average / 4) * 100}%`;
    bar.append(fill);
    card.append(top, bar, element("p", "quiet", heatLabel(dimension.average)));
    grid.append(card);
  });
  result.append(grid);

  if (scored.holds.length) {
    const holds = element("section", "holds-panel");
    holds.append(element("p", "eyebrow", "Control holds"));
    const list = document.createElement("ul");
    scored.holds.forEach((hold) => list.append(element("li", "", hold)));
    holds.append(list);
    result.append(holds);
  }

  const nextStep = element("section", "next-step-card");
  nextStep.append(
    element("p", "eyebrow", "Your next move"),
    element(
      "h3",
      "",
      `Strengthen ${scored.weakest.id} before expanding autonomy`,
    ),
    element(
      "p",
      "",
      "Use the Professional OS to turn this heatmap into named Wave 1 charters, evidence gates, controls, and a two-week shadow plan.",
    ),
  );
  const actions = element("div", "hero-actions");
  const buy = element("a", "btn gilt", "Get Professional · $199");
  buy.href = "professional.html#buy";
  const print = element("button", "btn secondary", "Print / save PDF");
  print.type = "button";
  print.addEventListener("click", () => window.print());
  actions.append(buy, print);
  nextStep.append(actions);
  result.append(nextStep);

  result.append(
    element(
      "p",
      "quiet result-disclaimer",
      "This is not a certificate, audit, fraud assessment, financial advice, or permission to automate. Confirm the qualitative maturity tests and use the lower band when in doubt.",
    ),
  );
  result.hidden = false;
  result.scrollIntoView({ behavior: "smooth" });
}

document.querySelector("#scoreBtn")?.addEventListener("click", showResults);
document.querySelector("#resetBtn")?.addEventListener("click", () => {
  if (!window.confirm("Clear all locally saved answers and restart?")) return;
  localStorage.removeItem(STORAGE_KEY);
  state.answers = {};
  result.hidden = true;
  renderMissions();
});

renderMissions();
