/**
 * components/Picker/index.jsx
 *
 * The full-screen course selection view. Shown on first visit and
 * whenever the student taps the + button on the schedule screen.
 *
 * Composes: PickerHeader, SearchBar, CourseList, ScrollToTop, and a footer.
 *
 * Props:
 *   combos   {Array}              - filtered combo list from App
 *   grouped  {Array<[string, Array]>} - combos already grouped by course code
 *   selected {Set<string>}        - currently selected pickerKeys
 *   query    {string}             - current search query
 *   onQuery  {(q: string) => void}
 *   onToggle {(key: string) => void}
 *   onDone   {function}
 */

import { useRef } from 'react'
import { shared }            from '../../styles/shared'
import { pickerStyles as s } from '../../styles/picker'
import PickerHeader from './PickerHeader'
import SearchBar    from './SearchBar'
import CourseList   from './CourseList'
import ScrollToTop  from './ScrollToTop'

export default function Picker({
  grouped,
  selected,
  query,
  onQuery,
  onToggle,
  onDone,
}) {
  // Ref forwarded to CourseList's scroll container so ScrollToTop can
  // call scrollTo() on it without lifting state or using a context.
  const listRef = useRef(null)

  return (
    <div style={s.picker}>
      <PickerHeader selectedCount={selected.size} onDone={onDone} />
      <SearchBar value={query} onChange={onQuery} />

      <CourseList
        grouped={grouped}
        selected={selected}
        onToggle={onToggle}
        listRef={listRef}
      />

      {/* Floating scroll-to-top arrow — always visible in the picker */}
      <ScrollToTop listRef={listRef} />

      {/* Footer with count + Done button */}
      <div style={s.pickerFooter}>
        <span style={s.footerCount}>
          {selected.size} course{selected.size !== 1 ? 's' : ''} selected
        </span>
        <button
          style={{ ...shared.doneBtn, opacity: selected.size === 0 ? 0.4 : 1 }}
          disabled={selected.size === 0}
          onClick={onDone}
        >
          Done
        </button>
      </div>
    </div>
  )
}
