import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";
import db from "@astrojs/db";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  experimental: {
    actions: true,
  },
  integrations: [db(), preact(), tailwind()],
  output: "server",
});
