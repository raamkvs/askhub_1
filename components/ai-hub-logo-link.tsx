interface AiHubLogoLinkProps {
  className?: string
}

export function AiHubLogoLink({ className = "h-12 w-auto" }: AiHubLogoLinkProps) {
  return (
    <a
      href="https://aihubfordevelopment.org/"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex"
    >
      <img
        src="/images/ai-hub-logo-updated.png"
        alt="AI Hub for Sustainable Development"
        className={className}
      />
    </a>
  )
}
