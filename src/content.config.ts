import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  // Type-check frontmatter using a schema
  schema: () =>
    z.object({
      title: z.string(),
      // shorter <title> for search results when the post title is long
      seoTitle: z.string().optional(),
      // used as the meta description, so it must not be empty
      description: z.string().min(1),
      cover: z.string(),
      category: z.string(),
      // Transform string to Date object
      pubDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      updatedDate: z
        .string()
        .optional()
        .transform((str) => (str ? new Date(str) : undefined))
    })
});

export const collections = { blog };
