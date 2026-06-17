import { STARTER_NEED_TYPES, TIER_ORDER } from "@/lib/matching/constants"
import { isNotSureNeed } from "@/lib/matching/maps"
import type {
  InnovatorProfile,
  MatchableResource,
  MatchedResource,
  MatchScoreBreakdown,
} from "@/lib/matching/types"

function parseStagesEligible(raw: string | undefined): string[] {
  if (!raw) return []
  return raw
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean)
}

function needsMatch(a: string | undefined, b: string | undefined): boolean {
  if (!a || !b) return false
  return a.trim().toLowerCase() === b.trim().toLowerCase()
}

export function countryEligible(innovator: InnovatorProfile, resource: MatchableResource): boolean {
  const eligibility = resource.countriesEligible.trim()

  if (eligibility.toLowerCase() === "global") {
    return true
  }

  if (innovator.isPriorityCountry) {
    const allowed = ["global", "all africa", "18 priority"]
    return allowed.includes(eligibility.toLowerCase())
  }

  return false
}

export function stageEligible(innovator: InnovatorProfile, resource: MatchableResource): boolean {
  return resource.stagesEligible.some(
    (stage) => stage.toLowerCase() === innovator.stage.toLowerCase(),
  )
}

export function passesFilter(innovator: InnovatorProfile, resource: MatchableResource): boolean {
  if (resource.catalogueStatus.toLowerCase() !== "live") {
    return false
  }
  if (!stageEligible(innovator, resource)) {
    return false
  }
  if (!countryEligible(innovator, resource)) {
    return false
  }
  return true
}

export function calculateScore(
  innovator: InnovatorProfile,
  resource: MatchableResource,
): MatchScoreBreakdown {
  let stage = 0
  let needPrimary = 0
  let needSecondaryOnPrimary = 0
  let needPrimaryOnSecondary = 0
  let needSecondaryOnSecondary = 0
  let country = 0

  if (stageEligible(innovator, resource)) {
    stage = 50
  }

  if (needsMatch(resource.needPrimary, innovator.primaryNeed)) {
    needPrimary = 50
  }

  if (needsMatch(resource.needSecondary, innovator.primaryNeed)) {
    needSecondaryOnPrimary = 20
  }

  if (innovator.secondaryNeed) {
    if (needsMatch(resource.needPrimary, innovator.secondaryNeed)) {
      needPrimaryOnSecondary = 20
    }
    if (needsMatch(resource.needSecondary, innovator.secondaryNeed)) {
      needSecondaryOnSecondary = 20
    }
  }

  const eligibility = resource.countriesEligible.toLowerCase()
  if (eligibility === "18 priority" || eligibility === "all africa") {
    country = 30
  }

  const weight = resource.matchWeight
  const total =
    stage + needPrimary + needSecondaryOnPrimary + needPrimaryOnSecondary + needSecondaryOnSecondary + country + weight

  return {
    stage,
    needPrimary,
    needSecondaryOnPrimary,
    needPrimaryOnSecondary,
    needSecondaryOnSecondary,
    country,
    weight,
    total,
  }
}

function tierRank(tier: string): number {
  return TIER_ORDER[tier] ?? 99
}

export function tieBreak(a: MatchableResource, b: MatchableResource): number {
  const aPriority = a.countriesEligible.toLowerCase() === "18 priority" ? 0 : 1
  const bPriority = b.countriesEligible.toLowerCase() === "18 priority" ? 0 : 1
  if (aPriority !== bPriority) return aPriority - bPriority

  const aTier = tierRank(a.partnerTier)
  const bTier = tierRank(b.partnerTier)
  if (aTier !== bTier) return aTier - bTier

  return a.name.localeCompare(b.name)
}

export function buildReasonChips(
  innovator: InnovatorProfile,
  resource: MatchableResource,
  breakdown: MatchScoreBreakdown,
): string[] {
  const chips: string[] = []

  if (breakdown.stage > 0) {
    chips.push(`${innovator.stage} stage`)
  }
  if (breakdown.needPrimary > 0) {
    chips.push(innovator.primaryNeed)
  }
  if (breakdown.country > 0) {
    chips.push(innovator.country)
  }

  if (chips.length < 2 && resource.partnerTier) {
    chips.push(`${resource.partnerTier} partner`)
  }

  return chips.slice(0, 3)
}

function toMatchedResource(
  innovator: InnovatorProfile,
  resource: MatchableResource,
  breakdown: MatchScoreBreakdown,
): MatchedResource {
  return {
    id: resource.id,
    category: resource.resourceType,
    statusLabel: "AVAILABLE",
    title: resource.name,
    provider: resource.partner,
    region: resource.partnerTier || "Global",
    description: resource.description,
    primaryAction: { label: resource.actionLabel, href: resource.externalUrl },
    detailsHref: resource.externalUrl,
    tag: resource.languages,
    subCategory: resource.subCategory,
    matchScore: breakdown.total,
    reasonChips: buildReasonChips(innovator, resource, breakdown),
  }
}

function rankEligible(
  innovator: InnovatorProfile,
  eligible: MatchableResource[],
): Array<{ resource: MatchableResource; breakdown: MatchScoreBreakdown }> {
  return eligible
    .map((resource) => ({
      resource,
      breakdown: calculateScore(innovator, resource),
    }))
    .sort((a, b) => {
      if (b.breakdown.total !== a.breakdown.total) {
        return b.breakdown.total - a.breakdown.total
      }
      return tieBreak(a.resource, b.resource)
    })
}

function curatedStarterSet(
  innovator: InnovatorProfile,
  eligible: MatchableResource[],
): MatchedResource[] {
  const ranked = rankEligible(innovator, eligible)
  const picks: MatchedResource[] = []

  for (const needType of STARTER_NEED_TYPES) {
    const match = ranked.find((entry) =>
      needsMatch(entry.resource.needPrimary, needType),
    )
    if (match) {
      picks.push(toMatchedResource(innovator, match.resource, match.breakdown))
    }
  }

  return picks
}

export function matchResourcesForInnovator(
  innovator: InnovatorProfile,
  resources: MatchableResource[],
): MatchedResource[] {
  const eligible = resources.filter((resource) => passesFilter(innovator, resource))

  if (isNotSureNeed(innovator.primaryNeed)) {
    return curatedStarterSet(innovator, eligible)
  }

  const ranked = rankEligible(innovator, eligible)
  return ranked.slice(0, 5).map((entry) => toMatchedResource(innovator, entry.resource, entry.breakdown))
}

export { parseStagesEligible }
