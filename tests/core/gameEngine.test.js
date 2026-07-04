import { afterEach, describe, expect, it, vi } from "vitest";
import { createInitialState } from "../../src/core/initialState.js";
import {
  advanceAfterResult,
  applyChoice,
  buildCostLines,
  buildChapterEchoLines,
  buildEndingStats,
  buildBlockedChoiceLines,
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

  it("applies visible, hidden, tag, counter, result, and history changes", () => {
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
      hiddenEffects: { time: 1 },
      tagsAdded: ["platform_trip"],
      track: { paidSafety: 1 }
    });

    expect(next.phase).toBe("result");
    expect(next.stats.money).toBe(4);
    expect(next.stats.safety).toBe(7);
    expect(next.hidden.time).toBe(1);
    expect(next.tags).toContain("platform_trip");
    expect(next.counters.paidSafety).toBe(1);
    expect(next.pendingResult).toEqual({
      cardId: "C3-04",
      choiceId: "taxi",
      text: "你不用走夜路了，但余额又少了一截。"
    });
    expect(next.history[0]).toMatchObject({
      cardId: "C3-04",
      choiceId: "taxi"
    });
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
      pendingResult: { text: "完成" }
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
      pendingResult: { text: "完成" }
    };

    const next = advanceAfterResult(state);

    expect(next.currentCardId).toBe("P-S");
    expect(next.phase).toBe("settlement");
    expect(next.visibleStats).toEqual([]);

    const chapterStart = advanceAfterResult(next);

    expect(chapterStart.currentCardId).toBe("C1-I");
    expect(chapterStart.phase).toBe("intro");
    expect(chapterStart.visibleStats).toEqual(["reputation"]);

    const firstChapterCard = advanceAfterResult(chapterStart);

    expect(firstChapterCard.currentCardId).toBe("C1-01");
    expect(firstChapterCard.phase).toBe("choice");
    expect(firstChapterCard.visibleStats).toEqual(["reputation"]);
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
      tags: ["low_battery", "night_quiet_route"],
      pendingResult: { text: "完成" }
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
      pendingResult: { text: "完成" }
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
      pendingResult: { text: "完成" }
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
      pendingResult: { text: "完成" }
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
      pendingResult: { text: "完成" }
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
      tags: ["low_battery", "night_quiet_route"],
      triggeredInserts: ["I-C3-footsteps"],
      triggeredCrises: ["safety"],
      pendingResult: { text: "完成" }
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
      pendingResult: { text: "完成" }
    };

    const next = advanceAfterResult(state);

    expect(next.currentCardId).toBe("C1-S");
    expect(next.phase).toBe("settlement");
  });

  it("records chapter 6 outcome and applies its counters when entering the settlement", () => {
    const state = {
      ...createInitialState(),
      phase: "result",
      currentCardId: "C6-08",
      stats: {
        ...createInitialState().stats,
        reputation: 6,
        relationship: 2,
        self: 6
      },
      hidden: { ...createInitialState().hidden, evidence: -1 },
      tags: ["public_post"],
      triggeredCrises: ["relationship"],
      counters: { ...createInitialState().counters, explain: 2 },
      pendingResult: { text: "完成" }
    };

    const next = advanceAfterResult(state);

    expect(next.currentCardId).toBe("C6-S");
    expect(next.phase).toBe("settlement");
    expect(next.chapterOutcomes.C6).toEqual({
      id: "backlash",
      label: "反噬",
      counters: { explain: 3 }
    });
    expect(next.counters.explain).toBe(5);
  });

  it("does not resolve chapter 6 outcome more than once", () => {
    const state = {
      ...createInitialState(),
      phase: "settlement",
      currentCardId: "C6-S",
      chapterOutcomes: {
        C6: { id: "backlash", label: "反噬", counters: { explain: 3 } }
      },
      counters: { ...createInitialState().counters, explain: 5 }
    };

    const next = advanceAfterResult(state);

    expect(next.currentCardId).toBe("E-I");
    expect(next.counters.explain).toBe(5);
    expect(next.chapterOutcomes.C6).toEqual(state.chapterOutcomes.C6);
  });

  it("uses ending phase when advancing from the final settlement", () => {
    const state = {
      ...createInitialState(),
      phase: "result",
      currentCardId: "C6-S",
      pendingResult: { text: "完成" }
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
      pendingResult: { text: "完成" }
    };

    const next = advanceAfterResult(state);

    expect(next.currentCardId).toBe("E-02");
    expect(next.phase).toBe("ending");
  });

  it("reaches the final fourth ending page after the ending intro", () => {
    const state = {
      ...createInitialState(),
      phase: "result",
      currentCardId: "E-03",
      pendingResult: { text: "完成" }
    };

    const next = advanceAfterResult(state);

    expect(next.currentCardId).toBe("E-04");
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
    pendingResult: { text: "完成" }
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
      counters: {}
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
      tags: ["public_post"]
    };

    expect(resolveChapterOutcome("C6", state)).toEqual({
      id: "backlash",
      label: "反噬",
      counters: { explain: 3 }
    });
  });

  it("builds ending statistics from counters", () => {
    const state = {
      ...createInitialState(),
      counters: {
        ...createInitialState().counters,
        detour: 2,
        paidSafety: 1,
        silence: 1
      }
    };

    expect(buildEndingStats(state)).toEqual([
      ["放弃近路", 2],
      ["解释自己", 0],
      ["保存证据", 0],
      ["把话收回去", 1],
      ["为安全额外付费", 1],
      ["暂时退让", 0],
      ["让别人知道", 0],
      ["明确拒绝", 0]
    ]);
  });

  it("builds chapter echo lines from recorded tags and chapter 6 outcome", () => {
    const state = {
      ...createInitialState(),
      tags: ["low_salary", "remote_home", "night_quiet_route", "visible_work", "support_network"],
      chapterOutcomes: {
        C6: { id: "backlash", label: "反噬", counters: { explain: 3 } }
      }
    };

    expect(buildChapterEchoLines(state)).toEqual([
      "筛选：你获得了一个位置。它可以让你留下来，只是价格比你预想的低。",
      "房间：你保住了钱。代价是以后每次回家，都要多经过一段路。",
      "路上：没有发生什么明确的事。只是你已经开始自动确认身后、车牌、楼层和出口。",
      "桌面：项目结束了。至少这一次，你做过的事没有完全消失在流程里。",
      "靠近：有几个人知道发生过什么。事情没有因此简单，但你不再完全独自拿着它。",
      "窗口：事情被更多人知道以后，你开始解释自己为什么值得被相信。"
    ]);
  });

  it("builds blocked choice lines from current constraints", () => {
    const state = {
      ...createInitialState(),
      stats: {
        ...createInitialState().stats,
        money: 2,
        energy: 2,
        self: 2
      }
    };

    expect(buildBlockedChoiceLines(state)).toEqual([
      "有几次，你不是不想选择更安全的路，只是余额不允许。",
      "有几次，事情还没结束，你已经说不下去了。"
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
        detour: 5
      }
    };

    expect(resolvePassStyle(state)).toMatchObject({
      id: "high-alert",
      label: "高警觉通关"
    });
  });

  it("resolves high-alert pass style from repeated route strategies", () => {
    const state = {
      ...createInitialState(),
      counters: {
        ...createInitialState().counters,
        detour: 4,
        paidSafety: 3,
        seekHelp: 3
      }
    };

    expect(resolvePassStyle(state)).toMatchObject({
      id: "high-alert",
      label: "高警觉通关"
    });
  });

  it("builds report cost lines from the sharpest losses and counters", () => {
    const state = {
      ...createInitialState(),
      stats: {
        ...createInitialState().stats,
        money: 3,
        safety: 2,
        self: 8,
        energy: 3
      },
      hidden: {
        ...createInitialState().hidden,
        evidence: 4
      },
      counters: {
        ...createInitialState().counters,
        silence: 3
      }
    };

    expect(buildCostLines(state)).toEqual([
      "你没有一直遇到危险，但你一直在为危险做准备。",
      "你保住了一些安全，代价是余额越来越薄。",
      "你完成了很多处理，也失去了解释更多的力气。"
    ]);
  });

  it("builds four dynamic ending displays without raw numeric scores", () => {
    const state = {
      ...createInitialState(),
      stats: {
        ...createInitialState().stats,
        money: 3,
        safety: 2
      },
      counters: {
        ...createInitialState().counters,
        detour: 4,
        evidenceSaved: 2
      },
      tags: ["remote_home", "night_quiet_route"],
      chapterOutcomes: {
        C6: { id: "limited", label: "问题未闭合", counters: {} }
      }
    };

    const record = getEndingDisplay({ id: "E-01", title: "记录完成" }, state);
    const status = getEndingDisplay({ id: "E-02", title: "状态总览" }, state);
    const profile = getEndingDisplay({ id: "E-03", title: "角色档案生成中" }, state);
    const report = getEndingDisplay({ id: "E-04", title: "普通难度 · 通关记录" }, state);

    expect(record.lines).toHaveLength(6);
    expect(status.lines).toContain("安全感：危险。你没有一直遇到危险，但你一直在为危险做准备。");
    expect(status.lines.join("\n")).not.toContain("2/12");
    expect(status.lines).toContain("放弃近路：4 次");
    expect(profile.lines).toContain("年龄：27");
    expect(report.lines).toContain("通关方式：高警觉通关");
    expect(report.lines).toContain("难度：普通");
    expect(report.lines).toContain("本次代价：");
  });
});
