"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, Clock, X, ChevronRight } from "lucide-react"

// Mock data
const mockReservations = {
  upcoming: [
    { id: 1, type: "tennis", title: "Tennis Court 2", date: "2025-06-11", time: "10:00 AM", duration: "90 min", status: "confirmed" },
    { id: 2, type: "swim", title: "Lap Swim Lane 3", date: "2025-06-12", time: "7:00 AM", duration: "30 min", status: "confirmed" },
    { id: 3, type: "tennis", title: "Tennis Court 1", date: "2025-06-14", time: "4:00 PM", duration: "60 min", status: "confirmed" },
  ],
  past: [
    { id: 4, type: "swim", title: "Lap Swim Lane 5", date: "2025-06-08", time: "6:30 AM", duration: "60 min", status: "completed" },
    { id: 5, type: "tennis", title: "Tennis Court 3", date: "2025-06-05", time: "9:00 AM", duration: "90 min", status: "completed" },
  ],
}

export default function ReservationsPage() {
  const [reservations] = useState(mockReservations)
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming")

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  }

  const handleCancel = (id: number) => {
    if (confirm("Are you sure you want to cancel this reservation?")) {
      // TODO: Implement actual reservation cancellation via Supabase
    }
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
            <h1 className="text-2xl font-bold">My Reservations</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Quick Reserve Links */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Link
              href="/tennis/court-reservations"
              className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow flex items-center justify-between"
            >
              <span className="font-medium text-foreground">Reserve Tennis Court</span>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
            <Link
              href="/swim/lap-swim-reservations"
              className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow flex items-center justify-between"
            >
              <span className="font-medium text-foreground">Reserve Lap Swim Lane</span>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-b mb-6">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`pb-3 px-1 font-medium transition-colors ${
                activeTab === "upcoming"
                  ? "border-b-2 border-[#5a7d5d] text-[#5a7d5d]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Upcoming ({reservations.upcoming.length})
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`pb-3 px-1 font-medium transition-colors ${
                activeTab === "past"
                  ? "border-b-2 border-[#5a7d5d] text-[#5a7d5d]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Past
            </button>
          </div>

          {/* Reservations List */}
          <div className="space-y-4">
            {(activeTab === "upcoming" ? reservations.upcoming : reservations.past).map((res) => (
              <div key={res.id} className="bg-white border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full ${res.type === "tennis" ? "bg-green-100" : "bg-blue-100"}`}>
                      <Clock className={`h-5 w-5 ${res.type === "tennis" ? "text-green-600" : "text-blue-600"}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{res.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(res.date)} • {res.time} • {res.duration}
                      </p>
                      {activeTab === "upcoming" && (
                        <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                          Confirmed
                        </span>
                      )}
                    </div>
                  </div>
                  {activeTab === "upcoming" && (
                    <button
                      onClick={() => handleCancel(res.id)}
                      className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}

            {(activeTab === "upcoming" ? reservations.upcoming : reservations.past).length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No {activeTab} reservations
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
