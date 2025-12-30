"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, Clock, Calendar, X, Filter } from "lucide-react"

// Mock data
const mockReservations = [
  { id: 1, type: "tennis", resource: "Court 1", member: "John Smith", date: "2025-06-11", time: "10:00 AM", duration: "90 min", status: "confirmed" },
  { id: 2, type: "tennis", resource: "Court 2", member: "Mike Anderson", date: "2025-06-11", time: "10:00 AM", duration: "60 min", status: "confirmed" },
  { id: 3, type: "swim", resource: "Lane 3", member: "Sarah Chen", date: "2025-06-11", time: "7:00 AM", duration: "30 min", status: "confirmed" },
  { id: 4, type: "swim", resource: "Lane 1", member: "David Brown", date: "2025-06-11", time: "6:30 AM", duration: "60 min", status: "confirmed" },
  { id: 5, type: "tennis", resource: "Court 3", member: "Lisa Garcia", date: "2025-06-11", time: "4:00 PM", duration: "90 min", status: "confirmed" },
  { id: 6, type: "swim", resource: "Lane 5", member: "Tom Wilson", date: "2025-06-12", time: "8:00 AM", duration: "30 min", status: "confirmed" },
]

export default function BoardReservationsPage() {
  const [reservations] = useState(mockReservations)
  const [filterType, setFilterType] = useState<"all" | "tennis" | "swim">("all")
  const [filterDate, setFilterDate] = useState("")

  const filtered = reservations.filter((r) => {
    if (filterType !== "all" && r.type !== filterType) return false
    if (filterDate && r.date !== filterDate) return false
    return true
  })

  const handleCancel = (id: number) => {
    if (confirm("Are you sure you want to cancel this reservation?")) {
      // TODO: Implement actual reservation cancellation via Supabase
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <div className="bg-[#5a7d5d] text-white py-6">
          <div className="container mx-auto px-4">
            <Link href="/board-portal" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold">Manage Reservations</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-5xl">
          {/* Filters */}
          <div className="bg-white border rounded-lg p-4 mb-6 flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filter:</span>
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as "all" | "tennis" | "swim")}
              className="border rounded px-3 py-1.5 text-sm"
            >
              <option value="all">All Types</option>
              <option value="tennis">Tennis Courts</option>
              <option value="swim">Swim Lanes</option>
            </select>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="border rounded px-3 py-1.5 text-sm"
            />
            {(filterType !== "all" || filterDate) && (
              <button
                onClick={() => { setFilterType("all"); setFilterDate("") }}
                className="text-sm text-[#5a7d5d] hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Link
              href="/tennis/court-reservations"
              className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow flex items-center gap-3"
            >
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-foreground">Tennis Court Grid</p>
                <p className="text-sm text-muted-foreground">View & book courts</p>
              </div>
            </Link>
            <Link
              href="/swim/lap-swim-reservations"
              className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow flex items-center gap-3"
            >
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-foreground">Lap Swim Grid</p>
                <p className="text-sm text-muted-foreground">View & book lanes</p>
              </div>
            </Link>
          </div>

          {/* Reservations Table */}
          <div className="bg-white border rounded-lg overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-foreground">Active Reservations ({filtered.length})</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Type</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Resource</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Member</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Time</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Duration</th>
                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filtered.map((res) => (
                    <tr key={res.id} className="hover:bg-gray-50">
                      <td className="p-4">
                        <span className={`text-xs font-medium px-2 py-1 rounded ${
                          res.type === "tennis" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                        }`}>
                          {res.type === "tennis" ? "Tennis" : "Swim"}
                        </span>
                      </td>
                      <td className="p-4 font-medium text-foreground">{res.resource}</td>
                      <td className="p-4 text-foreground">{res.member}</td>
                      <td className="p-4 text-muted-foreground">{formatDate(res.date)}</td>
                      <td className="p-4 text-foreground">{res.time}</td>
                      <td className="p-4 text-muted-foreground">{res.duration}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleCancel(res.id)}
                          className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1 ml-auto"
                        >
                          <X className="h-4 w-4" />
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  No reservations found
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
