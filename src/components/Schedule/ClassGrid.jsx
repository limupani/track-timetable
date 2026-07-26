/**
 * components/Schedule/ClassGrid.jsx
 *
 * Decides what to render in the scrollable content area:
 *   - Sunday        → Weekend screen (More from the Studio)
 *   - No picks      → EmptyDay (prompt to select courses)
 *   - Free day      → Comic viewer
 *   - Has classes   → 2-column ClassCard grid
 */

import { SUNDAY_IDX, DAYS } from '../../constants'
import { scheduleStyles as s } from '../../styles/schedule'
import ClassCard  from './ClassCard'
import EmptyDay   from './EmptyDay'
import Comic      from '../Comic'
import Weekend    from '../Weekend'
import Branding   from '../Branding'

export default function ClassGrid({
  activeDay,
  dayClasses,
  today,
  nowMin,
  selected,
  onOpenPicker,
}) {
  const isSunday  = activeDay === DAYS[SUNDAY_IDX]
  const hasPicks  = selected.size > 0
  const noClasses = dayClasses.length === 0

  /* Sunday — Weekend screen handles its own scroll and padding */
  if (isSunday) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <Weekend />
          <Branding />
        </div>
      </div>
    )
  }

  /* No courses selected yet */
  if (!hasPicks) {
    return (
      <div style={{ ...s.content }}>
        <EmptyDay selected={selected} onOpenPicker={onOpenPicker} />
        <Branding />
      </div>
    )
  }

  /* Courses selected but none today — show comic */
  if (noClasses) {
    return <Comic />
  }

  /* Normal class day */
  return (
    <div style={{ ...s.content }}>
      <div style={s.grid}>
        {dayClasses.map((session, i) => {
          const isNow =
            activeDay === today &&
            nowMin >= session.start &&
            nowMin < session.end
          return <ClassCard key={i} session={session} isNow={isNow} />
        })}
      </div>
      <Branding />
    </div>
  )
}
