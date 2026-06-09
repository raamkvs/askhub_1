# Component Documentation

## Overview

AskHub uses a component-based architecture with React and TypeScript. Components are organized by functionality and reusability.

## Component Hierarchy

\`\`\`
App (page.tsx)
├── LandingPage
│   ├── Header Navigation
│   ├── Hero Section
│   ├── Programme Cards
│   └── Footer
└── AskHubInterface
    ├── ConversationFlow
    │   ├── ChatMessage
    │   ├── OptionButtons
    │   └── InputFields
    └── RecommendationResults
        ├── PathwayCards
        ├── ResourceLinks
        └── ApplicationForm
\`\`\`

## Core Components

### LandingPage
**File**: `components/landing-page.tsx`

The main homepage component showcasing AskHub and AI Hub programmes.

#### Props
\`\`\`typescript
interface LandingPageProps {
  onLaunchCoach: (trigger: string) => void;
}
\`\`\`

#### Features
- Responsive navigation with mobile menu
- Hero section with call-to-action
- Programme showcase cards
- Collaborator logos
- Footer with partner information

#### Key Sections
- **Header**: Navigation with dropdown menus
- **Hero**: AskHub branding and description
- **How It Works**: Step-by-step process
- **Programmes**: Compute Accelerator and Infrastructure Builder
- **Footer**: Contact information and partnerships

### ConversationFlow
**File**: `components/conversation-flow.tsx`

The main chat interface that guides users through the assessment.

#### Props
\`\`\`typescript
interface ConversationFlowProps {
  sessionId: string;
  trigger: string;
  onBack: () => void;
}
\`\`\`

#### State Management
\`\`\`typescript
const [messages, setMessages] = useState<ChatMessage[]>([]);
const [responses, setResponses] = useState<UserResponse[]>([]);
const [isComplete, setIsComplete] = useState(false);
\`\`\`

#### Message Types
- **Bot Messages**: Questions and follow-up responses
- **User Messages**: Selected answers and text input
- **Input Types**: Dropdown, text, textarea, option buttons

#### Flow Logic
1. Start with country selection
2. Progress through role, goals, and experience questions
3. Branch based on user type (Infrastructure Builder vs others)
4. Complete assessment and show results

### RecommendationResults
**File**: `components/recommendation-results.tsx`

Displays personalized recommendations based on user responses.

#### Props
\`\`\`typescript
interface RecommendationResultsProps {
  responses: UserResponse[];
  sessionId: string;
  onBack: () => void;
}
\`\`\`

#### Recommendation Logic
\`\`\`typescript
// Determine user pathway
const isFromAfrica = AFRICAN_COUNTRIES.includes(country);
const showComputeAccelerator = () => {
  return isFromAfrica && 
         computeExperience?.includes(['ready', 'advanced']) &&
         teamSize?.includes(['small', 'medium', 'large']);
};
\`\`\`

#### Resource Categories
- **Programme Recommendations**: Compute Accelerator, Infrastructure Builder
- **Learning Resources**: Courses, certifications, tutorials
- **Tools and Platforms**: Development tools, datasets, compute access
- **Community**: Networks, forums, expert connections

### ApplicationForm
**File**: `components/application-form.tsx`

Multi-step form for programme applications.

#### Props
\`\`\`typescript
interface ApplicationFormProps {
  pathway: Pathway;
  sessionId: string;
  onBack: () => void;
}
\`\`\`

#### Form Steps
1. **Organization Info**: Name, contact, country
2. **Project Details**: Sector, team size, use case
3. **Additional Info**: Funding stage, file uploads (Infrastructure Builder only)
4. **Consent**: Terms of service, email preferences

#### Validation
- Required field validation
- Email format validation
- File type restrictions (PDF, DOC, DOCX)
- Progressive disclosure based on programme type

## UI Components

### Base Components
Located in `components/ui/`, these are built on Radix UI primitives:

- **Button**: Primary actions and navigation
- **Input**: Text input fields
- **Select**: Dropdown selections
- **Textarea**: Multi-line text input
- **Checkbox**: Boolean selections
- **Card**: Content containers
- **Badge**: Status indicators

### Custom Components

#### SignupModal
**File**: `components/signup-modal.tsx`

Email collection modal for marketing follow-up.

#### TitleSetter
**File**: `components/title-setter.tsx`

Dynamic page title management.

#### QuestionCard
**File**: `components/question-card.tsx`

Assessment question display with options.

#### RecommendationCard
**File**: `components/recommendation-card.tsx`

Programme recommendation display.

## Styling Patterns

### Tailwind Classes
Common patterns used throughout the application:

\`\`\`css
/* Layout */
.container mx-auto px-6 py-8

/* Typography */
.font-montserrat font-bold text-xl

/* Colors */
.bg-[#0071BC] text-white
.text-[#6C6F75] 
.bg-[#D9F1FF]

/* Interactive */
.hover:bg-blue-50 transition-all
.rounded-lg shadow-sm
\`\`\`

### Responsive Design
- Mobile-first approach
- Breakpoints: `md:` (768px+), `lg:` (1024px+)
- Flexible grid layouts
- Collapsible navigation

## State Management

### Local State
Components use React's `useState` for local state management:

\`\`\`typescript
// Message history
const [messages, setMessages] = useState<ChatMessage[]>([]);

// User responses
const [responses, setResponses] = useState<UserResponse[]>([]);

// UI state
const [isLoading, setIsLoading] = useState(false);
\`\`\`

### Props Drilling
Data flows down through props:
- Session ID generated at app level
- User responses passed to recommendation engine
- Navigation callbacks for page transitions

### Side Effects
`useEffect` hooks handle:
- Auto-scrolling in chat interface
- Modal timing
- Click outside handlers
- Data persistence

## Accessibility

### ARIA Labels
\`\`\`typescript
<button aria-pressed={isSelected}>
<div aria-live="polite" aria-atomic="true">
\`\`\`

### Keyboard Navigation
- Tab order management
- Enter key submission
- Escape key modal closing

### Screen Reader Support
- Semantic HTML elements
- Alt text for images
- Screen reader only text with `sr-only` class

## Performance

### Code Splitting
- Dynamic imports for heavy components
- Route-based splitting with Next.js

### Image Optimization
- Next.js Image component where applicable
- Optimized asset formats
- Lazy loading for below-fold content

### Bundle Size
- Tree shaking for unused code
- Minimal external dependencies
- Efficient re-renders with React.memo where needed

## Testing Considerations

### Component Testing
- Props validation
- State transitions
- Event handling
- Conditional rendering

### Integration Testing
- Form submission flows
- Navigation between components
- Data persistence
- Error handling

### Accessibility Testing
- Screen reader compatibility
- Keyboard navigation
- Color contrast ratios
- Focus management
