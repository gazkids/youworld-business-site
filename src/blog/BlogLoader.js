import { parseFrontmatter } from './parseFrontmatter.js';

// Eagerly import every markdown file's raw text at build time.
const modules = import.meta.glob('./content/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function slugFromPath(path) {
  const file = path.split('/').pop();
  return file.replace(/\.md$/, '');
}

const posts = Object.entries(modules).map(([path, raw]) => {
  const { meta, content } = parseFrontmatter(raw);
  const slug = meta.slug || slugFromPath(path);
  return {
    slug,
    title: meta.title || slug,
    date: meta.date || '',
    excerpt: meta.excerpt || '',
    image: meta.image || '',
    youworldView: meta.youworldView || '',
    source: meta.source || '',
    sourceUrl: meta.sourceUrl || '',
    content,
  };
});

// Newest first.
posts.sort((a, b) => (a.date < b.date ? 1 : -1));

export function getAllPosts() {
  return posts;
}

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug) || null;
}
