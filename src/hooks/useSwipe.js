/**
 * hooks/useSwipe.js
 *
 * Detects horizontal swipe gestures on a container element.
 * Uses native addEventListener (not React synthetic events) so we can
 * pass { passive: false } to touchmove — required to call preventDefault()
 * and stop the page scrolling during a horizontal swipe.
 *
 * Behaviour:
 *   1. Touch starts → record position, clear lock.
 *   2. Touch moves → on first meaningful movement, lock to either
 *      'horizontal' or 'vertical'. Vertical locks allow normal scroll.
 *      Horizontal locks prevent scroll and show live drag on contentRef.
 *   3. Touch ends →
 *      - Below threshold: snap content back to 0.
 *      - Above threshold: finish sliding content off-screen, then call
 *        onSwipeLeft / onSwipeRight so the parent can change the day
 *        and animate the new content in.
 *
 * @param {object} options
 * @param {React.RefObject} options.containerRef  - element that receives touch events
 * @param {React.RefObject} options.contentRef    - element that gets translated
 * @param {() => void}      options.onSwipeLeft   - called after left-swipe completes
 * @param {() => void}      options.onSwipeRight  - called after right-swipe completes
 * @param {number}          [options.threshold=60] - min px to count as a swipe
 */

import { useEffect, useRef } from 'react'

export function useSwipe({
  containerRef,
  contentRef,
  onSwipeLeft,
  onSwipeRight,
  threshold = 60,
}) {
  // Keep callbacks in refs so the effect never needs to re-run
  const onLeftRef  = useRef(onSwipeLeft)
  const onRightRef = useRef(onSwipeRight)
  useEffect(() => { onLeftRef.current  = onSwipeLeft  }, [onSwipeLeft])
  useEffect(() => { onRightRef.current = onSwipeRight }, [onSwipeRight])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let startX  = 0
    let startY  = 0
    let lock    = null   // 'h' | 'v' | null
    let active  = false

    function getContent() { return contentRef.current }

    function onStart(e) {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
      lock   = null
      active = true
    }

    function onMove(e) {
      if (!active) return
      const dx = e.touches[0].clientX - startX
      const dy = e.touches[0].clientY - startY

      // Lock direction after the finger moves at least 6px
      if (!lock && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
        lock = Math.abs(dx) > Math.abs(dy) ? 'h' : 'v'
      }

      if (lock === 'h') {
        e.preventDefault() // block vertical scroll while swiping horizontally
        const el = getContent()
        if (el) {
          el.style.transition = 'none'
          el.style.transform  = `translateX(${dx}px)`
        }
      }
    }

    function onEnd(e) {
      if (!active) return
      active = false

      if (lock !== 'h') return

      const dx = e.changedTouches[0].clientX - startX
      const el = getContent()

      if (Math.abs(dx) < threshold) {
        // Did not reach threshold — spring back to centre
        if (el) {
          el.style.transition = 'transform 0.25s ease'
          el.style.transform  = 'translateX(0)'
        }
        return
      }

      // Threshold reached — finish sliding off screen, then notify parent
      if (dx < 0) {
        // Swiped left (going to next day)
        if (el) {
          el.style.transition = 'transform 0.2s ease'
          el.style.transform  = 'translateX(-100%)'
        }
        setTimeout(() => onLeftRef.current?.(), 200)
      } else {
        // Swiped right (going to previous day)
        if (el) {
          el.style.transition = 'transform 0.2s ease'
          el.style.transform  = 'translateX(100%)'
        }
        setTimeout(() => onRightRef.current?.(), 200)
      }
    }

    container.addEventListener('touchstart', onStart, { passive: true  })
    container.addEventListener('touchmove',  onMove,  { passive: false })
    container.addEventListener('touchend',   onEnd,   { passive: true  })

    return () => {
      container.removeEventListener('touchstart', onStart)
      container.removeEventListener('touchmove',  onMove)
      container.removeEventListener('touchend',   onEnd)
    }
  }, [containerRef, contentRef, threshold])
}
