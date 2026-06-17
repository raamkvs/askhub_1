"use client"

import Link from "next/link"
import { MailCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AiHubLogoLink } from "@/components/ai-hub-logo-link"

interface PhaseOneCompleteProps {
  email?: string
  emailSent?: boolean
  emailError?: string
  onBack: () => void
}

export function PhaseOneComplete({
  email,
  emailSent = false,
  emailError,
  onBack,
}: PhaseOneCompleteProps) {
  return (
    <div className="min-h-screen bg-white font-montserrat">
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-6 py-4">
          <AiHubLogoLink />
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full bg-[#D9F1FF] px-4 py-1 text-xs font-bold uppercase tracking-wide text-[#0071BC]">
            Account created
          </span>

          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#D9F1FF]">
            <MailCheck className="h-8 w-8 text-[#0071BC]" />
          </div>

          <h1 className="mb-3 text-3xl font-bold text-black">Check your email</h1>
          <p className="mb-6 text-gray-600">
            We&apos;ve created your AskHub account
            {email ? (
              <>
                {" "}
                for <span className="font-medium text-gray-900">{email}</span>
              </>
            ) : null}
            . Use the link in your email to set your password, then sign in to finish your profile.
          </p>

          <div className="mb-8 rounded-lg border border-[#BFDBFE] bg-[#EFF6FF] p-6 text-left">
            <h2 className="mb-3 font-bold text-black">What happens next</h2>
            <ol className="list-decimal space-y-2 pl-5 text-sm text-[#6C6F75]">
              <li>Open the email from AskHub and set your password.</li>
              <li>Sign in to your account.</li>
              <li>Answer a few more questions so we can personalise your recommendations.</li>
              <li>View your curated resources on My Results.</li>
            </ol>
          </div>

          {emailSent ? (
            <p className="mb-4 text-sm text-green-700">Setup email sent successfully.</p>
          ) : null}

          {emailError ? (
            <p className="mb-4 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800">
              We created your account but couldn&apos;t send the email. Please contact support or try
              resending from sign-in.
            </p>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              variant="outline"
              onClick={onBack}
              className="font-montserrat font-bold"
            >
              Back to homepage
            </Button>
            <Button
              asChild
              className="bg-[#0071BC] font-montserrat font-bold text-white hover:bg-[#005A94]"
            >
              <Link href="/auth/signin">Go to sign in</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
