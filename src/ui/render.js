import { getDisabledReason } from "../core/choiceRules.js";
import {
  canGoToNextView,
  canGoToPreviousView,
  getChoiceAftermath,
  getEndingDisplay,
  getIntroEcho,
  getSettlementDisplay
} from "../core/gameEngine.js";
import { getVisibleStats } from "../core/stateWords.js";
import { INTRO_CARDS, LEVEL_CARDS, getCardById } from "../data/levels.js";
import { STAT_MAX, STAT_MIN } from "../data/statConfig.js";
import { HOME_CONTENT } from "../data/textConfig.js";

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

function clampStat(value) {
  return Math.min(STAT_MAX, Math.max(STAT_MIN, value));
}

function projectStatsAfterChoice(state, choice) {
  const stats = { ...state.stats };
  for (const [key, value] of Object.entries(choice.effects ?? {})) {
    stats[key] = clampStat((stats[key] ?? 0) + value);
  }
  return stats;
}

function updateStatStripAfterChoice(root, state, choice) {
  const currentStrip = root.querySelector(".stat-strip");
  if (!currentStrip) return;

  currentStrip.outerHTML = renderStatStrip({
    ...state,
    stats: projectStatsAfterChoice(state, choice)
  });
}

function getChapterTheme(card) {
  return INTRO_CARDS.find((intro) => intro.chapterId === card?.chapterId)?.theme;
}

const SHORT_MAINLINE_PROGRESS = {
  "C3-03": { current: 1, total: 3 },
  "C3-04": { current: 2, total: 3 },
  "C3-05": { current: 3, total: 3 },
  "C3-06": { current: 3, total: 3 },
  "C4-02": { current: 1, total: 3 },
  "C4-04": { current: 2, total: 3 },
  "C4-06": { current: 3, total: 3 },
  "C4-07": { current: 3, total: 3 }
};

function getChapterProgress(card) {
  if (card?.type !== "level" || card.insert || card.crisis) return null;
  if (card.progress) return card.progress;
  if (SHORT_MAINLINE_PROGRESS[card.id]) return SHORT_MAINLINE_PROGRESS[card.id];

  const chapterCards = LEVEL_CARDS.filter((item) => item.chapterId === card.chapterId);
  const index = chapterCards.findIndex((item) => item.id === card.id);
  if (index === -1) return null;

  return {
    current: index + 1,
    total: chapterCards.length
  };
}

function progressDotsHtml(progress) {
  if (!progress) return "";

  return `
    <div class="progress-dots" aria-label="当前关卡 ${progress.current}/${progress.total}">
      ${Array.from({ length: progress.total }, (_, index) =>
        `<span class="progress-dot${index + 1 === progress.current ? " is-current" : ""}"></span>`
      ).join("")}
    </div>
  `;
}

function renderHeader(card, state, options = {}) {
  const progress = getChapterProgress(card);
  const chapterLine = progress
    ? `${card.chapterTitle ?? "普通难度"} · ${progress.current}/${progress.total}`
    : card.chapterTitle ?? "普通难度";
  const showStats = options.showStats ?? true;

  return `
    <header class="card-header">
      <div>
        <p class="eyebrow">${escapeText(chapterLine)}</p>
        <h1>${escapeText(card.title ?? "普通生活")}</h1>
      </div>
    </header>
    ${progressDotsHtml(progress)}
    ${showStats ? renderStatStrip(state) : ""}
  `;
}

function restartFooterHtml() {
  return `
    <div class="restart-footer">
      <button class="restart-text-button" type="button">重新开始</button>
    </div>
  `;
}

function historyNavHtml(state) {
  return `
    <nav class="history-nav" aria-label="页面历史">
      <button class="history-button" type="button" data-history-action="previous" ${canGoToPreviousView(state) ? "" : "disabled"}>← 上一页</button>
      <button class="history-button" type="button" data-history-action="next" ${canGoToNextView(state) ? "" : "disabled"}>下一页 →</button>
    </nav>
  `;
}

