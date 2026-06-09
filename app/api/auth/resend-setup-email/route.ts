import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { getSiteUrl } from "@/lib/auth/site-url"
import { sendPasswordSetupEmail } from "@/lib/email/mailersend"

function generateTempPassword(length = 12): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789"
  let result = ""
  for (let i = 0; i < length; i++) result += chars.charAt(Math.floor(Math.random() * chars.length))
  return result
}

export async function POST(req: Request) {
  console.log("[RESEND-SETUP] Request received")
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ success: false, error: "Email required" }, { status: 400 })

    const normalizedEmail = String(email).trim().toLowerCase()
    const admin = createAdminClient()

    // Find the user
    const { data: profile } = await admin
      .from("profiles")
      .select("id")
      .eq("email", normalizedEmail)
      .maybeSingle()

    if (!profile?.id) {
      return NextResponse.json({ success: false, error: "No account found for this email" }, { status: 404 })
    }

    // Reset the temp password
    const tempPassword = generateTempPassword()
    await admin.auth.admin.updateUserById(profile.id, { password: tempPassword })

    // Invalidate old tokens and create a new one
    await admin.from("password_resets").update({ used_at: new Date().toISOString() }).eq("user_id", profile.id).is("used_at", null)

    const { data: resetRow, error: tokenError } = await admin
      .from("password_resets")
      .insert({ user_id: profile.id })
      .select("token")
      .single()

    if (tokenError || !resetRow?.token) throw tokenError ?? new Error("Token insert failed")

    const resetUrl = `${getSiteUrl()}/auth/set-password?token=${resetRow.token}`
    await sendPasswordSetupEmail(normalizedEmail, tempPassword, resetUrl)

    console.log("[RESEND-SETUP] ✓ Resent to:", normalizedEmail)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[RESEND-SETUP] ✗ Fatal:", error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
