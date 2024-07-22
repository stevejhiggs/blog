import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
	site: "https://www.shiggsatwork.co.uk",
	integrations: [
		mdx({
			syntaxHighlight: "shiki",
			shikiConfig: {
				theme: "github-dark-dimmed",
			},
			gfm: true,
		}),
		icon(),
		sitemap(),
		react(),
		tailwind({
			applyBaseStyles: false,
		}),
	],
	output: "static",
	adapter: netlify(),
});
