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
  // Compression strips the newline between text and an inline element (e.g. "on\n<a>"),
  // gluing words together; keep source whitespace instead
  compressHTML: false,
  redirects: {
    // this post was accidentally published under a "-copy" slug from 2024 to 2026
    '/blog/why-i-use-ravendb-for-pretty-much-all-my-home-net-projects-copy': '/blog/why-i-use-ravendb-for-pretty-much-all-my-home-net-projects',
    // old pre-/blog/ URL for this post
    '/moving-to-gatsby': '/blog/moving-to-gatsby'
  },
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
  adapter: netlify({
    // Edge function emulation breaks with newer Deno and the site has no edge functions
    devFeatures: { environmentVariables: false, images: true, edgeFunctions: false }
  })
});
