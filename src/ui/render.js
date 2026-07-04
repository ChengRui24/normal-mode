import { getDisabledReason } from "../core/choiceRules.js";
import { getEndingDisplay } from "../core/gameEngine.js";
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
      <button class="restart-button" type="button" aria-label="重新开始" title="重新开始">
        <svg class="restart-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24">
          <path d="M3 12a9 9 0 1 0 3-6.7" />
          <path d="M3 4v6h6" />
        </svg>
      </button>
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

function themeStyle(theme = {}) {
  const primary = theme.primary ?? "#7A6D5E";
  const surface = theme.surface ?? "#F7F4EF";
  const accent = theme.accent ?? "#4F463D";
  return `--chapter-primary: ${escapeText(primary)}; --chapter-surface: ${escapeText(surface)}; --chapter-accent: ${escapeText(accent)};`;
}

function renderIntroCard(root, card, onContinue) {
  root.innerHTML = `
    <section class="game-card chapter-intro-card" style="${themeStyle(card.theme)}">
      <p class="intro-kicker">${escapeText(card.kicker)}</p>
      <h1>${escapeText(card.title)}</h1>
      <p class="scene-text">${escapeText(card.text)}</p>
      <p class="intro-objective">${escapeText(card.objective)}</p>
      <button class="continue-button intro-button" type="button">${escapeText(card.buttonLabel)}</button>
    </section>
  `;

  root.querySelector(".continue-button").addEventListener("click", onContinue);
}

function renderStaticCard(root, card, state, onContinue) {
  const display = card.type === "ending" ? getEndingDisplay(card, state) : card;
  const primaryText = display.text ?? display.scene ?? "";
  root.innerHTML = `
    <section class="game-card">
      ${renderHeader(display, state)}
      <p class="scene-text">${escapeText(primaryText)}</p>
      ${display.content ? `<p class="content-text">${escapeText(display.content)}</p>` : ""}
      ${(display.lines ?? []).length > 0
        ? `<ul class="ending-list">${display.lines.map((line) => `<li class="ending-line">${escapeText(line)}</li>`).join("")}</ul>`
        : ""}
      ${display.reveal ? `<p class="tag-line">${escapeText(display.reveal)}</p>` : ""}
      <button class="continue-button" type="button">${escapeText(display.buttonLabel ?? "继续")}</button>
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
  } else if (card.type === "chapterIntro") {
    renderIntroCard(root, card, onContinue);
  } else if (state.phase === "settlement" || state.phase === "ending") {
    renderStaticCard(root, card, state, onContinue);
  } else {
    renderChoiceCard(root, card, state, onChoose);
  }

  root.querySelector(".restart-button")?.addEventListener("click", onRestart);
}
