import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { getSiteUrl } from "@/lib/auth/site-url"

export async function POST(req: Request) {
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
  console.log("[SET-PASSWORD-API] Request received")
  try {
    const { token } = await req.json()
    console.log("[SET-PASSWORD-API] Token present:", Boolean(token))

    if (!token || typeof token !== "string") {
      return NextResponse.json({ success: false, error: "Token is required" }, { status: 400 })
    }

    const admin = createAdminClient()

    // ── Validate token ────────────────────────────────────────────────────
    const { data: resetRow, error: lookupError } = await admin
      .from("password_resets")
      .select("user_id, expires_at, used_at")
      .eq("token", token)
      .maybeSingle()

    if (lookupError) {
      console.log("[SET-PASSWORD-API] ✗ Token lookup error:", lookupError.message)
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 400 })
    }

    if (!resetRow) {
      console.log("[SET-PASSWORD-API] ✗ Token not found")
      return NextResponse.json({ success: false, error: "Invalid or expired link" }, { status: 400 })
    }

    if (resetRow.used_at) {
      console.log("[SET-PASSWORD-API] ✗ Token already used")
      return NextResponse.json({ success: false, error: "This link has already been used" }, { status: 400 })
    }

    if (new Date(resetRow.expires_at) < new Date()) {
      console.log("[SET-PASSWORD-API] ✗ Token expired")
      return NextResponse.json({ success: false, error: "This link has expired. Please request a new one." }, { status: 400 })
    }

    console.log("[SET-PASSWORD-API] Token valid ✓ userId:", resetRow.user_id)

    // ── Get user email ────────────────────────────────────────────────────
    const { data: userData, error: userError } = await admin.auth.admin.getUserById(resetRow.user_id)
    if (userError || !userData?.user?.email) {
      console.log("[SET-PASSWORD-API] ✗ getUserById error:", userError?.message)
      return NextResponse.json({ success: false, error: "User not found" }, { status: 400 })
    }

    const userEmail = userData.user.email
    console.log("[SET-PASSWORD-API] User email resolved:", userEmail)

    // ── Generate magic link for session (no email sent) ───────────────────
    // Redirect directly to the client-side page so the Supabase JS client
    // can process the #access_token hash fragment automatically.
    console.log("[SET-PASSWORD-API] Generating magic link...")
    const redirectTo = `${getSiteUrl()}/auth/set-password?verified=true`
    const { data: linkData, error: linkError } = await admin.auth.admin.generateLink({
      type: "magiclink",
      email: userEmail,
      options: { redirectTo },
    })

    if (linkError || !linkData?.properties?.action_link) {
      console.log("[SET-PASSWORD-API] ✗ generateLink error:", linkError?.message)
      return NextResponse.json({ success: false, error: "Could not generate sign-in link" }, { status: 500 })
    }

    console.log("[SET-PASSWORD-API] ✓ Magic link generated")
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")
    return NextResponse.json({ success: true, signInUrl: linkData.properties.action_link })
  } catch (error) {
    console.error("[SET-PASSWORD-API] ✗ Fatal:", error)
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
