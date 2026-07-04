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
    triggeredInserts: inserted ? [...state.triggeredInserts, inserted.id] : state.triggeredInserts
  };
}
