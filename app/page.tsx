"use client"

import { useState, useEffect } from "react"
import { LandingPage } from "@/components/landing-page"
import { AskHubInterface } from "@/components/askhub-interface"
import { RecommendationResults } from "@/components/recommendation-results"
import { generateUUID } from "@/lib/utils"
import { TitleSetter } from "@/components/title-setter"
import { createClient } from "@/lib/supabase/client"

const STORAGE_KEY = "ask-hub-pending-results"

interface SavedIntakeState {
  responses: Array<{ questionId: string; question: string; answer: string; answerText: string }>
  sessionId: string
  trigger: string
}

export default function CoachingPlatform() {
  const [sessionId] = useState(() => generateUUID())
  const [showAskHub, setShowAskHub] = useState(false)
  const [coachTrigger, setCoachTrigger] = useState<string>("")
  const [restoredState, setRestoredState] = useState<SavedIntakeState | null>(null)
  const [authChecked, setAuthChecked] = useState(false)

  const handleLaunchAskHub = (trigger: string) => {
    setCoachTrigger(trigger)
    setShowAskHub(true)
  }

  const handleBackToLanding = () => {
    setShowAskHub(false)
    setCoachTrigger("")
    setRestoredState(null)
  }

  // On mount: check auth and restore pending results if applicable
  useEffect(() => {
    const supabase = createClient()

    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      const saved = sessionStorage.getItem(STORAGE_KEY)

      if (saved && user) {
        try {
          const parsed: SavedIntakeState = JSON.parse(saved)
          sessionStorage.removeItem(STORAGE_KEY)
          setRestoredState(parsed)
        } catch {
          sessionStorage.removeItem(STORAGE_KEY)
        }
      }

      setAuthChecked(true)
    }

    void init()
  }, [])

  // Show nothing until auth check completes (prevents flash of landing page)
  if (!authChecked) return null

  // Restored from magic-link: show recommendations directly, user is authenticated
  if (restoredState) {
    return (
      <>
        <TitleSetter title="AskHub" />
        <RecommendationResults
          responses={restoredState.responses}
          sessionId={restoredState.sessionId}
          onBack={handleBackToLanding}
        />
      </>
    )
  }

  return (
    <>
      <TitleSetter title="AskHub" />
      {showAskHub ? (
        <AskHubInterface sessionId={sessionId} trigger={coachTrigger} onBack={handleBackToLanding} />
      ) : (
        <LandingPage onLaunchCoach={handleLaunchAskHub} />
      )}
    </>
  )
}
