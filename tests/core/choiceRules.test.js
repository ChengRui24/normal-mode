import { describe, expect, it } from "vitest";
import { createInitialState } from "../../src/core/initialState.js";
import { getDisabledReason } from "../../src/core/choiceRules.js";

describe("choice rules", () => {
  it("returns custom reason when min stat requirements are unmet", () => {
    const state = {
      ...createInitialState(),
      stats: { ...createInitialState().stats, money: 2 }
    };

    const reason = getDisabledReason(
      {
        requirements: {
          minStats: { money: 3 },
          reason: "钱不够"
        }
      },
      state
    );

    expect(reason).toBe("钱不够");
  });

  it("returns custom reason when required tags are missing", () => {
    const state = {
      ...createInitialState(),
      tags: ["已有标签"]
    };

    const reason = getDisabledReason(
      {
        requirements: {
          tagsAll: ["已有标签", "缺失标签"],
          reason: "缺少前置选择"
        }
      },
      state
    );

    expect(reason).toBe("缺少前置选择");
  });

  it("uses fallback disabled reason when no custom reason exists", () => {
    const state = {
      ...createInitialState(),
      stats: { ...createInitialState().stats, reputation: 2 }
    };

    const reason = getDisabledReason(
      {
        requirements: {
          minStats: { reputation: 3 }
        }
      },
      state
    );

    expect(reason).toBe("条件不足");
  });

  it("returns empty reason when choice is available", () => {
    const state = {
      ...createInitialState(),
      stats: { ...createInitialState().stats, reputation: 6 },
      tags: ["准备充分", "有人知道"]
    };

    const reason = getDisabledReason(
      {
        requirements: {
          minStats: { reputation: 3 },
          tagsAll: ["准备充分"]
        }
      },
      state
    );

    expect(reason).toBe("");
  });
});
