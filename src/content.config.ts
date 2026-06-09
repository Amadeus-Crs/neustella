/**
 * Content Collections 配置 (Astro v6+)
 * 定义文章集合的 schema，确保每篇文章都有正确的 frontmatter
 */

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string().min(1).max(200),
    description: z.string().min(1).max(500),
    date: z.coerce.date(),
    category: z.enum(['tech', 'observe']),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
