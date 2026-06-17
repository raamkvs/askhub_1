import type { MatchedResource } from "@/lib/matching/types"
import type { MatchingScenario } from "./scenarios"

export interface AssertionFailure {
  check: string
  message: string
}

function nameIncludes(name: string, substring: string): boolean {
  return name.toLowerCase().includes(substring.toLowerCase())
}

export function assertScenario(
  scenario: MatchingScenario,
  results: MatchedResource[],
  options: { strictScores?: boolean } = {},
): AssertionFailure[] {
  const failures: AssertionFailure[] = []
  const { expect } = scenario
  const names = results.map((r) => r.title)

  if (expect.minResults !== undefined && results.length < expect.minResults) {
    failures.push({
      check: "minResults",
      message: `Expected at least ${expect.minResults} results, got ${results.length}`,
    })
  }

  if (expect.maxResults !== undefined && results.length > expect.maxResults) {
    failures.push({
      check: "maxResults",
      message: `Expected at most ${expect.maxResults} results, got ${results.length}`,
    })
  }

  if (expect.topOrder) {
    const slice = names.slice(0, expect.topOrder.length)
    expect.topOrder.forEach((expected, index) => {
      const actual = slice[index]
      if (!actual || !nameIncludes(actual, expected)) {
        failures.push({
          check: "topOrder",
          message: `Position ${index + 1}: expected "${expected}", got "${actual ?? "(none)"}"`,
        })
      }
    })
  }

  for (const substring of expect.mustInclude ?? []) {
    if (!names.some((n) => nameIncludes(n, substring))) {
      failures.push({
        check: "mustInclude",
        message: `Expected a result containing "${substring}"`,
      })
    }
  }

  for (const substring of expect.mustExclude ?? []) {
    if (names.some((n) => nameIncludes(n, substring))) {
      failures.push({
        check: "mustExclude",
        message: `Did not expect a result containing "${substring}"`,
      })
    }
  }

  if (expect.topScores && options.strictScores) {
    for (const { name, score } of expect.topScores) {
      const match = results.find((r) => nameIncludes(r.title, name))
      if (!match) {
        failures.push({
          check: "topScores",
          message: `Expected scored result "${name}" to be present`,
        })
      } else if (match.matchScore !== score) {
        failures.push({
          check: "topScores",
          message: `Expected "${name}" score ${score}, got ${match.matchScore}`,
        })
      }
    }
  }

  return failures
}
