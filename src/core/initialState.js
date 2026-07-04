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
