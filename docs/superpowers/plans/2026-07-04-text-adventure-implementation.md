# Text Adventure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved mobile-first Vite static text adventure with a complete one-playthrough card flow, local save, conditional inserted cards, chapter settlements, and ending playback.

**Architecture:** Use plain Vite and vanilla JavaScript. Keep authored content in `src/data`, deterministic game rules in `src/core`, DOM rendering in `src/ui`, and app wiring in `src/main.js`. The game runs entirely in the browser and persists to `localStorage`.

**Tech Stack:** Vite, vanilla JavaScript modules, Vitest, jsdom, CSS, `localStorage`, GitHub Pages static output.

---

## File Structure

- Create `package.json`: npm scripts and dev dependencies.
- Create `index.html`: Vite entry document.
- Create `src/main.js`: app boot, event handlers, persistence calls.
- Create `src/styles.css`: mobile-first card layout.
- Create `src/data/statConfig.js`: long-term stat definitions, unlock order, hidden stat keys, status thresholds.
- Create `src/data/levels.js`: complete card data, settlements, ending pages, and inserted card definitions.
- Create `src/core/initialState.js`: initial persisted state factory.
- Create `src/core/stateWords.js`: numeric stat value to visible status word.
- Create `src/core/choiceRules.js`: disabled choice checks and visible result change selection.
- Create `src/core/gameEngine.js`: apply choices, advance cards, insert risk/remedy cards, calculate settlements and ending counters.
- Create `src/core/storage.js`: namespaced save/load/restart helpers.
- Create `src/ui/render.js`: render choice, result, settlement, and ending cards.
- Create `tests/core/stateWords.test.js`.
- Create `tests/core/gameEngine.test.js`.
- Create `tests/core/storage.test.js`.
- Create `tests/data/levels.test.js`.
- Create `tests/ui/render.test.js`.
- Create `docs/source/level-table.md`: versioned copy of the supplied level table for traceability.

## Task 1: Scaffold Vite App And Test Runner

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `src/main.js`
- Create: `src/styles.css`

- [ ] **Step 1: Create npm metadata and scripts**

Write `package.json`:

```json
{
  "name": "ordinary-life-text-adventure",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --host 127.0.0.1",
    "build": "vite build",
    "preview": "vite preview --host 127.0.0.1",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "devDependencies": {
    "jsdom": "^26.0.0",
    "vite": "^7.0.0",
    "vitest": "^3.2.0"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `npm install`

Expected: `package-lock.json` is created and npm exits with code 0.

- [ ] **Step 3: Create Vite HTML entry**

Write `index.html`:

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#f7f5f0" />
    <title>普通难度</title>
  </head>
  <body>
    <main id="app" class="app-shell" aria-live="polite"></main>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

- [ ] **Step 4: Create temporary app entry**

Write `src/main.js`:

```js
import "./styles.css";

const root = document.querySelector("#app");

root.innerHTML = `
  <section class="game-card">
    <p class="eyebrow">普通难度</p>
    <h1>普通生活</h1>
    <p class="scene-text">游戏正在加载。</p>
  </section>
`;
```

- [ ] **Step 5: Create baseline CSS**

Write `src/styles.css`:

```css
:root {
  color: #24211c;
  background: #f7f5f0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 16px;
  line-height: 1.5;
}

* {
  box-sizing: border-box;
}

body {
  min-width: 320px;
  min-height: 100vh;
  margin: 0;
  background: #f7f5f0;
}

button {
  font: inherit;
}

.app-shell {
  width: min(100%, 430px);
  min-height: 100vh;
  margin: 0 auto;
  padding: 20px 16px 28px;
  display: flex;
  align-items: center;
}

.game-card {
  width: 100%;
  border: 1px solid #ded8ce;
  border-radius: 8px;
  background: #fffdfa;
  padding: 22px;
  box-shadow: 0 18px 45px rgba(54, 45, 31, 0.08);
}

.eyebrow {
  margin: 0 0 8px;
  color: #756c5d;
  font-size: 0.82rem;
}

h1 {
  margin: 0 0 18px;
  font-size: 1.5rem;
  line-height: 1.25;
  letter-spacing: 0;
}

.scene-text {
  margin: 0;
  line-height: 1.85;
}
```

- [ ] **Step 6: Verify scaffold**

Run: `npm run build`

Expected: Vite builds successfully and prints `✓ built`.

- [ ] **Step 7: Commit scaffold**

Run:

```bash
git add package.json package-lock.json index.html src/main.js src/styles.css
git commit -m "chore: scaffold vite text adventure"
```

## Task 2: Define Stat Configuration And State Words

**Files:**
- Create: `src/data/statConfig.js`
- Create: `src/core/stateWords.js`
- Create: `tests/core/stateWords.test.js`

- [ ] **Step 1: Write failing state word tests**

Write `tests/core/stateWords.test.js`:

```js
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
```

- [ ] **Step 2: Run tests to verify failure**

Run: `npm test -- tests/core/stateWords.test.js`

Expected: FAIL because `src/core/stateWords.js` does not exist.

- [ ] **Step 3: Create stat config**

Write `src/data/statConfig.js`:

```js
export const STAT_KEYS = [
  "reputation",
  "money",
  "safety",
  "energy",
  "relationship",
  "self"
];

export const STAT_LABELS = {
  reputation: "信誉",
  money: "钱",
  safety: "安全感",
  energy: "精力",
  relationship: "关系",
  self: "自我"
};

export const CHAPTER_VISIBLE_STATS = {
  P: [],
  C1: ["reputation"],
  C2: ["reputation", "money"],
  C3: ["reputation", "money", "safety"],
  C4: ["reputation", "money", "safety", "energy"],
  C5: ["reputation", "money", "safety", "energy", "relationship"],
  C6: ["reputation", "money", "safety", "energy", "relationship", "self"],
  E: ["reputation", "money", "safety", "energy", "relationship", "self"]
};

