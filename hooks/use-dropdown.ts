import { useState, useRef, useEffect, useCallback } from 'react'

interface UseDropdownOptions {
  closeDelay?: number
}

export function useDropdown(options: UseDropdownOptions = {}) {
  const { closeDelay = 3000 } = options
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const startCloseTimer = useCallback(() => {
    clearTimer()
    timerRef.current = setTimeout(() => {
      setIsOpen(false)
      timerRef.current = null
    }, closeDelay)
  }, [closeDelay, clearTimer])

  const toggle = useCallback(() => {
    clearTimer()
    setIsOpen((prev) => {
      const newState = !prev
      if (newState) {
        timerRef.current = setTimeout(() => {
          setIsOpen(false)
          timerRef.current = null
        }, closeDelay)
      }
      return newState
    })
  }, [closeDelay, clearTimer])

  const open = useCallback(() => {
    clearTimer()
    setIsOpen(true)
  }, [clearTimer])

  const close = useCallback(() => {
    setIsOpen(false)
    clearTimer()
  }, [clearTimer])

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        close()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      clearTimer()
    }
  }, [close, clearTimer])

  return {
    isOpen,
    ref,
    toggle,
    open,
    close,
    handlers: {
      onMouseEnter: open,
      onMouseLeave: startCloseTimer,
    },
  }
}
