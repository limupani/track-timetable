/**
 * components/Comic/index.jsx
 *
 * Displays the comic embedded in the project via public/comic.jpg.
 * Users can only read — no upload UI.
 *
 * To update the comic:
 *   1. Replace public/comic.jpg with the new file
 *   2. git add . && git commit -m "Update comic" && git push
 *   Vercel redeploys automatically.
 *
 * If no comic file exists yet, shows a "coming soon" message.
 */

import { useState }         from 'react'
import { COMIC_SRC }        from '../../constants'
import { comicStyles as s } from '../../styles/comic'

export default function Comic() {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div style={s.uploadOuter}>
        <div style={s.uploadEmoji}>📖</div>
        <h2 style={s.uploadTitle}>Comic coming soon</h2>
        <p style={s.uploadSub}>
          Check back on your next free day — something good is on the way.
        </p>
      </div>
    )
  }

  return (
    <div style={s.viewerWrapper}>
      {/* Top bar */}
      <div style={s.viewerTopBar}>
        <span style={s.viewerTitle}>Weekly Specials</span>
      </div>

      {/* Scrollable comic strip */}
      <div style={s.viewerScroll}>
        <img
          src={COMIC_SRC}
          alt="Comic"
          style={s.comicImage}
          draggable={false}
          onError={() => setError(true)}
        />
      </div>
    </div>
  )
}