export interface PasswordRequirements {
  minLength: boolean
  hasLetter: boolean
  hasNumber: boolean
}

export function getPasswordRequirements(password: string): PasswordRequirements {
  return {
    minLength: password.length >= 8,
    hasLetter: /[a-zA-Z]/.test(password),
    hasNumber: /\d/.test(password),
  }
}

export function isPasswordValid(password: string): boolean {
  const req = getPasswordRequirements(password)
  return req.minLength && req.hasLetter && req.hasNumber
}

export function getPasswordValidationError(password: string): string | null {
  const req = getPasswordRequirements(password)
  if (!req.minLength) return "Password must be at least 8 characters."
  if (!req.hasLetter) return "Password must include at least one letter."
  if (!req.hasNumber) return "Password must include at least one number."
  return null
}
