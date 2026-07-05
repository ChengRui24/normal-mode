// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from "vitest";
import packageInfo from "../../package.json";
import { createInitialState } from "../../src/core/initialState.js";
import { advanceAfterResult, applyChoice, getViewedState, goToPreviousView, startGame } from "../../src/core/gameEngine.js";
import { getCardById } from "../../src/data/levels.js";
import { renderGame } from "../../src/ui/render.js";

function todayRecordDate() {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Singapore",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  })
    .format(new Date())
    .replaceAll("-", ".");
}

describe("renderGame", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the home screen before the first chapter intro", () => {
    const root = document.createElement("main");
    const onContinue = vi.fn();

    renderGame(root, {
      state: createInitialState(),
      onChoose: vi.fn(),
      onContinue,
      onRestart: vi.fn()
    });

    expect(root.querySelector(".home-card")).not.toBe(null);
    expect(root.textContent).toContain("普通难度");
    expect(root.textContent).toContain("一段普通生活记录");
    expect(root.textContent).toContain("读文字。");
    expect(root.textContent).toContain("做选择。");
    expect(root.textContent).toContain("继续。");
    expect(root.textContent).toContain("没有标准答案。");
    expect(root.textContent).toContain("只有之后发生的事。");
    expect(root.textContent).not.toContain("无需登录");
    expect(root.textContent).toContain("建议竖屏");
    expect(root.textContent).toContain("序章 + 六章 + 终章");
    expect(root.textContent).toContain("约 10-15 分钟");
    expect(root.textContent).toContain(`记录版本：v${packageInfo.version} · ${todayRecordDate()}`);
    expect(root.querySelector(".restart-button")).toBe(null);
    expect(root.querySelector(".restart-text-button")).toBe(null);
    expect(root.querySelector(".stat-strip")).toBe(null);

    const button = root.querySelector("button.continue-button");
    expect(button?.textContent).toBe("开始");
    button?.click();
    expect(onContinue).toHaveBeenCalledTimes(1);
  });

  it("renders chapter intro cards with theme variables and a single enter button", () => {
    const root = document.createElement("main");
    const onContinue = vi.fn();

    renderGame(root, {
      state: {
        ...createInitialState(),
        phase: "intro",
        currentCardId: "C1-I"
      },
      onChoose: vi.fn(),
      onContinue,
      onRestart: vi.fn()
    });

    const card = root.querySelector(".chapter-intro-card");
    expect(card).not.toBe(null);
    expect(card?.getAttribute("style")).toContain("--chapter-primary: #7A6D5E");
    expect(root.textContent).toContain("第一章");
    expect(root.textContent).toContain("筛选");
    expect(root.textContent).toContain("目标：获得一个位置。");
    expect(root.textContent).not.toContain("记录：");

    const button = root.querySelector("button.continue-button");
    expect(button?.textContent).toBe("进入筛选");
    button?.click();
    expect(onContinue).toHaveBeenCalledTimes(1);
  });

  it("renders a choice card with action buttons", () => {
    const root = document.createElement("main");
    const onChoose = vi.fn();

    renderGame(root, {
      state: {
        ...createInitialState(),
        phase: "choice",
        currentCardId: "C3-04",
        visibleStats: ["reputation", "money", "safety"]
      },
      onChoose,
      onContinue: vi.fn(),
      onRestart: vi.fn()
    });

    expect(root.textContent).toContain("第三章");
    expect(root.textContent).toContain("第三章：路上 · 2/3");
    expect(root.textContent).toContain("加班后的路线");
    expect(root.querySelector(".game-card")?.getAttribute("style")).toContain("--chapter-primary: #65798A");
    expect(root.querySelectorAll(".progress-dot")).toHaveLength(3);
    expect(root.querySelectorAll(".progress-dot.is-current")).toHaveLength(1);
    expect(root.querySelectorAll("button.choice-button").length).toBeGreaterThanOrEqual(2);
  });

  it("renders bottom history navigation without exposing answered choice pages", () => {
    let state = advanceAfterResult(startGame(createInitialState()));
    state = applyChoice(state, getCardById("P-01").choices[0]);
    state = advanceAfterResult(state);
    state = applyChoice(state, getCardById("P-04").choices[0]);
    state = advanceAfterResult(state);
    state = advanceAfterResult(state);
    const reviewing = getViewedState(goToPreviousView(goToPreviousView(state)));
    const root = document.createElement("main");
    const onPrevious = vi.fn();
    const onNext = vi.fn();

    renderGame(root, {
      state: reviewing,
      onChoose: vi.fn(),
      onContinue: vi.fn(),
      onPrevious,
      onNext,
      onRestart: vi.fn()
    });

    const historyButtons = root.querySelectorAll(".history-button");
    expect(historyButtons).toHaveLength(2);
    expect(historyButtons[0].textContent).toBe("← 上一页");
    expect(historyButtons[1].textContent).toBe("下一页 →");
    expect(historyButtons[0].disabled).toBe(false);
    expect(historyButtons[1].disabled).toBe(false);
    expect(root.textContent).toContain("[先发消息说明已经到楼下]");
    expect(root.querySelector(".result-panel")).not.toBe(null);
    expect(root.querySelectorAll(".choice-button")).toHaveLength(0);

    historyButtons[0].click();
    historyButtons[1].click();

    expect(onPrevious).toHaveBeenCalledTimes(1);
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("reveals the result in place without replacing the current card", () => {
    const root = document.createElement("main");
    const onChoose = vi.fn();
    const onContinue = vi.fn();

    renderGame(root, {
      state: {
        ...createInitialState(),
        phase: "choice",
        currentCardId: "C6-08",
        visibleStats: ["reputation", "money", "safety", "energy", "relationship", "self"]
      },
      onChoose,
      onContinue,
      onRestart: vi.fn()
    });

    const gameCard = root.querySelector(".game-card");
    const appealButton = [...root.querySelectorAll("button.choice-button")].find((button) =>
      button.textContent.includes("继续申诉")
    );

    appealButton?.click();

    expect(root.querySelector(".game-card")).toBe(gameCard);
    expect(onChoose).toHaveBeenCalledTimes(1);
    expect(root.querySelectorAll("button.choice-button").length).toBe(0);
    expect(root.querySelector(".selected-choice")?.textContent).toBe("[继续申诉]");
    expect(root.textContent).toContain("你点开申诉入口，又开始整理时间、截图和说明。系统允许你继续，也要求你再说一遍。");
    expect(root.textContent).toContain("（你开始只处理最急的部分）");
    expect(root.querySelector(".aftermath-text")).not.toBe(null);
    expect(root.querySelector(".stat-strip")?.textContent).toContain("精力：紧张");
    expect(root.querySelector(".stat-strip")?.textContent).toContain("钱：紧张");

    root.querySelector("button.continue-button")?.click();
    expect(onContinue).toHaveBeenCalledTimes(1);
  });

  it("renders result inline with the selected option kept as plain text", () => {
    const root = document.createElement("main");

    renderGame(root, {
      state: {
        ...createInitialState(),
        phase: "result",
        currentCardId: "C6-08",
        pendingResult: {
          choiceId: "appeal",
          text: "你点开申诉入口，又开始整理时间、截图和说明。系统允许你继续，也要求你再说一遍。"
        }
      },
      onChoose: vi.fn(),
      onContinue: vi.fn(),
      onRestart: vi.fn()
    });

    expect(root.textContent).toContain("未发现明确违规");
    const resultPanel = root.querySelector(".result-panel");
    expect(resultPanel).not.toBe(null);
    const selected = root.querySelector(".selected-choice");
    expect(selected).not.toBe(null);
    expect(selected?.textContent).toBe("[继续申诉]");
    expect(selected?.tagName).toBe("P");
    expect(resultPanel?.contains(selected)).toBe(true);
    expect(root.querySelector("button.selected-choice")).toBe(null);
    expect(root.querySelectorAll("button.choice-button").length).toBe(0);
    expect(root.textContent).toContain("你点开申诉入口，又开始整理时间、截图和说明。系统允许你继续，也要求你再说一遍。");
    expect(root.textContent).not.toContain("你选择了");
    expect(root.textContent).not.toContain("自我 +1");
    expect(root.textContent).not.toContain("精力 -2");
    expect(root.textContent).not.toContain("新增状态");
    expect(root.querySelectorAll(".change-line").length).toBe(0);
  });

  it("renders saved aftermath text on a result card when present", () => {
    const root = document.createElement("main");

    renderGame(root, {
      state: {
        ...createInitialState(),
        phase: "result",
        currentCardId: "C3-04",
        pendingResult: {
          choiceId: "taxi",
          text: "你坐进车里，不用经过那段路。价格比白天更像一张提醒。",
          aftermath: "余额变薄了。"
        }
      },
      onChoose: vi.fn(),
      onContinue: vi.fn(),
      onRestart: vi.fn()
    });

    expect(root.textContent).toContain("（余额变薄了）");
    expect(root.querySelector(".aftermath-text")?.textContent).toBe("（余额变薄了）");
    expect(root.textContent).not.toContain("钱 -2");
  });

  it("renders dynamic ending lines without raw score numbers", () => {
    const root = document.createElement("main");

    renderGame(root, {
      state: {
        ...createInitialState(),
        phase: "ending",
        currentCardId: "E-02",
        stats: {
          ...createInitialState().stats,
          safety: 2
        }
      },
      onChoose: vi.fn(),
      onContinue: vi.fn(),
      onRestart: vi.fn()
    });

    expect(root.textContent).toContain("状态总览");
    expect(root.textContent).toContain("系统第一次把所有状态摆在一起");
    expect(root.textContent).toContain("安全感");
    expect(root.textContent).toContain("危险");
    expect(root.textContent).toContain("本次记录");
    expect(root.textContent).toContain("被拿走的选择");
    expect(root.textContent).not.toContain("2/12");
    expect(root.querySelector(".stat-strip")).toBe(null);
    expect(root.querySelectorAll(".status-card")).toHaveLength(6);
    expect(root.querySelector(".blocked-choice-block")).not.toBe(null);
    expect(root.querySelectorAll(".ending-line")).toHaveLength(0);
  });

  it("reveals the profile identity on the third ending page after a short pause", () => {
    vi.useFakeTimers();
    const root = document.createElement("main");
    const onContinue = vi.fn();

    renderGame(root, {
      state: {
        ...createInitialState(),
        phase: "ending",
        currentCardId: "E-03"
      },
      onChoose: vi.fn(),
      onContinue,
      onRestart: vi.fn()
    });

    expect(root.textContent).toContain("年龄：27");
    expect(root.textContent).not.toContain("性别：女");

    root.querySelector("button.continue-button")?.click();

    expect(root.textContent).toContain("性别：女");
    expect(root.textContent).toContain("难度：普通");
    expect(root.textContent).not.toContain("查看通关记录");

    vi.advanceTimersByTime(1600);

    const reportButton = root.querySelector("button.continue-button");
    expect(reportButton?.textContent).toBe("查看通关记录");
    reportButton?.click();
    expect(onContinue).toHaveBeenCalledTimes(1);
  });

  it("renders final report with only a restart action", () => {
    const root = document.createElement("main");
    const onRestart = vi.fn();

    renderGame(root, {
      state: {
        ...createInitialState(),
        phase: "ending",
        currentCardId: "E-04",
        stats: {
          ...createInitialState().stats,
          safety: 2
        }
      },
      onChoose: vi.fn(),
      onContinue: vi.fn(),
      onRestart
    });

    expect(root.textContent).toContain("普通难度 · 通关记录");
    expect(root.textContent).toContain("本次处境");
    expect(root.textContent).toContain("风险内化");
    expect(root.textContent).toContain("路灯、出口、车牌和手机电量");
    expect(root.textContent).not.toContain("状态");
    expect(root.textContent).toContain("本次代价");
    expect(root.textContent).toContain("处境说明");
    expect(root.textContent).toContain("女性不是一种性格");
    expect(root.textContent).toContain("这种位置不只属于女性");
    expect(root.textContent).toContain("很多普通女性更频繁、更密集地被放在这里");
    expect(root.textContent).not.toContain("通关方式：");
    expect(root.textContent).not.toContain("复制文本");
    expect(root.textContent).not.toContain("保存图片");
    expect(root.querySelector(".stat-strip")).toBe(null);
    expect(root.querySelectorAll(".status-card")).toHaveLength(0);
    expect(root.querySelector(".concept-section")).not.toBe(null);
    expect(root.querySelector(".history-nav")).toBe(null);

    const restart = root.querySelector("button.continue-button");
    expect(restart?.textContent).toBe("重新开始");
    expect(root.querySelector(".restart-text-button")).toBe(null);
    restart?.click();
    expect(onRestart).toHaveBeenCalledTimes(1);
  });

  it("renders previous chapter echo on chapter intro cards", () => {
    const root = document.createElement("main");

    renderGame(root, {
      state: {
        ...createInitialState(),
        phase: "intro",
        currentCardId: "C2-I",
        tags: ["low_salary"]
      },
      onChoose: vi.fn(),
      onContinue: vi.fn(),
      onRestart: vi.fn()
    });

    expect(root.textContent).toContain("上一段记录：");
    expect(root.textContent).toContain("它可以让你留下来，只是价格比你预想的低。");
    expect(root.querySelector(".intro-echo")).not.toBe(null);
  });

  it("renders visible stats as a compact line without a prefix", () => {
    const root = document.createElement("main");

    renderGame(root, {
      state: {
        ...createInitialState(),
        phase: "choice",
        currentCardId: "C3-04",
        visibleStats: ["reputation", "money", "safety"]
      },
      onChoose: vi.fn(),
      onContinue: vi.fn(),
      onRestart: vi.fn()
    });

    const statText = root.querySelector(".stat-strip")?.textContent;
    expect(statText).not.toContain("记录：");
    expect(statText).toContain("信誉：稳定");
    expect(statText).toContain("钱：紧张");
    expect(root.querySelector(".stat-pill")).toBe(null);
  });

  it("renders restart as small text at the bottom of non-home cards", () => {
    const root = document.createElement("main");
    const onRestart = vi.fn();

    renderGame(root, {
      state: {
        ...createInitialState(),
        phase: "choice",
        currentCardId: "P-01"
      },
      onChoose: vi.fn(),
      onContinue: vi.fn(),
      onRestart
    });

    const restart = root.querySelector("button.restart-text-button");
    expect(restart).not.toBe(null);
    expect(restart?.textContent).toBe("重新开始");
    expect(root.querySelector(".restart-footer")?.lastElementChild).toBe(restart);
    expect(root.querySelector(".card-header .restart-text-button")).toBe(null);
    expect(root.querySelector(".restart-button")).toBe(null);
    expect(root.querySelector(".restart-confirm")).toBe(null);

    restart?.click();
    expect(onRestart).toHaveBeenCalledTimes(1);
  });
});
