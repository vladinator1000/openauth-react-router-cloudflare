import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config"

// We're using Cloudflare's Vitest integration https://developers.cloudflare.com/workers/testing/vitest-integration/
export default defineWorkersConfig({
  test: {
    exclude: ["node_modules", "e2e-tests/**/*"],
    poolOptions: {
      workers: {
        wrangler: { configPath: "./wrangler.toml" },
        miniflare: {},
      },
    },
  },
})
