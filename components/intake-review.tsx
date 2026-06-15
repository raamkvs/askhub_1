"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import type { IntakeResponse } from "@/lib/intake/responses"

interface IntakeReviewProps {
  responses: IntakeResponse[]
  onSubmit: () => void
  onBack: () => void
  isSubmitting: boolean
  submitError?: string
}

export function IntakeReview({
  responses,
  onSubmit,
  onBack,
  isSubmitting,
  submitError,
}: IntakeReviewProps) {
  const [termsAccepted, setTermsAccepted] = useState(false)

  return (
    <div className="min-h-screen bg-white font-montserrat">
      <div className="container mx-auto px-6 py-12">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <span className="mb-4 inline-block rounded-full bg-[#D9F1FF] px-4 py-1 text-xs font-bold uppercase tracking-wide text-[#0071BC]">
              Final step
            </span>
            <h1 className="mb-2 text-3xl font-bold text-black">Review and submit</h1>
            <p className="text-gray-600">One last thing before we create your profile.</p>
          </div>

          <div className="mb-6 rounded-lg border border-gray-200 bg-[#F8FBFF] p-6">
            <h2 className="mb-4 text-lg font-bold text-black">Your responses</h2>
            <div className="space-y-3">
              {responses.map((response, index) => (
                <div key={index} className="rounded-lg border border-gray-100 bg-white p-4">
                  <p className="mb-1 text-sm font-medium text-gray-900">{response.question}</p>
                  <p className="text-sm text-[#6C6F75]">{response.answerText}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6 rounded-lg border border-[#BFDBFE] bg-[#EFF6FF] p-6">
            <h3 className="mb-3 font-bold text-black">What happens with your information:</h3>
            <ul className="list-disc space-y-2 pl-5 text-sm text-[#6C6F75]">
              <li>Your responses are stored securely to personalize your AskHub experience.</li>
              <li>We use your answers to curate resources and partner connections for you.</li>
              <li>
                Your information is shared with G7 partner programmes only when you apply to them through
                AskHub.
              </li>
              <li>
                You can request removal of your data at any time by emailing{" "}
                <a
                  href="mailto:aihubfordevelopment@undp.org"
                  className="text-[#0071BC] hover:underline"
                >
                  aihubfordevelopment@undp.org
                </a>
                .
              </li>
            </ul>
          </div>

          <label className="mb-6 flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 bg-white p-4">
            <Checkbox
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked === true)}
              className="mt-0.5 border-[#0071BC] data-[state=checked]:bg-[#0071BC] data-[state=checked]:border-[#0071BC]"
            />
            <span className="text-sm text-gray-700">
              I agree to AskHub storing my information and sharing it with G7 partner programmes I apply
              to.
            </span>
          </label>

          {submitError && (
            <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{submitError}</p>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={isSubmitting}
              className="font-montserrat font-bold"
            >
              Back
            </Button>
            <Button
              type="button"
              onClick={onSubmit}
              disabled={!termsAccepted || isSubmitting}
              className="flex-1 bg-[#0071BC] font-montserrat font-bold text-white hover:bg-[#005A94] disabled:bg-gray-300 disabled:text-gray-500"
            >
              {isSubmitting ? (
                "Creating your profile…"
              ) : (
                <span className="inline-flex items-center gap-2">
                  Submit and create my profile
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
