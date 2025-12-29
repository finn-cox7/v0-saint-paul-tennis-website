"use client"

import { useState, useRef, useEffect } from "react"
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false)
  const [isSwimDropdownOpen, setIsSwimDropdownOpen] = useState(false)
  const [isTennisDropdownOpen, setIsTennisDropdownOpen] = useState(false)
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false)
  const [isEmploymentDropdownOpen, setIsEmploymentDropdownOpen] = useState(false)
  const aboutDropdownRef = useRef<HTMLDivElement>(null)
  const swimDropdownRef = useRef<HTMLDivElement>(null)
  const tennisDropdownRef = useRef<HTMLDivElement>(null)
  const contactDropdownRef = useRef<HTMLDivElement>(null)
  const employmentDropdownRef = useRef<HTMLDivElement>(null)
  const aboutTimerRef = useRef<NodeJS.Timeout | null>(null)
  const swimTimerRef = useRef<NodeJS.Timeout | null>(null)
  const tennisTimerRef = useRef<NodeJS.Timeout | null>(null)
  const contactTimerRef = useRef<NodeJS.Timeout | null>(null)
  const employmentTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target as Node)) {
        setIsAboutDropdownOpen(false)
        if (aboutTimerRef.current) {
          clearTimeout(aboutTimerRef.current)
          aboutTimerRef.current = null
        }
      }
      if (swimDropdownRef.current && !swimDropdownRef.current.contains(event.target as Node)) {
        setIsSwimDropdownOpen(false)
        if (swimTimerRef.current) {
          clearTimeout(swimTimerRef.current)
          swimTimerRef.current = null
        }
      }
      if (tennisDropdownRef.current && !tennisDropdownRef.current.contains(event.target as Node)) {
        setIsTennisDropdownOpen(false)
        if (tennisTimerRef.current) {
          clearTimeout(tennisTimerRef.current)
          tennisTimerRef.current = null
        }
      }
      if (contactDropdownRef.current && !contactDropdownRef.current.contains(event.target as Node)) {
        setIsContactDropdownOpen(false)
        if (contactTimerRef.current) {
          clearTimeout(contactTimerRef.current)
          contactTimerRef.current = null
        }
      }
      if (employmentDropdownRef.current && !employmentDropdownRef.current.contains(event.target as Node)) {
        setIsEmploymentDropdownOpen(false)
        if (employmentTimerRef.current) {
          clearTimeout(employmentTimerRef.current)
          employmentTimerRef.current = null
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      if (aboutTimerRef.current) {
        clearTimeout(aboutTimerRef.current)
      }
      if (swimTimerRef.current) {
        clearTimeout(swimTimerRef.current)
      }
      if (tennisTimerRef.current) {
        clearTimeout(tennisTimerRef.current)
      }
      if (contactTimerRef.current) {
        clearTimeout(contactTimerRef.current)
      }
      if (employmentTimerRef.current) {
        clearTimeout(employmentTimerRef.current)
      }
    }
  }, [])

  const handleAboutDropdownClick = () => {
    if (aboutTimerRef.current) {
      clearTimeout(aboutTimerRef.current)
      aboutTimerRef.current = null
    }

    const newState = !isAboutDropdownOpen
    setIsAboutDropdownOpen(newState)

    if (newState) {
      aboutTimerRef.current = setTimeout(() => {
        setIsAboutDropdownOpen(false)
        aboutTimerRef.current = null
      }, 3000)
    }
  }

  const handleAboutMouseEnter = () => {
    if (aboutTimerRef.current) {
      clearTimeout(aboutTimerRef.current)
      aboutTimerRef.current = null
    }
    setIsAboutDropdownOpen(true)
  }

  const handleAboutMouseLeave = () => {
    if (aboutTimerRef.current) {
      clearTimeout(aboutTimerRef.current)
    }
    aboutTimerRef.current = setTimeout(() => {
      setIsAboutDropdownOpen(false)
      aboutTimerRef.current = null
    }, 3000)
  }

  const handleSwimDropdownClick = () => {
    if (swimTimerRef.current) {
      clearTimeout(swimTimerRef.current)
      swimTimerRef.current = null
    }

    const newState = !isSwimDropdownOpen
    setIsSwimDropdownOpen(newState)

    if (newState) {
      swimTimerRef.current = setTimeout(() => {
        setIsSwimDropdownOpen(false)
        swimTimerRef.current = null
      }, 3000)
    }
  }

  const handleSwimMouseEnter = () => {
    if (swimTimerRef.current) {
      clearTimeout(swimTimerRef.current)
      swimTimerRef.current = null
    }
    setIsSwimDropdownOpen(true)
  }

  const handleSwimMouseLeave = () => {
    if (swimTimerRef.current) {
      clearTimeout(swimTimerRef.current)
    }
    swimTimerRef.current = setTimeout(() => {
      setIsSwimDropdownOpen(false)
      swimTimerRef.current = null
    }, 3000)
  }

  const handleTennisDropdownClick = () => {
    if (tennisTimerRef.current) {
      clearTimeout(tennisTimerRef.current)
      tennisTimerRef.current = null
    }

    const newState = !isTennisDropdownOpen
    setIsTennisDropdownOpen(newState)

    if (newState) {
      tennisTimerRef.current = setTimeout(() => {
        setIsTennisDropdownOpen(false)
        tennisTimerRef.current = null
      }, 3000)
    }
  }

  const handleTennisMouseEnter = () => {
    if (tennisTimerRef.current) {
      clearTimeout(tennisTimerRef.current)
      tennisTimerRef.current = null
    }
    setIsTennisDropdownOpen(true)
  }

  const handleTennisMouseLeave = () => {
    if (tennisTimerRef.current) {
      clearTimeout(tennisTimerRef.current)
    }
    tennisTimerRef.current = setTimeout(() => {
      setIsTennisDropdownOpen(false)
      tennisTimerRef.current = null
    }, 3000)
  }

  const handleContactDropdownClick = () => {
    if (contactTimerRef.current) {
      clearTimeout(contactTimerRef.current)
      contactTimerRef.current = null
    }

    const newState = !isContactDropdownOpen
    setIsContactDropdownOpen(newState)

    if (newState) {
      contactTimerRef.current = setTimeout(() => {
        setIsContactDropdownOpen(false)
        contactTimerRef.current = null
      }, 3000)
    }
  }

  const handleContactMouseEnter = () => {
    if (contactTimerRef.current) {
      clearTimeout(contactTimerRef.current)
      contactTimerRef.current = null
    }
    setIsContactDropdownOpen(true)
  }

  const handleContactMouseLeave = () => {
    if (contactTimerRef.current) {
      clearTimeout(contactTimerRef.current)
    }
    contactTimerRef.current = setTimeout(() => {
      setIsContactDropdownOpen(false)
      contactTimerRef.current = null
    }, 3000)
  }

  const handleEmploymentDropdownClick = () => {
    if (employmentTimerRef.current) {
      clearTimeout(employmentTimerRef.current)
      employmentTimerRef.current = null
    }

    const newState = !isEmploymentDropdownOpen
    setIsEmploymentDropdownOpen(newState)

    if (newState) {
      employmentTimerRef.current = setTimeout(() => {
        setIsEmploymentDropdownOpen(false)
        employmentTimerRef.current = null
      }, 3000)
    }
  }

  const handleEmploymentMouseEnter = () => {
    if (employmentTimerRef.current) {
      clearTimeout(employmentTimerRef.current)
      employmentTimerRef.current = null
    }
    setIsEmploymentDropdownOpen(true)
  }

  const handleEmploymentMouseLeave = () => {
    if (employmentTimerRef.current) {
      clearTimeout(employmentTimerRef.current)
    }
    employmentTimerRef.current = setTimeout(() => {
      setIsEmploymentDropdownOpen(false)
      employmentTimerRef.current = null
    }, 3000)
  }

  const handleMobileLinkClick = () => {
    setIsMenuOpen(false)
    setIsAboutDropdownOpen(false)
    setIsSwimDropdownOpen(false)
    setIsTennisDropdownOpen(false)
    setIsContactDropdownOpen(false)
    setIsEmploymentDropdownOpen(false)
  }

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="hidden md:flex items-center justify-between py-1 text-sm text-muted-foreground border-b border-border">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>(651) 224-3742</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>info@saintpaultennisclub.com</span>
            </div>
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
            <div
              ref={aboutDropdownRef}
              className="relative"
              onMouseEnter={handleAboutMouseEnter}
              onMouseLeave={handleAboutMouseLeave}
            >
              <button
                onClick={handleAboutDropdownClick}
                className="text-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                About
                <ChevronDown className={`h-4 w-4 transition-transform ${isAboutDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {isAboutDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-border rounded-md shadow-lg py-2">
                  <Link
                    href="/about/club-overview"
                    className="block px-4 py-2 text-foreground hover:bg-accent hover:text-primary transition-colors"
                  >
                    Club Overview
                  </Link>
                  <Link
                    href="/about/club-history"
                    className="block px-4 py-2 text-foreground hover:bg-accent hover:text-primary transition-colors"
                  >
                    Club History
                  </Link>
                  <Link
                    href="/about/events"
                    className="block px-4 py-2 text-foreground hover:bg-accent hover:text-primary transition-colors"
                  >
                    Events
                  </Link>
                </div>
              )}
            </div>
            <div
              ref={tennisDropdownRef}
              className="relative"
              onMouseEnter={handleTennisMouseEnter}
              onMouseLeave={handleTennisMouseLeave}
            >
              <button
                onClick={handleTennisDropdownClick}
                className="text-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                Tennis
                <ChevronDown className={`h-4 w-4 transition-transform ${isTennisDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {isTennisDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-border rounded-md shadow-lg py-2">
                  <Link
                    href="/tennis/hours-rules"
                    className="block px-4 py-2 text-foreground hover:bg-accent hover:text-primary transition-colors"
                  >
                    Hours & Rules
                  </Link>
                  <Link
                    href="/tennis/schedule"
                    className="block px-4 py-2 text-foreground hover:bg-accent hover:text-primary transition-colors"
                  >
                    Schedule
                  </Link>
                  <Link
                    href="/tennis/court-reservations"
                    className="block px-4 py-2 text-foreground hover:bg-accent hover:text-primary transition-colors"
                  >
                    Court Reservations
                  </Link>
                  <Link
                    href="/tennis/instruction"
                    className="block px-4 py-2 text-foreground hover:bg-accent hover:text-primary transition-colors"
                  >
                    Instruction
                  </Link>
                  <Link
                    href="/tennis/private-lessons"
                    className="block px-4 py-2 text-foreground hover:bg-accent hover:text-primary transition-colors"
                  >
                    Private Lessons
                  </Link>
                  <Link
                    href="/tennis/gregs-bio"
                    className="block px-4 py-2 text-foreground hover:bg-accent hover:text-primary transition-colors"
                  >
                    Greg's Bio
                  </Link>
                </div>
              )}
            </div>
            <div
              ref={swimDropdownRef}
              className="relative"
              onMouseEnter={handleSwimMouseEnter}
              onMouseLeave={handleSwimMouseLeave}
            >
              <button
                onClick={handleSwimDropdownClick}
                className="text-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                Swim
                <ChevronDown className={`h-4 w-4 transition-transform ${isSwimDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {isSwimDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-border rounded-md shadow-lg py-2">
                  <Link
                    href="/swim/hours-rules"
                    className="block px-4 py-2 text-foreground hover:bg-accent hover:text-primary transition-colors"
                  >
                    Hours & Rules
                  </Link>
                  <Link
                    href="/swim/schedule"
                    className="block px-4 py-2 text-foreground hover:bg-accent hover:text-primary transition-colors"
                  >
                    Schedule
                  </Link>
                  <Link
                    href="/swim/lap-swim-reservations"
                    className="block px-4 py-2 text-foreground hover:bg-accent hover:text-primary transition-colors"
                  >
                    Lap Swim Reservations
                  </Link>
                  <Link
                    href="/swim/instruction"
                    className="block px-4 py-2 text-foreground hover:bg-accent hover:text-primary transition-colors"
                  >
                    Instruction
                  </Link>
                  <Link
                    href="/swim/private-lessons"
                    className="block px-4 py-2 text-foreground hover:bg-accent hover:text-primary transition-colors"
                  >
                    Private Lessons
                  </Link>
                  <Link
                    href="/swim/swim-team-info"
                    className="block px-4 py-2 text-foreground hover:bg-accent hover:text-primary transition-colors"
                  >
                    Swim Team Info
                  </Link>
                  <Link
                    href="/swim/lisas-bio"
                    className="block px-4 py-2 text-foreground hover:bg-accent hover:text-primary transition-colors"
                  >
                    Lisa's Bio
                  </Link>
                </div>
              )}
            </div>
            <div
              ref={contactDropdownRef}
              className="relative"
              onMouseEnter={handleContactMouseEnter}
              onMouseLeave={handleContactMouseLeave}
            >
              <button
                onClick={handleContactDropdownClick}
                className="text-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                Contact
                <ChevronDown className={`h-4 w-4 transition-transform ${isContactDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {isContactDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-border rounded-md shadow-lg py-2">
                  <Link
                    href="/contact/contact-us"
                    className="block px-4 py-2 text-foreground hover:bg-accent hover:text-primary transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              )}
            </div>
            <div
              ref={employmentDropdownRef}
              className="relative"
              onMouseEnter={handleEmploymentMouseEnter}
              onMouseLeave={handleEmploymentMouseLeave}
            >
              <button
                onClick={handleEmploymentDropdownClick}
                className="text-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                Employment
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${isEmploymentDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isEmploymentDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-border rounded-md shadow-lg py-2">
                  <Link
                    href="/employment/staff"
                    className="block px-4 py-2 text-foreground hover:bg-accent hover:text-primary transition-colors"
                  >
                    Staff
                  </Link>
                  <Link
                    href="/employment/apply"
                    className="block px-4 py-2 text-foreground hover:bg-accent hover:text-primary transition-colors"
                  >
                    Apply
                  </Link>
                </div>
              )}
            </div>
            <Link
              href="/member-portal"
              className="text-white px-6 py-2 rounded-md transition-colors font-medium"
              style={{ backgroundColor: "#5a7d5d" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4a6d4d")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#5a7d5d")}
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
              <div>
                <button
                  onClick={handleAboutDropdownClick}
                  className="text-foreground hover:text-primary transition-colors flex items-center gap-1 w-full"
                >
                  About
                  <ChevronDown className={`h-4 w-4 transition-transform ${isAboutDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {isAboutDropdownOpen && (
                  <div className="ml-4 mt-2 flex flex-col space-y-2">
                    <Link href="/about/club-overview" className="text-foreground hover:text-primary transition-colors">
                      Club Overview
                    </Link>
                    <Link href="/about/club-history" className="text-foreground hover:text-primary transition-colors">
                      Club History
                    </Link>
                    <Link href="/about/events" className="text-foreground hover:text-primary transition-colors">
                      Events
                    </Link>
                  </div>
                )}
              </div>
              <div>
                <button
                  onClick={handleTennisDropdownClick}
                  className="text-foreground hover:text-primary transition-colors flex items-center gap-1 w-full"
                >
                  Tennis
                  <ChevronDown className={`h-4 w-4 transition-transform ${isTennisDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {isTennisDropdownOpen && (
                  <div className="ml-4 mt-2 flex flex-col space-y-2">
                    <Link href="/tennis/hours-rules" className="text-foreground hover:text-primary transition-colors">
                      Hours & Rules
                    </Link>
                    <Link href="/tennis/schedule" className="text-foreground hover:text-primary transition-colors">
                      Schedule
                    </Link>
                    <Link
                      href="/tennis/court-reservations"
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      Court Reservations
                    </Link>
                    <Link href="/tennis/instruction" className="text-foreground hover:text-primary transition-colors">
                      Instruction
                    </Link>
                    <Link
                      href="/tennis/private-lessons"
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      Private Lessons
                    </Link>
                    <Link href="/tennis/gregs-bio" className="text-foreground hover:text-primary transition-colors">
                      Greg's Bio
                    </Link>
                  </div>
                )}
              </div>
              <div>
                <button
                  onClick={handleSwimDropdownClick}
                  className="text-foreground hover:text-primary transition-colors flex items-center gap-1 w-full"
                >
                  Swim
                  <ChevronDown className={`h-4 w-4 transition-transform ${isSwimDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {isSwimDropdownOpen && (
                  <div className="ml-4 mt-2 flex flex-col space-y-2">
                    <Link href="/swim/hours-rules" className="text-foreground hover:text-primary transition-colors">
                      Hours & Rules
                    </Link>
                    <Link href="/swim/schedule" className="text-foreground hover:text-primary transition-colors">
                      Schedule
                    </Link>
                    <Link
                      href="/swim/lap-swim-reservations"
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      Lap Swim Reservations
                    </Link>
                    <Link href="/swim/instruction" className="text-foreground hover:text-primary transition-colors">
                      Instruction
                    </Link>
                    <Link href="/swim/private-lessons" className="text-foreground hover:text-primary transition-colors">
                      Private Lessons
                    </Link>
                    <Link href="/swim/swim-team-info" className="text-foreground hover:text-primary transition-colors">
                      Swim Team Info
                    </Link>
                    <Link href="/swim/lisas-bio" className="text-foreground hover:text-primary transition-colors">
                      Lisa's Bio
                    </Link>
                  </div>
                )}
              </div>
              <div>
                <button
                  onClick={handleContactDropdownClick}
                  className="text-foreground hover:text-primary transition-colors flex items-center gap-1 w-full"
                >
                  Contact
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${isContactDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isContactDropdownOpen && (
                  <div className="ml-4 mt-2 flex flex-col space-y-2">
                    <Link href="/contact/contact-us" className="text-foreground hover:text-primary transition-colors">
                      Contact Us
                    </Link>
                  </div>
                )}
              </div>
              <div>
                <button
                  onClick={handleEmploymentDropdownClick}
                  className="text-foreground hover:text-primary transition-colors flex items-center gap-1 w-full"
                >
                  Employment
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${isEmploymentDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isEmploymentDropdownOpen && (
                  <div className="ml-4 mt-2 flex flex-col space-y-2">
                    <Link href="/employment/staff" className="text-foreground hover:text-primary transition-colors">
                      Staff
                    </Link>
                    <Link href="/employment/apply" className="text-foreground hover:text-primary transition-colors">
                      Apply
                    </Link>
                  </div>
                )}
              </div>
              <Link
                href="/member-portal"
                className="text-white px-6 py-2 rounded-md transition-colors font-medium text-center"
                style={{ backgroundColor: "#5a7d5d" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4a6d4d")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#5a7d5d")}
                onClick={handleMobileLinkClick}
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
