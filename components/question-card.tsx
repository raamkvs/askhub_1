"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface QuestionOption {
  value: string
  label: string
  description: string
  score: number
}

interface Question {
  id: number
  title: string
  question: string
  description: string
  options: QuestionOption[]
}

interface QuestionCardProps {
  question: Question
  onAnswer: (answer: string, metadata?: any) => void
  onBack?: () => void
  selectedAnswer?: string
}

export function QuestionCard({ question, onAnswer, onBack, selectedAnswer }: QuestionCardProps) {
  const [selected, setSelected] = useState<string>(selectedAnswer || "")

  const handleNext = () => {
    if (selected) {
      const selectedOption = question.options.find((opt) => opt.value === selected)
      onAnswer(selected, { score: selectedOption?.score })
    }
  }

  return (
    <Card className="border-orange-200 bg-white/90 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <div className="text-center">
          <CardTitle className="text-xl text-gray-900 mb-2">{question.title}</CardTitle>
          <h2 className="text-lg font-medium text-gray-700 mb-2">{question.question}</h2>
          <p className="text-sm text-gray-600">{question.description}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {question.options.map((option) => (
          <Card
            key={option.value}
            className={`cursor-pointer transition-all duration-200 border-2 ${
              selected === option.value
                ? "border-orange-400 bg-orange-50"
                : "border-gray-200 hover:border-orange-300 hover:bg-orange-25"
            }`}
            onClick={() => setSelected(option.value)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 mt-0.5 ${
                    selected === option.value ? "border-orange-500 bg-orange-500" : "border-gray-300"
                  }`}
                >
                  {selected === option.value && <div className="w-full h-full rounded-full bg-white scale-50"></div>}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">{option.label}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="flex justify-between pt-6">
          {onBack ? (
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
          ) : (
            <div></div>
          )}

          <Button
            onClick={handleNext}
            disabled={!selected}
            className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white"
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
