import { afterEach, describe, expect, it, vi } from "vitest";
import { createInitialState } from "../../src/core/initialState.js";
import {
  advanceAfterResult,
  applyChoice,
  buildEndingStats,
  getVisibleStatsForCard,
  resolveChapterOutcome
} from "../../src/core/gameEngine.js";

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

  it("dedupes added tags without mutating original tags or history", () => {
    const state = {
      ...createInitialState(),
      currentCardId: "C3-04",
      tags: ["平台行程"],
      history: [{ cardId: "P-01", choiceId: "formal", chapterId: "P" }]
    };
    const originalTags = state.tags;
    const originalHistory = state.history;

    const next = applyChoice(state, {
      id: "taxi",
      label: "打车",
      result: "你不用走夜路了，但余额又少了一截。",
      effects: {},
      hiddenEffects: {},
      tagsAdded: ["平台行程", "夜间出行"],
      track: {}
    });

    expect(next.tags).toEqual(["平台行程", "夜间出行"]);
    expect(state.tags).toBe(originalTags);
    expect(state.tags).toEqual(["平台行程"]);
    expect(state.history).toBe(originalHistory);
    expect(state.history).toEqual([{ cardId: "P-01", choiceId: "formal", chapterId: "P" }]);
    expect(next.history).toHaveLength(2);
  });
});

describe("game engine visible stats", () => {
  it("returns no visible stats for absent cards", () => {
    expect(getVisibleStatsForCard(undefined)).toEqual([]);
  });
});

