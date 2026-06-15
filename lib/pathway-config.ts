import type { PathwayResult } from "@/lib/pathway"

export interface PathwayDisplay {
  title: string
  description: string
  coachMessage: string
}

export const PATHWAY_DISPLAY: Record<PathwayResult["type"], PathwayDisplay> = {
  builder: {
    title: "Builder",
    description:
      "Actively building. Compute credits, technical training, partner programmes like AWS Activate and Microsoft for Startups.",
    coachMessage:
      "Your team's experience with compute puts you in a great position to accelerate your AI journey!",
  },
  "compute-ready": {
    title: "Compute-ready",
    description:
      "Ready for advanced compute. Cloud credits, accelerator programmes, and mentorship to scale your AI solution.",
    coachMessage:
      "Excellent! Based on your experience and team, you're ready for advanced opportunities!",
  },
  infrastructure: {
    title: "Infrastructure builder",
    description:
      "Building Africa's AI foundations. Data centres, connectivity, energy, and partnerships with governments and investors.",
    coachMessage:
      "Perfect! As an infrastructure builder, you're exactly who we need to shape Africa's AI future!",
  },
  student: {
    title: "Student innovator",
    description:
      "Learning and exploring AI. Scholarships, beginner courses, and communities to grow your skills.",
    coachMessage: "Great to see a student interested in AI! Here are some resources tailored for you.",
  },
  curious: {
    title: "Curious explorer",
    description:
      "Getting started with AI. Accelerators, beginner training, and communities to help you take your first steps.",
    coachMessage: "You're just getting started with AI! Here are some resources tailored for you.",
  },
  default: {
    title: "Explorer",
    description:
      "Exploring what's possible with AI. General resources and programmes as we expand matches for your profile.",
    coachMessage:
      "We are still working on resources for your profile — explore the suggestions below and check back for updates.",
  },
}

export function getPathwayDisplay(type: PathwayResult["type"]): PathwayDisplay {
  return PATHWAY_DISPLAY[type]
}