export const HIDDEN_KEYS = [
  "time",
  "evidence",
  "exposure",
  "credit",
  "conflict",
  "enclosed"
];

export const STATE_WORDS = [
  { min: 3, word: "较高" },
  { min: 0, word: "稳定" },
  { min: -2, word: "紧张" },
  { min: Number.NEGATIVE_INFINITY, word: "危险" }
];
```

- [ ] **Step 4: Create state word helpers**

Write `src/core/stateWords.js`:

```js
import { STATE_WORDS, STAT_LABELS } from "../data/statConfig.js";

export function getStateWord(value) {
  return STATE_WORDS.find((entry) => value >= entry.min).word;
}

export function getVisibleStats(stats, visibleKeys) {
  return visibleKeys.map((key) => ({
    key,
    label: STAT_LABELS[key],
    word: getStateWord(stats[key] ?? 0),
    value: stats[key] ?? 0
  }));
}
```

- [ ] **Step 5: Verify tests pass**

Run: `npm test -- tests/core/stateWords.test.js`

Expected: PASS with 2 tests.

- [ ] **Step 6: Commit stat config**

Run:

```bash
git add src/data/statConfig.js src/core/stateWords.js tests/core/stateWords.test.js
git commit -m "feat: add stat visibility words"
```

## Task 3: Create Initial State And Data Integrity Checks

**Files:**
- Create: `src/core/initialState.js`
- Create: `docs/source/level-table.md`
- Create: `src/data/levels.js`
- Create: `tests/data/levels.test.js`

- [ ] **Step 1: Version the supplied level source**

Run:

```bash
mkdir -p docs/source
cp /Users/chengrui/.codex/attachments/ea799a14-a6be-4230-bcc3-07cdac3ef813/pasted-text.txt docs/source/level-table.md
```

Expected: `docs/source/level-table.md` contains the full supplied level table.

- [ ] **Step 2: Write failing level integrity tests**

Write `tests/data/levels.test.js`:

```js
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
```

- [ ] **Step 3: Run tests to verify failure**

Run: `npm test -- tests/data/levels.test.js`

Expected: FAIL because `src/data/levels.js` does not exist.

- [ ] **Step 4: Create initial state factory**

Write `src/core/initialState.js`:

```js
import { HIDDEN_KEYS, STAT_KEYS } from "../data/statConfig.js";

function zeroRecord(keys) {
  return Object.fromEntries(keys.map((key) => [key, 0]));
}

export function createInitialState() {
  return {
    phase: "choice",
    currentCardId: "P-01",
    pendingResult: null,
    stats: zeroRecord(STAT_KEYS),
    hidden: zeroRecord(HIDDEN_KEYS),
    tags: [],
    visibleStats: [],
    triggeredInserts: [],
    chapterOutcomes: {},
    counters: {
      adjustedExpression: 0,
      avoidedShortcut: 0,
      pretendedAccompanied: 0,
      savedEvidence: 0,
      laughedOffDiscomfort: 0,
      explainedIntent: 0,
      paidForSafety: 0,
      gaveUpForProof: 0,
      recognition: 0
    },
    history: []
  };
}
```

- [ ] **Step 5: Create complete level data module**

Write `src/data/levels.js` with these exports:

```js
export const LEVEL_CARDS = [
  {
    id: "P-01",
    type: "level",
    chapterId: "P",
    chapterTitle: "序章：出门",
    title: "镜子",
    scene: "今天有一场重要见面。你站在镜子前，想起有人曾说你“不够认真”，也有人说你“太用力”。你只剩十分钟。",
    choices: [
      {
        id: "formal",
        label: "更正式",
        result: "你看起来更像该被认真对待的人，也更容易被看见。",
        effects: { reputation: 1, energy: -1 },
        hiddenEffects: { exposure: 1 },
        tagsAdded: ["被注意"],
        visibleChanges: ["reputation", "energy"],
        track: {}
      },
      {
        id: "low-key",
        label: "更低调",
        result: "你让自己不那么显眼，心里也松了一点。",
        effects: { safety: 1, self: -1 },
        hiddenEffects: { exposure: -1 },
        tagsAdded: ["低存在感"],
        visibleChanges: ["safety", "self"],
        track: {}
      },
      {
        id: "comfortable",
        label: "穿得舒服",
        result: "你选择让身体先好过一点，评价会留到之后再来。",
        effects: { energy: 1, self: 1 },
        hiddenEffects: {},
        tagsAdded: ["自我优先"],
        visibleChanges: ["energy", "self"],
        track: {}
      }
    ]
  }
];

export const SETTLEMENT_CARDS = [];
export const ENDING_CARDS = [];
export const INSERT_CARDS = [];
export const orderedCardIds = [];

