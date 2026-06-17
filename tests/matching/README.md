# Matching engine tests

Runs the real `lib/matching` engine against scenario profiles with expected outcomes.

## Quick start

```bash
# Deterministic tests (mock catalogue, exact score checks)
pnpm test:matching

# Live Airtable catalogue (name/order checks only)
pnpm test:matching:live

# Single scenario
pnpm test:matching -- --id adaeze-compute

# Verbose output (same as default for now)
pnpm test:matching -- --verbose
```

## Layout

| File | Purpose |
|------|---------|
| `run.ts` | Test runner — loads catalogue, runs scenarios, prints report |
| `scenarios.ts` | Scenario definitions and expectations |
| `assertions.ts` | Checks results against expectations |
| `fixtures/mock-catalogue.ts` | Offline catalogue aligned with worked examples |

## Adding a scenario

Edit `scenarios.ts` and add an entry to `MATCHING_SCENARIOS`:

```ts
{
  id: "my-scenario",
  description: "Human-readable summary",
  innovator: {
    country: "Kenya",
    isPriorityCountry: true,
    stage: "Building",
    primaryNeed: "Compute",
    secondaryNeed: "Training", // optional
  },
  expect: {
    topOrder: ["AWS Activate", "Microsoft"], // top N in order
    mustInclude: ["Zindi"],
    mustExclude: ["Future Compute Grant"],
    topScores: [{ name: "AWS Activate", score: 175 }], // mock mode only
    minResults: 1,
    maxResults: 5,
  },
}
```

## Assertion types

- **topOrder** — top result names must contain these substrings, in order
- **mustInclude** — at least one result must match each substring
- **mustExclude** — no result may match any substring
- **topScores** — exact scores (mock fixture + default mode only)
- **minResults / maxResults** — result count bounds

## Exit code

Exits `0` when all scenarios pass, `1` when any fail.
