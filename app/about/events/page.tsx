"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, DollarSign, Plus, X } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type Event = {
  id: number
  title: string
  date: string
  time: string
  slots: number
  price: number
  category: "swim" | "tennis" | "social"
  description: string
}

const initialEvents: Event[] = [
  {
    id: 1,
    title: "Summer Swim Meet",
    date: "2025-06-15",
    time: "9:00 AM",
    slots: 50,
    price: 25,
    category: "swim",
    description: "Annual summer swim competition for all ages and skill levels.",
  },
  {
    id: 2,
    title: "Tennis Tournament",
    date: "2025-06-20",
    time: "10:00 AM",
    slots: 32,
    price: 35,
    category: "tennis",
    description: "Singles and doubles tennis tournament with prizes for winners.",
  },
  {
    id: 3,
    title: "Family BBQ Night",
    date: "2025-06-28",
    time: "5:00 PM",
    slots: 100,
    price: 15,
    category: "social",
    description: "Join us for a fun evening of food, games, and community.",
  },
  {
    id: 4,
    title: "Junior Swim Clinic",
    date: "2025-07-05",
    time: "2:00 PM",
    slots: 20,
    price: 30,
    category: "swim",
    description: "Specialized training clinic for junior swimmers ages 8-14.",
  },
  {
    id: 5,
    title: "Adult Tennis Mixer",
    date: "2025-07-12",
    time: "6:00 PM",
    slots: 24,
    price: 20,
    category: "tennis",
    description: "Social tennis event for adults with refreshments included.",
  },
  {
    id: 6,
    title: "Pool Party & Movie Night",
    date: "2025-07-19",
    time: "7:00 PM",
    slots: 75,
    price: 10,
    category: "social",
    description: "Evening pool party followed by outdoor movie screening.",
  },
  {
    id: 7,
    title: "Swim Team Tryouts",
    date: "2025-08-02",
    time: "4:00 PM",
    slots: 30,
    price: 0,
    category: "swim",
    description: "Tryouts for the competitive swim team. Free for members.",
  },
  {
    id: 8,
    title: "Labor Day Tennis Social",
    date: "2025-09-01",
    time: "11:00 AM",
    slots: 40,
    price: 25,
    category: "tennis",
    description: "Celebrate Labor Day with tennis, food, and fun activities.",
  },
]

const categoryColors = {
  swim: "bg-blue-100 text-blue-800 border-blue-300",
  tennis: "bg-green-100 text-green-800 border-green-300",
  social: "bg-purple-100 text-purple-800 border-purple-300",
}

