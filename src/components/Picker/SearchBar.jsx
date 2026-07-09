/**
 * components/Picker/SearchBar.jsx
 *
 * Search input for filtering the course list by course code,
 * section identifier, or instructor name.
 *
 * Props:
 *   value    {string}
 *   onChange {(value: string) => void}
 */

import { pickerStyles as s } from '../../styles/picker'

export default function SearchBar({ value, onChange }) {
  return (
    <div style={s.searchWrap}>
      {/* Magnifier icon */}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
        <circle cx="6.5" cy="6.5" r="5"   stroke="#999" strokeWidth="1.5" />
        <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      <input
        style={s.searchInput}
        type="search"
        placeholder="Search by course, section or instructor…"
        value={value}
        onChange={e => onChange(e.target.value)}
        autoFocus
      />
    </div>
  )
}
