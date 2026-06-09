"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft } from "lucide-react"
import { QuestionCard } from "@/components/question-card"
import { RecommendationCard } from "@/components/recommendation-card"
import { ApplicationForm } from "@/components/application-form"

interface AssessmentFlowProps {
  sessionId: string
}

export interface UserResponse {
  question: string
  answer: string
  metadata?: any
}

export interface UserPathway {
  type: "curious" | "builder" | "compute-ready"
  score: number
  responses: UserResponse[]
}

const questions = [
  {
    id: 1,
    title: "Development Stage",
    question: "How far along are you in building your AI solution?",
    description: "This helps us understand your current progress and readiness level.",
    options: [
      {
        value: "idea",
        label: "Idea Stage",
        description: "I have a concept but haven't started building yet",
        score: 1,
      },
      {
        value: "early",
        label: "Early Development",
        description: "I'm actively building and testing my solution",
        score: 2,
      },
      {
        value: "working",
        label: "Working Product",
        description: "I have a functional product with users/customers",
        score: 3,
      },
    ],
  },
  {
    id: 2,
    title: "Context & Needs",
    question: "Tell me about your sector, location, and technical needs",
    description: "This helps us match you with relevant partners and resources.",
    options: [
      {
        value: "health-compute",
        label: "Health + Compute",
        description: "Healthcare solutions needing processing power",
        score: 3,
      },
      {
        value: "finance-infra",
        label: "Finance + Infrastructure",
        description: "Fintech solutions needing robust infrastructure",
        score: 2,
      },
      {
        value: "climate-general",
        label: "Climate + General Support",
        description: "Climate tech needing broad ecosystem support",
        score: 2,
      },
      {
        value: "education-training",
        label: "Education + Training",
        description: "EdTech solutions needing capacity building",
        score: 1,
      },
      {
        value: "agriculture-data",
        label: "Agriculture + Data",
        description: "AgTech solutions needing data infrastructure",
        score: 2,
      },
    ],
  },
  {
    id: 3,
    title: "Team & Experience",
    question: "What's your team composition and AI experience level?",
    description: "This helps us determine the right level of support and guidance.",
    options: [
      {
        value: "solo-beginner",
        label: "Solo Founder - New to AI",
        description: "Working alone, learning AI development",
        score: 1,
      },
      {
        value: "small-some",
        label: "Small Team - Some Experience",
        description: "2-3 people with basic AI/tech background",
        score: 2,
      },
      {
        value: "experienced-team",
        label: "Experienced Team",
        description: "Strong technical team with AI expertise",
        score: 3,
      },
      {
        value: "scaling-team",
        label: "Scaling Team",
        description: "Established team ready for growth and partnerships",
        score: 3,
      },
    ],
  },
]

export function AssessmentFlow({ sessionId }: AssessmentFlowProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<UserResponse[]>([])
  const [pathway, setPathway] = useState<UserPathway | null>(null)
  const [showForm, setShowForm] = useState(false)

  const handleAnswer = (answer: string, metadata?: any) => {
    const questionText = questions[currentQuestion].question
    const newResponse: UserResponse = {
      question: questionText,
      answer,
      metadata,
    }

    const newResponses = [...responses, newResponse]
    setResponses(newResponses)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate pathway
      const totalScore = newResponses.reduce((sum, response) => {
        const question = questions.find((q) => q.question === response.question)
        const option = question?.options.find((opt) => opt.value === response.answer)
        return sum + (option?.score || 0)
      }, 0)

      let pathwayType: "curious" | "builder" | "compute-ready"
      if (totalScore <= 4) {
        pathwayType = "curious"
      } else if (totalScore <= 7) {
        pathwayType = "builder"
      } else {
        pathwayType = "compute-ready"
      }

      setPathway({
        type: pathwayType,
        score: totalScore,
        responses: newResponses,
      })
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setResponses(responses.slice(0, -1))
    }
  }

  const handleApply = () => {
    setShowForm(true)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (showForm && pathway) {
    return <ApplicationForm pathway={pathway} sessionId={sessionId} />
  }

  if (pathway) {
    return <RecommendationCard pathway={pathway} onApply={handleApply} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={() => window.location.reload()}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <Badge variant="secondary">
              Question {currentQuestion + 1} of {questions.length}
            </Badge>
          </div>

          <Progress value={progress} className="mb-6" />

          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">AI Readiness Assessment</h1>
            <p className="text-gray-600">Let's find the perfect pathway for your AI innovation journey</p>
          </div>
        </div>

        {/* Question */}
        <div className="max-w-2xl mx-auto">
          <QuestionCard
            question={questions[currentQuestion]}
            onAnswer={handleAnswer}
            onBack={currentQuestion > 0 ? handleBack : undefined}
            selectedAnswer={responses[currentQuestion]?.answer}
          />
        </div>
      </div>
    </div>
  )
}
