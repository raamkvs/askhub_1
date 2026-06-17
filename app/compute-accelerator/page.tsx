"use client"

import { useState, useRef, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { SignupModal } from "@/components/signup-modal"

export default function ComputeAcceleratorPage() {
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showProgrammesDropdown, setShowProgrammesDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Scroll functions for navigation
  const scrollToComputeAccelerator = () => {
    // Navigate to home page and scroll to section
    window.location.href = "/#compute-accelerator-section"
  }

  const scrollToInfrastructureBuilder = () => {
    // Navigate to home page and scroll to section
    window.location.href = "/#infrastructure-builder-section"
  }

  const goToAskHub = () => {
    // Navigate to home page
    window.location.href = "/"
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProgrammesDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownRef])

  return (
    <div className="min-h-screen bg-white font-montserrat">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left - AI Hub Logo */}
            <div className="flex items-center">
              <a href="/">
                <img
                  src="/images/ai-hub-logo-updated.png"
                  alt="AI Hub for Sustainable Development"
                  className="h-12 w-auto cursor-pointer"
                />
              </a>
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
                Official Launch
              </button>
              <div className="relative programmes-dropdown" ref={dropdownRef}>
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

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4 pt-4">
                <button
                  onClick={() => window.open("https://www.aihubfordevelopment.org/", "_blank")}
                  className="text-gray-700 hover:text-[#0071BC] font-montserrat font-medium text-left"
                >
                  Official Launch
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowProgrammesDropdown(!showProgrammesDropdown)}
                    className="text-gray-700 hover:text-[#0071BC] font-montserrat font-medium text-left flex items-center justify-between w-full"
                  >
                    Programmes
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${showProgrammesDropdown ? "rotate-180" : ""}`}
                    />
                  </button>
                  {showProgrammesDropdown && (
                    <div className="absolute left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 w-full">
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
                  className="text-gray-700 hover:text-[#0071BC] font-montserrat font-medium text-left"
                >
                  Partnerships
                </a>
                <a
                  href="https://www.aihubfordevelopment.org/highlights"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-[#0071BC] font-montserrat font-medium text-left"
                >
                  Highlights
                </a>
                <button
                  onClick={goToAskHub}
                  className="text-gray-700 hover:text-[#0071BC] font-montserrat font-medium text-left"
                >
                  AskHub
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Embedded Form */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe
              className="airtable-embed w-full"
              src="https://airtable.com/embed/app26ub3bQcKFpMme/pagPjYkozyWE8X2kT/form"
              frameBorder="0"
              width="100%"
              height="800"
              style={{ background: "transparent", border: "1px solid #ccc" }}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-[#0071BC] mt-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left Column - Logos and Partnership */}
            <div className="space-y-8">
              {/* AI Hub Logo - Centered */}
              <div className="flex justify-center">
                <img
                  src="/images/ai-hub-logo-footer-updated.png"
                  alt="AI Hub for Sustainable Development"
                  className="h-16 w-auto"
                />
              </div>

              {/* Partner Logos Section - Side by Side */}
              <div className="flex flex-col sm:flex-row items-start justify-center gap-16">
                {/* Implemented by */}
                <div className="flex flex-col space-y-4">
                  <p className="text-lg font-montserrat text-white">Implemented by:</p>
                  <img src="/images/undp-logo-footer-updated.svg" alt="UNDP" className="h-12 w-auto" />
                </div>

                {/* Powered by */}
                <div className="flex flex-col space-y-4">
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
            <div className="space-y-8">
              {/* Navigation Links */}
              <div className="flex flex-wrap gap-6">
                <a
                  href="/"
                  className="text-white hover:text-[#D9F1FF] font-montserrat font-medium uppercase tracking-wide"
                >
                  HOME
                </a>
                <button
                  onClick={() => window.open("https://www.aihubfordevelopment.org/", "_blank")}
                  className="text-white hover:text-[#D9F1FF] font-montserrat font-medium uppercase tracking-wide"
                >
                  OFFICIAL LAUNCH
                </button>
                <a
                  href="https://www.aihubfordevelopment.org/partnerships-for-ai-innovation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#D9F1FF] font-montserrat font-medium uppercase tracking-wide"
                >
                  PARTNERSHIPS
                </a>
                <a
                  href="https://www.aihubfordevelopment.org/highlights"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#D9F1FF] font-montserrat font-medium uppercase tracking-wide"
                >
                  HIGHLIGHTS
                </a>
                <button
                  onClick={goToAskHub}
                  className="text-white hover:text-[#D9F1FF] font-montserrat font-medium uppercase tracking-wide"
                >
                  ASKHUB
                </button>
              </div>

              {/* Email Contact */}
              <div>
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
