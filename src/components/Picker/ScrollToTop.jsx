/**
 * components/Picker/ScrollToTop.jsx
 *
 * A floating ↑ button pinned to the bottom-left of the Picker screen.
 * Tapping it scrolls the course list back to the top so the student
 * can reach the Done button without manually scrolling.
 *
 * Only rendered inside the Picker (the `position: relative` wrapper
 * in pickerStyles.picker acts as the positioning anchor).
 *
 * Props:
 *   listRef {React.RefObject} - ref attached to the scrollable list div
 */

import { pickerStyles as s } from '../../styles/picker'
import { GREEN_TEXT } from '../../styles/tokens'

export default function ScrollToTop({ listRef }) {
  function handleClick() {
    if (listRef.current) {
      listRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <button
      style={s.scrollToTopBtn}
      onClick={handleClick}
      aria-label="Scroll to top"
      title="Back to top"
    >
      {/* Up arrow */}
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <line x1="9" y1="14" x2="9"  y2="4"  stroke={GREEN_TEXT} strokeWidth="2.2" strokeLinecap="round" />
        <polyline points="4,9 9,4 14,9" fill="none" stroke={GREEN_TEXT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
