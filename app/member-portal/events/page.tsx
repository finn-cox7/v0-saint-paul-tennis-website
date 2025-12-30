"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Clock, Users, ChevronRight } from "lucide-react"

// Mock data
const mockEvents = {
  registered: [
    {
      id: 1,
      title: "Summer Social",
      date: "2025-06-15",
      time: "5:00 PM - 8:00 PM",
      location: "Pool Deck",
      description: "Annual kickoff party for the summer season",
      attending: 2,
    },
    {
      id: 2,
      title: "Family Tennis Night",
      date: "2025-06-22",
      time: "6:00 PM - 8:00 PM",
      location: "Tennis Courts",
      description: "Fun tennis activities for the whole family",
      attending: 4,
    },
  ],
  upcoming: [
    {
      id: 3,
      title: "Fourth of July Celebration",
      date: "2025-07-04",
      time: "4:00 PM - 9:00 PM",
      location: "Club Grounds",
      description: "Games, food, and fireworks viewing",
      spotsLeft: 25,
    },
    {
      id: 4,
      title: "Dive-In Movie Night",
      date: "2025-07-12",
      time: "8:30 PM",
      location: "Pool",
      description: "Watch a family movie while floating in the pool",
      spotsLeft: 40,
    },
    {
      id: 5,
      title: "Club Championships",
      date: "2025-08-02",
      time: "9:00 AM - 5:00 PM",
      location: "Tennis Courts",
      description: "Annual tennis tournament for all skill levels",
      spotsLeft: 12,
    },
  ],
}

export default function EventsPage() {
  const [events] = useState(mockEvents)

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <div className="bg-[#5a7d5d] text-white py-6">
          <div className="container mx-auto px-4">
            <Link href="/member-portal" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Portal
            </Link>
            <h1 className="text-2xl font-bold">Events</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* My Registrations */}
          {events.registered.length > 0 && (
            <section className="mb-10">
              <h2 className="text-lg font-semibold text-foreground mb-4">My Registrations</h2>
              <div className="space-y-4">
                {events.registered.map((event) => (
                  <div key={event.id} className="bg-white border border-[#5a7d5d]/30 rounded-lg p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs bg-[#5a7d5d] text-white px-2 py-0.5 rounded">Registered</span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(event.date)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {event.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {event.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {event.attending} attending
                          </div>
                        </div>
                      </div>
                      <button className="text-sm text-red-600 hover:underline">Cancel</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Upcoming Events */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Upcoming Events</h2>
              <Link href="/about/events" className="text-sm text-[#5a7d5d] hover:underline flex items-center gap-1">
                View all events <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {events.upcoming.map((event) => (
                <div key={event.id} className="bg-white border rounded-lg p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(event.date)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </div>
                      </div>
                      <p className="text-sm text-[#5a7d5d] mt-2">{event.spotsLeft} spots left</p>
                    </div>
                    <button className="bg-[#5a7d5d] text-white px-4 py-2 rounded-md hover:bg-[#4a6d4d] transition-colors text-sm font-medium">
                      Register
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
