/**
 * constants/index.js
 *
 * Single source of truth for every magic value used across the app.
 * If you need to rename a day, change the brand colour, or rotate the
 * storage key (e.g. to bust old cached data), do it here — nowhere else.
 */

/** Full day names in Mon-first order (matches the timetable sheet tabs). */
export const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',

  'Sunday',
]

/** Abbreviated labels shown on the day-tab bar. */
export const DAY_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun']

/** Index of Sunday in the DAYS array (used for the "coming soon" splash). */
export const SUNDAY_IDX = 6

/** Index of Saturday in the DAYS array (used alongside Sunday for the Weekend screen). */
export const SATURDAY_IDX = 5

/** Returns true if the given day name should show the Weekend screen. */
export function isWeekendDay(day) {
  return day === DAYS[SATURDAY_IDX] || day === DAYS[SUNDAY_IDX]
}

/** Brand accent colour. */
export const GREEN = '#C0EF7D'

/** Dark variant used for text on green backgrounds. */
export const GREEN_TEXT = '#1a5c00'

/** localStorage key for persisted course selections.
 *  Bump the version suffix (v1 → v2) if the data shape ever changes,
 *  so returning users get a clean slate instead of a parse error. */
export const STORAGE_KEY = 'track_selected_v1'

/** Path to the comic image served from the public/ folder.
 *  To update the comic: replace public/comic.jpg and redeploy. */
export const COMIC_SRC = '/comic.jpg'