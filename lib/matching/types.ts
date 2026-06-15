export interface InnovatorProfile {
  country: string
  isPriorityCountry: boolean
  stage: string
  primaryNeed: string
  secondaryNeed?: string
}

export interface MatchableResource {
  id: string
  name: string
  partner: string
  partnerTier: string
  resourceType: string
  catalogueStatus: string
  needPrimary: string
  needSecondary?: string
  stagesEligible: string[]
  countriesEligible: string
  description: string
  actionLabel: string
  externalUrl: string
  languages?: string
  subCategory?: string
  matchWeight: number
}

export interface MatchScoreBreakdown {
  stage: number
  needPrimary: number
  needSecondaryOnPrimary: number
  needPrimaryOnSecondary: number
  needSecondaryOnSecondary: number
  country: number
  weight: number
  total: number
}

export interface MatchedResource {
  id: string
  category: string
  statusLabel: string
  title: string
  provider: string
  region: string
  description: string
  primaryAction: { label: string; href: string }
  detailsHref: string
  tag?: string
  subCategory?: string
  matchScore: number
  reasonChips: string[]
}
