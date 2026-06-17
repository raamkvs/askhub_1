import type { IntakeResponse } from "@/lib/intake/responses"
import { normalizeResponses } from "@/lib/intake/responses"

/** Merge intake answers; newer entries win per questionId. */
export function mergeResponses(
  existing: unknown,
  incoming: IntakeResponse[],
): IntakeResponse[] {
  const base = normalizeResponses(existing)
  const map = new Map<string, IntakeResponse>()

  for (const response of base) {
    map.set(response.questionId, response)
  }
  for (const response of incoming) {
    map.set(response.questionId, response)
  }

  return Array.from(map.values())
}
