/**
 * components/Picker/FloatingBar.jsx
 *
 * Floating pill at the bottom of the picker.
 * Left: selected count  |  Right: scroll-to-top arrow + Done button
 */

export default function FloatingBar({ selectedCount, onDone, listRef }) {
  function scrollToTop() {
    if (listRef?.current) listRef.current.scrollTop = 0
    window.scrollTo(0, 0)
  }

  return (
    <div style={{
      position:       'fixed',
      bottom:         24,
      left:           '50%',
      transform:      'translateX(-50%)',
      width:          'calc(min(390px, 100vw) - 48px)',
      zIndex:         50,
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'space-between',
      padding:        '10px 10px 10px 20px',
      background:     '#FFFFFF',
      borderRadius:   999,
      boxShadow:      '0 4px 24px rgba(0,0,0,0.13)',
      gap:            12,
    }}>

      {/* Selected count */}
      <span style={{ fontSize: 13.5, color: '#888', whiteSpace: 'nowrap' }}>
        {selectedCount} course{selectedCount !== 1 ? 's' : ''} selected
      </span>

      {/* Right side buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>

        {/* Scroll to top */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          style={{
            width:          40,
            height:         40,
            borderRadius:   '50%',
            background:     '#C0EF7D',
            border:         'none',
            cursor:         'pointer',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            flexShrink:     0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
            <line x1="9" y1="14" x2="9" y2="4" stroke="#1a5c00" strokeWidth="2.5" strokeLinecap="round"/>
            <polyline points="4,9 9,4 14,9" fill="none" stroke="#1a5c00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Done */}
        <button
          onClick={onDone}
          disabled={selectedCount === 0}
          style={{
            background:   selectedCount === 0 ? '#e0e0e0' : '#C0EF7D',
            color:        selectedCount === 0 ? '#aaa'     : '#1a5c00',
            fontWeight:   700,
            fontSize:     14,
            padding:      '10px 24px',
            borderRadius: 999,
            border:       'none',
            cursor:       selectedCount === 0 ? 'not-allowed' : 'pointer',
            whiteSpace:   'nowrap',
            transition:   'background 0.2s ease, color 0.2s ease',
          }}
        >
          Done
        </button>

      </div>
    </div>
  )
}