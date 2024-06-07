import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";
import db from "@astrojs/db";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  experimental: {
    actions: true,
  },
  integrations: [db(), solidJs(), tailwind()],
  output: "server",
});
