"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Lightbulb,
  CheckCircle,
  ExternalLink,
  BookOpen,
  Users,
  GraduationCap,
  Server,
  Database,
  MessageCircle,
  DollarSign,
  TrendingUp,
  Mail,
  Target,
  Rocket,
  FileText,
  ChevronDown,
} from "lucide-react"
import { AuthModal } from "@/components/auth-modal"
import { createClient } from "@/lib/supabase/client"

interface UserResponse {
  questionId: string
  question: string
  answer: string
  answerText: string
}

interface RecommendationResultsProps {
  responses: UserResponse[]
  sessionId: string
  onBack: () => void
  isExistingUser?: boolean
  otpSent?: boolean
  otpError?: string
}

type PathwayType = "curious" | "builder" | "compute-ready"

interface Pathway {
  type: PathwayType
  score: number
  responses: UserResponse[]
}

// List of African countries
const AFRICAN_COUNTRIES = [
  "Algeria",
  "Angola",
  "Benin",
  "Botswana",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cameroon",
  "Central African Republic",
  "Chad",
  "Comoros",
  "Congo",
  "Democratic Republic of the Congo",
  "Djibouti",
  "Egypt",
  "Equatorial Guinea",
  "Eritrea",
  "Eswatini",
  "Ethiopia",
  "Gabon",
  "Gambia",
  "Ghana",
  "Guinea",
  "Guinea-Bissau",
  "Ivory Coast",
  "Kenya",
  "Lesotho",
  "Liberia",
  "Libya",
  "Madagascar",
  "Malawi",
  "Mali",
  "Mauritania",
  "Mauritius",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Niger",
  "Nigeria",
  "Rwanda",
  "Sao Tome and Principe",
  "Senegal",
  "Seychelles",
  "Sierra Leone",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Sudan",
  "Tanzania",
  "Togo",
  "Tunisia",
  "Uganda",
  "Zambia",
  "Zimbabwe",
]

