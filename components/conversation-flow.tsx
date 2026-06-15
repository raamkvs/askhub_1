"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { RecommendationResults } from "@/components/recommendation-results"
import { IntakeReview } from "@/components/intake-review"
import { AuthNavActions } from "@/components/auth-nav-actions"
import { v4 as uuidv4 } from "uuid"
import { Menu, X, ChevronDown } from "lucide-react"

interface ConversationFlowProps {
  sessionId: string
  trigger: string
  onBack: () => void
}

interface ChatMessage {
  id: string
  type: "bot" | "user"
  content: string
  timestamp: Date
  options?: ConversationOption[]
  inputType?: "dropdown" | "text" | "textarea"
  dropdownOptions?: string[]
  isDisabled?: boolean
}

interface ConversationOption {
  id: string
  text: string
  value: string
}

interface UserResponse {
  questionId: string
  question: string
  answer: string
  answerText: string
}

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
]

// Role Options
const roleOptions = [
  { id: "cto", text: "Chief Technical Officer (CTO)", value: "cto" },
  { id: "ceo", text: "CEO / Business Executive", value: "ceo" },
  { id: "engineer", text: "Software Engineer / Developer", value: "engineer" },
  { id: "data-scientist", text: "Data Scientist", value: "data-scientist" },
  { id: "researcher", text: "Researcher", value: "researcher" },
  { id: "product-manager", text: "Product Manager", value: "product-manager" },
  { id: "student", text: "Student", value: "student" },
  { id: "entrepreneur", text: "Entrepreneur / Startup Founder / Business Owner", value: "entrepreneur" },
  { id: "educator", text: "Educator / Trainer (AI or Tech)", value: "educator" },
  { id: "policy", text: "Policy / Government / NGO Professional", value: "policy" },
  {
    id: "infrastructure",
    text: "AI Infrastructure Builder (e.g. energy supplier, data center builder)",
    value: "infrastructure",
  },
  { id: "other", text: "Other", value: "other" },
]

// AI Journey Stage Options
const aiJourneyOptions = [
  { id: "new", text: "New to AI – I don't have any technical skills or AI knowledge yet", value: "new" },
  {
    id: "learning",
    text: "Learning AI – I have some technical skills but need to learn more about AI",
    value: "learning",
  },
  { id: "idea", text: "Have an idea – I have AI skills and an idea, but haven't started building", value: "idea" },
  { id: "building", text: "Currently building – I'm building and testing an AI solution now", value: "building" },
  {
    id: "working",
    text: "Have a working product – I built an AI solution or tool that people are using",
    value: "working",
  },
]

// AI Experience in Africa Options
const aiExperienceOptions = [
  { id: "none", text: "None – I am new to AI development", value: "none" },
  { id: "getting-started", text: "Getting started – Less than 6 months", value: "getting-started" },
  { id: "good", text: "Good – Solid AI/technical background", value: "good" },
  { id: "expert", text: "Expert – Several years of ML/DS/AI experience", value: "expert" },
  { id: "not-sure", text: "Not sure", value: "not-sure" },
]

// AI Learning History Options
const learningHistoryOptions = [
  { id: "guided", text: "Yes – Guided course or workshop", value: "guided" },
  { id: "self-taught", text: "Yes – Independently watched videos or self-taught", value: "self-taught" },
  { id: "started", text: "Started a course/project but didn't finish", value: "started" },
  { id: "no", text: "No – I haven't started learning yet", value: "no" },
]

// AI Goals Options
const aiGoalsOptions = [
  { id: "build", text: "Learn how to build my own AI tools", value: "build" },
  { id: "use", text: "Use AI in my business or project", value: "use" },
  { id: "grow", text: "Grow a startup or idea using AI", value: "grow" },
  { id: "explore", text: "Explore and learn more about AI before deciding", value: "explore" },
]