export function getCardById(id) {
  return [...LEVEL_CARDS, ...SETTLEMENT_CARDS, ...ENDING_CARDS, ...INSERT_CARDS].find(
    (card) => card.id === id
  );
}
```

Then expand the same file until it contains one object for each source row in `docs/source/level-table.md`.

Data entry rules:

- `LEVEL_CARDS` contains the 47 ordinary choice cards: prologue cards, chapter cards C1 through C6, including `C6-08`.
- `SETTLEMENT_CARDS` contains `C1-S` through `C6-S`.
- `ENDING_CARDS` contains `E-01` through `E-04`.
- `orderedCardIds` matches the exact `expectedOrderedIds` array from the test.
- Each ordinary card has 2 or 3 choices.
- Each choice uses concrete behavior labels from the source table.
- Each choice has concise result text. When rich result text is not yet written, use a card-specific structural sentence based on the action and scene rather than repeated generic text.
- Numeric effects from source abbreviations map as:
  - `信` -> `reputation`
  - `钱` -> `money`
  - `安` -> `safety`
  - `精` -> `energy`
  - `关` -> `relationship`
  - `自` -> `self`
  - `时` -> `time`
  - `证` -> `evidence`
  - `暴` -> `exposure`
  - `功` -> `credit`
  - `冲` -> `conflict`
- Non-core risk phrases from the source table go in `hiddenEffects` or `tagsAdded`.
- Choice counters go in `track`, using keys from `createInitialState().counters`.

Create at least this conditional inserted card:

```js
{
  id: "I-C3-footsteps",
  type: "level",
  chapterId: "C3",
  chapterTitle: "第三章：路上",
  title: "背后的脚步",
  scene: "那段路比你记得的更安静。身后的脚步声停一下，又重新跟上来。手机屏幕暗了下去。",
  insert: true,
  trigger: {
    afterCardId: "C3-04",
    tagsAll: ["低电量风险", "人少夜路"],
    hiddenMax: {},
    statMax: { safety: -2 }
  },
  choices: [
    {
      id: "call",
      label: "假装打电话",
      result: "你提高声音说自己快到了，脚步声慢了一点。",
      effects: { safety: 1, energy: -1 },
      hiddenEffects: {},
      tagsAdded: ["有人知道"],
      visibleChanges: ["safety", "energy"],
      track: { pretendedAccompanied: 1 }
    },
    {
      id: "bright-road",
      label: "走向亮处",
      result: "你多绕了一段路，终于看见便利店的灯。",
      effects: { safety: 1, energy: -1 },
      hiddenEffects: { time: -1 },
      tagsAdded: ["绕路"],
      visibleChanges: ["safety", "energy"],
      track: { avoidedShortcut: 1 }
    }
  ]
}
```

- [ ] **Step 6: Verify level integrity**

Run: `npm test -- tests/data/levels.test.js`

Expected: PASS with 5 tests.

- [ ] **Step 7: Commit data foundation**

Run:

```bash
git add docs/source/level-table.md src/core/initialState.js src/data/levels.js tests/data/levels.test.js
git commit -m "feat: add complete card data"
```

## Task 4: Implement Choice Application Rules

**Files:**
- Create: `src/core/choiceRules.js`
- Create: `src/core/gameEngine.js`
- Create: `tests/core/gameEngine.test.js`

- [ ] **Step 1: Write failing engine tests for applying choices**

Write `tests/core/gameEngine.test.js`:

```js
import { describe, expect, it } from "vitest";
import { createInitialState } from "../../src/core/initialState.js";
import { applyChoice } from "../../src/core/gameEngine.js";

describe("game engine choice application", () => {
  it("applies visible, hidden, tag, counter, and history changes", () => {
    const state = {
      ...createInitialState(),
      currentCardId: "C3-04",
      visibleStats: ["reputation", "money", "safety"]
    };

    const next = applyChoice(state, {
      id: "taxi",
      label: "打车",
      result: "你不用走夜路了，但余额又少了一截。",
      effects: { money: -2, safety: 1 },
      hiddenEffects: { enclosed: 1 },
      tagsAdded: ["平台行程"],
      visibleChanges: ["money", "safety"],
      track: { paidForSafety: 1 }
    });

    expect(next.phase).toBe("result");
    expect(next.stats.money).toBe(-2);
    expect(next.stats.safety).toBe(1);
    expect(next.hidden.enclosed).toBe(1);
    expect(next.tags).toContain("平台行程");
    expect(next.counters.paidForSafety).toBe(1);
    expect(next.pendingResult.visibleChanges).toEqual([
      { key: "money", label: "钱", delta: -2 },
      { key: "safety", label: "安全感", delta: 1 }
    ]);
    expect(next.history[0]).toMatchObject({
      cardId: "C3-04",
      choiceId: "taxi"
    });
  });

  it("hides unrevealed stat changes from result cards", () => {
    const state = {
      ...createInitialState(),
      currentCardId: "P-01",
      visibleStats: []
    };

    const next = applyChoice(state, {
      id: "formal",
      label: "更正式",
      result: "你看起来更像该被认真对待的人，也更容易被看见。",
      effects: { reputation: 1, energy: -1 },
      hiddenEffects: { exposure: 1 },
      tagsAdded: ["被注意"],
      visibleChanges: ["reputation", "energy"],
      track: {}
    });

    expect(next.pendingResult.visibleChanges).toEqual([]);
    expect(next.stats.reputation).toBe(1);
    expect(next.stats.energy).toBe(-1);
  });

  it("limits result display to two visible changes", () => {
    const state = {
      ...createInitialState(),
      currentCardId: "C6-08",
      visibleStats: ["reputation", "money", "safety", "energy", "relationship", "self"]
    };

    const next = applyChoice(state, {
      id: "appeal",
      label: "继续申诉",
      result: "流程延长，代价继续增加。",
      effects: { self: 1, energy: -2, money: -1 },
      hiddenEffects: {},
      tagsAdded: ["继续消耗"],
      visibleChanges: ["self", "energy", "money"],
      track: { explainedIntent: 1 }
    });

    expect(next.pendingResult.visibleChanges).toEqual([
      { key: "self", label: "自我", delta: 1 },
      { key: "energy", label: "精力", delta: -2 }
    ]);
  });
});
```

- [ ] **Step 2: Run tests to verify failure**

Run: `npm test -- tests/core/gameEngine.test.js`

Expected: FAIL because `src/core/gameEngine.js` does not exist.

- [ ] **Step 3: Create visible change helper**

Write `src/core/choiceRules.js`:

```js
import { STAT_LABELS } from "../data/statConfig.js";

export function selectVisibleChanges(choice, visibleStats) {
  const effects = choice.effects ?? {};
  const preferred = choice.visibleChanges ?? Object.keys(effects);

  return preferred
    .filter((key) => visibleStats.includes(key))
    .filter((key) => Number.isFinite(effects[key]) && effects[key] !== 0)
    .slice(0, 2)
    .map((key) => ({
      key,
      label: STAT_LABELS[key],
      delta: effects[key]
    }));
}

