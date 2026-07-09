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

/**
 * @returns {{
 *   selected: Set<string>,
 *   toggle:   (key: string) => void,
 * }}
 */
export function useSelectedCourses() {
  const [selected, setSelected] = useState(() => new Set())

  // ── Load on mount ───────────────────────────────────────────
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setSelected(new Set(JSON.parse(raw)))
    } catch {
      // Corrupted storage — start fresh silently.
    }
  }, [])

  // ── Persist on every change ─────────────────────────────────
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...selected]))
    } catch {
      // Storage quota exceeded or private-browsing restriction — ignore.
    }
  }, [selected])

  // ── Toggle a single key in/out of the set ──────────────────
  const toggle = useCallback((key) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }, [])

  return { selected, toggle }
}
