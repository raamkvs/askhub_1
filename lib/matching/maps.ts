import { getResponseValue, type IntakeResponse } from "@/lib/intake/responses"
import { COUNTRY_ALIASES, NOT_SURE_NEED, PRIORITY_18_SET } from "@/lib/matching/constants"
import type { InnovatorProfile } from "@/lib/matching/types"

const AI_JOURNEY_TO_STAGE: Record<string, string> = {
  new: "New to AI",
  learning: "Getting started",
  idea: "Getting started",
  building: "Building",
  working: "Scaling",
}

/** Help button labels → catalogue need values (secondary_need) */
export const HELP_TO_SECONDARY_NEED: Record<string, string> = {
  "Hire talent": "Partners",
  "Learn AI skills": "Training",
  "Get compute resources": "Compute",
  "Cloud data storage": "Compute",
  "Connect with experts": "Partners",
  "Source quality data": "Partners",
  "I need investment": "Funding",
  "Scale your startup": "Accelerator",
}

export function normalizeCountry(country: string | undefined): string | undefined {
  if (!country) return undefined
  return COUNTRY_ALIASES[country] ?? country
}

export function mapAiJourneyToStage(aiJourney: string | undefined): string | undefined {
  if (!aiJourney) return undefined
  return AI_JOURNEY_TO_STAGE[aiJourney]
}

export function mapHelpOptionToSecondaryNeed(helpOption: string | null | undefined): string | undefined {
  if (!helpOption) return undefined
  return HELP_TO_SECONDARY_NEED[helpOption]
}

const CATALOGUE_NEEDS = new Set(["Compute", "Training", "Funding", "Partners", "Accelerator"])

function resolveSecondaryNeed(secondaryNeedOverride?: string | null): string | undefined {
  if (!secondaryNeedOverride) return undefined
  if (CATALOGUE_NEEDS.has(secondaryNeedOverride)) {
    return secondaryNeedOverride
  }
  return mapHelpOptionToSecondaryNeed(secondaryNeedOverride)
}

export function buildInnovatorProfile(
  responses: IntakeResponse[],
  secondaryNeedOverride?: string | null,
): InnovatorProfile | null {
  const rawCountry = getResponseValue(responses, "country")
  const country = normalizeCountry(rawCountry)
  let stage = mapAiJourneyToStage(getResponseValue(responses, "ai-journey"))
  let primaryNeed = getResponseValue(responses, "primary-need")

  if (!stage && getResponseValue(responses, "role") === "infrastructure") {
    stage = "Building"
  }

  if (!primaryNeed) {
    primaryNeed = NOT_SURE_NEED
  }

  if (!country || !stage) {
    return null
  }

  const secondaryFromHelp = resolveSecondaryNeed(secondaryNeedOverride)

  return {
    country,
    isPriorityCountry: PRIORITY_18_SET.has(country),
    stage,
    primaryNeed,
    secondaryNeed: secondaryFromHelp,
  }
}

export function isNotSureNeed(need: string): boolean {
  return need.trim().toLowerCase() === NOT_SURE_NEED.toLowerCase()
}