export function getDisabledReason(choice, state) {
  const requirements = choice.requirements;
  if (!requirements) return "";

  if (requirements.minStats) {
    for (const [key, min] of Object.entries(requirements.minStats)) {
      if ((state.stats[key] ?? 0) < min) {
        return requirements.reason ?? "条件不足";
      }
    }
  }

  if (requirements.tagsAll) {
    const missing = requirements.tagsAll.some((tag) => !state.tags.includes(tag));
    if (missing) return requirements.reason ?? "条件不足";
  }

  return "";
}
```

- [ ] **Step 4: Implement choice application**

Write the first version of `src/core/gameEngine.js`:

```js
import { CHAPTER_VISIBLE_STATS } from "../data/statConfig.js";
import { getCardById } from "../data/levels.js";
import { selectVisibleChanges } from "./choiceRules.js";

function addRecordValues(base, delta = {}) {
  const next = { ...base };
  for (const [key, value] of Object.entries(delta)) {
    next[key] = (next[key] ?? 0) + value;
  }
  return next;
}

function addCounters(base, delta = {}) {
  const next = { ...base };
  for (const [key, value] of Object.entries(delta)) {
    next[key] = (next[key] ?? 0) + value;
  }
  return next;
}

function addUniqueTags(tags, additions = []) {
  return [...new Set([...tags, ...additions])];
}

export function getVisibleStatsForCard(card) {
  return CHAPTER_VISIBLE_STATS[card.chapterId] ?? [];
}

export function applyChoice(state, choice) {
  const visibleStats = state.visibleStats ?? [];
  const card = getCardById(state.currentCardId);

  return {
    ...state,
    phase: "result",
    stats: addRecordValues(state.stats, choice.effects),
    hidden: addRecordValues(state.hidden, choice.hiddenEffects),
    tags: addUniqueTags(state.tags, choice.tagsAdded),
    counters: addCounters(state.counters, choice.track),
    pendingResult: {
      cardId: state.currentCardId,
      choiceId: choice.id,
      text: choice.result,
      visibleChanges: selectVisibleChanges(choice, visibleStats),
      visibleTags: choice.visibleTags ?? []
    },
    history: [
      ...state.history,
      {
        cardId: state.currentCardId,
        choiceId: choice.id,
        chapterId: card?.chapterId ?? ""
      }
    ]
  };
}
```

- [ ] **Step 5: Verify engine tests pass**

Run: `npm test -- tests/core/gameEngine.test.js`

Expected: PASS with 3 tests.

- [ ] **Step 6: Commit choice engine**

Run:

```bash
git add src/core/choiceRules.js src/core/gameEngine.js tests/core/gameEngine.test.js
git commit -m "feat: apply choice state changes"
```

## Task 5: Implement Progression And Conditional Inserts

**Files:**
- Modify: `src/core/gameEngine.js`
- Modify: `tests/core/gameEngine.test.js`

- [ ] **Step 1: Add failing progression tests**

First update the import from `../../src/core/gameEngine.js` at the top of `tests/core/gameEngine.test.js`:

```js
import { advanceAfterResult, applyChoice } from "../../src/core/gameEngine.js";
```

Then append to `tests/core/gameEngine.test.js`:

```js
describe("game engine progression", () => {
  it("advances from a result card to the next ordered card", () => {
    const state = {
      ...createInitialState(),
      phase: "result",
      currentCardId: "P-01",
      pendingResult: { text: "完成", visibleChanges: [], visibleTags: [] }
    };

    const next = advanceAfterResult(state);

    expect(next.phase).toBe("choice");
    expect(next.currentCardId).toBe("P-02");
    expect(next.pendingResult).toBe(null);
  });

  it("updates visible stats when entering a chapter", () => {
    const state = {
      ...createInitialState(),
      phase: "result",
      currentCardId: "P-04",
      pendingResult: { text: "完成", visibleChanges: [], visibleTags: [] }
    };

    const next = advanceAfterResult(state);

    expect(next.currentCardId).toBe("C1-01");
    expect(next.visibleStats).toEqual(["reputation"]);
  });

  it("inserts an eligible risk card before the next mainline card", () => {
    const state = {
      ...createInitialState(),
      phase: "result",
      currentCardId: "C3-04",
      visibleStats: ["reputation", "money", "safety"],
      stats: { ...createInitialState().stats, safety: -3 },
      tags: ["低电量风险", "人少夜路"],
      pendingResult: { text: "完成", visibleChanges: [], visibleTags: [] }
    };

    const next = advanceAfterResult(state);

    expect(next.currentCardId).toBe("I-C3-footsteps");
    expect(next.triggeredInserts).toContain("I-C3-footsteps");
  });

  it("continues from an inserted card back to the next mainline card", () => {
    const state = {
      ...createInitialState(),
      phase: "result",
      currentCardId: "I-C3-footsteps",
      visibleStats: ["reputation", "money", "safety"],
      triggeredInserts: ["I-C3-footsteps"],
      pendingResult: { text: "完成", visibleChanges: [], visibleTags: [] }
    };

    const next = advanceAfterResult(state);

    expect(next.currentCardId).toBe("C3-05");
  });
});
```

- [ ] **Step 2: Run tests to verify failure**

Run: `npm test -- tests/core/gameEngine.test.js`

Expected: FAIL because `advanceAfterResult` is not exported.

- [ ] **Step 3: Implement progression helpers**

Update `src/core/gameEngine.js` with these exports below `applyChoice`:

```js
import { INSERT_CARDS, orderedCardIds } from "../data/levels.js";

function nextOrderedId(currentCardId) {
  const index = orderedCardIds.indexOf(currentCardId);
  if (index === -1) return orderedCardIds[0];
  return orderedCardIds[index + 1] ?? currentCardId;
}

function nextIdAfterCurrent(state) {
  const currentCard = getCardById(state.currentCardId);
  if (currentCard?.insert && currentCard.trigger?.afterCardId) {
    return nextOrderedId(currentCard.trigger.afterCardId);
  }
  return nextOrderedId(state.currentCardId);
}

function matchesRecordMax(record, maxRules = {}) {
  return Object.entries(maxRules).every(([key, max]) => (record[key] ?? 0) <= max);
}

