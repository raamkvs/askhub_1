"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"

// ── Mode A: token in URL — validate and create session ───────────────────────
function TokenValidation({ token }: { token: string }) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const validate = async () => {
      console.log("[SET-PASSWORD] Mode A — validating token...")
      try {
        const res = await fetch("/api/auth/set-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        })
        const result = await res.json()
        console.log("[SET-PASSWORD] Validation result:", result)

        if (!result.success) {
          setError(result.error ?? "Invalid or expired link")
          return
        }

        // Redirect to magic link — callback sets session then comes back to ?verified=true
        console.log("[SET-PASSWORD] Redirecting to sign-in URL...")
        window.location.href = result.signInUrl
      } catch (err) {
        console.error("[SET-PASSWORD] Validation error:", err)
        setError("Something went wrong. Please try again.")
      }
    }
    void validate()
  }, [token]) // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-4 font-montserrat">
        <div className="w-full max-w-md rounded-lg border border-gray-200 p-6 shadow-sm text-center">
          <h1 className="mb-2 text-xl font-bold text-black">Link invalid</h1>
          <p className="mb-6 text-sm text-gray-600">{error}</p>
          <Button
            onClick={() => router.push("/auth/signin")}
            className="bg-[#0071BC] font-bold text-white hover:bg-[#005A94]"
          >
            Go to sign in
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 font-montserrat">
      <div className="w-full max-w-md rounded-lg border border-gray-200 p-6 shadow-sm text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[#0071BC] border-t-transparent" />
        <p className="text-sm text-gray-600">Verifying your link…</p>
      </div>
    </div>
  )
}

// ── Mode B: verified — show password form ─────────────────────────────────────
function PasswordForm() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sessionReady, setSessionReady] = useState(false)

  // The magic link returns #access_token=...&refresh_token=... as a hash fragment.
  // @supabase/ssr does NOT auto-detect hash tokens, so we parse and call setSession explicitly.
  useEffect(() => {
    const supabase = createClient()

    const establish = async () => {
      // Try parsing the URL hash first (arriving from magic link)
      const hash = typeof window !== "undefined" ? window.location.hash.substring(1) : ""
      const params = new URLSearchParams(hash)
      const accessToken = params.get("access_token")
      const refreshToken = params.get("refresh_token")

      if (accessToken && refreshToken) {
        console.log("[SET-PASSWORD] Hash tokens found — calling setSession")
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        })
        if (sessionError) {
          console.log("[SET-PASSWORD] ✗ setSession failed:", sessionError.message)
          setError("Your sign-in session could not be verified. Please use the link from your email again.")
        } else {
          console.log("[SET-PASSWORD] ✓ Session established from hash")
          // Clean the hash from the URL without a page reload
          window.history.replaceState(null, "", window.location.pathname + window.location.search)
        }
        setSessionReady(true)
        return
      }

      // No hash — check if already have a session (e.g. revisiting the page)
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        console.log("[SET-PASSWORD] ✓ Existing session found")
        setSessionReady(true)
      } else {
        setError("Your sign-in session could not be verified. Please use the link from your email again.")
        setSessionReady(true)
      }
    }

    void establish()
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)

    if (password.length < 8) { setError("Password must be at least 8 characters."); return }
    if (password !== confirmPassword) { setError("Passwords do not match."); return }

    setIsSubmitting(true)
    try {
      const res = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      const result = await res.json()
      if (!res.ok || !result.success) throw new Error(result.error || "Unable to save password")
      console.log("[SET-PASSWORD] ✓ Password saved — redirecting to /my-results")
      router.push("/my-results")
      router.refresh()
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to save password")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!sessionReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0071BC] border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 font-montserrat">
      <div className="w-full max-w-md rounded-lg border border-gray-200 p-6 shadow-sm">
        <h1 className="mb-2 text-xl font-bold text-black">Create your AskHub password</h1>
        <p className="mb-6 text-sm text-gray-600">
          Choose a password you&apos;ll use to sign in and access your saved profile, pathway, and recommendations.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              required
              minLength={8}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Confirm password</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              required
              minLength={8}
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0071BC] font-bold text-white hover:bg-[#005A94]"
          >
            {isSubmitting ? "Saving…" : "Save password and continue"}
          </Button>
        </form>
      </div>
    </div>
  )
}

// ── Root: decide which mode ────────────────────────────────────────────────────
export default function SetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const verified = searchParams.get("verified")

  if (verified === "true") return <PasswordForm />
  if (token) return <TokenValidation token={token} />

  // No params — redirect to sign in
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 font-montserrat">
      <div className="w-full max-w-md rounded-lg border border-gray-200 p-6 shadow-sm text-center">
        <p className="text-sm text-gray-600">No valid link found. Please check your email or sign in.</p>
        <Button
          onClick={() => window.location.href = "/auth/signin"}
          className="mt-4 bg-[#0071BC] font-bold text-white hover:bg-[#005A94]"
        >
          Go to sign in
        </Button>
      </div>
    </div>
  )
}
