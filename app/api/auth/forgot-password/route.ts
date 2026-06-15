import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { getSiteUrl } from "@/lib/auth/site-url"
import { sendPasswordResetEmail } from "@/lib/email/resend"
import { touchProfile } from "@/lib/auth/profile"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 })
    }

    const normalizedEmail = String(email).trim().toLowerCase()
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(normalizedEmail)) {
      return NextResponse.json({ success: false, error: "Invalid email address" }, { status: 400 })
    }

    const admin = createAdminClient()
    const { data: profile } = await admin
      .from("profiles")
      .select("id")
      .eq("email", normalizedEmail)
      .maybeSingle()

    // Always return success to avoid revealing whether an account exists
    if (!profile?.id) {
      return NextResponse.json({
        success: true,
        message: "If an account exists for this email, a reset link has been sent.",
      })
    }

    await admin
      .from("password_resets")
      .update({ used_at: new Date().toISOString() })
      .eq("user_id", profile.id)
      .is("used_at", null)

    const { data: resetRow, error: tokenError } = await admin
      .from("password_resets")
      .insert({ user_id: profile.id })
      .select("token")
      .single()

    if (tokenError || !resetRow?.token) {
      throw tokenError ?? new Error("Token insert failed")
    }

    const resetUrl = `${getSiteUrl()}/auth/set-password?token=${resetRow.token}`
    await sendPasswordResetEmail(normalizedEmail, resetUrl)
    await touchProfile(admin, profile.id)

    return NextResponse.json({
      success: true,
      message: "If an account exists for this email, a reset link has been sent.",
    })
  } catch (error) {
    console.error("[FORGOT-PASSWORD] Failed:", error)
    return NextResponse.json({ success: false, error: "Unable to send reset email" }, { status: 500 })
  }
}
