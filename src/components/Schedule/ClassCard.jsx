import { fmtTime }               from '../../utils/time'
import { formatRoom, formatCode } from '../../utils/courses'   // ← add formatCode
import { scheduleStyles as s }   from '../../styles/schedule'

export default function ClassCard({ session, isNow }) {
  const start       = fmtTime(session.start)
  const room        = formatRoom(session.room)
  const displayCode = formatCode(session.code.replace(/\s*lab$/i, '').trim()) // ← updated

  return (
    <article style={{ ...s.card, ...(isNow ? s.cardNow : s.cardDefault) }}>
      <div style={s.cardTop}>
        <div>
          <div style={s.cardRoom}>{room}</div>
          <div style={s.cardSection}>{session.sec}</div>
        </div>
        <div style={s.cardCode}>
          {displayCode}
          {session.lab && <span style={s.labTag}>LAB</span>}
        </div>
      </div>

      <div style={s.cardTime}>
        <span style={s.cardHour}>{start.h}</span>
        <span style={s.cardAmpm}>{start.ampm}</span>
      </div>

      <div style={s.cardInstr}>{session.instr}</div>
      {isNow && <span style={s.nowBadge}>Now</span>}
    </article>
  )
}