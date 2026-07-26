/**
 * components/Comic/ComicViewer.jsx
 *
 * Displays the uploaded comic as a full-width, vertically scrollable image.
 * Designed for webtoon-style comics (one long vertical strip).
 *
 * Props:
 *   comicUrl {string}   - object URL of the comic image
 *   onRemove {function} - called when user wants to change/remove the comic
 */

import { comicStyles as s } from '../../styles/comic'

export default function ComicViewer({ comicUrl, onRemove }) {
  return (
    <div style={s.viewerWrapper}>
      {/* Top bar */}
      <div style={s.viewerTopBar}>
        <span style={s.viewerTitle}>📖 Comic</span>
        <button style={s.changeBtn} onClick={onRemove}>
          Change comic
        </button>
      </div>

      {/* Scrollable comic strip */}
      <div style={s.viewerScroll}>
        <img
          src={comicUrl}
          alt="Comic"
          style={s.comicImage}
          draggable={false}
        />
      </div>
    </div>
  )
}
