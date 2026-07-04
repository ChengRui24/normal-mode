import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import * as levels from "../../src/data/levels.js";
import * as statConfig from "../../src/data/statConfig.js";
import {
  buildContentTables,
  buildDataModulesFromTables,
  exportContentTables,
  parseCsv,
  stringifyCsv
} from "../../tools/contentTables.mjs";

describe("content table tooling", () => {
  it("round-trips CSV values with Chinese text, commas, quotes, and newlines", () => {
    const csv = stringifyCsv(["id", "text"], [
      { id: "C1-01", text: "他说：“可以，继续。”\n你点了点头。" }
    ]);

    expect(parseCsv(csv)).toEqual([
      { id: "C1-01", text: "他说：“可以，继续。”\n你点了点头。" }
    ]);
  });

  it("exports cards, choices, triggers, and stat config tables", () => {
    const tables = buildContentTables({ levels, statConfig });
    const cards = parseCsv(tables["cards.csv"]);
    const choices = parseCsv(tables["choices.csv"]);
    const triggers = parseCsv(tables["triggers.csv"]);
    const config = parseCsv(tables["stat-config.csv"]);

    expect(Object.keys(tables).sort()).toEqual([
      "cards.csv",
      "choices.csv",
      "stat-config.csv",
      "triggers.csv"
    ]);
    expect(cards.find((row) => row.id === "C3-04")?.scene).toContain("打车价格翻倍");
    expect(choices.find((row) => row.cardId === "C6-08" && row.id === "appeal")?.stat_energy).toBe("-2");
    expect(triggers.find((row) => row.cardId === "I-C3-footsteps")?.tagsAll).toBe("low_battery|night_quiet_route");
    expect(config.find((row) => row.section === "stat" && row.key === "money")?.label).toBe("钱");
  });

  it("builds importable data modules from edited tables", () => {
    const tables = buildContentTables({ levels, statConfig });
    const choices = parseCsv(tables["choices.csv"]);
    const editedChoices = choices.map((row) =>
      row.cardId === "C6-08" && row.id === "appeal"
        ? { ...row, result: "流程继续。你把这件事又往前推了一格。", stat_energy: "-3" }
        : row
    );

    const modules = buildDataModulesFromTables({
      ...tables,
      "choices.csv": stringifyCsv(Object.keys(choices[0]), editedChoices)
    });

    expect(modules.levelsSource).toContain("流程继续。你把这件事又往前推了一格。");
    expect(modules.levelsSource).toContain('"energy": -3');
    expect(modules.statConfigSource).toContain("export const STAT_KEYS");
    expect(modules.levelsSource).toContain("export function getCardById");
  });

  it("writes exported CSV files to the requested directory", async () => {
    const dir = await mkdtemp(join(tmpdir(), "ordinary-life-content-"));

    try {
      await exportContentTables({ outDir: dir, levels, statConfig });

      const choices = await readFile(join(dir, "choices.csv"), "utf8");
      expect(choices).toContain("cardId,choiceOrder,id,label,result");
      expect(choices).toContain("C6-08");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});
