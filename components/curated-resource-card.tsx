import { BookOpen, GraduationCap, Rocket, Server, Target } from "lucide-react"
import type { MatchedResource } from "@/lib/matching/types"
import { Button } from "@/components/ui/button"

function CategoryIcon({ category }: { category: string }) {
  const className = "h-4 w-4 text-[#0071BC]"
  const normalized = category.toLowerCase()

  if (normalized.includes("compute") || normalized.includes("cloud")) {
    return <Server className={className} />
  }
  if (normalized.includes("train") || normalized.includes("learn") || normalized.includes("skill")) {
    return <GraduationCap className={className} />
  }
  if (normalized.includes("program")) {
    return <Target className={className} />
  }
  if (normalized.includes("accelerat") || normalized.includes("fund") || normalized.includes("partner")) {
    return <Rocket className={className} />
  }

  return <BookOpen className={className} />
}

interface CuratedResourceCardProps {
  resource: MatchedResource
}

export function CuratedResourceCard({ resource }: CuratedResourceCardProps) {
  const isExternal = resource.primaryAction.href.startsWith("http")
  const categoryLabel = resource.category.toUpperCase()

  return (
    <article className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-gray-600">
          <CategoryIcon category={resource.category} />
          <span>{categoryLabel}</span>
        </div>
        <span className="rounded-full bg-[#0071BC] px-2.5 py-1 text-[10px] font-bold tracking-wide text-white">
          {resource.statusLabel}
        </span>
      </div>

      <div className="mb-4 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <h3 className="font-montserrat text-lg font-bold text-black">{resource.title}</h3>
          {resource.tag ? (
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
              {resource.tag}
            </span>
          ) : null}
        </div>
        <p className="mb-3 text-sm text-gray-500">
          {resource.provider} · {resource.region}
        </p>
        {resource.subCategory ? (
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">{resource.subCategory}</p>
        ) : null}
        <p className="text-sm leading-relaxed text-[#6C6F75]">{resource.description}</p>
        {resource.reasonChips.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {resource.reasonChips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-[#B8E0F5] bg-[#D9F1FF] px-2.5 py-0.5 text-xs font-medium text-[#0071BC]"
              >
                {chip}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
        <Button
          variant="outline"
          className="border-[#0071BC] bg-transparent font-montserrat font-bold text-[#0071BC] hover:bg-[#D9F1FF]"
          asChild
        >
          <a
            href={resource.primaryAction.href}
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {resource.primaryAction.label}
          </a>
        </Button>
        <a
          href={resource.detailsHref}
          {...(resource.detailsHref.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="text-sm font-medium text-gray-500 transition-colors hover:text-[#0071BC]"
        >
          View details →
        </a>
      </div>
    </article>
  )
}
