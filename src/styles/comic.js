/**
 * styles/comic.js
 *
 * Styles for the comic reader and its empty/error states.
 */

import { WHITE, DIVIDER } from './tokens'

export const comicStyles = {
  /* ── "Coming soon" empty state ── */
  uploadOuter: {
    display:        'flex',
    flexDirection:  'column',
    alignItems:     'center',
    justifyContent: 'center',
    flex:           1,
    padding:        '32px 24px',
    gap:            12,
    textAlign:      'center',
  },
  uploadEmoji: {
    fontSize:   44,
    lineHeight: 1,
  },
  uploadTitle: {
    fontSize:   20,
    fontWeight: 700,
    color:      '#111',
    margin:     0,
  },
  uploadSub: {
    fontSize:   13.5,
    color:      '#888',
    lineHeight: 1.55,
    maxWidth:   260,
    margin:     0,
  },

  /* ── Viewer ── */
  viewerWrapper: {
    display:       'flex',
    flexDirection: 'column',
    flex:          1,
    minHeight:     0,
    overflow:      'hidden',
  },
  viewerTopBar: {
    display:        'flex',
    justifyContent: 'space-between',
    alignItems:     'center',
    padding:        '2px 16px',
    flexShrink:     0,
  },
  viewerTitle: {
    fontSize:   30,
    fontWeight: 500,
    color:      '#111',
    fontFamily: '"Oct",sans-serif'
  },
  viewerScroll: {
    flex:                    1,
    overflowY:               'auto',
    overflowX:               'hidden',
    WebkitOverflowScrolling: 'touch',
  },
  comicImage: {
    width:        'calc(100% - 32px)', // ← 16px padding on each side
    maxWidth:     'calc(100% - 32px)',
    display:      'block',
    margin:       '0 auto 16px',         // ← 16px top/bottom gap too
    borderRadius: 16,                  // ← rounded corners
  },
}