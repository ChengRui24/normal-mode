# Chapter Intro Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Insert quiet chapter transition pages before the prologue, each chapter, and the ending.

**Architecture:** Add `chapterIntro` cards to the existing card data and ordered progression. Reuse the static card renderer with a dedicated intro branch for subtitle, title, intro text, objective text, button label, and lightweight theme colors. Keep all stats, results, settlements, saves, and ending flow unchanged.

**Tech Stack:** Vite, vanilla JavaScript, Vitest, CSS variables.

---

### Task 1: Data And Progression

**Files:**
- Modify: `src/data/levels.js`
- Modify: `src/core/gameEngine.js`
- Test: `tests/data/levels.test.js`
- Test: `tests/core/gameEngine.test.js`

- [ ] Write failing tests that require `INTRO_CARDS` with ids `P-I`, `C1-I`, `C2-I`, `C3-I`, `C4-I`, `C5-I`, `C6-I`, `E-I`.
- [ ] Update `orderedCardIds` so each intro appears before its chapter's first card, and `E-I` appears before `E-01`.
- [ ] Update `advanceAfterResult` so `chapterIntro`, `settlement`, and `ending` cards all use the static continue phase.
- [ ] Run `npm test -- tests/data/levels.test.js tests/core/gameEngine.test.js`.

### Task 2: Intro Rendering And Theme

**Files:**
- Modify: `src/ui/render.js`
- Modify: `src/styles.css`
- Test: `tests/ui/render.test.js`

- [ ] Write failing tests that render a chapter intro with subtitle, title, intro text, objective, custom button label, and CSS color variables.
- [ ] Add a dedicated `renderIntroCard` branch.
- [ ] Add `.chapter-intro-card`, `.intro-kicker`, `.intro-objective`, and themed button/border/background styles.
- [ ] Run `npm test -- tests/ui/render.test.js`.

### Task 3: Verification

**Files:**
- No new source files.

- [ ] Run `npm test`.
- [ ] Run `npm run build`.
- [ ] Verify a 390px browser screenshot of the first intro page and a later chapter intro page.
- [ ] Commit with `feat: add chapter intro pages`.
