"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { X, MapPin } from "lucide-react"

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
}

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
]

export function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [email, setEmail] = useState("")
  const [country, setCountry] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !country || !agreed) return

    setIsSubmitting(true)

    try {
      // Create a session ID for the signup
      const sessionId = `signup_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      // Format the data to match the expected structure
      const responses = [
        {
          questionId: "country",
          answerText: country,
        },
      ]

      const response = await fetch("/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          responses,
          sessionId,
          email, // Add email to the payload
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        throw new Error("Failed to save signup data")
      }
    } catch (error) {
      console.error("Signup error:", error)
      // You might want to show an error message to the user here
      alert("There was an error signing up. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <>
            <h2 className="text-xl font-montserrat font-bold text-black mb-2">Sign-up for AskHub</h2>
            <p className="text-gray-600 font-montserrat text-sm mb-6">
              Enter your email and country and I will send you a sign-up email once AskHub launches.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">E-mail</label>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full font-montserrat"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">Country</label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <SelectValue placeholder="Select Country" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((countryOption) => (
                      <SelectItem key={countryOption} value={countryOption}>
                        {countryOption}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="agreement"
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                  className="mt-0.5"
                />
                <label htmlFor="agreement" className="text-sm font-montserrat text-gray-700 leading-relaxed">
                  By checking this box, I agree to have a profile created for me in AskHub and agree to be added to the
                  mailing list for AskHub for upcoming launch and programme updates.
                </label>
              </div>

              <Button
                type="submit"
                disabled={!email || !country || !agreed || isSubmitting}
                className="w-full bg-[#0071BC] hover:bg-[#005A94] text-white font-montserrat font-bold py-3 rounded-lg"
              >
                {isSubmitting ? "Joining..." : "Join Waitlist"}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-montserrat font-bold text-black mb-4">Thank you for joining!</h2>
            <p className="text-gray-600 font-montserrat mb-6">
              We'll send you an email when the AI Coaching Platform is ready.
            </p>
            <Button
              onClick={onClose}
              className="bg-[#0071BC] hover:bg-[#005A94] text-white font-montserrat font-bold rounded-lg"
            >
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
