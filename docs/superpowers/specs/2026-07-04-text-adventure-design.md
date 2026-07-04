# Mobile Text Adventure Design

Date: 2026-07-04

## Product Goal

Build a mobile-first static web text adventure for GitHub Pages. The first release covers one complete playthrough: prologue, six chapters, chapter settlements, and the ending sequence.

The game is about ordinary choices accumulating into a lived condition. It should not feel like a management game, a branching RPG, or a puzzle with correct answers. The core loop is:

> Read one card -> choose one action -> read one short result -> continue living.

## Core Interaction Principles

- One ordinary scene.
- Two or three reasonable choices.
- One understated consequence.
- One cost that can continue into later cards.
- No maps, inventory, quests, complex growth systems, or free exploration.

The interaction should be extremely simple so the pressure comes from repeated ordinary decisions, not from operating the interface.

## Technical Direction

Use a Vite static app. The app will deploy to GitHub Pages as built static assets.

The project should be organized into data, engine, and UI layers:

- `data/levels.js`: mainline cards, inserted risk/remedy cards, chapter settlements, ending pages.
- `core/gameEngine.js`: progression, state mutation, conditional inserts, unavailable choice checks, chapter settlement selection, ending statistics.
- `ui/`: card rendering for choice cards, result cards, chapter settlements, and ending cards.

This gives enough structure for a complete one-playthrough game while keeping deployment simple.

## First Release Scope

The first release uses the supplied full level table as the main content source.

Target mainline scale:

- Prologue: 4 cards.
- Chapter 1 to Chapter 5: 7 cards each.
- Chapter 6: 8 cards.
- Ending: 4 to 5 reveal cards.

This is roughly 51 main cards, before conditional inserts. Each ordinary card takes two taps: one choice and one continue. A full run should be around 100 taps, which is acceptable on mobile if each card stays short.

Result copy may use short structural text in the first implementation. The data model must leave clear fields for later replacement with fully written 20-50 character consequence copy.

## Page Structure

The app has one primary mobile screen:

- Top: chapter name and current card name.
- Middle: scene text.
- Bottom: two or three action buttons.

The same screen alternates between four card modes:

- Choice card.
- Result card.
- Chapter settlement card.
- Ending reveal card.

No landing page is needed. The first screen should enter the game directly, with a minimal continuation path if saved progress exists.

The lightweight menu only includes:

- Continue game.
- Restart.

Do not add a separate "revealed stat explanation" view in the first release. Stat meaning should emerge through chapter unlock text and the ending.

## Choice Card

A choice card shows:

- Chapter title.
- Card title.
- Scene text, 40-90 Chinese characters when possible.
- Two or three concrete behavior buttons.

Buttons should name actions, not values.

Use:

- `走大路`
- `打车`
- `给朋友打电话`

Avoid:

- `增加安全`
- `消耗关系`
- `提高信誉`

If a choice is unavailable, keep it visible but disabled and show a short reason such as `余额不足` or `关系紧张`. This is important: the player should feel that some options are unavailable because of accumulated conditions, not because they forgot a mechanic.

## Result Card

After a choice, do not advance immediately. Show a short result card with:

- One sentence of immediate consequence.
- At most one or two visible stat changes.
- One important new status only when it matters.
- One `继续` button.

The result card must not display a full internal ledger. Hidden values, hidden tags, event pool changes, and unrevealed long-term stats are recorded in state but not shown directly.

Example for a choice with richer internal effects:

Internal state changes:

- Money -2.
- Safety +1.
- Closed-space risk +1.
- Tag: platform trip.

Visible result:

```text
你不用走夜路了，但余额又少了一截。

钱 -2
安全感 +1

[继续]
```

If more than two revealed stats changed, the UI chooses the two highest-priority visible changes for that card. The remaining changes are kept for later status words, chapter settlement, and ending statistics.

## Long-Term Stats

There are six long-term stats. They exist from the start but become visible gradually. A chapter's focused stat becomes visible when that chapter begins; the chapter settlement then names and explains what became visible during that chapter.

| Visibility begins | Visible stat | Meaning | Gameplay role |
| --- | --- | --- | --- |
| Chapter 1 `筛选` | 信誉 | Whether others read the player as reliable, suitable, and believable | Interviews, probation, workplace evaluation, complaint credibility |
| Chapter 2 `房间` | 钱 | Economic buffer | Housing, safer transport, complaints, refusing low-quality opportunities |
| Chapter 3 `路上` | 安全感 | Basic trust in space and bodily situation | Night routes, taxis, elevators, strangers approaching |
| Chapter 4 `桌面` | 精力 | Capacity to speak clearly, keep working, and handle conflict | Meetings, overtime, explanation, review, asking for help |
| Chapter 5 `靠近` | 关系 | Available interpersonal support | Accompaniment, witnesses, temporary housing, emotional support, crisis remedies |
| Chapter 6 `窗口` | 自我 | Capacity to refuse, persist, appeal, and leave | Boundaries, institutional handling, public expression, ending evaluation |

