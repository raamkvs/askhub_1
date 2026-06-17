import {
  AIRTABLE_INTAKE_FIELD_IDS,
  AIRTABLE_QUESTION_FIELD_MAP,
} from "@/lib/airtable/intake-fields"
import type { IntakeResponse } from "@/lib/intake/responses"

interface SyncIntakeOptions {
  responses: IntakeResponse[]
  sessionId: string
  email: string
  userId: string
  phase: 1 | 2
  airtableRecordId?: string | null
}

interface SyncIntakeResult {
  recordId: string
}

function getAirtableConfig() {
  const baseId = process.env.NEXT_PRIVATE_AIRTABLE_BASE_ID
  const apiKey = process.env.NEXT_PRIVATE_AIRTABLE_API_KEY
  const tableName = process.env.NEXT_PRIVATE_AIRTABLE_TABLE_NAME

  if (!baseId || !apiKey || !tableName) {
    throw new Error("Airtable intake configuration is missing")
  }

  return { baseId, apiKey, tableName }
}

function buildFields({
  responses,
  sessionId,
  email,
  userId,
  phase,
}: SyncIntakeOptions): Record<string, unknown> {
  const fields: Record<string, unknown> = {
    [AIRTABLE_INTAKE_FIELD_IDS.sessionId]: sessionId,
    [AIRTABLE_INTAKE_FIELD_IDS.email]: email,
    [AIRTABLE_INTAKE_FIELD_IDS.timestamp]: new Date().toISOString(),
    [AIRTABLE_INTAKE_FIELD_IDS.userId]: userId,
    [AIRTABLE_INTAKE_FIELD_IDS.onboardingComplete]: phase === 2,
  }

  if (phase === 2) {
    fields[AIRTABLE_INTAKE_FIELD_IDS.phaseTwoCompletedAt] = new Date().toISOString()
  }

  for (const response of responses) {
    const fieldId = AIRTABLE_QUESTION_FIELD_MAP[response.questionId]
    if (fieldId) {
      fields[fieldId] = response.answerText
    }
  }

  return fields
}

export async function syncIntakeToAirtable(
  options: SyncIntakeOptions,
): Promise<SyncIntakeResult> {
  const { baseId, apiKey, tableName } = getAirtableConfig()
  const fields = buildFields(options)

  if (options.phase === 2 && options.airtableRecordId) {
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}/${options.airtableRecordId}`
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields, typecast: true }),
    })

    if (!response.ok) {
      throw new Error(await response.text())
    }

    const data = (await response.json()) as { id: string }
    return { recordId: data.id }
  }

  const url = `https://api.airtable.com/v0/${baseId}/${tableName}`
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields, typecast: true }),
  })

  if (!response.ok) {
    throw new Error(await response.text())
  }

  const data = (await response.json()) as { id: string }
  return { recordId: data.id }
}
