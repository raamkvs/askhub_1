"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import { Button } from "@/components/ui/button"
import { AiHubLogoLink } from "@/components/ai-hub-logo-link"
import { AuthNavActions } from "@/components/auth-nav-actions"
import { getNextPhaseTwoQuestion } from "@/lib/intake/conditions"
import { mergeResponses } from "@/lib/intake/merge"
import { normalizeResponses, type IntakeResponse } from "@/lib/intake/responses"

interface ChatMessage {
  id: string
  type: "bot" | "user"
  content: string
  options?: { id: string; text: string; value: string }[]
  questionId?: string
  question?: string
  isDisabled?: boolean
}

const OPTION_SETS: Record<string, { id: string; text: string; value: string }[]> = {
  "ai-experience": [
    { id: "none", text: "None – I am new to AI development", value: "none" },
    { id: "getting-started", text: "Getting started – Less than 6 months", value: "getting-started" },
    { id: "good", text: "Good – Solid AI/technical background", value: "good" },
    { id: "expert", text: "Expert – Several years of ML/DS/AI experience", value: "expert" },
    { id: "not-sure", text: "Not sure", value: "not-sure" },
  ],
  "learning-history": [
    { id: "guided", text: "Yes – Guided course or workshop", value: "guided" },
    { id: "self-taught", text: "Yes – Independently watched videos or self-taught", value: "self-taught" },
    { id: "started", text: "Started a course/project but didn't finish", value: "started" },
    { id: "no", text: "No – I haven't started learning yet", value: "no" },
  ],
  "ai-goals": [
    { id: "build", text: "Learn how to build my own AI tools", value: "build" },
    { id: "use", text: "Use AI in my business or project", value: "use" },
    { id: "grow", text: "Grow a startup or idea using AI", value: "grow" },
    { id: "explore", text: "Explore and learn more about AI before deciding", value: "explore" },
  ],
  "compute-experience": [
    { id: "what", text: "What's compute?", value: "what" },
    { id: "curious", text: "I'm curious about compute, but not experienced yet.", value: "curious" },
    { id: "testing", text: "Testing stage – I am trying out compute options", value: "testing" },
    { id: "ready", text: "Compute ready – I am using compute and need more.", value: "ready" },
    { id: "advanced", text: "Advanced – I want to optimize my compute for better AI performance", value: "advanced" },
  ],
  "team-size": [
    { id: "just-me", text: "Just me", value: "just-me" },
    { id: "small", text: "Small team (2–3 people)", value: "small" },
    { id: "medium", text: "Medium team (3–10 people)", value: "medium" },
    { id: "organization", text: "Part of a larger organisation", value: "organization" },
    { id: "large", text: "Large team (10+ people)", value: "large" },
  ],
}

