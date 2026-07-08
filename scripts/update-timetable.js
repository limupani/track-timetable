/**
 * update-timetable.js
 * 
 * Run this every new semester to refresh the timetable data.
 * 
 * Usage:
 *   node scripts/update-timetable.js path/to/timetable.xlsx
 * 
 * Or with npm:
 *   npm run update-timetable -- path/to/timetable.xlsx
 * 
 * It will overwrite src/data/sessions.js with the new data.
 * Then just redeploy to Vercel and you're done.
 */

const XLSX = require('xlsx');
const fs   = require('fs');
const path = require('path');

/* ── 1. Read the file path from the command line ─────────────── */
const xlsxPath = process.argv[2];

if (!xlsxPath) {
  console.error('\n  ❌  Please provide the path to your timetable .xlsx file.');
  console.error('  Example:  node scripts/update-timetable.js ~/Downloads/timetable.xlsx\n');
  process.exit(1);
}

if (!fs.existsSync(xlsxPath)) {
  console.error(`\n  ❌  File not found: ${xlsxPath}\n`);
  process.exit(1);
}

console.log(`\n  📂  Reading: ${xlsxPath}`);

/* ── 2. Parser helpers ───────────────────────────────────────── */
const DAY_NAMES   = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const SECTION_RE  = /^[A-Z]{2,5}-\d[A-Z0-9()., ]*$/i;
const RESERVED_RE = /^reserved\b/i;
const JUMMA_RE    = /jumma/i;

function timeToMins(token, pmHint) {
  const m = String(token).trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return null;
  let h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  if (pmHint && h < 12) h += 12;
  if (h === 24) h = 12;
  return h * 60 + min;
}

function parseSlotHeaders(headerRow) {
  const slots = [];
  let crossedNoon = false;
  for (let c = 1; c < headerRow.length; c++) {
    const raw = headerRow[c];
    if (!raw) continue;
    const m = String(raw).match(/(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/);
    if (!m) continue;
    let pmHint = crossedNoon;
    if (parseInt(m[1].split(':')[0], 10) === 12) { pmHint = true; crossedNoon = true; }
    slots.push({
      col:   c,
      start: timeToMins(m[1], pmHint),
      end:   timeToMins(m[2], pmHint),
    });
  }
  return slots;
}

function findHeaderRow(rows) {
  for (let r = 0; r < Math.min(rows.length, 10); r++) {
    const row = rows[r] || [];
    let hits = 0;
    row.forEach(cell => {
      if (cell && /\d{1,2}:\d{2}\s*-\s*\d{1,2}:\d{2}/.test(String(cell))) hits++;
    });
    if (hits >= 2) return r;
  }
  return -1;
}

function parseCell(value) {
  if (value == null) return null;
  const text = String(value).trim();
  if (!text || RESERVED_RE.test(text) || JUMMA_RE.test(text)) return null;

  const lines  = text.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
  const first  = lines[0] || '';
  const instr  = lines.slice(1).join(' ').trim();
  const tokens = first.split(/\s+/);

  let section = null, codeTokens = tokens;
  for (let i = tokens.length - 1; i >= 0; i--) {
    if (SECTION_RE.test(tokens[i])) {
      section    = tokens[i];
      codeTokens = tokens.slice(0, i);
      break;
    }
  }
  if (!section) return null;

  const code = codeTokens.join(' ').trim() || first;
  return { code, section, instr: instr || '—' };
}

function parseDaySheet(ws, dayName) {
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: null, raw: false });
  const headerIdx = findHeaderRow(rows);
  if (headerIdx === -1) return [];

  const slots     = parseSlotHeaders(rows[headerIdx]);
  const slotByCol = new Map(slots.map(s => [s.col, s]));

  // Build a map of merged cell ranges so we can work out a session's real end time.
  const merges = ws['!merges'] || [];
  const mergeMap = new Map();
  merges.forEach(m => {
    for (let r = m.s.r; r <= m.e.r; r++)
      for (let c = m.s.c; c <= m.e.c; c++)
        mergeMap.set(`${r},${c}`, m);
  });

  const sessions = [];

  for (let r = headerIdx + 1; r < rows.length; r++) {
    const row    = rows[r] || [];
    const rawRoom = row[0];
    if (!rawRoom) continue;
    const roomLabel = String(rawRoom).trim();
    if (/^(classrooms?|labs?)$/i.test(roomLabel)) continue;
    const room = roomLabel.replace(/\s*\(\d+\)\s*$/, '').trim();

    const handled = new Set();

    for (let c = 1; c < row.length; c++) {
      if (handled.has(c)) continue;
      const startSlot = slotByCol.get(c);
      if (!startSlot) continue;

      const value = row[c];
      if (value == null || String(value).trim() === '') continue;

      // Work out the end column (merged cells = multi-slot labs)
      const merge = mergeMap.get(`${r},${c}`);
      let endCol  = c;
      if (merge) {
        endCol = merge.e.c;
        for (let cc = merge.s.c; cc <= merge.e.c; cc++) handled.add(cc);
      }

      const endSlot = slotByCol.get(endCol) || startSlot;
      const parsed  = parseCell(value);
      if (!parsed) continue;

      sessions.push({
        day:   dayName,
        room,
        code:  parsed.code,
        sec:   parsed.section,
        instr: parsed.instr,
        start: startSlot.start,
        end:   endSlot.end,
        lab:   /\blab\b/i.test(parsed.code) || /\blab\b/i.test(room),
      });
    }
  }
  return sessions;
}

/* ── 3. Load workbook and parse each weekday sheet ───────────── */
let workbook;
try {
  workbook = XLSX.readFile(xlsxPath);
} catch (err) {
  console.error('\n  ❌  Could not read the file. Make sure it is a valid .xlsx export.\n');
  process.exit(1);
}

const allSessions = [];

for (const sheetName of workbook.SheetNames) {
  const norm  = sheetName.trim().toLowerCase();
  const match = DAY_NAMES.find(d => norm.startsWith(d.toLowerCase()));
  if (!match) continue; // skip "Reserved Days", "BS City Campus", etc.

  const daySessions = parseDaySheet(workbook.Sheets[sheetName], match);
  allSessions.push(...daySessions);
  console.log(`  ✅  ${match}: ${daySessions.length} sessions`);
}

if (allSessions.length === 0) {
  console.error('\n  ❌  No sessions found. Is this the right file?\n');
  process.exit(1);
}

/* ── 4. Write src/data/sessions.js ──────────────────────────── */
const outPath = path.join(__dirname, '..', 'src', 'data', 'sessions.js');

const fileContent =
  `// Auto-generated by scripts/update-timetable.js\n` +
  `// Do not edit by hand — run the script again to refresh.\n` +
  `// Last updated: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}\n` +
  `// Total sessions: ${allSessions.length}\n\n` +
  `export const SESSIONS = ${JSON.stringify(allSessions)};\n`;

fs.writeFileSync(outPath, fileContent, 'utf8');

console.log(`\n  🎉  Done! ${allSessions.length} sessions written to src/data/sessions.js`);
console.log(`  👉  Now run: git add . && git commit -m "Update timetable" && git push\n`);
