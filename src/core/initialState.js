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
