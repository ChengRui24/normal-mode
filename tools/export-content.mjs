import * as levels from "../src/data/levels.js";
import * as statConfig from "../src/data/statConfig.js";
import { exportContentTables } from "./contentTables.mjs";

const outDir = process.argv[2] ?? "content-tables";

await exportContentTables({ outDir, levels, statConfig });
console.log(`Exported content tables to ${outDir}`);
