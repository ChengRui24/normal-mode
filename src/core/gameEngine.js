import {
  CHAPTER_VISIBLE_STATS,
  DANGER_MAX,
  INITIAL_STATS,
  STATE_WORDS,
  STAT_KEYS,
  STAT_LABELS,
  STAT_MAX,
  STAT_MIN
} from "../data/statConfig.js";
import { CRISIS_CARDS, INSERT_CARDS, getCardById, orderedCardIds } from "../data/levels.js";
import { selectVisibleChanges } from "./choiceRules.js";

function addRecordValues(base, delta = {}) {
  const next = { ...base };
  for (const [key, value] of Object.entries(delta)) {
    next[key] = (next[key] ?? 0) + value;
  }
  return next;
}

function clampStat(value) {
  return Math.min(STAT_MAX, Math.max(STAT_MIN, value));
}

function addStatValues(base, delta = {}) {
  const next = { ...base };
  for (const [key, value] of Object.entries(delta)) {
    next[key] = clampStat((next[key] ?? 0) + value);
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

  if (state.tags.includes("public_post") && evidence <= 1 && relationship <= 3) {
    return { id: "backlash", label: "反噬", counters: { explain: 3 } };
  }

  if (evidence >= 3 && reputation >= 5 && self >= 5) {
    return { id: "recognized", label: "问题被部分承认", counters: {} };
  }

  if (state.tags.includes("exit_cost")) {
    return { id: "left", label: "退出环境", counters: {} };
  }

  if (evidence >= 1 && energy <= 3) {
    return { id: "recorded", label: "流程记录但处理有限", counters: {} };
  }

  if (energy <= 2 || relationship <= 2) {
    return { id: "stopped", label: "放弃处理", counters: {} };
  }

  return { id: "limited", label: "问题未闭合", counters: {} };
}

export function buildEndingStats(state) {
  return [
    ["放弃近路", state.counters.detour ?? 0],
    ["解释自己", state.counters.explain ?? 0],
    ["保存证据", state.counters.evidenceSaved ?? 0],
    ["把话收回去", state.counters.silence ?? 0],
    ["为安全额外付费", state.counters.paidSafety ?? 0],
    ["暂时退让", state.counters.concede ?? 0],
    ["让别人知道", state.counters.seekHelp ?? 0],
    ["明确拒绝", state.counters.clearRefusal ?? 0]
  ];
}

function getStateWord(value) {
  return STATE_WORDS.find((entry) => value >= entry.min).word;
}

const ENDING_STAT_TEXT = {
  reputation: "你有多少次被解释成可靠的人",
  money: "你有多少次能用资源购买安全和退出",
  safety: "你有多少空间可以不计算风险",
  energy: "你有多少力气把事情说清楚",
  relationship: "你有多少次可以不独自面对",
  self: "你有多少次还能说“不”"
};

const DANGER_STAT_TEXT = {
  reputation: "你说过很多话，但并不是每一次都被当作事实。",
  money: "很多选择不是你不想选，而是在出现前就被余额拿走了。",
  safety: "你没有一直遇到危险，但你一直在为危险做准备。",
  energy: "你还能继续生活，只是不再总有力气解释。",
  relationship: "很多时候，你不是独立，而是没有人可以低成本地麻烦。",
  self: "你不是没有边界，只是边界每次都需要力气。"
};

export function buildEndingStatusLines(state) {
  return STAT_KEYS.map((key) => {
    const value = state.stats[key] ?? 0;
    const word = getStateWord(value);
    const text = value <= DANGER_MAX ? DANGER_STAT_TEXT[key] : ENDING_STAT_TEXT[key];
    return `${STAT_LABELS[key]}：${word}。${text}`;
  });
}

export function resolvePassStyle(state) {
  const dangerous = STAT_KEYS.filter((key) => (state.stats[key] ?? STAT_MAX) <= DANGER_MAX);
  const counters = state.counters ?? {};
  const tags = state.tags ?? [];
  const routeStrategyCount = (counters.detour ?? 0) + (counters.paidSafety ?? 0) + (counters.seekHelp ?? 0);

  if (dangerous.length >= 3) {
    return {
      id: "struggling",
      label: "勉强通关",
      text: "你走到了这里。不是因为每一步都可承受，而是因为生活经常要求人在不可承受时继续。"
    };
  }

  if ((state.stats.safety ?? STAT_MAX) <= DANGER_MAX || routeStrategyCount >= 5) {
    return {
      id: "high-alert",
      label: "高警觉通关",
      text: "你学会了提前判断路线、距离、灯光、出口和身后的人。你没有总是遇到危险，但你总是在准备。"
    };
  }

  if (((state.stats.energy ?? STAT_MAX) <= DANGER_MAX && (state.stats.reputation ?? 0) >= 6) || tags.includes("default_filler") || tags.includes("invisible_labor")) {
    return {
      id: "overworked",
      label: "过劳通关",
      text: "你完成了很多事。它们让你留下来，也把你一点点耗空。"
    };
  }

  if ((state.stats.relationship ?? STAT_MAX) <= DANGER_MAX && (counters.seekHelp ?? 0) <= 1) {
    return {
      id: "isolated",
      label: "孤立通关",
      text: "你尽量不麻烦别人。于是很多判断、恐惧和补救，都由你一个人完成。"
    };
  }

  if ((state.stats.reputation ?? 0) >= 8 && (state.stats.self ?? STAT_MAX) <= 3 && ((counters.silence ?? 0) + (counters.concede ?? 0)) >= 2) {
    return {
      id: "low-conflict",
      label: "低冲突通关",
      text: "你尽量不让场面变难看。很多事情因此顺利过去，也有很多事情没有真正被处理。"
    };
  }

  if ((state.stats.self ?? 0) >= 8 && (state.stats.energy ?? STAT_MAX) <= 4 && ((counters.explain ?? 0) + (counters.evidenceSaved ?? 0)) >= 3) {
    return {
      id: "appeal",
      label: "申诉通关",
      text: "你坚持把事情说清楚。你得到了一部分记录，也支付了很多继续说下去的成本。"
    };
  }

  if (tags.includes("exit_cost")) {
    return {
      id: "exited",
      label: "退出通关",
      text: "你切断了一部分风险。离开不是失败，但它让你重新承担开始的成本。"
    };
  }

  return {
    id: "stable",
    label: "稳定通关",
    text: "你避开了最坏的结果，也没有真正轻松。系统称之为稳定。"
  };
}

export function buildCostLines(state) {
  const lines = [];
  if ((state.stats.money ?? 0) <= INITIAL_STATS.money - 2) {
    lines.push("很多选择不是你不想选，而是在出现前就被余额拿走了。");
  }
  if ((state.stats.safety ?? 0) <= INITIAL_STATS.safety - 2) {
    lines.push("你没有一直遇到危险，但你一直在为危险做准备。");
  }
  if ((state.stats.energy ?? 0) <= INITIAL_STATS.energy - 2) {
    lines.push("你还能继续生活，只是不再总有力气解释。");
  }
  if ((state.stats.self ?? 0) <= INITIAL_STATS.self - 2) {
    lines.push("你不是没有边界，只是边界每次都需要力气。");
  }
  if ((state.stats.relationship ?? 0) <= INITIAL_STATS.relationship - 2) {
    lines.push("你不是没有人，只是求助也有成本。");
  }
  if ((state.stats.reputation ?? 0) <= INITIAL_STATS.reputation - 2) {
    lines.push("有些评价没有被说出口，但它们改变了后面的门槛。");
  }
  return lines.length > 0 ? lines : ["你避开了最坏的结果，也没有真正轻松。"];
}

export function getEndingDisplay(card, state) {
  if (card.id === "E-02") {
    return { ...card, lines: buildEndingStatusLines(state) };
  }
  if (card.id === "E-03") {
    return { ...card, lines: buildEndingStats(state).map(([label, value]) => `${label}：${value} 次。`).filter((line) => !line.includes("：0 次")) };
  }
  if (card.id === "E-04") {
    const style = resolvePassStyle(state);
    return { ...card, lines: [`通关方式：${style.label}。`, style.text] };
  }
  if (card.id === "E-05") {
    return { ...card, lines: buildCostLines(state) };
  }
  return { ...card, lines: [] };
}

export function applyChoice(state, choice) {
  const visibleStats = state.visibleStats ?? [];
  const card = getCardById(state.currentCardId);

  return {
    ...state,
    phase: "result",
    stats: addStatValues(state.stats, choice.effects),
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
  if (currentCard?.crisis && state.returnCardId) {
    return state.returnCardId;
  }
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

function findCrisis(state) {
  const triggered = state.triggeredCrises ?? [];
  const stat = STAT_KEYS.find((key) => (state.stats[key] ?? STAT_MAX) <= DANGER_MAX && !triggered.includes(key));
  if (!stat) return null;
  return CRISIS_CARDS.find((card) => card.stat === stat) ?? null;
}

function phaseForCard(card) {
  if (card?.type === "chapterIntro") return "intro";
  if (card?.type === "settlement") return "settlement";
  if (card?.type === "ending") return "ending";
  return "choice";
}

export function advanceAfterResult(state) {
  const currentCard = getCardById(state.currentCardId);
  const shouldCheckInsert = state.phase === "result" && !currentCard?.insert;
  const inserted = shouldCheckInsert ? findInsert(state) : null;
  const mainlineNextId = inserted?.id ?? nextIdAfterCurrent(state);
  const crisis = !inserted && state.phase === "result" && !currentCard?.crisis ? findCrisis(state) : null;
  const nextId = crisis?.id ?? mainlineNextId;
  const nextCard = getCardById(nextId);

  return {
    ...state,
    phase: phaseForCard(nextCard),
    currentCardId: nextId,
    pendingResult: null,
    visibleStats: crisis ? state.visibleStats : getVisibleStatsForCard(nextCard),
    triggeredInserts: inserted ? [...state.triggeredInserts, inserted.id] : state.triggeredInserts,
    triggeredCrises: crisis ? [...(state.triggeredCrises ?? []), crisis.stat] : state.triggeredCrises ?? [],
    returnCardId: crisis ? mainlineNextId : currentCard?.crisis ? null : state.returnCardId ?? null
  };
}
