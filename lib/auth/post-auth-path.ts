/** Resolve where to send a user immediately after sign-in or set-password. */
export async function resolvePostAuthPath(): Promise<string> {
  try {
    const response = await fetch("/api/intake/session")
    if (response.status === 401) {
      return "/auth/signin"
    }

    const result = await response.json()
    if (!result.success) {
      return "/auth/signin"
    }

    if (result.onboardingComplete) {
      return "/my-results"
    }

    return "/onboarding"
  } catch {
    return "/auth/signin"
  }
}
