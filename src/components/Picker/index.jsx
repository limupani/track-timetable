import { useRef }            from 'react'
import { pickerStyles as s } from '../../styles/picker'
import PickerHeader          from './PickerHeader'
import SearchBar             from './SearchBar'
import CourseList            from './CourseList'
import FloatingBar           from './FloatingBar'   // ← replaces ScrollToTop
import FilterBar             from './FilterBar'     // ← new

export default function Picker({
  grouped, selected, query, onQuery, onToggle, onDone,
  filterOptions, filters, onFilterChange,
}) {
  const listRef = useRef(null)

  return (
    <div style={s.picker}>
      <PickerHeader selectedCount={selected.size} onDone={onDone} />
      <SearchBar value={query} onChange={onQuery} />
      <FilterBar
        programs={filterOptions.programs}
        semesters={filterOptions.semesters}
        sections={filterOptions.sections}
        program={filters.program}
        semester={filters.semester}
        section={filters.section}
        onProgram={onFilterChange('program')}
        onSemester={onFilterChange('semester')}
        onSection={onFilterChange('section')}
      />
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