/**
 * utils/courses.js
 *
 * Pure functions for working with course/session data.
 * No React imports — these can be used anywhere, including the parser script.
 *
 * A "combo" is a unique (courseCode, section) pair, enriched with the set of
 * instructors and days it appears on — used to populate the Picker list.
 */

/**
 * Builds the stable string key used to identify a course+section pair
 * in the selected-courses Set and in the picker.
 *
 * @param {string} code  - e.g. "DB"
 * @param {string} sec   - e.g. "BCS-5M"
 * @returns {string}     - e.g. "DB||BCS-5M"
 */
export function pickerKey(code, sec) {
  return `${code}||${sec}`
}

/**
 * Derives the sorted list of unique course+section combos from a flat
 * sessions array. This is the data source for the Picker list.
 *
 * @param {Array} sessions - raw SESSIONS array from data/sessions.js
 * @returns {Array<{ key, code, sec, instrs: Set, days: Set }>}
 */
export function buildCombos(sessions) {
  const map = new Map()

  sessions.forEach(s => {
    const k = pickerKey(s.code, s.sec)
    if (!map.has(k)) {
      map.set(k, {
        key:    k,
        code:   s.code,
        sec:    s.sec,
        instrs: new Set(),
        days:   new Set(),
      })
    }
    const entry = map.get(k)
    entry.instrs.add(s.instr)
    entry.days.add(s.day)
  })

  return [...map.values()].sort(
    (a, b) => a.code.localeCompare(b.code) || a.sec.localeCompare(b.sec)
  )
}

/**
 * Filters a combos array by a free-text query.
 * Matches against course code, section, and instructor names.
 *
 * @param {Array}  combos - output of buildCombos()
 * @param {string} query  - raw search string (case-insensitive)
 * @returns {Array}
 */
export function filterCombos(combos, query) {
  const q = query.trim().toLowerCase()
  if (!q) return combos
  return combos.filter(c => {
    const hay = `${c.code} ${c.sec} ${[...c.instrs].join(' ')}`.toLowerCase()
    return hay.includes(q)
  })
}

/**
 * Groups a flat combos array by course code.
 * Returns an array of [code, combos[]] pairs, preserving sort order.
 *
 * @param {Array} combos
 * @returns {Array<[string, Array]>}
 */
export function groupByCode(combos) {
  const map = new Map()
  combos.forEach(c => {
    if (!map.has(c.code)) map.set(c.code, [])
    map.get(c.code).push(c)
  })
  return [...map.entries()]
}

/**
 * Returns the sessions for a given day that the user is enrolled in,
 * sorted by start time.
 *
 * @param {Array}  sessions - raw SESSIONS array
 * @param {string} day      - full day name e.g. "Monday"
 * @param {Set}    selected - Set of pickerKey strings
 * @returns {Array}
 */
export function getDayClasses(sessions, day, selected) {
  return sessions
    .filter(s => s.day === day && selected.has(pickerKey(s.code, s.sec)))
    .sort((a, b) => a.start - b.start)
}