export default function EventsPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<"all" | "swim" | "tennis" | "social">("all")
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
  const [showUpcomingOnly, setShowUpcomingOnly] = useState<boolean>(false)
  const [showAddEventForm, setShowAddEventForm] = useState<boolean>(false)
  const [eventsList, setEventsList] = useState<Event[]>(initialEvents)
  const [newEvent, setNewEvent] = useState<Omit<Event, "id">>({
    title: "",
    date: "",
    time: "",
    slots: 0,
    price: 0,
    category: "swim",
    description: "",
  })

  useEffect(() => {
    try {
      const storedEvents = localStorage.getItem("sptc_events")
      if (storedEvents) {
        setEventsList(JSON.parse(storedEvents))
      } else {
        localStorage.setItem("sptc_events", JSON.stringify(initialEvents))
      }
    } catch {
      // Invalid JSON in localStorage, use initial events
      localStorage.setItem("sptc_events", JSON.stringify(initialEvents))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("sptc_events", JSON.stringify(eventsList))
  }, [eventsList])

  const filteredAndSortedEvents = eventsList
    .filter((event) => selectedCategory === "all" || event.category === selectedCategory)
    .filter((event) => {
      const eventDate = new Date(event.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (showUpcomingOnly && eventDate < today) {
        return false
      }

      if (startDate && new Date(startDate) > eventDate) {
        return false
      }
      if (endDate && new Date(endDate) < eventDate) {
        return false
      }

      return true
    })

  const handleAddEvent = () => {
    const slots = Number(newEvent.slots)

    // granular validation so the alert matches the actual issue
    if (!newEvent.title?.trim()) {
      alert("Please add a title.")
      return
    }
    if (!newEvent.date) {
      alert("Please pick a date.")
      return
    }
    if (!newEvent.time) {
      alert("Please pick a time.")
      return
    }
    if (!newEvent.description?.trim()) {
      alert("Please add a description.")
      return
    }
    if (!Number.isFinite(slots) || slots <= 0) {
      alert("Number of spots must be greater than 0.")
      return
    }

    const nextId = eventsList.length > 0 ? Math.max(...eventsList.map((e) => e.id)) + 1 : 1

    const eventToAdd: Event = {
      ...newEvent,
      id: nextId,
      slots, // <- ensure number in the saved event
      price: Number(newEvent.price ?? 0),
    }

    setEventsList((prev) => [...prev, eventToAdd])

    // reset with sensible defaults
    setNewEvent({
      title: "",
      date: "",
      time: "",
      slots: 1, // <- non-zero default
      price: 1,
      category: "swim",
      description: "",
    })

    setShowAddEventForm(false)
  }

  const handleRegister = (event: Event) => {
    if (event.slots <= 0) {
      alert("Sorry, this event is full.")
      return
    }
    router.push(`/checkout?eventId=${event.id}`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="relative h-[400px] w-full">
        <Image
          src="/sptc_events.jpg"
          alt="Saint Paul Tennis Club social event with members grilling and enjoying community activities"
          fill
          className="object-cover object-top"
          priority
        />
      </div>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold">Event Schedule</h1>
            <button
              onClick={() => setShowAddEventForm(!showAddEventForm)}
              className="flex items-center gap-2 px-6 py-3 rounded-md text-white font-medium transition-colors bg-[#5a7d5d] hover:bg-[#4a6d4d]"
            >
              {showAddEventForm ? (
                <>
                  <X className="h-5 w-5" />
                  Cancel
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5" />
                  Add Event
                </>
              )}
            </button>
          </div>
          <p className="text-lg text-muted-foreground mb-8">
            Join us for exciting events throughout the season. Register early as spots fill up quickly!
          </p>

          {showAddEventForm && (
            <div className="mb-8 p-6 bg-white border-2 border-[#5a7d5d] rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="event-title" className="block text-sm font-medium mb-2">
                    Event Title *
                  </label>
                  <input
                    id="event-title"
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a7d5d]"
                    placeholder="Enter event title"
                  />
                </div>

                <div>
                  <label htmlFor="event-category" className="block text-sm font-medium mb-2">
                    Category *
                  </label>
                  <select
                    id="event-category"
                    value={newEvent.category}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, category: e.target.value as "swim" | "tennis" | "social" })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a7d5d]"
                  >
                    <option value="swim">Swim</option>
                    <option value="tennis">Tennis</option>
                    <option value="social">Social</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="event-date" className="block text-sm font-medium mb-2">
                    Date *
                  </label>
                  <input
                    id="event-date"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a7d5d]"
                  />
                </div>

                <div>
                  <label htmlFor="event-time" className="block text-sm font-medium mb-2">
                    Time *
                  </label>
                  <input
                    id="event-time"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a7d5d]"
                  />
                </div>

                <div>
                  <label htmlFor="event-slots" className="block text-sm font-medium mb-2">
                    Number of Spots *
                  </label>
                  <input
                    id="event-slots"
                    type="number"
                    min="1"
                    value={newEvent.slots}
                    onChange={(e) => setNewEvent({ ...newEvent, slots: Number.parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a7d5d]"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label htmlFor="event-price" className="block text-sm font-medium mb-2">
                    Price ($) *
                  </label>
                  <input
                    id="event-price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newEvent.price}
                    onChange={(e) => setNewEvent({ ...newEvent, price: Number.parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a7d5d]"
                    placeholder="0.00"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="event-description" className="block text-sm font-medium mb-2">
                    Description *
                  </label>
                  <textarea
                    id="event-description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a7d5d]"
                    rows={3}
                    placeholder="Enter event description"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowAddEventForm(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEvent}
                  className="px-6 py-2 rounded-md text-white font-medium transition-colors bg-[#5a7d5d] hover:bg-[#4a6d4d]"
                >
                  Create Event
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Filter by Category</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    selectedCategory === "all" ? "text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                  style={selectedCategory === "all" ? { backgroundColor: "#5a7d5d" } : undefined}
                >
                  All Events
                </button>
                <button
                  onClick={() => setSelectedCategory("swim")}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    selectedCategory === "swim" ? "text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                  style={selectedCategory === "swim" ? { backgroundColor: "#5a7d5d" } : undefined}
                >
                  Swim
                </button>
                <button
                  onClick={() => setSelectedCategory("tennis")}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    selectedCategory === "tennis" ? "text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                  style={selectedCategory === "tennis" ? { backgroundColor: "#5a7d5d" } : undefined}
                >
                  Tennis
                </button>
                <button
                  onClick={() => setSelectedCategory("social")}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    selectedCategory === "social" ? "text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                  style={selectedCategory === "social" ? { backgroundColor: "#5a7d5d" } : undefined}
                >
                  Social
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 pt-4 border-t border-gray-200">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Filter by Date Range</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1">
                    <label htmlFor="start-date" className="block text-xs text-gray-600 mb-1">
                      Start Date
                    </label>
                    <input
                      id="start-date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a7d5d]"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="end-date" className="block text-xs text-gray-600 mb-1">
                      End Date
                    </label>
                    <input
                      id="end-date"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a7d5d]"
                    />
                  </div>
                  {(startDate || endDate) && (
                    <button
                      onClick={() => {
                        setStartDate("")
                        setEndDate("")
                      }}
                      className="px-4 py-2 bg-white text-gray-700 rounded-md hover:bg-gray-100 transition-colors self-end"
                    >
                      Clear Dates
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showUpcomingOnly}
                    onChange={(e) => setShowUpcomingOnly(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-[#5a7d5d] focus:ring-[#5a7d5d]"
                  />
                  <span className="text-sm font-medium">Show upcoming events only</span>
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {filteredAndSortedEvents.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No events found for the selected filters.</div>
            ) : (
              filteredAndSortedEvents.map((event) => (
                <div key={event.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-white">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <h2 className="text-2xl font-semibold">{event.title}</h2>
                        <Badge variant="outline" className={categoryColors[event.category]}>
                          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">{event.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {new Date(event.date).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{event.time}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{event.slots} spots available</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm font-semibold">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>{event.price === 0 ? "Free" : `$${event.price}`}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRegister(event)}
                      disabled={event.slots <= 0}
                      className="px-6 py-2 rounded-md text-white font-medium transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed bg-[#5a7d5d] hover:bg-[#4a6d4d]"
                    >
                      {event.slots <= 0 ? "Full" : "Register"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
