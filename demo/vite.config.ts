import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    port: 5180,
    strictPort: false,
    fs: {
      allow: [resolve(process.cwd(), "..")],
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
