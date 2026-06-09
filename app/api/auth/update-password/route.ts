import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(req: Request) {
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
  console.log("[UPDATE-PASSWORD] Request received")
  try {
    const { password } = await req.json()

    if (!password || String(password).length < 8) {
      return NextResponse.json({ success: false, error: "Password must be at least 8 characters" }, { status: 400 })
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

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[UPDATE-PASSWORD] ✗ Fatal:", error)
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
