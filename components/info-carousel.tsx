"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: "about",
    title: "Your neighborhood club since 1912",
    content: (
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p>
          We've been part of the Summit Hill neighborhood since 1912. The Saint Paul Tennis Club is a small, friendly
          place where families come to play tennis, swim, and enjoy summer together. We're open Memorial Day through
          Labor Day with programs for kids and adults.
        </p>
        <p>
          Our historic clubhouse and courts have that old-school charm, but we keep things relaxed and fun. Whether
          you're here for a serious match or just want to cool off in the pool, everyone's welcome.
        </p>
        <p>Stop by and see what makes our little club special. We'd love to have you join our tennis family.</p>
      </div>
    ),
    image: "/sptc_south.jpg",
    imageAlt: "Historic Saint Paul Tennis Club building",
  },
  {
    id: "tennis",
    title: "Tennis for everyone",
    content: (
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p>
          We have six well-maintained courts ready for play all season long. Whether you're a beginner or a seasoned
          player, you'll find your place here.
        </p>
        <p>
          Our tennis programs include group lessons for kids, adult clinics, and league play. We also host friendly
          tournaments throughout the summer. Court reservations are easy through our member portal.
        </p>
        <p>
          Drop-in play is always welcome, and you'll usually find someone around for a quick match. It's a great way to
          meet your neighbors and get some exercise.
        </p>
      </div>
    ),
    image: "/sptc_tennis.jpg",
    imageAlt: "Tennis courts at Saint Paul Tennis Club",
  },
  {
    id: "swimming",
    title: "Cool off at the pool",
    content: (
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p>
          Our pool is the heart of the club during those hot summer days. It's a great size for lap swimming in the
          morning and family fun in the afternoon.
        </p>
        <p>
          We offer swim lessons for kids of all ages and abilities. Our instructors are experienced and patient, helping
          everyone from first-timers to competitive swimmers improve their skills.
        </p>
        <p>
          The pool area has plenty of space to relax, read a book, or catch up with friends. It's the perfect spot for
          families to spend a summer day together.
        </p>
      </div>
    ),
    image: "/sptc_pool_ariel_2.jpg",
    imageAlt: "Swimming pool at Saint Paul Tennis Club",
  },
  {
    id: "employment",
    title: "Join our team",
    content: (
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p>
          We're always looking for friendly, responsible people to join our summer staff.
        </p>
        <p>
          Working at the club is a great summer job. You'll be part of a close-knit team, work outdoors, and help create
          a fun atmosphere for our members. Many of our staff members return year after year.
        </p>
        <p>
          If you're interested in joining our team, send your resume and a brief note about yourself to{" "}
          <a href="mailto:jobs@saintpaultennisclub.com" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded-sm">
            jobs@saintpaultennisclub.com
          </a>
          . We typically start hiring in early spring.
        </p>
      </div>
    ),
    image: "/sptc_staff.JPG",
    imageAlt: "Staff at Saint Paul Tennis Club",
  },
  {
    id: "calendar",
    title: "What's happening",
    content: (
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <div className="space-y-4">
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-foreground mb-1">Memorial Day Opening</h3>
            <p className="text-sm">Last Monday in May - Season kicks off!</p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-foreground mb-1">Summer Tennis Clinics</h3>
            <p className="text-sm">June - August - Weekly sessions for all ages</p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-foreground mb-1">Family BBQ & Social</h3>
            <p className="text-sm">Mid-July - Bring the whole family!</p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-foreground mb-1">Club Championship</h3>
            <p className="text-sm">Late August - Friendly competition</p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-foreground mb-1">Labor Day Closing</h3>
            <p className="text-sm">First Monday in September - See you next year!</p>
          </div>
        </div>
        <p className="text-sm">Check the member portal for the full calendar and to sign up for events.</p>
      </div>
    ),
    image: "/summer-calendar-events-tennis-club.jpg",
    imageAlt: "Events calendar",
  },
]

export default function InfoCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 10000) // 10 seconds

    return () => clearInterval(timer)
  }, [isPaused])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      prevSlide()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      nextSlide()
    }
  }, [nextSlide, prevSlide])

  const handleFocus = useCallback(() => {
    setIsPaused(true)
  }, [])

  const handleBlur = useCallback((e: React.FocusEvent) => {
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
      setIsPaused(false)
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="py-24 bg-muted/30"
      aria-roledescription="carousel"
      aria-label="Club information slideshow"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Carousel content */}
          <div
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${currentSlide + 1} of ${slides.length}: ${slides[currentSlide].title}`}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-8 text-balance">
                {slides[currentSlide].title}
              </h2>

              {slides[currentSlide].content}

              {/* Navigation dots */}
              <div className="flex items-center gap-2 mt-8" role="tablist" aria-label="Slide navigation">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(index)}
                    role="tab"
                    aria-selected={index === currentSlide}
                    aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                    className={`h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      index === currentSlide ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] bg-muted rounded-lg overflow-hidden">
                <img
                  src={slides[currentSlide].image || "/placeholder.svg"}
                  alt={slides[currentSlide].imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center justify-center gap-4 mt-8 lg:absolute lg:bottom-0 lg:right-0 lg:mt-0">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full bg-transparent"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full bg-transparent"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
