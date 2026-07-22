import { fmtTime } from '../../utils/time'
import { formatRoom } from '../../utils/courses'   // ← add this import
import { scheduleStyles as s } from '../../styles/schedule'

export default function ClassCard({ session, isNow }) {
  const start       = fmtTime(session.start)
  const displayCode = session.code.replace(/\s*lab$/i, '')
  const room        = formatRoom(session.room)      // ← add this line

  return (
    <article style={{ ...s.card, ...(isNow ? s.cardNow : s.cardDefault) }}>
      <div style={s.cardTop}>
        <div>
          <div style={s.cardRoom}>{room}</div>        {/* ← was session.room */}
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