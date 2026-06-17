"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AiHubLogoLink } from "@/components/ai-hub-logo-link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    setSuccessMessage(null)
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      })
      const result = await res.json()

      if (!res.ok || !result.success) {
        throw new Error(result.error ?? "Unable to send reset email")
      }

      setSuccessMessage(
        result.message ??
          "If an account exists for this email, we've sent a link to reset your password.",
      )
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 font-montserrat">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <AiHubLogoLink />
        </div>

        <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
          <h1 className="mb-1 text-xl font-bold text-black">Reset your password</h1>
          <p className="mb-6 text-sm text-gray-600">
            Enter the email you used for AskHub and we&apos;ll send you a link to set a new password.
          </p>

          {successMessage ? (
            <div className="space-y-4">
              <p className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">{successMessage}</p>
              <Link
                href="/auth/signin"
                className="inline-block text-sm font-medium text-[#0071BC] hover:underline"
              >
                Back to sign in
              </Link>
            </div>
          ) : (
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

              {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0071BC] font-bold text-white hover:bg-[#005A94]"
              >
                {isSubmitting ? "Sending…" : "Send reset link"}
              </Button>
            </form>
          )}

          {!successMessage && (
            <p className="mt-4 text-center text-sm text-gray-500">
              Remember your password?{" "}
              <Link href="/auth/signin" className="text-[#0071BC] hover:underline">
                Sign in
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
