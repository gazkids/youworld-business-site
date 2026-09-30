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

// Scheduled-post dates are written as plain "YYYY-MM-DD" and are meant to
// represent JST midnight (this site's editorial timezone). JS's built-in
// Date parser treats a date-only string as UTC midnight, which would delay
// visibility by 9 hours (until 9:00 JST) on publish day. This helper parses
// the date as JST midnight explicitly so posts go live at 0:00 JST as intended.
function parseAsJstMidnight(dateStr) {
  return new Date(`${dateStr}T00:00:00+09:00`);
}

// Newest first.
posts.sort((a, b) => (a.date < b.date ? 1 : -1));

// Scheduled publishing: hide posts whose date is still in the future.
// Evaluated fresh on every page load, so a post becomes visible on its
// own the moment the date arrives (0:00 JST) — no rebuild required for
// visibility, as long as the post file is already in the build.
const now = new Date();
const visiblePosts = posts.filter((p) => !p.date || parseAsJstMidnight(p.date) <= now);

export function getAllPosts() {
  return visiblePosts;
}

export function getPostBySlug(slug) {
  return visiblePosts.find((p) => p.slug === slug) || null;
}