export function OnboardingPhaseTwo() {
  const router = useRouter()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [phaseTwoResponses, setPhaseTwoResponses] = useState<IntakeResponse[]>([])
  const [existingResponses, setExistingResponses] = useState<IntakeResponse[]>([])
  const [sessionId, setSessionId] = useState("")
  const [trigger, setTrigger] = useState<string | null>(null)
  const [currentQuestionAnswered, setCurrentQuestionAnswered] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const startedRef = useRef(false)

  const allResponses = mergeResponses(existingResponses, phaseTwoResponses)

  const addMessage = (
    content: string,
    type: "bot" | "user" = "bot",
    options?: ChatMessage["options"],
    meta?: { questionId?: string; question?: string },
    isDisabled?: boolean,
  ) => {
    setMessages((prev) => [
      ...prev,
      {
        id: uuidv4(),
        type,
        content,
        options,
        questionId: meta?.questionId,
        question: meta?.question,
        isDisabled,
      },
    ])
  }

  const disablePreviousMessages = () => {
    setMessages((prev) => prev.map((msg) => ({ ...msg, isDisabled: true })))
  }

  const showNextQuestion = (responses: IntakeResponse[]) => {
    const merged = mergeResponses(existingResponses, responses)
    const next = getNextPhaseTwoQuestion(merged)

    if (!next) {
      void submitPhaseTwo(responses)
      return
    }

    addMessage(next.question, "bot", OPTION_SETS[next.questionId], {
      questionId: next.questionId,
      question: next.question,
    })
    setCurrentQuestionAnswered(false)
  }

  const submitPhaseTwo = async (responses: IntakeResponse[]) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const result = await fetch("/api/intake/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phase: 2,
          responses,
          sessionId,
          trigger,
        }),
      })

      const data = await result.json()
      if (!result.ok || !data.success) {
        throw new Error(data.error ?? "Unable to save your responses")
      }

      router.push("/my-results")
      router.refresh()
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Something went wrong. Please try again.")
      setIsSubmitting(false)
    }
  }

  const handleOptionSelect = (
    option: { id: string; text: string; value: string },
    questionId: string,
    question: string,
  ) => {
    if (currentQuestionAnswered || isSubmitting || !questionId) return

    setCurrentQuestionAnswered(true)
    disablePreviousMessages()
    addMessage(option.text, "user")

    const newResponse: IntakeResponse = {
      questionId,
      question,
      answer: option.value,
      answerText: option.text,
    }

    const updated = [...phaseTwoResponses.filter((r) => r.questionId !== questionId), newResponse]
    setPhaseTwoResponses(updated)

    setTimeout(() => showNextQuestion(updated), 600)
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/intake/session")
        if (res.status === 401) {
          router.replace("/auth/signin")
          return
        }

        const data = await res.json()
        if (!data.success || !data.session) {
          router.replace("/")
          return
        }

        if (data.onboardingComplete) {
          router.replace("/my-results")
          return
        }

        setExistingResponses(normalizeResponses(data.session.responses))
        setSessionId(data.session.session_id)
        setTrigger(data.session.trigger ?? null)
        setLoading(false)
      } catch {
        setSubmitError("Unable to load your profile. Please try again.")
        setLoading(false)
      }
    }

    void load()
  }, [router])

  useEffect(() => {
    if (loading || startedRef.current) return
    startedRef.current = true

    addMessage(
      "Welcome back! A few more questions will help us fine-tune your recommendations.",
      "bot",
    )

    setTimeout(() => showNextQuestion([]), 500)
  }, [loading])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0071BC] border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <AiHubLogoLink />
          <AuthNavActions />
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 pb-16 font-montserrat">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-[#D9F1FF] px-4 py-1 text-xs font-bold uppercase tracking-wide text-[#0071BC]">
            Step 2 of 2
          </span>
          <h1 className="text-2xl font-bold text-black">Complete your profile</h1>
          <p className="mt-2 text-sm text-gray-600">
            Answer a few more questions so we can match you with the right resources.
          </p>
        </div>

        <div className="mx-auto max-w-2xl space-y-6">
          {messages.map((message) => (
            <div key={message.id}>
              {message.type === "bot" ? (
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center">
                    <img src="/images/chat-coach-icon.png" alt="AskHub" className="h-12 w-12" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-4 rounded-lg bg-gray-50 p-4">
                      <p className="whitespace-pre-line leading-relaxed text-gray-700">{message.content}</p>
                    </div>
                    {message.options && !message.isDisabled && !isSubmitting ? (
                      <div className="space-y-2">
                        {message.options.map((option) => (
                          <div key={option.id} className="rounded-lg border border-gray-300 p-4">
                            <Button
                              variant="ghost"
                              onClick={() =>
                                handleOptionSelect(
                                  option,
                                  message.questionId ?? "",
                                  message.question ?? "",
                                )
                              }
                              className="h-auto w-full justify-start p-0 text-left font-medium text-gray-700 hover:bg-transparent hover:text-gray-900"
                            >
                              {option.text}
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className="mb-4 flex justify-end">
                  <div className="max-w-md rounded-lg bg-[#0071BC] px-4 py-2 text-left text-white">
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              )}
            </div>
          ))}

          {isSubmitting ? (
            <div className="flex items-center justify-center gap-3 py-4 text-sm text-gray-600">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#0071BC] border-t-transparent" />
              Saving your profile and finding your resources…
            </div>
          ) : null}

          {submitError ? (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{submitError}</p>
          ) : null}

          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  )
}
