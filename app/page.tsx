"use client"

import { useState } from "react"
import { LandingPage } from "@/components/landing-page"
import { AskHubInterface } from "@/components/askhub-interface"
import { generateUUID } from "@/lib/utils"
import { TitleSetter } from "@/components/title-setter"

export default function CoachingPlatform() {
  const [sessionId] = useState(() => generateUUID())
  const [showAskHub, setShowAskHub] = useState(false)
  const [coachTrigger, setCoachTrigger] = useState<string>("")

  const handleLaunchAskHub = (trigger: string) => {
    setCoachTrigger(trigger)
    setShowAskHub(true)
  }

  const handleBackToLanding = () => {
    setShowAskHub(false)
    setCoachTrigger("")
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
