"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, CheckCircle, ArrowLeft, FileText, Sparkles, Heart } from "lucide-react"

interface UserResponse {
  questionId: string
  question: string
  answer: string
  answerText: string
}

interface Pathway {
  type: "curious" | "builder" | "compute-ready"
  score: number
  responses: UserResponse[]
}

interface ApplicationFormProps {
  pathway: Pathway
  sessionId: string
  onBack: () => void
}

interface FormData {
  organizationName: string
  contactName: string
  email: string
  phone: string
  country: string
  sector: string
  useCaseSummary: string
  teamSize: string
  fundingStage: string
  file?: File
  tosConsent: boolean
  emailConsent: boolean
}

const sectors = [
  "Healthcare",
  "Finance",
  "Education",
  "Agriculture",
  "Climate/Environment",
  "Transportation",
  "Energy",
  "Manufacturing",
  "Retail",
  "Government",
  "Other",
]

const countries = [
  "Nigeria",
  "Kenya",
  "South Africa",
  "Ghana",
  "Egypt",
  "Morocco",
  "Ethiopia",
  "Uganda",
  "Tanzania",
  "Rwanda",
  "Senegal",
  "Ivory Coast",
  "Other",
]

export function ApplicationForm({ pathway, sessionId, onBack }: ApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    organizationName: "",
    contactName: "",
    email: "",
    phone: "",
    country: "",
    sector: "",
    useCaseSummary: "",
    teamSize: "",
    fundingStage: "",
    tosConsent: false,
    emailConsent: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const isComputeAccelerator = pathway.type === "compute-ready"
  const totalSteps = isComputeAccelerator ? 3 : 4
  const programName = isComputeAccelerator ? "Compute Accelerator" : "Infrastructure Builder"

  const handleInputChange = (field: keyof FormData, value: string | boolean | File) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleInputChange("file", file)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const submissionData = {
      sessionId,
      pathway: pathway.type,
      responses: pathway.responses,
      formData,
      submittedAt: new Date().toISOString(),
    }

    console.log("Submission data:", submissionData)
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.organizationName && formData.contactName && formData.email && formData.country
      case 2:
        return formData.sector && formData.useCaseSummary && formData.teamSize
      case 3:
        return isComputeAccelerator ? formData.tosConsent : formData.fundingStage && formData.file
      case 4:
        return formData.tosConsent
      default:
        return false
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
        <Card className="max-w-2xl mx-auto border-green-200 bg-white/90 backdrop-blur-sm shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted Successfully! ��</h1>
            <p className="text-lg text-gray-600 mb-6">
              Thank you for applying to the {programName} programme! Our team will review your application and get back
              to you within 2-3 weeks with next steps.
            </p>

            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 mb-6">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">
                    <strong className="text-gray-900">Application ID:</strong> {sessionId.slice(0, 8)}
                  </p>
                  <p className="text-gray-600">
                    <strong className="text-gray-900">Programme:</strong> {programName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">
                    <strong className="text-gray-900">Pathway:</strong> {pathway.type}
                  </p>
                  <p className="text-gray-600">
                    <strong className="text-gray-900">Submitted:</strong> {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Application received and processing</span>
              </div>
              <div className="text-gray-600">
                <p className="mb-2">What happens next:</p>
                <ul className="text-sm space-y-1">
                  <li>• Initial review within 5 business days</li>
                  <li>• Potential follow-up interview</li>
                  <li>• Final decision within 2-3 weeks</li>
                  <li>• Programme onboarding if accepted</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.location.reload()}
                className="bg-[#1976d2] hover:bg-[#1565c0] text-white rounded-lg"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Start New Assessment
              </Button>
              <Button variant="outline" className="rounded-lg">
                <Heart className="w-4 h-4 mr-2" />
                Share Your Journey
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Button variant="ghost" onClick={onBack} className="text-gray-600 hover:text-gray-900 mb-6 rounded-lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Results
            </Button>

            <Badge variant="secondary" className="mb-4">
              Step {currentStep} of {totalSteps}
            </Badge>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Apply to {programName} 🚀</h1>
            <p className="text-gray-600">Complete your application to join the UNDP programme</p>
          </div>

          <Card className="border-orange-200 bg-white/90 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              {/* Step 1: Organization Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <CardTitle className="text-lg mb-4 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-orange-500" />
                      Tell us about yourself
                    </CardTitle>
                    <p className="text-gray-600 text-sm mb-6">
                      We're excited to learn more about you and your organization!
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="orgName">Organization Name *</Label>
                      <Input
                        id="orgName"
                        value={formData.organizationName}
                        onChange={(e) => handleInputChange("organizationName", e.target.value)}
                        placeholder="Your organization name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactName">Contact Name *</Label>
                      <Input
                        id="contactName"
                        value={formData.contactName}
                        onChange={(e) => handleInputChange("contactName", e.target.value)}
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+1234567890"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 2: Project Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <CardTitle className="text-lg mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-orange-500" />
                      Your AI Innovation
                    </CardTitle>
                    <p className="text-gray-600 text-sm mb-6">
                      Help us understand your solution and its impact potential.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sector">Sector *</Label>
                      <Select value={formData.sector} onValueChange={(value) => handleInputChange("sector", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your sector" />
                        </SelectTrigger>
                        <SelectContent>
                          {sectors.map((sector) => (
                            <SelectItem key={sector} value={sector}>
                              {sector}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="teamSize">Team Size *</Label>
                      <Select value={formData.teamSize} onValueChange={(value) => handleInputChange("teamSize", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select team size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Solo founder</SelectItem>
                          <SelectItem value="2-3">2-3 people</SelectItem>
                          <SelectItem value="4-10">4-10 people</SelectItem>
                          <SelectItem value="10+">10+ people</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="useCase">Use Case Summary *</Label>
                    <Textarea
                      id="useCase"
                      value={formData.useCaseSummary}
                      onChange={(e) => handleInputChange("useCaseSummary", e.target.value)}
                      placeholder="Describe your AI solution, the problem it solves, and your target users. What makes it special for the African context? (200-500 words)"
                      rows={6}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Additional Info (Infrastructure Builder only) */}
              {currentStep === 3 && !isComputeAccelerator && (
                <div className="space-y-6">
                  <div>
                    <CardTitle className="text-lg mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-orange-500" />
                      Additional Details
                    </CardTitle>
                    <p className="text-gray-600 text-sm mb-6">A few more details to help us support you better.</p>
                  </div>

                  <div>
                    <Label htmlFor="fundingStage">Current Funding Stage *</Label>
                    <Select
                      value={formData.fundingStage}
                      onValueChange={(value) => handleInputChange("fundingStage", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select funding stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pre-seed">Pre-seed</SelectItem>
                        <SelectItem value="seed">Seed</SelectItem>
                        <SelectItem value="series-a">Series A</SelectItem>
                        <SelectItem value="bootstrapped">Bootstrapped</SelectItem>
                        <SelectItem value="grant-funded">Grant funded</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="businessPlan">Business Plan Upload *</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-300 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Upload your 3-5 page business plan (PDF, DOC, DOCX)</p>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("file-upload")?.click()}
                        className="border-orange-300 hover:bg-orange-50 rounded-lg"
                      >
                        Choose File
                      </Button>
                      {formData.file && (
                        <p className="text-sm text-green-600 mt-2 flex items-center justify-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          {formData.file.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3/4: Consent */}
              {(currentStep === 3 && isComputeAccelerator) ||
                (currentStep === 4 && !isComputeAccelerator && (
                  <div className="space-y-6">
                    <div>
                      <CardTitle className="text-lg mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-orange-500" />
                        Final Steps
                      </CardTitle>
                      <p className="text-gray-600 text-sm mb-6">Almost there! Just need your consent to proceed.</p>
                    </div>

                    {isComputeAccelerator && (
                      <div>
                        <Label htmlFor="pitchDeck">Pitch Deck Upload (Optional)</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-300 transition-colors">
                          <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-2">Upload your pitch deck (PDF, PPT, PPTX)</p>
                          <input
                            type="file"
                            accept=".pdf,.ppt,.pptx"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="pitch-upload"
                          />
                          <Button
                            variant="outline"
                            onClick={() => document.getElementById("pitch-upload")?.click()}
                            className="border-orange-300 hover:bg-orange-50 rounded-lg"
                          >
                            Choose File
                          </Button>
                          {formData.file && (
                            <p className="text-sm text-green-600 mt-2 flex items-center justify-center gap-1">
                              <CheckCircle className="w-4 h-4" />
                              {formData.file.name}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="space-y-4 bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="tos"
                          checked={formData.tosConsent}
                          onCheckedChange={(checked) => handleInputChange("tosConsent", checked as boolean)}
                        />
                        <Label htmlFor="tos" className="text-sm leading-relaxed">
                          I agree to the Terms of Service and Privacy Policy. I understand that my application data will
                          be reviewed by the UNDP team and partner organizations. *
                        </Label>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="email"
                          checked={formData.emailConsent}
                          onCheckedChange={(checked) => handleInputChange("emailConsent", checked as boolean)}
                        />
                        <Label htmlFor="email" className="text-sm leading-relaxed">
                          I would like to receive updates about the African AI Hub and related opportunities.
                        </Label>
                      </div>
                    </div>
                  </div>
                ))}

              {/* Navigation */}
              <div className="flex justify-between pt-8 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  disabled={currentStep === 1}
                  className="rounded-lg"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>

                {currentStep === totalSteps ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={!canProceed() || isSubmitting}
                    className="bg-[#1976d2] hover:bg-[#1565c0] text-white rounded-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Heart className="w-4 h-4 mr-2" />
                        Submit Application
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={!canProceed()}
                    className="bg-[#1976d2] hover:bg-[#1565c0] text-white rounded-lg"
                  >
                    Next Step
                    <Sparkles className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
