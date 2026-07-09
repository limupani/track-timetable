/**
 * styles/shared.js
 *
 * Style objects used by more than one screen/component.
 * Keeping shared styles here prevents duplication and ensures
 * visual consistency across components.
 */

import { GREEN, GREEN_TEXT, INK, GRAY, RADIUS_PILL } from './tokens'

export const shared = {
  /* ── Splash (Sunday / empty day) ── */
  splash: {
    display:        'flex',
    flexDirection:  'column',
    alignItems:     'center',
    justifyContent: 'center',
    textAlign:      'center',
    padding:        '64px 32px',
    gap:            12,
    flex:           1,
    minHeight:      340,
  },
  splashEmoji: {
    fontSize:     48,
    lineHeight:   1,
    marginBottom: 8,
  },
  splashTitle: {
    fontSize:   22,
    fontWeight: 700,
    color:      INK,
  },
  splashSub: {
    fontSize:   14,
    color:      GRAY,
    lineHeight: 1.6,
    maxWidth:   280,
  },

  /* ── Primary action button (green pill) ── */
  primaryBtn: {
    marginTop:    12,
    background:   GREEN,
    color:        GREEN_TEXT,
    fontWeight:   700,
    fontSize:     14,
    padding:      '11px 24px',
    borderRadius: RADIUS_PILL,
    cursor:       'pointer',
    border:       'none',
  },

  /* ── "Done" button (used in Picker header + footer) ── */
  doneBtn: {
    background:   GREEN,
    color:        GREEN_TEXT,
    fontWeight:   700,
    fontSize:     14,
    padding:      '9px 20px',
    borderRadius: RADIUS_PILL,
    cursor:       'pointer',
    flexShrink:   0,
    border:       'none',
  },
}
