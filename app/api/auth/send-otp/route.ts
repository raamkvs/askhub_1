import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
  console.log("[SEND-OTP] Request received")

  try {
    const { email } = await req.json()
    console.log("[SEND-OTP] Email:", email)

    if (!email || typeof email !== "string") {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 })
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !anonKey) {
      console.log("[SEND-OTP] ✗ Missing Supabase env vars")
      return NextResponse.json({ success: false, error: "Server misconfiguration" }, { status: 500 })
    }

    console.log("[SEND-OTP] Supabase URL:", url)
    console.log("[SEND-OTP] Anon key prefix:", anonKey.slice(0, 20) + "...")

    // Use the anon client — OTP must go through the public auth endpoint
    const supabase = createClient(url, anonKey)

    console.log("[SEND-OTP] Calling signInWithOtp...")
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { shouldCreateUser: false },
    })

    if (error) {
      console.log("[SEND-OTP] ✗ signInWithOtp error:", {
        message: error.message,
        status: error.status,
        name: error.name,
      })
      return NextResponse.json({ success: false, error: error.message, status: error.status }, { status: 200 })
    }

    console.log("[SEND-OTP] ✓ OTP sent successfully")
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[SEND-OTP] ✗ Fatal error:", err)
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
}
