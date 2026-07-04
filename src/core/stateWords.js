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
