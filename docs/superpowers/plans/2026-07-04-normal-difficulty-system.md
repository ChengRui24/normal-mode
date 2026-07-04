# Normal Difficulty System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the current narrative prototype into the approved ordinary-difficulty cost accumulation system without adding difficulty selection or second-run mode.

**Architecture:** Keep the linear card flow. Normalize long-term stats to a 0-12 range, preserve natural-language feedback, add once-only crisis inserts when a stat first becomes dangerous, strengthen risk-chain insert triggers, and replace the ending with generated static cards that summarize state, strategy, costs, and identity reveal.

**Tech Stack:** Vite, vanilla JavaScript modules, Vitest, CSS.

---

### Task 1: Stat Scale

**Files:**
- Modify: `src/data/statConfig.js`
- Modify: `src/core/initialState.js`
- Modify: `src/core/gameEngine.js`
- Test: `tests/core/stateWords.test.js`
- Test: `tests/core/gameEngine.test.js`
- Test: `tests/core/choiceRules.test.js`

- [ ] Write failing tests for initial stats: reputation 6, money 6, safety 6, energy 7, relationship 5, self 6.
- [ ] Write failing tests for state words: 9-12 `较高`, 6-8 `稳定`, 3-5 `紧张`, 0-2 `危险`.
- [ ] Write failing tests proving stat changes clamp to 0-12.
- [ ] Update requirements using new scale, especially current C6 gates.
- [ ] Run focused tests.

### Task 2: Crisis And Risk Inserts

**Files:**
- Modify: `src/data/levels.js`
- Modify: `src/core/initialState.js`
- Modify: `src/core/gameEngine.js`
- Test: `tests/data/levels.test.js`
- Test: `tests/core/gameEngine.test.js`

- [ ] Add six crisis cards, one for each long-term stat.
- [ ] Add `triggeredCrises` and `returnCardId` state.
- [ ] Insert a crisis card after a result when a stat is 0-2 and its crisis has not triggered.
- [ ] Return from a crisis card to the mainline card that would have followed the original result.
- [ ] Update the third-chapter route risk trigger to use 0-12 danger thresholds.
- [ ] Run focused tests.

### Task 3: Dynamic Ending

**Files:**
- Modify: `src/data/levels.js`
- Modify: `src/core/gameEngine.js`
- Modify: `src/ui/render.js`
- Test: `tests/data/levels.test.js`
- Test: `tests/core/gameEngine.test.js`
- Test: `tests/ui/render.test.js`

- [ ] Replace ending cards with E-01 through E-10.
- [ ] Add helpers for final state summary, behavior stats, pass style, and cost list.
- [ ] Render generated ending sections without exposing raw numeric scores.
- [ ] Keep final identity reveal and theme text fixed.
- [ ] Run focused tests.

### Task 4: Verification

**Files:**
- No new source files.

- [ ] Run `npm test`.
- [ ] Run `npm run build`.
- [ ] Verify a 390px browser screenshot for state/ending cards.
- [ ] Commit with `feat: add normal difficulty system`.
