"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Calendar, Clock, Users, DollarSign, CreditCard } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type CheckoutItem = {
  id: number
  title: string
  date?: string
  time?: string
  slots?: number
  price: number
  category?: "swim" | "tennis" | "social"
  description: string
  type: "event" | "lesson" | "enrollment" | "item"
}

type StoredEvent = {
  id: number
  title: string
  date: string
  time: string
  slots: number
  price: number
  category: "swim" | "tennis" | "social"
  description: string
}

const categoryColors = {
  swim: "bg-blue-100 text-blue-800 border-blue-300",
  tennis: "bg-green-100 text-green-800 border-green-300",
  social: "bg-purple-100 text-purple-800 border-purple-300",
}

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const eventId = searchParams.get("eventId")
  const type = searchParams.get("type") || "item"
  const title = searchParams.get("title")
  const price = searchParams.get("price")
  const description = searchParams.get("description")
  const returnUrl = searchParams.get("returnUrl") || "/about/events"

  const [item, setItem] = useState<CheckoutItem | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (eventId) {
      try {
        const storedEvents = localStorage.getItem("sptc_events")
        if (storedEvents) {
          const events: StoredEvent[] = JSON.parse(storedEvents)
          const foundEvent = events.find((e) => e.id === Number.parseInt(eventId))
          if (foundEvent) {
            setItem({ ...foundEvent, type: "event" })
          }
        }
      } catch {
        // Invalid JSON in localStorage, ignore
      }
    } else if (title && price) {
      setItem({
        id: 0,
        title: decodeURIComponent(title),
        price: Number.parseFloat(price),
        description: description ? decodeURIComponent(description) : "",
        type: type as CheckoutItem["type"],
      })
    }
  }, [eventId, type, title, price, description])

  const handlePayment = () => {
    if (!item) return

    setIsProcessing(true)

    setTimeout(() => {
      if (item.type === "event" && eventId) {
        try {
          const storedEvents = localStorage.getItem("sptc_events")
          if (storedEvents) {
            const events: StoredEvent[] = JSON.parse(storedEvents)
            const updatedEvents = events.map((e) =>
              e.id === item.id ? { ...e, slots: Math.max(0, e.slots - 1) } : e,
            )
            localStorage.setItem("sptc_events", JSON.stringify(updatedEvents))
          }
        } catch {
          // Invalid JSON in localStorage, ignore
        }
      }

      setIsProcessing(false)

      const successMessages = {
        event: "Payment successful! You are now registered for this event.",
        lesson: "Payment successful! You are now registered for this lesson.",
        enrollment: "Payment successful! Your enrollment is complete.",
        item: "Payment successful! Your purchase is complete.",
      }

      alert(successMessages[item.type])
      router.push(returnUrl)
    }, 2000)
  }

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Item not found</h1>
            <button
              onClick={() => router.push(returnUrl)}
              className="px-6 py-2 rounded-md text-white font-medium transition-colors bg-[#5a7d5d] hover:bg-[#4a6d4d]"
            >
              Go Back
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Checkout</h1>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

            <div className="border rounded-lg p-6">
              <div className="flex items-start gap-3 mb-3">
                <h3 className="text-xl font-semibold flex-1">{item.title}</h3>
                {item.type === "event" && item.category && (
                  <Badge variant="outline" className={categoryColors[item.category]}>
                    {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                  </Badge>
                )}
              </div>

              <p className="text-muted-foreground mb-4">{item.description}</p>

              {item.type === "event" && item.date && item.time && item.slots !== undefined && (
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {new Date(item.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{item.time}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{item.slots} spots available</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>{item.price === 0 ? "Free" : `$${item.price}`}</span>
                  </div>
                </div>
              )}

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>

            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="card-number" className="block text-sm font-medium mb-2">
                  Card Number
                </label>
                <input
                  id="card-number"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a7d5d]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry" className="block text-sm font-medium mb-2">
                    Expiry Date
                  </label>
                  <input
                    id="expiry"
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a7d5d]"
                  />
                </div>

                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium mb-2">
                    CVV
                  </label>
                  <input
                    id="cvv"
                    type="text"
                    placeholder="123"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a7d5d]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Cardholder Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a7d5d]"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => router.push(returnUrl)}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-medium"
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="flex-1 px-6 py-3 rounded-md text-white font-medium transition-colors flex items-center justify-center gap-2 bg-[#5a7d5d] hover:bg-[#4a6d4d] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CreditCard className="h-5 w-5" />
                {isProcessing ? "Processing..." : `Pay $${item.price.toFixed(2)}`}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
