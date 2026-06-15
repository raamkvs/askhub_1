"use client"

import { useEffect, useState } from "react"
import { LogOut, X } from "lucide-react"
import type { PathwayResult } from "@/lib/pathway"
import { getPathwayDisplay } from "@/lib/pathway-config"
import {
  formatNameFromEmail,
  getInitials,
  getProfileSubtitle,
  getProfileTags,
} from "@/lib/pathway-profile"
import type { MatchedResource } from "@/lib/matching/types"
import type { IntakeResponse } from "@/lib/intake/responses"
import { CuratedResourceCard } from "@/components/curated-resource-card"
import { useAuth } from "@/hooks/use-auth"

interface PathwayResultsSectionProps {
  pathway: PathwayResult
  responses: IntakeResponse[]
  email?: string
  secondaryNeed?: string | null
  showWelcomeBanner?: boolean
  showProfileHeader?: boolean
}

export function PathwayResultsSection({
  pathway,
  responses,
  email,
  secondaryNeed = null,
  showWelcomeBanner = false,
  showProfileHeader = false,
}: PathwayResultsSectionProps) {
  const [welcomeVisible, setWelcomeVisible] = useState(showWelcomeBanner)
  const [resources, setResources] = useState<MatchedResource[]>([])
  const [isOtherCountry, setIsOtherCountry] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { logout } = useAuth()
  const display = getPathwayDisplay(pathway.type)
  const displayName = formatNameFromEmail(email)
  const subtitle = getProfileSubtitle(responses)
  const tags = getProfileTags(responses)

  useEffect(() => {
    const loadResources = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch("/api/resources", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ responses, secondaryNeed }),
        })
        const result = await response.json()

        if (!response.ok || !result.success) {
          throw new Error(result.error ?? "Failed to load resources")
        }

        setResources(result.resources ?? [])
        setIsOtherCountry(Boolean(result.isOtherCountry))
      } catch (fetchError) {
        console.error("[RESOURCES] Client match failed:", fetchError)
        setError("We couldn't load your matched resources right now. Please try again shortly.")
        setResources([])
      } finally {
        setLoading(false)
      }
    }

    void loadResources()
  }, [responses, secondaryNeed])

  return (
    <div className="space-y-6">
      {welcomeVisible ? (
        <div className="relative rounded-lg border border-[#B8E0F5] bg-[#D9F1FF] px-4 py-3 pr-10">
          <p className="text-sm leading-relaxed text-[#4A4D52]">
            👋 Welcome to your profile, {displayName.split(" ")[0]}! You&apos;ve been matched to the{" "}
            <strong>{display.title}</strong> pathway. Below are resources curated for you based on your Fit Finder
            responses.
          </p>
          <button
            type="button"
            onClick={() => setWelcomeVisible(false)}
            className="absolute right-3 top-3 text-gray-500 transition-colors hover:text-gray-800"
            aria-label="Dismiss welcome message"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : null}

      {showProfileHeader ? (
        <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0071BC] text-sm font-bold text-white">
              {getInitials(displayName)}
            </div>
            <div>
              <p className="font-montserrat text-lg font-bold text-black">{displayName}</p>
              <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700"
              >
                {tag}
              </span>
            ))}
            <button
              type="button"
              onClick={() => void logout()}
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-3 py-1.5 text-sm font-montserrat font-medium text-gray-700 transition-colors hover:border-[#0071BC] hover:text-[#0071BC]"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      ) : null}

      <section className="relative overflow-hidden rounded-xl bg-[#0071BC] p-6 text-white">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-white/80">YOUR PATHWAY</p>
          <h2 className="mb-3 font-montserrat text-3xl font-bold">{display.title}</h2>
          <p className="text-sm leading-relaxed text-white/90">{display.description}</p>
        </div>
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#005A94]/60" />
        <div className="absolute bottom-0 right-16 h-20 w-20 rounded-full bg-[#005A94]/40" />
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="font-montserrat text-xl font-bold text-black">Your resources</h2>
          <p className="text-sm text-gray-500">
            {loading
              ? "Finding your matches..."
              : `${resources.length} tailored to your pathway`}
          </p>
        </div>

        {isOtherCountry ? (
          <div className="mb-4 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-relaxed text-[#4A4D52]">
            We surface resources available globally to you. The full priority-country resource set unlocks for innovators
            based in our 18 partner countries.
          </div>
        ) : null}

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-56 animate-pulse rounded-xl border border-gray-200 bg-gray-50"
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {error}
          </div>
        ) : resources.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-6 text-center text-sm text-gray-600">
            <p className="mb-2 font-medium text-gray-800">We&apos;re working on more resources for you.</p>
            <p>Try updating your profile answers or check back soon as our catalogue grows.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {resources.map((resource) => (
              <CuratedResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
