import { getResponseValue, type IntakeResponse } from "@/lib/intake/responses"

export function isInfrastructureBuilder(responses: IntakeResponse[]): boolean {
  return getResponseValue(responses, "role") === "infrastructure"
}

export function shouldShowLearningHistory(responses: IntakeResponse[]): boolean {
  const aiExperience = getResponseValue(responses, "ai-experience")
  return Boolean(aiExperience && ["none", "getting-started", "not-sure"].includes(aiExperience))
}

export function shouldShowAIGoals(responses: IntakeResponse[]): boolean {
  return shouldShowLearningHistory(responses) && Boolean(getResponseValue(responses, "learning-history"))
}

export function shouldShowComputeExperience(responses: IntakeResponse[]): boolean {
  const aiExperience = getResponseValue(responses, "ai-experience")
  return Boolean(aiExperience && ["good", "expert"].includes(aiExperience))
}

export function shouldShowTeamSize(responses: IntakeResponse[]): boolean {
  const aiJourney = getResponseValue(responses, "ai-journey")
  return Boolean(aiJourney && ["idea", "building", "working"].includes(aiJourney))
}

export function isPhaseTwoComplete(responses: IntakeResponse[]): boolean {
  if (!getResponseValue(responses, "ai-experience")) {
    return false
  }

  if (shouldShowLearningHistory(responses) && !getResponseValue(responses, "learning-history")) {
    return false
  }

  if (shouldShowAIGoals(responses) && !getResponseValue(responses, "ai-goals")) {
    return false
  }

  if (shouldShowComputeExperience(responses) && !getResponseValue(responses, "compute-experience")) {
    return false
  }

  if (shouldShowTeamSize(responses) && !getResponseValue(responses, "team-size")) {
    return false
  }

  return true
}

export interface PhaseTwoQuestion {
  questionId: string
  question: string
}

export function getNextPhaseTwoQuestion(responses: IntakeResponse[]): PhaseTwoQuestion | null {
  if (!getResponseValue(responses, "ai-experience")) {
    return {
      questionId: "ai-experience",
      question: "What's your level of experience with building AI in Africa?",
    }
  }

  if (shouldShowLearningHistory(responses) && !getResponseValue(responses, "learning-history")) {
    return {
      questionId: "learning-history",
      question: "Have you done any learning about AI before?",
    }
  }

  if (shouldShowAIGoals(responses) && !getResponseValue(responses, "ai-goals")) {
    return {
      questionId: "ai-goals",
      question: "What would you like to do with AI?",
    }
  }

  if (shouldShowComputeExperience(responses) && !getResponseValue(responses, "compute-experience")) {
    return {
      questionId: "compute-experience",
      question: "What's your experience with compute?",
    }
  }

  if (shouldShowTeamSize(responses) && !getResponseValue(responses, "team-size")) {
    return {
      questionId: "team-size",
      question: "What's your team size for this AI project?",
    }
  }

  return null
}
