/**
 * App.jsx
 *
 * Root component — the only place where global state lives and hooks are called.
 * Its job is to wire hooks to screens; it contains no UI of its own.
 *
 * Data flow:
 *   SESSIONS (static data)
 *     → buildCombos / filterCombos / getDayClasses  (utils/courses)
 *       → Picker / Schedule                          (components)
 *
 * To add a new top-level screen, import it here and add a condition below.
 */

import { useState, useEffect, useMemo } from 'react'

import { SESSIONS }                  from './data/sessions'
import { DAYS }                      from './constants'
import { todayName }                 from './utils/time'
import { buildCombos, filterCombos, getDayClasses, groupByCode } from './utils/courses'
import { useSelectedCourses }        from './hooks/useSelectedCourses'
import { useNowMinutes }             from './hooks/useNowMinutes'
import Schedule                      from './components/Schedule'
import Picker                        from './components/Picker'

export default function App() {
  const [activeDay,  setActiveDay]  = useState(() => todayName())
  const [showPicker, setShowPicker] = useState(false)
  const [query,      setQuery]      = useState('')

  const { selected, toggle, clean } = useSelectedCourses()
  const nowMin = useNowMinutes()

  // Build full combo list once (sessions never change at runtime)
  const allCombos = useMemo(() => buildCombos(SESSIONS), [])

  // ── Remove any saved selections that no longer exist in this timetable ──
  // Runs once after mount. Fixes stale counts after a timetable update.
  useEffect(() => {
    const validKeys = new Set(allCombos.map(c => c.key))
    clean(validKeys)
  }, [allCombos, clean])

  // Open picker automatically if nothing valid is selected
  useEffect(() => {
    if (selected.size === 0) setShowPicker(true)
  }, [selected])

  const filteredCombos = useMemo(
    () => filterCombos(allCombos, query),
    [allCombos, query]
  )

  const grouped = useMemo(
    () => groupByCode(filteredCombos),
    [filteredCombos]
  )

  const dayClasses = useMemo(
    () => getDayClasses(SESSIONS, activeDay, selected),
    [activeDay, selected]
  )

  function handleDone() {
    setShowPicker(false)
    setQuery('')
  }

  return (
    <div className="phone-shell">
      {showPicker ? (
        <Picker
          grouped={grouped}
          selected={selected}
          query={query}
          onQuery={setQuery}
          onToggle={toggle}
          onDone={handleDone}
        />
      ) : (
        <Schedule
          activeDay={activeDay}
          dayClasses={dayClasses}
          today={todayName()}
          nowMin={nowMin}
          selected={selected}
          onDayChange={setActiveDay}
          onOpenPicker={() => setShowPicker(true)}
        />
      )}
    </div>
  )
}