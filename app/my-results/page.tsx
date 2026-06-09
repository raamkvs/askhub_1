"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { RecommendationResults } from "@/components/recommendation-results"

interface UserResponse {
  questionId: string
  question: string
  answer: string
  answerText: string
}

interface IntakeSession {
  session_id: string
  responses: UserResponse[]
}

type PageState = "loading" | "ready" | "no-results" | "unauthenticated"

export default function MyResultsPage() {
  const router = useRouter()
  const [state, setState] = useState<PageState>("loading")
  const [session, setSession] = useState<IntakeSession | null>(null)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()

      // Auth check
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setState("unauthenticated")
        return
      }

      // Load latest intake session
      const { data, error } = await supabase
        .from("intake_sessions")
        .select("session_id, responses")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle()

      if (error) {
        console.error("[MY-RESULTS] DB error:", error.message)
        setState("no-results")
        return
      }

      if (!data) {
        setState("no-results")
        return
      }

      setSession(data as IntakeSession)
      setState("ready")
    }

    void load()
  }, [])

  // Redirect if unauthenticated
  useEffect(() => {
    if (state === "unauthenticated") {
      router.replace("/auth/signin")
    }
  }, [state, router])

  if (state === "loading" || state === "unauthenticated") {
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
    />
  )
}
