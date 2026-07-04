import { describe, expect, it } from "vitest";
import {
  ENDING_CARDS,
  INSERT_CARDS,
  LEVEL_CARDS,
  SETTLEMENT_CARDS,
  getCardById,
  orderedCardIds
} from "../../src/data/levels.js";

const expectedOrderedIds = [
  "P-01", "P-02", "P-03", "P-04",
  "C1-01", "C1-02", "C1-03", "C1-04", "C1-05", "C1-06", "C1-07", "C1-S",
  "C2-01", "C2-02", "C2-03", "C2-04", "C2-05", "C2-06", "C2-07", "C2-S",
  "C3-01", "C3-02", "C3-03", "C3-04", "C3-05", "C3-06", "C3-07", "C3-S",
  "C4-01", "C4-02", "C4-03", "C4-04", "C4-05", "C4-06", "C4-07", "C4-S",
  "C5-01", "C5-02", "C5-03", "C5-04", "C5-05", "C5-06", "C5-07", "C5-S",
  "C6-01", "C6-02", "C6-03", "C6-04", "C6-05", "C6-06", "C6-07", "C6-08", "C6-S",
  "E-01", "E-02", "E-03", "E-04"
];

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
    expect(SETTLEMENT_CARDS.map((card) => card.id)).toEqual([
      "C1-S", "C2-S", "C3-S", "C4-S", "C5-S", "C6-S"
    ]);
    expect(ENDING_CARDS.map((card) => card.id)).toEqual(["E-01", "E-02", "E-03", "E-04"]);
  });

  it("includes at least one conditional insert card", () => {
    expect(INSERT_CARDS.length).toBeGreaterThanOrEqual(1);
    expect(INSERT_CARDS[0].trigger.tagsAll).toContain("低电量风险");
  });

  it("can retrieve cards by id", () => {
    expect(getCardById("C3-04").title).toBe("加班后的路线");
    expect(getCardById("C6-08").title).toBe("处理结果");
  });
});
