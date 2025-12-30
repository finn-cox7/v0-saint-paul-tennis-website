"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, PartyPopper, Calendar, Clock, Users, DollarSign, CheckCircle } from "lucide-react"

const partyPackages = [
  {
    id: "pool",
    name: "Pool Party",
    description: "Exclusive use of the pool and deck area",
    duration: "2 hours",
    maxGuests: 30,
    price: 250,
    includes: ["Exclusive pool access", "Deck seating", "Lifeguard on duty", "Tables and chairs"],
  },
  {
    id: "tennis",
    name: "Tennis Party",
    description: "Reserve courts for group tennis activities",
    duration: "2 hours",
    maxGuests: 16,
    price: 150,
    includes: ["2 court reservation", "Equipment available", "Instruction available (+$50)", "Shade tent"],
  },
  {
    id: "combo",
    name: "Club Combo",
    description: "Full club experience with pool and tennis",
    duration: "3 hours",
    maxGuests: 40,
    price: 400,
    includes: ["Pool access", "1 court reservation", "Clubhouse use", "Tables, chairs, shade"],
  },
]

export default function PartiesPage() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guestCount: "",
    notes: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual party booking via Supabase
    setSubmitted(true)
  }

  if (submitted) {
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
              <h1 className="text-2xl font-bold">Party Booking</h1>
            </div>
          </div>
          <div className="container mx-auto px-4 py-16 max-w-lg text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-8">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-green-800 mb-3">Request Submitted!</h2>
              <p className="text-green-700 mb-6">
                We&apos;ve received your party booking request. The club coordinator will contact you within 48 hours to confirm availability and finalize details.
              </p>
              <Link href="/member-portal" className="text-[#5a7d5d] hover:underline font-medium">
                Return to Member Portal
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
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
            <h1 className="text-2xl font-bold">Party Booking</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <p className="text-muted-foreground mb-8">
            Host your next celebration at Saint Paul Tennis Club! Choose a package below and submit a request.
            Party bookings are available during club hours and subject to availability.
          </p>

          {/* Packages */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-foreground mb-4">Select a Package</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {partyPackages.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`text-left p-5 rounded-lg border-2 transition-all ${
                    selectedPackage === pkg.id
                      ? "border-[#5a7d5d] bg-[#5a7d5d]/5"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <PartyPopper className={`h-5 w-5 ${selectedPackage === pkg.id ? "text-[#5a7d5d]" : "text-muted-foreground"}`} />
                    <h3 className="font-semibold text-foreground">{pkg.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{pkg.description}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{pkg.duration}</span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" />Up to {pkg.maxGuests}</span>
                  </div>
                  <p className="text-lg font-bold text-foreground flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />{pkg.price}
                  </p>
                  <ul className="mt-3 space-y-1">
                    {pkg.includes.map((item, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-1">
                        <span className="text-[#5a7d5d]">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
          </section>

          {/* Booking Form */}
          {selectedPackage && (
            <section className="bg-white border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">Request Details</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Preferred Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Preferred Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Expected Guest Count <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max={partyPackages.find((p) => p.id === selectedPackage)?.maxGuests}
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Additional Notes</label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Special requests, occasion, food arrangements, etc."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#5a7d5d] text-white py-3 rounded-md font-medium hover:bg-[#4a6d4d] transition-colors"
                >
                  Submit Booking Request
                </button>
              </form>
            </section>
          )}

          <p className="text-sm text-muted-foreground mt-6 text-center">
            Questions? Contact{" "}
            <a href="mailto:sallyhite1@gmail.com" className="text-[#5a7d5d] hover:underline">
              Sally Hite
            </a>{" "}
            or call <a href="tel:651-224-3742" className="text-[#5a7d5d] hover:underline">651-224-3742</a> (in season).
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
