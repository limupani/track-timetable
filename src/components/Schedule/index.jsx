import { scheduleStyles as s } from '../../styles/schedule'
import Header    from './Header'
import DayTabs   from './DayTabs'
import ClassGrid from './ClassGrid'

export default function Schedule({
  activeDay,
  dayClasses,
  today,
  nowMin,
  selected,
  onDayChange,
  onOpenPicker,
}) {
  return (
    <div style={s.screen}>
      <Header activeDay={activeDay} onOpenPicker={onOpenPicker} />
      <DayTabs activeDay={activeDay} onDayChange={onDayChange} />
      <ClassGrid
        activeDay={activeDay}
        dayClasses={dayClasses}
        today={today}
        nowMin={nowMin}
        selected={selected}
        onOpenPicker={onOpenPicker}
      />                         
    </div>
  )
}