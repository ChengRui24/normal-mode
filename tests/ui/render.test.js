// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from "vitest";
import { createInitialState } from "../../src/core/initialState.js";
import { renderGame } from "../../src/ui/render.js";

describe("renderGame", () => {
  afterEach(() => {
    vi.useRealTimers();
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
    expect(root.textContent).toContain("加班后的路线");
    expect(root.querySelectorAll("button.choice-button").length).toBeGreaterThanOrEqual(2);
  });

  it("renders result inline with the selected option kept as a disabled light button", () => {
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
    const selected = root.querySelector("button.selected-choice");
    expect(selected).not.toBe(null);
    expect(selected?.textContent).toContain("继续申诉");
    expect(selected?.disabled).toBe(true);
    expect(root.querySelectorAll("button.choice-button").length).toBe(0);
    expect(root.textContent).toContain("你继续往下走。每多走一步，都要再支付一点生活。");
    expect(root.textContent).not.toContain("你选择了");
    expect(root.textContent).not.toContain("自我 +1");
    expect(root.textContent).not.toContain("精力 -2");
    expect(root.textContent).not.toContain("新增状态");
    expect(root.querySelectorAll(".change-line").length).toBe(0);
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

    const buttons = [...root.querySelectorAll("button")].map((button) => button.textContent?.trim());
    expect(buttons).toContain("重新开始");

    root.querySelector("button.continue-button")?.click();
    expect(onRestart).toHaveBeenCalledTimes(1);
  });

  it("renders chapter 6 settlement outcome when it has been resolved", () => {
    const root = document.createElement("main");

    renderGame(root, {
      state: {
        ...createInitialState(),
        phase: "settlement",
        currentCardId: "C6-S",
        chapterOutcomes: {
          C6: { id: "backlash", label: "反噬", counters: { explain: 3 } }
        }
      },
      onChoose: vi.fn(),
      onContinue: vi.fn(),
      onRestart: vi.fn()
    });

    expect(root.textContent).toContain("处理结果：解释次数继续增加。");
    expect(root.querySelectorAll(".ending-line").length).toBe(1);
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
    expect(statText).toContain("钱：稳定");
    expect(root.querySelector(".stat-pill")).toBe(null);
  });

  it("renders restart as a quiet icon control", () => {
    const root = document.createElement("main");

    renderGame(root, {
      state: {
        ...createInitialState(),
        phase: "choice",
        currentCardId: "P-01"
      },
      onChoose: vi.fn(),
      onContinue: vi.fn(),
      onRestart: vi.fn()
    });

    const restart = root.querySelector("button.restart-button");
    expect(restart).not.toBe(null);
    expect(restart?.getAttribute("aria-label")).toBe("重新开始");
    expect(restart?.getAttribute("title")).toBe("重新开始");
    expect(restart?.querySelector("svg.restart-icon")).not.toBe(null);
    expect(restart?.textContent).not.toContain("重新开始");
    expect(restart?.textContent).not.toContain("...");
  });
});
