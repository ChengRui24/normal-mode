import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const TABLE_FILES = ["cards.csv", "choices.csv", "triggers.csv", "stat-config.csv"];
const CARD_GROUPS = ["intro", "level", "settlement", "ending", "crisis", "insert"];
const ORDINARY_GROUPS = new Set(["intro", "level", "settlement", "ending"]);
const COUNTER_KEYS = [
  "detour",
  "seekHelp",
  "explain",
  "silence",
  "concede",
  "clearRefusal",
  "evidenceSaved",
  "paidSafety"
];

function empty(value) {
  return value == null || value === "";
}

function csvCell(value) {
  const text = value == null ? "" : String(value);
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function stringifyCsv(headers, rows) {
  return [
    headers.map(csvCell).join(","),
    ...rows.map((row) => headers.map((header) => csvCell(row[header])).join(","))
  ].join("\n") + "\n";
}

export function parseCsv(source) {
  const text = source.replace(/^\uFEFF/, "");
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (quoted) {
      if (char === '"' && next === '"') {
        cell += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        cell += char;
      }
      continue;
    }

    if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else if (char !== "\r") {
      cell += char;
    }
  }

  if (cell !== "" || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  if (rows.length === 0) return [];
  const headers = rows[0];
  return rows
    .slice(1)
    .filter((items) => items.some((item) => item !== ""))
    .map((items) => Object.fromEntries(headers.map((header, index) => [header, items[index] ?? ""])));
}

function listValue(items = []) {
  return items.join("|");
}

function parseList(value) {
  return empty(value) ? [] : value.split("|").filter(Boolean);
}

function numberValue(value, label) {
  if (empty(value)) return undefined;
  if (value === "Number.NEGATIVE_INFINITY") return Number.NEGATIVE_INFINITY;
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new Error(`${label} must be a number, got "${value}"`);
  }
  return number;
}

function numberRecord(row, keys, prefix, label) {
  const record = {};
  for (const key of keys) {
    const value = numberValue(row[`${prefix}${key}`], `${label}.${key}`);
    if (value !== undefined) record[key] = value;
  }
  return record;
}

function sortedRows(rows) {
  return [...rows].sort((a, b) => Number(a.order || 0) - Number(b.order || 0));
}

function groupRowsBy(rows, keyForRow) {
  const grouped = new Map();
  for (const row of rows) {
    const key = keyForRow(row);
    grouped.set(key, [...(grouped.get(key) ?? []), row]);
  }
  return grouped;
}

function configFromStatConfig(statConfig) {
  return {
    statKeys: statConfig.STAT_KEYS,
    hiddenKeys: statConfig.HIDDEN_KEYS,
    statLabels: statConfig.STAT_LABELS,
    initialStats: statConfig.INITIAL_STATS,
    statMin: statConfig.STAT_MIN,
    statMax: statConfig.STAT_MAX,
    dangerMax: statConfig.DANGER_MAX,
    chapterVisibleStats: statConfig.CHAPTER_VISIBLE_STATS,
    stateWords: statConfig.STATE_WORDS
  };
}

function configFromTable(rows) {
  const statRows = sortedRows(rows.filter((row) => row.section === "stat"));
  const hiddenRows = sortedRows(rows.filter((row) => row.section === "hidden"));
  const chapterRows = sortedRows(rows.filter((row) => row.section === "chapter"));
  const stateWordRows = sortedRows(rows.filter((row) => row.section === "stateWord"));
  const limits = Object.fromEntries(
    rows
      .filter((row) => row.section === "limit")
      .map((row) => [row.key, numberValue(row.value, `limit.${row.key}`)])
  );

  return {
    statKeys: statRows.map((row) => row.key),
    hiddenKeys: hiddenRows.map((row) => row.key),
    statLabels: Object.fromEntries(statRows.map((row) => [row.key, row.label])),
    initialStats: Object.fromEntries(statRows.map((row) => [row.key, numberValue(row.value, `stat.${row.key}`)])),
    statMin: limits.STAT_MIN ?? 0,
    statMax: limits.STAT_MAX ?? 12,
    dangerMax: limits.DANGER_MAX ?? 2,
    chapterVisibleStats: Object.fromEntries(chapterRows.map((row) => [row.key, parseList(row.stats)])),
    stateWords: stateWordRows.map((row) => ({
      min: numberValue(row.min, `stateWord.${row.order}`),
      word: row.word
    }))
  };
}

