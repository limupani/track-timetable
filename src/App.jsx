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

import { useState, useEffect, useMemo, useCallback } from 'react'

import { SESSIONS }                  from './data/sessions'
import { DAYS }                      from './constants'
import { todayName }                 from './utils/time'
import {
  buildCombos, filterCombos, getDayClasses, groupByCode,
  getFilterOptions, filterByProgramSemesterSection,   // ← new
} from './utils/courses'
import { useSelectedCourses }        from './hooks/useSelectedCourses'
import { useNowMinutes }             from './hooks/useNowMinutes'
import Schedule                      from './components/Schedule'
import Picker                        from './components/Picker'

export default function App() {
  const [activeDay,  setActiveDay]  = useState(() => todayName())
  const [showPicker, setShowPicker] = useState(false)
  const [query,      setQuery]      = useState('')

  // ── Program / Semester / Section filters ──
  const [programFilter,  setProgramFilter]  = useState(null)
  const [semesterFilter, setSemesterFilter] = useState(null)
  const [sectionFilter,  setSectionFilter]  = useState(null)

  const { selected, toggle, clean } = useSelectedCourses()
  const nowMin = useNowMinutes()

  const allCombos = useMemo(() => buildCombos(SESSIONS), [])

  useEffect(() => {
    const validKeys = new Set(allCombos.map(c => c.key))
    clean(validKeys)
  }, [allCombos, clean])

  useEffect(() => {
    if (selected.size === 0) setShowPicker(true)
  }, [selected])

  // Options shown in each pill row, cascading off the levels above
  const filterOptions = useMemo(
    () => getFilterOptions(allCombos, { program: programFilter, semester: semesterFilter }),
    [allCombos, programFilter, semesterFilter]
  )

  // Changing a level clears everything below it
  const handleFilterChange = useCallback((level) => (value) => {
    if (level === 'program') {
      setProgramFilter(value)
      setSemesterFilter(null)
      setSectionFilter(null)
    } else if (level === 'semester') {
      setSemesterFilter(value)
      setSectionFilter(null)
    } else {
      setSectionFilter(value)
    }
  }, [])

  const filteredByPills = useMemo(
    () => filterByProgramSemesterSection(allCombos, {
      program:  programFilter,
      semester: semesterFilter,
      section:  sectionFilter,
    }),
    [allCombos, programFilter, semesterFilter, sectionFilter]
  )

  const filteredCombos = useMemo(
    () => filterCombos(filteredByPills, query),
    [filteredByPills, query]
  )

  const grouped = useMemo(() => groupByCode(filteredCombos), [filteredCombos])

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
          filterOptions={filterOptions}
          filters={{ program: programFilter, semester: semesterFilter, section: sectionFilter }}
          onFilterChange={handleFilterChange}
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