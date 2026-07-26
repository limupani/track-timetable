/**
 * components/Weekend/BannerCard.jsx
 *
 * Non-clickable informational banner — full width, shows a background
 * image with an eyebrow + title text overlay.
 *
 * No hover effect, no link icon, no pointer cursor.
 *
 * Props:
 *   image      {string} - path to banner image (from public/)
 *   eyebrow    {string} - small text above the title (e.g. "Coming Soon")
 *   title      {string} - main banner title (e.g. "Eternal Nova")
 *   background {string} - fallback background colour
 */

import { weekendStyles as s } from '../../styles/weekend'

export default function BannerCard({ image, eyebrow, title, background }) {
  return (
    <div style={{ ...s.banner, background }}>
      <img src={image} alt={title} style={s.bannerImage} />

      <div style={s.bannerOverlay}>
        {eyebrow && <span style={s.bannerEyebrow}>{eyebrow}</span>}
        <span style={s.bannerTitle}>{title}</span>
      </div>
    </div>
  )
}
