"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { RecommendationResults } from "@/components/recommendation-results"
import { normalizeResponses, type IntakeResponse } from "@/lib/intake/responses"

interface IntakeSession {
  session_id: string
  responses: IntakeResponse[]
  resource_state?: {
    selectedHelpOption?: string | null
  } | null
}

type PageState = "loading" | "ready" | "no-results" | "unauthenticated" | "onboarding"

export default function MyResultsPage() {
  const router = useRouter()
  const [state, setState] = useState<PageState>("loading")
  const [session, setSession] = useState<IntakeSession | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/intake/session")
        if (res.status === 401) {
          setState("unauthenticated")
          return
        }

        const result = await res.json()
        if (!result.success || !result.session) {
          console.error("[MY-RESULTS] No session:", result.error)
          setState("no-results")
          return
        }

        if (!result.onboardingComplete) {
          setState("onboarding")
          return
        }

        const responses = normalizeResponses(result.session.responses)
        if (responses.length === 0) {
          console.error("[MY-RESULTS] Session has no responses")
          setState("no-results")
          return
        }

        setSession({
          session_id: result.session.session_id,
          responses,
          resource_state: result.session.resource_state ?? null,
        })
        setState("ready")
      } catch (error) {
        console.error("[MY-RESULTS] Load failed:", error)
        setState("no-results")
      }
    }

    void load()
  }, [])

  useEffect(() => {
    if (state === "unauthenticated") {
      router.replace("/auth/signin")
    } else if (state === "onboarding") {
      router.replace("/onboarding")
    }
  }, [state, router])

  if (state === "loading" || state === "unauthenticated" || state === "onboarding") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0071BC] border-t-transparent" />
      </div>
    )
  }

  if (state === "no-results" || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-4 font-montserrat">
        <div className="max-w-md text-center">
          <h1 className="mb-2 text-xl font-bold text-black">No results yet</h1>
          <p className="mb-6 text-sm text-gray-600">
            Complete the Fit Finder to get your personalised pathway and recommendations.
          </p>
          <a
            href="/"
            className="inline-block rounded-lg bg-[#0071BC] px-6 py-3 font-montserrat font-bold text-white hover:bg-[#005A94]"
          >
            Go to Fit Finder
          </a>
        </div>
      </div>
    )
  }

  return (
    <RecommendationResults
      responses={session.responses}
      sessionId={session.session_id}
      onBack={() => router.push("/")}
      suppressAuthModal
      initialResourceState={session.resource_state ?? undefined}
    />
  )
}
