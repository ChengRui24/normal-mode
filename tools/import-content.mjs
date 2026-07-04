import { importContentTables } from "./contentTables.mjs";

const inDir = process.argv[2] ?? "content-tables";

await importContentTables({
  inDir,
  levelsPath: "src/data/levels.js",
  statConfigPath: "src/data/statConfig.js"
});

console.log(`Imported content tables from ${inDir}`);
