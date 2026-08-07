/**
 * components/Schedule/Header.jsx
 *
 * Top bar of the Schedule screen.
 * Shows "TRACK Weekend" on Saturday & Sunday, "TRACK [Day]" on all other days.
 *
 * Props:
 *   activeDay    {string}   - full day name e.g. "Monday" or "Sunday"
 *   onOpenPicker {function} - called when the + button is tapped
 */

import { scheduleStyles as s } from '../../styles/schedule'
import { GREEN }               from '../../styles/tokens'
import { isWeekendDay }        from '../../constants'

/** Maps a day name to its display label */
function displayLabel(day) {
  return isWeekendDay(day) ? 'Weekend' : day
}

export default function Header({ activeDay, onOpenPicker }) {
  return (
    <header style={s.header}>
      <div style={s.headerTitle}>
        <span style={s.trackWord}>TRACK</span>
        <span style={s.dayWord}>{displayLabel(activeDay)}</span>
      </div>

      <button
        style={s.plusBtn}
        onClick={onOpenPicker}
        aria-label="Add or change courses"
      >
        <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
          <line x1="11" y1="2"  x2="11" y2="20" stroke={GREEN} strokeWidth="4" strokeLinecap="round" />
          <line x1="2"  y1="11" x2="20" y2="11" stroke={GREEN} strokeWidth="4" strokeLinecap="round" />
        </svg>
      </button>
    </header>
  )
}
