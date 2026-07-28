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

export default function PickerHeader({ selectedCount }) {
  return (
    <div style={s.pickerHeader}>
      <div>
        <div style={s.headerTitle}>
          <span style={s.trackWord}>TRACK</span>
          <span style={s.headerSub}>Courses</span>
        </div>
      </div>
    </div>
  )
}