function formatAftermathText(aftermath) {
  return aftermath.replace(/[。.!！]+$/u, "");
}

function resultPanelHtml(choice, resultText, aftermath = "") {
  return `
    <div class="result-panel">
      ${choice ? `<p class="selected-choice">[${escapeText(choice.label)}]</p>` : ""}
      <p class="result-text">${escapeText(resultText)}</p>
      ${aftermath ? `<p class="aftermath-text">（${escapeText(formatAftermathText(aftermath))}）</p>` : ""}
    </div>
  `;
}

function revealInlineResult(root, choice, aftermath, onContinue) {
  const choiceList = root.querySelector(".choice-list");
  if (!choiceList) return;

  choiceList.outerHTML = `
    ${resultPanelHtml(choice, choice.result, aftermath)}
    <button class="continue-button" type="button">继续</button>
  `;
  root.querySelector(".continue-button").addEventListener("click", onContinue);
}

function renderChoiceCard(root, card, state, onChoose, onContinue) {
  const isReviewing = state.isViewingHistory === true;
  root.innerHTML = `
    <section class="game-card themed-card" style="${cardStyle(card)}">
      ${renderHeader(card, state)}
      <p class="scene-text">${escapeText(card.scene)}</p>
      <div class="choice-list">
        ${card.choices
          .map((choice) => {
            const reason = getDisabledReason(choice, state);
            const disabled = reason || isReviewing;
            return `
              <button class="choice-button" type="button" data-choice-id="${escapeText(choice.id)}" ${disabled ? "disabled" : ""}>
                <span>${escapeText(choice.label)}</span>
                ${reason ? `<small>${escapeText(reason)}</small>` : ""}
              </button>
            `;
          })
          .join("")}
      </div>
      ${historyNavHtml(state)}
      ${restartFooterHtml()}
    </section>
  `;

  for (const button of root.querySelectorAll(".choice-button")) {
    button.addEventListener("click", () => {
      const choice = card.choices.find((item) => item.id === button.dataset.choiceId);
      if (choice) {
        updateStatStripAfterChoice(root, state, choice);
        revealInlineResult(root, choice, getChoiceAftermath(state, choice), onContinue);
        onChoose(choice, { render: false });
      }
    });
  }
}

