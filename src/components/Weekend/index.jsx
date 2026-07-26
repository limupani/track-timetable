/**
 * components/Weekend/index.jsx
 *
 * The Sunday / Weekend screen — shown in ClassGrid when activeDay is Sunday.
 * Reads all content from config/weekend.js so this component never needs
 * to change when destinations, images, or text are updated.
 *
 * Grid layout:
 *   ┌──────────┬──────────┐
 *   │          │ Top Right│  row 1
 *   │  Left    ├──────────┤
 *   │  (tall)  │ Mid Right│  row 2
 *   ├──────────┴──────────┤
 *   │    Bottom Banner    │  row 3
 *   └─────────────────────┘
 */

import { WEEKEND_CONFIG as CFG } from '../../config/weekend'
import { weekendStyles as s }    from '../../styles/weekend'
import StudioCard from './StudioCard'
import BannerCard from './BannerCard'

export default function Weekend() {
  return (
    <div style={s.screen}>
      {/* Section heading */}
      <h2 style={s.heading}>{CFG.heading}</h2>

      {/* 2-column card grid */}
      <div style={s.grid}>
        {/* Tall left card — spans both rows */}
        <StudioCard
          image={CFG.cardLeft.image}
          alt={CFG.cardLeft.alt}
          url={CFG.cardLeft.url}
          background={CFG.cardLeft.background}
          label={CFG.cardLeft.label}
          style={s.cardLeft}
        />

        {/* Top right card */}
        <StudioCard
          image={CFG.cardTopRight.image}
          alt={CFG.cardTopRight.alt}
          url={CFG.cardTopRight.url}
          background={CFG.cardTopRight.background}
          style={s.cardTopRight}
        />

        {/* Middle right card */}
        <StudioCard
          image={CFG.cardMidRight.image}
          alt={CFG.cardMidRight.alt}
          url={CFG.cardMidRight.url}
          background={CFG.cardMidRight.background}
          style={s.cardMidRight}
        />
      </div>

      {/* Full-width non-clickable banner */}
      <BannerCard
        image={CFG.banner.image}
        eyebrow={CFG.banner.eyebrow}
        title={CFG.banner.title}
        background={CFG.banner.background}
      />
    </div>
  )
}
