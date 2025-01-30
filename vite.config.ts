/// <reference types="vitest" />
import { reactRouter } from "@react-router/dev/vite"
import { cloudflareDevProxy } from "@react-router/dev/vite/cloudflare"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import { getLoadContext } from "./app/load-context"

export default defineConfig((options) => {
  return {
    build: {
      rollupOptions: options.isSsrBuild
        ? {
            input: "./app/worker.ts",
          }
        : undefined,
    },
    plugins: [
      cloudflareDevProxy({ getLoadContext }),
      reactRouter(),
      tsconfigPaths(),
    ],
  }
})
