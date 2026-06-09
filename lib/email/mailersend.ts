const MAILERSEND_API_URL = "https://api.mailersend.com/v1/email"
const FROM_EMAIL =
  process.env.MAILERSEND_FROM_EMAIL ?? "noreply@test-3m5jgrorn6dgdpyo.mlsender.net"
const FROM_NAME = "AskHub"

interface SendEmailOptions {
  to: string
  subject: string
  html: string
  text: string
}

async function sendEmail(opts: SendEmailOptions): Promise<void> {
  const apiKey = process.env.MailerSend_API_KEY
  if (!apiKey) throw new Error("MailerSend_API_KEY is not set")

  const res = await fetch(MAILERSEND_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: { email: FROM_EMAIL, name: FROM_NAME },
      to: [{ email: opts.to }],
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`MailerSend error ${res.status}: ${body}`)
  }
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
