"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, TrendingUp, Users, Clock, Calendar, BarChart3 } from "lucide-react"

// Mock data
const mockStats = {
  today: {
    checkIns: 47,
    tennisReservations: 18,
    swimReservations: 24,
    guestPasses: 3,
  },
  week: {
    checkIns: 312,
    tennisReservations: 89,
    swimReservations: 156,
    guestPasses: 12,
  },
  month: {
    checkIns: 1245,
    tennisReservations: 342,
    swimReservations: 578,
    guestPasses: 45,
  },
  peakHours: [
    { hour: "6:00 AM", swim: 15, tennis: 2 },
    { hour: "7:00 AM", swim: 28, tennis: 8 },
    { hour: "8:00 AM", swim: 35, tennis: 18 },
    { hour: "9:00 AM", swim: 22, tennis: 24 },
    { hour: "10:00 AM", swim: 18, tennis: 32 },
    { hour: "4:00 PM", swim: 42, tennis: 28 },
    { hour: "5:00 PM", swim: 56, tennis: 24 },
    { hour: "6:00 PM", swim: 48, tennis: 18 },
  ],
  topHouseholds: [
    { name: "Smith Family", visits: 28 },
    { name: "Chen Family", visits: 24 },
    { name: "Anderson Family", visits: 22 },
    { name: "Garcia Family", visits: 19 },
    { name: "Johnson Family", visits: 17 },
  ],
}

export default function StatsPage() {
  const [period, setPeriod] = useState<"today" | "week" | "month">("week")
  const stats = mockStats[period]

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
            <h1 className="text-2xl font-bold">Club Statistics</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-5xl">
          {/* Period Selector */}
          <div className="flex gap-2 mb-6">
            {(["today", "week", "month"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  period === p
                    ? "bg-[#5a7d5d] text-white"
                    : "bg-white border text-foreground hover:bg-gray-50"
                }`}
              >
                {p === "today" ? "Today" : p === "week" ? "This Week" : "This Month"}
              </button>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white border rounded-lg p-5">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-5 w-5 text-blue-600" />
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">{stats.checkIns}</p>
              <p className="text-sm text-muted-foreground">Check-ins</p>
            </div>
            <div className="bg-white border rounded-lg p-5">
              <Clock className="h-5 w-5 text-green-600 mb-2" />
              <p className="text-2xl font-bold text-foreground">{stats.tennisReservations}</p>
              <p className="text-sm text-muted-foreground">Tennis Reservations</p>
            </div>
            <div className="bg-white border rounded-lg p-5">
              <Clock className="h-5 w-5 text-blue-600 mb-2" />
              <p className="text-2xl font-bold text-foreground">{stats.swimReservations}</p>
              <p className="text-sm text-muted-foreground">Swim Reservations</p>
            </div>
            <div className="bg-white border rounded-lg p-5">
              <Calendar className="h-5 w-5 text-purple-600 mb-2" />
              <p className="text-2xl font-bold text-foreground">{stats.guestPasses}</p>
              <p className="text-sm text-muted-foreground">Guest Passes Used</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Peak Hours */}
            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="h-5 w-5 text-muted-foreground" />
                <h2 className="font-semibold text-foreground">Peak Usage Hours</h2>
              </div>
              <div className="space-y-3">
                {mockStats.peakHours.map((hour) => (
                  <div key={hour.hour} className="flex items-center gap-3">
                    <span className="w-16 text-sm text-muted-foreground">{hour.hour}</span>
                    <div className="flex-1 flex gap-1 h-6">
                      <div
                        className="bg-blue-200 rounded-l"
                        style={{ width: `${(hour.swim / 60) * 100}%` }}
                        title={`Swim: ${hour.swim}`}
                      />
                      <div
                        className="bg-green-200 rounded-r"
                        style={{ width: `${(hour.tennis / 60) * 100}%` }}
                        title={`Tennis: ${hour.tennis}`}
                      />
                    </div>
                    <span className="w-20 text-xs text-muted-foreground text-right">
                      {hour.swim + hour.tennis} total
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-200 rounded" />
                  <span className="text-muted-foreground">Swim</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-200 rounded" />
                  <span className="text-muted-foreground">Tennis</span>
                </div>
              </div>
            </div>

            {/* Top Households */}
            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-muted-foreground" />
                <h2 className="font-semibold text-foreground">Most Active Households</h2>
              </div>
              <div className="space-y-3">
                {mockStats.topHouseholds.map((household, i) => (
                  <div key={household.name} className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      i === 0 ? "bg-yellow-100 text-yellow-700" :
                      i === 1 ? "bg-gray-100 text-gray-600" :
                      i === 2 ? "bg-orange-100 text-orange-700" :
                      "bg-gray-50 text-gray-500"
                    }`}>
                      {i + 1}
                    </span>
                    <span className="flex-1 font-medium text-foreground">{household.name}</span>
                    <span className="text-sm text-muted-foreground">{household.visits} visits</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-8 bg-[#5a7d5d]/10 border border-[#5a7d5d]/20 rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-2">Summary</h3>
            <p className="text-sm text-muted-foreground">
              {period === "today" ? "Today" : period === "week" ? "This week" : "This month"},
              the club has seen {stats.checkIns} member check-ins with {stats.tennisReservations} tennis
              court reservations and {stats.swimReservations} lap swim reservations.
              Peak hours continue to be early morning for swimming and late morning for tennis.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
