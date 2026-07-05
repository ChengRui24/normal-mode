import { readFile, writeFile } from "node:fs/promises";

const inputPath = process.argv[2] ?? "content-tables/normal_mode_text_rewrite_v0_8.json";
const releaseDate = process.argv[3] ?? "2026.07.05";

function toJs(value, level = 0) {
  const pad = "  ".repeat(level);
  const childPad = "  ".repeat(level + 1);

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    return `[\n${value.map((item) => `${childPad}${toJs(item, level + 1)}`).join(",\n")}\n${pad}]`;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value).filter(([, item]) => item !== undefined);
    if (entries.length === 0) return "{}";
    return `{\n${entries.map(([key, item]) => `${childPad}${JSON.stringify(key)}: ${toJs(item, level + 1)}`).join(",\n")}\n${pad}}`;
  }
  return JSON.stringify(value);
}

function withType(card, type, extras = {}) {
  return {
    ...card,
    type,
    ...extras
  };
}

function splitHomeLines(lines = []) {
  const groups = [[]];
  for (const line of lines) {
    if (line === "") {
      if (groups.at(-1).length > 0) groups.push([]);
    } else {
      groups.at(-1).push(line);
    }
  }
  return groups.filter((group) => group.length > 0);
}

function normalizeHome(home, version) {
  const groups = splitHomeLines(home.lines);
  return {
    title: home.title,
    subtitle: home.subtitle,
    primaryLines: groups[0] ?? [],
    secondaryLines: groups[1] ?? [],
    noteLine: groups[2] ?? [],
    metaLines: [
      ["序章 + 六章 + 终章", "约 10-15 分钟"],
      [`记录版本：v${version} · ${releaseDate}`]
    ],
    buttonLabel: home.buttonLabel
  };
}

function orderedIdsFor(intros, levels, endings) {
  return [
    ...intros.flatMap((intro) => [
      intro.id,
      ...levels.filter((level) => level.chapterId === intro.chapterId).map((level) => level.id)
    ]),
    ...endings.map((ending) => ending.id)
  ];
}

function levelsSource({ intros, levels, endings, crises, orderedCardIds }) {
  return `export const INTRO_CARDS = ${toJs(intros)};\n\n` +
    `export const LEVEL_CARDS = ${toJs(levels)};\n\n` +
    `export const SETTLEMENT_CARDS = [];\n\n` +
    `export const ENDING_CARDS = ${toJs(endings)};\n\n` +
    `export const CRISIS_CARDS = ${toJs(crises)};\n\n` +
    `export const INSERT_CARDS = [];\n\n` +
    `export const orderedCardIds = ${toJs(orderedCardIds)};\n\n` +
    `const cardsById = new Map(\n` +
    `  [...INTRO_CARDS, ...LEVEL_CARDS, ...SETTLEMENT_CARDS, ...ENDING_CARDS, ...CRISIS_CARDS, ...INSERT_CARDS].map((card) => [\n` +
    `    card.id,\n` +
    `    card\n` +
    `  ])\n` +
    `);\n\n` +
    `export function getCardById(id) {\n` +
    `  return cardsById.get(id);\n` +
    `}\n`;
}

function textConfigSource(data) {
  return `export const TEXT_VERSION = ${toJs(data.version)};\n` +
    `export const RECORD_VERSION_DATE = ${toJs(releaseDate)};\n\n` +
    `export const HOME_CONTENT = ${toJs(normalizeHome(data.home, data.version))};\n\n` +
    `export const CHAPTER_ECHOES = ${toJs(data.chapterEchoes ?? {})};\n\n` +
    `export const REQUIREMENT_REASON_MAP = ${toJs(data.requirementsReasonMap ?? {})};\n`;
}

const data = JSON.parse(await readFile(inputPath, "utf8"));
const intros = data.intros.map((card) => withType(card, "chapterIntro"));
const levels = data.levels.map((card) => withType(card, "level"));
const endings = data.endings.map((card) => withType(card, "ending", {
  chapterId: "E",
  chapterTitle: "终章：普通难度"
}));
const crises = data.crises.map((card) => withType(card, "level", {
  chapterId: "CR",
  chapterTitle: "记录中断",
  crisis: true
}));
const orderedCardIds = orderedIdsFor(intros, levels, endings);

await writeFile("src/data/levels.js", levelsSource({ intros, levels, endings, crises, orderedCardIds }), "utf8");
await writeFile("src/data/textConfig.js", textConfigSource(data), "utf8");

console.log(`Imported text JSON from ${inputPath}`);
