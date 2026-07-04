import { describe, expect, it } from "vitest";
import {
  ENDING_CARDS,
  INSERT_CARDS,
  INTRO_CARDS,
  LEVEL_CARDS,
  SETTLEMENT_CARDS,
  getCardById,
  orderedCardIds
} from "../../src/data/levels.js";
import { HIDDEN_KEYS, STAT_KEYS } from "../../src/data/statConfig.js";
import { createInitialState } from "../../src/core/initialState.js";

const expectedOrderedIds = [
  "P-I",
  "P-01", "P-02", "P-03", "P-04",
  "C1-I",
  "C1-01", "C1-02", "C1-03", "C1-04", "C1-05", "C1-06", "C1-07", "C1-S",
  "C2-I",
  "C2-01", "C2-02", "C2-03", "C2-04", "C2-05", "C2-06", "C2-07", "C2-S",
  "C3-I",
  "C3-01", "C3-02", "C3-03", "C3-04", "C3-05", "C3-06", "C3-07", "C3-S",
  "C4-I",
  "C4-01", "C4-02", "C4-03", "C4-04", "C4-05", "C4-06", "C4-07", "C4-S",
  "C5-I",
  "C5-01", "C5-02", "C5-03", "C5-04", "C5-05", "C5-06", "C5-07", "C5-S",
  "C6-I",
  "C6-01", "C6-02", "C6-03", "C6-04", "C6-05", "C6-06", "C6-07", "C6-08", "C6-S",
  "E-I",
  "E-01", "E-02", "E-03", "E-04", "E-05", "E-06"
];

const statKeySet = new Set(STAT_KEYS);
const hiddenKeySet = new Set(HIDDEN_KEYS);
const counterKeySet = new Set(Object.keys(createInitialState().counters));

