// Regenerates sitemap.xml in dist/ from the landing page + every blog post
// markdown file. Runs automatically as part of `npm run build`.
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const contentDir = path.join(root, 'src/blog/content');
const distDir = path.join(root, 'dist');

const SITE_URL = 'https://youworldenglish.com';

function parseFrontmatterSlugAndDate(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_]+):\s*"?(.*?)"?\s*$/);
    if (kv) fm[kv[1]] = kv[2];
  }
  return fm;
}

const files = readdirSync(contentDir).filter((f) => f.endsWith('.md'));

const urls = [
  { loc: `${SITE_URL}/`, lastmod: null },
  { loc: `${SITE_URL}/blog`, lastmod: null },
];

for (const file of files) {
  const raw = readFileSync(path.join(contentDir, file), 'utf-8');
  const fm = parseFrontmatterSlugAndDate(raw);
  const slug = fm.slug || file.replace(/\.md$/, '');
  urls.push({ loc: `${SITE_URL}/blog/${slug}`, lastmod: fm.date || null });
}

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n` +
        (u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : '') +
        `  </url>`
    )
    .join('\n') +
  `\n</urlset>\n`;

writeFileSync(path.join(distDir, 'sitemap.xml'), xml);
console.log(`sitemap.xml generated with ${urls.length} URLs`);
