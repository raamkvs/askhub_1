/** Airtable History / Responses table field IDs */
export const AIRTABLE_INTAKE_FIELD_IDS = {
  sessionId: "fldPSqbodvtYcTqc1",
  email: "fldrxV7JnxDL7HR1s",
  timestamp: "fldDEhp5uQe7DHjIk",
  fullName: "fldAGgyi44Jn3HT69",
  primaryNeed: "fldYCMACuKyJQWwp6",
  onboardingComplete: "fldWPtL87qBT8seyY",
  phaseTwoCompletedAt: "fldkOYgKBwDrUcJPP",
  userId: "fldixSTupXyj4VUQ4",
} as const

/** Maps intake questionId → Airtable field ID */
export const AIRTABLE_QUESTION_FIELD_MAP: Record<string, string> = {
  country: "fldpmAdlHqwe9PsCS",
  role: "fldO5uCGgefs7gpRa",
  "build-goal": "fldXVQk3ouHwAr3hx",
  "ai-journey": "fld05GrR98I7o28pc",
  "ai-experience": "fldbrAiv6dWIXAVwn",
  "learning-history": "fldn21ariYL7s0moq",
  "ai-goals": "fldjAyOibMPBESy3Y",
  "team-size": "fld0btfsVQ4gCxiO1",
  "compute-experience": "fld1YpOi7NBcyO59C",
  "primary-need": AIRTABLE_INTAKE_FIELD_IDS.primaryNeed,
  "full-name": AIRTABLE_INTAKE_FIELD_IDS.fullName,
}
