import { getDisabledReason } from "../core/choiceRules.js";
import { getVisibleStats } from "../core/stateWords.js";
import { getCardById } from "../data/levels.js";

function escapeText(value) {
  const span = document.createElement("span");
  span.textContent = value;
  return span.innerHTML;
}

function renderStatStrip(state) {
  const visibleStats = getVisibleStats(state.stats, state.visibleStats);
  if (visibleStats.length === 0) return "";

  return `
    <p class="stat-strip" aria-label="当前状态">
      <span>记录：</span>
      ${visibleStats
        .map(
          (stat) => `
            <span class="stat-item">${escapeText(stat.label)}：${escapeText(stat.word)}</span>
          `
        )
        .join("")}
    </p>
  `;
}

function renderHeader(card, state) {
  return `
    <header class="card-header">
      <div>
        <p class="eyebrow">${escapeText(card.chapterTitle ?? "普通难度")}</p>
        <h1>${escapeText(card.title ?? "普通生活")}</h1>
      </div>
      <button class="restart-button" type="button" aria-label="重新开始">...</button>
    </header>
    ${renderStatStrip(state)}
  `;
}

function renderChoiceCard(root, card, state, onChoose) {
  root.innerHTML = `
    <section class="game-card">
      ${renderHeader(card, state)}
      <p class="scene-text">${escapeText(card.scene)}</p>
      <div class="choice-list">
        ${card.choices
          .map((choice) => {
            const reason = getDisabledReason(choice, state);
            return `
              <button class="choice-button" type="button" data-choice-id="${escapeText(choice.id)}" ${reason ? "disabled" : ""}>
                <span>${escapeText(choice.label)}</span>
                ${reason ? `<small>${escapeText(reason)}</small>` : ""}
              </button>
            `;
          })
          .join("")}
      </div>
    </section>
  `;

  for (const button of root.querySelectorAll(".choice-button")) {
    button.addEventListener("click", () => {
      const choice = card.choices.find((item) => item.id === button.dataset.choiceId);
      if (choice) onChoose(choice);
    });
  }
}

function renderResultCard(root, card, state, onContinue) {
  const result = state.pendingResult;
  root.innerHTML = `
    <section class="game-card">
      ${renderHeader(card, state)}
      <p class="result-text">${escapeText(result.text)}</p>
      <button class="continue-button" type="button">继续</button>
    </section>
  `;

  root.querySelector(".continue-button").addEventListener("click", onContinue);
}

function renderStaticCard(root, card, state, onContinue) {
  const primaryText = card.text ?? card.scene ?? "";
  root.innerHTML = `
    <section class="game-card">
      ${renderHeader(card, state)}
      <p class="scene-text">${escapeText(primaryText)}</p>
      ${card.content ? `<p class="content-text">${escapeText(card.content)}</p>` : ""}
      ${card.reveal ? `<p class="tag-line">${escapeText(card.reveal)}</p>` : ""}
      <button class="continue-button" type="button">继续</button>
    </section>
  `;

  root.querySelector(".continue-button").addEventListener("click", onContinue);
}

export function renderGame(root, { state, onChoose, onContinue, onRestart }) {
  const card = getCardById(state.currentCardId);

  if (!card) {
    root.innerHTML = `<section class="game-card"><p class="scene-text">没有找到当前卡片。</p></section>`;
    return;
  }

  if (state.phase === "result") {
    renderResultCard(root, card, state, onContinue);
  } else if (state.phase === "settlement" || state.phase === "ending") {
    renderStaticCard(root, card, state, onContinue);
  } else {
    renderChoiceCard(root, card, state, onChoose);
  }

  root.querySelector(".restart-button")?.addEventListener("click", onRestart);
}
