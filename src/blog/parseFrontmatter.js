// Minimal frontmatter parser for our simple, controlled markdown files.
// Supports:
//   key: value
//   key: "quoted value"
//   key: |
//     multi
//     line value
export function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { meta: {}, content: raw };
  }
  const [, fmBlock, content] = match;
  const meta = {};
  const lines = fmBlock.split(/\r?\n/);
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!kv) {
      i++;
      continue;
    }
    const key = kv[1];
    let value = kv[2];
    if (value === '|') {
      const block = [];
      i++;
      while (i < lines.length && (lines[i].startsWith('  ') || lines[i].trim() === '')) {
        block.push(lines[i].replace(/^  /, ''));
        i++;
      }
      meta[key] = block.join('\n').trim();
      continue;
    }
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    meta[key] = value;
    i++;
  }
  return { meta, content: content.trim() };
}