function matchesRecordMin(record, minRules = {}) {
  return Object.entries(minRules).every(([key, min]) => (record[key] ?? 0) >= min);
}

function matchesInsert(card, state) {
  const trigger = card.trigger ?? {};

  if (state.triggeredInserts.includes(card.id)) return false;
  if (trigger.afterCardId && trigger.afterCardId !== state.currentCardId) return false;
  if (trigger.tagsAll && !trigger.tagsAll.every((tag) => state.tags.includes(tag))) return false;
  if (!matchesRecordMax(state.stats, trigger.statMax)) return false;
  if (!matchesRecordMin(state.stats, trigger.statMin)) return false;
  if (!matchesRecordMax(state.hidden, trigger.hiddenMax)) return false;
  if (!matchesRecordMin(state.hidden, trigger.hiddenMin)) return false;

  return true;
}

function findInsert(state) {
  return INSERT_CARDS.find((card) => matchesInsert(card, state));
}

export function advanceAfterResult(state) {
  const inserted = findInsert(state);
  const nextId = inserted?.id ?? nextIdAfterCurrent(state);
  const nextCard = getCardById(nextId);

  return {
    ...state,
    phase: nextCard?.type === "settlement" ? "settlement" : nextCard?.type === "ending" ? "ending" : "choice",
    currentCardId: nextId,
    pendingResult: null,
    visibleStats: getVisibleStatsForCard(nextCard),
    triggeredInserts: inserted
      ? [...state.triggeredInserts, inserted.id]
      : state.triggeredInserts
  };
}
```

When editing imports, keep a single import from `../data/levels.js`:

```js
import { INSERT_CARDS, getCardById, orderedCardIds } from "../data/levels.js";
```

- [ ] **Step 4: Verify progression tests pass**

Run: `npm test -- tests/core/gameEngine.test.js`

Expected: PASS with progression tests included.

- [ ] **Step 5: Commit progression**

Run:

```bash
git add src/core/gameEngine.js tests/core/gameEngine.test.js
git commit -m "feat: advance cards with conditional inserts"
```

## Task 6: Implement Settlement And Ending Calculations

**Files:**
- Modify: `src/core/gameEngine.js`
- Modify: `tests/core/gameEngine.test.js`
- Modify: `src/data/levels.js`

- [ ] **Step 1: Add failing settlement and ending tests**

First update the import from `../../src/core/gameEngine.js` at the top of `tests/core/gameEngine.test.js`:

```js
import {
  advanceAfterResult,
  applyChoice,
  buildEndingStats,
  resolveChapterOutcome
} from "../../src/core/gameEngine.js";
```

Then append to `tests/core/gameEngine.test.js`:

```js
describe("settlements and ending statistics", () => {
  it("resolves chapter 6 partial recognition", () => {
    const state = {
      ...createInitialState(),
      stats: {
        ...createInitialState().stats,
        reputation: 3,
        self: 3,
        energy: 1,
        relationship: 1
      },
      hidden: { ...createInitialState().hidden, evidence: 3 },
      tags: ["正式记录"]
    };

    expect(resolveChapterOutcome("C6", state)).toEqual({
      id: "recognized",
      label: "问题被部分承认",
      counters: { recognition: 1 }
    });
  });

  it("resolves chapter 6 backlash before weak settlement", () => {
    const state = {
      ...createInitialState(),
      stats: {
        ...createInitialState().stats,
        reputation: -3,
        relationship: -3,
        self: 1
      },
      hidden: { ...createInitialState().hidden, evidence: -1 },
      tags: ["公开表达"]
    };

    expect(resolveChapterOutcome("C6", state)).toEqual({
      id: "backlash",
      label: "反噬",
      counters: { explainedIntent: 3 }
    });
  });

  it("builds ending statistics from counters", () => {
    const state = {
      ...createInitialState(),
      counters: {
        ...createInitialState().counters,
        adjustedExpression: 2,
        paidForSafety: 1,
        gaveUpForProof: 1
      }
    };

    expect(buildEndingStats(state)).toEqual([
      ["修改表达方式", 2],
      ["放弃近路", 0],
      ["假装有人同行", 0],
      ["保存证据", 0],
      ["笑着跳过不适", 0],
      ["解释自己没有恶意", 0],
      ["为了安全额外付费", 1],
      ["因为无法证明而放弃", 1]
    ]);
  });
});
```

- [ ] **Step 2: Run tests to verify failure**

Run: `npm test -- tests/core/gameEngine.test.js`

Expected: FAIL because `resolveChapterOutcome` and `buildEndingStats` are not exported.

- [ ] **Step 3: Implement outcome helpers**

Add to `src/core/gameEngine.js`:

```js
export function resolveChapterOutcome(chapterId, state) {
  if (chapterId !== "C6") {
    return { id: "continued", label: "生活继续", counters: {} };
  }

  const evidence = state.hidden.evidence ?? 0;
  const reputation = state.stats.reputation ?? 0;
  const self = state.stats.self ?? 0;
  const energy = state.stats.energy ?? 0;
  const relationship = state.stats.relationship ?? 0;
  const money = state.stats.money ?? 0;

  if (state.tags.includes("公开表达") && reputation <= -2 && evidence <= 0 && relationship <= -2) {
    return { id: "backlash", label: "反噬", counters: { explainedIntent: 3 } };
  }

  if (evidence >= 2 && reputation >= 2 && self >= 2) {
    return { id: "recognized", label: "问题被部分承认", counters: { recognition: 1 } };
  }

  if (state.tags.includes("退出成本") && (money >= -1 || self >= 2)) {
    return { id: "left", label: "退出环境", counters: { paidForSafety: 1 } };
  }

  if (evidence >= 1 && energy <= -1) {
    return { id: "recorded", label: "流程记录但处理有限", counters: {} };
  }

  if (energy <= -2 || relationship <= -2) {
    return { id: "stopped", label: "放弃处理", counters: { gaveUpForProof: 1 } };
  }

  return { id: "limited", label: "问题未闭合", counters: {} };
}

