import mdx from '@astrojs/mdx';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.shiggsatwork.co.uk',
  integrations: [
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        theme: 'github-dark-dimmed'
      },
      gfm: true
    }),
    icon(),
    sitemap(),
    react()
  ],
  vite: {
    plugins: [tailwindcss()]
  },
  output: 'static',
  adapter: netlify()
});
