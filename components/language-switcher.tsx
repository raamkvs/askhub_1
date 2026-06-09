"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState("EN")
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: "EN", name: "English" },
    { code: "FR", name: "Français" },
  ]

  const handleLanguageChange = (langCode: string) => {
    setCurrentLanguage(langCode)
    setIsOpen(false)
    // Here you would implement actual language switching logic
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 border-gray-300 hover:border-[#0071BC] font-montserrat"
      >
        {currentLanguage}
        <ChevronDown className="w-4 h-4" />
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[120px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-4 py-2 hover:bg-[#D9F1FF] font-montserrat ${
                currentLanguage === lang.code ? "bg-[#D9F1FF] text-[#0071BC]" : "text-gray-700"
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