export function buildEndingStats(state) {
  return [
    ["修改表达方式", state.counters.adjustedExpression ?? 0],
    ["放弃近路", state.counters.avoidedShortcut ?? 0],
    ["假装有人同行", state.counters.pretendedAccompanied ?? 0],
    ["保存证据", state.counters.savedEvidence ?? 0],
    ["笑着跳过不适", state.counters.laughedOffDiscomfort ?? 0],
    ["解释自己没有恶意", state.counters.explainedIntent ?? 0],
    ["为了安全额外付费", state.counters.paidForSafety ?? 0],
    ["因为无法证明而放弃", state.counters.gaveUpForProof ?? 0]
  ];
}
```

- [ ] **Step 4: Make C6 settlement use the defined copy**

In `src/data/levels.js`, ensure `C6-S` contains:

```js
{
  id: "C6-S",
  type: "settlement",
  chapterId: "C6",
  chapterTitle: "第六章：窗口",
  title: "第六章结束：窗口",
  text: "你开始意识到：坚持不是一种态度。它需要钱、精力、关系、证据和被相信的机会。",
  reveal: "本章显化：自我"
}
```

- [ ] **Step 5: Verify settlement and ending tests pass**

Run: `npm test -- tests/core/gameEngine.test.js`

Expected: PASS with settlement and ending tests included.

- [ ] **Step 6: Commit outcomes**

Run:

```bash
git add src/core/gameEngine.js src/data/levels.js tests/core/gameEngine.test.js
git commit -m "feat: calculate settlements and ending stats"
```

## Task 7: Implement Local Storage Persistence

**Files:**
- Create: `src/core/storage.js`
- Create: `tests/core/storage.test.js`

- [ ] **Step 1: Write failing storage tests**

Write `tests/core/storage.test.js`:

```js
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
```

- [ ] **Step 2: Run tests to verify failure**

Run: `npm test -- --environment jsdom tests/core/storage.test.js`

Expected: FAIL because `src/core/storage.js` does not exist.

- [ ] **Step 3: Implement storage helpers**

Write `src/core/storage.js`:

```js
const SAVE_KEY = "ordinary-life-save-v1";

export function saveState(state) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

export function loadState() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || typeof parsed.currentCardId !== "string") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearSavedState() {
  localStorage.removeItem(SAVE_KEY);
}
```

- [ ] **Step 4: Verify storage tests pass**

Run: `npm test -- --environment jsdom tests/core/storage.test.js`

Expected: PASS with 3 tests.

- [ ] **Step 5: Commit storage**

Run:

```bash
git add src/core/storage.js tests/core/storage.test.js
git commit -m "feat: persist game state locally"
```

## Task 8: Render Cards With Vanilla DOM

**Files:**
- Create: `src/ui/render.js`
- Create: `tests/ui/render.test.js`

- [ ] **Step 1: Write failing render tests**

Write `tests/ui/render.test.js`:

```js
import { describe, expect, it, vi } from "vitest";
import { createInitialState } from "../../src/core/initialState.js";
import { renderGame } from "../../src/ui/render.js";

describe("renderGame", () => {
  it("renders a choice card with action buttons", () => {
    const root = document.createElement("main");
    const onChoose = vi.fn();

    renderGame(root, {
      state: {
        ...createInitialState(),
        phase: "choice",
        currentCardId: "C3-04",
        visibleStats: ["reputation", "money", "safety"]
      },
      onChoose,
      onContinue: vi.fn(),
      onRestart: vi.fn()
    });

    expect(root.textContent).toContain("第三章");
    expect(root.textContent).toContain("加班后的路线");
    expect(root.querySelectorAll("button.choice-button").length).toBeGreaterThanOrEqual(2);
  });

  it("renders result card with at most two changes", () => {
    const root = document.createElement("main");

    renderGame(root, {
      state: {
        ...createInitialState(),
        phase: "result",
        currentCardId: "C6-08",
        pendingResult: {
          text: "流程延长，代价继续增加。",
          visibleChanges: [
            { key: "self", label: "自我", delta: 1 },
            { key: "energy", label: "精力", delta: -2 }
          ],
          visibleTags: []
        }
      },
      onChoose: vi.fn(),
      onContinue: vi.fn(),
      onRestart: vi.fn()
    });

    expect(root.textContent).toContain("流程延长，代价继续增加。");
    expect(root.textContent).toContain("自我 +1");
    expect(root.textContent).toContain("精力 -2");
    expect(root.querySelectorAll(".change-line").length).toBe(2);
  });

  it("renders restart control", () => {
    const root = document.createElement("main");

    renderGame(root, {
      state: createInitialState(),
      onChoose: vi.fn(),
      onContinue: vi.fn(),
      onRestart: vi.fn()
    });

    expect(root.querySelector("button.restart-button")).not.toBe(null);
  });
});
```

- [ ] **Step 2: Run tests to verify failure**

Run: `npm test -- --environment jsdom tests/ui/render.test.js`

Expected: FAIL because `src/ui/render.js` does not exist.

- [ ] **Step 3: Implement renderer**

Write `src/ui/render.js`:

```js
import { getCardById } from "../data/levels.js";
import { getDisabledReason } from "../core/choiceRules.js";
import { getVisibleStats } from "../core/stateWords.js";

function escapeText(value) {
  const span = document.createElement("span");
  span.textContent = value;
  return span.innerHTML;
}

function formatDelta(delta) {
  return delta > 0 ? `+${delta}` : `${delta}`;
}

function renderStatStrip(state) {
  const visibleStats = getVisibleStats(state.stats, state.visibleStats);
  if (visibleStats.length === 0) return "";

  return `
    <dl class="stat-strip" aria-label="当前状态">
      ${visibleStats
        .map(
          (stat) => `
            <div class="stat-pill">
              <dt>${escapeText(stat.label)}</dt>
              <dd>${escapeText(stat.word)}</dd>
            </div>
          `
        )
        .join("")}
    </dl>
  `;
}

