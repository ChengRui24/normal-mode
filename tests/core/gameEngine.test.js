import { describe, expect, it } from "vitest";
import { createInitialState } from "../../src/core/initialState.js";
import { applyChoice } from "../../src/core/gameEngine.js";

describe("game engine choice application", () => {
  it("applies visible, hidden, tag, counter, and history changes", () => {
    const state = {
      ...createInitialState(),
      currentCardId: "C3-04",
      visibleStats: ["reputation", "money", "safety"]
    };

    const next = applyChoice(state, {
      id: "taxi",
      label: "打车",
      result: "你不用走夜路了，但余额又少了一截。",
      effects: { money: -2, safety: 1 },
      hiddenEffects: { enclosed: 1 },
      tagsAdded: ["平台行程"],
      visibleChanges: ["money", "safety"],
      track: { paidForSafety: 1 }
    });

    expect(next.phase).toBe("result");
    expect(next.stats.money).toBe(-2);
    expect(next.stats.safety).toBe(1);
    expect(next.hidden.enclosed).toBe(1);
    expect(next.tags).toContain("平台行程");
    expect(next.counters.paidForSafety).toBe(1);
    expect(next.pendingResult.visibleChanges).toEqual([
      { key: "money", label: "钱", delta: -2 },
      { key: "safety", label: "安全感", delta: 1 }
    ]);
    expect(next.history[0]).toMatchObject({
      cardId: "C3-04",
      choiceId: "taxi"
    });
  });

  it("hides unrevealed stat changes from result cards", () => {
    const state = {
      ...createInitialState(),
      currentCardId: "P-01",
      visibleStats: []
    };

    const next = applyChoice(state, {
      id: "formal",
      label: "更正式",
      result: "你看起来更像该被认真对待的人，也更容易被看见。",
      effects: { reputation: 1, energy: -1 },
      hiddenEffects: { exposure: 1 },
      tagsAdded: ["被注意"],
      visibleChanges: ["reputation", "energy"],
      track: {}
    });

    expect(next.pendingResult.visibleChanges).toEqual([]);
    expect(next.stats.reputation).toBe(1);
    expect(next.stats.energy).toBe(-1);
  });

  it("limits result display to two visible changes", () => {
    const state = {
      ...createInitialState(),
      currentCardId: "C6-08",
      visibleStats: ["reputation", "money", "safety", "energy", "relationship", "self"]
    };

    const next = applyChoice(state, {
      id: "appeal",
      label: "继续申诉",
      result: "流程延长，代价继续增加。",
      effects: { self: 1, energy: -2, money: -1 },
      hiddenEffects: {},
      tagsAdded: ["继续消耗"],
      visibleChanges: ["self", "energy", "money"],
      track: { explainedIntent: 1 }
    });

    expect(next.pendingResult.visibleChanges).toEqual([
      { key: "self", label: "自我", delta: 1 },
      { key: "energy", label: "精力", delta: -2 }
    ]);
  });
});
