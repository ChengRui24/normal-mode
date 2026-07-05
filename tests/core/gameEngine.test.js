import { afterEach, describe, expect, it, vi } from "vitest";
import { createInitialState } from "../../src/core/initialState.js";
import {
  advanceAfterResult,
  applyChoice,
  buildCostLines,
  buildChapterEchoLines,
  buildEndingStats,
  buildBlockedChoiceLines,
  getChoiceAftermath,
  getEndingDisplay,
  getViewedState,
  getVisibleStatsForCard,
  goToNextView,
  goToPreviousView,
  resolvePassStyle,
  resolveChapterOutcome,
  startGame
} from "../../src/core/gameEngine.js";
import { getCardById } from "../../src/data/levels.js";

describe("game engine choice application", () => {
  it("starts ordinary difficulty stats on the approved 0-12 scale", () => {
    expect(createInitialState().stats).toEqual({
      reputation: 6,
      money: 5,
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
    expect(next.stats.money).toBe(3);
    expect(next.stats.safety).toBe(7);
    expect(next.hidden.time).toBe(1);
    expect(next.tags).toContain("platform_trip");
    expect(next.counters.paidSafety).toBe(1);
    expect(next.pendingResult).toEqual({
      cardId: "C3-04",
      choiceId: "taxi",
      text: "你不用走夜路了，但余额又少了一截。",
      aftermath: "余额变薄了。"
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

  it("builds natural aftermath lines without exposing numeric changes", () => {
    const base = createInitialState();

    expect(getChoiceAftermath({
      ...base,
      stats: { ...base.stats, safety: 5 }
    }, {
      effects: { safety: -2 }
    })).toBe("你开始更留意周围。");

    expect(getChoiceAftermath(base, {
      effects: { safety: -2 }
    })).toBe("路线、出口和身后的人，变得更难忽略。");

    expect(getChoiceAftermath({
      ...base,
      stats: { ...base.stats, reputation: 6 }
    }, {
      effects: { reputation: -2 }
    })).toBe("有些话开始需要多说一遍。");

    expect(getChoiceAftermath(base, {
      effects: { reputation: -1, self: 1 },
      hiddenEffects: { evidence: 2 },
      track: { evidenceSaved: 1 }
    })).toBe("这件事会留下来。");

    expect(getChoiceAftermath(base, {
      effects: { safety: 1 }
    })).toBe("");
  });
});

describe("game engine visible stats", () => {
  it("returns no visible stats for absent cards", () => {
    expect(getVisibleStatsForCard(undefined)).toEqual([]);
  });
});

describe("game engine progression", () => {
  it("starts at the home screen", () => {
    const state = createInitialState();

    expect(state.phase).toBe("home");
    expect(state.currentCardId).toBe("HOME");
  });

  it("starts the game from the home screen into the prologue intro card", () => {
    const state = createInitialState();
    const next = startGame(state);

    expect(next.phase).toBe("intro");
    expect(next.currentCardId).toBe("P-I");
    expect(next.pendingResult).toBe(null);
    expect(next.visibleStats).toEqual([]);
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

  it("records view history and moves the review cursor without rolling back game state", () => {
    const started = startGame(createInitialState());
    const firstChoicePage = advanceAfterResult(started);
    const choice = getCardById("P-01").choices[0];
    const resultPage = applyChoice(firstChoicePage, choice);

    expect(resultPage.viewHistory.map((view) => `${view.phase}:${view.currentCardId}`)).toEqual([
      "intro:P-I",
      "result:P-01"
    ]);
    expect(resultPage.viewIndex).toBe(1);

    const reviewingIntro = goToPreviousView(resultPage);

    expect(reviewingIntro.phase).toBe("result");
    expect(reviewingIntro.currentCardId).toBe("P-01");
    expect(reviewingIntro.stats).toEqual(resultPage.stats);
    expect(getViewedState(reviewingIntro)).toMatchObject({
      phase: "intro",
      currentCardId: "P-I",
      isViewingHistory: true
    });

    const backToResult = goToNextView(reviewingIntro);

    expect(getViewedState(backToResult)).toMatchObject({
      phase: "result",
      currentCardId: "P-01",
      isViewingHistory: false
    });
    expect(backToResult.stats).toEqual(resultPage.stats);
  });

  it("does not expose answered choice pages when reviewing older history", () => {
    let state = startGame(createInitialState());
    state = advanceAfterResult(state);
    state = applyChoice(state, getCardById("P-01").choices[0]);
    state = advanceAfterResult(state);
    state = applyChoice(state, getCardById("P-04").choices[0]);
    state = advanceAfterResult(state);
    state = advanceAfterResult(state);

    expect(state.phase).toBe("choice");
    expect(state.currentCardId).toBe("C1-01");

    let reviewing = goToPreviousView(state);
    reviewing = goToPreviousView(reviewing);
    reviewing = goToPreviousView(reviewing);

    expect(getViewedState(reviewing)).toMatchObject({
      phase: "result",
      currentCardId: "P-01",
      isViewingHistory: true
    });
    expect(state.viewHistory.map((view) => `${view.phase}:${view.currentCardId}`)).not.toContain("choice:P-01");
    expect(state.viewHistory.map((view) => `${view.phase}:${view.currentCardId}`)).not.toContain("choice:P-04");
  });

  it("normalizes legacy history cursors that point at answered choice pages", () => {
    const intro = startGame(createInitialState());
    const choicePage = advanceAfterResult(intro);
    const resultPage = applyChoice(choicePage, getCardById("P-01").choices[0]);
    const legacyState = {
      ...resultPage,
      viewHistory: [
        resultPage.viewHistory[0],
        { ...choicePage, viewHistory: undefined, viewIndex: undefined },
        resultPage.viewHistory[1]
      ],
      viewIndex: 1
    };

    expect(getViewedState(legacyState)).toMatchObject({
      phase: "result",
      currentCardId: "P-01",
      viewIndex: 2
    });
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
    expect(next.currentCardId).toBe("P-04");
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

    expect(next.currentCardId).toBe("C1-I");
    expect(next.phase).toBe("intro");
    expect(next.visibleStats).toEqual(["reputation"]);

    const firstChapterCard = advanceAfterResult(next);

    expect(firstChapterCard.currentCardId).toBe("C1-01");
    expect(firstChapterCard.phase).toBe("choice");
    expect(firstChapterCard.visibleStats).toEqual(["reputation"]);
  });

  it("uses intro phase between short chapters without settlement cards", () => {
    const state = {
      ...createInitialState(),
      phase: "result",
      currentCardId: "C1-07",
      pendingResult: { text: "完成" }
    };

    const next = advanceAfterResult(state);

    expect(next.currentCardId).toBe("C2-I");
    expect(next.phase).toBe("intro");
    expect(next.visibleStats).toEqual(["reputation", "money"]);
  });

  it("routes to the platform-trip card when the player took a taxi", () => {
    const state = {
      ...createInitialState(),
      phase: "result",
      currentCardId: "C3-04",
      tags: ["platform_trip"],
      pendingResult: { text: "完成" }
    };

    const next = advanceAfterResult(state);

    expect(next.currentCardId).toBe("C3-05");
    expect(next.phase).toBe("choice");
  });

  it("routes to the building card when the player did not take a taxi", () => {
    const state = {
      ...createInitialState(),
      phase: "result",
      currentCardId: "C3-04",
      tags: ["habit_detour"],
      pendingResult: { text: "完成" }
    };

    const next = advanceAfterResult(state);

    expect(next.currentCardId).toBe("C3-06");
    expect(next.phase).toBe("choice");
  });

  it("continues from either chapter 3 replacement card to chapter 4", () => {
    for (const currentCardId of ["C3-05", "C3-06"]) {
      const next = advanceAfterResult({
        ...createInitialState(),
        phase: "result",
        currentCardId,
        pendingResult: { text: "完成" }
      });

      expect(next.currentCardId).toBe("C4-I");
      expect(next.phase).toBe("intro");
    }
  });

  it("routes chapter 4 to the reaction card when conflict is high", () => {
    const state = {
      ...createInitialState(),
      phase: "result",
      currentCardId: "C4-04",
      hidden: { ...createInitialState().hidden, conflict: 2 },
      pendingResult: { text: "完成" }
    };

    const next = advanceAfterResult(state);

    expect(next.currentCardId).toBe("C4-06");
    expect(next.phase).toBe("choice");
  });

  it("routes chapter 4 to performance materials without conflict flags", () => {
    const state = {
      ...createInitialState(),
      phase: "result",
      currentCardId: "C4-04",
      pendingResult: { text: "完成" }
    };

    const next = advanceAfterResult(state);

    expect(next.currentCardId).toBe("C4-07");
    expect(next.phase).toBe("choice");
  });

  it("continues from either chapter 4 replacement card to chapter 5", () => {
    for (const currentCardId of ["C4-06", "C4-07"]) {
      const next = advanceAfterResult({
        ...createInitialState(),
        phase: "result",
        currentCardId,
        pendingResult: { text: "完成" }
      });

      expect(next.currentCardId).toBe("C5-I");
      expect(next.phase).toBe("intro");
    }
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
    expect(next.returnCardId).toBe("C2-03");
    expect(next.triggeredCrises).toEqual(["C2:money"]);
  });

  it("returns from a crisis card to the stored mainline card", () => {
    const state = {
      ...createInitialState(),
      phase: "result",
      currentCardId: "CR-money",
      returnCardId: "C2-03",
      triggeredCrises: ["C2:money"],
      pendingResult: { text: "完成" }
    };

    const next = advanceAfterResult(state);

    expect(next.currentCardId).toBe("C2-03");
    expect(next.phase).toBe("choice");
    expect(next.returnCardId).toBe(null);
  });

  it("does not repeat an already triggered stat crisis", () => {
    const state = {
      ...createInitialState(),
      phase: "result",
      currentCardId: "C2-01",
      stats: { ...createInitialState().stats, money: 2 },
      triggeredCrises: ["C2:money"],
      pendingResult: { text: "完成" }
    };

    const next = advanceAfterResult(state);

    expect(next.currentCardId).toBe("C2-03");
    expect(next.triggeredCrises).toEqual(["C2:money"]);
  });

  it("throws when advancing from an unknown current card", () => {
    const state = {
      ...createInitialState(),
      phase: "result",
      currentCardId: "missing-card"
    };

    expect(() => advanceAfterResult(state)).toThrow(/missing-card/);
  });

  it("limits crisis cards to two per playthrough", () => {
    const state = {
      ...createInitialState(),
      phase: "result",
      currentCardId: "C3-04",
      stats: { ...createInitialState().stats, safety: 2 },
      triggeredCrises: ["C1:reputation", "C2:money"],
      pendingResult: { text: "完成" }
    };

    const next = advanceAfterResult(state);

    expect(next.currentCardId).toBe("C3-06");
    expect(next.triggeredCrises).toEqual(["C1:reputation", "C2:money"]);
  });

  it("limits crisis cards to one per chapter", () => {
    const state = {
      ...createInitialState(),
      phase: "result",
      currentCardId: "C3-04",
      stats: { ...createInitialState().stats, safety: 2 },
      triggeredCrises: ["C3:money"],
      pendingResult: { text: "完成" }
    };

    const next = advanceAfterResult(state);

    expect(next.currentCardId).toBe("C3-06");
    expect(next.triggeredCrises).toEqual(["C3:money"]);
  });

  it("records chapter 6 outcome and applies its counters when entering the ending", () => {
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

    expect(next.currentCardId).toBe("E-01");
    expect(next.phase).toBe("ending");
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
      phase: "result",
      currentCardId: "C6-08",
      chapterOutcomes: {
        C6: { id: "backlash", label: "反噬", counters: { explain: 3 } }
      },
      counters: { ...createInitialState().counters, explain: 5 }
    };

    const next = advanceAfterResult(state);

    expect(next.currentCardId).toBe("E-01");
    expect(next.counters.explain).toBe(5);
    expect(next.chapterOutcomes.C6).toEqual(state.chapterOutcomes.C6);
  });

  it("uses ending phase when advancing from the final level", () => {
    const state = {
      ...createInitialState(),
      phase: "result",
      currentCardId: "C6-08",
      pendingResult: { text: "完成" }
    };

    const next = advanceAfterResult(state);

    expect(next.currentCardId).toBe("E-01");
    expect(next.phase).toBe("ending");
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
      stats: {
        ...createInitialState().stats,
        safety: 2
      },
      tags: ["low_salary", "remote_home", "night_quiet_route", "visible_work", "seen_by_friend"],
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

  it("uses paused unresolved echo without resolving to the exit ending", () => {
    const state = {
      ...createInitialState(),
      tags: ["paused_unresolved"],
      chapterOutcomes: {
        C6: { id: "limited", label: "问题未闭合", counters: {} }
      }
    };

    expect(buildChapterEchoLines(state).at(-1)).toBe(
      "窗口：你先停下来。不是因为问题消失，而是继续处理已经变成另一种消耗。"
    );
    expect(resolvePassStyle(state)).not.toMatchObject({
      id: "left_the_place"
    });
  });

  it("uses lock-control echoes for the room chapter", () => {
    expect(buildChapterEchoLines({
      ...createInitialState(),
      hidden: {
        ...createInitialState().hidden,
        lockChanged: 1
      }
    })[1]).toBe("房间：你花钱换了一把新的锁。门合上的声音让房间稍微像自己的地方。");

    expect(buildChapterEchoLines({
      ...createInitialState(),
      hidden: {
        ...createInitialState().hidden,
        askedPermission: 1
      }
    })[1]).toBe("房间：你问过能不能换锁。安全没有被拒绝，只是多了一层解释。");

    expect(buildChapterEchoLines({
      ...createInitialState(),
      hidden: {
        ...createInitialState().hidden,
        keyUncertain: 1
      }
    })[1]).toBe("房间：你住下来了。只是那把旧锁让每次关门都多停一秒。");
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
      id: "low_margin",
      label: "余量耗尽"
    });
  });

  it("resolves risk-internalized pass style before stable style", () => {
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
      id: "always_ready",
      label: "风险内化"
    });
  });

  it("resolves risk-internalized pass style from repeated route strategies", () => {
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
      id: "always_ready",
      label: "风险内化"
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
      "很多事没有发生，但你已经为它们准备过很多次。",
      "你花钱换过安全，也因此失去了一些选择。",
      "你把流程走完了，但已经没有力气再讲一遍。"
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

    expect(record.timelineItems).toHaveLength(6);
    expect(record.timelineItems[0]).toMatchObject({
      chapter: "筛选"
    });
    expect(status.statusItems).toContainEqual({
      key: "safety",
      label: "安全感",
      word: "危险"
    });
    expect(status.counterLines).toContain("放弃近路：4 次");
    expect(status.blockedChoiceLines).toContain("有几次，你不是不想选择更安全的路，只是余额不允许。");
    expect(profile.lines).toContain("年龄：27。");
    expect(report.text).toBe("");
    expect(report.lines).toEqual([]);
    expect(report.finalReport.situation).toMatchObject({
      id: "always_ready",
      label: "风险内化"
    });
    expect(report.finalReport.situation.text).toContain("路灯、出口、车牌和手机电量");
    expect(report.finalReport.concept).toContain("当风险长期存在但不一定每次发生");
    expect(report.finalReport.statusItems).toBeUndefined();
    expect(report.finalReport.costLines).toContain("很多事没有发生，但你已经为它们准备过很多次。");
  });
});
