/**
 * config/weekend.js
 *
 * All configurable content for the Sunday / Weekend screen.
 * To update a card's destination, image, or text — edit only this file.
 *
 * IMAGE SETUP:
 *   Add your images to the public/studio/ folder:
 *     public/studio/card-left.jpg       ← tall left card artwork
 *     public/studio/card-top-right.jpg  ← top right card artwork
 *     public/studio/card-mid-right.jpg  ← middle right card artwork
 *     public/studio/banner.jpg          ← bottom banner background
 *
 *   Images in public/ are served at the root URL, so:
 *     '/studio/card-left.jpg' → public/studio/card-left.jpg
 *
 * URL SETUP:
 *   - External links: full URL e.g. 'https://instagram.com/...'
 *   - Internal pages: relative path e.g. '/comics'  (future)
 */

export const WEEKEND_CONFIG = {
  /** Section heading shown above the grid */
  heading: 'More from the\nStudio',

  /** Tall left card — primary feature card */
  cardLeft: {
    image:      '/studio/card-left.jpg',
    alt:        'Lemon And Bon',
    url:        'https://www.instagram.com/lemonandbon/',
    /** Fallback background colour if image fails to load */
    background: '#F2ECD9',
  },

  /** Top right card */
  cardTopRight: {
    image:      '/studio/card-top-right.jpg',
    alt:        'Plushie',
    url:        'https://www.instagram.com/lemonandbon/',
    background: '#E07B6F',
  },

  /** Middle right card */
  cardMidRight: {
    image:      '/studio/card-mid-right.png',
    alt:        'Limupani Studios',
    url:        'https://limupanistudios.vercel.app/',
    background: '#4A8C5C',
  },

  /**
   * Bottom banner — non-clickable, informational only.
   * Shows a background image with a title and subtitle overlay.
   */
  banner: {
    image:      '/studio/banner.jpg',
    background: '#72727a',
    eyebrow:    'Coming Soon',
    title:      'Eternal Nova',
  },
}