function cardRowsFor(group, cards, orderedCardIds) {
  return cards.map((card, index) => ({
    group,
    order: index,
    playOrder: ORDINARY_GROUPS.has(group) ? orderedCardIds.indexOf(card.id) : "",
    id: card.id,
    type: card.type,
    chapterId: card.chapterId,
    chapterTitle: card.chapterTitle,
    kicker: card.kicker,
    title: card.title,
    text: card.text,
    scene: card.scene,
    content: card.content,
    objective: card.objective,
    buttonLabel: card.buttonLabel,
    reveal: card.reveal,
    themePrimary: card.theme?.primary,
    themeSurface: card.theme?.surface,
    themeAccent: card.theme?.accent,
    insert: card.insert ? "true" : "",
    crisis: card.crisis ? "true" : "",
    stat: card.stat
  }));
}

function choiceRowsFor(cards, config) {
  return cards.flatMap((card) =>
    (card.choices ?? []).map((choice, index) => {
      const row = {
        cardId: card.id,
        choiceOrder: index,
        id: choice.id,
        label: choice.label,
        result: choice.result,
        tagsAdded: listValue(choice.tagsAdded),
        visibleChanges: listValue(choice.visibleChanges),
        requirementReason: choice.requirements?.reason
      };

      for (const key of config.statKeys) {
        row[`stat_${key}`] = choice.effects?.[key] ?? "";
        row[`require_${key}`] = choice.requirements?.minStats?.[key] ?? "";
      }
      for (const key of config.hiddenKeys) row[`hidden_${key}`] = choice.hiddenEffects?.[key] ?? "";
      for (const key of COUNTER_KEYS) row[`track_${key}`] = choice.track?.[key] ?? "";

      return row;
    })
  );
}

function triggerRowsFor(cards, config) {
  return cards
    .filter((card) => card.trigger)
    .map((card) => {
      const row = {
        cardId: card.id,
        afterCardId: card.trigger.afterCardId,
        tagsAll: listValue(card.trigger.tagsAll)
      };

      for (const key of config.statKeys) {
        row[`statMin_${key}`] = card.trigger.statMin?.[key] ?? "";
        row[`statMax_${key}`] = card.trigger.statMax?.[key] ?? "";
      }
      for (const key of config.hiddenKeys) {
        row[`hiddenMin_${key}`] = card.trigger.hiddenMin?.[key] ?? "";
        row[`hiddenMax_${key}`] = card.trigger.hiddenMax?.[key] ?? "";
      }

      return row;
    });
}

function statConfigRows(config) {
  return [
    ...config.statKeys.map((key, index) => ({
      section: "stat",
      order: index,
      key,
      label: config.statLabels[key],
      value: config.initialStats[key]
    })),
    ...config.hiddenKeys.map((key, index) => ({
      section: "hidden",
      order: index,
      key
    })),
    { section: "limit", key: "STAT_MIN", value: config.statMin },
    { section: "limit", key: "STAT_MAX", value: config.statMax },
    { section: "limit", key: "DANGER_MAX", value: config.dangerMax },
    ...Object.entries(config.chapterVisibleStats).map(([key, stats], index) => ({
      section: "chapter",
      order: index,
      key,
      stats: listValue(stats)
    })),
    ...config.stateWords.map((item, index) => ({
      section: "stateWord",
      order: index,
      min: item.min === Number.NEGATIVE_INFINITY ? "Number.NEGATIVE_INFINITY" : item.min,
      word: item.word
    }))
  ];
}

export function buildContentTables({ levels, statConfig }) {
  const config = configFromStatConfig(statConfig);
  const cards = [
    ...cardRowsFor("intro", levels.INTRO_CARDS, levels.orderedCardIds),
    ...cardRowsFor("level", levels.LEVEL_CARDS, levels.orderedCardIds),
    ...cardRowsFor("settlement", levels.SETTLEMENT_CARDS, levels.orderedCardIds),
    ...cardRowsFor("ending", levels.ENDING_CARDS, levels.orderedCardIds),
    ...cardRowsFor("crisis", levels.CRISIS_CARDS, levels.orderedCardIds),
    ...cardRowsFor("insert", levels.INSERT_CARDS, levels.orderedCardIds)
  ];
  const choiceCards = [...levels.LEVEL_CARDS, ...levels.CRISIS_CARDS, ...levels.INSERT_CARDS];

  const cardHeaders = [
    "group",
    "order",
    "playOrder",
    "id",
    "type",
    "chapterId",
    "chapterTitle",
    "kicker",
    "title",
    "text",
    "scene",
    "content",
    "objective",
    "buttonLabel",
    "reveal",
    "themePrimary",
    "themeSurface",
    "themeAccent",
    "insert",
    "crisis",
    "stat"
  ];
  const choiceHeaders = [
    "cardId",
    "choiceOrder",
    "id",
    "label",
    "result",
    ...config.statKeys.map((key) => `stat_${key}`),
    ...config.hiddenKeys.map((key) => `hidden_${key}`),
    "tagsAdded",
    "visibleChanges",
    ...COUNTER_KEYS.map((key) => `track_${key}`),
    ...config.statKeys.map((key) => `require_${key}`),
    "requirementReason"
  ];
  const triggerHeaders = [
    "cardId",
    "afterCardId",
    "tagsAll",
    ...config.statKeys.flatMap((key) => [`statMin_${key}`, `statMax_${key}`]),
    ...config.hiddenKeys.flatMap((key) => [`hiddenMin_${key}`, `hiddenMax_${key}`])
  ];
  const statHeaders = ["section", "order", "key", "label", "value", "chapter", "stats", "min", "word"];

  return {
    "cards.csv": stringifyCsv(cardHeaders, cards),
    "choices.csv": stringifyCsv(choiceHeaders, choiceRowsFor(choiceCards, config)),
    "triggers.csv": stringifyCsv(triggerHeaders, triggerRowsFor(levels.INSERT_CARDS, config)),
    "stat-config.csv": stringifyCsv(statHeaders, statConfigRows(config))
  };
}

