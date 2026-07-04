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
  reputation: {
    较高: "你比较容易被当作可靠的人。很多门槛因此低了一些。",
    稳定: "大多数时候，你的话能被正常接住。",
    紧张: "你开始需要比别人多解释一点。",
    危险: "你说过很多话，但并不是每一次都被当作事实。"
  },
  money: {
    较高: "你还有一点选择余地，可以用钱换时间、安全或离开。",
    稳定: "余额还能支撑基本选择。",
    紧张: "很多选择开始变贵，也变窄。",
    危险: "很多选择不是你不想选，而是在出现前就被余额拿走了。"
  },
  safety: {
    较高: "你还能在一些空间里放松下来。",
    稳定: "你会计算，但不至于一直紧绷。",
    紧张: "你开始频繁确认路线、门口、车牌和身后。",
    危险: "你没有一直遇到危险，但你一直在为危险做准备。"
  },
  energy: {
    较高: "你还有力气解释、整理和补救。",
    稳定: "你能继续处理多数事情。",
    紧张: "你开始压缩表达，只处理最急的部分。",
    危险: "你还能继续生活，只是不再总有力气解释。"
  },
  relationship: {
    较高: "你不是每次都要独自面对。",
    稳定: "有些人可以被你想起，也可以被你联系。",
    紧张: "求助开始变得需要斟酌。",
    危险: "很多时候，你不是独立，而是没有人可以低成本地麻烦。"
  },
  self: {
    较高: "你还能比较清楚地说“不”。",
    稳定: "你知道自己的边界在哪里。",
    紧张: "你知道边界，但说出来越来越费力。",
    危险: "你不是没有边界，只是边界每次都需要力气。"
  }
};

const CHAPTER_OUTCOME_LINES = {
  recognized: "处理结果：问题被部分承认。",
  recorded: "处理结果：问题已记录，生活继续。",
  stopped: "处理结果：因无法继续消耗而停止。",
  backlash: "处理结果：解释次数继续增加。",
  left: "处理结果：你离开了，但不是没有代价。",
  limited: "处理结果：问题未闭合。"
};

export function buildEndingStatusLines(state) {
  return STAT_KEYS.map((key) => {
    const value = state.stats[key] ?? 0;
    const word = getStateWord(value);
    const text = ENDING_STAT_TEXT[key][word];
    return `${STAT_LABELS[key]}：${word}。${text}`;
  });
}

function tagSet(state) {
  return new Set(state.tags ?? []);
}

function firstMatchingEcho(tags, rules, fallback) {
  return rules.find(([tag]) => tags.has(tag))?.[1] ?? fallback;
}

