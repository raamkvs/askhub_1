"use client"

import { useState, useEffect } from "react"
import { CheckCircle, ArrowRight, Menu, X, ChevronDown } from "lucide-react"
import { SignupModal } from "@/components/signup-modal"

interface LandingPageProps {
  onLaunchCoach: (trigger: string) => void
}

export function LandingPage({ onLaunchCoach }: LandingPageProps) {
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showProgrammesDropdown, setShowProgrammesDropdown] = useState(false)

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

  // Scroll functions
  const scrollToComputeAccelerator = () => {
    const element = document.getElementById("compute-accelerator-section")
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setShowProgrammesDropdown(false)
    setIsMobileMenuOpen(false)
  }

  const scrollToInfrastructureBuilder = () => {
    const element = document.getElementById("infrastructure-builder-section")
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setShowProgrammesDropdown(false)
    setIsMobileMenuOpen(false)
  }

  const goToAskHub = () => {
    // Since we're already on the landing page, just scroll to top or launch coach
    window.scrollTo({ top: 0, behavior: "smooth" })
    setShowProgrammesDropdown(false)
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-white font-montserrat">
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
                className="text-gray-700 hover:text-[#0071BC] font-montserrat font-medium"
              >
                Home
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
                      <div className="block w-full text-left px-4 py-3 bg-gray-400 text-white font-montserrat font-bold rounded-lg text-center cursor-not-allowed">
                        2025 Compute Accelerator Programme
                      </div>
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

            {/* Right - Sign in */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="/auth/signin"
                className="rounded-lg border border-[#0071BC] px-4 py-2 text-sm font-montserrat font-bold text-[#0071BC] hover:bg-[#0071BC] hover:text-white transition-colors"
              >
                Sign in
              </a>
            </div>
          </div>

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
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${showProgrammesDropdown ? "rotate-180" : ""}`}
                  />
                </button>
                {showProgrammesDropdown && (
                  <div className="ml-4 mt-2 space-y-2">
                    <div className="block text-gray-600 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium text-left text-sm py-1 transition-all cursor-not-allowed">
                      2025 Compute Accelerator Programme
                    </div>
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
                <a
                  href="/auth/signin"
                  className="inline-block rounded-lg border border-[#0071BC] px-4 py-2 text-sm font-montserrat font-bold text-[#0071BC] hover:bg-[#0071BC] hover:text-white transition-colors text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign in
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - AI Coach Branding */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <img src="/images/chat-coach-icon.png" alt="AI Coach" className="w-16 h-16" />
                <h1 className="text-5xl lg:text-6xl font-montserrat font-bold text-[#222D3D]">AskHub</h1>
              </div>
              <p className="text-xl text-gray-600 font-montserrat mb-8">Building Africa's AI future together</p>
            </div>

            {/* Right Column - Description and CTA */}
            <div>
              <p className="text-lg text-gray-700 font-montserrat mb-6 leading-relaxed">
                Whether you're just curious about AI or ready to scale your solution, our AskHub will guide you to the
                resources, partners, and our accelerator programmes tailored for African innovators.
              </p>
              <button
                onClick={() => onLaunchCoach("fit-finder")}
                className="bg-[#0071BC] hover:bg-[#005A94] text-white font-montserrat font-bold px-6 py-3 rounded-lg"
              >
                Try AskHub →
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-12">
            <img
              src="/images/hero-image-new.png"
              alt="African woman working on AI development"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* AI Coach Description Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="w-full">
            <h2 className="text-4xl font-montserrat font-bold text-black mb-8">
              AskHub: Building Africa's AI future together
            </h2>

            <div className="space-y-6 text-gray-700 font-montserrat leading-relaxed">
              <p>
                The{" "}
                <a
                  href="https://www.aihubfordevelopment.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[#0071BC] font-medium hover:text-[#005A94]"
                >
                  AI Hub for Sustainable Development
                </a>{" "}
                connects African innovators with the tools to build AI at scale, ranging from compute access and
                infrastructure programmes to expert mentorship and global partnerships.
              </p>

              <p>
                Whether you're just exploring AI or you are ready to scale and optimize a working AI tool, the AI Hub's
                dedicated AskHub is tailored to the needs of African innovators. It will guide you to resources, answers
                and latest AI programmes—from hackathons and software to elearnings and accelerators—to build AI in
                Africa.
              </p>

              <p>
                The AskHub is uniquely designed to support you with specific tools, mentorship and opportunities on your
                AI innovation journey.
              </p>

              <div className="pt-4">
                <button
                  onClick={() => setShowSignupModal(true)}
                  className="bg-[#0071BC] hover:bg-[#005A94] text-white font-montserrat font-bold px-6 py-2 rounded-lg flex items-center"
                >
                  SIGN UP FOR THE COACHING PLATFORM
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How does the AI Coach work */}
      <section className="py-16 bg-[#B8E3FF] rounded-3xl mx-6">
        <div className="container mx-auto px-6">
          <div className="w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Steps */}
              <div>
                <h2 className="text-4xl font-montserrat font-bold text-black mb-8">How does AskHub work?</h2>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#0071BC] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm font-montserrat">1</span>
                    </div>
                    <div>
                      <p className="text-gray-700 font-montserrat">
                        <span className="font-bold">Start chatting</span> – Launch the AskHub chat.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#0071BC] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm font-montserrat">2</span>
                    </div>
                    <div>
                      <p className="text-gray-700 font-montserrat">
                        <span className="font-bold">Answer prompts</span> – The chat will guide you with a few quick
                        questions.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#0071BC] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm font-montserrat">3</span>
                    </div>
                    <div>
                      <p className="text-gray-700 font-montserrat">
                        <span className="font-bold">Get results</span> – Receive personalized recommendations and
                        helpful links.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Chat Interface Mockups */}
              <div className="space-y-6">
                {/* First Chat Mockup */}
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                      <img src="/images/chat-coach-icon.png" alt="AI Assistant" className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">{/* Icon only, no text label */}</div>
                      <div className="bg-[#F0F9FF] rounded-lg p-3 mb-4">
                        <p className="text-sm text-gray-700 font-montserrat mb-3">
                          Hey there, future AI innovator! 👋 I'm excited to help you figure out where you fit in this
                          amazing journey. Let's explore what pathway will work best for you!
                        </p>
                        <div className="mb-3">
                          <p className="text-sm font-montserrat font-bold text-gray-800 mb-2">What to expect:</p>
                          <ul className="text-xs text-gray-600 font-montserrat space-y-1">
                            <li>• Quick question chat (5–8 min)</li>
                            <li>• Personalized pathway recommendation</li>
                            <li>• Curated resources and next steps</li>
                          </ul>
                        </div>
                        <p className="text-sm font-montserrat font-bold text-gray-800 mb-2">
                          Are you ready to start this journey together?
                        </p>
                        <div className="mt-4">
                          <button
                            onClick={() => onLaunchCoach("fit-finder")}
                            className="bg-[#0071BC] hover:bg-[#005A94] text-white font-montserrat font-bold px-8 py-3 rounded-lg"
                          >
                            Get Started
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AskHub Collaborators */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="w-full">
            <div className="mb-12">
              <h2 className="text-3xl font-montserrat font-bold text-black mb-6">AskHub Collaborators</h2>
            </div>

            {/* Updated Collaborators Image */}
            <div className="flex justify-center">
              <img
                src="/images/askhub-collaborators-updated.png"
                alt="AskHub Collaborators including Microsoft, Domyn, AWS, ZiND!, alx, CIRRUS, ALMAWAVE, funema, Open Startup International, ST, AfriLabs, SAAIA, timbuktoo, and seedstars"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* AI Hub Programmes */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="w-full">
            <div className="mb-12">
              <h2 className="text-3xl font-montserrat font-bold text-black mb-6">AI Hub Programmes</h2>
              <p className="text-gray-700 font-montserrat leading-relaxed">
                The AI Hub for Sustainable Development offers two flagship tracks that directly support African AI
                transformation. Whether you're developing scalable AI solutions or strengthening the infrastructure to
                power the AI ecosystem, these tracks are designed to accelerate opportunity. Explore below:
              </p>
            </div>

            <div className="space-y-8">
              {/* Applications Compute Accelerator Programme */}
              <div id="compute-accelerator-section" className="border-0 shadow-lg bg-white overflow-hidden rounded-lg">
                <div className="relative">
                  <img
                    src="/images/compute-accelerator.png"
                    alt="Compute Accelerator Programme"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-100 text-blue-800 text-xs font-montserrat font-bold px-3 py-1 rounded-full">
                      FOR SCALING SOLUTIONS
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl text-black font-montserrat font-bold mb-2">Compute Accelerator Programme</h3>
                  <p className="text-gray-600 font-montserrat text-sm leading-relaxed mb-4">
                    Built for ventures offering working AI products that need to scale, this six-month programme offers
                    cloud compute, technical mentorship, and curated partnerships to help African innovators grow across
                    borders.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 font-montserrat">
                        Advanced GPU and cloud compute access
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 font-montserrat">1:1 mentorship with AI experts</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 font-montserrat">
                        Talent acquisition and data readiness support
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 font-montserrat">Investor and partner connections</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-400 text-white font-montserrat font-bold py-3 rounded-lg text-center cursor-not-allowed">
                    Applications Are Now Closed
                  </div>
                </div>
              </div>

              {/* Infrastructure Builder Programme */}
              <div
                id="infrastructure-builder-section"
                className="border-0 shadow-lg bg-white overflow-hidden rounded-lg"
              >
                <div className="relative">
                  <img
                    src="/images/infrastructure-builder.png"
                    alt="Infrastructure Builder Programme"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-100 text-blue-800 text-xs font-montserrat font-bold px-3 py-1 rounded-full">
                      FOR INFRASTRUCTURE INNOVATORS
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl text-black font-montserrat font-bold mb-2">
                    Infrastructure Builder Programme
                  </h3>
                  <p className="text-gray-600 font-montserrat text-sm leading-relaxed mb-4">
                    Designed for Africa's AI infrastructure builders solving foundational challenges: connectivity,
                    energy and data centres. This programme supports multi-country scaling and long-term ecosystem
                    growth.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 font-montserrat">
                        Business planning and regulatory guidance
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 font-montserrat">
                        Government and DFI facilitation across 14 countries
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 font-montserrat">
                        Partnerships with leading tech and infrastructure firms
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 font-montserrat">
                        Investor engagement to unlock pilot financing
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <button
                      onClick={() => (window.location.href = "/infrastructure-builder")}
                      className="w-full bg-[#1976d2] hover:bg-[#1565c0] text-white font-montserrat font-bold py-3 rounded-lg"
                    >
                      African Innovators: Apply to the Infrastructure Builder Programme
                    </button>
                    <button
                      onClick={() => (window.location.href = "/private-sector-partner")}
                      className="w-full bg-[#1976d2] hover:bg-[#1565c0] text-white font-montserrat font-bold py-3 rounded-lg"
                    >
                      G7: Join the Infrastructure Partner Network
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sign up for the Coaching Platform */}
      <section className="py-16 bg-[#2c3e50]">
        <div className="container mx-auto px-6">
          <div className="w-full text-center">
            <h2 className="text-4xl font-montserrat font-bold text-white mb-6">Sign up for the Coaching Platform</h2>

            <p className="text-lg text-white mb-8 font-montserrat leading-relaxed max-w-3xl mx-auto">
              Be among the first to explore curated tools and free upskilling resources to develop your AI capabilities.
              Apply to flagship acceleration initiatives that will shape Africa's AI ecosystem. Want to get an alert
              when the AI Coach goes live? Sign up today.
            </p>

            <button
              onClick={() => setShowSignupModal(true)}
              className="bg-[#1976d2] hover:bg-[#1565c0] text-white font-montserrat font-bold px-8 py-3 rounded-lg"
            >
              SIGN UP HERE
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#0071BC]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Column - Logos and Partnership */}
            <div className="space-y-8 w-full lg:w-auto">
              {/* AI Hub Logo - Centered */}
              <div className="flex justify-center">
                <img
                  src="/images/ai-hub-logo-footer-updated.png"
                  alt="AI Hub for Sustainable Development"
                  className="h-16 w-auto"
                />
              </div>

              {/* Partner Logos Section - Centered on mobile, side by side on desktop */}
              <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:gap-16">
                {/* Implemented by */}
                <div className="flex flex-col items-center text-center space-y-4">
                  <p className="text-lg font-montserrat text-white">Implemented by:</p>
                  <img src="/images/undp-logo-footer-updated.svg" alt="UNDP" className="h-12 w-auto" />
                </div>

                {/* Powered by */}
                <div className="flex flex-col items-center text-center space-y-4">
                  <p className="text-lg font-montserrat text-white">Powered by:</p>
                  <img
                    src="/images/mimit-logo-footer-new.png"
                    alt="Ministry of Enterprises and Made in Italy"
                    className="h-12 w-auto"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Navigation and Contact */}
            <div className="space-y-8 w-full lg:w-auto">
              {/* Navigation Links - Centered on mobile, flex-wrap on desktop */}
              <div className="flex flex-col items-center gap-4 lg:flex-row lg:flex-wrap lg:gap-6 lg:items-start">
                <button
                  onClick={() => window.open("https://www.aihubfordevelopment.org/", "_blank")}
                  className="text-white hover:text-[#D9F1FF] hover:font-bold font-montserrat font-medium uppercase tracking-wide transition-all"
                >
                  Home
                </button>
                <a
                  href="https://www.aihubfordevelopment.org/partnerships-for-ai-innovation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#D9F1FF] hover:font-bold font-montserrat font-medium uppercase tracking-wide transition-all"
                >
                  PARTNERSHIPS
                </a>
                <a
                  href="https://www.aihubfordevelopment.org/highlights"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#D9F1FF] hover:font-bold font-montserrat font-medium uppercase tracking-wide transition-all"
                >
                  HIGHLIGHTS
                </a>
                <button
                  onClick={goToAskHub}
                  className="text-white hover:text-[#D9F1FF] hover:font-bold font-montserrat font-medium uppercase tracking-wide transition-all"
                >
                  ASKHUB
                </button>
              </div>

              {/* Email Contact - Centered on mobile */}
              <div className="text-center lg:text-left">
                <p className="text-white font-montserrat">
                  Email us at:{" "}
                  <a href="mailto:aihubfordevelopment@undp.org" className="hover:underline">
                    aihubfordevelopment@undp.org
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Divider Line */}
          <div className="border-t border-white/20 w-full mt-8 mb-6"></div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-white text-sm font-montserrat">
              © 2025 AI HUB FOR SUSTAINABLE DEVELOPMENT. All rights reserved
            </p>
          </div>
        </div>
      </footer>

      {/* Signup Modal */}
      <SignupModal isOpen={showSignupModal} onClose={() => setShowSignupModal(false)} />
    </div>
  )
}
