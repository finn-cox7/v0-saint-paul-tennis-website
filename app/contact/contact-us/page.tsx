"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: Implement actual form submission via Supabase
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsSubmitting(false)
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
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-foreground mb-8">Contact Us</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Get In Touch</h2>
                <p className="text-foreground leading-relaxed mb-6">
                  We&apos;d love to hear from you! Whether you have questions about membership,
                  programs, or general inquiries, please reach out using the information below
                  or fill out the contact form.
                </p>
              </section>

              <section className="space-y-4">
                <div className="bg-muted/30 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Club Phone</h3>
                  <p className="text-foreground">
                    <span className="font-medium">In Season:</span>{" "}
                    <a href="tel:651-224-3742" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm">
                      651-224-3742
                    </a>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Memorial Day through Labor Day
                  </p>
                </div>

                <div className="bg-muted/30 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Email Contacts</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Tennis Inquiries</p>
                      <a href="mailto:tennis@saintpaultennisclub.com" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm">
                        tennis@saintpaultennisclub.com
                      </a>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Swimming Inquiries</p>
                      <a href="mailto:swimming@saintpaultennisclub.com" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm">
                        swimming@saintpaultennisclub.com
                      </a>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Club Coordinator</p>
                      <a href="mailto:sallyhite1@gmail.com" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm">
                        sallyhite1@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Location</h3>
                  <p className="text-foreground">
                    Saint Paul Tennis Club<br />
                    Summit Hill Neighborhood<br />
                    Saint Paul, Minnesota
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Members receive detailed location and access information upon joining.
                  </p>
                </div>

                <div className="bg-muted/30 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Hours of Operation</h3>
                  <div className="space-y-2 text-foreground">
                    <div>
                      <span className="font-medium">Pool:</span> 6:00 AM – 9:00 PM (Memorial Day – Labor Day)
                    </div>
                    <div>
                      <span className="font-medium">Tennis Courts:</span> 7:30 AM – Dusk (Late April – Mid-October)
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      Courts closed 3:30–4:00 PM daily for grooming
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Contact Form */}
            <div>
              {submitted ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="bg-green-50 border border-green-200 rounded-lg p-8 text-center"
                >
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-700">
                    Thank you for contacting us. We&apos;ll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({ name: "", email: "", phone: "", subject: "general", message: "" })
                    }}
                    className="mt-4 text-primary hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-6 shadow-sm">
                  <h2 className="text-2xl font-semibold text-foreground mb-6">Send a Message</h2>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Name <span className="text-red-500" aria-hidden="true">*</span>
                        <span className="sr-only">(required)</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border rounded px-3 py-2 min-h-11 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Your full name"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email <span className="text-red-500" aria-hidden="true">*</span>
                        <span className="sr-only">(required)</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border rounded px-3 py-2 min-h-11 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="your@email.com"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full border rounded px-3 py-2 min-h-11 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="(555) 555-5555"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-1">
                        Subject <span className="text-red-500" aria-hidden="true">*</span>
                        <span className="sr-only">(required)</span>
                      </label>
                      <select
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full border rounded px-3 py-2 min-h-11 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        disabled={isSubmitting}
                      >
                        <option value="general">General Inquiry</option>
                        <option value="membership">Membership Information</option>
                        <option value="tennis">Tennis Programs</option>
                        <option value="swimming">Swimming Programs</option>
                        <option value="events">Events & Parties</option>
                        <option value="employment">Employment</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Message <span className="text-red-500" aria-hidden="true">*</span>
                        <span className="sr-only">(required)</span>
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="How can we help you?"
                        disabled={isSubmitting}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-3 min-h-11 rounded-md text-white font-medium transition-colors bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
                          Sending...
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </div>
                </form>
              )}

              <p className="text-xs text-muted-foreground mt-4 text-center">
                We typically respond within 1-2 business days during the active season.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
