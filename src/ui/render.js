import { getDisabledReason } from "../core/choiceRules.js";
import { getChoiceAftermath, getEndingDisplay, getIntroEcho, getSettlementDisplay } from "../core/gameEngine.js";
import { getVisibleStats } from "../core/stateWords.js";
import { INTRO_CARDS, LEVEL_CARDS, getCardById } from "../data/levels.js";
import { STAT_MAX, STAT_MIN } from "../data/statConfig.js";

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

function renderHeader(card, state) {
  const progress = getChapterProgress(card);
  const chapterLine = progress
    ? `${card.chapterTitle ?? "普通难度"} · ${progress.current}/${progress.total}`
    : card.chapterTitle ?? "普通难度";

  return `
    <header class="card-header">
      <div>
        <p class="eyebrow">${escapeText(chapterLine)}</p>
        <h1>${escapeText(card.title ?? "普通生活")}</h1>
      </div>
    </header>
    ${progressDotsHtml(progress)}
    ${renderStatStrip(state)}
  `;
}

function restartFooterHtml() {
  return `
    <div class="restart-footer">
      <button class="restart-text-button" type="button">重新开始</button>
    </div>
  `;
}

function resultPanelHtml(choice, resultText, aftermath = "") {
  return `
    <div class="result-panel">
      ${choice ? `<p class="selected-choice">[${escapeText(choice.label)}]</p>` : ""}
      <p class="result-text">${escapeText(resultText)}</p>
      ${aftermath ? `<p class="aftermath-text">（${escapeText(aftermath)}）</p>` : ""}
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
  root.innerHTML = `
    <section class="game-card themed-card" style="${cardStyle(card)}">
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
      ${restartFooterHtml()}
    </section>
  `;

  root.querySelector(".continue-button").addEventListener("click", onContinue);
}

function renderHomeCard(root, onContinue) {
  root.innerHTML = `
    <section class="game-card home-card" aria-labelledby="home-title">
      <h1 id="home-title">普通难度</h1>
      <p class="home-kicker">一段普通生活记录。</p>
      <div class="home-lines">
        <p>读文字。</p>
        <p>做选择。</p>
        <p>继续。</p>
      </div>
      <div class="home-lines home-lines-secondary">
        <p>没有标准答案。</p>
        <p>只有之后发生的事。</p>
      </div>
      <div class="home-notes" aria-label="提示">
        <span>无需登录</span>
        <span>建议竖屏</span>
      </div>
      <button class="continue-button home-start-button" type="button">开始</button>
    </section>
  `;

  root.querySelector(".continue-button").addEventListener("click", onContinue);
}

function renderProfileCard(root, card, state, onContinue) {
  const display = getEndingDisplay(card, state);
  root.innerHTML = `
    <section class="game-card themed-card" style="${cardStyle(display)}">
      ${renderHeader(display, state)}
      <p class="scene-text">${escapeText(display.text ?? "")}</p>
      ${(display.lines ?? []).length > 0
        ? `<ul class="ending-list">${display.lines.map((line) => `<li class="ending-line">${escapeText(line)}</li>`).join("")}</ul>`
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
      <ul class="ending-list">
        <li class="ending-line">性别：女</li>
        <li class="ending-line">难度：普通</li>
      </ul>
      <div class="profile-afterword"></div>
    `;

    window.setTimeout(() => {
      const afterword = root.querySelector(".profile-afterword");
      afterword.innerHTML = `
        <p class="content-text">你刚才经历的，不是战场，不是末日，不是传奇，也不是一段特别糟糕的人生。</p>
        <p class="content-text">它只是一次普通难度。</p>
        <button class="continue-button" type="button">查看通关报告</button>
      `;
      afterword.querySelector(".continue-button").addEventListener("click", onContinue);
    }, 1500);
  });
}

function renderStaticCard(root, card, state, onContinue, onRestart) {
  const display = card.type === "ending" ? getEndingDisplay(card, state) : getSettlementDisplay(card, state);
  const primaryText = display.text ?? display.scene ?? "";
  root.innerHTML = `
    <section class="game-card themed-card" style="${cardStyle(display)}">
      ${renderHeader(display, state)}
      <p class="scene-text">${escapeText(primaryText)}</p>
      ${display.content ? `<p class="content-text">${escapeText(display.content)}</p>` : ""}
      ${(display.lines ?? []).length > 0
        ? `<ul class="ending-list">${display.lines.map((line) => `<li class="ending-line">${escapeText(line)}</li>`).join("")}</ul>`
        : ""}
      ${display.reveal ? `<p class="tag-line">${escapeText(display.reveal)}</p>` : ""}
      ${card.id === "E-04" ? "" : `<button class="continue-button" type="button">${escapeText(display.buttonLabel ?? "继续")}</button>`}
      ${restartFooterHtml()}
    </section>
  `;

  const action = card.id === "E-04" ? onRestart : onContinue;
  root.querySelector(".continue-button")?.addEventListener("click", action);
}

export function renderGame(root, { state, onChoose, onContinue, onRestart }) {
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
}
