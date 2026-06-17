import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { getProfileByUserId } from "@/lib/auth/profile"

export async function GET() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 })
    }

    const admin = createAdminClient()
    const profile = await getProfileByUserId(admin, user.id)

    const { data, error } = await supabase
      .from("intake_sessions")
      .select("session_id, trigger, responses, pathway, resource_state, updated_at")
      .eq("user_id", user.id)
      .maybeSingle()

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      session: data,
      onboardingComplete: Boolean(profile?.onboarding_complete),
      profile: profile
        ? {
            fullName: profile.full_name,
            country: profile.country,
            email: profile.email,
          }
        : null,
    })
  } catch (error) {
    console.error("Failed to load intake session:", error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const { resourceState, sessionId } = await req.json()

    if (!sessionId || typeof resourceState !== "object") {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createClient()
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 })
    }

    const { data, error } = await supabase
      .from("intake_sessions")
      .update({ resource_state: resourceState })
      .eq("session_id", sessionId)
      .eq("user_id", user.id)
      .select("session_id, resource_state, updated_at")
      .maybeSingle()

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true, session: data })
  } catch (error) {
    console.error("Failed to update intake session:", error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
