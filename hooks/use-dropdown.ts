import { useState, useRef, useEffect, useCallback, KeyboardEvent } from 'react'

interface UseDropdownOptions {
  closeDelay?: number
  itemCount?: number
}

export function useDropdown(options: UseDropdownOptions = {}) {
  const { closeDelay = 3000, itemCount = 0 } = options
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const ref = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const itemRefs = useRef<(HTMLElement | null)[]>([])

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
      setFocusedIndex(-1)
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
          setFocusedIndex(-1)
          timerRef.current = null
        }, closeDelay)
      } else {
        setFocusedIndex(-1)
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
    setFocusedIndex(-1)
    clearTimer()
  }, [clearTimer])

  const setItemRef = useCallback((index: number, el: HTMLElement | null) => {
    itemRefs.current[index] = el
  }, [])

  const focusItem = useCallback((index: number) => {
    if (index >= 0 && index < itemRefs.current.length) {
      setFocusedIndex(index)
      itemRefs.current[index]?.focus()
    }
  }, [])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        close()
        break
      case 'ArrowDown':
        e.preventDefault()
        if (!isOpen) {
          open()
          setTimeout(() => focusItem(0), 0)
        } else {
          const nextIndex = focusedIndex < itemRefs.current.length - 1 ? focusedIndex + 1 : 0
          focusItem(nextIndex)
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (isOpen) {
          const prevIndex = focusedIndex > 0 ? focusedIndex - 1 : itemRefs.current.length - 1
          focusItem(prevIndex)
        }
        break
      case 'Enter':
      case ' ':
        if (!isOpen) {
          e.preventDefault()
          open()
          setTimeout(() => focusItem(0), 0)
        }
        break
      case 'Tab':
        if (isOpen) {
          close()
        }
        break
      case 'Home':
        if (isOpen) {
          e.preventDefault()
          focusItem(0)
        }
        break
      case 'End':
        if (isOpen) {
          e.preventDefault()
          focusItem(itemRefs.current.length - 1)
        }
        break
    }
  }, [isOpen, focusedIndex, open, close, focusItem])

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

  // Reset focused index when menu closes
  useEffect(() => {
    if (!isOpen) {
      setFocusedIndex(-1)
    }
  }, [isOpen])

  return {
    isOpen,
    ref,
    toggle,
    open,
    close,
    focusedIndex,
    setItemRef,
    handleKeyDown,
    handlers: {
      onMouseEnter: open,
      onMouseLeave: startCloseTimer,
    },
  }
}
