/**
 * components/Schedule/ClassCard.jsx
 *
 * Displays a single scheduled class.
 * When the class is currently in progress, the card gets a green
 * background and a "Now" badge.
 *
 * Props:
 *   session {object}  - a session object from SESSIONS
 *   isNow   {boolean} - true when this class is happening right now
 */

import { fmtTime } from '../../utils/time'
import { scheduleStyles as s } from '../../styles/schedule'

export default function ClassCard({ session, isNow }) {
  const start       = fmtTime(session.start)
  const displayCode = session.code.replace(/\s*lab$/i, '')

  return (
    <article style={{
      ...s.card,
      ...(isNow ? s.cardNow : s.cardDefault),
    }}>
      {/* Room (top-left) and course code (top-right) */}
      <div style={s.cardTop}>
        <div>
          <div style={s.cardRoom}>{session.room}</div>
          <div style={s.cardSection}>{session.sec}</div>
        </div>
        <div style={s.cardCode}>
          {displayCode}
          {session.lab && <span style={s.labTag}>LAB</span>}
        </div>
      </div>

      {/* Large start time */}
      <div style={s.cardTime}>
        <span style={s.cardHour}>{start.h}</span>
        <span style={s.cardAmpm}>{start.ampm}</span>
      </div>

      {/* Instructor name */}
      <div style={s.cardInstr}>{session.instr}</div>

      {/* "Now" badge — only shown for the current class */}
      {isNow && <span style={s.nowBadge}>Now</span>}
    </article>
  )
}
