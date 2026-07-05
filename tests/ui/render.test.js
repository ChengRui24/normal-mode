// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from "vitest";
import { createInitialState } from "../../src/core/initialState.js";
import { renderGame } from "../../src/ui/render.js";

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
    expect(root.textContent).toContain("无需登录");
    expect(root.textContent).toContain("建议竖屏");
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
    expect(root.textContent).toContain("你继续往下走。每多走一步，都要再支付一点生活。");
    expect(root.textContent).toContain("（你开始只处理最急的部分。）");
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
          text: "你继续往下走。每多走一步，都要再支付一点生活。"
        }
      },
      onChoose: vi.fn(),
      onContinue: vi.fn(),
      onRestart: vi.fn()
    });

    expect(root.textContent).toContain("系统给出结果：证据不足");
    const resultPanel = root.querySelector(".result-panel");
    expect(resultPanel).not.toBe(null);
    const selected = root.querySelector(".selected-choice");
    expect(selected).not.toBe(null);
    expect(selected?.textContent).toBe("[继续申诉]");
    expect(selected?.tagName).toBe("P");
    expect(resultPanel?.contains(selected)).toBe(true);
    expect(root.querySelector("button.selected-choice")).toBe(null);
    expect(root.querySelectorAll("button.choice-button").length).toBe(0);
    expect(root.textContent).toContain("你继续往下走。每多走一步，都要再支付一点生活。");
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

    expect(root.textContent).toContain("（余额变薄了。）");
    expect(root.querySelector(".aftermath-text")?.textContent).toBe("（余额变薄了。）");
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
    expect(root.textContent).toContain("安全感：危险");
    expect(root.textContent).toContain("你没有一直遇到危险");
    expect(root.textContent).not.toContain("2/12");
    expect(root.querySelectorAll(".ending-line").length).toBeGreaterThan(0);
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
    expect(root.textContent).not.toContain("查看通关报告");

    vi.advanceTimersByTime(1600);

    const reportButton = root.querySelector("button.continue-button");
    expect(reportButton?.textContent).toBe("查看通关报告");
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
    expect(root.textContent).toContain("通关方式：高警觉通关");
    expect(root.textContent).toContain("女性不是一种性格");
    expect(root.textContent).not.toContain("复制文本");
    expect(root.textContent).not.toContain("保存图片");

    expect(root.querySelector("button.continue-button")).toBe(null);

    const restart = root.querySelector("button.restart-text-button");
    expect(restart?.textContent).toBe("重新开始");
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
