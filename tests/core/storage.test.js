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
      tags: ["low_battery"]
    };

    saveState(state);

    expect(loadState()).toMatchObject({
      currentCardId: "C3-04",
      tags: ["low_battery"]
    });
  });

  it("returns null for missing or invalid saved state", () => {
    expect(loadState()).toBe(null);

    localStorage.setItem("ordinary-life-save-v3", "{bad json");

    expect(loadState()).toBe(null);
  });

  it("ignores saves from older schemas", () => {
    localStorage.setItem("ordinary-life-save-v1", JSON.stringify({
      ...createInitialState(),
      currentCardId: "C2-01"
    }));
    localStorage.setItem("ordinary-life-save-v2", JSON.stringify({
      ...createInitialState(),
      currentCardId: "C3-01"
    }));

    expect(loadState()).toBe(null);
  });

  it("clears saved state", () => {
    saveState(createInitialState());
    clearSavedState();
    expect(loadState()).toBe(null);
  });
});
