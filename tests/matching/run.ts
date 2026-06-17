#!/usr/bin/env node
/**
 * Resource matching engine test runner
 *
 * Usage:
 *   pnpm test:matching              # deterministic mock catalogue (default)
 *   pnpm test:matching -- --live      # live Airtable catalogue (name checks only)
 *   pnpm test:matching -- --id adaeze-compute   # run one scenario
 */

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { fetchMatchableResourcesFromAirtable } from "@/lib/airtable/resources"
import { matchResourcesForInnovator } from "@/lib/matching/engine"
import { assertScenario } from "./assertions"
import { MOCK_CATALOGUE } from "./fixtures/mock-catalogue"
import { MATCHING_SCENARIOS } from "./scenarios"
import type { MatchableResource } from "@/lib/matching/types"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "../..")

function loadEnvFile() {
  const envPath = path.join(root, ".env")
  if (!fs.existsSync(envPath)) return

  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const idx = trimmed.indexOf("=")
    if (idx === -1) continue
    const key = trimmed.slice(0, idx).trim()
    const value = trimmed.slice(idx + 1).trim()
    if (!(key in process.env)) process.env[key] = value
  }
}

function parseArgs(argv: string[]) {
  return {
    live: argv.includes("--live"),
    id: argv.find((a, i) => argv[i - 1] === "--id") ?? null,
    verbose: argv.includes("--verbose"),
  }
}

async function loadCatalogue(live: boolean): Promise<{ catalogue: MatchableResource[]; source: string }> {
  if (!live) {
    return { catalogue: MOCK_CATALOGUE, source: "mock fixture" }
  }

  try {
    const catalogue = await fetchMatchableResourcesFromAirtable()
    if (catalogue.length === 0) {
      throw new Error("Airtable returned zero resources")
    }
    return {
      catalogue,
      source: `airtable (${catalogue.length} rows, ${catalogue.filter((r) => r.catalogueStatus.toLowerCase() === "live").length} live)`,
    }
  } catch (error) {
    console.error("\n⚠ Live fetch failed, falling back to mock fixture:", error)
    return { catalogue: MOCK_CATALOGUE, source: "mock fixture (fallback)" }
  }
}

function printResultLine(rank: number, title: string, score: number, chips: string[]) {
  const chipText = chips.length ? `  [${chips.join(", ")}]` : ""
  console.log(`    ${rank}. ${score} pts — ${title}${chipText}`)
}

async function main() {
  loadEnvFile()
  const args = parseArgs(process.argv.slice(2))
  const { catalogue, source } = await loadCatalogue(args.live)
  const strictScores = !args.live && source.startsWith("mock")

  const scenarios = args.id
    ? MATCHING_SCENARIOS.filter((s) => s.id === args.id)
    : MATCHING_SCENARIOS

  if (scenarios.length === 0) {
    console.error(`No scenario found with id "${args.id}"`)
    console.error(`Available: ${MATCHING_SCENARIOS.map((s) => s.id).join(", ")}`)
    process.exit(1)
  }

  console.log("\n┌─────────────────────────────────────────────────────────────────────┐")
  console.log("│           AskHub — Resource Matching Engine Tests                   │")
  console.log("└─────────────────────────────────────────────────────────────────────┘")
  console.log(`\nCatalogue: ${source}`)
  console.log(`Score checks: ${strictScores ? "strict (exact)" : "relaxed (names only)"}\n`)

  let passed = 0
  let failed = 0

  for (const scenario of scenarios) {
    const results = matchResourcesForInnovator(scenario.innovator, catalogue)
    const failures = assertScenario(scenario, results, { strictScores })
    const ok = failures.length === 0

    console.log(`${ok ? "✓" : "✗"} ${scenario.id}`)
    console.log(`  ${scenario.description}`)
    console.log(
      `  Profile: ${scenario.innovator.country} · ${scenario.innovator.stage} · ${scenario.innovator.primaryNeed}${
        scenario.innovator.secondaryNeed ? ` (+ ${scenario.innovator.secondaryNeed})` : ""
      }`,
    )

    if (results.length === 0) {
      console.log("  Results: (none)")
    } else {
      console.log(`  Results (${results.length}):`)
      results.forEach((r, i) => printResultLine(i + 1, r.title, r.matchScore, r.reasonChips))
    }

    if (failures.length > 0) {
      console.log("  Failures:")
      for (const f of failures) {
        console.log(`    • [${f.check}] ${f.message}`)
      }
      failed++
    } else {
      passed++
    }

    console.log("")
  }

  console.log("─".repeat(72))
  console.log(`Summary: ${passed} passed, ${failed} failed, ${scenarios.length} total\n`)

  if (failed > 0) process.exit(1)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
