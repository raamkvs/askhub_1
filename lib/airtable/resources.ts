import type { MatchableResource } from "@/lib/matching/types"
import { parseStagesEligible } from "@/lib/matching/engine"

interface AirtableRecord {
  id: string
  fields: Record<string, unknown>
}

interface AirtableListResponse {
  records: AirtableRecord[]
  offset?: string
}

function getAirtableConfig() {
  const baseId = process.env.NEXT_PRIVATE_AIRTABLE_BASE_ID
  const apiKey = process.env.NEXT_PRIVATE_AIRTABLE_API_KEY
  const tableName = process.env.NEXT_PRIVATE_AIRTABLE_RESOURCES_TABLE_NAME

  if (!baseId || !apiKey || !tableName) {
    throw new Error("Airtable resources configuration is missing")
  }

  return { baseId, apiKey, tableName }
}

function fieldToString(value: unknown): string | undefined {
  if (value == null || value === "") return undefined
  if (typeof value === "string") return value.trim() || undefined
  if (typeof value === "number") return String(value)
  if (Array.isArray(value)) {
    const parts = value.map((item) => String(item).trim()).filter(Boolean)
    return parts.length > 0 ? parts.join(", ") : undefined
  }
  return String(value)
}

function fieldToNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string") {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : 0
  }
  return 0
}

function mapAirtableRecord(record: AirtableRecord): MatchableResource | null {
  const fields = record.fields
  const name = fieldToString(fields.name)
  if (!name) return null

  return {
    id: fieldToString(fields.resource_id) ?? record.id,
    name,
    partner: fieldToString(fields.partner) ?? "Partner",
    partnerTier: fieldToString(fields.partner_tier) ?? "Community",
    resourceType: fieldToString(fields.resource_type) ?? "Resource",
    catalogueStatus: fieldToString(fields.status) ?? "",
    needPrimary: fieldToString(fields.need_primary) ?? "",
    needSecondary: fieldToString(fields.need_secondary),
    stagesEligible: parseStagesEligible(fieldToString(fields.stages_eligible)),
    countriesEligible: fieldToString(fields.countries_eligible) ?? "Global",
    description: fieldToString(fields.description) ?? "",
    actionLabel: fieldToString(fields.action_label) ?? "View details",
    externalUrl: fieldToString(fields.external_url) ?? "#",
    languages: fieldToString(fields.languages),
    subCategory: fieldToString(fields.sub_category),
    matchWeight: fieldToNumber(fields.match_weight),
  }
}

async function fetchAirtableRecords(): Promise<AirtableRecord[]> {
  const { baseId, apiKey, tableName } = getAirtableConfig()
  const records: AirtableRecord[] = []
  let offset: string | undefined

  do {
    const url = new URL(`https://api.airtable.com/v0/${baseId}/${tableName}`)
    url.searchParams.set("pageSize", "100")
    if (offset) url.searchParams.set("offset", offset)

    const response = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${apiKey}` },
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Airtable resources fetch failed: ${errorText}`)
    }

    const data = (await response.json()) as AirtableListResponse
    records.push(...data.records)
    offset = data.offset
  } while (offset)

  return records
}

export async function fetchMatchableResourcesFromAirtable(): Promise<MatchableResource[]> {
  const records = await fetchAirtableRecords()
  return records
    .map(mapAirtableRecord)
    .filter((resource): resource is MatchableResource => resource !== null)
}