export function buildChapterEchoLines(state) {
  const tags = tagSet(state);
  const c6Outcome = state.chapterOutcomes?.C6?.id;
  const c6Lines = {
    recognized: "这件事被记录了。它没有完全解决，但至少没有只留在你一个人的记忆里。",
    recorded: "系统留下了一行处理记录。你不能说完全没用，也不能说它解决了什么。",
    stopped: "你没有继续。不是因为事情不重要，而是继续本身已经变成另一种消耗。",
    backlash: "事情被更多人知道以后，你开始解释自己为什么值得被相信。",
    left: "你离开了。离开切断了一部分风险，也让你重新承担开始的成本。",
    limited: "系统留下了一行处理记录。你不能说完全没用，也不能说它解决了什么。"
  };

  const c1 = firstMatchingEcho(tags, [
    ["low_salary", "你获得了一个位置。它可以让你留下来，只是价格比你预想的低。"],
    ["career_driven", "你获得了一个位置。对方认可你的能力，也提前放上了更多期待。"],
    ["pending_offer", "你留下来了。只是从第一天起，你就知道这里对你的容错不多。"],
    ["file_blocked", "这一次没有通过。你开始找下一份更低要求的机会。"]
  ], "你获得了一个位置。它暂时接收你，也开始要求你继续证明自己。");
  const c2 = firstMatchingEcho(tags, [
    ["checked_building", "你租到了一个相对明亮的房间。有些风险被挡在门外。"],
    ["viewed_with_friend", "你租到了一个相对明亮的房间。有些风险被挡在门外。"],
    ["high_rent", "你住得近，也住得贵。安全在余额里留下痕迹。"],
    ["remote_home", "你保住了钱。代价是以后每次回家，都要多经过一段路。"],
    ["temporary_home", "你暂时有地方睡觉。它不像答案，更像一个缓冲。"],
    ["contract_risk", "房子定下来了。几条没有说清的规则，也跟着你住了进来。"]
  ], "你租到了一个房间。它可以关门，但不代表完全安全。");
  const c3 = (state.stats.safety ?? STAT_MAX) <= DANGER_MAX || tags.has("watchful") || tags.has("night_quiet_route")
    ? "没有发生什么明确的事。只是你已经开始自动确认身后、车牌、楼层和出口。"
    : firstMatchingEcho(tags, [
      ["detour", "你避开了很多不确定。代价是每一天都比路线显示的更长。"],
      ["someone_knows", "你让几个人知道自己在哪里。你不再完全独自移动。"],
      ["platform_trip", "这一周，你大多准时到达，也没有把自己耗得太空。"]
    ], "这一周，你大多准时到达，也没有把自己耗得太空。");
  const c4 = firstMatchingEcho(tags, [
    ["visible_work", "项目结束了。至少这一次，你做过的事没有完全消失在流程里。"],
    ["unclear_credit", "项目留下了成果，也留下了一个很难说清的“我们”。"],
    ["invisible_labor", "你保住了位置。只是下班后，你已经没有力气再解释自己为什么累。"],
    ["reaction_flag", "有些人开始先评价你的反应，再处理你说的内容。"],
    ["missing_contribution", "没有人说你没有做事。他们只是说，这个位置可能需要重新考虑。"]
  ], "项目结束了。至少这一次，你做过的事没有完全消失在流程里。");
  const c5 = firstMatchingEcho(tags, [
    ["distance_clear", "你靠近过，也退回来过。至少这一次，你没有把所有不舒服都留给自己。"],
    ["distance_blurry", "关系还在。只是有些界线没有被说清，之后可能还要你继续解释。"],
    ["alone_with_it", "你保护住了一部分自己。代价是很多时候，你只能自己判断自己是不是太紧张。"],
    ["unclosed_relation", "关系没有真正结束，只是换成了消息、解释和等待。"],
    ["support_network", "有几个人知道发生过什么。事情没有因此简单，但你不再完全独自拿着它。"]
  ], "你靠近过，也退回来过。至少这一次，你没有把所有不舒服都留给自己。");

  return [
    `筛选：${c1}`,
    `房间：${c2}`,
    `路上：${c3}`,
    `桌面：${c4}`,
    `靠近：${c5}`,
    `窗口：${c6Lines[c6Outcome] ?? c6Lines.limited}`
  ];
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

  if ((state.stats.safety ?? STAT_MAX) <= DANGER_MAX || routeStrategyCount >= 10) {
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
  const stats = state.stats ?? {};
  const counters = state.counters ?? {};
  const hidden = state.hidden ?? {};
  const candidates = [
    { priority: stats.money <= 3 ? stats.money : Infinity, text: "你保住了一些安全，代价是余额越来越薄。" },
    { priority: stats.money >= 7 && stats.safety <= 3 ? stats.safety : Infinity, text: "你保住了钱，代价是把更多风险留给自己判断。" },
    { priority: stats.safety <= 3 ? stats.safety : Infinity, text: "你没有一直遇到危险，但你一直在为危险做准备。" },
    { priority: stats.energy <= 3 ? stats.energy : Infinity, text: "你完成了很多处理，也失去了解释更多的力气。" },
    { priority: stats.reputation <= 3 ? stats.reputation : Infinity, text: "有些评价没有被说出口，但它们改变了后面的门槛。" },
    { priority: stats.relationship <= 3 ? stats.relationship : Infinity, text: "你尽量不麻烦别人，结果很多事只能自己接住。" },
    { priority: stats.self <= 3 ? stats.self : Infinity, text: "你让很多场面顺利过去，也让很多不舒服留在自己这里。" },
    { priority: stats.self >= 8 && stats.energy <= 3 ? stats.energy + 0.25 : Infinity, text: "你坚持了很多次，只是每一次坚持都要继续消耗你。" },
    { priority: hidden.evidence >= 4 ? 4 : Infinity, text: "你留下了很多记录。它们保护了你，也要求你反复回到那些时刻。" },
    { priority: counters.concede >= 3 ? 4.1 : Infinity, text: "你让事情继续往前走，代价是自己往后退了很多次。" },
    { priority: counters.silence >= 3 ? 4.2 : Infinity, text: "你减少了冲突，也减少了被看见的机会。" },
    { priority: counters.seekHelp >= 3 ? 4.3 : Infinity, text: "你让别人知道了你的位置和经历，也消耗了很多关系。" }
  ];
  const lines = candidates
    .filter((item) => Number.isFinite(item.priority))
    .sort((a, b) => a.priority - b.priority)
    .map((item) => item.text);

  while (lines.length < 3) {
    lines.push("你避开了最坏的结果，也没有真正轻松。");
  }
  return [...new Set(lines)].slice(0, 3);
}

export function buildTopCounterLines(state, limit = 5) {
  return buildEndingStats(state)
    .filter(([, value]) => value > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([label, value]) => `${label}：${value} 次`);
}

export function buildBlockedChoiceLines(state) {
  const stats = state.stats ?? {};
  const counters = state.counters ?? {};
  const tags = tagSet(state);
  const lines = [];

  if ((stats.money ?? STAT_MAX) <= 3) lines.push("有几次，你不是不想选择更安全的路，只是余额不允许。");
  if ((stats.relationship ?? STAT_MAX) <= 3 && (counters.seekHelp ?? 0) <= 1) lines.push("有几次，你打开通讯录，又把手机放下。");
  if ((stats.energy ?? STAT_MAX) <= 3) lines.push("有几次，事情还没结束，你已经说不下去了。");
  if ((stats.self ?? STAT_MAX) <= 3) lines.push("有几次，你知道自己不愿意，却没有力气把它说出来。");
  if ((stats.reputation ?? STAT_MAX) <= 3) lines.push("有几次，你讲的是事实，但对方先判断你是否可靠。");
  if ((stats.safety ?? STAT_MAX) <= 3 && (tags.has("night_quiet_route") || tags.has("remote_home") || tags.has("quiet_route"))) {
    lines.push("有几次，最近的路不是最好的路，却是你当时唯一能走的路。");
  }

  return lines.length > 0
    ? lines.slice(0, 2)
    : ["本次没有太多选择被直接关闭。", "但你仍然为保留它们支付了代价。"];
}

function buildStatusSummaryLines(state) {
  return STAT_KEYS.map((key) => `${STAT_LABELS[key]}：${getStateWord(state.stats[key] ?? 0)}`);
}

export function getEndingDisplay(card, state) {
  if (card.id === "E-01") {
    return { ...card, lines: buildChapterEchoLines(state) };
  }
  if (card.id === "E-02") {
    const counterLines = buildTopCounterLines(state);
    return {
      ...card,
      lines: [
        ...buildEndingStatusLines(state),
        "本次记录：",
        ...(counterLines.length > 0 ? counterLines : ["没有明显重复的记录。"]),
        "有些选择不是你不想选。",
        ...buildBlockedChoiceLines(state)
      ]
    };
  }
  if (card.id === "E-03") {
    return {
      ...card,
      lines: ["年龄：27", "职业：普通职员", "城市：普通城市", "收入：普通", "家庭：普通", "关系状态：普通"]
    };
  }
  if (card.id === "E-04") {
    const style = resolvePassStyle(state);
    return {
      ...card,
      lines: [
        `通关方式：${style.label}`,
        "难度：普通",
        style.text,
        "状态：",
        ...buildStatusSummaryLines(state),
        "本次代价：",
        ...buildCostLines(state),
        "女性不是一种性格。",
        "女性是一种处境。",
        "当一个人长期处在需要被评价、被相信、被允许、被保护、被解释的位置，",
        "她就会学会谨慎、计算、讨好、沉默、留证和提前道歉。",
        "这不是因为她天生如此。",
        "是因为世界经常这样要求她。",
        "你已经学会了普通生活。"
      ]
    };
  }
  return { ...card, lines: [] };
}

export function getSettlementDisplay(card, state) {
  if (card.id !== "C6-S") {
    return card;
  }

  const outcome = state.chapterOutcomes?.C6;
  if (!outcome) {
    return card;
  }

  return {
    ...card,
    lines: [CHAPTER_OUTCOME_LINES[outcome.id] ?? `处理结果：${outcome.label}。`]
  };
}

export function startGame(state) {
  return {
    ...state,
    phase: "intro",
    currentCardId: "P-I",
    pendingResult: null,
    visibleStats: []
  };
}

export function applyChoice(state, choice) {
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
      text: choice.result
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

function resolveSettlementState(state, nextCard) {
  if (nextCard?.type !== "settlement" || nextCard.chapterId !== "C6" || state.chapterOutcomes?.C6) {
    return state;
  }

  const outcome = resolveChapterOutcome("C6", state);
  return {
    ...state,
    chapterOutcomes: {
      ...state.chapterOutcomes,
      C6: outcome
    },
    counters: addCounters(state.counters, outcome.counters)
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
  const resolvedState = resolveSettlementState(state, nextCard);

  return {
    ...resolvedState,
    phase: phaseForCard(nextCard),
    currentCardId: nextId,
    pendingResult: null,
    visibleStats: crisis ? state.visibleStats : getVisibleStatsForCard(nextCard),
    triggeredInserts: inserted ? [...state.triggeredInserts, inserted.id] : state.triggeredInserts,
    triggeredCrises: crisis ? [...(state.triggeredCrises ?? []), crisis.stat] : state.triggeredCrises ?? [],
    returnCardId: crisis ? mainlineNextId : currentCard?.crisis ? null : state.returnCardId ?? null
  };
}