// Primary need options (resource matching)
const primaryNeedOptions = [
  { id: "compute", text: "Compute — cloud credits, GPUs, infrastructure", value: "Compute" },
  { id: "training", text: "Training — courses, skills, certifications", value: "Training" },
  { id: "funding", text: "Funding — grants, investment, financial support", value: "Funding" },
  { id: "partners", text: "Partners — experts, communities, networks", value: "Partners" },
  { id: "accelerator", text: "Accelerator — programmes to grow my startup", value: "Accelerator" },
  { id: "not-sure", text: "I'm not sure yet", value: "I'm not sure yet" },
]

// Compute Experience Options
const computeExperienceOptions = [
  { id: "what", text: "What's compute?", value: "what" },
  { id: "curious", text: "I'm curious about compute, but not experienced yet.", value: "curious" },
  { id: "testing", text: "Testing stage – I am trying out compute options", value: "testing" },
  { id: "ready", text: "Compute ready – I am using compute and need more.", value: "ready" },
  { id: "advanced", text: "Advanced – I want to optimize my compute for better AI performance", value: "advanced" },
]

// Team Size Options
const teamSizeOptions = [
  { id: "just-me", text: "Just me", value: "just-me" },
  { id: "small", text: "Small team (2–3 people)", value: "small" },
  { id: "medium", text: "Medium team (3–10 people)", value: "medium" },
  { id: "organization", text: "Part of a larger organisation", value: "organization" },
  { id: "large", text: "Large team (10+ people)", value: "large" },
]