Stats should not appear as percentages or meters. Use state words:

- `较高`
- `稳定`
- `紧张`
- `危险`

The UI may show compact labels such as:

```text
信誉：稳定
钱：紧张
安全感：危险
```

Only visible stats are shown. Visible means revealed to the player, not newly created. All six stats can change from the prologue onward.

## Hidden Values And Tags

The engine records auxiliary values and tags in addition to the six long-term stats.

Examples of hidden values:

- Time pressure.
- Evidence.
- Exposure or gaze risk.
- Credit visibility.
- Conflict risk.
- Closed-space risk.

Examples of tags:

- `低电量风险`
- `人少夜路`
- `有人知道`
- `低薪入职`
- `功劳不清`
- `问题未闭合`

Most hidden tags are not shown when acquired. They should be felt later through unavailable choices, inserted risk cards, low-quality chapter settlements, or ending statistics.

## Data Model

Main card shape:

```js
{
  id: "C3-04",
  type: "level",
  chapterId: "C3",
  chapterTitle: "第三章：路上",
  title: "加班后的路线",
  scene: "晚上十点，地铁口到家有两条路。近路人少，大路绕远。打车价格翻倍。",
  choices: [
    {
      id: "shortcut",
      label: "走近路",
      result: "你节省了时间，也更快进入那段安静的路。",
      effects: { safety: -1 },
      hiddenEffects: { exposure: 1, time: 1 },
      tagsAdded: ["人少夜路"],
      visibleChanges: ["safety"],
      statsForPriority: ["safety"]
    }
  ]
}
```

Choice fields:

- `label`: player-facing action text.
- `result`: short result copy.
- `effects`: six long-term stat changes.
- `hiddenEffects`: auxiliary stat changes.
- `tagsAdded`: tags recorded after choice.
- `visibleChanges`: changes allowed to appear on the result card if already unlocked.
- `requirements`: optional rules for disabled choices.
- `track`: optional behavior counters for ending statistics.

The implementation can start with concise result text, but every choice should have a `result` field from the beginning.

## Game State

Persisted state includes:

- Current card id.
- Current UI phase: `choice`, `result`, `settlement`, or `ending`.
- Last selected choice and pending result display.
- Six long-term stats.
- Hidden auxiliary stats.
- Tags.
- Unlocked stat keys.
- Triggered inserted card ids.
- Chapter outcomes.
- Behavior counters for the ending.

Use `localStorage` for automatic save and resume. Restart clears the stored state and starts a fresh run.

## Progression Model

Use linear mainline plus conditional inserted cards.

The engine follows this sequence:

1. Show current mainline or inserted card.
2. Player chooses.
3. Apply all visible and hidden state changes.
4. Show result card.
5. On continue, check whether a conditional inserted card should appear before the next mainline card.
6. If no insert is eligible, advance to the next mainline card or chapter settlement.

Inserted cards use the same choice and result UI as ordinary cards. They are not special screens.

Insert conditions may check:

- Long-term stat thresholds.
- Hidden value thresholds.
- Tag combinations.
- Current chapter and card position.
- Whether this inserted card has already appeared.

Inserted cards should not repeat in the same run unless explicitly designed to do so.

## Failure And Low-Quality Outcomes

Most failure states are not Game Over screens. Use three feedback patterns:

1. Light cost and continue.
2. Remedy card inserted into the flow.
3. Low-quality chapter settlement.

Rare severe outcomes may return the player to a chapter key point, but the copy must avoid blaming the player.

Example tone:

```text
这一次，你没能继续完成本章。

你选择的每一步都不是错误。
只是时间、空间、电量、距离和无人知晓，叠在了一起。

[从本章关键节点重新开始]
```

## Chapter Settlements

Each chapter ends with a short settlement card:

- Chapter ending title.
- One or two sentences of summary.
- Important statuses gained.
- The long-term stat that became visible during that chapter.
- Continue button.

Settlements should show that previous cards were not isolated. They should remain short and avoid complex reports.

Example:

```text
第一章结束：筛选

你获得了一个位置。
它可以让你留下来，但不是没有条件。

本章结果：
低薪入职
试用期压力

本章显化：信誉

[继续]
```

## Chapter 6 Result And Settlement

Chapter 6 card 8, `处理结果`, is a defined ending-of-chapter card:

Scene:

```text
系统给出结果：证据不足，但会提醒相关人员注意。你不能说它完全没用，也不能说它解决了什么。
```

Choices:

- `接受结果`
  - Result: `生活恢复表面稳定。`
  - Effects: energy +1, self -1.
  - Tag: `问题未闭合`.
