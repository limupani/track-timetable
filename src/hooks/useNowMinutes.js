/**
 * hooks/useNowMinutes.js
 *
 * Returns the current time as minutes-since-midnight and re-renders
 * subscribers every 60 seconds so "Now" badges stay accurate without
 * needing a full page refresh.
 *
 * Isolated here so the tick interval is created exactly once,
 * regardless of how many components consume it.
 */

import { useState, useEffect } from 'react'
import { nowMinutes } from '../utils/time'

/**
 * @returns {number} current time in minutes since midnight
 */
export function useNowMinutes() {
  const [now, setNow] = useState(nowMinutes)

  useEffect(() => {
    const id = setInterval(() => setNow(nowMinutes()), 60_000)
    return () => clearInterval(id)
  }, [])

  return now
}
