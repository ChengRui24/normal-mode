// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { createInitialState } from "../../src/core/initialState.js";
import { renderGame } from "../../src/ui/render.js";

describe("renderGame", () => {
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

  it("renders result card without numeric change lines", () => {
    const root = document.createElement("main");

    renderGame(root, {
      state: {
        ...createInitialState(),
        phase: "result",
        currentCardId: "C6-08",
        pendingResult: {
          text: "你继续往下走。每多走一步，都要再支付一点生活。",
          visibleChanges: [
            { key: "self", label: "自我", delta: 1 },
            { key: "energy", label: "精力", delta: -2 }
          ],
          visibleTags: ["继续消耗"]
        }
      },
      onChoose: vi.fn(),
      onContinue: vi.fn(),
      onRestart: vi.fn()
    });

    expect(root.textContent).toContain("你继续往下走。每多走一步，都要再支付一点生活。");
    expect(root.textContent).not.toContain("自我 +1");
    expect(root.textContent).not.toContain("精力 -2");
    expect(root.textContent).not.toContain("新增状态");
    expect(root.querySelectorAll(".change-line").length).toBe(0);
  });

  it("renders visible stats as a compact record line", () => {
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

    expect(root.querySelector(".stat-strip")?.textContent).toContain("信誉：稳定");
    expect(root.querySelector(".stat-strip")?.textContent).toContain("钱：稳定");
    expect(root.querySelector(".stat-pill")).toBe(null);
  });

  it("renders restart as a quiet icon control", () => {
    const root = document.createElement("main");

    renderGame(root, {
      state: createInitialState(),
      onChoose: vi.fn(),
      onContinue: vi.fn(),
      onRestart: vi.fn()
    });

    const restart = root.querySelector("button.restart-button");
    expect(restart).not.toBe(null);
    expect(restart?.getAttribute("aria-label")).toBe("重新开始");
    expect(restart?.textContent).not.toContain("重新开始");
  });
});