function compactObject(object) {
  return Object.fromEntries(
    Object.entries(object).filter(([, value]) => {
      if (value === undefined || value === "") return false;
      if (Array.isArray(value)) return value.length > 0;
      if (value && typeof value === "object") return Object.keys(value).length > 0;
      return true;
    })
  );
}

function buildChoice(row, config) {
  const effects = numberRecord(row, config.statKeys, "stat_", `${row.cardId}.${row.id}.effects`);
  const hiddenEffects = numberRecord(row, config.hiddenKeys, "hidden_", `${row.cardId}.${row.id}.hiddenEffects`);
  const track = numberRecord(row, COUNTER_KEYS, "track_", `${row.cardId}.${row.id}.track`);
  const minStats = numberRecord(row, config.statKeys, "require_", `${row.cardId}.${row.id}.requirements`);
  const choice = {
    id: row.id,
    label: row.label,
    result: row.result,
    effects
  };

  if (Object.keys(hiddenEffects).length > 0) choice.hiddenEffects = hiddenEffects;
  if (!empty(row.tagsAdded)) choice.tagsAdded = parseList(row.tagsAdded);
  if (!empty(row.visibleChanges)) choice.visibleChanges = parseList(row.visibleChanges);
  if (Object.keys(track).length > 0) choice.track = track;
  if (Object.keys(minStats).length > 0 || !empty(row.requirementReason)) {
    choice.requirements = compactObject({
      minStats: Object.keys(minStats).length > 0 ? minStats : undefined,
      reason: row.requirementReason
    });
  }

  return choice;
}

function buildCards(cardRows, choiceRows, triggerRows, config) {
  const choicesByCard = groupRowsBy(choiceRows, (row) => row.cardId);
  const triggersByCard = new Map(triggerRows.map((row) => [row.cardId, row]));

  return cardRows.map((row) => {
    if (!CARD_GROUPS.includes(row.group)) throw new Error(`Unknown card group "${row.group}" for ${row.id}`);
    const card = compactObject({
      id: row.id,
      type: row.type,
      chapterId: row.chapterId,
      chapterTitle: row.chapterTitle,
      kicker: row.kicker,
      title: row.title,
      text: row.text,
      scene: row.scene,
      content: row.content,
      objective: row.objective,
      buttonLabel: row.buttonLabel,
      reveal: row.reveal,
      stat: row.stat
    });

    if (!empty(row.themePrimary) || !empty(row.themeSurface) || !empty(row.themeAccent)) {
      card.theme = compactObject({
        primary: row.themePrimary,
        surface: row.themeSurface,
        accent: row.themeAccent
      });
    }
    if (row.insert === "true") card.insert = true;
    if (row.crisis === "true") card.crisis = true;

    const choiceRowsForCard = choicesByCard.get(row.id);
    if (choiceRowsForCard) {
      card.choices = sortedRows(choiceRowsForCard.map((choice) => ({ ...choice, order: choice.choiceOrder }))).map((choice) =>
        buildChoice(choice, config)
      );
    }

    const trigger = triggersByCard.get(row.id);
    if (trigger) {
      card.trigger = compactObject({
        afterCardId: trigger.afterCardId,
        tagsAll: parseList(trigger.tagsAll),
        statMin: numberRecord(trigger, config.statKeys, "statMin_", `${row.id}.trigger.statMin`),
        statMax: numberRecord(trigger, config.statKeys, "statMax_", `${row.id}.trigger.statMax`),
        hiddenMin: numberRecord(trigger, config.hiddenKeys, "hiddenMin_", `${row.id}.trigger.hiddenMin`),
        hiddenMax: numberRecord(trigger, config.hiddenKeys, "hiddenMax_", `${row.id}.trigger.hiddenMax`)
      });
    }

    return card;
  });
}

