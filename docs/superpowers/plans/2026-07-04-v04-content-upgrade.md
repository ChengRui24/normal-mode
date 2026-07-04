# v0.4 Content Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the ordinary difficulty text adventure to the v0.4 content spec while preserving the quiet pre-ending framing and editable CSV workflow.

**Architecture:** Keep the app runtime structure unchanged: `src/data/levels.js` remains the source for card content, `src/data/statConfig.js` remains the source for stat ranges and visibility, and `src/core/gameEngine.js` owns dynamic ending logic. Use a one-off content sync script only during implementation to parse the attached v0.4 markdown into the existing JS schema, then regenerate `content-tables/*.csv` from the updated source.

**Tech Stack:** Vite, Vitest, vanilla ES modules, Node.js scripts, CSV content tables.

---

### Task 1: Lock v0.4 Expectations With Tests

**Files:**
- Modify: `tests/data/levels.test.js`
- Modify: `tests/core/gameEngine.test.js`

- [ ] Add tests that `orderedCardIds` includes `P-S` and `E-11`.
- [ ] Add tests that ending cards are `E-01` through `E-11`.
- [ ] Add a pre-ending forbidden-word test for `女性、女人、女生、男性、男人、性别、女权、父权、凝视、弱者、弱位、处境、压迫、规训、结构性、受害者、骚扰、创伤`.
- [ ] Add tests that `HIDDEN_KEYS` is exactly `time/evidence/exposure/credit/conflict`.
- [ ] Add tests that v0.4 counters are accepted: `detour`, `seekHelp`, `explain`, `silence`, `concede`, `clearRefusal`, `evidenceSaved`, `paidSafety`.
- [ ] Add tests for v0.4 pass-style priority using the new counter names.
- [ ] Run `npm test -- tests/data/levels.test.js tests/core/gameEngine.test.js` and confirm the tests fail against current content.

### Task 2: Apply v0.4 Data

**Files:**
- Modify: `src/data/levels.js`
- Modify: `src/data/statConfig.js`
- Modify: `src/core/initialState.js`
- Modify: `tools/contentTables.mjs`

- [ ] Parse the attached v0.4 markdown into card/choice updates for P through C6 and crisis cards.
- [ ] Keep internal stat keys as `reputation`, `money`, `safety`, `energy`, `relationship`, `self`; map v0.4 `rep` to `reputation` and `relation` to `relationship`.
- [ ] Replace hidden keys with `time`, `evidence`, `exposure`, `credit`, `conflict`.
- [ ] Replace counter keys with `detour`, `seekHelp`, `explain`, `silence`, `concede`, `clearRefusal`, `evidenceSaved`, `paidSafety`.
- [ ] Add `P-S` settlement and `E-11` ending.
- [ ] Run the data and engine tests until green.

### Task 3: Update Dynamic Ending Logic

**Files:**
- Modify: `src/core/gameEngine.js`
- Modify: `tests/core/gameEngine.test.js`

- [ ] Update `buildEndingStats()` to output the v0.4 strategy lines.
- [ ] Update `resolvePassStyle()` priority: struggling, high-alert, overworked, isolated, low-conflict, appeal, exited, stable.
- [ ] Update `buildCostLines()` to match the v0.4 examples.
- [ ] Ensure `E-02` through `E-05` still dynamically render lines.
- [ ] Run `npm test -- tests/core/gameEngine.test.js`.

### Task 4: Sync CSV Tables

**Files:**
- Modify: `content-tables/cards.csv`
- Modify: `content-tables/choices.csv`
- Modify: `content-tables/triggers.csv`
- Modify: `content-tables/stat-config.csv`

- [ ] Run `npm run export:content`.
- [ ] Inspect CSV headers and sample rows to confirm v0.4 content is exported.
- [ ] Run a temporary import verification with `tools/contentTables.mjs`.

### Task 5: Final Verification

**Files:**
- No direct edits.

- [ ] Run `npm test`.
- [ ] Run `npm run build`.
- [ ] Check `git status --short`.
- [ ] Commit with `feat: apply v0.4 content config`.
