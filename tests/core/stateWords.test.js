import { describe, expect, it } from "vitest";
import { getStateWord, getVisibleStats } from "../../src/core/stateWords.js";

describe("state words", () => {
  it("maps numeric values to four visible words", () => {
    expect(getStateWord(12)).toBe("较高");
    expect(getStateWord(9)).toBe("较高");
    expect(getStateWord(8)).toBe("稳定");
    expect(getStateWord(6)).toBe("稳定");
    expect(getStateWord(5)).toBe("紧张");
    expect(getStateWord(3)).toBe("紧张");
    expect(getStateWord(2)).toBe("危险");
    expect(getStateWord(0)).toBe("危险");
  });

  it("only returns stats visible in the current chapter", () => {
    const stats = {
      reputation: 9,
      money: 5,
      safety: 2,
      energy: 7,
      relationship: 5,
      self: 6
    };

    expect(getVisibleStats(stats, ["reputation", "money", "safety"])).toEqual([
      { key: "reputation", label: "信誉", word: "较高", value: 9 },
      { key: "money", label: "钱", word: "紧张", value: 5 },
      { key: "safety", label: "安全感", word: "危险", value: 2 }
    ]);
  });
});
