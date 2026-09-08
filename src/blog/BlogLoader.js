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

// Scheduled publishing: hide posts whose date is still in the future.
// Evaluated fresh on every page load, so a post becomes visible on its
// own the moment the date arrives — no rebuild required for visibility.
const now = new Date();
const visiblePosts = posts.filter((p) => !p.date || new Date(p.date) <= now);

export function getAllPosts() {
  return visiblePosts;
}

export function getPostBySlug(slug) {
  return visiblePosts.find((p) => p.slug === slug) || null;
}
