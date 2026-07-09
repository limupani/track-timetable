/**
 * components/Picker/CourseList.jsx
 *
 * Renders the scrollable, grouped list of every course+section combo.
 * Each group header shows the course code; each row shows the section,
 * instructors, and how many days per week it meets.
 *
 * Props:
 *   grouped   {Array<[string, Array]>} - output of groupByCode()
 *   selected  {Set<string>}            - currently selected pickerKeys
 *   onToggle  {(key: string) => void}  - toggles a course in/out
 *   listRef   {React.RefObject}        - forwarded to the scroll container
 */

import { pickerStyles as s } from '../../styles/picker'

export default function CourseList({ grouped, selected, onToggle, listRef }) {
  return (
    <div style={s.pickerList} ref={listRef}>
      {grouped.length === 0 && (
        <p style={s.emptyMessage}>No matches. Try a different course, section, or instructor.</p>
      )}

      {grouped.map(([code, combos]) => (
        <div key={code}>
          {/* Course code group header */}
          <div style={s.groupLabel}>{code}</div>

          {combos.map(c => (
            <label key={c.key} style={s.pickerRow}>
              <input
                type="checkbox"
                style={s.checkbox}
                checked={selected.has(c.key)}
                onChange={() => onToggle(c.key)}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={s.rowTitle}>
                  <strong style={{ fontFamily: 'monospace', color: '#1a5c00' }}>
                    {code}
                  </strong>
                  {' · '}
                  {c.sec}
                </div>
                <div style={s.rowMeta}>
                  {[...c.instrs].join(', ')}
                  {' · '}
                  {c.days.size} day{c.days.size > 1 ? 's' : ''}/week
                </div>
              </div>
            </label>
          ))}
        </div>
      ))}
    </div>
  )
}
