import { describe, expect, it } from "vitest";
import {
  CRISIS_CARDS,
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
  "P-01", "P-04",
  "C1-I",
  "C1-01", "C1-04", "C1-07",
  "C2-I",
  "C2-01", "C2-03", "C2-05",
  "C3-I",
  "C3-03", "C3-04", "C3-05", "C3-06",
  "C4-I",
  "C4-02", "C4-04", "C4-06", "C4-07",
  "C5-I",
  "C5-02", "C5-05", "C5-07",
  "C6-I",
  "C6-02", "C6-04", "C6-08",
  "E-01", "E-02", "E-03", "E-04"
];

const statKeySet = new Set(STAT_KEYS);
const hiddenKeySet = new Set(HIDDEN_KEYS);
const counterKeySet = new Set(Object.keys(createInitialState().counters));
const forbiddenBeforeReveal = [
  "女性",
  "女人",
  "女生",
  "男性",
  "男人",
  "性别",
  "女权",
  "父权",
  "凝视",
  "弱者",
  "弱位",
  "处境",
  "压迫",
  "规训",
  "结构性",
  "受害者",
  "骚扰",
  "创伤"
];

function textFields(card) {
  return [
    card.chapterTitle,
    card.kicker,
    card.title,
    card.text,
    card.scene,
    card.content,
    card.objective,
    card.buttonLabel,
    card.reveal,
    ...(card.choices ?? []).flatMap((choice) => [choice.label, choice.result])
  ]
    .filter(Boolean)
    .join("\n");
}

