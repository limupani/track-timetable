/**
 * styles/schedule.js
 *
 * All inline-style objects for the Schedule screen and its sub-components
 * (Header, DayTabs, ClassGrid, ClassCard, SundaySplash, EmptyDay).
 *
 * Changing layout or visual details of the schedule view?
 * This is the only file you need to touch.
 */

import {
  GREEN, GREEN_BORDER, GREEN_TEXT, GREEN_DEEP,
  INK, INK_SOFT, INK_FAINT, GRAY,
  CARD_BORDER, WHITE,
  RADIUS_CARD, RADIUS_PILL,
} from './tokens'

export const scheduleStyles = {
  /* ── Screen wrapper ── */
  screen: {
    flex:          1,
    display:       'flex',
    flexDirection: 'column',
    minHeight:     '100dvh',
    background:    WHITE,
  },

  /* ── Header ── */
  header: {
    display:        'flex',
    justifyContent: 'space-between',
    alignItems:     'center',
    padding:        '52px 24px 12px',
  },
  headerTitle: {
    display:    'flex',
    alignItems: 'baseline',
    gap:        10,
  },
  trackWord: {
    fontSize:      26,
    fontWeight:    700,
    color:         INK,
    letterSpacing: '-0.02em',
  },
  dayWord: {
    fontSize:      26,
    fontWeight:    400,
    color:         INK,
    letterSpacing: '-0.02em',
  },
  plusBtn: {
    width:          38,
    height:         38,
    borderRadius:   '50%',
    background:     GREEN,
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    flexShrink:     0,
    border:         'none',
    cursor:         'pointer',
  },

  /* ── Day tabs ── */
  tabsRow: {
    display: 'flex',
    gap:     6,
    padding: '0 24px 20px',
  },
  tab: {
    flex:           1,
    padding:        '8px 0',
    display:        'flex',
    justifyContent: 'center',
    background:     'none',
    border:         'none',
    cursor:         'pointer',
  },
  tabBar: {
    width:      '100%',
    borderRadius: 4,
    transition: 'height 0.15s ease, background 0.15s ease',
  },

  /* ── Scrollable content area ── */
  content: {
    flex:      1,
    overflowY: 'auto',
    padding:   '0 16px 32px',
  },

  /* ── Card grid ── */
  grid: {
    display:             'grid',
    gridTemplateColumns: '1fr 1fr',
    gap:                 12,
  },

  /* ── Class card ── */
  card: {
    borderRadius:  RADIUS_CARD,
    border:        '1.5px solid',
    padding:       '14px 14px 16px',
    display:       'flex',
    flexDirection: 'column',
    gap:           6,
    position:      'relative',
    minHeight:     160,
  },
  cardNow: {
    background:  GREEN,
    borderColor: GREEN_BORDER,
  },
  cardDefault: {
    background:  WHITE,
    borderColor: CARD_BORDER,
  },
  cardTop: {
    display:        'flex',
    justifyContent: 'space-between',
    alignItems:     'flex-start',
    gap:            6,
  },
  cardRoom: {
    fontSize:   13,
    fontWeight: 500,
    color:      INK_SOFT,
  },
  cardSection: {
    fontSize:  12,
    color:     GRAY,
    marginTop: 1,
  },
  cardCode: {
    fontSize:   15,
    fontWeight: 700,
    color:      INK,
    textAlign:  'right',
    display:    'flex',
    alignItems: 'center',
    gap:        4,
    flexShrink: 0,
  },
  labTag: {
    fontSize:      9,
    fontWeight:    700,
    background:    '#fff3cd',
    color:         '#856404',
    borderRadius:  4,
    padding:       '1px 4px',
    textTransform: 'uppercase',
  },
  cardTime: {
    display:    'flex',
    alignItems: 'flex-end',
    gap:        3,
    marginTop:  'auto',
    paddingTop: 8,
  },
  cardHour: {
    fontSize:      38,
    fontWeight:    700,
    color:         INK,
    lineHeight:    1,
    letterSpacing: '-0.03em',
  },
  cardAmpm: {
    fontSize:      13,
    fontWeight:    600,
    color:         INK_FAINT,
    paddingBottom: 4,
  },
  cardInstr: {
    fontSize:     12,
    color:        INK_FAINT,
    marginTop:    2,
    whiteSpace:   'nowrap',
    overflow:     'hidden',
    textOverflow: 'ellipsis',
  },
  nowBadge: {
    position:      'absolute',
    top:           12,
    right:         12,
    fontSize:      10,
    fontWeight:    700,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color:         GREEN_TEXT,
    background:    'rgba(255,255,255,0.75)',
    borderRadius:  RADIUS_PILL,
    padding:       '2px 8px',
  },
}
