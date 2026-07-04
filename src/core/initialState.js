import { HIDDEN_KEYS, INITIAL_STATS, STAT_KEYS } from "../data/statConfig.js";

function zeroRecord(keys) {
  return Object.fromEntries(keys.map((key) => [key, 0]));
}

export function createInitialState() {
  return {
    phase: "intro",
    currentCardId: "P-I",
    pendingResult: null,
    stats: { ...INITIAL_STATS },
    hidden: zeroRecord(HIDDEN_KEYS),
    tags: [],
    visibleStats: [],
    triggeredInserts: [],
    triggeredCrises: [],
    returnCardId: null,
    chapterOutcomes: {},
    counters: {
      detour: 0,
      seekHelp: 0,
      explain: 0,
      silence: 0,
      concede: 0,
      clearRefusal: 0,
      evidenceSaved: 0,
      paidSafety: 0
    },
    history: []
  };
}