describe("game engine progression", () => {
  it("starts at the prologue intro card", () => {
    const state = createInitialState();

    expect(state.phase).toBe("intro");
    expect(state.currentCardId).toBe("P-I");
  });

  it("continues from an intro card to the first chapter card", () => {
    const state = {
      ...createInitialState(),
      phase: "intro",
      currentCardId: "P-I"
    };

    const next = advanceAfterResult(state);

    expect(next.phase).toBe("choice");
    expect(next.currentCardId).toBe("P-01");
  });

  it("advances from a result card to the next ordered card", () => {
    const state = {
      ...createInitialState(),
      phase: "result",
      currentCardId: "P-01",
      pendingResult: { text: "完成", visibleChanges: [], visibleTags: [] }
    };

    const next = advanceAfterResult(state);

    expect(next.phase).toBe("choice");
    expect(next.currentCardId).toBe("P-02");
    expect(next.pendingResult).toBe(null);
  });

  it("updates visible stats when entering a chapter", () => {
    const state = {
      ...createInitialState(),
      phase: "result",
      currentCardId: "P-04",
      pendingResult: { text: "完成", visibleChanges: [], visibleTags: [] }
    };

    const next = advanceAfterResult(state);

    expect(next.currentCardId).toBe("C1-I");
    expect(next.phase).toBe("intro");
    expect(next.visibleStats).toEqual(["reputation"]);

    const chapterStart = advanceAfterResult(next);

    expect(chapterStart.currentCardId).toBe("C1-01");
    expect(chapterStart.phase).toBe("choice");
    expect(chapterStart.visibleStats).toEqual(["reputation"]);
  });

  it("uses intro phase between settlement and the next chapter", () => {
    const state = {
      ...createInitialState(),
      phase: "settlement",
      currentCardId: "C1-S"
    };

    const next = advanceAfterResult(state);

    expect(next.currentCardId).toBe("C2-I");
    expect(next.phase).toBe("intro");
    expect(next.visibleStats).toEqual(["reputation", "money"]);
  });

  it("inserts an eligible risk card before the next mainline card", () => {
    const state = {
      ...createInitialState(),
      phase: "result",
      currentCardId: "C3-04",
      visibleStats: ["reputation", "money", "safety"],
      stats: { ...createInitialState().stats, safety: -3 },
      tags: ["低电量风险", "人少夜路"],
      pendingResult: { text: "完成", visibleChanges: [], visibleTags: [] }
    };

    const next = advanceAfterResult(state);

    expect(next.currentCardId).toBe("I-C3-footsteps");
    expect(next.triggeredInserts).toContain("I-C3-footsteps");
  });

  it("continues from an inserted card back to the next mainline card", () => {
    const state = {
      ...createInitialState(),
      phase: "result",
      currentCardId: "I-C3-footsteps",
      visibleStats: ["reputation", "money", "safety"],
      triggeredInserts: ["I-C3-footsteps"],
      pendingResult: { text: "完成", visibleChanges: [], visibleTags: [] }
    };

    const next = advanceAfterResult(state);

    expect(next.currentCardId).toBe("C3-05");
  });

  it("throws when advancing from an unknown current card", () => {
    const state = {
      ...createInitialState(),
      phase: "result",
      currentCardId: "missing-card"
    };

    expect(() => advanceAfterResult(state)).toThrow(/missing-card/);
  });

  it("skips an already triggered insert without duplicating it", () => {
    const state = {
      ...createInitialState(),
      phase: "result",
      currentCardId: "C3-04",
      visibleStats: ["reputation", "money", "safety"],
      stats: { ...createInitialState().stats, safety: -3 },
      tags: ["低电量风险", "人少夜路"],
      triggeredInserts: ["I-C3-footsteps"],
      pendingResult: { text: "完成", visibleChanges: [], visibleTags: [] }
    };

    const next = advanceAfterResult(state);

    expect(next.currentCardId).toBe("C3-05");
    expect(next.triggeredInserts).toEqual(["I-C3-footsteps"]);
  });

  it("uses settlement phase when the next card is a settlement", () => {
    const state = {
      ...createInitialState(),
      phase: "result",
      currentCardId: "C1-07",
      pendingResult: { text: "完成", visibleChanges: [], visibleTags: [] }
    };

    const next = advanceAfterResult(state);

    expect(next.currentCardId).toBe("C1-S");
    expect(next.phase).toBe("settlement");
  });

  it("uses ending phase when advancing from the final settlement", () => {
    const state = {
      ...createInitialState(),
      phase: "result",
      currentCardId: "C6-S",
      pendingResult: { text: "完成", visibleChanges: [], visibleTags: [] }
    };

    const next = advanceAfterResult(state);

    expect(next.currentCardId).toBe("E-I");
    expect(next.phase).toBe("intro");

    const endingStart = advanceAfterResult(next);

    expect(endingStart.currentCardId).toBe("E-01");
    expect(endingStart.phase).toBe("ending");
  });

  it("keeps ending phase when advancing between ending cards", () => {
    const state = {
      ...createInitialState(),
      phase: "result",
      currentCardId: "E-01",
      pendingResult: { text: "完成", visibleChanges: [], visibleTags: [] }
    };

    const next = advanceAfterResult(state);

    expect(next.currentCardId).toBe("E-02");
    expect(next.phase).toBe("ending");
  });
});

async function advanceWithMockedLevels({ currentCardId = "T-01", stats = {}, hidden = {}, insertCard }) {
  vi.resetModules();

  const orderedCardIds = ["T-01", "T-02"];
  const cardsById = new Map([
    ["T-01", { id: "T-01", type: "level", chapterId: "P" }],
    ["T-02", { id: "T-02", type: "level", chapterId: "P" }],
    [insertCard.id, insertCard]
  ]);

  vi.doMock("../../src/data/levels.js", () => ({
    INSERT_CARDS: [insertCard],
    orderedCardIds,
    getCardById: (id) => cardsById.get(id)
  }));

  const { advanceAfterResult: advanceWithMock } = await import("../../src/core/gameEngine.js");

  return advanceWithMock({
    ...createInitialState(),
    phase: "result",
    currentCardId,
    stats: { ...createInitialState().stats, ...stats },
    hidden: { ...createInitialState().hidden, ...hidden },
    pendingResult: { text: "完成", visibleChanges: [], visibleTags: [] }
  });
}

