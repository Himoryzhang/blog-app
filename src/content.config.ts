import { file, glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: "src/content/blog/posts", generateId: (file) => {
    console.log(file);
    return file.entry.split('/').pop()?.replace('.md', '') ?? '';
  }}),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
  })
});

const about = defineCollection({
  loader: glob({ pattern: 'about.md', base: "src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
  })
})

export const collections = {
  blog,
  about
};