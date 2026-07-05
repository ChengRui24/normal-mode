import { REQUIREMENT_REASON_MAP } from "../data/textConfig.js";

export function getDisabledReason(choice, state) {
  const requirements = choice.requirements;
  if (!requirements) return "";

  if (requirements.minStats) {
    for (const [key, min] of Object.entries(requirements.minStats)) {
      if ((state.stats[key] ?? 0) < min) {
        return requirements.reason ?? REQUIREMENT_REASON_MAP[key] ?? "条件不足";
      }
    }
  }

  if (requirements.tagsAll) {
    const missing = requirements.tagsAll.some((tag) => !state.tags.includes(tag));
    if (missing) return requirements.reason ?? "条件不足";
  }

  return "";
}