describe("game engine progression insert trigger rules", () => {
  afterEach(() => {
    vi.doUnmock("../../src/data/levels.js");
    vi.resetModules();
  });

  it("inserts a card when statMin is met", async () => {
    const next = await advanceWithMockedLevels({
      stats: { safety: 2 },
      insertCard: {
        id: "I-stat-min",
        type: "level",
        chapterId: "P",
        insert: true,
        trigger: { afterCardId: "T-01", statMin: { safety: 2 } }
      }
    });

    expect(next.currentCardId).toBe("I-stat-min");
  });

  it("skips a card when statMin is not met", async () => {
    const next = await advanceWithMockedLevels({
      stats: { safety: 1 },
      insertCard: {
        id: "I-stat-min",
        type: "level",
        chapterId: "P",
        insert: true,
        trigger: { afterCardId: "T-01", statMin: { safety: 2 } }
      }
    });

    expect(next.currentCardId).toBe("T-02");
  });

  it("inserts a card when hiddenMin is met", async () => {
    const next = await advanceWithMockedLevels({
      hidden: { evidence: 2 },
      insertCard: {
        id: "I-hidden-min",
        type: "level",
        chapterId: "P",
        insert: true,
        trigger: { afterCardId: "T-01", hiddenMin: { evidence: 2 } }
      }
    });

    expect(next.currentCardId).toBe("I-hidden-min");
  });

  it("skips a card when hiddenMin is not met", async () => {
    const next = await advanceWithMockedLevels({
      hidden: { evidence: 1 },
      insertCard: {
        id: "I-hidden-min",
        type: "level",
        chapterId: "P",
        insert: true,
        trigger: { afterCardId: "T-01", hiddenMin: { evidence: 2 } }
      }
    });

    expect(next.currentCardId).toBe("T-02");
  });

  it("inserts a card when hiddenMax is met", async () => {
    const next = await advanceWithMockedLevels({
      hidden: { exposure: 2 },
      insertCard: {
        id: "I-hidden-max",
        type: "level",
        chapterId: "P",
        insert: true,
        trigger: { afterCardId: "T-01", hiddenMax: { exposure: 2 } }
      }
    });

    expect(next.currentCardId).toBe("I-hidden-max");
  });

  it("skips a card when hiddenMax is exceeded", async () => {
    const next = await advanceWithMockedLevels({
      hidden: { exposure: 3 },
      insertCard: {
        id: "I-hidden-max",
        type: "level",
        chapterId: "P",
        insert: true,
        trigger: { afterCardId: "T-01", hiddenMax: { exposure: 2 } }
      }
    });

    expect(next.currentCardId).toBe("T-02");
  });
});

describe("settlements and ending statistics", () => {
  it("resolves chapter 6 partial recognition", () => {
    const state = {
      ...createInitialState(),
      stats: {
        ...createInitialState().stats,
        reputation: 3,
        self: 3,
        energy: 1,
        relationship: 1
      },
      hidden: { ...createInitialState().hidden, evidence: 3 },
      tags: ["正式记录"]
    };

    expect(resolveChapterOutcome("C6", state)).toEqual({
      id: "recognized",
      label: "问题被部分承认",
      counters: { recognition: 1 }
    });
  });

  it("resolves chapter 6 backlash before weak settlement", () => {
    const state = {
      ...createInitialState(),
      stats: {
        ...createInitialState().stats,
        reputation: -3,
        relationship: -3,
        self: 1
      },
      hidden: { ...createInitialState().hidden, evidence: -1 },
      tags: ["公开表达"]
    };

    expect(resolveChapterOutcome("C6", state)).toEqual({
      id: "backlash",
      label: "反噬",
      counters: { explainedIntent: 3 }
    });
  });

  it("builds ending statistics from counters", () => {
    const state = {
      ...createInitialState(),
      counters: {
        ...createInitialState().counters,
        adjustedExpression: 2,
        paidForSafety: 1,
        gaveUpForProof: 1
      }
    };

    expect(buildEndingStats(state)).toEqual([
      ["修改表达方式", 2],
      ["放弃近路", 0],
      ["假装有人同行", 0],
      ["保存证据", 0],
      ["笑着跳过不适", 0],
      ["解释自己没有恶意", 0],
      ["为了安全额外付费", 1],
      ["因为无法证明而放弃", 1]
    ]);
  });
});
