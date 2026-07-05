import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import {
  CRISIS_CARDS,
  ENDING_CARDS,
  INSERT_CARDS,
  INTRO_CARDS,
  LEVEL_CARDS,
  SETTLEMENT_CARDS,
  orderedCardIds
} from "../src/data/levels.js";
import {
  CHAPTER_VISIBLE_STATS,
  DANGER_MAX,
  HIDDEN_KEYS,
  INITIAL_STATS,
  STATE_WORDS,
  STAT_KEYS,
  STAT_LABELS,
  STAT_MAX,
  STAT_MIN
} from "../src/data/statConfig.js";

const outputPath = process.argv[2] ?? "public/agent-manifest.json";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

const manifest = {
  schemaVersion: "1.0.0",
  project: {
    id: "normal-mode",
    title: "普通难度",
    description: "移动端优先的静态文字冒险游戏配置，面向 LLM agent 读取、审阅和改写。",
    deployedPaths: {
      game: "/normal-mode/",
      agentManifest: "/normal-mode/agent-manifest.json",
      contentTables: {
        cards: "/normal-mode/content-tables/cards.csv",
        choices: "/normal-mode/content-tables/choices.csv",
        triggers: "/normal-mode/content-tables/triggers.csv",
        statConfig: "/normal-mode/content-tables/stat-config.csv"
      }
    }
  },
  howToRead: [
    "INTRO_CARDS 是章节进入页。",
    "LEVEL_CARDS 是玩家会做选择的卡片。",
    "ENDING_CARDS 是通关后的四页回放。",
    "CRISIS_CARDS 是数值过低时可能插入的补救卡。",
    "orderedCardIds 是默认主线顺序；C3 与 C4 存在条件替代卡，实际一周目不会同时走完替代卡。"
  ],
  visibleInteractionRules: {
    primaryLoop: "读一张卡片 -> 点一个选择 -> 在同一张卡里看结果和余波句 -> 继续。",
    resultDisplay: {
      selectedChoice: "显示为 [选项文本]，作为玩家刚才执行的动作。",
      resultText: "显示选项的自然语言后果。",
      aftermathText: "由数值变化自动生成，显示为（余波句），不显示 +1/-1。",
      visibleStats: "已显化状态词在点选后即时更新，不等待下一张卡。"
    },
    statDisplay: {
      mode: "状态词",
      words: STATE_WORDS
    },
    restart: "重新开始以底部小字呈现。"
  },
  mechanics: {
    stats: {
      keys: STAT_KEYS,
      labels: STAT_LABELS,
      initial: INITIAL_STATS,
      min: STAT_MIN,
      max: STAT_MAX,
      dangerMax: DANGER_MAX,
      stateWords: STATE_WORDS,
      chapterVisibleStats: CHAPTER_VISIBLE_STATS
    },
    hiddenKeys: HIDDEN_KEYS,
    counters: [
      "detour",
      "seekHelp",
      "explain",
      "silence",
      "concede",
      "clearRefusal",
      "evidenceSaved",
      "paidSafety"
    ],
    conditionalFlow: [
      {
        after: "C3-04",
        rule: "如果 tags 包含 platform_trip，进入 C3-05；否则进入 C3-06。"
      },
      {
        after: "C3-05 或 C3-06",
        rule: "进入 C4-I。"
      },
      {
        after: "C4-04",
        rule: "如果 hidden.conflict >= 2 或 tags 包含 corrected_live，进入 C4-06；否则进入 C4-07。"
      },
      {
        after: "C4-06 或 C4-07",
        rule: "进入 C5-I。"
      }
    ],
    crisisRules: {
      trigger: "结果阶段后，如任一长期数值 <= DANGER_MAX，可能进入对应 CR-* 补救卡。",
      limits: "每周目最多 2 张危机卡；同一章节最多 1 张危机卡；已触发过的 stat 不重复触发。",
      returnFlow: "危机卡结束后返回原本的下一张主线卡。"
    },
    endingRules: {
      pages: ["E-01", "E-02", "E-03", "E-04"],
      passStyleInputs: "dangerous stats, safety, route strategies, energy, reputation, relationship, self, counters, exit_cost tag",
      topicReveal: "女性/处境等主题词只在终章后段出现。"
    }
  },
  content: {
    intros: clone(INTRO_CARDS),
    levels: clone(LEVEL_CARDS),
    settlements: clone(SETTLEMENT_CARDS),
    endings: clone(ENDING_CARDS),
    crises: clone(CRISIS_CARDS),
    inserts: clone(INSERT_CARDS),
    orderedCardIds: clone(orderedCardIds)
  }
};

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(`Generated ${outputPath}`);
