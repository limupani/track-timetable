/**
 * components/Schedule/DayTabs.jsx
 *
 * Row of seven thin horizontal bars — one per day of the week.
 * The active day's bar is taller and black; the rest are grey.
 * Tapping a bar switches the active day.
 *
 * Props:
 *   activeDay  {string}             - full day name e.g. "Monday"
 *   onDayChange {(day: string) => void}
 */

import { DAYS } from '../../constants'
import { scheduleStyles as s } from '../../styles/schedule'

export default function DayTabs({ activeDay, onDayChange }) {
  return (
    <div style={s.tabsRow}>
      {DAYS.map(day => {
        const isActive = day === activeDay
        return (
          <button
            key={day}
            onClick={() => onDayChange(day)}
            style={s.tab}
            aria-label={day}
            aria-pressed={isActive}
          >
            <div style={{
              ...s.tabBar,
              background: isActive ? '#111111' : '#DDDDDD',
              height:     isActive ? 4 : 3,
            }} />
          </button>
        )
      })}
    </div>
  )
}
