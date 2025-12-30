"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import {
  Users,
  Calendar,
  Clock,
  BarChart3,
  Settings,
  UserCheck,
  ClipboardList,
  AlertCircle,
  ChevronRight,
  TrendingUp,
  LogOut
} from "lucide-react"

// Mock data
const mockStats = {
  todayCheckIns: 47,
  activeReservations: 12,
  upcomingEvents: 3,
  pendingApplications: 2,
}

const mockRecentActivity = [
  { type: "checkin", message: "Smith Family checked in", time: "5 min ago" },
  { type: "reservation", message: "Court 2 reserved by Johnson", time: "12 min ago" },
  { type: "checkin", message: "Anderson Family checked in", time: "18 min ago" },
  { type: "event", message: "New registration for Summer Social", time: "25 min ago" },
  { type: "reservation", message: "Lane 3 reserved by Chen", time: "32 min ago" },
]

const mockAlerts = [
  { id: 1, type: "warning", message: "2 pending job applications need review" },
  { id: 2, type: "info", message: "Summer Social registration closes in 3 days" },
]

export default function BoardPortalPage() {
  const [stats] = useState(mockStats)

  const quickActions = [
    { href: "/board-portal/checkin", icon: UserCheck, label: "Member Check-In", color: "bg-blue-100 text-blue-700" },
    { href: "/board-portal/reservations", icon: Clock, label: "Manage Reservations", color: "bg-green-100 text-green-700" },
    { href: "/board-portal/stats", icon: BarChart3, label: "View Statistics", color: "bg-purple-100 text-purple-700" },
    { href: "/board-portal/members", icon: Users, label: "Member Management", color: "bg-orange-100 text-orange-700" },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        {/* Header Banner */}
        <div className="bg-[#5a7d5d] text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-1">Board Portal</h1>
                <p className="text-white/80">Club Operations Dashboard</p>
              </div>
              <button className="mt-4 md:mt-0 flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Alerts */}
          {mockAlerts.length > 0 && (
            <div className="mb-6 space-y-2">
              {mockAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`flex items-center gap-3 p-4 rounded-lg ${
                    alert.type === "warning" ? "bg-amber-50 border border-amber-200" : "bg-blue-50 border border-blue-200"
                  }`}
                >
                  <AlertCircle className={`h-5 w-5 ${alert.type === "warning" ? "text-amber-600" : "text-blue-600"}`} />
                  <span className={`text-sm ${alert.type === "warning" ? "text-amber-800" : "text-blue-800"}`}>
                    {alert.message}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Quick Stats */}
          <section className="mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border rounded-lg p-5">
                <div className="flex items-center justify-between mb-2">
                  <UserCheck className="h-5 w-5 text-blue-600" />
                  <span className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> +12%
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground">{stats.todayCheckIns}</p>
                <p className="text-sm text-muted-foreground">Today&apos;s Check-ins</p>
              </div>
              <div className="bg-white border rounded-lg p-5">
                <Clock className="h-5 w-5 text-green-600 mb-2" />
                <p className="text-2xl font-bold text-foreground">{stats.activeReservations}</p>
                <p className="text-sm text-muted-foreground">Active Reservations</p>
              </div>
              <div className="bg-white border rounded-lg p-5">
                <Calendar className="h-5 w-5 text-purple-600 mb-2" />
                <p className="text-2xl font-bold text-foreground">{stats.upcomingEvents}</p>
                <p className="text-sm text-muted-foreground">Upcoming Events</p>
              </div>
              <div className="bg-white border rounded-lg p-5">
                <ClipboardList className="h-5 w-5 text-orange-600 mb-2" />
                <p className="text-2xl font-bold text-foreground">{stats.pendingApplications}</p>
                <p className="text-sm text-muted-foreground">Pending Applications</p>
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col items-center text-center"
                >
                  <div className={`p-3 rounded-full ${action.color} mb-3`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{action.label}</span>
                </Link>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <div className="bg-white border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
                  <span className="text-xs text-muted-foreground">Live</span>
                </div>
                <div className="space-y-3">
                  {mockRecentActivity.map((activity, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 border-b last:border-0">
                      <div className={`p-1.5 rounded-full ${
                        activity.type === "checkin" ? "bg-blue-100" :
                        activity.type === "reservation" ? "bg-green-100" : "bg-purple-100"
                      }`}>
                        {activity.type === "checkin" ? (
                          <UserCheck className="h-4 w-4 text-blue-600" />
                        ) : activity.type === "reservation" ? (
                          <Clock className="h-4 w-4 text-green-600" />
                        ) : (
                          <Calendar className="h-4 w-4 text-purple-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">{activity.message}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Management Links */}
            <div className="space-y-4">
              <div className="bg-white border rounded-lg p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Management</h2>
                <div className="space-y-2">
                  <Link href="/board-portal/schedule" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Settings className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">Schedule & Blocks</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                  <Link href="/about/events" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">Event Management</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                  <Link href="/board-portal/applications" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <ClipboardList className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">Job Applications</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Today&apos;s Schedule</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pool Opens</span>
                    <span className="text-foreground">6:00 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tennis Courts Open</span>
                    <span className="text-foreground">7:30 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Swim Team Practice</span>
                    <span className="text-foreground">8:00 - 10:00 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Court Grooming</span>
                    <span className="text-foreground">3:30 - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pool Closes</span>
                    <span className="text-foreground">9:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
