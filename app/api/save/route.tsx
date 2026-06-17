import { NextResponse } from "next/server"
import { syncIntakeToAirtable } from "@/lib/airtable/intake-sync"
import { normalizeResponses } from "@/lib/intake/responses"

/** Legacy endpoint — prefer sync via /api/intake/complete */
export async function POST(req: Request) {
  const { responses, sessionId, email, userId, phase = 1, airtableRecordId } = await req.json()
  const normalized = normalizeResponses(responses)

  if (!sessionId || normalized.length === 0) {
    return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
  }

  try {
    const result = await syncIntakeToAirtable({
      responses: normalized,
      sessionId,
      email: email || `${sessionId}@placeholder.ai`,
      userId: userId || "unknown",
      phase: phase === 2 ? 2 : 1,
      airtableRecordId,
    })

    return NextResponse.json({ success: true, recordId: result.recordId })
  } catch (error) {
    console.error("Airtable save failed", error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
