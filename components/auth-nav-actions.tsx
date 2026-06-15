"use client"

import { LogOut } from "lucide-react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

interface AuthNavActionsProps {
  className?: string
  layout?: "desktop" | "mobile"
  hideMyResults?: boolean
}

export function AuthNavActions({
  className = "",
  layout = "desktop",
  hideMyResults = false,
}: AuthNavActionsProps) {
  const { isAuthenticated, loading, logout } = useAuth()
  const pathname = usePathname()
  const onMyResultsPage = pathname === "/my-results"
  const showMyResults = isAuthenticated && !hideMyResults && !onMyResultsPage

  if (loading) {
    return <div className={`h-9 w-24 ${className}`} />
  }

  if (isAuthenticated) {
    if (layout === "mobile") {
      return (
        <div className={`flex flex-col gap-3 ${className}`}>
          {showMyResults && (
            <a
              href="/my-results"
              className="inline-block rounded-lg bg-[#0071BC] px-4 py-2 text-sm font-montserrat font-bold text-white hover:bg-[#005A94] transition-colors text-center"
            >
              My results
            </a>
          )}
          <button
            type="button"
            onClick={() => void logout()}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-montserrat font-medium text-gray-700 hover:border-[#0071BC] hover:text-[#0071BC] transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>
      )
    }

    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {showMyResults && (
          <a
            href="/my-results"
            className="rounded-lg bg-[#0071BC] px-4 py-2 text-sm font-montserrat font-bold text-white hover:bg-[#005A94] transition-colors"
          >
            My results
          </a>
        )}
        <button
          type="button"
          onClick={() => void logout()}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-montserrat font-medium text-gray-700 hover:border-[#0071BC] hover:text-[#0071BC] transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </div>
    )
  }

  if (layout === "mobile") {
    return (
      <a
        href="/auth/signin"
        className={`inline-block rounded-lg border border-[#0071BC] px-4 py-2 text-sm font-montserrat font-bold text-[#0071BC] hover:bg-[#0071BC] hover:text-white transition-colors text-center ${className}`}
      >
        Sign in
      </a>
    )
  }

  return (
    <a
      href="/auth/signin"
      className={`rounded-lg border border-[#0071BC] px-4 py-2 text-sm font-montserrat font-bold text-[#0071BC] hover:bg-[#0071BC] hover:text-white transition-colors ${className}`}
    >
      Sign in
    </a>
  )
}
