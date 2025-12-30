"use client"

import { useState } from "react"
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useDropdown } from "@/hooks/use-dropdown"

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

function DesktopDropdown({ item }: { item: NavItem }) {
  const dropdown = useDropdown()

  if (!item.items) {
    return (
      <Link href={item.href || "#"} className="text-foreground hover:text-primary transition-colors">
        {item.label}
      </Link>
    )
  }

  return (
    <div ref={dropdown.ref} className="relative" {...dropdown.handlers}>
      <button
        onClick={dropdown.toggle}
        className="text-foreground hover:text-primary transition-colors flex items-center gap-1"
      >
        {item.label}
        <ChevronDown className={`h-4 w-4 transition-transform ${dropdown.isOpen ? "rotate-180" : ""}`} />
      </button>
      {dropdown.isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-border rounded-md shadow-lg py-2 z-50">
          {item.items.map((subItem) => (
            <Link
              key={subItem.href}
              href={subItem.href}
              className="block px-4 py-2 text-foreground hover:bg-accent hover:text-primary transition-colors"
              onClick={dropdown.close}
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

  if (!item.items) {
    return (
      <Link
        href={item.href || "#"}
        className="text-foreground hover:text-primary transition-colors"
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
        className="text-foreground hover:text-primary transition-colors flex items-center gap-1 w-full"
      >
        {item.label}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="pl-4 mt-2 space-y-2">
          {item.items.map((subItem) => (
            <Link
              key={subItem.href}
              href={subItem.href}
              className="block text-foreground hover:text-primary transition-colors"
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

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar with contact info */}
        <div className="hidden sm:flex justify-end py-2 text-sm text-muted-foreground border-b border-border gap-6">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>651-224-3742</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>info@saintpaultennisclub.com</span>
          </div>
        </div>

        {/* Main navigation */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="/saint-paul-logo.jpeg" alt="Saint Paul Tennis Club" width={200} height={64} priority />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <DesktopDropdown key={item.label} item={item} />
            ))}
            <Link
              href="/member-portal"
              className="text-white px-6 py-2 rounded-md transition-colors font-medium bg-[#5a7d5d] hover:bg-[#4a6d4d]"
            >
              Member Portal
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <MobileDropdown key={item.label} item={item} onLinkClick={closeMenu} />
              ))}
              <Link
                href="/member-portal"
                className="text-white px-6 py-2 rounded-md transition-colors font-medium text-center bg-[#5a7d5d] hover:bg-[#4a6d4d]"
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