describe("level data", () => {
  it("keeps the approved one-playthrough order", () => {
    expect(orderedCardIds).toEqual(expectedOrderedIds);
  });

  it("has valid choice cards", () => {
    expect(LEVEL_CARDS).toHaveLength(22);

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

  it("has chapter intros, no settlement pages, and four ending cards", () => {
    expect(INTRO_CARDS.map((card) => card.id)).toEqual([
      "P-I", "C1-I", "C2-I", "C3-I", "C4-I", "C5-I", "C6-I"
    ]);
    expect(SETTLEMENT_CARDS).toEqual([]);
    expect(ENDING_CARDS.map((card) => card.id)).toEqual([
      "E-01", "E-02", "E-03", "E-04"
    ]);
  });

  it("has one crisis card per long-term stat", () => {
    expect(CRISIS_CARDS.map((card) => card.id)).toEqual([
      "CR-reputation",
      "CR-money",
      "CR-safety",
      "CR-energy",
      "CR-relationship",
      "CR-self"
    ]);

    for (const card of CRISIS_CARDS) {
      expect(card.type).toBe("level");
      expect(card.crisis).toBe(true);
      expect(card.stat).toBeTypeOf("string");
      expect(card.choices.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("keeps approved chapter intro copy and theme tokens", () => {
    expect(getCardById("C1-I")).toEqual({
      id: "C1-I",
      type: "chapterIntro",
      chapterId: "C1",
      chapterTitle: "第一章：筛选",
      kicker: "第一章",
      title: "筛选",
      text: "你需要获得一个位置。这里的人会看你的资料、回答、语气和反应，也会看一些你以为不该重要的东西。",
      objective: "目标：获得一个位置。",
      buttonLabel: "进入筛选",
      theme: {
        primary: "#7A6D5E",
        surface: "#F2EDE6",
        accent: "#4F463D"
      }
    });

    expect(getCardById("C5-I").objective).toBe("目标：靠近别人，同时保留距离。");
  });

  it("removes standalone settlement cards from the short version", () => {
    expect(getCardById("C1-S")).toBeUndefined();
    expect(getCardById("C6-S")).toBeUndefined();
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

  it("uses v0.6 short-mainline scene copy without changing choice configuration", () => {
    expect(getCardById("P-01").scene).toBe(
      "今天有一场重要见面。你站在镜子前，灯光把衣服上的褶皱照得很清楚。你想起有人曾说你“不够认真”，也有人说你“太用力”。时间不多了，你需要决定以什么样子出门。"
    );
    expect(getCardById("C3-04").scene).toBe(
      "晚上十点，地铁口到家有两条路。近路人少，大路绕远。打车价格翻倍。地图把它们标成三个普通选项，没有标出路灯、店铺和途中会不会遇到谁。"
    );
    expect(getCardById("C6-08").scene).toBe(
      "系统给出结果：证据不足，但会提醒相关人员注意。你不能说它完全没用，也不能说它解决了什么。页面上显示“已处理”。这个词很短，短到装不下你花掉的时间。"
    );
    expect(getCardById("CR-self").scene).toBe(
      "你知道自己不愿意，但拒绝这件事本身也需要力气。"
    );
    expect(getCardById("C6-08").choices.map((choice) => choice.id)).toEqual([
      "accept",
      "appeal",
      "leave"
    ]);
  });

  it("keeps ending titles away from RPG-style score screens", () => {
    expect(getCardById("E-01").title).toBe("记录完成");
    expect(getCardById("E-01").title).not.toBe("数值总览");
    expect(getCardById("E-03").title).toBe("角色档案生成中");
    expect(getCardById("E-04").title).toBe("普通难度 · 通关记录");
    expect(getCardById("E-04").buttonLabel).toBe("重新开始");
  });

  it("keeps conditional replacement cards in the short-mainline data", () => {
    expect(INSERT_CARDS).toEqual([]);
    expect(getCardById("C3-05").title).toBe("路线偏移");
    expect(getCardById("C3-06").title).toBe("楼道");
    expect(getCardById("C4-06").title).toBe("别激动");
    expect(getCardById("C4-07").title).toBe("绩效材料");
  });

  it("keeps v0.4 hidden keys and counter keys", () => {
    expect(HIDDEN_KEYS).toEqual(["time", "evidence", "exposure", "credit", "conflict"]);
    expect(Object.keys(createInitialState().counters)).toEqual([
      "detour",
      "seekHelp",
      "explain",
      "silence",
      "concede",
      "clearRefusal",
      "evidenceSaved",
      "paidSafety"
    ]);
  });

  it("keeps direct topic words out of pre-ending text", () => {
    const preRevealCards = [
      ...INTRO_CARDS.filter((card) => card.id !== "E-I"),
      ...LEVEL_CARDS,
      ...SETTLEMENT_CARDS,
      ...CRISIS_CARDS,
      ...INSERT_CARDS,
      ...ENDING_CARDS.filter((card) => ["E-01", "E-02"].includes(card.id))
    ];

    for (const card of preRevealCards) {
      const text = textFields(card);
      for (const word of forbiddenBeforeReveal) {
        expect(text, `${card.id} contains ${word}`).not.toContain(word);
      }
    }
  });

  it("uses only approved schema keys in ordinary and insert cards", () => {
    for (const card of [...LEVEL_CARDS, ...INSERT_CARDS, ...CRISIS_CARDS]) {
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

        expect(choice, `${card.id}.${choice.id} should not expose visibleChanges`).not.toHaveProperty("visibleChanges");

        for (const key of Object.keys(choice.requirements?.minStats ?? {})) {
          expect(statKeySet.has(key), `${card.id}.${choice.id} requirements.minStats.${key}`).toBe(true);
        }
      }
    }
  });

  it("keeps approved disabled-choice requirements", () => {
    const c608ChoicesByLabel = Object.fromEntries(
      getCardById("C6-08").choices.map((choice) => [choice.label, choice])
    );

    expect(c608ChoicesByLabel["接受结果"].requirements).toBeUndefined();
    expect(c608ChoicesByLabel["继续申诉"].requirements).toEqual({
      minStats: { energy: 3 },
      reason: "你已经说不下去"
    });
    expect(c608ChoicesByLabel["离开环境"].requirements).toEqual({
      minStats: { money: 3 },
      reason: "余额不足"
    });
  });

  it("can retrieve cards by id", () => {
    expect(getCardById("C3-04").title).toBe("加班后的路线");
    expect(getCardById("C6-08").title).toBe("处理结果");
    expect(getCardById("P-S")).toBeUndefined();
  });
});
