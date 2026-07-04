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

  it("renders result card with at most two changes", () => {
    const root = document.createElement("main");

    renderGame(root, {
      state: {
        ...createInitialState(),
        phase: "result",
        currentCardId: "C6-08",
        pendingResult: {
          text: "流程延长，代价继续增加。",
          visibleChanges: [
            { key: "self", label: "自我", delta: 1 },
            { key: "energy", label: "精力", delta: -2 }
          ],
          visibleTags: []
        }
      },
      onChoose: vi.fn(),
      onContinue: vi.fn(),
      onRestart: vi.fn()
    });

    expect(root.textContent).toContain("流程延长，代价继续增加。");
    expect(root.textContent).toContain("自我 +1");
    expect(root.textContent).toContain("精力 -2");
    expect(root.querySelectorAll(".change-line").length).toBe(2);
  });

  it("renders restart control", () => {
    const root = document.createElement("main");

    renderGame(root, {
      state: createInitialState(),
      onChoose: vi.fn(),
      onContinue: vi.fn(),
      onRestart: vi.fn()
    });

    expect(root.querySelector("button.restart-button")).not.toBe(null);
  });
});
