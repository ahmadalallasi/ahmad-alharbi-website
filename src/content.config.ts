import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    pubDate:     z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author:      z.string().default('Ahmad Alharbi'),
    image:       z.string().optional(),
    tags:        z.array(z.string()).default([]),
    category:    z.string().default('general'),
    featured:    z.boolean().default(false),
    draft:       z.boolean().default(false),
    lang:        z.enum(['ar', 'en']).default('ar'),
  }),
});

export const collections = { blog };