export function ConversationFlow({ sessionId, trigger, onBack }: ConversationFlowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [responses, setResponses] = useState<UserResponse[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)
  const [submitError, setSubmitError] = useState<string | undefined>()
  const [isExistingUser, setIsExistingUser] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otpError, setOtpError] = useState<string | undefined>()
  const [inputValue, setInputValue] = useState("")
  const [questionCount, setQuestionCount] = useState(0)
  const [showOtherRoleInput, setShowOtherRoleInput] = useState(false)
  const [currentQuestionAnswered, setCurrentQuestionAnswered] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showProgrammesDropdown, setShowProgrammesDropdown] = useState(false)

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

  // Add click outside handler to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest(".programmes-dropdown")) {
        setShowProgrammesDropdown(false)
      }
    }

    if (showProgrammesDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showProgrammesDropdown])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isComplete) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      scrollToBottom()
    }
  }, [messages, isComplete])

  const addMessage = (
    content: string,
    type: "bot" | "user" = "bot",
    options?: ConversationOption[],
    inputType?: "dropdown" | "text" | "textarea",
    dropdownOptions?: string[],
    isDisabled?: boolean,
  ) => {
    const message: ChatMessage = {
      id: uuidv4(),
      type,
      content,
      timestamp: new Date(),
      options,
      inputType,
      dropdownOptions,
      isDisabled,
    }
    setMessages((prev) => [...prev, message])
  }

  const disablePreviousMessages = () => {
    setMessages((prev) =>
      prev.map((msg) => ({
        ...msg,
        isDisabled: true,
      })),
    )
  }

  const getFollowUpMessage = (questionId: string, value: string) => {
    switch (questionId) {
      case "country":
        return "" // Remove the follow-up message, go directly to role question
      case "role":
        if (value === "infrastructure") {
          return "Perfect! As an infrastructure builder, you're exactly who we need to shape Africa's AI future! Let me get you the right resources."
        }
        return "Thank you for letting me know! This will give me a better idea of who you are and what resources you may need."
      case "build-goal":
        return "Thanks for sharing your vision! I'll keep this in mind to recommend the most relevant tools and opportunities later on."
      case "ai-journey":
        switch (value) {
          case "new":
            return "Welcome! This is an exciting first step on your learning journey."
          case "learning":
            return "You're off to a great start! I'm excited to strengthen your AI knowledge."
          case "idea":
            return "Every innovative project starts with an idea. Let's help you turn your ideas into reality."
          case "building":
            return "Amazing! Let's find the right tools to help you accelerate moving forward."
          case "working":
            return "Excellent! Let me ask you a few more questions to understand your plans better."
          default:
            return "Thank you for your response!"
        }
      case "ai-experience":
        switch (value) {
          case "none":
            return "Great! I'll help you take your first steps with AI."
          case "getting-started":
            return "Great! You've already begun. Let's build on what you know."
          case "good":
            return "You already have strong skills. Let's find training to help you grow even more."
          case "expert":
            return "You're leading the way! Let's connect you with advanced programmes and networking opportunities."
          case "not-sure":
            return "No problem! I'll help you figure it out and guide you to the right place."
          default:
            return "Thank you for your response!"
        }
      case "learning-history":
        return "Great! Thank you for letting me know about your experience so far. I have another question for you."
      case "ai-goals":
        switch (value) {
          case "build":
            return "Let's get you started with beginner-friendly tools to build AI using data and compute."
          case "use":
            return "Let me introduce you to resources to help you apply AI to your project or business."
          case "grow":
            return "You could benefit from an accelerator! I'll show you programmes to help your idea grow."
          case "explore":
            return "Sounds good! Here are some helpful resources to learn more about what AI can do."
          default:
            return "Thank you for your response!"
        }
      case "compute-experience":
        switch (value) {
          case "what":
            return "In AI, 'compute' means the processing power needed to train or run models. We'll help you learn more."
          case "curious":
            return "Great! You're starting to explore. I will help you get started."
          case "testing":
            return "Wonderful! You're experimenting. I will support you going further."
          case "ready":
            return "I will connect you to advanced resources and programmes."
          case "advanced":
            return "I will connect you to opportunities to scale your AI even further."
          default:
            return "Thank you for your response!"
        }
      case "team-size":
        switch (value) {
          case "just-me":
            return "Starting solo takes courage! We'll connect you to opportunities to build your network."
          case "small":
            return "Perfect team size for agility! Your combined skills will be a great foundation."
          case "medium":
            return "What a strong team! You'll be able to move fast and build amazing things."
          case "organization":
            return "You're well positioned to make an impact."
          case "large":
            return "You're ready to take on big challenges! Partnerships could help you reach even bigger goals."
          default:
            return "Thank you for your response!"
        }
      case "primary-need":
        if (value === "I'm not sure yet") {
          return "No problem — we'll put together a balanced starter set of resources for you."
        }
        return "Got it — we'll prioritise resources that match this need."
      default:
        return "Thank you for your response!"
    }
  }

  const shouldShowLearningHistory = (responses: UserResponse[]) => {
    const aiExperience = responses.find((r) => r.questionId === "ai-experience")?.answer
    return aiExperience && ["none", "getting-started", "not-sure"].includes(aiExperience)
  }

  const shouldShowAIGoals = (responses: UserResponse[]) => {
    const aiExperience = responses.find((r) => r.questionId === "ai-experience")?.answer
    return (
      aiExperience &&
      ["none", "getting-started", "not-sure"].includes(aiExperience) &&
      responses.find((r) => r.questionId === "learning-history")
    )
  }

  const shouldShowComputeExperience = (responses: UserResponse[]) => {
    const aiExperience = responses.find((r) => r.questionId === "ai-experience")?.answer
    return aiExperience && ["good", "expert"].includes(aiExperience)
  }

  const shouldShowTeamSize = (responses: UserResponse[]) => {
    const aiJourney = responses.find((r) => r.questionId === "ai-journey")?.answer
    return aiJourney && ["idea", "building", "working"].includes(aiJourney)
  }

  const isInfrastructureBuilder = (responses: UserResponse[]) => {
    const role = responses.find((r) => r.questionId === "role")?.answer
    return role === "infrastructure"
  }

  const handleOptionSelect = (option: ConversationOption) => {
    if (!currentQuestionAnswered) {
      setCurrentQuestionAnswered(true)
      disablePreviousMessages()

      // Handle "Other" role selection
      if (option.value === "other") {
        setShowOtherRoleInput(true)
        addMessage(option.text, "user")
        setTimeout(() => {
          addMessage("Please tell me more about your role:", "bot", undefined, "text")
          setCurrentQuestionAnswered(false)
        }, 500)
        return
      }

      // Add user response
      addMessage(option.text, "user")

      // Determine current question based on response count and existing responses
      let questionId = ""
      let question = ""

      const hasCountry = responses.find((r) => r.questionId === "country")
      const hasRole = responses.find((r) => r.questionId === "role")
      const hasBuildGoal = responses.find((r) => r.questionId === "build-goal")
      const hasAIJourney = responses.find((r) => r.questionId === "ai-journey")

      if (!hasCountry) {
        questionId = "country"
        question = "Which country are you in?"
      } else if (!hasRole) {
        questionId = "role"
        question = "What is your role?"
      } else if (!hasBuildGoal) {
        questionId = "build-goal"
        question = "What do you want to build or create with AI?"
      } else if (!hasAIJourney) {
        questionId = "ai-journey"
        question = "What stage are you at in your AI journey?"
      } else {
        // After the main 4 questions, determine next question based on previous responses
        const currentResponses = [...responses]
        if (
          shouldShowLearningHistory(currentResponses) &&
          !currentResponses.find((r) => r.questionId === "learning-history")
        ) {
          questionId = "learning-history"
          question = "Have you done any learning about AI before?"
        } else if (shouldShowAIGoals(currentResponses) && !currentResponses.find((r) => r.questionId === "ai-goals")) {
          questionId = "ai-goals"
          question = "What would you like to do with AI?"
        } else if (!currentResponses.find((r) => r.questionId === "ai-experience")) {
          questionId = "ai-experience"
          question = "What's your level of experience with building AI in Africa?"
        } else if (
          shouldShowComputeExperience(currentResponses) &&
          !currentResponses.find((r) => r.questionId === "compute-experience")
        ) {
          questionId = "compute-experience"
          question = "What's your experience with compute?"
        } else if (
          shouldShowTeamSize(currentResponses) &&
          !currentResponses.find((r) => r.questionId === "team-size")
        ) {
          questionId = "team-size"
          question = "What's your team size for this AI project?"
        } else if (!currentResponses.find((r) => r.questionId === "primary-need")) {
          questionId = "primary-need"
          question = "What do you need most right now?"
        }
      }

      const newResponse: UserResponse = {
        questionId,
        question,
        answer: option.value,
        answerText: option.text,
      }

      const newResponses = [...responses, newResponse]
      setResponses(newResponses)

      // For country selection, skip the follow-up message and go directly to next question
      if (questionId === "country") {
        setTimeout(() => {
          proceedToNextStep(newResponses)
        }, 300)
      } else {
        // Add follow-up message for other questions
        setTimeout(() => {
          const followUp = getFollowUpMessage(questionId, option.value)
          if (followUp) {
            addMessage(followUp)
          }

          // Check if we should continue or complete
          setTimeout(() => {
            proceedToNextStep(newResponses)
          }, 1000)
        }, 500)
      }
    }
  }

  const isReadyForEmailQuestion = (currentResponses: UserResponse[]) => {
    if (currentResponses.find((r) => r.questionId === "email")) {
      return false
    }

    if (isInfrastructureBuilder(currentResponses)) {
      return Boolean(
        currentResponses.find((r) => r.questionId === "build-goal") &&
          currentResponses.find((r) => r.questionId === "primary-need"),
      )
    }

    const hasRole = currentResponses.find((r) => r.questionId === "role")
    const hasBuildGoal = currentResponses.find((r) => r.questionId === "build-goal")
    const hasAIJourney = currentResponses.find((r) => r.questionId === "ai-journey")
    const hasPrimaryNeed = currentResponses.find((r) => r.questionId === "primary-need")
    const hasAIExperience = currentResponses.find((r) => r.questionId === "ai-experience")
    const hasLearningHistory = currentResponses.find((r) => r.questionId === "learning-history")
    const hasAIGoals = currentResponses.find((r) => r.questionId === "ai-goals")
    const hasComputeExperience = currentResponses.find((r) => r.questionId === "compute-experience")
    const hasTeamSize = currentResponses.find((r) => r.questionId === "team-size")

    if (!hasRole || !hasBuildGoal || !hasAIJourney || !hasAIExperience) {
      return false
    }

    if (shouldShowLearningHistory(currentResponses) && !hasLearningHistory) {
      return false
    }

    if (shouldShowAIGoals(currentResponses) && !hasAIGoals) {
      return false
    }

    if (shouldShowComputeExperience(currentResponses) && !hasComputeExperience) {
      return false
    }

    if (shouldShowTeamSize(currentResponses) && !hasTeamSize) {
      return false
    }

    if (!hasPrimaryNeed) {
      return false
    }

    return true
  }

  const handleInputSubmit = (value: string) => {
    if (!value.trim() || !currentQuestionAnswered) {
      if (value.trim()) {
        let questionId = ""
        let question = ""

        if (showOtherRoleInput) {
          questionId = "role"
          question = "What is your role?"
        } else {
          const hasCountry = responses.find((r) => r.questionId === "country")
          const hasRole = responses.find((r) => r.questionId === "role")
          const hasBuildGoal = responses.find((r) => r.questionId === "build-goal")

          if (!hasCountry) {
            questionId = "country"
            question = "Which country are you in?"
          } else if (!hasRole) {
            questionId = "role"
            question = "What is your role?"
          } else if (!hasBuildGoal) {
            questionId = "build-goal"
            question = "What do you want to build or create with AI?"
          } else if (isReadyForEmailQuestion(responses)) {
            questionId = "email"
            question = "What's your email address?"
          }
        }

        if (questionId === "email") {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailPattern.test(value.trim())) {
            addMessage("Please enter a valid email address.", "bot")
            return
          }
        }

        setCurrentQuestionAnswered(true)
        disablePreviousMessages()
        addMessage(value, "user")

        if (showOtherRoleInput) {
          setShowOtherRoleInput(false)
        }

        const newResponse: UserResponse = {
          questionId,
          question,
          answer: value.trim(),
          answerText: value.trim(),
        }

        const newResponses = [...responses, newResponse]
        setResponses(newResponses)
        setInputValue("")

        if (questionId === "country") {
          setTimeout(() => {
            proceedToNextStep(newResponses)
          }, 300)
        } else if (questionId === "email") {
          setTimeout(() => {
            proceedToNextStep(newResponses)
          }, 500)
        } else {
          setTimeout(() => {
            const followUp = getFollowUpMessage(questionId, value)
            if (followUp) {
              addMessage(followUp)
            }

            setTimeout(() => {
              proceedToNextStep(newResponses)
            }, 1000)
          }, 500)
        }
      }
    }
  }

  const handleDropdownChange = (value: string) => {
    if (!currentQuestionAnswered) {
      setInputValue(value)
      setTimeout(() => {
        handleInputSubmit(value)
      }, 300)
    }
  }

  const proceedToNextStep = (currentResponses: UserResponse[]) => {
    const hasEmail = currentResponses.find((r) => r.questionId === "email")

    const goToReview = (responsesToSave: UserResponse[]) => {
      setResponses(responsesToSave)
      setSubmitError(undefined)
      setShowReview(true)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }

    // Check if user is Infrastructure Builder - if so, skip to completion after build-goal
    if (isInfrastructureBuilder(currentResponses)) {
      const hasBuildGoal = currentResponses.find((r) => r.questionId === "build-goal")
      const hasPrimaryNeed = currentResponses.find((r) => r.questionId === "primary-need")
      if (hasBuildGoal) {
        if (!hasPrimaryNeed) {
          showPrimaryNeedQuestion()
          return
        }
        if (!hasEmail) {
          showEmailQuestion()
          return
        }
        goToReview(currentResponses)
        return
      } else {
        showBuildGoalQuestion()
        return
      }
    }

    // Check what questions we still need to ask in order for non-Infrastructure Builders
    const hasRole = currentResponses.find((r) => r.questionId === "role")
    const hasBuildGoal = currentResponses.find((r) => r.questionId === "build-goal")
    const hasAIJourney = currentResponses.find((r) => r.questionId === "ai-journey")
    const hasAIExperience = currentResponses.find((r) => r.questionId === "ai-experience")
    const hasLearningHistory = currentResponses.find((r) => r.questionId === "learning-history")
    const hasAIGoals = currentResponses.find((r) => r.questionId === "ai-goals")
    const hasComputeExperience = currentResponses.find((r) => r.questionId === "compute-experience")
    const hasTeamSize = currentResponses.find((r) => r.questionId === "team-size")
    const hasPrimaryNeed = currentResponses.find((r) => r.questionId === "primary-need")

    // Follow the specific order: country -> role -> build-goal -> ai-journey -> then conditional questions
    if (!hasRole) {
      showRoleQuestion() // Show immediately without delay
    } else if (!hasBuildGoal) {
      showBuildGoalQuestion()
    } else if (!hasAIJourney) {
      showAIJourneyQuestion()
    } else if (!hasAIExperience) {
      showAIExperienceQuestion()
    } else if (shouldShowLearningHistory(currentResponses) && !hasLearningHistory) {
      showLearningHistoryQuestion()
    } else if (shouldShowAIGoals(currentResponses) && !hasAIGoals) {
      showAIGoalsQuestion()
    } else if (shouldShowComputeExperience(currentResponses) && !hasComputeExperience) {
      showComputeExperienceQuestion()
    } else if (shouldShowTeamSize(currentResponses) && !hasTeamSize) {
      showTeamSizeQuestion()
    } else if (!hasPrimaryNeed) {
      showPrimaryNeedQuestion()
    } else if (!hasEmail) {
      showEmailQuestion()
    } else {
      goToReview(currentResponses)
    }
  }

  const handleReviewSubmit = () => {
    setIsSubmittingReview(true)
    setSubmitError(undefined)
    void submitIntakeFromReview()
  }

  const submitIntakeFromReview = async () => {
    try {
      const email = responses.find((r) => r.questionId === "email")?.answerText
      console.log("[CONVERSATION] Calling /api/intake/complete for:", email)

      const response = await fetch("/api/intake/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          responses,
          sessionId,
          email,
          trigger,
        }),
      })
      const result = await response.json()
      console.log("[CONVERSATION] /api/intake/complete response:", { status: response.status, result })

      if (result.success) {
        setIsExistingUser(Boolean(result.isExistingUser))
        setOtpSent(Boolean(result.emailSent))
        setOtpError(result.emailError)
      } else {
        throw new Error(result.error ?? "Unable to create your profile")
      }

      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "ask-hub-pending-results",
          JSON.stringify({ responses, sessionId, trigger }),
        )
      }

      setShowReview(false)
      setIsComplete(true)
    } catch (error) {
      console.error("[CONVERSATION] Failed to complete intake:", error)
      setSubmitError(error instanceof Error ? error.message : "Something went wrong. Please try again.")
    } finally {
      setIsSubmittingReview(false)
    }
  }

  const showRoleQuestion = () => {
    setTimeout(() => {
      addMessage("What is your role?\n\nChoose the option that best describes your current role:", "bot", roleOptions)
      setCurrentQuestionAnswered(false)
    }, 200)
  }

  const showBuildGoalQuestion = () => {
    setTimeout(() => {
      addMessage("Can you type in the chat what do you want to build or create with AI?", "bot", undefined, "textarea")
      setCurrentQuestionAnswered(false)
    }, 200)
  }

  const showAIJourneyQuestion = () => {
    setTimeout(() => {
      addMessage(
        "I want to learn more about your AI journey so far. Let me ask a few quick questions to recommend the best path for you.\n\nWhat stage are you at in your AI journey?",
        "bot",
        aiJourneyOptions,
      )
      setCurrentQuestionAnswered(false)
    }, 200)
  }

  const showAIExperienceQuestion = () => {
    setTimeout(() => {
      addMessage("What's your level of experience with building AI in Africa?", "bot", aiExperienceOptions)
      setCurrentQuestionAnswered(false)
    }, 200)
  }

  const showLearningHistoryQuestion = () => {
    setTimeout(() => {
      addMessage("Have you done any learning about AI before?", "bot", learningHistoryOptions)
      setCurrentQuestionAnswered(false)
    }, 200)
  }

  const showAIGoalsQuestion = () => {
    setTimeout(() => {
      addMessage("What would you like to do with AI?", "bot", aiGoalsOptions)
      setCurrentQuestionAnswered(false)
    }, 200)
  }

  const showComputeExperienceQuestion = () => {
    setTimeout(() => {
      addMessage("What's your experience with compute?", "bot", computeExperienceOptions)
      setCurrentQuestionAnswered(false)
    }, 200)
  }

  const showTeamSizeQuestion = () => {
    setTimeout(() => {
      addMessage("What's your team size for this AI project?", "bot", teamSizeOptions)
      setCurrentQuestionAnswered(false)
    }, 200)
  }

  const showPrimaryNeedQuestion = () => {
    setTimeout(() => {
      addMessage(
        "What do you need most right now?\n\nChoose the option that best describes your top priority:",
        "bot",
        primaryNeedOptions,
      )
      setCurrentQuestionAnswered(false)
    }, 200)
  }

  const showEmailQuestion = () => {
    setTimeout(() => {
      addMessage(
        "Almost done! What's the best email address to reach you? We'll create your AskHub account and email you a temporary password.",
        "bot",
        undefined,
        "text",
      )
      setCurrentQuestionAnswered(false)
    }, 200)
  }

  // Initialize conversation with country question

  const hasStartedRef = useRef(false)

  useEffect(() => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true
      addMessage("Which country are you in?", "bot", undefined, "dropdown", countries)
    }
  }, [])

  if (isComplete) {
    return (
      <RecommendationResults
        responses={responses}
        sessionId={sessionId}
        onBack={onBack}
        isExistingUser={isExistingUser}
        otpSent={otpSent}
        otpError={otpError}
      />
    )
  }

  if (showReview) {
    return (
      <IntakeReview
        responses={responses}
        onSubmit={handleReviewSubmit}
        onBack={() => setShowReview(false)}
        isSubmitting={isSubmittingReview}
        submitError={submitError}
      />
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

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-[#0071BC] p-2"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
              <button
                onClick={() => window.open("https://www.aihubfordevelopment.org/", "_blank")}
                className="text-gray-700 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium transition-all"
              >
                Official Launch
              </button>
              <div className="relative programmes-dropdown">
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

            {/* Right - Auth */}
            <div className="hidden md:flex items-center">
              <AuthNavActions />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  window.open("https://www.aihubfordevelopment.org/", "_blank")
                }}
                className="text-gray-700 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium text-left transition-all"
              >
                Official Launch
              </button>
              <button
                className="text-gray-700 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium text-left flex items-center justify-between w-full transition-all"
                onClick={() => setShowProgrammesDropdown(!showProgrammesDropdown)}
              >
                Programmes
                <ChevronDown className={`w-4 h-4 transition-transform ${showProgrammesDropdown ? "rotate-180" : ""}`} />
              </button>
              {showProgrammesDropdown && (
                <div className="ml-4 mt-2 space-y-2">
                  <button
                    onClick={scrollToComputeAccelerator}
                    className="block text-gray-600 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium text-left text-sm py-1 transition-all"
                  >
                    2025 Compute Accelerator Programme
                  </button>
                  <button
                    onClick={scrollToInfrastructureBuilder}
                    className="block text-gray-600 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium text-left text-sm py-1 transition-all"
                  >
                    2025 AI Infrastructure Builder Programme
                  </button>
                  <a
                    href="https://www.aihubfordevelopment.org/green-compute-coalition"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-600 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium text-left text-sm py-1 transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Africa Green Compute Coalition
                  </a>
                  <a
                    href="https://www.aihubfordevelopment.org/startup-accelerator-pilot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-600 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium text-left text-sm py-1 transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    2024 Startup Accelerator Pilot
                  </a>
                  <a
                    href="https://www.aihubfordevelopment.org/local-language-partnerships-accelerator-pilot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-600 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium text-left text-sm py-1 transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    2024 Local Language Partnerships Accelerator Pilot
                  </a>
                </div>
              )}
              <a
                href="https://www.aihubfordevelopment.org/partnerships-for-ai-innovation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium text-left transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Partnerships
              </a>
              <a
                href="https://www.aihubfordevelopment.org/highlights"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium text-left transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Highlights
              </a>
              <button
                onClick={goToAskHub}
                className="text-gray-700 hover:text-[#0071BC] hover:font-bold font-montserrat font-medium text-left transition-all"
              >
                AskHub
              </button>
              <AuthNavActions layout="mobile" />
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 py-8 pb-16 font-montserrat">
        <div className="mb-6">
          <Button variant="outline" onClick={onBack} className="font-montserrat font-bold rounded-lg bg-transparent">
            Back to homepage
          </Button>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id}>
                {message.type === "bot" ? (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                      <img src="/images/chat-coach-icon.png" alt="AskHub" className="w-12 h-12" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line font-montserrat">
                          {message.content}
                        </p>
                      </div>

                      {message.inputType === "dropdown" && !message.isDisabled && (
                        <div className="mb-4">
                          <div className="border border-gray-300 rounded-lg p-4">
                            <Select value={inputValue} onValueChange={handleDropdownChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Make a selection" />
                              </SelectTrigger>
                              <SelectContent>
                                {message.dropdownOptions?.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}

                      {message.inputType === "text" && !message.isDisabled && (
                        <div className="mb-4">
                          <div className="border border-gray-300 rounded-lg p-4 mb-4">
                            <Input
                              value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                              placeholder="Type your response here..."
                              className="w-full border-0 p-0 focus-visible:ring-0"
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && inputValue.trim()) {
                                  handleInputSubmit(inputValue)
                                }
                              }}
                            />
                          </div>
                          {inputValue.trim() && (
                            <div className="flex justify-end">
                              <Button
                                onClick={() => handleInputSubmit(inputValue)}
                                className="bg-[#0071BC] hover:bg-[#005A94] text-white rounded-lg font-montserrat"
                              >
                                Submit
                              </Button>
                            </div>
                          )}
                        </div>
                      )}

                      {message.inputType === "textarea" && !message.isDisabled && (
                        <div className="mb-4">
                          <div className="border border-gray-300 rounded-lg p-4 mb-4">
                            <textarea
                              value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                              placeholder="Type your response here..."
                              className="w-full border-0 p-0 focus-visible:ring-0 resize-none"
                              rows={3}
                            />
                          </div>
                          {inputValue.trim() && (
                            <div className="flex justify-end">
                              <Button
                                onClick={() => handleInputSubmit(inputValue)}
                                className="bg-[#0071BC] hover:bg-[#005A94] text-white rounded-lg font-montserrat"
                              >
                                Submit
                              </Button>
                            </div>
                          )}
                        </div>
                      )}

                      {message.options && !message.isDisabled && (
                        <div className="space-y-2">
                          {message.options.map((option) => (
                            <div key={option.id} className="border border-gray-300 rounded-lg p-4">
                              <Button
                                variant="ghost"
                                onClick={() => handleOptionSelect(option)}
                                className="w-full text-left justify-start h-auto p-0 font-montserrat text-gray-700 hover:bg-transparent hover:text-gray-900"
                              >
                                <span className="font-medium">{option.text}</span>
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end mb-4">
                    <div className="bg-[#0071BC] text-white rounded-lg px-4 py-2 max-w-md text-left">
                      <p className="text-sm font-montserrat leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Beta Note - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-200 px-4 py-2 z-40">
        <div className="container mx-auto">
          <p className="text-xs text-gray-600 font-montserrat text-center">
            <strong>BETA:</strong> This is a beta version of AskHub. We welcome your feedback to help us improve. Please
            send any comments or suggestions to{" "}
            <a href="mailto:digital.support@undp.org" className="text-[#0071BC] hover:underline">
              digital.support@undp.org
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