function toJs(value, level = 0) {
  const pad = "  ".repeat(level);
  const childPad = "  ".repeat(level + 1);

  if (value === Number.NEGATIVE_INFINITY) return "Number.NEGATIVE_INFINITY";
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    return `[\n${value.map((item) => `${childPad}${toJs(item, level + 1)}`).join(",\n")}\n${pad}]`;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value);
    if (entries.length === 0) return "{}";
    return `{\n${entries.map(([key, item]) => `${childPad}${JSON.stringify(key)}: ${toJs(item, level + 1)}`).join(",\n")}\n${pad}}`;
  }
  return JSON.stringify(value);
}

function levelsSourceFromGroups(groups, orderedCardIds) {
  return `export const INTRO_CARDS = ${toJs(groups.intro)};\n\n` +
    `export const LEVEL_CARDS = ${toJs(groups.level)};\n\n` +
    `export const SETTLEMENT_CARDS = ${toJs(groups.settlement)};\n\n` +
    `export const ENDING_CARDS = ${toJs(groups.ending)};\n\n` +
    `export const CRISIS_CARDS = ${toJs(groups.crisis)};\n\n` +
    `export const INSERT_CARDS = ${toJs(groups.insert)};\n\n` +
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

function statConfigSourceFromConfig(config) {
  return `export const STAT_KEYS = ${toJs(config.statKeys)};\n\n` +
    `export const STAT_LABELS = ${toJs(config.statLabels)};\n\n` +
    `export const INITIAL_STATS = ${toJs(config.initialStats)};\n\n` +
    `export const STAT_MIN = ${toJs(config.statMin)};\n` +
    `export const STAT_MAX = ${toJs(config.statMax)};\n` +
    `export const DANGER_MAX = ${toJs(config.dangerMax)};\n\n` +
    `export const CHAPTER_VISIBLE_STATS = ${toJs(config.chapterVisibleStats)};\n\n` +
    `export const HIDDEN_KEYS = ${toJs(config.hiddenKeys)};\n\n` +
    `export const STATE_WORDS = ${toJs(config.stateWords)};\n`;
}

export function buildDataModulesFromTables(tables) {
  for (const file of TABLE_FILES) {
    if (!tables[file]) throw new Error(`Missing ${file}`);
  }

  const cardRows = parseCsv(tables["cards.csv"]);
  const choiceRows = parseCsv(tables["choices.csv"]);
  const triggerRows = parseCsv(tables["triggers.csv"]);
  const config = configFromTable(parseCsv(tables["stat-config.csv"]));
  const cards = buildCards(cardRows, choiceRows, triggerRows, config);
  const cardById = new Map(cards.map((card) => [card.id, card]));
  const groups = Object.fromEntries(
    CARD_GROUPS.map((group) => [
      group,
      sortedRows(
        cardRows
          .filter((row) => row.group === group)
          .map((row) => ({ ...cardById.get(row.id), order: row.order }))
      ).map(({ order, ...card }) => card)
    ])
  );
  const orderedCardIds = sortedRows(
    cardRows
      .filter((row) => !empty(row.playOrder))
      .map((row) => ({ id: row.id, order: row.playOrder }))
      .filter((row) => cardById.has(row.id))
  ).map((row) => row.id);

  return {
    levelsSource: levelsSourceFromGroups(groups, orderedCardIds),
    statConfigSource: statConfigSourceFromConfig(config)
  };
}

export async function exportContentTables({ outDir, levels, statConfig }) {
  const tables = buildContentTables({ levels, statConfig });
  await mkdir(outDir, { recursive: true });
  await Promise.all(Object.entries(tables).map(([file, source]) => writeFile(join(outDir, file), source, "utf8")));
  return tables;
}

export async function readContentTables(inDir) {
  return Object.fromEntries(
    await Promise.all(TABLE_FILES.map(async (file) => [file, await readFile(join(inDir, file), "utf8")]))
  );
}

export async function importContentTables({ inDir, levelsPath, statConfigPath }) {
  const modules = buildDataModulesFromTables(await readContentTables(inDir));
  await writeFile(levelsPath, modules.levelsSource, "utf8");
  await writeFile(statConfigPath, modules.statConfigSource, "utf8");
  return modules;
}
