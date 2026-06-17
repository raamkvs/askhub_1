import { NextResponse } from "next/server"
import { fetchMatchableResourcesFromAirtable } from "@/lib/airtable/resources"
import { normalizeResponses, type IntakeResponse } from "@/lib/intake/responses"
import { matchResourcesForInnovator } from "@/lib/matching/engine"
import { buildInnovatorProfile } from "@/lib/matching/maps"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const responses = normalizeResponses(body.responses as IntakeResponse[])
    const secondaryNeed = typeof body.secondaryNeed === "string" ? body.secondaryNeed : null

    const innovator = buildInnovatorProfile(responses, secondaryNeed)
    if (!innovator) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required innovator profile fields (country, stage, or primary need)",
          resources: [],
        },
        { status: 400 },
      )
    }

    const catalogue = await fetchMatchableResourcesFromAirtable()
    const resources = matchResourcesForInnovator(innovator, catalogue)

    return NextResponse.json({
      success: true,
      resources,
      isOtherCountry: !innovator.isPriorityCountry,
      matchCount: resources.length,
    })
  } catch (error) {
    console.error("[RESOURCES] Match failed:", error)
    return NextResponse.json(
      { success: false, error: String(error), resources: [] },
      { status: 500 },
    )
  }
}
