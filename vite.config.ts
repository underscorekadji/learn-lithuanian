import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    coverage: {
      all: true,
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/main.tsx",
        "src/vite-env.d.ts",
        "src/setupTests.ts",
        "src/**/*.stories.{ts,tsx}",
        "src/**/*.mock.{ts,tsx}",
        "**/*.d.ts",
        "node_modules/**",
        "dist/**",
      ],
    },
  },
});