"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { createClient } from "@/lib/supabase/client"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
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

  if (success) {
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
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-semibold text-green-800 mb-3">
                Check Your Email
              </h2>
              <p className="text-green-700 mb-6">
                We&apos;ve sent a confirmation link to <strong>{formData.email}</strong>.
                Please click the link to verify your account.
              </p>
              <Link
                href="/auth/login"
                className="text-[#5a7d5d] hover:underline font-medium"
              >
                Return to login
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
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
          <div className="bg-white border rounded-lg p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-foreground mb-2 text-center">
              Create Account
            </h1>
            <p className="text-muted-foreground text-center mb-6">
              Register for your member portal access
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  placeholder="your@email.com"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  placeholder="At least 6 characters"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Confirm your password"
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 rounded-md text-white font-medium transition-colors disabled:opacity-50"
                style={{ backgroundColor: "#5a7d5d" }}
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-[#5a7d5d] hover:underline font-medium"
              >
                Sign in
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t text-center text-xs text-muted-foreground">
              <p>
                By creating an account, you agree to our terms of service.
                This portal is for Saint Paul Tennis Club members only.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
