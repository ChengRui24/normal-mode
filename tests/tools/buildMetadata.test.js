import { describe, expect, it } from "vitest";
import packageInfo from "../../package.json";
import { formatRecordDate, getBuildMetadata } from "../../tools/buildMetadata.mjs";

describe("build metadata", () => {
  it("formats record dates in the homepage format", () => {
    expect(formatRecordDate(new Date("2026-07-05T00:30:00+08:00"))).toBe("2026.07.05");
  });

  it("uses the package version for the record version", () => {
    expect(getBuildMetadata().version).toBe(packageInfo.version);
  });
});
