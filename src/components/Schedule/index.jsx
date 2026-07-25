/**
 * components/Schedule/index.jsx
 *
 * Schedule screen with swipe-gesture day navigation.
 *
 * Animation contract:
 *   - Tab click  → slideContent(direction) exits, then onDayChange, then enters.
 *   - Swipe      → useSwipe slides content out, calls handleSwipeLeft/Right,
 *                  which call onDayChange then slide content back in.
 *   Both paths share the same slideIn() helper so the enter animation is identical.
 */

import { useRef, useCallback } from 'react'
import { DAYS }               from '../../constants'
import { scheduleStyles as s } from '../../styles/schedule'
import { useSwipe }           from '../../hooks/useSwipe'
import Header    from './Header'
import DayTabs   from './DayTabs'
import ClassGrid from './ClassGrid'
import Branding  from '../Branding'

/** Slides the content element in from a given side after a day change. */
function slideIn(el, fromDirection) {
  if (!el) return
  // Place off-screen on the incoming side instantly
  el.style.transition = 'none'
  el.style.transform  = fromDirection === 'left' ? 'translateX(100%)' : 'translateX(-100%)'
  // Then animate to centre on the next paint
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.style.transition = 'transform 0.22s ease'
      el.style.transform  = 'translateX(0)'
    })
  })
}

export default function Schedule({
  activeDay,
  dayClasses,
  today,
  nowMin,
  selected,
  onDayChange,
  onOpenPicker,
}) {
  const containerRef = useRef(null) // receives touch events (whole screen)
  const contentRef   = useRef(null) // animated element (ClassGrid area)

  /**
   * Called by DayTabs when the user taps a tab.
   * Determines slide direction from old→new index, animates out,
   * changes day, then animates in.
   */
  const handleTabChange = useCallback((newDay) => {
    const oldIdx = DAYS.indexOf(activeDay)
    const newIdx = DAYS.indexOf(newDay)
    const direction = newIdx > oldIdx ? 'left' : 'right'
    const el = contentRef.current

    // Slide out
    if (el) {
      el.style.transition = 'transform 0.2s ease'
      el.style.transform  = direction === 'left' ? 'translateX(-100%)' : 'translateX(100%)'
    }

    setTimeout(() => {
      onDayChange(newDay)
      slideIn(el, direction)
    }, 200)
  }, [activeDay, onDayChange])

  /**
   * Called by useSwipe after the swipe-out animation completes.
   * The content is already off-screen, so we just change the day
   * and slide it back in from the opposite side.
   */
  const handleSwipeLeft = useCallback(() => {
    const idx    = DAYS.indexOf(activeDay)
    const newDay = DAYS[(idx + 1) % DAYS.length]
    onDayChange(newDay)
    slideIn(contentRef.current, 'left')
  }, [activeDay, onDayChange])

  const handleSwipeRight = useCallback(() => {
    const idx    = DAYS.indexOf(activeDay)
    const newDay = DAYS[(idx - 1 + DAYS.length) % DAYS.length]
    onDayChange(newDay)
    slideIn(contentRef.current, 'right')
  }, [activeDay, onDayChange])

  useSwipe({
    containerRef,
    contentRef,
    onSwipeLeft:  handleSwipeLeft,
    onSwipeRight: handleSwipeRight,
    threshold:    60,
  })

  return (
    <div ref={containerRef} style={{ ...s.screen, overflow: 'hidden' }}>
      <Header activeDay={activeDay} onOpenPicker={onOpenPicker} />
      <DayTabs activeDay={activeDay} onDayChange={handleTabChange} />

      {/* contentRef wraps everything that slides during transitions */}
      <div ref={contentRef} style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <ClassGrid
          activeDay={activeDay}
          dayClasses={dayClasses}
          today={today}
          nowMin={nowMin}
          selected={selected}
          onOpenPicker={onOpenPicker}
        />
      </div>
    </div>
  )
}
