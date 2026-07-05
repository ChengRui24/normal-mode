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
import { CHAPTER_ECHOES } from "../data/textConfig.js";

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

const AFTERMATH_TEXT = {
  reputation: {
    up: "这一次，你更容易被接收。",
    down: "之后，解释可能会变多一点。",
    tense: "有些话开始需要多说一遍。",
    danger: "你说的内容，开始不如别人对你的判断重要。"
  },
  money: {
    up: "余额暂时松了一点。",
    down: "余额变薄了。",
    tense: "后面有些选择会变贵。",
    danger: "有些路，在出现前就被余额拿走了。"
  },
  safety: {
    up: "你稍微放松了一点。",
    down: "你开始更留意周围。",
    tense: "路线、出口和身后的人，变得更难忽略。",
    danger: "你还没遇到危险，但已经开始为危险做准备。"
  },
  energy: {
    up: "你恢复了一点力气。",
    down: "你更累了。",
    tense: "你开始只处理最急的部分。",
    danger: "事情还没结束，你已经快说不下去了。"
  },
  relationship: {
    up: "你和别人之间还有一点连接。",
    down: "下次开口，会更需要斟酌。",
    tense: "每一次求助都开始变重。",
    danger: "你不是没有人可找，只是每个名字后面都有上一次。"
  },
  self: {
    up: "你更清楚自己不想退到哪里。",
    down: "你又往后退了一点。",
    tense: "你知道边界在哪里，只是说出来越来越费力。",
    danger: "拒绝还在心里，但已经很难出口。"
  }
};

function aftermathStateFor(value) {
  if (value <= DANGER_MAX) return "danger";
  if (value <= 5) return "tense";
  return "stable";
}

function trackedMinorCost(key, choice) {
  const track = choice.track ?? {};
  if (key === "relationship" && (track.seekHelp ?? 0) > 0) return true;
  if (key === "self" && ((track.concede ?? 0) > 0 || (track.silence ?? 0) > 0)) return true;
  if (key === "money" && (track.paidSafety ?? 0) > 0) return true;
  if (key === "reputation" && (track.clearRefusal ?? 0) > 0) return true;
  return false;
}

