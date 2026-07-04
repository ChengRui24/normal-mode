import { CHAPTER_VISIBLE_STATS } from "../data/statConfig.js";
import { INSERT_CARDS, getCardById, orderedCardIds } from "../data/levels.js";
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
  return CHAPTER_VISIBLE_STATS[card?.chapterId] ?? [];
}

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

function nextOrderedId(currentCardId) {
  const index = orderedCardIds.indexOf(currentCardId);
  if (index === -1) {
    throw new Error(`Unknown card id: ${currentCardId}`);
  }
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
    triggeredInserts: inserted ? [...state.triggeredInserts, inserted.id] : state.triggeredInserts
  };
}
