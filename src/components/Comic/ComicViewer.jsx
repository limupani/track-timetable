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
import Branding from '../Branding'             // ← add

export default function ComicViewer({ comicUrl, onRemove }) {
  return (
    <div style={s.viewerWrapper}>
      <div style={s.viewerTopBar}>
        <span style={s.viewerTitle}>📖 Comic</span>
      </div>

      <div style={s.viewerScroll}>
        <img
          src={comicUrl}
          alt="Comic"
          style={s.comicImage}
          draggable={false}
          onError={() => setError(true)}
        />
        <Branding />                           {/* ← add */}
      </div>
    </div>
  )
}