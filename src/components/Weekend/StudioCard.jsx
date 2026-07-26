/**
 * components/Weekend/StudioCard.jsx
 *
 * A fully clickable card that opens a configurable URL.
 * Supports hover + tap animations and shows an external-link arrow
 * in the top-right corner.
 *
 * Props:
 *   image      {string}          - path to the card image (from public/)
 *   alt        {string}          - image alt text
 *   url        {string}          - destination URL (opens in new tab)
 *   background {string}          - fallback background colour if image fails
 *   label      {string|null}     - optional small text at bottom-left
 *   style      {object}          - grid placement style (cardLeft / cardTopRight / etc.)
 */

import { useState } from 'react'
import { weekendStyles as s } from '../../styles/weekend'

/** Small ↗ arrow icon */
function LinkIcon() {
  return (
    <div style={s.linkIcon}>
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <line x1="2" y1="12" x2="11" y2="2" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <polyline points="1,2 11,2 11,12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

export default function StudioCard({ image, alt, url, background, label, style }) {
  const [hovered, setHovered] = useState(false)

  function handleClick() {
    if (url) window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setTimeout(() => setHovered(false), 200)}
      role="link"
      tabIndex={0}
      aria-label={alt}
      onKeyDown={e => e.key === 'Enter' && handleClick()}
      style={{
        ...s.card,
        ...(hovered ? s.cardHover : s.cardDefault),
        background,
        ...style,
      }}
    >
      <img src={image} alt={alt} style={s.cardImage} />

      <LinkIcon />

      {label && (
        <span style={s.cardLabel}>{label}</span>
      )}
    </div>
  )
}