function renderHeader(card, state) {
  return `
    <header class="card-header">
      <div>
        <p class="eyebrow">${escapeText(card.chapterTitle ?? "普通难度")}</p>
        <h1>${escapeText(card.title ?? "普通生活")}</h1>
      </div>
      <button class="restart-button" type="button">重新开始</button>
    </header>
    ${renderStatStrip(state)}
  `;
}

function renderChoiceCard(root, card, state, onChoose) {
  root.innerHTML = `
    <section class="game-card">
      ${renderHeader(card, state)}
      <p class="scene-text">${escapeText(card.scene)}</p>
      <div class="choice-list">
        ${card.choices
          .map((choice) => {
            const reason = getDisabledReason(choice, state);
            return `
              <button class="choice-button" type="button" data-choice-id="${escapeText(choice.id)}" ${reason ? "disabled" : ""}>
                <span>${escapeText(choice.label)}</span>
                ${reason ? `<small>${escapeText(reason)}</small>` : ""}
              </button>
            `;
          })
          .join("")}
      </div>
    </section>
  `;

  for (const button of root.querySelectorAll(".choice-button")) {
    button.addEventListener("click", () => {
      const choice = card.choices.find((item) => item.id === button.dataset.choiceId);
      if (choice) onChoose(choice);
    });
  }
}

function renderResultCard(root, card, state, onContinue) {
  const result = state.pendingResult;
  root.innerHTML = `
    <section class="game-card">
      ${renderHeader(card, state)}
      <p class="result-text">${escapeText(result.text)}</p>
      <div class="change-list">
        ${(result.visibleChanges ?? [])
          .map(
            (change) => `
              <p class="change-line">${escapeText(change.label)} ${formatDelta(change.delta)}</p>
            `
          )
          .join("")}
        ${(result.visibleTags ?? [])
          .map((tag) => `<p class="tag-line">新增状态：${escapeText(tag)}</p>`)
          .join("")}
      </div>
      <button class="continue-button" type="button">继续</button>
    </section>
  `;

  root.querySelector(".continue-button").addEventListener("click", onContinue);
}

function renderStaticCard(root, card, state, onContinue) {
  root.innerHTML = `
    <section class="game-card">
      ${renderHeader(card, state)}
      <p class="scene-text">${escapeText(card.text)}</p>
      ${card.reveal ? `<p class="tag-line">${escapeText(card.reveal)}</p>` : ""}
      <button class="continue-button" type="button">继续</button>
    </section>
  `;

  root.querySelector(".continue-button").addEventListener("click", onContinue);
}

export function renderGame(root, { state, onChoose, onContinue, onRestart }) {
  const card = getCardById(state.currentCardId);

  if (!card) {
    root.innerHTML = `<section class="game-card"><p class="scene-text">没有找到当前卡片。</p></section>`;
    return;
  }

  if (state.phase === "result") {
    renderResultCard(root, card, state, onContinue);
  } else if (state.phase === "settlement" || state.phase === "ending") {
    renderStaticCard(root, card, state, onContinue);
  } else {
    renderChoiceCard(root, card, state, onChoose);
  }

  root.querySelector(".restart-button")?.addEventListener("click", onRestart);
}
```

- [ ] **Step 4: Verify render tests pass**

Run: `npm test -- --environment jsdom tests/ui/render.test.js`

Expected: PASS with 3 tests.

- [ ] **Step 5: Commit renderer**

Run:

```bash
git add src/ui/render.js tests/ui/render.test.js
git commit -m "feat: render mobile game cards"
```

## Task 9: Wire App Flow To Engine And Storage

**Files:**
- Modify: `src/main.js`
- Modify: `src/core/gameEngine.js`

- [ ] **Step 1: Add continue support for static cards**

Update `src/core/gameEngine.js` so `advanceAfterResult` can also advance from settlement and ending cards. Replace the first lines of `advanceAfterResult` with:

```js
export function advanceAfterResult(state) {
  const currentCard = getCardById(state.currentCardId);
  const shouldCheckInsert = state.phase === "result" && !currentCard?.insert;
  const inserted = shouldCheckInsert ? findInsert(state) : null;
  const nextId = inserted?.id ?? nextIdAfterCurrent(state);
  const nextCard = getCardById(nextId);
```

Leave the rest of the returned object from Task 5 in place.

- [ ] **Step 2: Wire browser app**

Replace `src/main.js` with:

```js
import "./styles.css";
import { createInitialState } from "./core/initialState.js";
import { advanceAfterResult, applyChoice } from "./core/gameEngine.js";
import { clearSavedState, loadState, saveState } from "./core/storage.js";
import { renderGame } from "./ui/render.js";

const root = document.querySelector("#app");

let state = loadState() ?? createInitialState();

function commitState(nextState) {
  state = nextState;
  saveState(state);
  render();
}

function handleChoose(choice) {
  commitState(applyChoice(state, choice));
}

function handleContinue() {
  commitState(advanceAfterResult(state));
}

function handleRestart() {
  clearSavedState();
  commitState(createInitialState());
}

function render() {
  renderGame(root, {
    state,
    onChoose: handleChoose,
    onContinue: handleContinue,
    onRestart: handleRestart
  });
}

render();
```

- [ ] **Step 3: Verify unit tests still pass**

Run: `npm test`

Expected: PASS for all Vitest suites.

- [ ] **Step 4: Verify production build**

Run: `npm run build`

Expected: Vite builds successfully and prints `✓ built`.

- [ ] **Step 5: Commit app wiring**

Run:

```bash
git add src/main.js src/core/gameEngine.js
git commit -m "feat: wire playable game flow"
```

## Task 10: Apply Mobile-First Visual Design

**Files:**
- Modify: `src/styles.css`

- [ ] **Step 1: Replace CSS with final mobile card layout**

Write `src/styles.css`:

```css
:root {
  color: #24211c;
  background: #f7f5f0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: 16px;
  line-height: 1.5;
}

* {
  box-sizing: border-box;
}

body {
  min-width: 320px;
  min-height: 100vh;
  margin: 0;
  background:
    linear-gradient(180deg, rgba(255, 253, 250, 0.85), rgba(247, 245, 240, 0.96)),
    #f7f5f0;
}

button {
  font: inherit;
}

.app-shell {
  width: min(100%, 430px);
  min-height: 100vh;
  margin: 0 auto;
  padding: 18px 14px 26px;
  display: flex;
  align-items: center;
}

.game-card {
  width: 100%;
  border: 1px solid #ded8ce;
  border-radius: 8px;
  background: #fffdfa;
  padding: 20px;
  box-shadow: 0 18px 45px rgba(54, 45, 31, 0.08);
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 16px;
}

.eyebrow {
  margin: 0 0 7px;
  color: #756c5d;
  font-size: 0.82rem;
}

h1 {
  margin: 0;
  font-size: 1.45rem;
  line-height: 1.25;
  letter-spacing: 0;
}

.restart-button {
  flex: 0 0 auto;
  border: 0;
  border-bottom: 1px solid #9b9489;
  border-radius: 0;
  background: transparent;
  color: #62594e;
  padding: 2px 0;
  font-size: 0.82rem;
}

.stat-strip {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(82px, 1fr));
  gap: 8px;
  margin: 0 0 18px;
}

