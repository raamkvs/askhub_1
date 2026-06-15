"use client"

import { Lightbulb } from "lucide-react"
import { HelpOptionContent } from "@/components/help-option-content"

export const HELP_OPTIONS = [
  "Hire talent",
  "Learn AI skills",
  "Get compute resources",
  "Cloud data storage",
  "Connect with experts",
  "Source quality data",
  "I need investment",
  "Scale your startup",
  "Something else",
] as const

interface HelpOptionsSectionProps {
  selectedHelpOption: string | null
  onSelectHelpOption: (option: string | null) => void
}

export function HelpOptionsSection({ selectedHelpOption, onSelectHelpOption }: HelpOptionsSectionProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
      <div className="border-b border-[#0071BC] bg-[#D9F1FF] p-4">
        <h2 className="flex items-center gap-2 font-montserrat text-xl font-bold text-black">
          <Lightbulb className="h-5 w-5 text-[#0071BC]" />
          What do you need help with?
        </h2>
      </div>
      <div className="p-6">
        <p className="mb-6 font-montserrat leading-relaxed text-[#6C6F75]">
          Select what you need help with to see curated resources:
        </p>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {HELP_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onSelectHelpOption(selectedHelpOption === option ? null : option)}
              className={`rounded-lg border p-4 text-left font-montserrat transition-colors ${
                selectedHelpOption === option
                  ? "border-[#0071BC] bg-[#D9F1FF]"
                  : "border-gray-300 hover:border-[#0071BC] hover:bg-blue-50"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {selectedHelpOption ? (
          <div className="max-h-96 overflow-y-auto rounded-lg border border-gray-300 bg-gray-50 p-6">
            <h3 className="mb-4 font-montserrat text-xl font-semibold text-[#0071BC]">{selectedHelpOption}</h3>
            <HelpOptionContent option={selectedHelpOption} />
          </div>
        ) : null}
      </div>
    </div>
  )
}
