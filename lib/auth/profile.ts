import { createAdminClient } from "@/lib/supabase/admin"

type AdminClient = ReturnType<typeof createAdminClient>

export async function touchProfile(admin: AdminClient, userId: string): Promise<void> {
  const { error } = await admin
    .from("profiles")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", userId)

  if (error) {
    console.warn("[PROFILE] Failed to update updated_at:", error.message)
  }
}