describe("level data", () => {
  it("keeps the approved one-playthrough order", () => {
    expect(orderedCardIds).toEqual(expectedOrderedIds);
  });

  it("has valid choice cards", () => {
    expect(LEVEL_CARDS).toHaveLength(47);

    for (const card of LEVEL_CARDS) {
      expect(card.type).toBe("level");
      expect(card.scene.length).toBeGreaterThan(0);
      expect(card.choices.length).toBeGreaterThanOrEqual(2);
      expect(card.choices.length).toBeLessThanOrEqual(3);

      for (const choice of card.choices) {
        expect(choice.label.length).toBeGreaterThan(0);
        expect(choice.result.length).toBeGreaterThan(0);
        expect(choice.effects ?? {}).toBeTypeOf("object");
        expect(choice.hiddenEffects ?? {}).toBeTypeOf("object");
        expect(choice.tagsAdded ?? []).toBeInstanceOf(Array);
      }
    }
  });

  it("has chapter settlements and ending reveal cards", () => {
    expect(INTRO_CARDS.map((card) => card.id)).toEqual([
      "P-I", "C1-I", "C2-I", "C3-I", "C4-I", "C5-I", "C6-I", "E-I"
    ]);
    expect(SETTLEMENT_CARDS.map((card) => card.id)).toEqual([
      "C1-S", "C2-S", "C3-S", "C4-S", "C5-S", "C6-S"
    ]);
    expect(ENDING_CARDS.map((card) => card.id)).toEqual([
      "E-01", "E-02", "E-03", "E-04", "E-05", "E-06"
    ]);
  });

  it("keeps approved chapter intro copy and theme tokens", () => {
    expect(getCardById("C1-I")).toEqual({
      id: "C1-I",
      type: "chapterIntro",
      chapterId: "C1",
      chapterTitle: "第一章：筛选",
      kicker: "第一章",
      title: "筛选",
      text: "你需要获得一个位置。这里的人会看你的资料、回答、语气、反应，也会看一些你以为不该重要的东西。你还不知道，很多评价会留下来。",
      objective: "目标：获得一个位置。",
      buttonLabel: "进入筛选",
      theme: {
        primary: "#7A6D5E",
        surface: "#F2EDE6",
        accent: "#4F463D"
      }
    });

    expect(getCardById("E-I").buttonLabel).toBe("查看结果");
  });

  it("uses colder chapter settlement copy without mechanic explanations", () => {
    expect(getCardById("C1-S")).toEqual({
      id: "C1-S",
      type: "settlement",
      chapterId: "C1",
      chapterTitle: "第一章：筛选",
      title: "记录更新",
      text: "你获得了一个位置。它暂时接收你，也开始要求你用之后的表现继续证明自己。",
      reveal: "记录更新：信誉。"
    });

    expect(getCardById("C6-S")).toEqual({
      id: "C6-S",
      type: "settlement",
      chapterId: "C6",
      chapterTitle: "第六章：窗口",
      title: "记录更新",
      text: "这件事被记录了。它没有完全解决，但至少没有只留在你一个人的记忆里。",
      reveal: "记录更新：自我。"
    });
  });

  it("uses natural-language result feedback from the approved copy library", () => {
    const c201ChoicesByLabel = Object.fromEntries(
      getCardById("C2-01").choices.map((choice) => [choice.label, choice])
    );
    const c608ChoicesByLabel = Object.fromEntries(
      getCardById("C6-08").choices.map((choice) => [choice.label, choice])
    );

    expect(c201ChoicesByLabel["远且便宜"].result).toBe(
      "你保住了现金。地图上回家的那段路，也被拉得更长、更暗。"
    );
    expect(c608ChoicesByLabel["继续申诉"].result).toBe(
      "你继续往下走。每多走一步，都要再支付一点生活。"
    );
  });

  it("keeps ending titles away from RPG-style score screens", () => {
    expect(getCardById("E-01").title).toBe("记录汇总");
    expect(getCardById("E-01").title).not.toBe("数值总览");
    expect(getCardById("E-04").title).toBe("最后一项");
    expect(getCardById("E-06").title).toBe("结束页");
  });

  it("includes at least one conditional insert card", () => {
    expect(INSERT_CARDS.length).toBeGreaterThanOrEqual(1);
    expect(INSERT_CARDS[0].trigger.tagsAll).toContain("低电量风险");
  });

  it("uses only approved schema keys in ordinary and insert cards", () => {
    for (const card of [...LEVEL_CARDS, ...INSERT_CARDS]) {
      for (const choice of card.choices) {
        for (const key of Object.keys(choice.effects ?? {})) {
          expect(statKeySet.has(key), `${card.id}.${choice.id} effects.${key}`).toBe(true);
        }

        for (const key of Object.keys(choice.hiddenEffects ?? {})) {
          expect(hiddenKeySet.has(key), `${card.id}.${choice.id} hiddenEffects.${key}`).toBe(true);
        }

        for (const key of Object.keys(choice.track ?? {})) {
          expect(counterKeySet.has(key), `${card.id}.${choice.id} track.${key}`).toBe(true);
        }

        for (const key of choice.visibleChanges ?? []) {
          expect(statKeySet.has(key), `${card.id}.${choice.id} visibleChanges.${key}`).toBe(true);

          if (Object.hasOwn(choice.effects ?? {}, key)) {
            expect(statKeySet.has(key), `${card.id}.${choice.id} visible effect ${key}`).toBe(true);
          }
        }

        for (const key of Object.keys(choice.requirements?.minStats ?? {})) {
          expect(statKeySet.has(key), `${card.id}.${choice.id} requirements.minStats.${key}`).toBe(true);
        }
      }
    }
  });

  it("keeps approved insert triggers and disabled-choice requirements", () => {
    expect(getCardById("I-C3-footsteps").trigger).toEqual({
      afterCardId: "C3-04",
      tagsAll: ["低电量风险", "人少夜路"],
      hiddenMax: {},
      statMax: { safety: -2 }
    });

    const c608ChoicesByLabel = Object.fromEntries(
      getCardById("C6-08").choices.map((choice) => [choice.label, choice])
    );

    expect(c608ChoicesByLabel["接受结果"].requirements).toBeUndefined();
    expect(c608ChoicesByLabel["继续申诉"].requirements).toEqual({
      minStats: { energy: -1, self: 0 },
      reason: "无法继续消耗"
    });
    expect(c608ChoicesByLabel["离开环境"].requirements).toEqual({
      minStats: { money: -1, self: 0 },
      reason: "退出成本不足"
    });
  });

  it("can retrieve cards by id", () => {
    expect(getCardById("C3-04").title).toBe("加班后的路线");
    expect(getCardById("C6-08").title).toBe("处理结果");
  });
});
