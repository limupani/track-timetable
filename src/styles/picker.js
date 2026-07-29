/**
 * styles/picker.js
 *
 * All inline-style objects for the Picker screen and its sub-components
 * (PickerHeader, SearchBar, CourseList, ScrollToTop).
 *
 * Changing layout or visual details of the course-picker view?
 * This is the only file you need to touch.
 */

import {
  GREEN, GREEN_TEXT,
  INK, GRAY, GRAY_LIGHT,
  BG_SEARCH, DIVIDER, WHITE,
  RADIUS_SM, RADIUS_PILL,
} from './tokens'

export const pickerStyles = {
  /* ── Screen wrapper ── */
  picker: {
    flex:          1,
    display:       'flex',
    flexDirection: 'column',
    minHeight:     '100dvh',
    background:    WHITE,
  },

  /* ── Header ── */
  pickerHeader: {
    display:        'flex',
    justifyContent: 'space-between',
    alignItems:     'flex-start',
    padding:        '35px 24px 0',
  },
  headerTitle: {
    display:    'flex',
    alignItems: 'baseline',
    gap:        8,
    lineHeight: 1,
  },
  trackWord: {
    fontSize:   20,
    fontWeight: 300,
    color:      INK,
    letterSpacing: '0.05em',
    fontFamily: '"Adelle"',
  },
  headerSub: {
    fontSize:   20,
    fontWeight: 'light',
    color:      INK,
    fontFamily: '"Adelle"',
  },

  /* ── Search bar ── */
  searchWrap: {
    display:      'flex',
    alignItems:   'center',
    gap:          10,
    margin:       '12px 16px',
    background:   BG_SEARCH,
    borderRadius: RADIUS_SM,
    padding:      '10px 14px',
  },
  searchInput: {
    flex:       1,
    background: 'none',
    border:     'none',
    outline:    'none',
    fontSize:   14,
    color:      INK,
  },

  /* ── Course list ── */
  pickerList: {
    flex:      1,
    overflowY: 'auto',
    padding:   '0 16px 100px', // ← increased so last items aren't hidden behind the fixed footer
  },
  groupLabel: {
    fontSize:      11,
    fontWeight:    700,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    color:         GRAY_LIGHT,
    padding:       '14px 2px 6px',
  },
  pickerRow: {
    display:      'flex',
    alignItems:   'center',
    gap:          12,
    padding:      '10px 4px',
    borderBottom: `1px solid ${DIVIDER}`,
    cursor:       'pointer',
  },
  checkbox: {
    width:       18,
    height:      18,
    accentColor: '#3a7d00',
    flexShrink:  0,
    cursor:      'pointer',
  },
  rowTitle: {
    fontSize: 14,
    color:    INK,
  },
  rowMeta: {
    fontSize:  12,
    color:     GRAY,
    marginTop: 2,
  },
  emptyMessage: {
    color:   GRAY_LIGHT,
    fontSize: 13,
    padding: '14px 2px',
  },
  
  /* ── Filter bar (Program / Semester / Section pills) ── */
  /* ── Filter bar (Program / Semester / Section pills) ── */
  filterBar: {
    display:       'flex',
    flexDirection: 'column',
    gap:           8,
    margin:        '4px 16px 8px',
  },
  filterRow: {
    display:                 'flex',
    flexWrap:                'nowrap',   // ← no wrapping to a 2nd line
    overflowX:                'auto',     // ← horizontal scroll instead
    gap:                      6,
    paddingBottom:            2,          // small buffer so pills don't touch the scrollbar area
    WebkitOverflowScrolling:  'touch',    // smooth momentum scroll on iOS
    scrollbarWidth:           'none',     // Firefox: hide scrollbar
    msOverflowStyle:          'none',     // old Edge/IE: hide scrollbar
  },
  filterPill: {
    fontSize:     12.5,
    fontWeight:   'light',
    fontFamily: '"Adelle"',
    padding:      '0px 14px',
    borderRadius: RADIUS_PILL,
    border:       `1px solid ${GRAY_LIGHT}`,
    background:   WHITE,
    color:        INK,
    cursor:       'pointer',
    whiteSpace:   'nowrap',
    flexShrink:   0,            // ← prevents pills from squishing to fit
    transition:   'background 0.15s ease, border-color 0.15s ease, color 0.15s ease',
  },
  filterPillActive: {
    background:  GREEN,
    borderColor: GREEN,
    color:       GREEN_TEXT,
},
}
