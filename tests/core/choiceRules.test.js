import { describe, expect, it } from "vitest";
import { createInitialState } from "../../src/core/initialState.js";
import { getDisabledReason, selectVisibleChanges } from "../../src/core/choiceRules.js";

describe("choice rules", () => {
  it("skips unknown visible change keys before limiting displayed changes", () => {
    const changes = selectVisibleChanges(
      {
        effects: { unknown: 1, money: -2, safety: 1 },
        visibleChanges: ["unknown", "money", "safety"]
      },
      ["unknown", "money", "safety"]
    );

    expect(changes).toEqual([
      { key: "money", label: "钱", delta: -2 },
      { key: "safety", label: "安全感", delta: 1 }
    ]);
  });

  it("returns custom reason when min stat requirements are unmet", () => {
    const state = {
      ...createInitialState(),
      stats: { ...createInitialState().stats, money: -1 }
    };

    const reason = getDisabledReason(
      {
        requirements: {
          minStats: { money: 1 },
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
    const state = createInitialState();

    const reason = getDisabledReason(
      {
        requirements: {
          minStats: { reputation: 1 }
        }
      },
      state
    );

    expect(reason).toBe("条件不足");
  });

  it("returns empty reason when choice is available", () => {
    const state = {
      ...createInitialState(),
      stats: { ...createInitialState().stats, reputation: 2 },
      tags: ["准备充分", "有人知道"]
    };

    const reason = getDisabledReason(
      {
        requirements: {
          minStats: { reputation: 1 },
          tagsAll: ["准备充分"]
        }
      },
      state
    );

    expect(reason).toBe("");
  });
});
