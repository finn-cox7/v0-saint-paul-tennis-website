"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import {
  Calendar,
  Users,
  CreditCard,
  Clock,
  PartyPopper,
  BookOpen,
  ChevronRight,
  MapPin,
  LogOut
} from "lucide-react"

// Mock data - will be replaced with Supabase queries
const mockUser = {
  firstName: "John",
  lastName: "Smith",
  email: "john.smith@example.com",
  household: "The Smith Family",
  memberSince: "2019",
}

const mockUpcoming = [
  { type: "reservation", title: "Tennis Court 2", date: "Tomorrow", time: "10:00 AM - 11:30 AM" },
  { type: "event", title: "Summer Social", date: "Jun 15", time: "5:00 PM" },
  { type: "reservation", title: "Lap Swim Lane 3", date: "Jun 12", time: "7:00 AM - 7:30 AM" },
]

const mockAccount = {
  balance: 45.00,
  guestPasses: 3,
}

export default function MemberPortalPage() {
  const [user] = useState(mockUser)

  const quickLinks = [
    { href: "/tennis/court-reservations", icon: Clock, label: "Reserve Tennis Court", color: "bg-green-100 text-green-700" },
    { href: "/swim/lap-swim-reservations", icon: Clock, label: "Reserve Lap Swim", color: "bg-blue-100 text-blue-700" },
    { href: "/member-portal/events", icon: Calendar, label: "View Events", color: "bg-purple-100 text-purple-700" },
    { href: "/member-portal/household", icon: Users, label: "My Household", color: "bg-orange-100 text-orange-700" },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        {/* Welcome Banner */}
        <div className="bg-[#5a7d5d] text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-1">Welcome back, {user.firstName}!</h1>
                <p className="text-white/80">Member since {user.memberSince}</p>
              </div>
              <button className="mt-4 md:mt-0 flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Quick Links */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col items-center text-center"
                >
                  <div className={`p-3 rounded-full ${link.color} mb-3`}>
                    <link.icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{link.label}</span>
                </Link>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upcoming */}
            <div className="lg:col-span-2">
              <div className="bg-white border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">Upcoming</h2>
                  <Link href="/member-portal/reservations" className="text-sm text-[#5a7d5d] hover:underline">
                    View all
                  </Link>
                </div>
                {mockUpcoming.length > 0 ? (
                  <div className="space-y-3">
                    {mockUpcoming.map((item, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <div className={`p-2 rounded-full ${item.type === 'reservation' ? 'bg-blue-100' : 'bg-purple-100'}`}>
                          {item.type === 'reservation' ? (
                            <Clock className="h-5 w-5 text-blue-600" />
                          ) : (
                            <Calendar className="h-5 w-5 text-purple-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{item.title}</p>
                          <p className="text-sm text-muted-foreground">{item.date} • {item.time}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">No upcoming reservations or events</p>
                )}
              </div>
            </div>

            {/* Account Summary */}
            <div className="space-y-6">
              <div className="bg-white border rounded-lg p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Account</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Account Balance</span>
                    <span className="font-semibold text-foreground">${mockAccount.balance.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Guest Passes</span>
                    <span className="font-semibold text-foreground">{mockAccount.guestPasses} remaining</span>
                  </div>
                  <Link
                    href="/member-portal/account"
                    className="block w-full text-center py-2 border border-[#5a7d5d] text-[#5a7d5d] rounded-md hover:bg-[#5a7d5d] hover:text-white transition-colors"
                  >
                    View Account Details
                  </Link>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Household</h2>
                <p className="text-foreground font-medium mb-1">{user.household}</p>
                <p className="text-sm text-muted-foreground mb-4">4 members</p>
                <Link
                  href="/member-portal/household"
                  className="text-sm text-[#5a7d5d] hover:underline flex items-center gap-1"
                >
                  Manage household <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Portal Navigation */}
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Member Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link href="/member-portal/reservations" className="bg-white border rounded-lg p-5 hover:shadow-md transition-shadow group">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-[#5a7d5d]">My Reservations</h3>
                    <p className="text-sm text-muted-foreground">View and manage your court and lane reservations</p>
                  </div>
                </div>
              </Link>

              <Link href="/member-portal/events" className="bg-white border rounded-lg p-5 hover:shadow-md transition-shadow group">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-[#5a7d5d]">Events</h3>
                    <p className="text-sm text-muted-foreground">Browse and register for club events</p>
                  </div>
                </div>
              </Link>

              <Link href="/member-portal/household" className="bg-white border rounded-lg p-5 hover:shadow-md transition-shadow group">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-[#5a7d5d]">Household</h3>
                    <p className="text-sm text-muted-foreground">Manage family members and contacts</p>
                  </div>
                </div>
              </Link>

              <Link href="/member-portal/account" className="bg-white border rounded-lg p-5 hover:shadow-md transition-shadow group">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CreditCard className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-[#5a7d5d]">Account & Billing</h3>
                    <p className="text-sm text-muted-foreground">View balance, purchases, and guest passes</p>
                  </div>
                </div>
              </Link>

              <Link href="/member-portal/parties" className="bg-white border rounded-lg p-5 hover:shadow-md transition-shadow group">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-pink-100 rounded-lg">
                    <PartyPopper className="h-6 w-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-[#5a7d5d]">Party Booking</h3>
                    <p className="text-sm text-muted-foreground">Book the club for private events</p>
                  </div>
                </div>
              </Link>

              <Link href="/member-portal/directory" className="bg-white border rounded-lg p-5 hover:shadow-md transition-shadow group">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-teal-100 rounded-lg">
                    <BookOpen className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-[#5a7d5d]">Member Directory</h3>
                    <p className="text-sm text-muted-foreground">Find and connect with other members</p>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* Club Info */}
          <section className="mt-8 bg-white border rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                <MapPin className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Club Information</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Pool: 6:00 AM – 9:00 PM (Memorial Day – Labor Day)<br />
                  Tennis: 7:30 AM – Dusk (Late April – Mid-October)
                </p>
                <p className="text-sm text-muted-foreground">
                  Club Phone: <a href="tel:651-224-3742" className="text-[#5a7d5d] hover:underline">651-224-3742</a> (in season)
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
