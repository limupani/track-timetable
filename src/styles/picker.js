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
    position:      'relative', // anchor for the floating ScrollToTop button
  },

  /* ── Header ── */
  pickerHeader: {
    display:        'flex',
    justifyContent: 'space-between',
    alignItems:     'flex-start',
    padding:        '52px 24px 16px',
    borderBottom:   `1px solid ${DIVIDER}`,
  },
  headerTitle: {
    display:    'flex',
    alignItems: 'baseline',
    gap:        8,
  },
  trackWord: {
    fontSize:   24,
    fontWeight: 700,
    color:      INK,
  },
  headerSub: {
    fontSize:   16,
    fontWeight: 500,
    color:      '#555',
  },
  headerHint: {
    fontSize:  12.5,
    color:     GRAY,
    marginTop: 4,
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
    padding:   '0 16px 80px', // bottom padding leaves room for ScrollToTop button
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

  /* ── Footer ── */
  pickerFooter: {
    display:        'flex',
    justifyContent: 'space-between',
    alignItems:     'center',
    padding:        '14px 20px',
    borderTop:      `1px solid ${DIVIDER}`,
    background:     WHITE,
  },
  footerCount: {
    fontSize: 13,
    color:    GRAY,
  },

  /* ── Scroll-to-top floating button ── */
  scrollToTopBtn: {
    position:       'absolute',
    bottom:         72,           // sits just above the footer
    left:           20,
    width:          42,
    height:         42,
    borderRadius:   '50%',
    background:     GREEN,
    border:         'none',
    cursor:         'pointer',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    boxShadow:      '0 2px 12px rgba(0,0,0,0.15)',
    color:          GREEN_TEXT,
    transition:     'opacity 0.2s ease, transform 0.2s ease',
  },
}
