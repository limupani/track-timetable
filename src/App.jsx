import { useState, useEffect, useMemo, useCallback } from 'react'
import { SESSIONS } from './data/sessions'

/* ─────────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────────── */
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const DAY_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const GREEN = '#C0EF7D'
const STORAGE_KEY = 'track_selected_v1'

/* ─────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────── */
function fmtTime(mins) {
  if (mins == null) return ''
  const h = Math.floor(mins / 60)
  const m = mins % 60
  const ampm = h >= 12 ? 'PM' : 'AM'
  let h12 = h % 12
  if (h12 === 0) h12 = 12
  return { h: `${h12}:${String(m).padStart(2, '0')}`, ampm }
}

function pickerKey(code, sec) { return `${code}||${sec}` }

function todayName() {
  // getDay(): 0=Sun,1=Mon...6=Sat  →  DAYS[0]=Monday...DAYS[6]=Sunday
  const idx = (new Date().getDay() + 6) % 7
  return DAYS[idx]
}

function nowMinutes() {
  const n = new Date()
  return n.getHours() * 60 + n.getMinutes()
}

/* ─────────────────────────────────────────────────────────────
   App
───────────────────────────────────────────────────────────── */
export default function App() {
  const [activeDay, setActiveDay] = useState(todayName)
  const [selected, setSelected] = useState(new Set()) // Set of pickerKey strings
  const [showPicker, setShowPicker] = useState(false)
  const [query, setQuery] = useState('')
  const [nowMin, setNowMin] = useState(nowMinutes)

  // ── Load saved selections from localStorage ──────────────
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setSelected(new Set(JSON.parse(raw)))
    } catch { /* ignore */ }
  }, [])

  // ── Persist selections whenever they change ──────────────
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...selected]))
    } catch { /* ignore */ }
  }, [selected])

  // ── Tick the clock every minute for "Now" badges ─────────
  useEffect(() => {
    const id = setInterval(() => setNowMin(nowMinutes()), 60_000)
    return () => clearInterval(id)
  }, [])

  // ── Open picker if nothing selected on first visit ───────
  useEffect(() => {
    if (selected.size === 0) setShowPicker(true)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Unique course+section combos for the picker ──────────
  const allCombos = useMemo(() => {
    const map = new Map()
    SESSIONS.forEach(s => {
      const k = pickerKey(s.code, s.sec)
      if (!map.has(k)) {
        map.set(k, { key: k, code: s.code, sec: s.sec, instrs: new Set(), days: new Set() })
      }
      map.get(k).instrs.add(s.instr)
      map.get(k).days.add(s.day)
    })
    return [...map.values()].sort((a, b) =>
      a.code.localeCompare(b.code) || a.sec.localeCompare(b.sec)
    )
  }, [])

  const filteredCombos = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return allCombos
    return allCombos.filter(c => {
      const hay = `${c.code} ${c.sec} ${[...c.instrs].join(' ')}`.toLowerCase()
      return hay.includes(q)
    })
  }, [allCombos, query])

  // ── Sessions for the active day ──────────────────────────
  const dayClasses = useMemo(() => {
    if (activeDay === 'Sunday') return []
    return SESSIONS
      .filter(s => s.day === activeDay && selected.has(pickerKey(s.code, s.sec)))
      .sort((a, b) => a.start - b.start)
  }, [activeDay, selected])

  const today = todayName()

  // ── Toggle a course in the picker ───────────────────────
  const toggle = useCallback((key) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }, [])

  return (
    <div className="phone-shell">
      {showPicker
        ? <Picker
            combos={filteredCombos}
            selected={selected}
            query={query}
            onQuery={setQuery}
            onToggle={toggle}
            onDone={() => { setShowPicker(false); setQuery('') }}
          />
        : <Schedule
            activeDay={activeDay}
            dayClasses={dayClasses}
            today={today}
            nowMin={nowMin}
            selected={selected}
            onDayChange={setActiveDay}
            onOpenPicker={() => setShowPicker(true)}
          />
      }
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Schedule screen
───────────────────────────────────────────────────────────── */
function Schedule({ activeDay, dayClasses, today, nowMin, selected, onDayChange, onOpenPicker }) {
  return (
    <div style={styles.screen}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerTitle}>
          <span style={styles.trackWord}>TRACK</span>
          <span style={styles.dayWord}>{activeDay}</span>
        </div>
        <button style={styles.plusBtn} onClick={onOpenPicker} aria-label="Add courses">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <line x1="11" y1="2" x2="11" y2="20" stroke="#3a7d00" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="2"  y1="11" x2="20" y2="11" stroke="#3a7d00" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </button>
      </header>

      {/* Day tabs */}
      <DayTabs activeDay={activeDay} onDayChange={onDayChange} />

      {/* Content */}
      <div style={styles.content}>
        {activeDay === 'Sunday' ? (
          <SundaySplash />
        ) : dayClasses.length === 0 ? (
          <EmptyDay selected={selected} onOpenPicker={onOpenPicker} />
        ) : (
          <div style={styles.grid}>
            {dayClasses.map((s, i) => {
              const isNow = activeDay === today && nowMin >= s.start && nowMin < s.end
              return <ClassCard key={i} session={s} isNow={isNow} />
            })}
          </div>
        )}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Day tabs
───────────────────────────────────────────────────────────── */
function DayTabs({ activeDay, onDayChange }) {
  return (
    <div style={styles.tabsRow}>
      {DAYS.map((day, i) => {
        const isActive = day === activeDay
        return (
          <button
            key={day}
            onClick={() => onDayChange(day)}
            style={styles.tab}
            aria-label={day}
            aria-pressed={isActive}
          >
            <div style={{
              ...styles.tabBar,
              background: isActive ? '#111111' : '#DDDDDD',
              height: isActive ? 4 : 3,
            }} />
          </button>
        )
      })}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Class card
───────────────────────────────────────────────────────────── */
function ClassCard({ session, isNow }) {
  const start = fmtTime(session.start)
  const end   = fmtTime(session.end)
  const displayCode = session.code.replace(/\s*lab$/i, '')

  return (
    <article style={{
      ...styles.card,
      background: isNow ? GREEN : '#FFFFFF',
      borderColor: isNow ? '#7ccc1f' : '#D4F4A0',
    }}>
      {/* top row: room + code */}
      <div style={styles.cardTop}>
        <div>
          <div style={styles.cardRoom}>{session.room}</div>
          <div style={styles.cardSection}>{session.sec}</div>
        </div>
        <div style={styles.cardCode}>
          {displayCode}
          {session.lab && (
            <span style={styles.labTag}>LAB</span>
          )}
        </div>
      </div>

      {/* big time */}
      <div style={styles.cardTime}>
        <span style={styles.cardHour}>{start.h}</span>
        <span style={styles.cardAmpm}>{start.ampm}</span>
      </div>

      {/* instructor */}
      <div style={styles.cardInstr}>{session.instr}</div>

      {/* now badge */}
      {isNow && <span style={styles.nowBadge}>Now</span>}
    </article>
  )
}

/* ─────────────────────────────────────────────────────────────
   Sunday splash
───────────────────────────────────────────────────────────── */
function SundaySplash() {
  return (
    <div style={styles.splash}>
      <div style={styles.splashEmoji}>🌴</div>
      <h2 style={styles.splashTitle}>It's Sunday.</h2>
      <p style={styles.splashSub}>
        Something exciting is coming to your Sundays soon — stay tuned.
      </p>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Empty day (no classes / no selections)
───────────────────────────────────────────────────────────── */
function EmptyDay({ selected, onOpenPicker }) {
  return (
    <div style={styles.splash}>
      <div style={styles.splashEmoji}>{selected.size === 0 ? '👆' : '🎉'}</div>
      <h2 style={styles.splashTitle}>
        {selected.size === 0 ? 'Pick your courses' : 'Free day!'}
      </h2>
      <p style={styles.splashSub}>
        {selected.size === 0
          ? 'Tap the + to select your enrolled courses and see your timetable.'
          : 'Nothing scheduled for today. Enjoy the break.'}
      </p>
      {selected.size === 0 && (
        <button style={styles.pickBtn} onClick={onOpenPicker}>
          Add my courses
        </button>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Course picker (full-screen overlay)
───────────────────────────────────────────────────────────── */
function Picker({ combos, selected, query, onQuery, onToggle, onDone }) {
  // Group combos by course code
  const grouped = useMemo(() => {
    const map = new Map()
    combos.forEach(c => {
      if (!map.has(c.code)) map.set(c.code, [])
      map.get(c.code).push(c)
    })
    return [...map.entries()]
  }, [combos])

  return (
    <div style={styles.picker}>
      {/* Picker header */}
      <div style={styles.pickerHeader}>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={styles.trackWord}>TRACK</span>
            <span style={{ fontSize: 18, fontWeight: 500, color: '#333' }}>your courses</span>
          </div>
          <p style={{ fontSize: 13, color: '#888', marginTop: 4 }}>
            Check off every section you're enrolled in.
          </p>
        </div>
        {selected.size > 0 && (
          <button style={styles.doneBtn} onClick={onDone}>Done</button>
        )}
      </div>

      {/* Search */}
      <div style={styles.searchWrap}>
        <svg style={{ flexShrink: 0 }} width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="6.5" cy="6.5" r="5" stroke="#999" strokeWidth="1.5"/>
          <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="#999" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <input
          style={styles.searchInput}
          type="search"
          placeholder="Search by course, section or instructor…"
          value={query}
          onChange={e => onQuery(e.target.value)}
          autoFocus
        />
      </div>

      {/* List */}
      <div style={styles.pickerList}>
        {grouped.length === 0 && (
          <p style={{ color: '#999', fontSize: 13, padding: '16px 0' }}>No results found.</p>
        )}
        {grouped.map(([code, items]) => (
          <div key={code}>
            <div style={styles.groupLabel}>{code}</div>
            {items.map(c => (
              <label key={c.key} style={styles.pickerRow}>
                <input
                  type="checkbox"
                  checked={selected.has(c.key)}
                  onChange={() => onToggle(c.key)}
                  style={styles.checkbox}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={styles.pickerRowTitle}>
                    <strong style={{ fontFamily: 'monospace', color: '#1a5c00' }}>{code}</strong>
                    {' · '}
                    {c.sec}
                  </div>
                  <div style={styles.pickerRowMeta}>
                    {[...c.instrs].join(', ')} · {c.days.size} day{c.days.size > 1 ? 's' : ''}/week
                  </div>
                </div>
              </label>
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={styles.pickerFooter}>
        <span style={{ fontSize: 13, color: '#888' }}>
          {selected.size} course{selected.size !== 1 ? 's' : ''} selected
        </span>
        <button
          style={{ ...styles.doneBtn, opacity: selected.size === 0 ? 0.4 : 1 }}
          disabled={selected.size === 0}
          onClick={onDone}
        >
          Done
        </button>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Styles (inline — keeps everything in one file)
───────────────────────────────────────────────────────────── */
const styles = {
  /* Schedule screen */
  screen: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100dvh',
    background: '#fff',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '52px 24px 12px',
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 10,
  },
  trackWord: {
    fontSize: 26,
    fontWeight: 700,
    color: '#111',
    letterSpacing: '-0.02em',
  },
  dayWord: {
    fontSize: 26,
    fontWeight: 400,
    color: '#111',
    letterSpacing: '-0.02em',
  },
  plusBtn: {
    width: 38,
    height: 38,
    borderRadius: '50%',
    background: GREEN,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  /* Day tabs */
  tabsRow: {
    display: 'flex',
    gap: 6,
    padding: '0 24px 20px',
  },
  tab: {
    flex: 1,
    padding: '8px 0',
    display: 'flex',
    justifyContent: 'center',
  },
  tabBar: {
    width: '100%',
    borderRadius: 4,
    transition: 'height 0.15s ease, background 0.15s ease',
  },

  /* Content */
  content: {
    flex: 1,
    overflowY: 'auto',
    padding: '0 16px 32px',
  },

  /* Card grid */
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
  },
  card: {
    borderRadius: 20,
    border: '1.5px solid',
    padding: '14px 14px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    position: 'relative',
    minHeight: 160,
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 6,
  },
  cardRoom: {
    fontSize: 13,
    fontWeight: 500,
    color: '#333',
  },
  cardSection: {
    fontSize: 12,
    color: '#888',
    marginTop: 1,
  },
  cardCode: {
    fontSize: 15,
    fontWeight: 700,
    color: '#111',
    textAlign: 'right',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    flexShrink: 0,
  },
  labTag: {
    fontSize: 9,
    fontWeight: 700,
    background: '#fff3cd',
    color: '#856404',
    borderRadius: 4,
    padding: '1px 4px',
    textTransform: 'uppercase',
  },
  cardTime: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 3,
    marginTop: 'auto',
    paddingTop: 8,
  },
  cardHour: {
    fontSize: 38,
    fontWeight: 700,
    color: '#111',
    lineHeight: 1,
    letterSpacing: '-0.03em',
  },
  cardAmpm: {
    fontSize: 13,
    fontWeight: 600,
    color: '#555',
    paddingBottom: 4,
  },
  cardInstr: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  nowBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    fontSize: 10,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: '#1a5c00',
    background: 'rgba(255,255,255,0.75)',
    borderRadius: 999,
    padding: '2px 8px',
  },

  /* Sunday / empty splashes */
  splash: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '64px 32px',
    gap: 12,
    flex: 1,
    minHeight: 340,
  },
  splashEmoji: {
    fontSize: 48,
    lineHeight: 1,
    marginBottom: 8,
  },
  splashTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: '#111',
  },
  splashSub: {
    fontSize: 14,
    color: '#777',
    lineHeight: 1.6,
    maxWidth: 280,
  },
  pickBtn: {
    marginTop: 12,
    background: GREEN,
    color: '#1a5c00',
    fontWeight: 700,
    fontSize: 14,
    padding: '11px 24px',
    borderRadius: 999,
    cursor: 'pointer',
  },

  /* Picker */
  picker: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100dvh',
    background: '#fff',
  },
  pickerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '52px 24px 16px',
    borderBottom: '1px solid #eee',
  },
  doneBtn: {
    background: GREEN,
    color: '#1a5c00',
    fontWeight: 700,
    fontSize: 14,
    padding: '9px 20px',
    borderRadius: 999,
    cursor: 'pointer',
    flexShrink: 0,
  },
  searchWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    margin: '12px 16px',
    background: '#F4F4F4',
    borderRadius: 12,
    padding: '10px 14px',
  },
  searchInput: {
    flex: 1,
    background: 'none',
    border: 'none',
    outline: 'none',
    fontSize: 14,
    color: '#111',
  },
  pickerList: {
    flex: 1,
    overflowY: 'auto',
    padding: '0 16px 16px',
  },
  groupLabel: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    color: '#aaa',
    padding: '14px 2px 6px',
  },
  pickerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 4px',
    borderBottom: '1px solid #f0f0f0',
    cursor: 'pointer',
  },
  checkbox: {
    width: 18,
    height: 18,
    accentColor: '#3a7d00',
    flexShrink: 0,
    cursor: 'pointer',
  },
  pickerRowTitle: {
    fontSize: 14,
    color: '#111',
  },
  pickerRowMeta: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  pickerFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 20px',
    borderTop: '1px solid #eee',
    background: '#fff',
  },
}
