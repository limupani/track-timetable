/**
 * components/Schedule/Header.jsx
 *
 * Top bar of the Schedule screen.
 * Shows the TRACK wordmark, the currently active day name, and
 * the green + button that opens the course picker.
 *
 * Props:
 *   activeDay    {string}   - full day name e.g. "Monday"
 *   onOpenPicker {function} - called when the + button is tapped
 */

import { scheduleStyles as s } from '../../styles/schedule'
import { GREEN_DEEP } from '../../styles/tokens'

export default function Header({ activeDay, onOpenPicker }) {
  return (
    <header style={s.header}>
      <div style={s.headerTitle}>
        <span style={s.trackWord}>TRACK</span>
        <span style={s.dayWord}>{activeDay}</span>
      </div>

      <button style={s.plusBtn} onClick={onOpenPicker} aria-label="Add or change courses">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <line x1="11" y1="2"  x2="11" y2="20" stroke={GREEN_DEEP} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="2"  y1="11" x2="20" y2="11" stroke={GREEN_DEEP} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </button>
    </header>
  )
}
