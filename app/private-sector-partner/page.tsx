"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import Link from "next/link"

export default function PrivateSectorPartnerPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showProgrammesDropdown, setShowProgrammesDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Scroll functions for navigation
  const scrollToComputeAccelerator = () => {
    window.location.href = "/#compute-accelerator-section"
  }

  const scrollToInfrastructureBuilder = () => {
    window.location.href = "/#infrastructure-builder-section"
  }

  const goToAskHub = () => {
    window.location.href = "/#askhub"
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
    <div className="min-h-screen bg-white" style={{ fontFamily: "Montserrat, sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left - AI Hub Logo */}
            <div className="flex items-center">
              <Link href="/">
                <img
                  src="/images/ai-hub-logo-updated.png"
                  alt="AI Hub for Sustainable Development"
                  className="h-12 w-auto"
                />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-[#0071BC] p-2"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
              <Link href="/" className="text-gray-700 hover:text-[#0071BC] font-montserrat font-medium">
                Home
              </Link>
              <div ref={dropdownRef} className="relative">
                <button
                  className="text-gray-700 hover:text-[#0071BC] font-montserrat font-medium flex items-center gap-1"
                  onClick={() => setShowProgrammesDropdown(!showProgrammesDropdown)}
                >
                  Programmes <ChevronDown className="w-4 h-4" />
                </button>
                {showProgrammesDropdown && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <a
                        href="/#compute-accelerator-section"
                        onClick={() => setShowProgrammesDropdown(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#0071BC]"
                        role="menuitem"
                      >
                        Compute Accelerator
                      </a>
                      <a
                        href="/#infrastructure-builder-section"
                        onClick={() => setShowProgrammesDropdown(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#0071BC]"
                        role="menuitem"
                      >
                        Infrastructure Builder
                      </a>
                    </div>
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
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4 pt-4">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-[#0071BC] font-montserrat font-medium text-left"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <div className="relative">
                  <button
                    className="text-gray-700 hover:text-[#0071BC] font-montserrat font-medium text-left flex items-center justify-between w-full"
                    onClick={() => setShowProgrammesDropdown(!showProgrammesDropdown)}
                  >
                    Programmes <ChevronDown className="w-4 h-4" />
                  </button>
                  {showProgrammesDropdown && (
                    <div className="ml-4 mt-2 flex flex-col space-y-2">
                      <a
                        href="/#compute-accelerator-section"
                        onClick={() => {
                          setMobileMenuOpen(false)
                          setShowProgrammesDropdown(false)
                        }}
                        className="text-gray-700 hover:text-[#0071BC] font-montserrat font-medium text-left"
                      >
                        Compute Accelerator
                      </a>
                      <a
                        href="/#infrastructure-builder-section"
                        onClick={() => {
                          setMobileMenuOpen(false)
                          setShowProgrammesDropdown(false)
                        }}
                        className="text-gray-700 hover:text-[#0071BC] font-montserrat font-medium text-left"
                      >
                        Infrastructure Builder
                      </a>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    goToAskHub()
                  }}
                  className="text-gray-700 hover:text-[#0071BC] font-montserrat font-medium text-left"
                >
                  AskHub
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
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
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm border">
            <iframe
              className="airtable-embed w-full rounded-lg"
              src="https://airtable.com/embed/appNjtVuDonwlhmvs/pagA4qFnfjlyOJADS/form"
              frameBorder="0"
              width="100%"
              height="800"
              style={{ background: "transparent", border: "1px solid #ccc" }}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-[#0071BC]">
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
                <Link
                  href="/"
                  className="text-white hover:text-[#D9F1FF] font-montserrat font-medium uppercase tracking-wide"
                >
                  HOME
                </Link>
                <a
                  href="/#compute-accelerator-section"
                  className="text-white hover:text-[#D9F1FF] font-montserrat font-medium uppercase tracking-wide"
                >
                  COMPUTE ACCELERATOR
                </a>
                <a
                  href="/#infrastructure-builder-section"
                  className="text-white hover:text-[#D9F1FF] font-montserrat font-medium uppercase tracking-wide"
                >
                  INFRASTRUCTURE BUILDER
                </a>
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
                  OFFICIAL LAUNCH
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
  )
}
