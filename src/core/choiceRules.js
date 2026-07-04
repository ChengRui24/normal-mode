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
