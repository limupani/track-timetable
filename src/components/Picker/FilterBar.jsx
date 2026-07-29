/**
 * components/Picker/FilterBar.jsx
 *
 * Three cascading rows of filter pills: Program → Semester → Section.
 * Each row is a single line that scrolls horizontally instead of
 * wrapping onto a second line when the pills don't all fit.
 *
 * Tapping a pill selects it (single-select per row); tapping the same
 * pill again clears that level. Changing a higher level resets the
 * levels below it (handled by the parent, not here).
 *
 * Props:
 *   programs, semesters, sections {string[]} - available options per row
 *   program, semester, section    {string|null} - currently active pill per row
 *   onProgram, onSemester, onSection {(value: string|null) => void}
 */

import { pickerStyles as s } from '../../styles/picker'

/**
 * @param {object}   props
 * @param {string[]} props.options
 * @param {string|null} props.active
 * @param {(value: string|null) => void} props.onSelect
 * @param {(value: string) => string} [props.formatLabel] - transforms the raw
 *   value into display text (e.g. "5" → "Sem 5"). The raw value is still
 *   what's passed to onSelect/used for matching — only the label changes.
 */
function PillRow({ options, active, onSelect, formatLabel }) {
  if (options.length === 0) return null
  return (
    <div style={s.filterRow} className="filter-row-scroll">
      {options.map(opt => {
        const isActive = opt === active
        const label = formatLabel ? formatLabel(opt) : opt
        return (
          <button
            key={opt}
            style={{ ...s.filterPill, ...(isActive ? s.filterPillActive : null) }}
            onClick={() => onSelect(isActive ? null : opt)}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

export default function FilterBar({
  programs, semesters, sections,
  program, semester, section,
  onProgram, onSemester, onSection,
}) {
  return (
    <div style={s.filterBar}>
      <PillRow options={programs}  active={program}  onSelect={onProgram} />
      <PillRow
        options={semesters}
        active={semester}
        onSelect={onSemester}
        formatLabel={sem => `Sem ${sem}`}
      />
      <PillRow
        options={sections}
        active={section}
        onSelect={onSection}
        formatLabel={sec => `Sec ${sec}`}
      />
    </div>
  )
}
