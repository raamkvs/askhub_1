"use client"

import { useEffect, useState } from "react"
import { BookOpen, ExternalLink, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuthModal } from "@/components/auth-modal"
import { HelpOptionsSection } from "@/components/help-options-section"
import { PathwayResultsSection } from "@/components/pathway-results-section"
import { ResultsPageHeader } from "@/components/results-page-header"
import { createClient } from "@/lib/supabase/client"
import { normalizeResponses, type IntakeResponse } from "@/lib/intake/responses"
import { derivePathway } from "@/lib/pathway"
import { getPathwayDisplay } from "@/lib/pathway-config"
import { mapHelpOptionToSecondaryNeed } from "@/lib/matching/maps"

interface RecommendationResultsProps {
  responses: IntakeResponse[]
  sessionId: string
  onBack: () => void
  isExistingUser?: boolean
  otpSent?: boolean
  otpError?: string
  suppressAuthModal?: boolean
  initialResourceState?: {
    selectedHelpOption?: string | null
  }
}

export function RecommendationResults({
  responses,
  sessionId,
  onBack,
  otpSent = false,
  otpError,
  suppressAuthModal = false,
  initialResourceState,
}: RecommendationResultsProps) {
  const normalizedResponses = normalizeResponses(responses)
  const pathway = derivePathway(normalizedResponses)
  const pathwayDisplay = getPathwayDisplay(pathway.type)
  const skipJourneySummary = suppressAuthModal

  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(suppressAuthModal)
  const [selectedHelpOption, setSelectedHelpOption] = useState<string | null>(
    initialResourceState?.selectedHelpOption ?? null,
  )
  const [showProgrammesDropdown, setShowProgrammesDropdown] = useState(false)

  useEffect(() => {
    if (suppressAuthModal) {
      setIsAuthenticated(true)
      return
    }

    const supabase = createClient()
    let timer: ReturnType<typeof setTimeout> | undefined

    void supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setIsAuthenticated(true)
        return
      }

      timer = setTimeout(() => setShowAuthModal(true), 5000)
    })

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [suppressAuthModal])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    const timer = setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100)
    return () => clearTimeout(timer)
  }, [])

  const intakeEmail = normalizedResponses.find((response) => response.questionId === "email")?.answerText
  const secondaryNeed = mapHelpOptionToSecondaryNeed(selectedHelpOption)

  useEffect(() => {
    if (!isAuthenticated) return

    void fetch("/api/intake/session", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        resourceState: { selectedHelpOption },
      }),
    }).catch((error) => {
      console.error("Failed to persist resource state:", error)
    })
  }, [isAuthenticated, selectedHelpOption, sessionId])

  return (
    <div className="min-h-screen bg-white">
      <ResultsPageHeader
        onBack={onBack}
        showProgrammesDropdown={showProgrammesDropdown}
        onToggleProgrammesDropdown={() => setShowProgrammesDropdown((open) => !open)}
        onCloseProgrammesDropdown={() => setShowProgrammesDropdown(false)}
      />

      <div className="container mx-auto px-6 py-8 pb-16 font-montserrat">
        {!skipJourneySummary ? (
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={onBack}
              className="rounded-lg bg-transparent font-montserrat font-bold"
            >
              Back to homepage
            </Button>
          </div>
        ) : null}

        <div className="mx-auto max-w-5xl space-y-8">
          {!skipJourneySummary ? (
            <>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center">
                  <img src="/images/chat-coach-icon.png" alt="AI Assistant" className="h-12 w-12" />
                </div>
                <div className="flex-1">
                  <div className="mb-6 rounded-lg bg-[#D9F1FF] p-4">
                    <p className="font-montserrat leading-relaxed text-[#6C6F75]">
                      {pathway.isFromAfrica
                        ? pathwayDisplay.coachMessage
                        : "Thank you for your interest in AskHub!"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                <div className="border-b border-[#0071BC] bg-[#D9F1FF] p-4">
                  <h2 className="flex items-center gap-2 font-montserrat text-xl font-bold text-black">
                    <FileText className="h-5 w-5 text-[#0071BC]" />
                    Your AI Journey Summary
                  </h2>
                </div>
                <div className="p-6">
                  <p className="mb-4 font-montserrat leading-relaxed text-[#6C6F75]">
                    Here&apos;s how we generated your personalized recommendations based on your responses:
                  </p>
                  <div className="space-y-3">
                    {normalizedResponses.map((response, index) => (
                      <div key={index} className="rounded-lg bg-gray-50 p-4">
                        <p className="mb-1 font-montserrat font-medium text-gray-900">{response.question}</p>
                        <p className="font-montserrat text-[#6C6F75]">{response.answerText}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : null}

          {!pathway.isFromAfrica ? (
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
              <div className="border-b border-[#0071BC] bg-[#D9F1FF] p-4">
                <h2 className="flex items-center gap-2 font-montserrat text-xl font-bold text-black">
                  <BookOpen className="h-5 w-5 text-[#0071BC]" />
                  Not Yet Available in Your Region
                </h2>
              </div>
              <div className="p-6">
                <p className="mb-6 font-montserrat leading-relaxed text-[#6C6F75]">
                  It&apos;s great that you&apos;re interested in building and using AI! However, I am not available in
                  your country yet. Please register with your email address and I will notify you when I can be fully
                  available to you.
                </p>
                {!isAuthenticated ? (
                  <div className="text-center">
                    <Button
                      onClick={() => setShowAuthModal(true)}
                      className="rounded-lg bg-[#1976d2] font-montserrat font-bold text-white hover:bg-[#1565c0]"
                    >
                      Register for Updates
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <PathwayResultsSection
              pathway={pathway}
              responses={normalizedResponses}
              email={intakeEmail}
              secondaryNeed={secondaryNeed}
              showWelcomeBanner={skipJourneySummary}
              showProfileHeader={skipJourneySummary}
            />
          )}

          <HelpOptionsSection
            selectedHelpOption={selectedHelpOption}
            onSelectHelpOption={setSelectedHelpOption}
          />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-gray-100 px-4 py-2">
        <div className="container mx-auto">
          <p className="text-center font-montserrat text-xs text-gray-600">
            <strong>BETA:</strong> This is a beta version of AskHub. We welcome your feedback to help us improve. Please
            send any comments or suggestions to{" "}
            <a href="mailto:aihubfordevelopment@undp.org" className="text-[#0071BC] hover:underline">
              aihubfordevelopment@undp.org
            </a>
          </p>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        email={intakeEmail}
        forceOpen={!isAuthenticated}
        otpAlreadySent={otpSent}
        otpSendError={otpError}
        onAuthenticated={() => {
          setIsAuthenticated(true)
          setShowAuthModal(false)
        }}
      />
    </div>
  )
}
