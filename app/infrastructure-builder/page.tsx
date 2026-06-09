"use client"

import { useState, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { TitleSetter } from "@/components/title-setter"

export default function InfrastructureBuilderPage() {
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
    window.location.href = "/"
  }

  const handleBackToHome = () => {
    window.location.href = "/"
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

  return (
    <>
      <TitleSetter title="Infrastructure Builder Programme Application - AskHub" />
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
                  onClick={handleBackToHome}
                  className="text-gray-700 hover:text-[#0071BC] font-montserrat font-medium"
                >
                  Home
                </button>

                {/* Programmes Dropdown */}
                <div className="relative programmes-dropdown">
                  <button
                    onClick={() => setShowProgrammesDropdown(!showProgrammesDropdown)}
                    className="text-gray-700 hover:text-[#0071BC] font-montserrat font-medium flex items-center gap-1"
                  >
                    Programmes
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${showProgrammesDropdown ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown Content */}
                  {showProgrammesDropdown && (
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                      <button
                        onClick={() => {
                          setShowProgrammesDropdown(false)
                          scrollToComputeAccelerator()
                        }}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 font-montserrat font-medium text-left w-full"
                      >
                        Compute Accelerator
                      </button>
                      <button
                        onClick={() => {
                          setShowProgrammesDropdown(false)
                          scrollToInfrastructureBuilder()
                        }}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 font-montserrat font-medium text-left w-full"
                      >
                        Infrastructure Builder
                      </button>
                    </div>
                  )}
                </div>

                <button onClick={goToAskHub} className="text-gray-700 hover:text-[#0071BC] font-montserrat font-medium">
                  AskHub
                </button>
                <button
                  onClick={() => window.open("https://www.aihubfordevelopment.org/", "_blank")}
                  className="text-gray-700 hover:text-[#0071BC] font-montserrat font-medium"
                >
                  Official Launch
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
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      handleBackToHome()
                    }}
                    className="text-gray-700 hover:text-[#0071BC] font-montserrat font-medium text-left"
                  >
                    Home
                  </button>

                  {/* Mobile Programmes Dropdown */}
                  <div className="ml-4">
                    <button
                      onClick={() => setShowProgrammesDropdown(!showProgrammesDropdown)}
                      className="text-gray-700 hover:text-[#0071BC] font-montserrat font-medium text-left w-full flex items-center justify-between"
                    >
                      Programmes
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${showProgrammesDropdown ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Mobile Dropdown Content */}
                    {showProgrammesDropdown && (
                      <div className="flex flex-col space-y-2 mt-2">
                        <button
                          onClick={() => {
                            setIsMobileMenuOpen(false)
                            setShowProgrammesDropdown(false)
                            scrollToComputeAccelerator()
                          }}
                          className="text-gray-700 hover:text-[#0071BC] font-montserrat font-medium text-left"
                        >
                          Compute Accelerator
                        </button>
                        <button
                          onClick={() => {
                            setIsMobileMenuOpen(false)
                            setShowProgrammesDropdown(false)
                            scrollToInfrastructureBuilder()
                          }}
                          className="text-gray-700 hover:text-[#0071BC] font-montserrat font-medium text-left"
                        >
                          Infrastructure Builder
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      goToAskHub()
                    }}
                    className="text-gray-700 hover:text-[#0071BC] font-montserrat font-medium text-left"
                  >
                    AskHub
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      window.open("https://www.aihubfordevelopment.org/", "_blank")
                    }}
                    className="text-gray-700 hover:text-[#0071BC] font-montserrat font-medium text-left"
                  >
                    Official Launch
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="py-8">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {/* Page Header */}

              {/* Embedded Form */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <iframe
                  className="airtable-embed w-full"
                  src="https://airtable.com/embed/apppzwY8O8BXZfLBb/pag1uFboLcaFkgZVy/form"
                  frameBorder="0"
                  width="100%"
                  height="800"
                  style={{ background: "transparent", border: "1px solid #ccc" }}
                ></iframe>
              </div>
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
                  <button
                    onClick={handleBackToHome}
                    className="text-white hover:text-[#D9F1FF] font-montserrat font-medium uppercase tracking-wide"
                  >
                    HOME
                  </button>

                  {/* Programmes Footer Link */}
                  <button
                    onClick={() => {
                      scrollToComputeAccelerator()
                    }}
                    className="text-white hover:text-[#D9F1FF] font-montserrat font-medium uppercase tracking-wide"
                  >
                    PROGRAMMES
                  </button>

                  <button
                    onClick={goToAskHub}
                    className="text-white hover:text-[#D9F1FF] font-montserrat font-medium uppercase tracking-wide"
                  >
                    ASKHUB
                  </button>
                  <button
                    onClick={() => window.open("https://www.aihubfordevelopment.org/", "_blank")}
                    className="text-white hover:text-[#D9F1FF] font-montserrat font-medium uppercase tracking-wide"
                  >
                    {""}
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
      </div>
    </>
  )
}