export function RecommendationResults({
  responses,
  sessionId,
  onBack,
  isExistingUser = false,
  otpSent = false,
  otpError,
}: RecommendationResultsProps) {
  const [showForm, setShowForm] = useState(false)
  const [selectedNeed, setSelectedNeed] = useState<string>("")
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedHelpOption, setSelectedHelpOption] = useState<string | null>(null)
  const [showProgrammesDropdown, setShowProgrammesDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // If user is already authenticated (e.g. returned from magic link), mark immediately
  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setIsAuthenticated(true)
    })
  }, [])

  // Scroll functions for navigation
  const scrollToComputeAccelerator = () => {
    window.location.href = "/#compute-accelerator-section"
  }

  const scrollToInfrastructureBuilder = () => {
    window.location.href = "/#infrastructure-builder-section"
  }

  const goToAskHub = () => {
    onBack() // Use the existing onBack function
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProgrammesDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const helpOptions = [
    "Hire talent",
    "Learn AI skills",
    "Get compute resources",
    "Cloud data storage",
    "Connect with experts",
    "Source quality data",
    "I need investment",
    "Scale your startup",
    "Something else",
  ]

  const renderHelpContent = (option: string) => {
    switch (option) {
      case "Hire talent":
        return (
          <div className="space-y-2">
            <p>
              Use{" "}
              <a
                href="https://zindi.africa/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0071BC] hover:underline"
              >
                Zindi
              </a>
              , the largest professional network for data scientists in Africa!
            </p>
          </div>
        )
      case "Learn AI skills":
        return (
          <div className="space-y-2">
            <p>
              Try{" "}
              <a
                href="https://aws.amazon.com/about-aws/our-impact/scholars/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0071BC] hover:underline"
              >
                AWS AI/ML Scholars
              </a>{" "}
              to learn from AI experts and get hands-on experience on real-world projects.
            </p>
            <p>
              Explore{" "}
              <a
                href="https://aiskillsnavigator.microsoft.com/en-us"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0071BC] hover:underline"
              >
                Microsoft AI Fluency
              </a>{" "}
              learning path for in-demand AI skills.
            </p>
            <p>
              Validate your AI, ML, and generative AI knowledge with the{" "}
              <a
                href="https://aws.amazon.com/certification/certified-ai-practitioner/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0071BC] hover:underline"
              >
                AWS Certified AI Practitioner
              </a>{" "}
              Certification.
            </p>
          </div>
        )
      case "Get compute resources":
        return (
          <div className="space-y-2">
            <p>
              <a
                href="https://www.hpc.cineca.it/training/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0071BC] hover:underline"
              >
                CINECA
              </a>{" "}
              is home to the largest High-Performance Computing facility in Italy. They offer a range of training,
              including online events.
            </p>
            <p>
              Take advantage of the latest technical training from{" "}
              <a
                href="https://www.nvidia.com/en-gb/training/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0071BC] hover:underline"
              >
                NVIDIA
              </a>{" "}
              to gain hands-on experience and expert knowledge in AI, data science, and more.
            </p>
            <p>
              Use{" "}
              <a
                href="https://aws.amazon.com/what-is-cloud-computing/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0071BC] hover:underline"
              >
                AWS training and certification programs
              </a>{" "}
              to learn the fundamentals of compute and machine learning.
            </p>
            <p>
              Assess your organization's readiness for cloud solutions with the{" "}
              <a
                href="https://cloudreadiness.amazonaws.com/#/cart"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0071BC] hover:underline"
              >
                AWS Cloud Readiness Assessment
              </a>
              .
            </p>
          </div>
        )
      case "Cloud data storage":
        return (
          <div className="space-y-2">
            <p>
              <a
                href="https://www.cassava.ai/cassava-intelligence/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0071BC] hover:underline"
              >
                Cassava
              </a>{" "}
              provides compute credits and resources to organizations and businesses across Africa and the Middle East.
            </p>
            <p>
              Access{" "}
              <a
                href="https://cloud.google.com/free"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0071BC] hover:underline"
              >
                Google Cloud Credits
              </a>{" "}
              — available to academics, startups, nonprofits, and individuals experimenting with AI.
            </p>
            <p>
              <a
                href="https://aws.amazon.com/free/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0071BC] hover:underline"
              >
                AWS Free Tier
              </a>{" "}
              offers 750 free compute hours per month.
            </p>
          </div>
        )
      case "Connect with experts":
        return (
          <div className="space-y-2">
            <p>
              Get in touch with{" "}
              <a
                href="https://axumai.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0071BC] hover:underline"
              >
                Axum
              </a>
              , which empowers Africans with custom open-source solutions and a team of experts.
            </p>
            <p>
              Join{" "}
              <a
                href="https://africonnect.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0071BC] hover:underline"
              >
                AfriLabs Connect
              </a>
              , the largest community of innovation enablers in Africa.
            </p>
          </div>
        )
      case "Source quality data":
        return (
          <div className="space-y-2">
            <p>
              Join{" "}
              <a
                href="https://www.masakhane.io/home"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0071BC] hover:underline"
              >
                Masakhane
              </a>{" "}
              to support African NLP research.
            </p>
            <p>
              Find the largest public Arabic NLP dataset catalog on{" "}
              <a
                href="https://github.com/ARBML/masader"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0071BC] hover:underline"
              >
                GitHub
              </a>
              .
            </p>
            <p>
              Use publicly available datasets from the{" "}
              <a
                href="https://miiafrica.org/resources/data-science/data-sets/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0071BC] hover:underline"
              >
                Machine Intelligence Institute of Africa
              </a>
              .
            </p>
            <p>
              Explore this{" "}
              <a
                href="https://medium.com/@amnahhmohammed/useful-arabic-datasets"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0071BC] hover:underline"
              >
                Medium article
              </a>{" "}
              with curated Arabic datasets for NLP.
            </p>
            <p>
              Access 18 newly released datasets from the{" "}
              <a
                href="https://lacunafund.org/lacuna-fund-releases-18-new-ai-datasets"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0071BC] hover:underline"
              >
                Lacuna Fund
              </a>{" "}
              for agriculture, health, climate, and NLP domains.
            </p>
          </div>
        )
      case "I need investment":
        return (
          <div className="space-y-2">
            <p>
              <a
                href="https://seedstars-africa.vc/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0071BC] hover:underline"
              >
                Seedstars
              </a>{" "}
              offers early-stage funding for African startups across sectors.
            </p>
            <p>
              Apply for equity funding and AI acceleration via the{" "}
              <a
                href="https://labs.google/aifuturesfund"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0071BC] hover:underline"
              >
                Google AI Futures Fund
              </a>
              .
            </p>
            <p>
              <a
                href="https://www.funema.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0071BC] hover:underline"
              >
                Funema
              </a>{" "}
              has provided over $2 million in loans to 300+ small businesses for fast access to working capital.
            </p>
            <p>
              We're scouting more funding sources — sign up to our mailing list and we'll notify you of new
              opportunities.
            </p>
          </div>
        )
      case "Scale your startup":
        return (
          <div className="space-y-2">
            <p>
              Accelerate growth with the{" "}
              <a
                href="https://labs.google/aifuturesfund"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0071BC] hover:underline"
              >
                Google AI Futures Fund
              </a>{" "}
              through early access to DeepMind's AI models and funding.
            </p>
            <p>
              Hire talent with flexibility using{" "}
              <a
                href="https://www.selatech.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0071BC] hover:underline"
              >
                Selatech
              </a>
              , a platform offering affordable tech hiring solutions.
            </p>
          </div>
        )
      case "Something else":
        return (
          <div>
            <p>
              Unfortunately, I don't have an answer for you yet. Sign up and I'll email you once more answers are
              available.
            </p>
          </div>
        )
      default:
        return null
    }
  }

  // Auto-scroll to top when component mounts (when results are shown)
  useEffect(() => {
    // Scroll to top immediately when the outcome is generated
    window.scrollTo({ top: 0, behavior: "smooth" })

    // For iOS Safari and some mobile browsers that might need a slight delay
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAuthModal(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const intakeEmail = responses.find((response) => response.questionId === "email")?.answerText

  const persistResourceState = async (resourceState: Record<string, unknown>) => {
    if (!isAuthenticated) return

    try {
      await fetch("/api/intake/session", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          resourceState,
        }),
      })
    } catch (error) {
      console.error("Failed to persist resource state:", error)
    }
  }

  useEffect(() => {
    if (!isAuthenticated) return

    void persistResourceState({
      selectedNeed,
      selectedHelpOption,
    })
  }, [isAuthenticated, selectedNeed, selectedHelpOption])

  // Get user responses
  const country = responses.find((r) => r.questionId === "country")?.answer
  const role = responses.find((r) => r.questionId === "role")?.answer
  const aiExperience = responses.find((r) => r.questionId === "ai-experience")?.answer
  const computeExperience = responses.find((r) => r.questionId === "compute-experience")?.answer
  const teamSize = responses.find((r) => r.questionId === "team-size")?.answer

  // Check if user is from Africa
  const isFromAfrica = country && AFRICAN_COUNTRIES.includes(country)

  // Determine which outcome to show
  const showComputeAccelerator = () => {
    // Only show for African countries
    if (!isFromAfrica) return false

    const goodOrExpertCompute = computeExperience && ["ready", "advanced"].includes(computeExperience)
    const smallOrLargerTeam = teamSize && ["small", "medium", "large"].includes(teamSize)
    return goodOrExpertCompute && smallOrLargerTeam
  }

  const showInfrastructureBuilder = () => {
    // Only show for African countries AND infrastructure builders
    return isFromAfrica && role === "infrastructure"
  }

  const showEarlyStageResources = () => {
    return aiExperience && ["none", "getting-started", "not-sure"].includes(aiExperience)
  }

  const showStudentResources = () => {
    return role === "student"
  }

  // Add a new function to check for advanced teams with compute readiness
  const showAdvancedTeamResources = () => {
    return (
      isFromAfrica &&
      computeExperience &&
      ["good", "expert"].includes(computeExperience) &&
      teamSize &&
      ["small", "medium", "large"].includes(teamSize)
    )
  }

  // Check if we should show default case
  const showDefaultCase = () => {
    return (
      !showComputeAccelerator() &&
      !showInfrastructureBuilder() &&
      !showEarlyStageResources() &&
      !showStudentResources() &&
      !showAdvancedTeamResources()
    )
  }

  const handleNeedSelect = (need: string) => {
    setSelectedNeed(need)
    void persistResourceState({
      selectedNeed: need,
      selectedHelpOption,
    })
    // Scroll to top when a new need is selected
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 100)
  }

  // Filter out funding/investment options for Infrastructure Builders
  const needsOptions = [
    {
      id: "talent",
      text: "Hire talent",
      icon: <Users className="w-4 h-4" />,
      resources: [
        {
          name: "Zindi – the largest professional network for data scientists in Africa",
          url: "https://zindi.africa/",
        },
      ],
    },
    {
      id: "skills",
      text: "Learn AI skills",
      icon: <GraduationCap className="w-4 h-4" />,
      resources: [
        {
          name: "AWS AI/ML Scholars – real-world projects with expert guidance",
          url: "https://aws.amazon.com/about-aws/our-impact/scholars/",
        },
        {
          name: "Microsoft AI Fluency – guided learning paths",
          url: "https://aiskillsnavigator.microsoft.com/en-us",
        },
        {
          name: "AWS Certified AI Practitioner – validate your skills",
          url: "https://aws.amazon.com/certification/certified-ai-practitioner/",
        },
      ],
    },
    {
      id: "compute",
      text: "Get compute resources",
      icon: <Server className="w-4 h-4" />,
      resources: [
        {
          name: "CINECA Training Centre",
          url: "https://www.hpc.cineca.it/training/",
        },
        {
          name: "NVIDIA Training for AI and Data Science",
          url: "https://www.nvidia.com/en-gb/training/",
        },
        {
          name: "AWS Compute & ML Training",
          url: "https://aws.amazon.com/what-is-cloud-computing/",
        },
        {
          name: "AWS Cloud Readiness Assessment Tool",
          url: "https://cloudreadiness.amazonaws.com/#/cart",
        },
        {
          name: "Cassava – compute credits in Africa & the Middle East",
          url: "https://www.cassava.ai/cassava-intelligence/",
        },
        {
          name: "Google Cloud Credits – free tier access",
          url: "https://cloud.google.com/free",
        },
        {
          name: "AWS – free tier access",
          url: "https://aws.amazon.com/free",
        },
      ],
    },
    {
      id: "experts",
      text: "Connect with experts",
      icon: <MessageCircle className="w-4 h-4" />,
      resources: [
        {
          name: "Axum – open-source AI support and advisory",
          url: "https://axumai.org/",
        },
        {
          name: "AfriLabs Connect – innovation enabler community",
          url: "https://africonnect.net/",
        },
      ],
    },
    {
      id: "data",
      text: "Source quality data",
      icon: <Database className="w-4 h-4" />,
      resources: [
        {
          name: "Arabic NLP Datasets on GitHub",
          url: "https://github.com/ARBML/masader",
        },
        {
          name: "Masakhane – African language datasets and research",
          url: "https://www.masakhane.io/",
        },
        {
          name: "Arabic ML Datasets Overview (Medium article)",
          url: "https://medium.com/@amnahhmohammed/useful-arabic-datasets-for-machine-learning-engineers-working-in-nlp-d06ba6c5e96d",
        },
        {
          name: "Lacuna Fund AI Datasets for Agriculture, Climate, Health & NLP",
          url: "https://lacunafund.org/lacuna-fund-releases-18-new-ai-datasets-empowering-local-communities-to-tackle-challenges-in-agriculture-climate-health-and-language/",
        },
      ],
    },
    // Only show investment and scale options for non-Infrastructure Builders
    ...(role !== "infrastructure"
      ? [
          {
            id: "investment",
            text: "I need investment",
            icon: <DollarSign className="w-4 h-4" />,
            resources: [
              {
                name: "Seedstars – early-stage African startup funding",
                url: "https://seedstars-africa.vc/",
              },
              {
                name: "Google AI Futures Fund – equity funding and acceleration",
                url: "https://labs.google.com/aifuturesfund",
              },
              {
                name: "Funema – loans and working capital for African businesses",
                url: "https://www.funema.co/",
              },
            ],
          },
          {
            id: "scale",
            text: "Scale your startup",
            icon: <TrendingUp className="w-4 h-4" />,
            resources: [
              {
                name: "Google AI Futures Fund – early access to DeepMind resources",
                url: "https://labs.google.com/aifuturesfund",
              },
              {
                name: "Selatech – tech hiring for startups",
                url: "https://www.selatech.io/",
              },
            ],
          },
        ]
      : []),
    {
      id: "other",
      text: "Something else?",
      icon: <Mail className="w-4 h-4" />,
      resources: [
        {
          name: "Email us directly at aihubfordevelopment@undp.org",
          url: "mailto:aihubfordevelopment@undp.org",
        },
      ],
    },
  ]

  // Show specific resource section when a need is selected
  if (selectedNeed) {
    const selectedOption = needsOptions.find((option) => option.id === selectedNeed)

    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Left - AI Hub Logo */}
              <div className="flex items-center">
                <img
                  src="/images/ai-hub-logo-updated.png"
                  alt="AI Hub for Sustainable Development"
                  className="h-12 w-auto"
                />
              </div>

              {/* Right - Partner Logos */}
              <div className="flex items-center gap-6">
                <img
                  src="/images/mimit-logo-new.png"
                  alt="Ministry of Enterprises and Made in Italy"
                  className="h-12 w-auto"
                />
                <img src="/images/undp-logo.webp" alt="UNDP" className="h-12 w-auto" />
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8 pb-16 font-montserrat">
          <div className="mb-6">
            <Button variant="outline" onClick={onBack} className="font-montserrat font-bold rounded-lg bg-transparent">
              Back to homepage
            </Button>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* AI Coach Response */}
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                <img src="/images/chat-coach-icon.png" alt="AI Assistant" className="w-12 h-12" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">{/* Icon only, no text label */}</div>
                <div className="bg-[#D9F1FF] rounded-lg p-4 mb-6">
                  <p className="text-[#6C6F75] leading-relaxed font-montserrat">
                    {selectedOption?.id === "other"
                      ? "Need help with something else? Contact our team directly and we'll get back to you."
                      : `Great choice! Here are some curated resources for "${selectedOption?.text}":`}
                  </p>
                </div>
              </div>
            </div>

            {/* Resources Card */}
            <div className="border border-gray-200 shadow-sm mb-8 rounded-lg overflow-hidden">
              <div className="bg-[#D9F1FF] border-b border-[#0071BC] p-4">
                <h2 className="text-xl text-black flex items-center gap-2 font-montserrat font-bold">
                  {selectedOption?.icon}
                  {selectedOption?.text}
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {selectedOption?.resources.map((resource, index) => (
                    <div key={index} className="bg-blue-50 rounded-lg p-4">
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                      >
                        {resource.name}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Got another question about AI? */}
            {/* Back to questions */}
            <div className="text-center">
              <Button
                onClick={() => setSelectedNeed("")}
                variant="outline"
                className="font-montserrat text-gray-700 border-gray-300 hover:border-[#0071BC] hover:bg-blue-50"
              >
                ← Back to all questions
              </Button>
            </div>
          </div>
        </div>

        {/* Beta Note - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-200 px-4 py-2 z-40">
          <div className="container mx-auto">
            <p className="text-xs text-gray-600 font-montserrat text-center">
              <strong>BETA:</strong> This is a beta version of AskHub. We welcome your feedback to help us improve.
              Please send any comments or suggestions to{" "}
              <a href="mailto:aihubfordevelopment@undp.org" className="text-[#0071BC] hover:underline">
                aihubfordevelopment@undp.org
              </a>
            </p>
          </div>
        </div>

        {/* Signup Modal */}
        <AuthModal
          isOpen={showAuthModal}
          email={intakeEmail}
          forceOpen={!isAuthenticated}
          otpAlreadySent={otpSent}
          otpSendError={otpError}
          onAuthenticated={() => {
            setIsAuthenticated(true)
            setShowAuthModal(false)
          }}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left - AI Hub Logo */}
            <div className="flex items-center">
              <img
                src="/images/ai-hub-logo-updated.png"
                alt="AI Hub for Sustainable Development"
                className="h-12 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
              <button
                onClick={() => window.open("https://www.aihubfordevelopment.org/", "_blank")}
                className="text-gray-700 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium transition-all"
              >
                Official Launch
              </button>
              <div className="relative programmes-dropdown" ref={dropdownRef}>
                <button
                  className="text-gray-700 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium flex items-center gap-1 transition-all"
                  onClick={() => setShowProgrammesDropdown(!showProgrammesDropdown)}
                >
                  Programmes
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${showProgrammesDropdown ? "rotate-180" : ""}`}
                  />
                </button>
                {showProgrammesDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[400px]">
                    <div className="py-2">
                      <button
                        onClick={scrollToComputeAccelerator}
                        className="block w-full text-left px-4 py-3 hover:bg-gray-50 hover:font-bold font-montserrat text-gray-700 border-b border-gray-100 transition-all"
                      >
                        2025 Compute Accelerator Programme
                      </button>
                      <button
                        onClick={scrollToInfrastructureBuilder}
                        className="block w-full text-left px-4 py-3 hover:bg-gray-50 hover:font-bold font-montserrat text-gray-700 border-b border-gray-100 transition-all"
                      >
                        2025 AI Infrastructure Builder Programme
                      </button>
                      <a
                        href="https://www.aihubfordevelopment.org/green-compute-coalition"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-left px-4 py-3 hover:bg-gray-50 hover:font-bold font-montserrat text-gray-700 border-b border-gray-100 transition-all"
                      >
                        Africa Green Compute Coalition
                      </a>
                      <a
                        href="https://www.aihubfordevelopment.org/startup-accelerator-pilot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-left px-4 py-3 hover:bg-gray-50 hover:font-bold font-montserrat text-gray-700 border-b border-gray-100 transition-all"
                      >
                        2024 Startup Accelerator Pilot
                      </a>
                      <a
                        href="https://www.aihubfordevelopment.org/local-language-partnerships-accelerator-pilot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-left px-4 py-3 hover:bg-gray-50 hover:font-bold font-montserrat text-gray-700 transition-all"
                      >
                        2024 Local Language Partnerships Accelerator Pilot
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <a
                href="https://www.aihubfordevelopment.org/partnerships-for-ai-innovation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium transition-all"
              >
                Partnerships
              </a>
              <a
                href="https://www.aihubfordevelopment.org/highlights"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium transition-all"
              >
                Highlights
              </a>
              <button
                onClick={goToAskHub}
                className="text-gray-700 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium transition-all"
              >
                AskHub
              </button>
            </div>

            {/* Right - Partner Logos */}
            <div className="flex items-center gap-6">
              <img
                src="/images/mimit-logo-new.png"
                alt="Ministry of Enterprises and Made in Italy"
                className="h-12 w-auto"
              />
              <img src="/images/undp-logo.webp" alt="UNDP" className="h-12 w-auto" />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            {/* Mobile Menu Items */}
            <div className="flex flex-col items-start space-y-4 py-4">
              <button
                onClick={() => window.open("https://www.aihubfordevelopment.org/", "_blank")}
                className="text-gray-700 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium transition-all"
              >
                Official Launch
              </button>

              <div className="relative w-full">
                <button
                  className="text-gray-700 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium w-full justify-between flex items-center transition-all"
                  onClick={() => setShowProgrammesDropdown(!showProgrammesDropdown)}
                >
                  Programmes
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${showProgrammesDropdown ? "rotate-180" : ""}`}
                  />
                </button>
                {showProgrammesDropdown && (
                  <div className="mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 w-full">
                    <div className="py-1">
                      <button
                        onClick={scrollToComputeAccelerator}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-montserrat w-full text-left"
                      >
                        2025 Compute Accelerator Programme
                      </button>
                      <button
                        onClick={scrollToInfrastructureBuilder}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-montserrat w-full text-left"
                      >
                        2025 AI Infrastructure Builder Programme
                      </button>
                      <a
                        href="https://www.aihubfordevelopment.org/green-compute-coalition"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-montserrat"
                      >
                        Africa Green Compute Coalition
                      </a>
                      <a
                        href="https://www.aihubfordevelopment.org/startup-accelerator-pilot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-montserrat"
                      >
                        2024 Startup Accelerator Pilot
                      </a>
                      <a
                        href="https://www.aihubfordevelopment.org/local-language-partnerships-accelerator-pilot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-montserrat"
                      >
                        2024 Local Language Partnerships Accelerator Pilot
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <a
                href="https://www.aihubfordevelopment.org/partnerships-for-ai-innovation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium transition-all"
              >
                Partnerships
              </a>
              <a
                href="https://www.aihubfordevelopment.org/highlights"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium transition-all"
              >
                Highlights
              </a>
              <button
                onClick={goToAskHub}
                className="text-gray-700 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium transition-all"
              >
                AskHub
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 pb-16 font-montserrat">
        <div className="mb-6">
          <Button variant="outline" onClick={onBack} className="font-montserrat font-bold rounded-lg bg-transparent">
            Back to homepage
          </Button>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* AI Coach Response */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
              <img src="/images/chat-coach-icon.png" alt="AI Assistant" className="w-12 h-12" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">{/* Icon only, no text label */}</div>
              <div className="bg-[#D9F1FF] rounded-lg p-4 mb-6">
                <p className="text-[#6C6F75] leading-relaxed font-montserrat">
                  {showComputeAccelerator() &&
                    "Excellent! Based on your experience and team, you're ready for advanced opportunities!"}
                  {showInfrastructureBuilder() &&
                    "Perfect! As an infrastructure builder, you're exactly who we need to shape Africa's AI future!"}
                  {showEarlyStageResources() &&
                    !showStudentResources() &&
                    "You're just getting started with AI! Here are some resources tailored for you."}
                  {showStudentResources() &&
                    "Great to see a student interested in AI! Here are some resources tailored for you."}
                  {showAdvancedTeamResources() &&
                    "Your team's experience with compute puts you in a great position to accelerate your AI journey!"}
                  {showDefaultCase() && !isFromAfrica && "Thank you for your interest in AskHub!"}
                  {showDefaultCase() &&
                    isFromAfrica &&
                    "We are still working on resources for your profile, please sign-up for the next release and take a look at the resources suggested below"}
                </p>
              </div>
            </div>
          </div>

          {/* AI Journey Summary */}
          <div className="border border-gray-200 shadow-sm rounded-lg overflow-hidden">
            <div className="bg-[#D9F1FF] border-b border-[#0071BC] p-4">
              <h2 className="text-xl text-black flex items-center gap-2 font-montserrat font-bold">
                <FileText className="w-5 h-5 text-[#0071BC]" />
                Your AI Journey Summary
              </h2>
            </div>
            <div className="p-6">
              <p className="text-[#6C6F75] mb-4 leading-relaxed font-montserrat">
                Here's how we generated your personalized recommendations based on your responses:
              </p>
              <div className="space-y-3">
                {responses.map((response, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <p className="font-montserrat font-medium text-gray-900 mb-1">{response.question}</p>
                    <p className="text-[#6C6F75] font-montserrat">{response.answerText}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Non-African User Message */}
          {!isFromAfrica && (
            <div className="border border-gray-200 shadow-sm rounded-lg overflow-hidden">
              <div className="bg-[#D9F1FF] border-b border-[#0071BC] p-4">
                <h2 className="text-xl text-black flex items-center gap-2 font-montserrat font-bold">
                  <BookOpen className="w-5 h-5 text-[#0071BC]" />
                  Not Yet Available in Your Region
                </h2>
              </div>
              <div className="p-6">
                <p className="text-[#6C6F75] mb-6 leading-relaxed font-montserrat">
                  It's great that you're interested in building and using AI! However, I am not available in your
                  country yet. Please register with your email address and I will notify you when I can be fully
                  available to you.
                </p>

                <div className="text-center">
                  <Button
                    onClick={() => setShowAuthModal(true)}
                    className="bg-[#1976d2] hover:bg-[#1565c0] text-white font-montserrat font-bold rounded-lg"
                  >
                    Register for Updates
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Early Stage Resources - Only for African countries */}
          {showEarlyStageResources() && isFromAfrica && (
            <div className="border border-gray-200 shadow-sm rounded-lg overflow-hidden">
              <div className="bg-[#D9F1FF] border-b border-[#0071BC] p-4">
                <h2 className="text-xl text-black flex items-center gap-2 font-montserrat font-bold">
                  <BookOpen className="w-5 h-5 text-[#0071BC]" />
                  For Early-stage/ High Potential Candidates
                </h2>
              </div>
              <div className="p-6">
                <p className="text-[#6C6F75] mb-6 leading-relaxed font-montserrat">
                  Here are a few resources to get started. I regularly source new updates. Come back to visit and ask me
                  questions so I can share with you new referrals, tools, partnerships and upskilling opportunities.
                </p>

                <p className="text-[#6C6F75] mb-6 leading-relaxed font-montserrat">
                  Sign-up using your email below so I can email you when I find new recommendations for you.
                </p>

                <div className="mb-6">
                  <h3 className="font-montserrat font-bold text-black mb-4">
                    Based on your responses, here are some recommended next steps:
                  </h3>

                  <div className="mb-6">
                    <h4 className="font-montserrat font-bold text-black mb-2">Apply for a Start-up Accelerator:</h4>
                    <p className="text-[#6C6F75] mb-4 font-montserrat">
                      An accelerator is a great way to grow your network and get expert help in building with AI. See
                      below for other curated resources.
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-montserrat font-bold text-black mb-4">Curated Resources:</h3>

                  <div className="mb-6">
                    <h4 className="font-montserrat font-bold text-black mb-2">
                      Start-up Accelerator Programmes in Africa:
                    </h4>
                    <div className="space-y-3">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <a
                          href="https://open-startup.org/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                        >
                          Open Start-up Africa
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <a
                          href="https://www.nvidia.com/en-us/startups/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                        >
                          NVIDIA Inception Program
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <a
                          href="https://eonreality.com/eon-reality-launches-groundbreaking-ai-academy-africa-incubator-initiative/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                        >
                          AI Academy Africa Incubator
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <a
                          href="https://acceler8.africa/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                        >
                          Accelerate Africa (Acceler8)
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <a
                          href="https://www.plugandplaytechcenter.com/innovation-services/startups/accelerator-programs"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                        >
                          Plug and Play Africa
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <a
                          href="https://www.undp.org/ethiopia/timbuktoo-manutech-hub-applications-call-second-cohort"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                        >
                          Timbuktoo ManuTech Accelerator
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-montserrat font-bold text-black mb-2">E-learning Resources:</h4>
                    <div className="space-y-3">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <a
                          href="https://aws.amazon.com/certification/certified-ai-practitioner/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                        >
                          AWS Certified AI Practitioner
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <a
                          href="https://aws.amazon.com/about-aws/our-impact/scholars/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                        >
                          AWS AI/ML Scholars
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <a
                          href="https://calculator.aws/#/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                        >
                          AWS Pricing Calculator
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <a
                          href="https://aiskillsnavigator.microsoft.com/en-us"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                        >
                          Microsoft AI Fluency
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <a
                          href="https://learn.microsoft.com/en-us/collections/dxxin6864km0q"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                        >
                          Microsoft Learn Collection
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <a
                          href="https://www.coursera.org/learn/ai-for-everyone"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                        >
                          AI for Everyone (Coursera)
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <a
                          href="https://www.elementsofai.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                        >
                          Elements of AI
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <a
                          href="https://www.coursera.org/learn/fundamentals-of-machine-learning-and-artificial-intelligence"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                        >
                          Fundamentals of ML & AI
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <a
                          href="https://www.coursera.org/specializations/ai-for-business-wharton#courses"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                        >
                          AI for Business (Wharton)
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <Button
                    onClick={() => setShowAuthModal(true)}
                    className="bg-[#1976d2] hover:bg-[#1565c0] text-white font-montserrat font-bold rounded-lg"
                  >
                    Sign Up for Updates
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Student Resources - Only for African countries */}
          {showStudentResources() && isFromAfrica && (
            <div className="border border-gray-200 shadow-sm rounded-lg overflow-hidden">
              <div className="bg-[#D9F1FF] border-b border-[#0071BC] p-4">
                <h2 className="text-xl text-black flex items-center gap-2 font-montserrat font-bold">
                  <BookOpen className="w-5 h-5 text-[#0071BC]" />
                  For Student Innovators
                </h2>
              </div>
              <div className="p-6">
                <p className="text-[#6C6F75] mb-6 leading-relaxed font-montserrat">
                  Here are a few resources to get started. I regularly source new updates. Come back to visit and ask me
                  questions so I can share with you new tools, partnerships and upskilling opportunities.
                </p>

                <p className="text-[#6C6F75] mb-6 leading-relaxed font-montserrat">
                  Sign up using your email so I can email you when there are new recommendations for you.
                </p>

                <div className="mb-6">
                  <h3 className="font-montserrat font-bold text-black mb-4">
                    Based on your responses, here are some recommended next steps:
                  </h3>
                  <p className="text-[#6C6F75] mb-4 font-montserrat">
                    <strong>Apply for a Start-up Accelerator.</strong> An accelerator is a great way to grow your
                    network and get expert help in building with AI. See below for other curated resources.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="font-montserrat font-bold text-black mb-4">Curated resources just for you</h3>

                  <div className="mb-6">
                    <h4 className="font-montserrat font-bold text-black mb-2">
                      Specialised Scholarship/Student Opportunities:
                    </h4>
                    <div className="space-y-3">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <a
                          href="https://www.alxafrica.com/programme/career-ready-skills-training/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                        >
                          AI Career Essentials (ALX Africa)
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <a
                          href="https://cs.mak.ac.ug/funding/scholarships/2025/deepmind"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                        >
                          Google DeepMind AI Master's Scholarship (Uganda)
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <a
                          href="https://ai4d.acts-net.org/ai4d-innovationspillar-scholarship/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                        >
                          AI4D Scholarship for Women in AI/ML in Sub-Saharan Africa
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <a
                          href="https://ai.aims.ac.za/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                        >
                          AIMS/Google AI for Science Master's Programme
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <a
                          href="https://ele-vate.co.za/african-youth-in-artificial-intelligence-and-robotics"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                        >
                          African Youth in AI & Robotics Competition (Ages 18–35)
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <a
                          href="https://learn.microsoft.com/en-us/collections/5ggaqtk84zxgr"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                        >
                          Beginner Level AI Learning – Microsoft Learn
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <a
                          href="https://zindi.africa/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                        >
                          Hire Tech Talent – Zindi (Africa's Largest Network of Data Scientists)
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <Button
                    onClick={() => setShowAuthModal(true)}
                    className="bg-[#1976d2] hover:bg-[#1565c0] text-white font-montserrat font-bold rounded-lg"
                  >
                    Sign Up for Updates
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Infrastructure Builder Programme - Only for African countries and infrastructure builders */}
          {showInfrastructureBuilder() && (
            <div className="border border-gray-200 shadow-sm rounded-lg overflow-hidden">
              <div className="bg-[#D9F1FF] border-b border-[#0071BC] p-4">
                <h2 className="text-xl text-black flex items-center gap-2 font-montserrat font-bold">
                  <Target className="w-5 h-5 text-[#0071BC]" />
                  For Infrastructure Builder Candidates
                </h2>
              </div>
              <div className="p-6">
                <p className="text-[#6C6F75] mb-4 leading-relaxed font-montserrat">
                  You're invited to apply to the <strong>AI Infrastructure Builder Programme</strong>!
                  <br />
                  This programme is for visionary teams building the foundational infrastructure that Africa's AI
                  ecosystem needs.
                </p>

                <div className="mb-6">
                  <h3 className="font-montserrat font-bold text-black mb-4">What you'll get:</h3>
                  <ul className="space-y-2 text-[#6C6F75] font-montserrat">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#0071BC] mt-0.5 flex-shrink-0" />
                      <span>Government partnership facilitation across African countries</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#0071BC] mt-0.5 flex-shrink-0" />
                      <span>Business planning and regulatory guidance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#0071BC] mt-0.5 flex-shrink-0" />
                      <span>Investment facilitation and funding connections</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#0071BC] mt-0.5 flex-shrink-0" />
                      <span>Strategic partnerships with Italian, EU, and G7 companies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#0071BC] mt-0.5 flex-shrink-0" />
                      <span>Support through multiple development phases</span>
                    </li>
                  </ul>
                </div>

                <div className="mb-4">
                  <p className="font-montserrat font-bold text-black">Programme runs: September 2025 – August 2026</p>
                </div>

                <div className="mb-6">
                  <p className="font-montserrat font-bold text-black mb-2">Focus areas:</p>
                  <p className="text-[#6C6F75] font-montserrat">
                    Data centers, connectivity, energy solutions, hardware innovations, cloud infrastructure
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="font-montserrat font-bold text-black mb-4">Why this fits you:</h3>
                  <ul className="space-y-2 text-[#6C6F75] font-montserrat">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#0071BC] mt-0.5 flex-shrink-0" />
                      <span>Matches your infrastructure-building vision</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#0071BC] mt-0.5 flex-shrink-0" />
                      <span>Connects you with government and financing partners</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#0071BC] mt-0.5 flex-shrink-0" />
                      <span>Positions you to shape Africa's AI future</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#0071BC] mt-0.5 flex-shrink-0" />
                      <span>Supports multi-country scaling potential</span>
                    </li>
                  </ul>
                </div>

                <Button
                  onClick={() => (window.location.href = "/infrastructure-builder")}
                  size="lg"
                  className="w-full py-3 font-montserrat font-bold rounded-lg"
                >
                  Apply to the Infrastructure Builder Programme
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Advanced Teams with Compute Readiness - Only for African countries */}
          {showAdvancedTeamResources() && (
            <div className="border border-gray-200 shadow-sm rounded-lg overflow-hidden">
              <div className="bg-[#D9F1FF] border-b border-[#0071BC] p-4">
                <h2 className="text-xl text-black flex items-center gap-2 font-montserrat font-bold">
                  <Rocket className="w-5 h-5 text-[#0071BC]" />
                  For Advanced Teams with Compute Readiness
                </h2>
              </div>
              <div className="p-6">
                <p className="text-[#6C6F75] mb-6 leading-relaxed font-montserrat">
                  You may be ready to partner with technical programs and accelerator funds supporting AI startups
                  across Africa.
                </p>

                <div className="mb-6">
                  <h3 className="font-montserrat font-bold text-black mb-4">Recommended Next Steps:</h3>
                  <ul className="space-y-2 text-[#6C6F75] font-montserrat">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#0071BC] mt-0.5 flex-shrink-0" />
                      <span>Apply for AI-focused investment or cloud credits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#0071BC] mt-0.5 flex-shrink-0" />
                      <span>Explore partnerships with compute providers and ecosystem builders</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#0071BC] mt-0.5 flex-shrink-0" />
                      <span>Join multi-country AI infrastructure or product coalitions</span>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="font-montserrat font-bold text-black mb-4">Programmes to Explore:</h3>
                  <div className="space-y-3">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <a
                        href="https://timbuktoo.africa/marketplace"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                      >
                        UNDP Timbuktoo AI Marketplace
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <a
                        href="https://www.nvidia.com/en-us/startups/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                      >
                        NVIDIA Inception
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <a
                        href="https://openai.com/startup-fund"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                      >
                        OpenAI Startup Fund (if globally eligible)
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <a
                        href="https://aws.amazon.com/activate/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                      >
                        Amazon AWS Activate
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <a
                        href="https://cloud.google.com/startup"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                      >
                        Google Cloud for Startups
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Compute Accelerator Programme - Only for African countries */}
          {showComputeAccelerator() && (
            <div className="border border-gray-200 shadow-sm rounded-lg overflow-hidden">
              <div className="bg-[#D9F1FF] border-b border-[#0071BC] p-4">
                <h2 className="text-xl text-black flex items-center gap-2 font-montserrat font-bold">
                  <Target className="w-5 h-5 text-[#0071BC]" />
                  Recommended: Compute Accelerator Programme
                </h2>
              </div>
              <div className="p-6">
                <p className="text-[#6C6F75] mb-4 leading-relaxed font-montserrat">
                  You're invited to apply to the Compute Accelerator Programme!
                  <br />
                  This 6-month programme supports African AI innovators at different stages of their project with
                  compute resources, mentorship, and partnerships.
                </p>

                <div className="mb-6">
                  <h3 className="font-montserrat font-bold text-black mb-4">
                    What accepted programme participants receive:
                  </h3>
                  <ul className="space-y-2 text-[#6C6F75] font-montserrat">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#0071BC] mt-0.5 flex-shrink-0" />
                      <span>Cloud credits and compute access (level based on your readiness)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#0071BC] mt-0.5 flex-shrink-0" />
                      <span>Technical mentorship from industry experts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#0071BC] mt-0.5 flex-shrink-0" />
                      <span>Talent acquisition support for AI roles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#0071BC] mt-0.5 flex-shrink-0" />
                      <span>Connections to investors and Italian/G7 partners</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#0071BC] mt-0.5 flex-shrink-0" />
                      <span>Community of African AI innovators</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#0071BC] mt-0.5 flex-shrink-0" />
                      <span>International scaling opportunities</span>
                    </li>
                  </ul>
                </div>

                <div className="mb-4">
                  <p className="font-montserrat font-bold text-black">Programme runs: October 2025 - March 2026</p>
                </div>

                <div className="mb-6">
                  <h3 className="font-montserrat font-bold text-black mb-4">Two tracks available:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-montserrat font-bold text-black mb-2">Compute-ready track</h4>
                      <p className="text-sm text-[#6C6F75] font-montserrat">
                        For teams with working solutions (dedicated resources, 1:1 mentorship)
                      </p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-montserrat font-bold text-black mb-2">Compute-curious track</h4>
                      <p className="text-sm text-[#6C6F75] font-montserrat">
                        For early-stage teams (sandbox credits, virtual learning, community access)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-montserrat font-bold text-black mb-4">Why this fits you:</h3>
                  <ul className="space-y-2 text-[#6C6F75] font-montserrat">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#0071BC] mt-0.5 flex-shrink-0" />
                      <span>Matches your AI development journey</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#0071BC] mt-0.5 flex-shrink-0" />
                      <span>Aligns with your compute interests and goals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#0071BC] mt-0.5 flex-shrink-0" />
                      <span>Connects you with relevant African and international partners</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#0071BC] mt-0.5 flex-shrink-0" />
                      <span>Supports your team's growth at the right level</span>
                    </li>
                  </ul>
                </div>

                <Button
                  onClick={() => (window.location.href = "/compute-accelerator")}
                  size="lg"
                  className="w-full py-3 font-montserrat font-bold rounded-lg"
                >
                  Apply to the Compute Accelerator Programme
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Curated Resources for Compute Accelerator Candidates */}
          {showComputeAccelerator() && (
            <div className="border border-gray-200 shadow-sm rounded-lg overflow-hidden">
              <div className="bg-[#D9F1FF] border-b border-[#0071BC] p-4">
                <h2 className="text-xl text-black flex items-center gap-2 font-montserrat font-bold">
                  <BookOpen className="w-5 h-5 text-[#0071BC]" />
                  Curated Resources Just for You
                </h2>
              </div>
              <div className="p-6">
                <p className="text-[#6C6F75] mb-6 leading-relaxed font-montserrat">
                  Based on your responses, here are some recommended resources and next steps, available to you:
                </p>

                <div className="mb-6">
                  <h3 className="font-montserrat font-bold text-black mb-4">Access E-learning Resources on AI:</h3>
                  <div className="space-y-3">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <a
                        href="https://learn.microsoft.com/en-us/collections/6zzu7t65xpk56"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                      >
                        Intermediate level AI – Microsoft Learn
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <a
                        href="https://learn.microsoft.com/en-us/collections/y11iet41mw0ww"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                      >
                        Advanced level AI – Microsoft Learn
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <a
                        href="https://www.cloudskillsboost.google/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                      >
                        Google Cloud Skills Boost
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <a
                        href="https://pll.harvard.edu/course/cs50s-introduction-artificial-intelligence-python/2023-05"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                      >
                        CS50's Introduction to Artificial Intelligence with Python – Harvard
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <a
                        href="https://pll.harvard.edu/course/machine-learning-and-ai-python"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                      >
                        Machine Learning and AI with Python – Harvard
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <a
                        href="https://course.fast.ai/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                      >
                        Practical Deep Learning – fast.ai
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <a
                        href="https://arxiv.org/abs/2106.11342?utm_source=chatgpt.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0071BC] hover:underline font-montserrat flex items-center gap-2"
                      >
                        Dive into Deep Learning – Cornell University
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Default Case - Only for African countries */}
          {showDefaultCase() && isFromAfrica && (
            <div className="border border-gray-200 shadow-sm rounded-lg overflow-hidden">
              <div className="bg-[#D9F1FF] border-b border-[#0071BC] p-4">
                <h2 className="text-xl text-black flex items-center gap-2 font-montserrat font-bold">
                  <Lightbulb className="w-5 h-5 text-[#0071BC]" />
                  Curated Resources
                </h2>
              </div>
              <div className="p-6">
                <p className="text-[#6C6F75] mb-6 leading-relaxed font-montserrat">
                  Based on your responses, we're still working on resources for your specific profile. Please sign-up
                  for the next release and explore the resources below that might be helpful for your AI journey.
                </p>

                <div className="text-center mb-8">
                  <Button
                    onClick={() => setShowAuthModal(true)}
                    className="bg-[#1976d2] hover:bg-[#1565c0] text-white font-montserrat font-bold rounded-lg"
                  >
                    Sign Up for Updates
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* What do you need help with? - ALWAYS SHOWN */}
          <div className="border border-gray-200 shadow-sm rounded-lg overflow-hidden">
            <div className="bg-[#D9F1FF] border-b border-[#0071BC] p-4">
              <h2 className="text-xl text-black flex items-center gap-2 font-montserrat font-bold">
                <Lightbulb className="w-5 h-5 text-[#0071BC]" />
                What do you need help with?
              </h2>
            </div>
            <div className="p-6">
              <p className="text-[#6C6F75] mb-6 leading-relaxed font-montserrat">
                Select what you need help with to see curated resources:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {helpOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedHelpOption(selectedHelpOption === option ? null : option)}
                    className="p-4 text-left border border-gray-300 rounded-lg hover:border-[#0071BC] hover:bg-blue-50 transition-colors font-montserrat"
                  >
                    {option}
                  </button>
                ))}
              </div>

              {selectedHelpOption && (
                <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 max-h-96 overflow-y-auto">
                  <h3 className="text-xl font-semibold mb-4 font-montserrat text-[#0071BC]">{selectedHelpOption}</h3>
                  {renderHelpContent(selectedHelpOption)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Beta Note - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-200 px-4 py-2 z-40">
        <div className="container mx-auto">
          <p className="text-xs text-gray-600 font-montserrat text-center">
            <strong>BETA:</strong> This is a beta version of AskHub. We welcome your feedback to help us improve. Please
            send any comments or suggestions to{" "}
            <a href="mailto:aihubfordevelopment@undp.org" className="text-[#0071BC] hover:underline">
              aihubfordevelopment@undp.org
            </a>
          </p>
        </div>
      </div>

      {/* Signup Modal */}
      <AuthModal
        isOpen={showAuthModal}
        email={intakeEmail}
        forceOpen={!isAuthenticated}
        otpAlreadySent={otpSent}
        otpSendError={otpError}
        onAuthenticated={() => {
          setIsAuthenticated(true)
          setShowAuthModal(false)
        }}
      />
    </div>
  )
}
