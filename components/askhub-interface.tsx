"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, Heart, Rocket, Target, Menu, X, ChevronDown } from "lucide-react"
import { ConversationFlow } from "@/components/conversation-flow"

interface AskHubInterfaceProps {
  sessionId: string
  trigger: string
  onBack: () => void
}

export function AskHubInterface({ sessionId, trigger, onBack }: AskHubInterfaceProps) {
  const [hasStarted, setHasStarted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showProgrammesDropdown, setShowProgrammesDropdown] = useState(false)

  // Scroll functions for navigation
  const scrollToComputeAccelerator = () => {
    window.location.href = "/#compute-accelerator-section"
  }

  const scrollToInfrastructureBuilder = () => {
    window.location.href = "/#infrastructure-builder-section"
  }

  const goToAskHub = () => {
    onBack() // Use the existing onBack function
  }

  // Add click outside handler to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest(".programmes-dropdown")) {
        setShowProgrammesDropdown(false)
      }
    }

    if (showProgrammesDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showProgrammesDropdown])

  const getTriggerConfig = (triggerId: string) => {
    switch (triggerId) {
      case "fit-finder":
        return {
          title: "Let's Find Your Perfect Fit!",
          subtitle: "I'm here to help you discover where you belong in the African AI ecosystem",
          icon: <Target className="w-6 h-6" />,
          message:
            "Let's find the right resources and opportunities for you! I'm here to help you discover the best tools, training, and programmes to improve your AI skills and capabilities.",
        }
      case "resource-explorer":
        return {
          title: "Resource Discovery Time!",
          subtitle: "Let me curate the perfect resources and opportunities for your stage",
          icon: <Sparkles className="w-6 h-6" />,
          message:
            "Welcome, explorer! I love helping innovators like you discover the perfect resources. Let's dive in and find exactly what you need to accelerate your AI journey!",
        }
      case "accelerator-apply":
        return {
          title: "Ready to Accelerate?",
          subtitle: "Let's see which UNDP programme will supercharge your AI solution",
          icon: <Rocket className="w-6 h-6" />,
          message:
            "This is so exciting! You're ready to take your AI solution to the next level. Let me help you choose between our Compute Accelerator and Infrastructure Builder programmes!",
        }
      default:
        return {
          title: "Welcome to Your AI Journey!",
          subtitle: "I'm your personal AskHub Assistant, here to guide you every step of the way",
          icon: <Heart className="w-6 h-6" />,
          message:
            "Hello there! I'm thrilled to be your AskHub Assistant today. Together, we'll discover the perfect pathway for your innovation journey!",
        }
    }
  }

  const config = getTriggerConfig(trigger)

  if (hasStarted) {
    return <ConversationFlow sessionId={sessionId} trigger={trigger} onBack={onBack} />
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left - AI Hub Logo */}
            <div className="flex items-center">
              <img
                src="/images/ai-hub-logo-updated.png"
                alt="AI Hub for Sustainable Development"
                className="h-12 w-auto"
              />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-[#0071BC] p-2"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
              <button
                onClick={() => window.open("https://www.aihubfordevelopment.org/", "_blank")}
                className="text-gray-700 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium transition-all"
              >
                Official Launch
              </button>
              <div className="relative programmes-dropdown">
                <button
                  className="text-gray-700 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium flex items-center gap-1 transition-all"
                  onClick={() => setShowProgrammesDropdown(!showProgrammesDropdown)}
                >
                  Programmes
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${showProgrammesDropdown ? "rotate-180" : ""}`}
                  />
                </button>
                {showProgrammesDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[400px]">
                    <div className="py-2">
                      <button
                        onClick={scrollToComputeAccelerator}
                        className="block w-full text-left px-4 py-3 hover:bg-gray-50 hover:font-bold font-montserrat text-gray-700 border-b border-gray-100 transition-all"
                      >
                        2025 Compute Accelerator Programme
                      </button>
                      <button
                        onClick={scrollToInfrastructureBuilder}
                        className="block w-full text-left px-4 py-3 hover:bg-gray-50 hover:font-bold font-montserrat text-gray-700 border-b border-gray-100 transition-all"
                      >
                        2025 AI Infrastructure Builder Programme
                      </button>
                      <a
                        href="https://www.aihubfordevelopment.org/green-compute-coalition"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-left px-4 py-3 hover:bg-gray-50 hover:font-bold font-montserrat text-gray-700 border-b border-gray-100 transition-all"
                      >
                        Africa Green Compute Coalition
                      </a>
                      <a
                        href="https://www.aihubfordevelopment.org/startup-accelerator-pilot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-left px-4 py-3 hover:bg-gray-50 hover:font-bold font-montserrat text-gray-700 border-b border-gray-100 transition-all"
                      >
                        2024 Startup Accelerator Pilot
                      </a>
                      <a
                        href="https://www.aihubfordevelopment.org/local-language-partnerships-accelerator-pilot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-left px-4 py-3 hover:bg-gray-50 hover:font-bold font-montserrat text-gray-700 transition-all"
                      >
                        2024 Local Language Partnerships Accelerator Pilot
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <a
                href="https://www.aihubfordevelopment.org/partnerships-for-ai-innovation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium transition-all"
              >
                Partnerships
              </a>
              <a
                href="https://www.aihubfordevelopment.org/highlights"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium transition-all"
              >
                Highlights
              </a>
              <button
                onClick={goToAskHub}
                className="text-gray-700 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium transition-all"
              >
                AskHub
              </button>
            </div>

            {/* Right - Empty space for balance */}
            <div className="hidden md:block w-24"></div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
          <div className="flex flex-col space-y-4 pt-4">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false)
                window.open("https://www.aihubfordevelopment.org/", "_blank")
              }}
              className="text-gray-700 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium text-left transition-all"
            >
              Official Launch
            </button>
            <button
              className="text-gray-700 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium text-left flex items-center justify-between w-full transition-all"
              onClick={() => setShowProgrammesDropdown(!showProgrammesDropdown)}
            >
              Programmes
              <ChevronDown className={`w-4 h-4 transition-transform ${showProgrammesDropdown ? "rotate-180" : ""}`} />
            </button>
            {showProgrammesDropdown && (
              <div className="ml-4 mt-2 space-y-2">
                <button
                  onClick={scrollToComputeAccelerator}
                  className="block text-gray-600 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium text-left text-sm py-1 transition-all"
                >
                  2025 Compute Accelerator Programme
                </button>
                <button
                  onClick={scrollToInfrastructureBuilder}
                  className="block text-gray-600 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium text-left text-sm py-1 transition-all"
                >
                  2025 AI Infrastructure Builder Programme
                </button>
                <a
                  href="https://www.aihubfordevelopment.org/green-compute-coalition"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-600 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium text-left text-sm py-1 transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Africa Green Compute Coalition
                </a>
                <a
                  href="https://www.aihubfordevelopment.org/startup-accelerator-pilot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-600 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium text-left text-sm py-1 transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  2024 Startup Accelerator Pilot
                </a>
                <a
                  href="https://www.aihubfordevelopment.org/local-language-partnerships-accelerator-pilot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-600 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium text-left text-sm py-1 transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  2024 Local Language Partnerships Accelerator Pilot
                </a>
              </div>
            )}
            <a
              href="https://www.aihubfordevelopment.org/partnerships-for-ai-innovation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium text-left transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Partnerships
            </a>
            <a
              href="https://www.aihubfordevelopment.org/highlights"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium text-left transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Highlights
            </a>
            <button
              onClick={goToAskHub}
              className="text-gray-700 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium text-left transition-all"
            >
              AskHub
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 py-8 pb-16 font-montserrat">
        {/* Back to homepage link */}
        <div className="mb-6">
          <Button variant="outline" onClick={onBack} className="font-montserrat font-bold rounded-lg bg-transparent">
            Back to homepage
          </Button>
        </div>

        {/* AskHub Introduction */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg p-8">
            {/* AskHub Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                <img src="/images/chat-coach-icon.png" alt="AI Assistant" className="w-12 h-12" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">{/* Icon only, no text label */}</div>
              </div>
            </div>

            {/* Assistant Message */}
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed font-montserrat mb-4">{config.message}</p>
            </div>

            {/* What to Expect */}
            <div className="mb-8">
              <h3 className="font-montserrat font-bold text-black mb-4">What to expect:</h3>
              <ol className="space-y-2 text-gray-700 font-montserrat">
                <li>1. A few quick questions (takes 5-8 minutes)</li>
                <li>2. Personalized recommendations</li>
                <li>3. Clear next steps to move forward</li>
              </ol>
            </div>

            {/* Start Button - Aligned Left */}
            <div className="flex justify-start">
              <Button
                onClick={() => setHasStarted(true)}
                className="bg-[#0071BC] hover:bg-[#005A94] text-white font-montserrat font-bold rounded-lg px-6"
              >
                Let's start!
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Beta Note - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-200 px-4 py-2 z-40">
        <div className="container mx-auto">
          <p className="text-xs text-gray-600 font-montserrat text-center">
            <strong>BETA:</strong> This is a beta version of AskHub. We welcome your feedback to help us improve. Please
            send any comments or suggestions to{" "}
            <a href="mailto:aihubfordevelopment@undp.org" className="text-[#0071BC] hover:underline">
              aihubfordevelopment@undp.org
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
