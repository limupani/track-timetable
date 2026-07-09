/**
 * components/Picker/ScrollToTop.jsx
 *
 * Floating ↑ button that scrolls the course list back to the top.
 * Uses position: fixed so overflow: hidden on .phone-shell doesn't clip it.
 * The left: calc() formula keeps it visually inside the phone shell on desktop too.
 *
 * Props:
 *   listRef {React.RefObject} - ref attached to the scrollable list div
 */

export default function ScrollToTop({ listRef }) {
  function handleClick() {
    if (listRef?.current) {
      listRef.current.scrollTo = 0
    }
    window.scrollTo(0, 0)
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll to top"
      title="Back to top"
      style={{
        position:       'fixed',
        bottom:         30,
        // On mobile: 20px from the left edge of the screen.
        // On desktop: 20px from the left edge of the centered 390px phone shell.
        // Formula: 50vw - 195px (left edge of shell) + 20px inset = 50vw - 175px
        right:           'max(20px, calc(50vw - 175px))',
        zIndex:         50,
        width:          44,
        height:         44,
        borderRadius:   '50%',
        background:     '#C0EF7D',
        border:         'none',
        cursor:         'pointer',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        boxShadow:      '0 4px 16px rgba(0,0,0,0.2)',
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <line
          x1="9" y1="14" x2="9" y2="4"
          stroke="#1a5c00" strokeWidth="2.5" strokeLinecap="round"
        />
        <polyline
          points="4,9 9,4 14,9"
          fill="none" stroke="#1a5c00" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
