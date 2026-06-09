# AskHub - AI Hub for Sustainable Development

AskHub is an AI-powered coaching platform designed to guide African innovators through their AI journey, connecting them with resources, partners, and accelerator programmes tailored for sustainable development impact.

## 🌍 Overview

The AI Hub for Sustainable Development connects African innovators with tools to build AI at scale, ranging from compute access and infrastructure programmes to expert mentorship and global partnerships. AskHub serves as the intelligent gateway to these resources.

## ✨ Key Features

- **Intelligent Assessment Flow**: Conversational AI that understands user needs and experience levels
- **Personalized Recommendations**: Tailored programme suggestions based on user responses
- **Multi-Programme Support**: 
  - Compute Accelerator Programme
  - Infrastructure Builder Programme
  - Early-stage resources and learning paths
- **Resource Hub**: Curated links to tools, training, and opportunities
- **Application Management**: Integrated application forms for programme enrollment
- **Data Collection**: Airtable integration for response tracking and analytics

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 15 with React 19
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui
- **Database**: Airtable for data storage
- **Deployment**: Vercel
- **Analytics**: Google Analytics

### Project Structure
\`\`\`
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   └── save/                 # Airtable data saving
│   ├── compute-accelerator/      # Programme pages
│   ├── infrastructure-builder/
│   ├── private-sector-partner/
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main application entry
├── components/                   # React components
│   ├── ui/                      # Base UI components
│   ├── application-form.tsx     # Multi-step application form
│   ├── assessment-flow.tsx      # Assessment questionnaire
│   ├── conversation-flow.tsx    # Main chat interface
│   ├── landing-page.tsx         # Homepage
│   ├── recommendation-results.tsx # Results and resources
│   └── signup-modal.tsx         # Email signup
├── lib/                         # Utilities
│   └── utils.ts                 # Helper functions
├── public/                      # Static assets
│   └── images/                  # Logos and graphics
└── docs/                        # Documentation
\`\`\`

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Airtable account (for data storage)
- Vercel account (for deployment)

### Installation

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/your-org/askhub.git
cd askhub
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
\`\`\`

3. **Set up environment variables**
\`\`\`bash
cp .env.example .env.local
\`\`\`

Configure the following variables:
\`\`\`env
NEXT_PRIVATE_AIRTABLE_BASE_ID=your_base_id
NEXT_PRIVATE_AIRTABLE_TABLE_NAME=your_table_name  
NEXT_PRIVATE_AIRTABLE_API_KEY=your_api_key
\`\`\`

4. **Run the development server**
\`\`\`bash
npm run dev
\`\`\`

5. **Open your browser**
Navigate to `http://localhost:3000`

## 📊 Data Flow

### User Journey
1. **Landing Page**: User learns about AskHub and programmes
2. **Assessment**: Conversational flow collects user information
3. **Analysis**: System determines user pathway based on responses
4. **Recommendations**: Personalized resources and programme suggestions
5. **Application**: Optional programme application submission
6. **Follow-up**: Email signup for continued engagement

### Data Collection
- User responses stored in Airtable
- Session tracking with UUID generation
- Email collection for marketing follow-up
- Analytics tracking via Google Analytics

## 🎨 Design System

### Colors
- **Primary Blue**: `#0071BC` (hub-blue)
- **Secondary Navy**: `#222D3D` (hub-navy) 
- **Light Blue**: `#D9F1FF` (hub-light)
- **Text Gray**: `#6C6F75` (hub-grey)

### Typography
- **Primary Font**: Montserrat
- **Fallbacks**: Georgia, Times New Roman

### Components
- Built on Radix UI primitives
- Consistent spacing and sizing
- Responsive design patterns
- Accessibility-first approach

## 🔧 Configuration

### Airtable Setup
The application uses Airtable for data storage with the following field mapping:

\`\`\`typescript
const fieldMap = {
  country: "fldpmAdlHqwe9PsCS",
  role: "fldO5uCGgefs7gpRa", 
  "build-goal": "fldXVQk3ouHwAr3hx",
  "ai-journey": "fld05GrR98I7o28pc",
  "ai-experience": "fldbrAiv6dWIXAVwn",
  "learning-history": "fldn21ariYL7s0moq",
  "ai-goals": "fldjAyOibMPBESy3Y",
  "team-size": "fld0btfsVQ4gCxiO1",
  "compute-experience": "fld1YpOi7NBcyO59C"
}
\`\`\`

### Analytics
Google Analytics is configured with ID: `G-ESVPSCGLQ5`

## 🧪 Testing

### Manual Testing Checklist
- [ ] Landing page loads correctly
- [ ] Assessment flow completes successfully
- [ ] All programme pathways work
- [ ] Application forms submit properly
- [ ] Email signup functions
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility

### Test User Scenarios
1. **New AI Learner**: Country selection → Student role → Early resources
2. **Infrastructure Builder**: Country selection → Infrastructure role �� Builder programme
3. **Advanced Team**: Country selection → Technical role → Compute programme
4. **Non-African User**: Non-African country → Limited resources message

## 🚀 Deployment

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables
Set these in your Vercel project settings:
- `NEXT_PRIVATE_AIRTABLE_BASE_ID`
- `NEXT_PRIVATE_AIRTABLE_TABLE_NAME`
- `NEXT_PRIVATE_AIRTABLE_API_KEY`

## 📈 Analytics & Monitoring

### Key Metrics
- Assessment completion rate
- Programme application submissions
- Email signup conversion
- User pathway distribution
- Geographic distribution

### Monitoring
- Vercel deployment status
- Airtable API health
- Google Analytics tracking
- Error logging via Vercel

## 🤝 Contributing

### Development Workflow
1. Create feature branch from `main`
2. Make changes following code style guidelines
3. Test thoroughly across devices/browsers
4. Submit pull request with detailed description
5. Code review and approval required
6. Merge to main triggers automatic deployment

### Code Style
- Use TypeScript for type safety
- Follow React best practices
- Implement responsive design
- Ensure accessibility compliance
- Write descriptive commit messages

## 📞 Support

### Contact Information
- **Technical Support**: digital.support@undp.org
- **Programme Inquiries**: aihubfordevelopment@undp.org
- **Website**: https://www.aihubfordevelopment.org/

### Known Issues
- Beta version with ongoing improvements
- Mobile menu requires manual close on some devices
- Large image assets may load slowly on poor connections

## 📄 License

This project is proprietary to the AI Hub for Sustainable Development initiative, implemented by UNDP and powered by the Ministry of Enterprises and Made in Italy.

## 🔄 Changelog

### Version 1.0.0 (Current)
- Initial release with core assessment flow
- Compute Accelerator and Infrastructure Builder programmes
- Airtable integration for data collection
- Responsive design implementation
- Google Analytics integration

### Planned Features
- Multi-language support
- Enhanced mobile experience
- Advanced analytics dashboard
- Integration with additional data sources
- Automated email follow-up sequences
