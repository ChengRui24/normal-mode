// @vitest-environment jsdom

import { beforeEach, describe, expect, it } from "vitest";
import { createInitialState } from "../../src/core/initialState.js";
import { clearSavedState, loadState, saveState } from "../../src/core/storage.js";

describe("storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("saves and loads state", () => {
    const state = {
      ...createInitialState(),
      currentCardId: "C3-04",
      tags: ["低电量风险"]
    };

    saveState(state);

    expect(loadState()).toMatchObject({
      currentCardId: "C3-04",
      tags: ["低电量风险"]
    });
  });

  it("returns null for missing or invalid saved state", () => {
    expect(loadState()).toBe(null);

    localStorage.setItem("ordinary-life-save-v1", "{bad json");

    expect(loadState()).toBe(null);
  });

  it("clears saved state", () => {
    saveState(createInitialState());
    clearSavedState();
    expect(loadState()).toBe(null);
  });
});
