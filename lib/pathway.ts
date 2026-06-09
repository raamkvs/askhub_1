export interface IntakeResponse {
  questionId: string
  question: string
  answer: string
  answerText: string
}

export interface PathwayResult {
  type: "curious" | "builder" | "compute-ready" | "infrastructure" | "student" | "default"
  country: string | null
  role: string | null
  isFromAfrica: boolean
}

const AFRICAN_COUNTRIES = new Set([
  "Algeria",
  "Angola",
  "Benin",
  "Botswana",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cameroon",
  "Central African Republic",
  "Chad",
  "Comoros",
  "Congo",
  "Democratic Republic of the Congo",
  "Djibouti",
  "Egypt",
  "Equatorial Guinea",
  "Eritrea",
  "Eswatini",
  "Ethiopia",
  "Gabon",
  "Gambia",
  "Ghana",
  "Guinea",
  "Guinea-Bissau",
  "Ivory Coast",
  "Kenya",
  "Lesotho",
  "Liberia",
  "Libya",
  "Madagascar",
  "Malawi",
  "Mali",
  "Mauritania",
  "Mauritius",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Niger",
  "Nigeria",
  "Rwanda",
  "Sao Tome and Principe",
  "Senegal",
  "Seychelles",
  "Sierra Leone",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Sudan",
  "Tanzania",
  "Togo",
  "Tunisia",
  "Uganda",
  "Zambia",
  "Zimbabwe",
])

export function derivePathway(responses: IntakeResponse[]): PathwayResult {
  const country = responses.find((r) => r.questionId === "country")?.answer ?? null
  const role = responses.find((r) => r.questionId === "role")?.answer ?? null
  const aiExperience = responses.find((r) => r.questionId === "ai-experience")?.answer
  const computeExperience = responses.find((r) => r.questionId === "compute-experience")?.answer
  const teamSize = responses.find((r) => r.questionId === "team-size")?.answer
  const isFromAfrica = Boolean(country && AFRICAN_COUNTRIES.has(country))

  if (role === "student") {
    return { type: "student", country, role, isFromAfrica }
  }

  if (isFromAfrica && role === "infrastructure") {
    return { type: "infrastructure", country, role, isFromAfrica }
  }

  if (
    isFromAfrica &&
    computeExperience &&
    ["ready", "advanced"].includes(computeExperience) &&
    teamSize &&
    ["small", "medium", "large"].includes(teamSize)
  ) {
    return { type: "compute-ready", country, role, isFromAfrica }
  }

  if (aiExperience && ["none", "getting-started", "not-sure"].includes(aiExperience)) {
    return { type: "curious", country, role, isFromAfrica }
  }

  if (
    isFromAfrica &&
    computeExperience &&
    ["good", "expert"].includes(computeExperience) &&
    teamSize &&
    ["small", "medium", "large"].includes(teamSize)
  ) {
    return { type: "builder", country, role, isFromAfrica }
  }

  return { type: "default", country, role, isFromAfrica }
}
