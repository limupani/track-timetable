import { SUNDAY_IDX, DAYS } from '../../constants'
import { scheduleStyles as s } from '../../styles/schedule'
import ClassCard    from './ClassCard'
import SundaySplash from './SundaySplash'
import EmptyDay     from './EmptyDay'
import Comic        from '../Comic'
import Branding     from '../Branding'          // ← add

export default function ClassGrid({
  activeDay, dayClasses, today, nowMin, selected, onOpenPicker,
}) {
  const isSunday  = activeDay === DAYS[SUNDAY_IDX]
  const hasPicks  = selected.size > 0
  const noClasses = dayClasses.length === 0

  return (
    <div style={{ ...s.content, padding: '0' }}>
      {isSunday ? (
        <div style={{ padding: '0 16px 32px' }}>
          <SundaySplash />
          <Branding />
        </div>

      ) : !hasPicks ? (
        <div style={{ padding: '0 16px 32px' }}>
          <EmptyDay selected={selected} onOpenPicker={onOpenPicker} />
          <Branding />
        </div>

      ) : noClasses ? (
        // Comic handles its own scroll, so Branding goes inside ComicViewer
        <Comic />

      ) : (
        <div style={{ padding: '0 16px 32px' }}>
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
      )}
    </div>
  )
}