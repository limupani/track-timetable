/**
 * hooks/useSelectedCourses.js
 *
 * Manages the Set of course+section keys the student has enrolled in.
 *
 * Responsibilities:
 *   - Load persisted selections from localStorage on mount.
 *   - Write back to localStorage whenever the selection changes.
 *   - Expose a stable `toggle` callback so callers don't re-render unnecessarily.
 *
 * Nothing in this hook knows about the UI — it just manages state + storage.
 */

import { useState, useEffect, useCallback } from 'react'
import { STORAGE_KEY } from '../constants'

export function useSelectedCourses() {
  const [selected, setSelected] = useState(() => new Set())

  // Load on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setSelected(new Set(JSON.parse(raw)))
    } catch {
      // Corrupted storage — start fresh
    }
  }, [])

  // Persist on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...selected]))
    } catch {}
  }, [selected])

  // Toggle a single key in/out
  const toggle = useCallback((key) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }, [])

  /**
   * Removes any saved selections that no longer exist in the current
   * timetable data. Called once on mount in App.jsx after combos are built.
   * Prevents stale counts after a timetable update.
   *
   * @param {Set<string>} validKeys - all pickerKeys present in current SESSIONS
   */
  const clean = useCallback((validKeys) => {
    setSelected(prev => {
      const next = new Set([...prev].filter(k => validKeys.has(k)))
      // Only trigger a re-render if something was actually removed
      return next.size !== prev.size ? next : prev
    })
  }, [])

  return { selected, toggle, clean }
}