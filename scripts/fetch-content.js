/**
 * fetch-content.js
 * Build-time script: fetches each Google Sheets tab as CSV,
 * parses it, and writes JSON to src/content/.
 *
 * Usage:
 *   node scripts/fetch-content.js
 *   (runs automatically via "prebuild" npm script)
 *
 * Sheet must be published publicly:
 *   File > Share > Publish to web > CSV
 *
 * Set SHEET_ID in .env or as an env var before running.
 */

import fs   from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env manually (no external dep needed)
try {
  const envPath = path.join(__dirname, '../.env');
  const envText = await fs.readFile(envPath, 'utf8');
  for (const line of envText.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx < 0) continue;
    const k = trimmed.slice(0, eqIdx).trim();
    const v = trimmed.slice(eqIdx + 1).trim();
    if (!(k in process.env)) process.env[k] = v;
  }
} catch { /* .env not present, rely on real env vars */ }
const OUT_DIR   = path.join(__dirname, '../src/content');

// ── Sheet config ─────────────────────────────────────────────────────────────
// Uses Apps Script web app — no caching, always returns live Sheet data
const APPS_SCRIPT_URL = process.env.VITE_APPS_SCRIPT_URL
  ?? 'https://script.google.com/macros/s/AKfycbzz-55HjHNY0B5uhbE-cwa33smUna5XPnzezYQ97EKE2NZeNcgMlZI0X06yYSK5BmTunQ/exec';

const TABS = [
  'pages',
  'services',
  'faq',
  'blog_posts',
  'testimonials',
  'team',
  'meta',
];

// ── CSV parser — RFC 4180 compliant (handles newlines inside quoted cells) ────
function parseCsv(text) {
  const rows = splitCsvRows(text.trim());
  if (rows.length < 2) return [];

  const headers = parseRow(rows[0]);
  return rows.slice(1).map(row => {
    const values = parseRow(row);
    return Object.fromEntries(headers.map((h, i) => [h.trim(), (values[i] ?? '').trim()]));
  }).filter(row => Object.values(row).some(v => v !== ''));
}

// Splits CSV text into rows, respecting newlines inside quoted fields.
function splitCsvRows(text) {
  const rows = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];
    if (ch === '"') {
      if (inQuotes && next === '"') { cur += '"'; i++; }
      else inQuotes = !inQuotes;
      cur += ch;
    } else if ((ch === '\n' || (ch === '\r' && next === '\n')) && !inQuotes) {
      if (ch === '\r') i++; // skip \n in \r\n
      rows.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  if (cur.trim()) rows.push(cur);
  return rows;
}

function parseRow(line) {
  const cells = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { cur += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      cells.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  cells.push(cur);
  return cells;
}

// ── Fetch + write ─────────────────────────────────────────────────────────────
async function fetchTab(tab) {
  const url = `${APPS_SCRIPT_URL}?sheet=${encodeURIComponent(tab)}`;
  console.log(`  Fetching: ${tab}`);
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status} for tab "${tab}"`);
  const data = await res.json();
  return data;
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes('YOUR_')) {
    console.warn('\n⚠  No Apps Script URL set — preserving existing content files.\n');
    return;
  }

  let anyFetched = false;

  const results = await Promise.allSettled(TABS.map(async tab => {
    const outPath = path.join(OUT_DIR, `${tab}.json`);
    try {
      const data = await fetchTab(tab);
      await fs.writeFile(outPath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`  ✓ ${tab}.json (${data.length} rows)`);
      anyFetched = true;
    } catch (err) {
      // Preserve existing file if it exists; only warn, don't fail the build
      try {
        await fs.access(outPath);
        console.warn(`  ⚠  ${tab}: fetch failed — keeping existing file. (${err.message})`);
      } catch {
        // No existing file — write empty array as fallback
        await fs.writeFile(outPath, JSON.stringify([], null, 2), 'utf8');
        console.warn(`  ⚠  ${tab}: fetch failed, no existing file — wrote empty array. (${err.message})`);
      }
    }
  }));

  if (results.every(r => r.status === 'fulfilled')) {
    if (anyFetched) console.log('\n✅ Content fetched successfully.\n');
    else console.warn('\n⚠  Sheet not reachable — using existing local content.\n   Ensure your Sheet is published publicly when ready.\n');
  }
}

main().catch(err => { console.error(err); process.exit(1); });
