"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    age: "",
    startDate: "",
    experience: "",
    certifications: [] as string[],
    availability: [] as string[],
    about: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleCertificationChange = (cert: string) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.includes(cert)
        ? prev.certifications.filter((c) => c !== cert)
        : [...prev.certifications, cert],
    }))
  }

  const handleAvailabilityChange = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      availability: prev.availability.includes(day)
        ? prev.availability.filter((d) => d !== day)
        : [...prev.availability, day],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual application submission via Supabase
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image
          src="/images/sptc_balcony.jpg"
          alt="Saint Paul Tennis Club facilities"
          fill
          className="object-cover"
          priority
        />
      </div>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16 max-w-3xl">
          <h1 className="text-4xl font-bold text-foreground mb-4">Join Our Team</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Saint Paul Tennis Club is looking for enthusiastic individuals to join our summer staff.
            We offer a fun, family-friendly work environment in the beautiful Summit Hill neighborhood.
          </p>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-semibold text-green-800 mb-3">Application Received!</h2>
              <p className="text-green-700 mb-6">
                Thank you for your interest in joining the SPTC team. We&apos;ll review your
                application and contact you if your qualifications match our current openings.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({
                      firstName: "", lastName: "", email: "", phone: "",
                      position: "", age: "", startDate: "", experience: "",
                      certifications: [], availability: [], about: "",
                    })
                  }}
                  className="text-[#5a7d5d] hover:underline font-medium"
                >
                  Submit another application
                </button>
                <Link href="/employment/staff" className="text-[#5a7d5d] hover:underline font-medium">
                  Meet our current staff →
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Positions Section */}
              <div className="bg-muted/30 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Available Positions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-foreground">Lifeguard</h3>
                    <p className="text-sm text-muted-foreground">
                      Must have current lifeguard certification. CPR/First Aid required.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Swim Instructor</h3>
                    <p className="text-sm text-muted-foreground">
                      WSI certification preferred. Experience teaching all ages.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Front Desk / Check-in</h3>
                    <p className="text-sm text-muted-foreground">
                      Customer service skills. Must be at least 16 years old.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">General Staff</h3>
                    <p className="text-sm text-muted-foreground">
                      Assist with club operations, events, and member services.
                    </p>
                  </div>
                </div>
              </div>

              {/* Application Form */}
              <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-foreground mb-6">Employment Application</h2>

                <div className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="font-medium text-foreground mb-3">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full border rounded px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full border rounded px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full border rounded px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full border rounded px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Age</label>
                        <input
                          type="number"
                          min="14"
                          max="100"
                          value={formData.age}
                          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                          className="w-full border rounded px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Earliest Start Date</label>
                        <input
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                          className="w-full border rounded px-3 py-2"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Position Interest */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Position Interest <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full border rounded px-3 py-2"
                    >
                      <option value="">Select a position</option>
                      <option value="lifeguard">Lifeguard</option>
                      <option value="swim_instructor">Swim Instructor</option>
                      <option value="front_desk">Front Desk / Check-in</option>
                      <option value="general">General Staff</option>
                      <option value="multiple">Open to Multiple Positions</option>
                    </select>
                  </div>

                  {/* Certifications */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Current Certifications (check all that apply)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Lifeguard", "CPR/AED", "First Aid", "WSI", "Swim Coach", "Other"].map((cert) => (
                        <label key={cert} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.certifications.includes(cert)}
                            onChange={() => handleCertificationChange(cert)}
                          />
                          <span className="text-sm">{cert}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Availability (check all that apply)
                    </label>
                    <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                        <label key={day} className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.availability.includes(day)}
                            onChange={() => handleAvailabilityChange(day)}
                          />
                          <span className="text-sm">{day}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Relevant Experience
                    </label>
                    <textarea
                      rows={3}
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full border rounded px-3 py-2"
                      placeholder="Describe any relevant work or volunteer experience..."
                    />
                  </div>

                  {/* About */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Why do you want to work at SPTC?
                    </label>
                    <textarea
                      rows={3}
                      value={formData.about}
                      onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                      className="w-full border rounded px-3 py-2"
                      placeholder="Tell us about yourself and why you're interested in this position..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 rounded-md text-white font-medium transition-colors bg-[#5a7d5d] hover:bg-[#4a6d4d]"
                  >
                    Submit Application
                  </button>
                </div>
              </form>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                Applications are reviewed on a rolling basis. We typically hire for the summer season
                beginning in late spring.
              </p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
