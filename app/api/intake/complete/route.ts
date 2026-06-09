import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { derivePathway } from "@/lib/pathway"
import { getSiteUrl } from "@/lib/auth/site-url"
import { sendPasswordSetupEmail } from "@/lib/email/mailersend"

function generateTempPassword(length = 12): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export async function POST(req: Request) {
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
  console.log("[INTAKE] Step 1 — Request received")
  try {
    const { responses, sessionId, email, trigger } = await req.json()
    console.log("[INTAKE] Step 2 — Parsed body:", { email, sessionId, trigger, responseCount: responses?.length })

    if (!email || !sessionId || !Array.isArray(responses)) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const normalizedEmail = String(email).trim().toLowerCase()
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(normalizedEmail)) {
      return NextResponse.json({ success: false, error: "Invalid email address" }, { status: 400 })
    }
    console.log("[INTAKE] Step 3 — Email validated:", normalizedEmail)

    const country = responses.find((r: { questionId: string }) => r.questionId === "country")?.answerText ?? null
    const pathway = derivePathway(responses)
    console.log("[INTAKE] Step 4 — Pathway derived:", { country, pathwayType: pathway.type })

    const admin = createAdminClient()

    // ── Step 5: look up existing profile ──────────────────────────────────
    console.log("[INTAKE] Step 5 — Checking for existing profile...")
    const { data: existingProfile } = await admin
      .from("profiles")
      .select("id, email")
      .eq("email", normalizedEmail)
      .maybeSingle()
    console.log("[INTAKE] Step 5 result:", existingProfile ? `id=${existingProfile.id}` : "none")

    let userId = existingProfile?.id
    const isExistingUser = Boolean(existingProfile?.id)

    // ── Step 6: create or update auth user ────────────────────────────────
    const tempPassword = generateTempPassword()

    if (existingProfile?.id) {
      console.log("[INTAKE] Step 6 — Existing user, updating metadata & password...")
      await admin.auth.admin.updateUserById(existingProfile.id, {
        password: tempPassword,
        user_metadata: { country },
      })
      console.log("[INTAKE] Step 6 — Updated ✓")
    } else {
      console.log("[INTAKE] Step 6 — New user, creating account...")
      const { data: createdUser, error: createError } = await admin.auth.admin.createUser({
        email: normalizedEmail,
        password: tempPassword,
        email_confirm: true,
        user_metadata: { country },
      })

      if (createError) {
        if (
          createError.message?.toLowerCase().includes("already been registered") ||
          createError.message?.toLowerCase().includes("already exists")
        ) {
          console.log("[INTAKE] Step 6 — Auth user exists, resolving via listUsers...")
          const { data: userList } = await admin.auth.admin.listUsers()
          const existing = userList?.users.find((u) => u.email === normalizedEmail)
          if (!existing) throw new Error("Auth user exists but could not be found")
          userId = existing.id
          await admin.auth.admin.updateUserById(existing.id, {
            password: tempPassword,
            user_metadata: { country },
          })
          console.log("[INTAKE] Step 6 — Resolved ✓ userId:", userId)
        } else {
          console.log("[INTAKE] ✗ createUser failed:", createError.message)
          throw createError
        }
      } else {
        userId = createdUser.user?.id
        console.log("[INTAKE] Step 6 — Created ✓ userId:", userId)
      }
    }

    if (!userId) throw new Error("Unable to resolve user id")

    // ── Step 7: save intake_session ───────────────────────────────────────
    console.log("[INTAKE] Step 7 — Saving intake_session...")
    const { error: intakeError } = await admin.from("intake_sessions").upsert(
      { user_id: userId, session_id: sessionId, trigger: trigger || null, responses, pathway, resource_state: {} },
      { onConflict: "session_id" },
    )
    if (intakeError) { console.log("[INTAKE] ✗ intake_sessions upsert:", intakeError.message); throw intakeError }
    console.log("[INTAKE] Step 7 — Saved ✓")

    // ── Step 8: create reset token ────────────────────────────────────────
    console.log("[INTAKE] Step 8 — Creating password reset token...")
    const { data: resetRow, error: tokenError } = await admin
      .from("password_resets")
      .insert({ user_id: userId })
      .select("token")
      .single()

    if (tokenError || !resetRow?.token) {
      console.log("[INTAKE] ✗ Reset token insert:", tokenError?.message)
      throw tokenError ?? new Error("Token insert returned no data")
    }
    const resetToken = resetRow.token
    const resetUrl = `${getSiteUrl()}/auth/set-password?token=${resetToken}`
    console.log("[INTAKE] Step 8 — Token created ✓")

    // ── Step 9: send email via MailerSend ─────────────────────────────────
    let emailSent = false
    let emailError: string | undefined
    console.log("[INTAKE] Step 9 — Sending setup email via MailerSend...")
    try {
      await sendPasswordSetupEmail(normalizedEmail, tempPassword, resetUrl)
      emailSent = true
      console.log("[INTAKE] Step 9 — Email sent ✓")
    } catch (mailErr) {
      emailError = String(mailErr)
      console.log("[INTAKE] ✗ MailerSend failed:", emailError)
    }

    // ── Step 10: Airtable sync (non-fatal) ────────────────────────────────
    try {
      await fetch(new URL("/api/save", req.url).toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ responses, sessionId, email: normalizedEmail }),
      })
    } catch {}

    const responsePayload = { success: true, isExistingUser, emailSent, emailError }
    console.log("[INTAKE] ✓ Complete:", responsePayload)
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")
    return NextResponse.json(responsePayload)
  } catch (error) {
    console.error("[INTAKE] ✗ Fatal:", error)
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
