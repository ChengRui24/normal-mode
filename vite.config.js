import { defineConfig } from "vite";
import { getBuildMetadata } from "./tools/buildMetadata.mjs";

const buildMetadata = getBuildMetadata();

export default defineConfig({
  base: "/normal-mode/",
  define: {
    "globalThis.__NORMAL_MODE_VERSION__": JSON.stringify(buildMetadata.version),
    "globalThis.__NORMAL_MODE_BUILD_DATE__": JSON.stringify(buildMetadata.recordDate)
  }
});