.stat-pill {
  border: 1px solid #e5ded3;
  border-radius: 8px;
  padding: 8px 9px;
  background: #faf7f1;
}

.stat-pill dt {
  color: #756c5d;
  font-size: 0.75rem;
}

.stat-pill dd {
  margin: 3px 0 0;
  font-size: 0.92rem;
}

.scene-text,
.result-text {
  margin: 0;
  color: #2e2a24;
  font-size: 1.04rem;
  line-height: 1.9;
}

.choice-list {
  display: grid;
  gap: 10px;
  margin-top: 24px;
}

.choice-button,
.continue-button {
  width: 100%;
  min-height: 48px;
  border: 1px solid #cfc6b8;
  border-radius: 8px;
  background: #26231f;
  color: #fffdfa;
  padding: 12px 14px;
  text-align: left;
}

.choice-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.choice-button small {
  color: #8a8277;
  font-size: 0.78rem;
}

.choice-button:disabled {
  background: #efebe3;
  color: #8a8277;
}

.continue-button {
  margin-top: 24px;
  text-align: center;
}

.change-list {
  display: grid;
  gap: 8px;
  margin-top: 18px;
}

.change-line,
.tag-line {
  margin: 0;
  border-left: 3px solid #b9ad9d;
  padding: 8px 0 8px 12px;
  color: #4d463d;
  background: #faf7f1;
}

@media (max-width: 360px) {
  .app-shell {
    padding: 12px;
  }

  .game-card {
    padding: 17px;
  }

  h1 {
    font-size: 1.32rem;
  }
}
```

- [ ] **Step 2: Verify build after styling**

Run: `npm run build`

Expected: Vite builds successfully and prints `✓ built`.

- [ ] **Step 3: Commit styling**

Run:

```bash
git add src/styles.css
git commit -m "style: polish mobile card interface"
```

## Task 11: Manual Playthrough And Browser Verification

**Files:**
- Modify if defects are found: `src/data/levels.js`, `src/core/gameEngine.js`, `src/ui/render.js`, `src/styles.css`

- [ ] **Step 1: Start dev server**

Run: `npm run dev`

Expected: Vite prints a local URL, usually `http://127.0.0.1:5173/`.

- [ ] **Step 2: Verify complete run**

In the browser, play from `P-01` to `E-04`.

Expected:

- Every choice tap shows a result card before advancing.
- Result card shows no more than two visible stat changes.
- Hidden tags and hidden values do not appear as raw debug output.
- Chapter changes expose stats in this order: none, 信誉, 钱, 安全感, 精力, 关系, 自我, all.
- Chapter settlement cards appear at `C1-S` through `C6-S`.
- Ending cards appear in the order `E-01` through `E-04`.

- [ ] **Step 3: Verify save and restart**

In the browser:

1. Reach a mid-game card such as `C2-03`.
2. Refresh the page.
3. Confirm the same card or its result phase returns.
4. Click `重新开始`.
5. Confirm the game returns to `P-01`.

- [ ] **Step 4: Verify conditional insert**

Use choices that produce `低电量风险`, `人少夜路`, and low safety before continuing past `C3-04`.

Expected: `背后的脚步` appears before the next mainline card.

- [ ] **Step 5: Verify mobile viewport**

Open browser dev tools and test widths `360`, `390`, and `430`.

Expected:

- No horizontal scrolling.
- Buttons do not overlap.
- Long Chinese text wraps inside the card.
- Disabled choice reason text fits within the button.

- [ ] **Step 6: Stop dev server**

Stop the running `npm run dev` process with `Ctrl-C` in its terminal session.

- [ ] **Step 7: Commit manual verification fixes**

If any files changed during verification, run:

```bash
git add src/data/levels.js src/core/gameEngine.js src/ui/render.js src/styles.css
git commit -m "fix: address playthrough verification issues"
```

If no files changed, do not create an empty commit.

## Task 12: Final Verification

**Files:**
- No planned file changes.

- [ ] **Step 1: Run full tests**

Run: `npm test`

Expected: all tests pass.

- [ ] **Step 2: Run production build**

Run: `npm run build`

Expected: Vite builds successfully and prints `✓ built`.

- [ ] **Step 3: Check repository status**

Run: `git status --short`

Expected: no unstaged or uncommitted implementation changes.

- [ ] **Step 4: Summarize completion**

Report:

- Test command and pass result.
- Build command and pass result.
- Dev server URL used for manual verification.
- Any known content limitations, especially concise first-pass result copy.
