import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { getPasswordValidationError } from "@/lib/auth/password"
import { touchProfile } from "@/lib/auth/profile"

export async function POST(req: Request) {
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
  console.log("[UPDATE-PASSWORD] Request received")
  try {
    const { password } = await req.json()

    const passwordError = getPasswordValidationError(password ? String(password) : "")
    if (passwordError) {
      return NextResponse.json({ success: false, error: passwordError }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      console.log("[UPDATE-PASSWORD] ✗ Not authenticated:", userError?.message)
      return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 })
    }

    console.log("[UPDATE-PASSWORD] Session confirmed ✓ userId:", user.id)

    const { error: updateError } = await supabase.auth.updateUser({ password })
    if (updateError) {
      console.log("[UPDATE-PASSWORD] ✗ updateUser failed:", updateError.message)
      throw updateError
    }

    console.log("[UPDATE-PASSWORD] ✓ Password updated")

    // Mark any pending reset tokens as used
    const admin = createAdminClient()
    await admin
      .from("password_resets")
      .update({ used_at: new Date().toISOString() })
      .eq("user_id", user.id)
      .is("used_at", null)
    console.log("[UPDATE-PASSWORD] ✓ Reset tokens invalidated")

    await touchProfile(admin, user.id)
    console.log("[UPDATE-PASSWORD] ✓ Profile updated_at touched")

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[UPDATE-PASSWORD] ✗ Fatal:", error)
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
