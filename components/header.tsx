"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface NavItem {
  label: string
  href?: string
  items?: { label: string; href: string }[]
}

const navItems: NavItem[] = [
  {
    label: "About",
    items: [
      { label: "Club Overview", href: "/about/club-overview" },
      { label: "Club History", href: "/about/club-history" },
      { label: "Events", href: "/about/events" },
    ],
  },
  {
    label: "Tennis",
    items: [
      { label: "Hours & Rules", href: "/tennis/hours-rules" },
      { label: "Schedule", href: "/tennis/schedule" },
      { label: "Court Reservations", href: "/tennis/court-reservations" },
      { label: "Instruction", href: "/tennis/instruction" },
      { label: "Private Lessons", href: "/tennis/private-lessons" },
      { label: "Greg's Bio", href: "/tennis/gregs-bio" },
    ],
  },
  {
    label: "Swim",
    items: [
      { label: "Hours & Rules", href: "/swim/hours-rules" },
      { label: "Schedule", href: "/swim/schedule" },
      { label: "Lap Swim Reservations", href: "/swim/lap-swim-reservations" },
      { label: "Instruction", href: "/swim/instruction" },
      { label: "Private Lessons", href: "/swim/private-lessons" },
      { label: "Swim Team Info", href: "/swim/swim-team-info" },
      { label: "Lisa's Bio", href: "/swim/lisas-bio" },
    ],
  },
  {
    label: "Contact",
    items: [{ label: "Contact Us", href: "/contact/contact-us" }],
  },
  {
    label: "Employment",
    items: [
      { label: "Staff", href: "/employment/staff" },
      { label: "Apply", href: "/employment/apply" },
    ],
  },
]

interface DesktopDropdownProps {
  item: NavItem
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

function DesktopDropdown({ item, isOpen, onOpen, onClose }: DesktopDropdownProps) {
  const menuId = `menu-${item.label.toLowerCase().replace(/\s+/g, '-')}`

  if (!item.items) {
    return (
      <Link href={item.href || "#"} className="text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm">
        {item.label}
      </Link>
    )
  }

  return (
    <div
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        onClick={() => isOpen ? onClose() : onOpen()}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={menuId}
        className="text-foreground hover:text-primary transition-colors flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
      >
        {item.label}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {isOpen && (
        <div
          id={menuId}
          role="menu"
          aria-orientation="vertical"
          aria-label={`${item.label} submenu`}
          className="absolute top-full left-0 mt-2 w-56 bg-white border border-border rounded-md shadow-lg py-2 z-50"
        >
          {item.items.map((subItem) => (
            <Link
              key={subItem.href}
              href={subItem.href}
              role="menuitem"
              className="block px-4 py-2 text-foreground hover:bg-accent hover:text-primary transition-colors focus:bg-accent focus:text-primary focus:outline-none"
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function MobileDropdown({ item, onLinkClick }: { item: NavItem; onLinkClick: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const menuId = `mobile-menu-${item.label.toLowerCase().replace(/\s+/g, '-')}`

  if (!item.items) {
    return (
      <Link
        href={item.href || "#"}
        className="text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
        onClick={onLinkClick}
      >
        {item.label}
      </Link>
    )
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={menuId}
        className="text-foreground hover:text-primary transition-colors flex items-center gap-1 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
      >
        {item.label}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {isOpen && (
        <div id={menuId} className="pl-4 mt-2 space-y-2">
          {item.items.map((subItem) => (
            <Link
              key={subItem.href}
              href={subItem.href}
              className="block text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
              onClick={onLinkClick}
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const mobileMenuRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null)

  const closeMenu = useCallback(() => setIsMenuOpen(false), [])

  const handleDropdownOpen = useCallback((label: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setActiveDropdown(label)
  }, [])

  const handleDropdownClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
    }
    closeTimerRef.current = setTimeout(() => {
      setActiveDropdown(null)
      closeTimerRef.current = null
    }, 150)
  }, [])

  // Focus trap for mobile menu
  useEffect(() => {
    if (!isMenuOpen) return

    const menuElement = mobileMenuRef.current
    if (!menuElement) return

    const focusableElements = menuElement.querySelectorAll<HTMLElement>(
      'a, button, input, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    // Focus first element when menu opens
    firstElement?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
        return
      }

      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar with contact info */}
        <div className="hidden sm:flex justify-end py-2 text-sm text-muted-foreground border-b border-border gap-6">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span>651-224-3742</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" aria-hidden="true" />
            <span>info@saintpaultennisclub.com</span>
          </div>
        </div>

        {/* Main navigation */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center">
            <Link href="/" className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm">
              <Image src="/saint-paul-logo.jpeg" alt="Saint Paul Tennis Club" width={200} height={64} priority />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" aria-label="Main navigation">
            {navItems.map((item) => (
              <DesktopDropdown
                key={item.label}
                item={item}
                isOpen={activeDropdown === item.label}
                onOpen={() => handleDropdownOpen(item.label)}
                onClose={handleDropdownClose}
              />
            ))}
            <Link
              href="/member-portal"
              className="text-white px-6 py-2 rounded-md transition-colors font-medium bg-primary hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Member Portal
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            ref={menuButtonRef}
            className="lg:hidden p-2 min-h-11 min-w-11 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav
            ref={mobileMenuRef}
            id="mobile-navigation"
            className="lg:hidden py-4 border-t border-border"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <MobileDropdown key={item.label} item={item} onLinkClick={closeMenu} />
              ))}
              <Link
                href="/member-portal"
                className="text-white px-6 py-2 rounded-md transition-colors font-medium text-center bg-primary hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                onClick={closeMenu}
              >
                Member Portal
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
