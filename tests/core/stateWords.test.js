import { describe, expect, it } from "vitest";
import { getStateWord, getVisibleStats } from "../../src/core/stateWords.js";

describe("state words", () => {
  it("maps numeric values to four visible words", () => {
    expect(getStateWord(3)).toBe("较高");
    expect(getStateWord(1)).toBe("稳定");
    expect(getStateWord(-1)).toBe("紧张");
    expect(getStateWord(-4)).toBe("危险");
  });

  it("only returns stats visible in the current chapter", () => {
    const stats = {
      reputation: 1,
      money: -1,
      safety: -4,
      energy: 0,
      relationship: 0,
      self: 0
    };

    expect(getVisibleStats(stats, ["reputation", "money", "safety"])).toEqual([
      { key: "reputation", label: "信誉", word: "稳定", value: 1 },
      { key: "money", label: "钱", word: "紧张", value: -1 },
      { key: "safety", label: "安全感", word: "危险", value: -4 }
    ]);
  });
});
