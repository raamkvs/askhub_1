import { Resend } from "resend"

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "noreply@ask.aihubfordevelopment.org"
const FROM = `AskHub <${FROM_EMAIL}>`

function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error("RESEND_API_KEY is not set")
  return new Resend(apiKey)
}

interface SendEmailOptions {
  to: string
  subject: string
  html: string
  text: string
}

function isTransientNetworkError(message: string): boolean {
  return (
    message.includes("could not be resolved") ||
    message.includes("fetch failed") ||
    message.includes("ECONNRESET") ||
    message.includes("ETIMEDOUT") ||
    message.includes("ENOTFOUND") ||
    message.includes("EAI_AGAIN")
  )
}

async function sendEmail(opts: SendEmailOptions): Promise<void> {
  const resend = getResend()
  const maxAttempts = 3
  let lastMessage = "Unknown Resend error"

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const { error } = await resend.emails.send({
      from: FROM,
      to: [opts.to],
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
    })

    if (!error) return

    lastMessage = error.message

    if (attempt < maxAttempts && isTransientNetworkError(lastMessage)) {
      console.warn(`[RESEND] Attempt ${attempt} failed (${lastMessage}), retrying...`)
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt))
      continue
    }

    throw new Error(`Resend error: ${lastMessage}`)
  }

  throw new Error(`Resend error: ${lastMessage}`)
}

export async function sendPasswordSetupEmail(
  to: string,
  tempPassword: string,
  resetUrl: string,
): Promise<void> {
  const subject = "Set up your AskHub account password"

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: 'Montserrat', Arial, sans-serif; background: #f9f9f9; margin: 0; padding: 0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f9; padding: 32px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; border:1px solid #e5e7eb; padding:40px 32px;">
          <tr>
            <td>
              <h2 style="margin:0 0 8px; font-size:20px; color:#0071BC;">Welcome to AskHub</h2>
              <p style="color:#374151; font-size:14px; line-height:1.6; margin:0 0 24px;">
                Your account has been created. Use the link below to set a permanent password for your account.
              </p>

              <div style="background:#f0f7ff; border:1px solid #bfdbfe; border-radius:6px; padding:16px 20px; margin-bottom:24px;">
                <p style="margin:0 0 4px; font-size:12px; color:#6b7280; text-transform:uppercase; letter-spacing:0.05em;">Temporary password</p>
                <p style="margin:0; font-size:22px; font-weight:bold; letter-spacing:0.1em; color:#1e3a5f; font-family:monospace;">${tempPassword}</p>
                <p style="margin:8px 0 0; font-size:12px; color:#6b7280;">Keep this safe — you may need it if the link below expires.</p>
              </div>

              <a href="${resetUrl}"
                 style="display:inline-block; background:#0071BC; color:#ffffff; font-weight:bold; font-size:15px; padding:14px 28px; border-radius:6px; text-decoration:none; margin-bottom:24px;">
                Set my password
              </a>

              <p style="color:#6b7280; font-size:12px; line-height:1.6; margin:0 0 8px;">
                This link expires in <strong>24 hours</strong>. If you did not request this, you can safely ignore this email.
              </p>
              <p style="color:#9ca3af; font-size:11px; margin:0;">
                Powered by UNDP AI Hub for Sustainable Development
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()

  const text = `Welcome to AskHub

Your account has been created. Use the link below to set a permanent password.

Temporary password: ${tempPassword}

Set password: ${resetUrl}

This link expires in 24 hours.
`

  await sendEmail({ to, subject, html, text })
}

export async function sendPasswordResetEmail(
  to: string,
  resetUrl: string,
): Promise<void> {
  const subject = "Reset your AskHub password"

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: 'Montserrat', Arial, sans-serif; background: #f9f9f9; margin: 0; padding: 0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f9; padding: 32px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; border:1px solid #e5e7eb; padding:40px 32px;">
          <tr>
            <td>
              <h2 style="margin:0 0 8px; font-size:20px; color:#0071BC;">Reset your AskHub password</h2>
              <p style="color:#374151; font-size:14px; line-height:1.6; margin:0 0 24px;">
                Click the link below to set a new password for your AskHub account.
              </p>
              <a href="${resetUrl}"
                 style="display:inline-block; background:#0071BC; color:#ffffff; font-weight:bold; font-size:15px; padding:14px 28px; border-radius:6px; text-decoration:none; margin-bottom:24px;">
                Set my password
              </a>
              <p style="color:#6b7280; font-size:12px; line-height:1.6; margin:0;">
                This link expires in <strong>24 hours</strong>. If you did not request this, ignore this email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()

  const text = `Reset your AskHub password\n\nClick the link to set a new password:\n${resetUrl}\n\nThis link expires in 24 hours.`

  await sendEmail({ to, subject, html, text })
}
