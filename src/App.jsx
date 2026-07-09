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
import { todayName, nowMinutes }     from './utils/time'
import { buildCombos, filterCombos, getDayClasses, groupByCode } from './utils/courses'
import { useSelectedCourses }        from './hooks/useSelectedCourses'
import { useNowMinutes }             from './hooks/useNowMinutes'
import Schedule                      from './components/Schedule'
import Picker                        from './components/Picker'

export default function App() {
  const [activeDay,   setActiveDay]   = useState(() => todayName())
  const [showPicker,  setShowPicker]  = useState(false)
  const [query,       setQuery]       = useState('')

  const { selected, toggle } = useSelectedCourses()
  const nowMin               = useNowMinutes()

  // Open picker automatically on first visit (nothing selected yet).
  useEffect(() => {
    if (selected.size === 0) setShowPicker(true)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Build the full combo list once (sessions data never changes at runtime).
  const allCombos = useMemo(() => buildCombos(SESSIONS), [])

  // Re-filter whenever the search query changes.
  const filteredCombos = useMemo(
    () => filterCombos(allCombos, query),
    [allCombos, query]
  )

  // Group filtered combos by course code for the picker list.
  const grouped = useMemo(
    () => groupByCode(filteredCombos),
    [filteredCombos]
  )

  // Derive the classes to show for the active day.
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
