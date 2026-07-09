/**
 * utils/time.js
 *
 * Pure functions for working with time values.
 * All functions are framework-agnostic — no React imports.
 *
 * Times are stored as "minutes since midnight" (e.g. 8:00 AM = 480).
 */

import { DAYS } from '../constants'

/**
 * Converts minutes-since-midnight to a display object.
 * @param {number|null} mins
 * @returns {{ h: string, ampm: 'AM'|'PM' }}
 *
 * @example
 * fmtTime(480) // → { h: '8:00', ampm: 'AM' }
 * fmtTime(795) // → { h: '1:15', ampm: 'PM' }
 */
export function fmtTime(mins) {
  if (mins == null) return { h: '', ampm: '' }
  const totalH = Math.floor(mins / 60)
  const m      = mins % 60
  const ampm   = totalH >= 12 ? 'PM' : 'AM'
  let h12      = totalH % 12
  if (h12 === 0) h12 = 12
  return { h: `${h12}:${String(m).padStart(2, '0')}`, ampm }
}

/**
 * Returns the current time as minutes since midnight.
 * @returns {number}
 */
export function nowMinutes() {
  const n = new Date()
  return n.getHours() * 60 + n.getMinutes()
}

/**
 * Returns the index of today in the DAYS array (Mon = 0 … Sun = 6).
 * Converts from JS's Sunday-first getDay() to our Monday-first order.
 * @returns {number}
 */
export function todayIndex() {
  return (new Date().getDay() + 6) % 7
}

/**
 * Returns the full name of today (e.g. "Monday").
 * @returns {string}
 */
export function todayName() {
  return DAYS[todayIndex()]
}
