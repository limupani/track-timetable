/**
 * components/Branding.jsx
 *
 * Footer branding shown at the bottom of every scrollable page
 * except the Picker. Appears naturally when the user scrolls to
 * the end of the content — no fixed/absolute positioning.
 */

export default function Branding() {
  return (
    <div style={{
      width:         '100%',
      padding:       '24px 20px 20px',
      textAlign:     'center',
      fontSize:      11,
      fontWeight:    500,
      color:         '#ccc',
      letterSpacing: '0.04em',
      userSelect:    'none',
      pointerEvents: 'none',
    }}>
      Limupani Studios©
    </div>
  )
}