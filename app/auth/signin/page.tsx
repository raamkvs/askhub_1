"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const supabase = createClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      })

      if (signInError) {
        console.log("[SIGNIN] ✗ signInWithPassword error:", signInError.message)
        setError(
          signInError.message === "Invalid login credentials"
            ? "Incorrect email or password. Please try again."
            : signInError.message,
        )
        return
      }

      console.log("[SIGNIN] ✓ Signed in — redirecting to /my-results")
      router.push("/my-results")
      router.refresh()
    } catch (err) {
      console.error("[SIGNIN] ✗ Unexpected error:", err)
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 font-montserrat">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img
            src="/images/ai-hub-logo-updated.png"
            alt="AI Hub for Sustainable Development"
            className="h-12 w-auto"
          />
        </div>

        <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
          <h1 className="mb-1 text-xl font-bold text-black">Sign in to AskHub</h1>
          <p className="mb-6 text-sm text-gray-600">
            Access your saved profile, pathway, and recommendations.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <Link href="/auth/forgot-password" className="text-xs text-[#0071BC] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0071BC] font-bold text-white hover:bg-[#005A94]"
            >
              {isSubmitting ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-400">
            New to AskHub? Complete the{" "}
            <a href="/" className="text-[#0071BC] hover:underline">
              Fit Finder
            </a>{" "}
            to create your account.
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Powered by UNDP AI Hub for Sustainable Development
        </p>
      </div>
    </div>
  )
}
