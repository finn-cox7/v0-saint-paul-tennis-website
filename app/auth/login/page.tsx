"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        return
      }

      router.push("/member-portal")
      router.refresh()
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
          <div className="bg-white border rounded-lg p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-foreground mb-2 text-center">
              Member Login
            </h1>
            <p className="text-muted-foreground text-center mb-6">
              Sign in to access your member portal
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
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

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter your password"
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 rounded-md text-white font-medium transition-colors disabled:opacity-50"
                style={{ backgroundColor: "#5a7d5d" }}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm">
              <Link
                href="/auth/forgot-password"
                className="text-[#5a7d5d] hover:underline"
              >
                Forgot your password?
              </Link>
            </div>

            <div className="mt-4 text-center text-sm text-muted-foreground">
              Not a member yet?{" "}
              <Link
                href="/auth/register"
                className="text-[#5a7d5d] hover:underline font-medium"
              >
                Create an account
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t text-center text-sm text-muted-foreground">
              <p>
                Need help?{" "}
                <Link href="/contact/contact-us" className="text-[#5a7d5d] hover:underline">
                  Contact us
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