export function getChoiceAftermath(state, choice) {
  const candidates = [];

  for (const key of STAT_KEYS) {
    const delta = choice.effects?.[key] ?? 0;
    if (delta === 0) continue;

    const before = state.stats[key] ?? 0;
    const after = clampStat(before + delta);
    const beforeState = aftermathStateFor(before);
    const afterState = aftermathStateFor(after);

    if (afterState === "danger" && beforeState !== "danger") {
      candidates.push({ priority: 0, magnitude: Math.abs(delta), text: AFTERMATH_TEXT[key].danger });
    } else if (afterState === "tense" && beforeState === "stable") {
      candidates.push({ priority: 1, magnitude: Math.abs(delta), text: AFTERMATH_TEXT[key].tense });
    } else if (delta <= -2) {
      candidates.push({ priority: 2, magnitude: Math.abs(delta), text: AFTERMATH_TEXT[key].down });
    } else if (delta < 0 && trackedMinorCost(key, choice)) {
      candidates.push({ priority: 3, magnitude: Math.abs(delta), text: AFTERMATH_TEXT[key].down });
    } else if (delta >= 2) {
      candidates.push({ priority: 4, magnitude: Math.abs(delta), text: AFTERMATH_TEXT[key].up });
    }
  }

  const leavesEvidence = (choice.track?.evidenceSaved ?? 0) > 0 || (choice.hiddenEffects?.evidence ?? 0) >= 2;
  const hasDangerOrMajorLoss = candidates.some((candidate) => candidate.priority === 0 || candidate.priority === 2);
  if (leavesEvidence && !hasDangerOrMajorLoss) {
    candidates.push({ priority: 0.5, magnitude: 1, text: "这件事会留下来。" });
  }

  return candidates.sort((a, b) => a.priority - b.priority || b.magnitude - a.magnitude)[0]?.text ?? "";
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

function clonePlain(value) {
  return JSON.parse(JSON.stringify(value));
}

function viewSnapshot(state) {
  const { viewHistory, viewIndex, isViewingHistory, ...snapshot } = state;
  return clonePlain(snapshot);
}

function isAnsweredChoiceSnapshot(history, index) {
  const view = history[index];
  if (view?.phase !== "choice") return false;
  return history.slice(index + 1).some((next) => next.phase === "result" && next.currentCardId === view.currentCardId);
}

function normalizeViewIndex(state) {
  const history = state.viewHistory ?? [];
  const fallbackIndex = history.length - 1;
  const current = Number.isInteger(state.viewIndex) ? state.viewIndex : fallbackIndex;

  if (!isAnsweredChoiceSnapshot(history, current)) return current;

  for (let index = current + 1; index < history.length; index += 1) {
    if (!isAnsweredChoiceSnapshot(history, index)) return index;
  }

  for (let index = current - 1; index >= 0; index -= 1) {
    if (!isAnsweredChoiceSnapshot(history, index)) return index;
  }

  return current;
}

function previousViewIndex(state) {
  const history = state.viewHistory ?? [];
  const current = normalizeViewIndex(state);
  for (let index = current - 1; index >= 0; index -= 1) {
    if (!isAnsweredChoiceSnapshot(history, index)) return index;
  }
  return current;
}

function nextViewIndex(state) {
  const history = state.viewHistory ?? [];
  const current = normalizeViewIndex(state);
  for (let index = current + 1; index < history.length; index += 1) {
    if (!isAnsweredChoiceSnapshot(history, index)) return index;
  }
  return current;
}

function recordView(state, previousState = null) {
  const baseState = previousState ?? state;
  const baseHistory = baseState.viewHistory ?? [];
  const history = baseHistory.length === 0 && baseState.currentCardId !== "HOME"
    ? [viewSnapshot(baseState)]
    : baseHistory;
  const currentIndex = Number.isInteger(baseState.viewIndex) ? baseState.viewIndex : history.length - 1;
  let retainedHistory = currentIndex >= 0 ? history.slice(0, currentIndex + 1) : history;
  const nextView = viewSnapshot(state);

  if (
    nextView.phase === "result" &&
    retainedHistory.at(-1)?.phase === "choice" &&
    retainedHistory.at(-1)?.currentCardId === nextView.currentCardId
  ) {
    retainedHistory = retainedHistory.slice(0, -1);
  }

  const nextHistory = [...retainedHistory, nextView];

  return {
    ...state,
    viewHistory: nextHistory,
    viewIndex: nextHistory.length - 1
  };
}

export function getViewedState(state) {
  const history = state.viewHistory ?? [];
  const index = normalizeViewIndex(state);
  const snapshot = index >= 0 ? history[index] : null;

  return {
    ...state,
    ...(snapshot ?? {}),
    viewHistory: history,
    viewIndex: index,
    isViewingHistory: index >= 0 && index < history.length - 1
  };
}

export function canGoToPreviousView(state) {
  return previousViewIndex(state) !== normalizeViewIndex(state);
}

export function canGoToNextView(state) {
  return nextViewIndex(state) !== normalizeViewIndex(state);
}

export function goToPreviousView(state) {
  if (!canGoToPreviousView(state)) return state;
  return {
    ...state,
    viewIndex: previousViewIndex(state)
  };
}

export function goToNextView(state) {
  if (!canGoToNextView(state)) return state;
  return {
    ...state,
    viewIndex: nextViewIndex(state)
  };
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

export function buildChapterEchoLines(state) {
  const tags = tagSet(state);
  const c6Outcome = state.chapterOutcomes?.C6?.id ?? resolveChapterOutcome("C6", state).id;
  const c6Lines = {
    recognized: CHAPTER_ECHOES.C6?.partly_recognized,
    recorded: CHAPTER_ECHOES.C6?.limited_result,
    stopped: CHAPTER_ECHOES.C6?.gave_up_process,
    backlash: CHAPTER_ECHOES.C6?.backlash,
    left: CHAPTER_ECHOES.C6?.exit_ending_flag,
    limited: CHAPTER_ECHOES.C6?.limited_result
  };

  const c1 = (state.stats.reputation ?? STAT_MAX) <= DANGER_MAX
    ? CHAPTER_ECHOES.C1?.temp_work_route
    : tags.has("low_salary") || (state.stats.money ?? STAT_MAX) <= 4
      ? CHAPTER_ECHOES.C1?.low_salary_entry
      : (state.stats.reputation ?? STAT_MAX) <= 4
        ? CHAPTER_ECHOES.C1?.probation_shadow
        : CHAPTER_ECHOES.C1?.normal_entry;
  const c2 = (state.stats.money ?? STAT_MAX) <= 1
    ? CHAPTER_ECHOES.C2?.temporary_home
    : tags.has("contract_risk")
      ? CHAPTER_ECHOES.C2?.contract_followup
      : tags.has("high_rent") && (state.stats.money ?? STAT_MAX) <= 3
        ? CHAPTER_ECHOES.C2?.rent_pressure
        : tags.has("remote_home") || (state.stats.safety ?? STAT_MAX) <= 4
          ? CHAPTER_ECHOES.C2?.remote_risk
          : (state.stats.safety ?? 0) >= 7 && !tags.has("contract_risk")
            ? CHAPTER_ECHOES.C2?.safe_home
            : CHAPTER_ECHOES.C2?.temporary_home;
  const c3 = (state.stats.safety ?? STAT_MAX) <= DANGER_MAX
    ? CHAPTER_ECHOES.C3?.high_alert
    : tags.has("someone_knows") || (state.counters.seekHelp ?? 0) >= 2
      ? CHAPTER_ECHOES.C3?.known_route
      : (state.stats.safety ?? STAT_MAX) <= 4 && (state.stats.money ?? 0) >= 4
        ? CHAPTER_ECHOES.C3?.watchful_commute
        : (state.counters.detour ?? 0) >= 2 || tags.has("habit_detour") || tags.has("avoid_closed_space") || tags.has("pretend_route")
          ? CHAPTER_ECHOES.C3?.safe_but_tired
          : CHAPTER_ECHOES.C3?.low_loss_commute;
  const c4 = (state.stats.reputation ?? STAT_MAX) <= DANGER_MAX || (state.hidden.credit ?? 0) <= -2
    ? CHAPTER_ECHOES.C4?.position_loose
    : tags.has("reaction_flag") && (state.stats.reputation ?? STAT_MAX) <= 5
      ? CHAPTER_ECHOES.C4?.reaction_reputation
      : (state.stats.energy ?? STAT_MAX) <= 3 && (state.stats.reputation ?? 0) >= 6
        ? CHAPTER_ECHOES.C4?.overworked
        : (state.hidden.credit ?? 0) < 0 || tags.has("missing_contribution")
          ? CHAPTER_ECHOES.C4?.credit_unclear
          : (state.hidden.evidence ?? 0) >= 2 || (state.hidden.credit ?? 0) >= 1
            ? CHAPTER_ECHOES.C4?.work_seen
            : CHAPTER_ECHOES.C4?.work_seen;
  const c5 = tags.has("unclosed_relation") || (tags.has("private_place") && tags.has("distance_retreat"))
    ? CHAPTER_ECHOES.C5?.followup_risk
    : tags.has("seen_by_friend") || (state.counters.seekHelp ?? 0) >= 2
      ? CHAPTER_ECHOES.C5?.support_available
      : (state.stats.safety ?? 0) >= 7 && (state.stats.relationship ?? STAT_MAX) <= 3
        ? CHAPTER_ECHOES.C5?.safe_isolated
        : tags.has("distance_blurry") || tags.has("distance_retreat")
          ? CHAPTER_ECHOES.C5?.blurry_relation
          : CHAPTER_ECHOES.C5?.stable_distance;

  return [
    `筛选：${c1 ?? ""}`,
    `房间：${c2 ?? ""}`,
    `路上：${c3 ?? ""}`,
    `桌面：${c4 ?? ""}`,
    `靠近：${c5 ?? ""}`,
    `窗口：${c6Lines[c6Outcome] ?? c6Lines.limited ?? ""}`
  ];
}

export function getIntroEcho(card, state) {
  const previousChapterIndex = {
    C2: 0,
    C3: 1,
    C4: 2,
    C5: 3,
    C6: 4
  }[card?.chapterId];

  if (previousChapterIndex === undefined) return "";
  return buildChapterEchoLines(state)[previousChapterIndex]?.replace(/^[^：]+：/, "") ?? "";
}

export const ENDING_SITUATIONS = {
  low_margin: {
    id: "low_margin",
    label: "余量耗尽",
    text: "你走到了这里。不是因为每一步都能承受，而是因为生活没有给你停下来的位置。很多选择不是被你放弃的，是在出现之前就已经变窄了。",
    concept: "当钱、精力、安全感、关系和自我同时接近下限，人仍然可能继续生活，但很难承受新的意外。这不是个人能力不足，而是处境长期挤压后的低缓冲状态。"
  },
  always_ready: {
    id: "always_ready",
    label: "风险内化",
    text: "你没有总是遇到危险。只是路灯、出口、车牌和手机电量，慢慢都变成了要提前确认的事。你不是天生多疑，只是太多选择需要先排除风险。",
    concept: "当风险长期存在但不一定每次发生，人会把预防风险变成日常习惯。外界看到的可能是“小心”“敏感”“想太多”，处境里的人承担的是持续判断、提前排除和自我保护。"
  },
  done_until_empty: {
    id: "done_until_empty",
    label: "隐性过劳",
    text: "事情大多被做完了。邮件发了，材料补了，流程走了，别人也看见了结果。只是有些力气，没有出现在任何记录里。",
    concept: "有些劳动不会被正式命名，例如补位、整理、解释、安抚、维持流程和修补关系。系统记录结果，却不记录让结果顺利发生的消耗。"
  },
  held_alone: {
    id: "held_alone",
    label: "独自承担",
    text: "你尽量不麻烦别人。很多判断、害怕、复盘和补救，最后都留在你自己手里。它们没有变成别人的麻烦，只是变成了你的重量。",
    concept: "独立不一定是主动选择。有时是因为求助本身需要解释、消耗关系、承担误解，甚至带来新的负担。没有求助不代表没有需要，只是很多压力被留在了个人内部。"
  },
  kept_the_room_quiet: {
    id: "kept_the_room_quiet",
    label: "回避冲突",
    text: "你让很多场面顺利过去。笑一下，慢一点，少说一句，事情就能继续。只是有些不舒服没有被处理，只是被你带走了。",
    concept: "冲突没有发生，不代表问题不存在。很多“顺利”“懂事”“好相处”，是由某个人主动吞下不适、调整语气、维护气氛换来的。这里的回避不是性格缺陷，而是降低风险的处境策略。"
  },
  kept_explaining: {
    id: "kept_explaining",
    label: "反复自证",
    text: "你把事情一遍遍拆开，变成时间、截图、记录和说明。它因此更像一个可以处理的问题，也更不像你原本经历的那件事。",
    concept: "弱位者不只是要说出事实，还要证明自己值得被相信。经历必须被拆成材料、证据和可记录信息，才有机会被处理。反复自证是一种二次消耗，也会让原本的经验被制度格式改写。"
  },
  left_the_place: {
    id: "left_the_place",
    label: "退出的代价",
    text: "你切断了一部分风险，也把一部分积累留在身后。离开不是失败，只是退出也有代价。",
    concept: "退出不是零成本选择。离开可以减少一部分风险，也可能意味着失去收入、住处、关系、积累和重新开始的时间。很多时候，人不是不想离开，而是要先计算自己能不能承受离开的后果。"
  },
  apparently_stable: {
    id: "apparently_stable",
    label: "表面稳定",
    text: "没有最坏的事发生。记录也大多正常。只是你知道，这不等于真的轻松。",
    concept: "没有事故、没有投诉失败、没有明显崩溃，并不等于没有消耗。很多处境之所以难被看见，正是因为它们最终呈现为“正常”“稳定”“没什么事”。"
  }
};

export function resolvePassStyle(state) {
  const dangerous = STAT_KEYS.filter((key) => (state.stats[key] ?? STAT_MAX) <= DANGER_MAX);
  const counters = state.counters ?? {};
  const tags = state.tags ?? [];
  const routeStrategyCount = (counters.detour ?? 0) + (counters.paidSafety ?? 0) + (counters.seekHelp ?? 0);

  if (dangerous.length >= 3) {
    return ENDING_SITUATIONS.low_margin;
  }

  if ((state.stats.safety ?? STAT_MAX) <= DANGER_MAX || routeStrategyCount >= 10) {
    return ENDING_SITUATIONS.always_ready;
  }

  if (((state.stats.energy ?? STAT_MAX) <= DANGER_MAX && (state.stats.reputation ?? 0) >= 6) || (counters.concede ?? 0) >= 5) {
    return ENDING_SITUATIONS.done_until_empty;
  }

  if ((state.stats.relationship ?? STAT_MAX) <= DANGER_MAX && (counters.seekHelp ?? 0) <= 1) {
    return ENDING_SITUATIONS.held_alone;
  }

  if ((state.stats.reputation ?? 0) >= 8 && (state.stats.self ?? STAT_MAX) <= 3 && ((counters.silence ?? 0) + (counters.concede ?? 0)) >= 6) {
    return ENDING_SITUATIONS.kept_the_room_quiet;
  }

  if ((state.stats.self ?? 0) >= 8 && ((counters.explain ?? 0) + (counters.evidenceSaved ?? 0)) >= 6) {
    return ENDING_SITUATIONS.kept_explaining;
  }

  if (tags.includes("exit_cost")) {
    return ENDING_SITUATIONS.left_the_place;
  }

  return ENDING_SITUATIONS.apparently_stable;
}

export function buildCostLines(state) {
  const stats = state.stats ?? {};
  const counters = state.counters ?? {};
  const hidden = state.hidden ?? {};
  const candidates = [
    { priority: stats.money <= 3 ? stats.money : Infinity, text: "你花钱换过安全，也因此失去了一些选择。" },
    { priority: stats.money >= 7 && stats.safety <= 3 ? stats.safety : Infinity, text: "钱留下来了，判断也更多地留给了你。" },
    { priority: stats.safety <= 3 ? stats.safety : Infinity, text: "很多事没有发生，但你已经为它们准备过很多次。" },
    { priority: stats.energy <= 3 ? stats.energy : Infinity, text: "你把流程走完了，但已经没有力气再讲一遍。" },
    { priority: stats.reputation <= 3 ? stats.reputation : Infinity, text: "有些门没有关上，只是变得更难推开。" },
    { priority: stats.relationship <= 3 ? stats.relationship : Infinity, text: "你尽量少麻烦别人，很多事就留在了自己手里。" },
    { priority: stats.self <= 3 ? stats.self : Infinity, text: "场面过去了，有些不舒服也跟着你走了。" },
    { priority: stats.self >= 8 && stats.energy <= 3 ? stats.energy + 0.25 : Infinity, text: "你说清楚了很多次，也把自己带回那些时刻很多次。" },
    { priority: hidden.evidence >= 4 ? 4 : Infinity, text: "你留下了很多记录。它们保护你，也让你反复回到那里。" },
    { priority: counters.concede >= 3 ? 4.1 : Infinity, text: "事情继续往前走，你往后退了一些。" },
    { priority: counters.silence >= 3 ? 4.2 : Infinity, text: "冲突少了一些，没说出口的也多了一些。" },
    { priority: counters.seekHelp >= 3 ? 4.3 : Infinity, text: "有人知道你在哪里，也知道你经历过什么。关系因此更近，也更重。" }
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

function buildStatusSummaryItems(state) {
  return STAT_KEYS.map((key) => ({
    key,
    label: STAT_LABELS[key],
    word: getStateWord(state.stats[key] ?? 0)
  }));
}

function buildChapterTimelineItems(state) {
  return buildChapterEchoLines(state).map((line) => {
    const [chapter, ...rest] = line.split("：");
    return {
      chapter,
      text: rest.join("：")
    };
  });
}

function templateLines(template = "", replacements = {}) {
  let text = template;
  for (const [key, value] of Object.entries(replacements)) {
    text = text.replaceAll(`{${key}}`, Array.isArray(value) ? value.join("\n") : String(value));
  }
  return text.split("\n").filter((line) => line !== "");
}

export function getEndingDisplay(card, state) {
  const sourceCard = { ...getCardById(card.id), ...card };

  if (sourceCard.id === "E-01") {
    return { ...sourceCard, lines: [], timelineItems: buildChapterTimelineItems(state) };
  }
  if (sourceCard.id === "E-02") {
    const counterLines = buildTopCounterLines(state);
    return {
      ...sourceCard,
      lines: [],
      statusItems: buildStatusSummaryItems(state),
      counterLines: counterLines.length > 0 ? counterLines : ["没有明显重复的记录。"],
      blockedChoiceLines: buildBlockedChoiceLines(state)
    };
  }
  if (sourceCard.id === "E-03") {
    return {
      ...sourceCard,
      lines: templateLines(sourceCard.content)
    };
  }
  if (sourceCard.id === "E-04") {
    const style = resolvePassStyle(state);
    return {
      ...sourceCard,
      text: "",
      lines: [],
      finalReport: {
        situation: style,
        costLines: buildCostLines(state),
        concept: style.concept,
        themeLines: [
          "女性不是一种性格，也不只是一组特征。",
          "在很多时候，女性意味着一种被反复放置的位置。",
          "当一个人长期处在需要被评价、被相信、被允许、被保护、被解释的位置，她就会学会谨慎、计算、讨好、沉默、留证和提前道歉。",
          "这不是因为她天生如此。",
          "是因为世界经常这样要求她。"
        ],
        finalLine: "你已经学会了普通生活。"
      }
    };
  }
  return { ...sourceCard, lines: [] };
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
  return recordView({
    ...state,
    phase: "intro",
    currentCardId: "P-I",
    pendingResult: null,
    visibleStats: []
  }, state);
}

export function applyChoice(state, choice) {
  const card = getCardById(state.currentCardId);
  const aftermath = getChoiceAftermath(state, choice);

  return recordView({
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
      aftermath
    },
    history: [
      ...state.history,
      {
        cardId: state.currentCardId,
        choiceId: choice.id,
        chapterId: card?.chapterId ?? ""
      }
    ]
  }, state);
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
  if (state.currentCardId === "C3-04") {
    return state.tags.includes("platform_trip") ? "C3-05" : "C3-06";
  }
  if (state.currentCardId === "C3-05" || state.currentCardId === "C3-06") {
    return "C4-I";
  }
  if (state.currentCardId === "C4-04") {
    return (state.hidden.conflict ?? 0) >= 2 || state.tags.includes("corrected_live") ? "C4-06" : "C4-07";
  }
  if (state.currentCardId === "C4-06" || state.currentCardId === "C4-07") {
    return "C5-I";
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
  if (triggered.length >= 2) return null;

  const currentCard = getCardById(state.currentCardId);
  const currentChapterId = currentCard?.chapterId ?? "";
  if (triggered.some((entry) => entry.startsWith(`${currentChapterId}:`))) return null;

  const hasTriggeredStat = (key) => triggered.some((entry) => entry === key || entry.endsWith(`:${key}`));
  const stat = STAT_KEYS.find((key) => (state.stats[key] ?? STAT_MAX) <= DANGER_MAX && !hasTriggeredStat(key));
  if (!stat) return null;
  return CRISIS_CARDS.find((card) => card.stat === stat) ?? null;
}

function crisisKey(card, crisis) {
  return `${card?.chapterId ?? "unknown"}:${crisis.stat}`;
}

function phaseForCard(card) {
  if (card?.type === "chapterIntro") return "intro";
  if (card?.type === "settlement") return "settlement";
  if (card?.type === "ending") return "ending";
  return "choice";
}

function resolveOutcomeState(state, currentCardId) {
  if (currentCardId !== "C6-08" || state.chapterOutcomes?.C6) {
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

export function advanceAfterResult(state) {
  const currentCard = getCardById(state.currentCardId);
  const shouldCheckInsert = state.phase === "result" && !currentCard?.insert;
  const inserted = shouldCheckInsert ? findInsert(state) : null;
  const mainlineNextId = inserted?.id ?? nextIdAfterCurrent(state);
  const crisis = !inserted && state.phase === "result" && !currentCard?.crisis ? findCrisis(state) : null;
  const nextId = crisis?.id ?? mainlineNextId;
  const nextCard = getCardById(nextId);
  const outcomeState = resolveOutcomeState(state, state.currentCardId);
  const resolvedState = resolveSettlementState(outcomeState, nextCard);

  return recordView({
    ...resolvedState,
    phase: phaseForCard(nextCard),
    currentCardId: nextId,
    pendingResult: null,
    visibleStats: crisis ? state.visibleStats : getVisibleStatsForCard(nextCard),
    triggeredInserts: inserted ? [...state.triggeredInserts, inserted.id] : state.triggeredInserts,
    triggeredCrises: crisis ? [...(state.triggeredCrises ?? []), crisisKey(currentCard, crisis)] : state.triggeredCrises ?? [],
    returnCardId: crisis ? mainlineNextId : currentCard?.crisis ? null : state.returnCardId ?? null
  }, state);
}
