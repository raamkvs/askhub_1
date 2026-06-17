import type { InnovatorProfile } from "@/lib/matching/types"
import { NOT_SURE_NEED } from "@/lib/matching/constants"

export interface ScenarioExpectations {
  /** Substrings expected in the top N results, in order (N = length of array). */
  topOrder?: string[]
  /** At least one result name must contain each substring. */
  mustInclude?: string[]
  /** No result name may contain any of these substrings. */
  mustExclude?: string[]
  /** Exact scores for top results (mock fixture only). */
  topScores?: Array<{ name: string; score: number }>
  /** Minimum number of results returned. */
  minResults?: number
  /** Maximum number of results returned. */
  maxResults?: number
  /** Starter-set mode: expect one result per need bucket. */
  starterNeeds?: string[]
}

export interface MatchingScenario {
  id: string
  description: string
  innovator: InnovatorProfile
  expect: ScenarioExpectations
}

export const MATCHING_SCENARIOS: MatchingScenario[] = [
  {
    id: "adaeze-compute",
    description: "Nigeria · Building · Compute — worked example 1",
    innovator: {
      country: "Nigeria",
      isPriorityCountry: true,
      stage: "Building",
      primaryNeed: "Compute",
    },
    expect: {
      maxResults: 5,
      topOrder: [
        "Microsoft for Startups",
        "AWS Activate",
        "NVIDIA Inception",
        "Cyber4Africa",
        "Zindi",
      ],
      topScores: [
        { name: "Microsoft for Startups", score: 180 },
        { name: "AWS Activate", score: 175 },
        { name: "NVIDIA Inception", score: 150 },
        { name: "Cyber4Africa", score: 145 },
        { name: "Zindi", score: 140 },
      ],
      mustExclude: ["Future Compute Grant"],
    },
  },
  {
    id: "amara-not-sure",
    description: "Nigeria · New to AI · Not sure — curated starter set",
    innovator: {
      country: "Nigeria",
      isPriorityCountry: true,
      stage: "New to AI",
      primaryNeed: NOT_SURE_NEED,
    },
    expect: {
      minResults: 2,
      maxResults: 5,
      mustInclude: ["AfriLabs", "Zindi"],
      starterNeeds: ["Training", "Partners"],
    },
  },
  {
    id: "yasmin-training",
    description: "Tunisia · Getting started · Training — worked example 3",
    innovator: {
      country: "Tunisia",
      isPriorityCountry: true,
      stage: "Getting started",
      primaryNeed: "Training",
    },
    expect: {
      topOrder: ["AfriLabs", "Stanford", "Google AI Essentials"],
      topScores: [
        { name: "AfriLabs", score: 210 },
        { name: "Stanford", score: 175 },
      ],
      mustInclude: ["Microsoft AI Fluency", "Kaggle"],
    },
  },
  {
    id: "joseph-partners",
    description: "Kenya · Scaling · Partners — worked example 4",
    innovator: {
      country: "Kenya",
      isPriorityCountry: true,
      stage: "Scaling",
      primaryNeed: "Partners",
    },
    expect: {
      topOrder: ["Zindi", "Cyber4Africa"],
      topScores: [{ name: "Zindi", score: 190 }],
      mustInclude: ["Kaggle"],
    },
  },
  {
    id: "carlos-other-global",
    description: "Brazil · New to AI · Training — Global only (worked example 5)",
    innovator: {
      country: "Brazil",
      isPriorityCountry: false,
      stage: "New to AI",
      primaryNeed: "Training",
    },
    expect: {
      maxResults: 5,
      mustInclude: ["Microsoft AI Fluency", "Google AI Essentials"],
      mustExclude: ["AfriLabs", "Zindi", "Cyber4Africa", "Africa-Only"],
    },
  },
  {
    id: "benin-non-priority",
    description: "Benin · Getting started · Training — African but not in 18 priority",
    innovator: {
      country: "Benin",
      isPriorityCountry: false,
      stage: "Getting started",
      primaryNeed: "Training",
    },
    expect: {
      mustInclude: ["Stanford", "Google AI Essentials", "Microsoft AI Fluency"],
      mustExclude: ["AfriLabs", "Africa-Only"],
    },
  },
  {
    id: "compute-secondary-training",
    description: "Nigeria · Building · Compute + secondary Training",
    innovator: {
      country: "Nigeria",
      isPriorityCountry: true,
      stage: "Building",
      primaryNeed: "Compute",
      secondaryNeed: "Training",
    },
    expect: {
      topOrder: ["Microsoft for Startups", "AWS Activate"],
    },
  },
  {
    id: "pipeline-excluded",
    description: "Pipeline resources never appear in results",
    innovator: {
      country: "Nigeria",
      isPriorityCountry: true,
      stage: "New to AI",
      primaryNeed: "Compute",
    },
    expect: {
      mustExclude: ["Future Compute Grant"],
      maxResults: 5,
    },
  },
  {
    id: "ivory-coast-priority",
    description: "Ivory Coast normalises to Côte d'Ivoire and counts as priority",
    innovator: {
      country: "Côte d'Ivoire",
      isPriorityCountry: true,
      stage: "Building",
      primaryNeed: "Partners",
    },
    expect: {
      mustInclude: ["Zindi", "Cyber4Africa"],
      minResults: 1,
    },
  },
]
