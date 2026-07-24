import { useRef }            from 'react'
import { pickerStyles as s } from '../../styles/picker'
import PickerHeader          from './PickerHeader'
import SearchBar             from './SearchBar'
import CourseList            from './CourseList'
import FloatingBar           from './FloatingBar'   // ← replaces ScrollToTop

export default function Picker({ grouped, selected, query, onQuery, onToggle, onDone }) {
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
      <FloatingBar selectedCount={selected.size} onDone={onDone} listRef={listRef}/>
    </div>
  )
}