"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { createClient } from "@/lib/supabase/client"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) {
        setError(error.message)
        return
      }

      setSuccess(true)
    } catch {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="relative h-[300px] w-full overflow-hidden">
        <Image
          src="/images/sptc_balcony.jpg"
          alt="Saint Paul Tennis Club"
          fill
          className="object-cover"
          priority
        />
      </div>
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          {success ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-semibold text-green-800 mb-3">
                Check Your Email
              </h2>
              <p className="text-green-700 mb-6">
                If an account exists for <strong>{email}</strong>, we&apos;ve sent
                a password reset link. Please check your inbox.
              </p>
              <Link
                href="/auth/login"
                className="text-[#5a7d5d] hover:underline font-medium"
              >
                Return to login
              </Link>
            </div>
          ) : (
            <div className="bg-white border rounded-lg p-8 shadow-sm">
              <h1 className="text-2xl font-bold text-foreground mb-2 text-center">
                Reset Password
              </h1>
              <p className="text-muted-foreground text-center mb-6">
                Enter your email address and we&apos;ll send you a link to reset your password.
              </p>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    placeholder="your@email.com"
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 rounded-md text-white font-medium transition-colors disabled:opacity-50"
                  style={{ backgroundColor: "#5a7d5d" }}
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>

              <div className="mt-6 text-center text-sm">
                <Link
                  href="/auth/login"
                  className="text-[#5a7d5d] hover:underline"
                >
                  Back to login
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
