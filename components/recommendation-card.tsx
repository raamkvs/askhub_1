"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Hammer, Rocket, ExternalLink, FileText, Users, Globe, BookOpen, ArrowLeft } from "lucide-react"
import type { UserPathway } from "@/components/assessment-flow"

interface RecommendationCardProps {
  pathway: UserPathway
  onApply: () => void
}

const pathwayConfig = {
  curious: {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Curious Explorer",
    color: "bg-[#0071BC]",
    bgColor: "bg-[#D9F1FF]",
    borderColor: "border-[#0071BC]",
    program: "Infrastructure Builder",
    programDescription: "Perfect for early-stage innovators ready to build foundational knowledge and connections.",
    resources: [
      { name: "AIMS AI Fundamentals", type: "Course", icon: <BookOpen className="w-4 h-4" /> },
      { name: "Zindi Community", type: "Platform", icon: <Users className="w-4 h-4" /> },
      { name: "Google AI Scholarships", type: "Funding", icon: <Globe className="w-4 h-4" /> },
    ],
  },
  builder: {
    icon: <Hammer className="w-6 h-6" />,
    title: "Active Builder",
    color: "bg-[#0071BC]",
    bgColor: "bg-[#D9F1FF]",
    borderColor: "border-[#0071BC]",
    program: "Infrastructure Builder",
    programDescription: "Ideal for teams actively developing solutions and needing infrastructure support.",
    resources: [
      { name: "Cloud Compute Partners", type: "Infrastructure", icon: <Globe className="w-4 h-4" /> },
      { name: "Technical Mentorship", type: "Support", icon: <Users className="w-4 h-4" /> },
      { name: "Data Provider Network", type: "Resources", icon: <FileText className="w-4 h-4" /> },
    ],
  },
  "compute-ready": {
    icon: <Rocket className="w-6 h-6" />,
    title: "Compute Ready",
    color: "bg-[#0071BC]",
    bgColor: "bg-[#D9F1FF]",
    borderColor: "border-[#0071BC]",
    program: "Compute Accelerator",
    programDescription: "Designed for teams with proven solutions ready to scale and access advanced resources.",
    resources: [
      { name: "Timbuktoo Accelerator", type: "Program", icon: <Rocket className="w-4 h-4" /> },
      { name: "Investor Network", type: "Funding", icon: <Users className="w-4 h-4" /> },
      { name: "Market Access Support", type: "Business", icon: <Globe className="w-4 h-4" /> },
    ],
  },
}

export function RecommendationCard({ pathway, onApply }: RecommendationCardProps) {
  const config = pathwayConfig[pathway.type]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <img
                src="/images/ai-hub-logo-updated.png"
                alt="AI Hub for Sustainable Development"
                className="h-12 w-auto"
              />
              <img
                src="/images/mimit-logo-new.png"
                alt="Ministry of Enterprises and Made in Italy"
                className="h-10 w-auto"
              />
              <img src="/images/undp-logo.webp" alt="UNDP" className="h-12 w-auto" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 pb-16 font-montserrat">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="font-montserrat font-bold rounded-lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to homepage
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className={`w-16 h-16 ${config.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white`}
            >
              {config.icon}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Pathway: {config.title}</h1>
            <p className="text-lg text-gray-600">
              Based on your responses, here's what we recommend for your AI journey
            </p>
          </div>

          {/* Main Recommendation */}
          <Card className={`${config.borderColor} ${config.bgColor} border-2 mb-8`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-gray-900 mb-2">Recommended: {config.program}</CardTitle>
                  <Badge variant="secondary" className="mb-4">
                    UNDP Programme
                  </Badge>
                </div>
                <div className={`w-12 h-12 ${config.color} rounded-xl flex items-center justify-center text-white`}>
                  {config.icon}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-6 text-lg">{config.programDescription}</p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">What you'll get:</h3>
                  <ul className="space-y-2 text-gray-700">
                    {pathway.type === "compute-ready" ? (
                      <>
                        <li>• Advanced compute resources</li>
                        <li>• 1:1 technical mentorship</li>
                        <li>• Investor introductions</li>
                        <li>• Market access support</li>
                      </>
                    ) : (
                      <>
                        <li>• Infrastructure development support</li>
                        <li>• Technical training programs</li>
                        <li>• Community access</li>
                        <li>• Partnership opportunities</li>
                      </>
                    )}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Timeline:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Application review: 2-3 weeks</li>
                    <li>• Program duration: 6-12 months</li>
                    <li>• Ongoing support available</li>
                  </ul>
                </div>
              </div>

              <Button
                onClick={onApply}
                size="lg"
                className="w-full bg-[#1976d2] hover:bg-[#1565c0] text-white font-montserrat font-bold rounded-lg"
              >
                Apply to {config.program}
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Additional Resources */}
          <Card className="border-gray-200 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Additional Resources for You</CardTitle>
              <p className="text-gray-600">Curated resources based on your stage and needs</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {config.resources.map((resource, index) => (
                  <Card key={index} className="border-gray-200 hover:border-[#0071BC] transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-[#D9F1FF] rounded-lg flex items-center justify-center text-[#0071BC]">
                          {resource.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">{resource.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {resource.type}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Beta Note - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-200 px-4 py-2 z-40">
        <div className="container mx-auto">
          <p className="text-xs text-gray-600 font-montserrat text-center">
            <strong>BETA:</strong> This is a beta version of AskHub. We welcome your feedback to help us improve. Please
            send any comments or suggestions to{" "}
            <a href="mailto:digital.support@undp.org" className="text-[#0071BC] hover:underline">
              digital.support@undp.org
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
