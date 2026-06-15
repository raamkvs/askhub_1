"use client"

import { useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { AuthNavActions } from "@/components/auth-nav-actions"

interface ResultsPageHeaderProps {
  onBack: () => void
  showProgrammesDropdown: boolean
  onToggleProgrammesDropdown: () => void
  onCloseProgrammesDropdown: () => void
}

export function ResultsPageHeader({
  onBack,
  showProgrammesDropdown,
  onToggleProgrammesDropdown,
  onCloseProgrammesDropdown,
}: ResultsPageHeaderProps) {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        showProgrammesDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onCloseProgrammesDropdown()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showProgrammesDropdown, onCloseProgrammesDropdown])

  const scrollToComputeAccelerator = () => {
    window.location.href = "/#compute-accelerator-section"
  }

  const scrollToInfrastructureBuilder = () => {
    window.location.href = "/#infrastructure-builder-section"
  }

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="/images/ai-hub-logo-updated.png"
              alt="AI Hub for Sustainable Development"
              className="h-12 w-auto"
            />
          </div>

          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            <button
              type="button"
              onClick={() => window.open("https://www.aihubfordevelopment.org/", "_blank")}
              className="font-montserrat font-medium text-gray-700 transition-all hover:font-bold hover:text-[#0071BC]"
            >
              Official Launch
            </button>
            <div className="programmes-dropdown relative" ref={dropdownRef}>
              <button
                type="button"
                className="flex items-center gap-1 font-montserrat font-medium text-gray-700 transition-all hover:font-bold hover:text-[#0071BC]"
                onClick={onToggleProgrammesDropdown}
              >
                Programmes
                <ChevronDown className={`h-4 w-4 transition-transform ${showProgrammesDropdown ? "rotate-180" : ""}`} />
              </button>
              {showProgrammesDropdown ? (
                <div className="absolute left-0 top-full z-50 mt-1 min-w-[400px] rounded-md border border-gray-200 bg-white shadow-lg">
                  <div className="py-2">
                    <button
                      type="button"
                      onClick={scrollToComputeAccelerator}
                      className="block w-full border-b border-gray-100 px-4 py-3 text-left font-montserrat text-gray-700 transition-all hover:bg-gray-50 hover:font-bold"
                    >
                      2025 Compute Accelerator Programme
                    </button>
                    <button
                      type="button"
                      onClick={scrollToInfrastructureBuilder}
                      className="block w-full border-b border-gray-100 px-4 py-3 text-left font-montserrat text-gray-700 transition-all hover:bg-gray-50 hover:font-bold"
                    >
                      2025 AI Infrastructure Builder Programme
                    </button>
                    <a
                      href="https://www.aihubfordevelopment.org/green-compute-coalition"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full border-b border-gray-100 px-4 py-3 text-left font-montserrat text-gray-700 transition-all hover:bg-gray-50 hover:font-bold"
                    >
                      Africa Green Compute Coalition
                    </a>
                    <a
                      href="https://www.aihubfordevelopment.org/startup-accelerator-pilot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full border-b border-gray-100 px-4 py-3 text-left font-montserrat text-gray-700 transition-all hover:bg-gray-50 hover:font-bold"
                    >
                      2024 Startup Accelerator Pilot
                    </a>
                    <a
                      href="https://www.aihubfordevelopment.org/local-language-partnerships-accelerator-pilot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full px-4 py-3 text-left font-montserrat text-gray-700 transition-all hover:bg-gray-50 hover:font-bold"
                    >
                      2024 Local Language Partnerships Accelerator Pilot
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
            <a
              href="https://www.aihubfordevelopment.org/partnerships-for-ai-innovation"
              target="_blank"
              rel="noopener noreferrer"
              className="font-montserrat font-medium text-gray-700 transition-all hover:font-bold hover:text-[#0071BC]"
            >
              Partnerships
            </a>
            <a
              href="https://www.aihubfordevelopment.org/highlights"
              target="_blank"
              rel="noopener noreferrer"
              className="font-montserrat font-medium text-gray-700 transition-all hover:font-bold hover:text-[#0071BC]"
            >
              Highlights
            </a>
            <button
              type="button"
              onClick={onBack}
              className="font-montserrat font-medium text-gray-700 transition-all hover:font-bold hover:text-[#0071BC]"
            >
              AskHub
            </button>
          </div>

          <div className="flex items-center gap-6">
            <AuthNavActions />
          </div>
        </div>

        <div className="md:hidden">
          <div className="flex flex-col items-start space-y-4 py-4">
            <button
              type="button"
              onClick={() => window.open("https://www.aihubfordevelopment.org/", "_blank")}
              className="font-montserrat font-medium text-gray-700 transition-all hover:font-bold hover:text-[#0071BC]"
            >
              Official Launch
            </button>
            <div className="relative w-full">
              <button
                type="button"
                className="flex w-full items-center justify-between font-montserrat font-medium text-gray-700 transition-all hover:font-bold hover:text-[#0071BC]"
                onClick={onToggleProgrammesDropdown}
              >
                Programmes
                <ChevronDown className={`h-4 w-4 transition-transform ${showProgrammesDropdown ? "rotate-180" : ""}`} />
              </button>
              {showProgrammesDropdown ? (
                <div className="z-50 mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <button
                      type="button"
                      onClick={scrollToComputeAccelerator}
                      className="block w-full px-4 py-2 text-left font-montserrat text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      2025 Compute Accelerator Programme
                    </button>
                    <button
                      type="button"
                      onClick={scrollToInfrastructureBuilder}
                      className="block w-full px-4 py-2 text-left font-montserrat text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      2025 AI Infrastructure Builder Programme
                    </button>
                    <a
                      href="https://www.aihubfordevelopment.org/green-compute-coalition"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 font-montserrat text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Africa Green Compute Coalition
                    </a>
                    <a
                      href="https://www.aihubfordevelopment.org/startup-accelerator-pilot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 font-montserrat text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      2024 Startup Accelerator Pilot
                    </a>
                    <a
                      href="https://www.aihubfordevelopment.org/local-language-partnerships-accelerator-pilot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 font-montserrat text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      2024 Local Language Partnerships Accelerator Pilot
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
            <a
              href="https://www.aihubfordevelopment.org/partnerships-for-ai-innovation"
              target="_blank"
              rel="noopener noreferrer"
              className="font-montserrat font-medium text-gray-700 transition-all hover:font-bold hover:text-[#0071BC]"
            >
              Partnerships
            </a>
            <a
              href="https://www.aihubfordevelopment.org/highlights"
              target="_blank"
              rel="noopener noreferrer"
              className="font-montserrat font-medium text-gray-700 transition-all hover:font-bold hover:text-[#0071BC]"
            >
              Highlights
            </a>
            <button
              type="button"
              onClick={onBack}
              className="font-montserrat font-medium text-gray-700 transition-all hover:font-bold hover:text-[#0071BC]"
            >
              AskHub
            </button>
            <AuthNavActions layout="mobile" />
          </div>
        </div>
      </div>
    </header>
  )
}
