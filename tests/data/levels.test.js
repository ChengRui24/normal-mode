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
      text: "你开始找工作。表格、照片、问题和等待区，会比你先开口。这里会看你会做什么，也会看你会不会让流程停下来。",
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
      "你选了更便宜的房子。现金留下来了，通勤和夜里回家的路都变长了。"
    );
    expect(c608ChoicesByLabel["继续申诉"].result).toBe(
      "你点开申诉入口，又开始整理时间、截图和说明。系统允许你继续，也要求你再说一遍。"
    );
  });

  it("uses v0.8 short-mainline scene copy without changing choice configuration", () => {
    expect(getCardById("P-01").scene).toBe(
      "今天有一场重要见面，地点在城另一边。你站在镜子前。深色外套看起来正式，但上次有人说这样显得太强硬；浅色衬衫轻松一点，又可能被说不够重视。时间不多了，你要决定怎么出门。"
    );
    expect(getCardById("C3-04").scene).toBe(
      "晚上十点，你从地铁口出来，离住处还有一段路。近路人少，大路绕远，打车价格翻倍。地图把它们标成三个普通选项，没有标出路灯、店铺和途中会不会遇到谁。"
    );
    expect(getCardById("C6-08").scene).toBe(
      "几天后，系统给出结果：未发现明确违规，但会提醒对方注意沟通边界。你不能说它完全没用，也不能说它解决了什么。页面上显示“已处理”。这个词很短，短到装不下你花掉的时间。"
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

  it("keeps approved hidden keys and counter keys", () => {
    expect(HIDDEN_KEYS).toEqual([
      "time",
      "evidence",
      "exposure",
      "credit",
      "conflict",
      "lockChanged",
      "askedPermission",
      "keyUncertain"
    ]);
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

  it("keeps rewritten option mechanics aligned with their narrative meaning", () => {
    const c205Choices = Object.fromEntries(getCardById("C2-05").choices.map((choice) => [choice.label, choice]));
    expect(getCardById("C2-05")).toMatchObject({
      title: "换锁",
      scene: "搬进来的第三天，你发现门锁很旧。中介说房东、保洁和上一任租客都“可能还有钥匙”，但一般不会出事。换锁要自己付钱，还要先问房东。不换也能住，只是每次关门时，你都会多看一眼。"
    });
    expect(c205Choices["自己付钱换锁"]).toMatchObject({
      result: "师傅下午来换了锁，花了 280 元。房东说退租时要交回新钥匙。余额少了一点，但今晚你不用再反复确认门锁。",
      effects: { money: -2, safety: 2, self: 1 },
      hiddenEffects: { lockChanged: 1 },
      tagsAdded: ["lock_changed"],
      track: { paidSafety: 1 },
      requirements: {
        minStats: { money: 3 },
        reason: "余额不够"
      }
    });
    expect(c205Choices["先问房东能不能换"]).toMatchObject({
      result: "你把照片发给房东。对方几小时后才回：可以换，费用自理，退租时恢复原样。锁还没换，你先解释了一轮。",
      effects: { energy: -1, safety: 1 },
      hiddenEffects: { conflict: 1, askedPermission: 1 },
      tagsAdded: ["asked_permission"],
      track: { explain: 1 }
    });
    expect(c205Choices["先不换"]).toMatchObject({
      result: "你决定先不换。钱省下来了，也不用和房东来回确认。晚上关门时，你还是多拧了一次反锁。",
      effects: { safety: -2, self: -1 },
      hiddenEffects: { keyUncertain: 1 },
      tagsAdded: ["key_uncertain"],
      track: { concede: 1 }
    });
    for (const choice of Object.values(c205Choices)) {
      expect(choice.effects ?? {}).not.toHaveProperty("relationship");
      expect(choice.track ?? {}).not.toHaveProperty("seekHelp");
    }

    const p04Choices = Object.fromEntries(getCardById("P-04").choices.map((choice) => [choice.label, choice]));
    expect(p04Choices["不发消息，直接上楼"]).toMatchObject({
      effects: { reputation: -1, energy: 1 },
      tagsAdded: ["no_message"],
      track: { silence: 1 }
    });
    expect(p04Choices["不发消息，直接上楼"].effects).not.toHaveProperty("money");
    expect(p04Choices["不发消息，直接上楼"].effects).not.toHaveProperty("safety");
    expect(p04Choices["不发消息，直接上楼"].tagsAdded).not.toContain("platform_trip");
    expect(p04Choices["不发消息，直接上楼"].track).not.toHaveProperty("paidSafety");
    expect(p04Choices["不发消息，直接上楼"].requirements).toBeUndefined();

    const c507Choices = Object.fromEntries(getCardById("C5-07").choices.map((choice) => [choice.label, choice]));
    expect(c507Choices["解释得更完整一点"]).toMatchObject({
      effects: { energy: -2, relationship: -1 },
      tagsAdded: ["explain_loop"],
      track: { explain: 1 },
      requirements: {
        minStats: { energy: 3 },
        reason: "没有力气再讲一遍"
      }
    });
    expect(c507Choices["解释得更完整一点"].track).not.toHaveProperty("silence");

    const c604Choices = Object.fromEntries(getCardById("C6-04").choices.map((choice) => [choice.label, choice]));
    expect(c604Choices["接受先记作误会"]).toMatchObject({
      effects: { energy: 1, self: -2 },
      tagsAdded: ["accepted_misunderstanding"],
      track: { concede: 1 }
    });
    expect(c604Choices["接受先记作误会"].hiddenEffects ?? {}).not.toHaveProperty("conflict");
    expect(c604Choices["接受先记作误会"].track).not.toHaveProperty("clearRefusal");
    expect(c604Choices["接受先记作误会"].requirements).toBeUndefined();

    const c608Choices = Object.fromEntries(getCardById("C6-08").choices.map((choice) => [choice.label, choice]));
    expect(c608Choices["关闭页面，先让自己休息"]).toMatchObject({
      effects: { energy: 2, self: -1 },
      tagsAdded: ["paused_unresolved"],
      track: { silence: 1 }
    });
    expect(c608Choices["关闭页面，先让自己休息"].effects).not.toHaveProperty("money");
    expect(c608Choices["关闭页面，先让自己休息"].effects).not.toHaveProperty("safety");
    expect(c608Choices["关闭页面，先让自己休息"].tagsAdded).not.toContain("exit_cost");
    expect(c608Choices["关闭页面，先让自己休息"].track).not.toHaveProperty("paidSafety");
    expect(c608Choices["关闭页面，先让自己休息"].requirements).toBeUndefined();
  });

  it("keeps approved disabled-choice requirements", () => {
    const c608ChoicesByLabel = Object.fromEntries(
      getCardById("C6-08").choices.map((choice) => [choice.label, choice])
    );

    expect(c608ChoicesByLabel["接受结果，保存记录"].requirements).toBeUndefined();
    expect(c608ChoicesByLabel["继续申诉"].requirements).toEqual({
      minStats: { energy: 3 },
      reason: "没有力气再讲一遍"
    });
    expect(c608ChoicesByLabel["关闭页面，先让自己休息"].requirements).toBeUndefined();
  });

  it("can retrieve cards by id", () => {
    expect(getCardById("C3-04").title).toBe("加班后的路线");
    expect(getCardById("C6-08").title).toBe("处理结果");
    expect(getCardById("P-S")).toBeUndefined();
  });
});
