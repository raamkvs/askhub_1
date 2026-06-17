"use client"

import { Check } from "lucide-react"
import { getPasswordRequirements } from "@/lib/auth/password"
import { cn } from "@/lib/utils"

interface PasswordRequirementsListProps {
  password: string
}

export function PasswordRequirementsList({ password }: PasswordRequirementsListProps) {
  const requirements = getPasswordRequirements(password)

  const items = [
    { key: "minLength", label: "At least 8 characters", met: requirements.minLength },
    { key: "hasLetter", label: "At least one letter", met: requirements.hasLetter },
    { key: "hasNumber", label: "At least one number", met: requirements.hasNumber },
  ]

  return (
    <ul className="space-y-1.5 rounded-lg bg-gray-50 px-3 py-2.5">
      {items.map((item) => (
        <li
          key={item.key}
          className={cn(
            "flex items-center gap-2 text-xs font-montserrat transition-colors",
            item.met ? "text-green-700" : "text-gray-500",
          )}
        >
          <Check className={cn("h-3.5 w-3.5", item.met ? "opacity-100" : "opacity-30")} />
          {item.label}
        </li>
      ))}
    </ul>
  )
}
