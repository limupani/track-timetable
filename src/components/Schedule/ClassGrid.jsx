/**
 * components/Schedule/ClassGrid.jsx
 *
 * Decides what to render in the scrollable content area:
 *   - Sunday splash when the active day is Sunday.
 *   - EmptyDay when the student has no classes today.
 *   - A 2-column grid of ClassCards otherwise.
 *
 * Props:
 *   activeDay   {string}   - full day name e.g. "Monday"
 *   dayClasses  {Array}    - sessions for today filtered by selected courses
 *   today       {string}   - full name of the actual current day
 *   nowMin      {number}   - current time in minutes since midnight
 *   selected    {Set}      - set of selected pickerKey strings
 *   onOpenPicker {function}
 */

import { SUNDAY_IDX, DAYS } from '../../constants'
import { scheduleStyles as s } from '../../styles/schedule'
import ClassCard     from './ClassCard'
import SundaySplash  from './SundaySplash'
import EmptyDay      from './EmptyDay'

export default function ClassGrid({
  activeDay,
  dayClasses,
  today,
  nowMin,
  selected,
  onOpenPicker,
}) {
  const isSunday = activeDay === DAYS[SUNDAY_IDX]

  return (
    <div style={s.content}>
      {isSunday ? (
        <SundaySplash />
      ) : dayClasses.length === 0 ? (
        <EmptyDay selected={selected} onOpenPicker={onOpenPicker} />
      ) : (
        <div style={s.grid}>
          {dayClasses.map((session, i) => {
            const isNow =
              activeDay === today &&
              nowMin >= session.start &&
              nowMin < session.end
            return <ClassCard key={i} session={session} isNow={isNow} />
          })}
        </div>
      )}
    </div>
  )
}
