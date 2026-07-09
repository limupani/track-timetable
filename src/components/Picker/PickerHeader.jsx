/**
 * components/Picker/PickerHeader.jsx
 *
 * Top section of the course picker.
 * Shows the TRACK wordmark, a "your courses" subtitle, a hint line,
 * and the Done button (only visible once at least one course is selected).
 *
 * Props:
 *   selectedCount {number}   - number of currently selected courses
 *   onDone        {function} - called when Done is tapped
 */

import { shared }        from '../../styles/shared'
import { pickerStyles as s } from '../../styles/picker'

export default function PickerHeader({ selectedCount, onDone }) {
  return (
    <div style={s.pickerHeader}>
      <div>
        <div style={s.headerTitle}>
          <span style={s.trackWord}>TRACK</span>
          <span style={s.headerSub}>your courses</span>
        </div>
        <p style={s.headerHint}>Check off every section you're enrolled in.</p>
      </div>

      {selectedCount > 0 && (
        <button style={shared.doneBtn} onClick={onDone}>Done</button>
      )}
    </div>
  )
}
