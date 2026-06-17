import { getResponseValue, type IntakeResponse } from "@/lib/intake/responses"

const SECTOR_KEYWORDS: Record<string, string[]> = {
  Health: ["health", "medical", "clinical", "hospital", "patient", "diagnos"],
  Agriculture: ["agriculture", "farming", "crop", "livestock", "food security"],
  Education: ["education", "school", "university", "learning", "student"],
  Climate: ["climate", "environment", "carbon", "sustainability", "energy"],
  Finance: ["finance", "fintech", "banking", "payments", "insurance"],
}

const AI_JOURNEY_TAGS: Record<string, string> = {
  building: "Building",
  working: "Scaling",
  idea: "Ideation",
  learning: "Learning",
  new: "Exploring",
}

const ROLE_TAGS: Record<string, string> = {
  entrepreneur: "Startup",
  student: "Student",
  infrastructure: "Infrastructure",
  engineer: "Engineering",
  "data-scientist": "Data science",
}

export function formatNameFromEmail(email: string | undefined): string {
  if (!email) return "Your profile"

  const local = email.split("@")[0] ?? email
  return local
    .replace(/[._+-]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ")
}

export function getDisplayName(responses: IntakeResponse[], email?: string): string {
  const fullName = getResponseValue(responses, "full-name")
  if (fullName) return fullName
  return formatNameFromEmail(email)
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "AH"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase()
}

export function getOrganizationLabel(responses: IntakeResponse[]): string | undefined {
  const buildGoal = getResponseValue(responses, "build-goal")
  if (!buildGoal) return undefined

  const firstLine = buildGoal.split("\n")[0]?.trim()
  if (!firstLine) return undefined

  if (firstLine.length <= 60) return firstLine
  return `${firstLine.slice(0, 57)}...`
}

function detectSectorTag(buildGoal: string | undefined): string | undefined {
  if (!buildGoal) return undefined

  const normalized = buildGoal.toLowerCase()
  for (const [label, keywords] of Object.entries(SECTOR_KEYWORDS)) {
    if (keywords.some((keyword) => normalized.includes(keyword))) {
      return label
    }
  }

  return undefined
}

export function getProfileTags(responses: IntakeResponse[]): string[] {
  const tags: string[] = []
  const aiJourney = getResponseValue(responses, "ai-journey")
  const role = getResponseValue(responses, "role")
  const buildGoal = getResponseValue(responses, "build-goal")

  if (aiJourney && AI_JOURNEY_TAGS[aiJourney]) {
    tags.push(AI_JOURNEY_TAGS[aiJourney])
  }

  const sectorTag = detectSectorTag(buildGoal)
  if (sectorTag) tags.push(sectorTag)

  if (role && ROLE_TAGS[role] && !tags.includes(ROLE_TAGS[role])) {
    tags.push(ROLE_TAGS[role])
  }

  return tags.slice(0, 3)
}

export function getProfileSubtitle(responses: IntakeResponse[]): string {
  const organization = getOrganizationLabel(responses)
  const country = getResponseValue(responses, "country")

  if (organization && country) return `${organization} · ${country}`
  if (organization) return organization
  if (country) return country
  return "AskHub member"
}
