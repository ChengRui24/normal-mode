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
