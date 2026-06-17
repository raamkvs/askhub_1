import { createAdminClient } from "@/lib/supabase/admin"

type AdminClient = ReturnType<typeof createAdminClient>

export interface UpsertProfileInput {
  userId: string
  email: string
  country?: string | null
  fullName?: string | null
  onboardingComplete: boolean
  airtableRecordId?: string | null
}

export async function upsertProfile(
  admin: AdminClient,
  input: UpsertProfileInput,
): Promise<void> {
  const row: Record<string, unknown> = {
    id: input.userId,
    email: input.email,
    country: input.country ?? null,
    full_name: input.fullName ?? null,
    onboarding_complete: input.onboardingComplete,
    updated_at: new Date().toISOString(),
  }

  if (input.airtableRecordId !== undefined) {
    row.airtable_record_id = input.airtableRecordId
  }

  const { error } = await admin.from("profiles").upsert(row, { onConflict: "id" })

  if (error) {
    throw new Error(`Failed to upsert profile: ${error.message}`)
  }
}

/** @deprecated Use upsertProfile — kept for lightweight timestamp bumps */
export async function touchProfile(admin: AdminClient, userId: string): Promise<void> {
  const { error } = await admin
    .from("profiles")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", userId)

  if (error) {
    console.warn("[PROFILE] Failed to update updated_at:", error.message)
  }
}

export async function getProfileByUserId(
  admin: AdminClient,
  userId: string,
): Promise<{
  id: string
  email: string
  country: string | null
  full_name: string | null
  onboarding_complete: boolean
  airtable_record_id: string | null
} | null> {
  const { data, error } = await admin
    .from("profiles")
    .select("id, email, country, full_name, onboarding_complete, airtable_record_id")
    .eq("id", userId)
    .maybeSingle()

  if (error) {
    throw new Error(`Failed to load profile: ${error.message}`)
  }

  return data
}
