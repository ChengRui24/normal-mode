import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const defaultRootDir = dirname(dirname(fileURLToPath(import.meta.url)));

export function formatRecordDate(date = new Date()) {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Singapore",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  })
    .format(date)
    .replaceAll("-", ".");
}

export function getBuildMetadata(rootDir = defaultRootDir, date = new Date()) {
  const packageInfo = JSON.parse(readFileSync(resolve(rootDir, "package.json"), "utf8"));

  return {
    version: packageInfo.version,
    recordDate: formatRecordDate(date)
  };
}
