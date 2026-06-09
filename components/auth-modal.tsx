"use client"

import { useEffect, useRef, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { Mail, RefreshCw } from "lucide-react"

interface AuthModalProps {
  isOpen: boolean
  email?: string
  onAuthenticated: () => void
  forceOpen?: boolean
  isExistingUser?: boolean
  otpAlreadySent?: boolean
  otpSendError?: string
}

export function AuthModal({
  isOpen,
  email,
  onAuthenticated,
  forceOpen = false,
  otpSendError,
}: AuthModalProps) {
  const [resending, setResending] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(60)
  const [resendError, setResendError] = useState<string | undefined>(otpSendError)
  const [resendSuccess, setResendSuccess] = useState(false)
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const checkedSessionRef = useRef(false)

  // Check for existing session when modal opens
  useEffect(() => {
    if (!isOpen || checkedSessionRef.current) return
    checkedSessionRef.current = true

    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        console.log("[AUTH MODAL] Existing session ✓")
        onAuthenticated()
      }
    })
  }, [isOpen, onAuthenticated])

  // Start initial cooldown when modal opens
  useEffect(() => {
    if (isOpen) startCooldown(60)
  }, [isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      checkedSessionRef.current = false
      setResendError(undefined)
      setResendSuccess(false)
    }
  }, [isOpen])

  const startCooldown = (seconds = 60) => {
    setResendCooldown(seconds)
    if (cooldownRef.current) clearInterval(cooldownRef.current)
    cooldownRef.current = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) { clearInterval(cooldownRef.current!); return 0 }
        return prev - 1
      })
    }, 1000)
  }

  const resendEmail = async () => {
    if (!email || resendCooldown > 0 || resending) return
    setResending(true)
    setResendError(undefined)
    setResendSuccess(false)

    try {
      const res = await fetch("/api/auth/resend-setup-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const result: { success: boolean; error?: string } = await res.json()

      if (!result.success) {
        setResendError(result.error ?? "Failed to resend. Please try again.")
      } else {
        setResendSuccess(true)
        startCooldown(60)
      }
    } catch {
      setResendError("Failed to resend. Please try again.")
    } finally {
      setResending(false)
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => { if (forceOpen && !open) return }}
    >
      <DialogContent
        className="max-w-md font-montserrat [&>button]:hidden"
        onPointerDownOutside={(e) => { if (forceOpen) e.preventDefault() }}
        onEscapeKeyDown={(e) => { if (forceOpen) e.preventDefault() }}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-black">Check your email</DialogTitle>
          <DialogDescription className="text-gray-600">
            We sent a setup email to{" "}
            <strong>{email || "your email"}</strong> with your temporary password and a link to create a permanent
            password.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center py-4 gap-2">
          <div className="rounded-full bg-blue-50 p-4">
            <Mail className="h-8 w-8 text-[#0071BC]" />
          </div>
          <p className="text-sm text-gray-500 text-center max-w-xs">
            Click the <strong>"Set my password"</strong> link in the email to secure your account and access your
            results. Check your spam folder if you don&apos;t see it.
          </p>
        </div>

        {resendError && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{resendError}</p>
        )}
        {resendSuccess && (
          <p className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
            A new setup email has been sent to {email}.
          </p>
        )}

        <Button
          variant="outline"
          onClick={() => void resendEmail()}
          disabled={resending || resendCooldown > 0}
          className="w-full"
        >
          {resending ? (
            <span className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin" /> Sending…
            </span>
          ) : resendCooldown > 0 ? (
            `Resend email in ${resendCooldown}s`
          ) : (
            <span className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" /> Resend setup email
            </span>
          )}
        </Button>

        <div className="flex items-center gap-3">
          <div className="flex-1 border-t border-gray-100" />
          <span className="text-xs text-gray-400">already set a password?</span>
          <div className="flex-1 border-t border-gray-100" />
        </div>

        <Button
          variant="ghost"
          onClick={() => window.location.href = "/auth/signin"}
          className="w-full text-[#0071BC] hover:text-[#005A94]"
        >
          Sign in with password
        </Button>
      </DialogContent>
    </Dialog>
  )
}
