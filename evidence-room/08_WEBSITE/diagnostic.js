/* Local-only AP Agent Readiness scorer. No network. No invoice upload. */
(function () {
  const dims = {
    Process: ["A1", "A2", "A3", "A4", "A5", "A6"],
    Data: ["B1", "B2", "B3", "B4", "B5", "B6"],
    Controls: ["C1", "C2", "C3", "C4", "C5", "C6"],
    Technology: ["T1", "T2", "T3", "T4", "T5", "T6"],
    Talent: ["P1", "P2", "P3", "P4", "P5", "P6"],
    Economics: ["E1", "E2", "E3", "E4", "E5", "E6"],
  };

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  const btn = document.getElementById("scoreBtn");
  if (!btn) return;

  btn.addEventListener("click", function () {
    const miss = [];
    let a5 = null;
    const box = document.getElementById("results");
    box.replaceChildren();
    box.appendChild(el("h2", "", "Dimension averages"));
    box.appendChild(el("p", "quiet", "Not a certificate. Not a composite grade."));

    Object.keys(dims).forEach(function (dim) {
      const ids = dims[dim];
      const vals = [];
      ids.forEach(function (id) {
        const checked = document.querySelector('input[name="' + id + '"]:checked');
        if (!checked) {
          miss.push(id);
          return;
        }
        const n = Number(checked.value);
        if (id === "A5") a5 = n;
        vals.push(n);
      });
      const avg = vals.length ? vals.reduce(function (x, y) { return x + y; }, 0) / vals.length : null;
      const line = el("p", "");
      const strong = el("strong", "", dim);
      line.appendChild(strong);
      line.appendChild(document.createTextNode(" " + (avg === null ? "unscored" : avg.toFixed(2))));
      box.appendChild(line);
      const bar = el("div", "bar");
      const span = el("span", "");
      span.style.width = (avg === null ? 0 : (avg / 4) * 100) + "%";
      bar.appendChild(span);
      box.appendChild(bar);
    });

    if (a5 !== null && a5 <= 1) {
      box.appendChild(el("p", "note", "Veto: A5 is 0 or 1. Do not place maturity above L2 until the payment procedure is written."));
    }
    if (miss.length) {
      box.appendChild(el("p", "quiet", "Unscored: " + miss.join(", ")));
    }
    box.appendChild(el("p", "", "Next: read Method, then charter Wave 1. Do not paste vendor cost-per-invoice figures as targets."));
    box.style.display = "block";
  });
})();
