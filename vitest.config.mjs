// Utilities
import { defineConfig } from "vitest/config";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  test: {
    include: ["tests/*"],
    testTimeout: 50000,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx"],
  },
}));