function renderResultCard(root, card, state, onContinue) {
  const result = state.pendingResult;
  const selectedChoice = card.choices?.find((choice) => choice.id === result.choiceId);
  root.innerHTML = `
    <section class="game-card themed-card" style="${cardStyle(card)}">
      ${renderHeader(card, state)}
      <p class="scene-text">${escapeText(card.scene)}</p>
      ${resultPanelHtml(selectedChoice, result.text, result.aftermath)}
      <button class="continue-button" type="button">继续</button>
      ${historyNavHtml(state)}
      ${restartFooterHtml()}
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

function cardStyle(card) {
  return themeStyle(getChapterTheme(card));
}

function renderIntroCard(root, card, state, onContinue) {
  const echo = getIntroEcho(card, state);
  root.innerHTML = `
    <section class="game-card themed-card chapter-intro-card" style="${themeStyle(card.theme)}">
      <p class="intro-kicker">${escapeText(card.kicker)}</p>
      <h1>${escapeText(card.title)}</h1>
      ${echo ? `<p class="intro-echo">上一段记录：${escapeText(echo)}</p>` : ""}
      <p class="scene-text">${escapeText(card.text)}</p>
      <p class="intro-objective">${escapeText(card.objective)}</p>
      <button class="continue-button intro-button" type="button">${escapeText(card.buttonLabel)}</button>
      ${historyNavHtml(state)}
      ${restartFooterHtml()}
    </section>
  `;

  root.querySelector(".continue-button").addEventListener("click", onContinue);
}

function renderHomeCard(root, onContinue) {
  root.innerHTML = `
    <section class="game-card home-card" aria-labelledby="home-title">
      <h1 id="home-title">${escapeText(HOME_CONTENT.title)}</h1>
      <p class="home-kicker">${escapeText(HOME_CONTENT.subtitle)}</p>
      <div class="home-lines">
        ${(HOME_CONTENT.primaryLines ?? []).map((line) => `<p>${escapeText(line)}</p>`).join("")}
      </div>
      <div class="home-lines home-lines-secondary">
        ${(HOME_CONTENT.secondaryLines ?? []).map((line) => `<p>${escapeText(line)}</p>`).join("")}
      </div>
      <div class="home-notes" aria-label="提示">
        ${(HOME_CONTENT.noteLine ?? []).map((line) => `<span>${escapeText(line)}</span>`).join("")}
      </div>
      <div class="home-meta" aria-label="记录信息">
        ${(HOME_CONTENT.metaLines ?? [])
          .map((line) => `
            <p>
              ${line.map((item) => `<span>${escapeText(item)}</span>`).join("")}
            </p>
          `)
          .join("")}
      </div>
      <button class="continue-button home-start-button" type="button">${escapeText(HOME_CONTENT.buttonLabel)}</button>
    </section>
  `;

  root.querySelector(".continue-button").addEventListener("click", onContinue);
}

function renderProfileCard(root, card, state, onContinue) {
  const display = getEndingDisplay(card, state);
  root.innerHTML = `
    <section class="game-card themed-card" style="${cardStyle(display)}">
      ${renderHeader(display, state, { showStats: false })}
      <p class="scene-text">${escapeText(display.text ?? "")}</p>
      ${(display.lines ?? []).length > 0
        ? `<ul class="profile-list">${display.lines.map((line) => `<li>${escapeText(line)}</li>`).join("")}</ul>`
        : ""}
      <div class="profile-reveal" aria-live="polite"></div>
      <button class="continue-button" type="button">${escapeText(display.buttonLabel ?? "继续生成")}</button>
      ${restartFooterHtml()}
    </section>
  `;

  root.querySelector(".continue-button").addEventListener("click", (event) => {
    event.currentTarget.remove();
    const reveal = root.querySelector(".profile-reveal");
    reveal.innerHTML = `
      <div class="profile-identity-card">
        <p>性别：女</p>
        <p>难度：普通</p>
      </div>
      <div class="profile-afterword"></div>
    `;

    window.setTimeout(() => {
      const afterword = root.querySelector(".profile-afterword");
      afterword.innerHTML = `
        <p class="content-text">你刚才经历的，不是战场，不是末日，不是传奇，也不是一段特别糟糕的人生。</p>
        <p class="content-text">它只是一次普通难度。</p>
        <button class="continue-button" type="button">查看通关记录</button>
      `;
      afterword.querySelector(".continue-button").addEventListener("click", onContinue);
    }, 1500);
  });
}

function timelineHtml(items = []) {
  if (items.length === 0) return "";

  return `
    <div class="ending-timeline" aria-label="本局路径">
      ${items
        .map((item) => `
          <div class="timeline-item">
            <span>${escapeText(item.chapter)}</span>
            <p>${escapeText(item.text)}</p>
          </div>
        `)
        .join("")}
    </div>
  `;
}

function statusOverviewHtml(display) {
  if (!display.statusItems) return "";

  return `
    <div class="ending-status-overview">
      <section class="final-section" aria-labelledby="ending-status-title">
        <p class="section-label" id="ending-status-title">状态</p>
        <div class="status-grid">
          ${display.statusItems
            .map((item) => `
              <div class="status-card${item.word === "危险" ? " is-danger" : ""}">
                <span>${escapeText(item.label)}</span>
                <strong>${escapeText(item.word)}</strong>
              </div>
            `)
            .join("")}
        </div>
      </section>

      <section class="final-section" aria-labelledby="ending-counter-title">
        <p class="section-label" id="ending-counter-title">本次记录</p>
        <ul class="ending-counter-list">
          ${(display.counterLines ?? []).map((line) => `<li>${escapeText(line)}</li>`).join("")}
        </ul>
      </section>

      <section class="blocked-choice-block" aria-labelledby="blocked-choice-title">
        <p class="section-label" id="blocked-choice-title">被拿走的选择</p>
        ${(display.blockedChoiceLines ?? []).map((line) => `<p>${escapeText(line)}</p>`).join("")}
      </section>
    </div>
  `;
}

function finalReportHtml(report) {
  return `
    <div class="final-report">
      <section class="final-situation" aria-labelledby="final-situation-title">
        <p class="section-label" id="final-situation-title">本次处境</p>
        <h2>${escapeText(report.situation.label)}</h2>
        <p>${escapeText(report.situation.text)}</p>
      </section>

      <section class="final-section cost-section" aria-labelledby="final-cost-title">
        <p class="section-label" id="final-cost-title">本次代价</p>
        <div class="cost-lines">
          ${report.costLines.map((line) => `<p>${escapeText(line)}</p>`).join("")}
        </div>
      </section>

      <section class="concept-section" aria-labelledby="final-concept-title">
        <p class="section-label" id="final-concept-title">处境说明</p>
        <p>${escapeText(report.concept)}</p>
      </section>

      <section class="theme-section" aria-label="主题">
        ${report.themeLines.map((line) => `<p>${escapeText(line)}</p>`).join("")}
        <p class="final-line">${escapeText(report.finalLine)}</p>
      </section>
    </div>
  `;
}

function renderStaticCard(root, card, state, onContinue, onRestart) {
  const display = card.type === "ending" ? getEndingDisplay(card, state) : getSettlementDisplay(card, state);
  const primaryText = display.text ?? display.scene ?? "";
  const isFinalReport = Boolean(display.finalReport);
  const isEndingCard = display.type === "ending";
  root.innerHTML = `
    <section class="game-card themed-card" style="${cardStyle(display)}">
      ${renderHeader(display, state, { showStats: !isEndingCard })}
      ${primaryText ? `<p class="scene-text">${escapeText(primaryText)}</p>` : ""}
      ${display.content ? `<p class="content-text">${escapeText(display.content)}</p>` : ""}
      ${timelineHtml(display.timelineItems)}
      ${statusOverviewHtml(display)}
      ${(display.lines ?? []).length > 0
        ? `<ul class="ending-list">${display.lines.map((line) => `<li class="ending-line">${escapeText(line)}</li>`).join("")}</ul>`
        : ""}
      ${isFinalReport ? finalReportHtml(display.finalReport) : ""}
      ${display.reveal ? `<p class="tag-line">${escapeText(display.reveal)}</p>` : ""}
      ${isFinalReport ? "" : historyNavHtml(state)}
      <button class="continue-button${isFinalReport ? " final-restart-button" : ""}" type="button">${escapeText(display.buttonLabel ?? "继续")}</button>
      ${isFinalReport ? "" : restartFooterHtml()}
    </section>
  `;

  const action = isFinalReport ? onRestart : onContinue;
  root.querySelector(".continue-button")?.addEventListener("click", action);
}

export function renderGame(root, { state, onChoose, onContinue, onPrevious, onNext, onRestart }) {
  if (state.phase === "home") {
    renderHomeCard(root, onContinue);
    return;
  }

  const card = getCardById(state.currentCardId);

  if (!card) {
    root.innerHTML = `<section class="game-card"><p class="scene-text">没有找到当前卡片。</p></section>`;
    return;
  }

  if (state.phase === "result") {
    renderResultCard(root, card, state, onContinue);
  } else if (card.type === "chapterIntro") {
    renderIntroCard(root, card, state, onContinue);
  } else if (card.id === "E-03") {
    renderProfileCard(root, card, state, onContinue);
  } else if (state.phase === "settlement" || state.phase === "ending") {
    renderStaticCard(root, card, state, onContinue, onRestart);
  } else {
    renderChoiceCard(root, card, state, onChoose, onContinue);
  }

  root.querySelector(".restart-text-button")?.addEventListener("click", onRestart);
  root.querySelector('[data-history-action="previous"]')?.addEventListener("click", onPrevious ?? (() => {}));
  root.querySelector('[data-history-action="next"]')?.addEventListener("click", onNext ?? (() => {}));
}
