import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"
import { syncIntakeToAirtable } from "@/lib/airtable/intake-sync"
import { getProfileByUserId, upsertProfile } from "@/lib/auth/profile"
import { getSiteUrl } from "@/lib/auth/site-url"
import { isPhaseTwoComplete } from "@/lib/intake/conditions"
import { mergeResponses } from "@/lib/intake/merge"
import { normalizeResponses, type IntakeResponse } from "@/lib/intake/responses"
import { derivePathway } from "@/lib/pathway"
import { sendPasswordSetupEmail } from "@/lib/email/resend"

function generateTempPassword(length = 12): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

function getResponseText(responses: IntakeResponse[], questionId: string): string | null {
  const match = responses.find((r) => r.questionId === questionId)
  return match?.answerText?.trim() || null
}

async function saveIntakeSession(
  admin: ReturnType<typeof createAdminClient>,
  input: {
    userId: string
    sessionId: string
    trigger?: string | null
    responses: IntakeResponse[]
    pathway: ReturnType<typeof derivePathway> | null
    resourceState?: Record<string, unknown>
  },
) {
  const { data: existing } = await admin
    .from("intake_sessions")
    .select("resource_state")
    .eq("user_id", input.userId)
    .maybeSingle()

  const { error } = await admin.from("intake_sessions").upsert(
    {
      user_id: input.userId,
      session_id: input.sessionId,
      trigger: input.trigger || null,
      responses: input.responses,
      pathway: input.pathway,
      resource_state: input.resourceState ?? existing?.resource_state ?? {},
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  )

  if (error) {
    throw new Error(error.message)
  }
}

async function handlePhaseOne(body: {
  responses?: unknown
  sessionId?: string
  email?: string
  trigger?: string
}) {
  const { responses: rawResponses, sessionId, email, trigger } = body
  const responses = normalizeResponses(rawResponses)

  if (!email || !sessionId || responses.length === 0) {
    return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
  }

  const normalizedEmail = String(email).trim().toLowerCase()
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(normalizedEmail)) {
    return NextResponse.json({ success: false, error: "Invalid email address" }, { status: 400 })
  }

  const country = getResponseText(responses, "country")
  const fullName = getResponseText(responses, "full-name")
  const admin = createAdminClient()

  const { data: existingProfile } = await admin
    .from("profiles")
    .select("id, email, airtable_record_id")
    .eq("email", normalizedEmail)
    .maybeSingle()

  let userId = existingProfile?.id
  const isExistingUser = Boolean(existingProfile?.id)
  const tempPassword = generateTempPassword()

  if (existingProfile?.id) {
    await admin.auth.admin.updateUserById(existingProfile.id, {
      password: tempPassword,
      user_metadata: { country },
    })
  } else {
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
        const { data: userList } = await admin.auth.admin.listUsers()
        const existing = userList?.users.find((u) => u.email === normalizedEmail)
        if (!existing) throw new Error("Auth user exists but could not be found")
        userId = existing.id
        await admin.auth.admin.updateUserById(existing.id, {
          password: tempPassword,
          user_metadata: { country },
        })
      } else {
        throw createError
      }
    } else {
      userId = createdUser.user?.id
    }
  }

  if (!userId) {
    return NextResponse.json({ success: false, error: "Unable to resolve user id" }, { status: 500 })
  }

  await saveIntakeSession(admin, {
    userId,
    sessionId,
    trigger,
    responses,
    pathway: null,
  })

  let airtableRecordId = existingProfile?.airtable_record_id ?? null
  try {
    const airtableResult = await syncIntakeToAirtable({
      responses,
      sessionId,
      email: normalizedEmail,
      userId,
      phase: 1,
      airtableRecordId,
    })
    airtableRecordId = airtableResult.recordId
  } catch (airtableError) {
    console.error("[INTAKE] Phase 1 Airtable sync failed:", airtableError)
  }

  await upsertProfile(admin, {
    userId,
    email: normalizedEmail,
    country,
    fullName,
    onboardingComplete: false,
    airtableRecordId,
  })

  const { data: resetRow, error: tokenError } = await admin
    .from("password_resets")
    .insert({ user_id: userId })
    .select("token")
    .single()

  if (tokenError || !resetRow?.token) {
    throw tokenError ?? new Error("Token insert returned no data")
  }

  const resetUrl = `${getSiteUrl()}/auth/set-password?token=${resetRow.token}`

  let emailSent = false
  let emailError: string | undefined
  try {
    await sendPasswordSetupEmail(normalizedEmail, tempPassword, resetUrl)
    emailSent = true
  } catch (mailErr) {
    emailError = String(mailErr)
  }

  return NextResponse.json({
    success: true,
    phase: 1,
    isExistingUser,
    emailSent,
    emailError,
  })
}

async function handlePhaseTwo(body: {
  responses?: unknown
  sessionId?: string
  trigger?: string
}) {
  const supabase = await createClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 })
  }

  const { responses: rawResponses, sessionId, trigger } = body
  const incomingResponses = normalizeResponses(rawResponses)

  if (!sessionId || incomingResponses.length === 0) {
    return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
  }

  const admin = createAdminClient()
  const profile = await getProfileByUserId(admin, user.id)

  if (!profile) {
    return NextResponse.json({ success: false, error: "Profile not found" }, { status: 404 })
  }

  const { data: existingSession, error: sessionError } = await admin
    .from("intake_sessions")
    .select("responses, resource_state")
    .eq("user_id", user.id)
    .maybeSingle()

  if (sessionError) {
    throw sessionError
  }

  if (!existingSession) {
    return NextResponse.json({ success: false, error: "Phase 1 intake not found" }, { status: 400 })
  }

  const mergedResponses = mergeResponses(existingSession.responses, incomingResponses)

  if (!isPhaseTwoComplete(mergedResponses)) {
    return NextResponse.json(
      { success: false, error: "Please answer all remaining questions" },
      { status: 400 },
    )
  }

  const pathway = derivePathway(mergedResponses)

  await saveIntakeSession(admin, {
    userId: user.id,
    sessionId,
    trigger,
    responses: mergedResponses,
    pathway,
    resourceState: (existingSession.resource_state as Record<string, unknown>) ?? {},
  })

  let airtableRecordId = profile.airtable_record_id
  try {
    const airtableResult = await syncIntakeToAirtable({
      responses: mergedResponses,
      sessionId,
      email: profile.email,
      userId: user.id,
      phase: 2,
      airtableRecordId,
    })
    airtableRecordId = airtableResult.recordId
  } catch (airtableError) {
    console.error("[INTAKE] Phase 2 Airtable sync failed:", airtableError)
  }

  await upsertProfile(admin, {
    userId: user.id,
    email: profile.email,
    country: profile.country ?? getResponseText(mergedResponses, "country"),
    fullName: profile.full_name ?? getResponseText(mergedResponses, "full-name"),
    onboardingComplete: true,
    airtableRecordId,
  })

  return NextResponse.json({
    success: true,
    phase: 2,
    onboardingComplete: true,
  })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const phase = body.phase === 2 ? 2 : 1

    if (phase === 2) {
      return await handlePhaseTwo(body)
    }

    return await handlePhaseOne(body)
  } catch (error) {
    console.error("[INTAKE] Fatal:", error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