- `继续申诉`
  - Result: `流程延长，代价继续增加。`
  - Effects: self +1, energy -2, money -1.
  - Tag: `继续消耗`.
- `离开环境`
  - Result: `你切断了部分风险，也失去一部分积累。`
  - Effects: safety +1, money -2, reputation reset or transferred.
  - Tag: `退出成本`.

The result UI still displays at most two visible changes. For `继续申诉`, prefer `自我 +1` and `精力 -2`; the money cost remains in state and can affect later status and ending statistics.

Chapter 6 settlement outcomes:

| Outcome | Condition | Ending impact |
| --- | --- | --- |
| 问题被部分承认 | Evidence, reputation, and self are relatively high | Ending statistic: recognition count +1 |
| 流程记录但处理有限 | Evidence medium, energy insufficient | Ending says the problem was recorded and life continued |
| 放弃处理 | Energy or relationship too low | Ending says the player stopped because they could not keep spending |
| 反噬 | Public expression with low reputation, weak evidence, and low relationship | Ending increases explanation count sharply |
| 退出环境 | Money enough or self high | Ending says the player left, but not without cost |

Chapter 6 settlement text for self:

```text
你开始意识到：坚持不是一种态度。
它需要钱、精力、关系、证据和被相信的机会。

本章显化：自我。
```

## Ending

The ending is `普通难度`. It is mostly system playback, not a choice-heavy chapter.

It should do three things:

1. Turn previous choices into statistics.
2. Generate a character profile.
3. Reveal the theme that womanhood is a condition.

Ending screens should reveal gradually.

### Ending Screen 1: Full Visible Stats

Show all six stats and the explanation for each:

| Stat | Ending explanation |
| --- | --- |
| 信誉 | 你有多少次被解释成可靠的人 |
| 钱 | 你有多少次能用资源购买安全和退出 |
| 安全感 | 你有多少空间可以不计算风险 |
| 精力 | 你有多少力气把事情说清楚 |
| 关系 | 你有多少次可以不独自面对 |
| 自我 | 你有多少次还能说“不” |

### Ending Screen 2: Behavior Statistics

Use counters from the player's actual run. The example set is:

```text
你在本次流程中：

修改表达方式：19次。
放弃近路：6次。
假装有人同行：4次。
保存证据：11次。
笑着跳过不适：8次。
解释自己没有恶意：13次。
为了安全额外付费：7次。
因为无法证明而放弃：3次。
```

The numbers should come from tracked behaviors where possible. If a first implementation has incomplete counters, derive them from tags and choice ids rather than hardcoding the example.

### Ending Screen 3: Character Profile

Reveal ordinary profile fields:

```text
年龄：27。
职业：普通职员。
城市：普通城市。
收入：普通。
家庭：普通。
关系状态：普通。
性别：女。
难度：普通。
```

The `性别：女` line should be positioned as a late reveal within this profile sequence.

### Ending Screen 4: Theme

Final text:

```text
你没有进入战场。
没有遭遇末日。
没有被命运特别选中。
你只是完成了一段普通生活。

女性不是一种性格。
女性是一种处境。
当一个人长期处在需要被评价、被相信、被允许、被保护、被解释的位置，他就会学会谨慎、计算、讨好、沉默、留证和提前道歉。
这不是因为她天生如此。
是因为世界经常这样要求她。
```

Keep this as the final reveal. Do not front-load this explanation earlier in the game.

## Visual Direction

Use a restrained card-based mobile layout:

- Light background.
- One main card.
- Clear text hierarchy.
- Minimal borders and spacing.
- No illustrated map, decorative dashboard, or complex HUD.

Text is the primary content. The UI should stay quiet and legible.

Desktop should center the same mobile reading width rather than expanding into a wide dashboard.

## Mobile Constraints

Optimize for 360-430px wide portrait screens.

Text limits:

- Scene: 40-90 Chinese characters.
- Result: 20-50 Chinese characters.
- Choice label: preferably under 12 Chinese characters.

Buttons must not overlap, resize unpredictably, or require horizontal scrolling. Result cards and settlement cards must fit comfortably in a mobile scroll view.

## Verification Requirements

Before calling the implementation complete, verify:

- A fresh run can proceed from the prologue to the ending.
- Refresh resumes from the saved state.
- Restart clears saved progress.
- At least one conditional inserted card can be triggered.
- Chapters expose stats in the correct order.
- Result cards display no more than two stat changes.
- Hidden tags and hidden values are not exposed in ordinary results.
- Disabled choices show short reasons.
- Ending statistics change based on player choices.
- Mobile viewport has no horizontal scrolling, button overlap, or text overflow.

## Out Of Scope For First Release

- Free exploration.
- Maps.
- Inventory or backpack.
- Task lists.
- Complex character building.
- Full content polish for every result sentence.
- Server-side persistence.
- User accounts.
- Analytics.
