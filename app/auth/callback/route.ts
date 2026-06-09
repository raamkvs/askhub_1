import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/"

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
  console.log("[CALLBACK] Step 1 — Hit /auth/callback")
  console.log("[CALLBACK] code present:", Boolean(code), "| next:", next)

  if (!code) {
    console.log("[CALLBACK] ✗ No code in URL — redirecting to /?auth_error=1")
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")
    return NextResponse.redirect(`${origin}/?auth_error=1`)
  }

  console.log("[CALLBACK] Step 2 — Exchanging code for session...")
  const supabase = await createClient()
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.log("[CALLBACK] ✗ exchangeCodeForSession failed:", error.message)
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")
    return NextResponse.redirect(`${origin}/?auth_error=1`)
  }

  console.log("[CALLBACK] Step 2 — Session established ✓ userId:", data.user?.id)
  console.log("[CALLBACK] Step 3 — Redirecting to:", `${origin}${next}`)
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")
  return NextResponse.redirect(`${origin}${next}`)
}
