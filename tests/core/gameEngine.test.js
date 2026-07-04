import { afterEach, describe, expect, it, vi } from "vitest";
import { createInitialState } from "../../src/core/initialState.js";
import {
  advanceAfterResult,
  applyChoice,
  buildCostLines,
  buildEndingStats,
  getEndingDisplay,
  getVisibleStatsForCard,
  resolvePassStyle,
  resolveChapterOutcome
} from "../../src/core/gameEngine.js";

describe("game engine choice application", () => {
  it("starts ordinary difficulty stats on the approved 0-12 scale", () => {
    expect(createInitialState().stats).toEqual({
      reputation: 6,
      money: 6,
      safety: 6,
      energy: 7,
      relationship: 5,
      self: 6
    });
    expect(createInitialState().triggeredCrises).toEqual([]);
    expect(createInitialState().returnCardId).toBe(null);
  });

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
    expect(next.stats.money).toBe(4);
    expect(next.stats.safety).toBe(7);
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
    expect(next.stats.reputation).toBe(7);
    expect(next.stats.energy).toBe(6);
  });

  it("clamps long-term stats to the 0-12 range", () => {
    const state = {
      ...createInitialState(),
      currentCardId: "C6-08",
      stats: {
        ...createInitialState().stats,
        money: 1,
        self: 11
      }
    };

    const next = applyChoice(state, {
      id: "limit-test",
      label: "测试",
      result: "完成。",
      effects: { money: -5, self: 4 },
      hiddenEffects: {},
      tagsAdded: [],
      track: {}
    });

    expect(next.stats.money).toBe(0);
    expect(next.stats.self).toBe(12);
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
      stats: { ...createInitialState().stats, safety: 2 },
      tags: ["低电量风险", "人少夜路"],
      pendingResult: { text: "完成", visibleChanges: [], visibleTags: [] }
    };

    const next = advanceAfterResult(state);

    expect(next.currentCardId).toBe("I-C3-footsteps");
    expect(next.triggeredInserts).toContain("I-C3-footsteps");
  });

  it("inserts a stat crisis card once when a stat first becomes dangerous", () => {
    const state = {
      ...createInitialState(),
      phase: "result",
      currentCardId: "C2-01",
      stats: { ...createInitialState().stats, money: 2 },
      pendingResult: { text: "完成", visibleChanges: [], visibleTags: [] }
    };

    const next = advanceAfterResult(state);

    expect(next.currentCardId).toBe("CR-money");
    expect(next.phase).toBe("choice");
    expect(next.returnCardId).toBe("C2-02");
    expect(next.triggeredCrises).toEqual(["money"]);
  });

  it("returns from a crisis card to the stored mainline card", () => {
    const state = {
      ...createInitialState(),
      phase: "result",
      currentCardId: "CR-money",
      returnCardId: "C2-02",
      triggeredCrises: ["money"],
      pendingResult: { text: "完成", visibleChanges: [], visibleTags: [] }
    };

    const next = advanceAfterResult(state);

    expect(next.currentCardId).toBe("C2-02");
    expect(next.phase).toBe("choice");
    expect(next.returnCardId).toBe(null);
  });

  it("does not repeat an already triggered stat crisis", () => {
    const state = {
      ...createInitialState(),
      phase: "result",
      currentCardId: "C2-01",
      stats: { ...createInitialState().stats, money: 2 },
      triggeredCrises: ["money"],
      pendingResult: { text: "完成", visibleChanges: [], visibleTags: [] }
    };

    const next = advanceAfterResult(state);

    expect(next.currentCardId).toBe("C2-02");
    expect(next.triggeredCrises).toEqual(["money"]);
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
      stats: { ...createInitialState().stats, safety: 2 },
      tags: ["低电量风险", "人少夜路"],
      triggeredInserts: ["I-C3-footsteps"],
      triggeredCrises: ["safety"],
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

  it("reaches the tenth ending page after the ending intro", () => {
    const state = {
      ...createInitialState(),
      phase: "result",
      currentCardId: "E-09",
      pendingResult: { text: "完成", visibleChanges: [], visibleTags: [] }
    };

    const next = advanceAfterResult(state);

    expect(next.currentCardId).toBe("E-10");
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
    CRISIS_CARDS: [],
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
        reputation: 9,
        self: 9,
        energy: 7,
        relationship: 6
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
        reputation: 2,
        relationship: 2,
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

  it("resolves pass style by danger and strategy priority", () => {
    const state = {
      ...createInitialState(),
      stats: {
        ...createInitialState().stats,
        safety: 2,
        energy: 2,
        relationship: 2
      }
    };

    expect(resolvePassStyle(state)).toMatchObject({
      id: "struggling",
      label: "勉强通关"
    });
  });

  it("resolves high-alert pass style before stable style", () => {
    const state = {
      ...createInitialState(),
      stats: {
        ...createInitialState().stats,
        safety: 2
      },
      counters: {
        ...createInitialState().counters,
        avoidedShortcut: 5
      }
    };

    expect(resolvePassStyle(state)).toMatchObject({
      id: "high-alert",
      label: "高警觉通关"
    });
  });

  it("builds cost lines from visible losses", () => {
    const state = {
      ...createInitialState(),
      stats: {
        ...createInitialState().stats,
        money: 3,
        safety: 2,
        self: 3
      }
    };

    expect(buildCostLines(state)).toEqual([
      "为了安全和退出，你支付了更多费用。",
      "没有发生的事，也参与塑造了你。",
      "很多次你选择让事情过去。"
    ]);
  });

  it("builds dynamic ending displays without raw numeric scores", () => {
    const state = {
      ...createInitialState(),
      stats: {
        ...createInitialState().stats,
        money: 3,
        safety: 2
      },
      counters: {
        ...createInitialState().counters,
        avoidedShortcut: 4,
        savedEvidence: 2
      }
    };

    const status = getEndingDisplay({ id: "E-02", title: "状态总览" }, state);
    const strategy = getEndingDisplay({ id: "E-03", title: "你学会的方式" }, state);
    const passStyle = getEndingDisplay({ id: "E-04", title: "通关方式" }, state);

    expect(status.lines).toContain("安全感：危险。你没有一直遇到危险，但你一直在为危险做准备。");
    expect(status.lines.join("\n")).not.toContain("2/12");
    expect(strategy.lines).toContain("放弃近路：4 次。");
    expect(strategy.lines).toContain("保存证据：2 次。");
    expect(passStyle.lines).toContain("通关方式：高警觉通关。");
  });
});
