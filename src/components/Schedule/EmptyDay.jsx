/**
 * components/Schedule/EmptyDay.jsx
 *
 * Shown when the selected day has no classes in the student's schedule.
 * Two states:
 *   - No courses selected yet → prompt to open the picker.
 *   - Courses selected but none on this day → celebrate the free day.
 *
 * Props:
 *   selected    {Set}      - the current set of selected pickerKeys
 *   onOpenPicker {function} - opens the course picker
 */

import { shared } from '../../styles/shared'

export default function EmptyDay({ selected, onOpenPicker }) {
  const hasSelections = selected.size > 0

  return (
    <div style={shared.splash}>
      <div style={shared.splashEmoji}>{hasSelections ? '🎉' : '👆'}</div>

      <h2 style={shared.splashTitle}>
        {hasSelections ? 'Free day!' : 'Pick your courses'}
      </h2>

      <p style={shared.splashSub}>
        {hasSelections
          ? 'Nothing scheduled for today. Enjoy the break.'
          : 'Tap the + to select your enrolled courses and see your timetable.'}
      </p>

      {!hasSelections && (
        <button style={shared.primaryBtn} onClick={onOpenPicker}>
          Add my courses
        </button>
      )}
    </div>
  )
}
