/**
 * styles/weekend.js
 *
 * All inline-style objects for the Weekend / Sunday screen.
 * Layout changes (grid proportions, spacing, radii) live here only.
 *
 * Grid math (390px phone shell, 16px side padding, 10px gap):
 *   Content width : 390 - 32 = 358px
 *   Column width  : (358 - 10) / 2 = 174px
 *   Row height    : 170px  (two equal rows)
 *   Left card H   : 170 + 10 + 170 = 350px
 *   Banner height : 130px
 */

export const weekendStyles = {
  /* ── Scroll container ── */
  screen: {
    flex:      1,
    overflowY: 'auto',
    overflowX: 'hidden',
    padding:   '0 16px',
    WebkitOverflowScrolling: 'touch',
  },

  /* ── "More from the Studio" heading ── */
  heading: {
    fontSize:      40,
    fontWeight:    500,
    color:         '#111',
    lineHeight:    0.9,
    paddingTop:    8,               // 👈 FIX 1: Gives the top of the letters room to breathe
    marginBottom:  8,
    whiteSpace:    'pre-line',
    fontFamily:    '"Oct", sans-serif',
  },

  /* ── Main grid ── */
  grid: {
    display:             'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows:    '170px 170px',
    gap:                 6,
    marginBottom:        6,
  },

  /* ── Shared card base ── */
  card: {
    borderRadius:    10,
    overflow:        'hidden',
    position:        'relative',
    cursor:          'pointer',
    transition:      'transform 0.18s ease, box-shadow 0.18s ease',
    WebkitTapHighlightColor: 'transparent',
    userSelect:      'none',
  },
  cardHover: {
    transform:  'scale(0.965)',
    boxShadow:  '0 6px 24px rgba(0,0,0,0.14)',
  },
  cardDefault: {
    transform:  'scale(1)',
    boxShadow:  '0 2px 8px rgba(0,0,0,0.06)',
  },

  /* ── Left tall card (spans both rows) ── */
  cardLeft: {
    gridRow:    '1 / 3',
    gridColumn: '1',
    color:'#000000',
  },

  /* ── Top right card ── */
  cardTopRight: {
    gridRow:    '1',
    gridColumn: '2',
    color: '#F2ECD9',
  },

  /* ── Middle right card ── */
  cardMidRight: {
    gridRow:    '2',
    gridColumn: '2',
    color: '#F2ECD9',
  },

  /* ── Card image — fills entire card ── */
  cardImage: {
    width:      '100%',
    height:     '100%',
    objectFit:  'cover',
    display:    'block',
    pointerEvents: 'none',
  },

  /* ── External link arrow (top-right corner of clickable cards) ── */
  linkIcon: {
    position:   'absolute',
    top:        0,
    right:      0,
    width:      28,
    height:     28,
    display:    'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ── Bottom banner ── */
  banner: {
    borderRadius: 18,
    overflow:     'hidden',
    height:       130,
    position:     'relative',
    boxShadow:    '0 2px 8px rgba(0,0,0,0.08)',
    marginBottom: 20,
  },
  bannerImage: {
    width:     '100%',
    height:    '100%',
    objectFit: 'cover',
    display:   'block',
  },
  /* Dark gradient overlay on the banner */
  bannerOverlay: {
    position:   'absolute',
    inset:      0,
    background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 100%)',
    display:    'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap:        4,
  },
  bannerEyebrow: {
    fontSize:      11.5,
    fontWeight:    500,
    color:         'rgba(255,255,255,0.7)',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  },
  bannerTitle: {
    fontSize:      26,
    fontWeight:    700,
    color:         '#fff',
    letterSpacing: '-0.02em',
    textAlign:     'center',
  },
}
