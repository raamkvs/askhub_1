# Contributing Guide

## Welcome Contributors

Thank you for your interest in contributing to AskHub! This guide will help you get started with contributing to the AI Hub for Sustainable Development's coaching platform.

## 🎯 Project Mission

AskHub connects African innovators with AI resources, programmes, and partnerships to accelerate sustainable development impact. Every contribution helps build Africa's AI ecosystem.

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- Git
- Code editor (VS Code recommended)
- Basic knowledge of React, TypeScript, and Next.js

### Development Setup

1. **Fork the Repository**
   \`\`\`bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/askhub.git
   cd askhub
   \`\`\`

2. **Install Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set Up Environment**
   \`\`\`bash
   cp .env.example .env.local
   # Add your Airtable credentials
   \`\`\`

4. **Start Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Verify Setup**
   - Open http://localhost:3000
   - Complete a test assessment flow
   - Check that all features work

## 🏗️ Development Workflow

### Branch Strategy
- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/description`: New features
- `fix/description`: Bug fixes
- `docs/description`: Documentation updates

### Creating a Feature Branch
\`\`\`bash
git checkout main
git pull origin main
git checkout -b feature/your-feature-name
\`\`\`

### Making Changes
1. **Write Code**
   - Follow existing code patterns
   - Add TypeScript types
   - Include error handling
   - Write descriptive comments

2. **Test Locally**
   - Test all affected functionality
   - Check responsive design
   - Verify accessibility
   - Test across browsers

3. **Commit Changes**
   \`\`\`bash
   git add .
   git commit -m "feat: add new assessment question type"
   \`\`\`

### Commit Message Format
Use conventional commits:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Maintenance tasks

Examples:
\`\`\`
feat: add multi-language support for assessment
fix: resolve mobile menu closing issue
docs: update API documentation
style: improve button hover animations
\`\`\`

## 📝 Code Standards

### TypeScript
- Use strict TypeScript configuration
- Define interfaces for all props and data structures
- Avoid `any` type - use specific types
- Export types for reusability

\`\`\`typescript
// Good
interface UserResponse {
  questionId: string;
  question: string;
  answer: string;
  answerText: string;
}

// Avoid
const response: any = {...}
\`\`\`

### React Components
- Use functional components with hooks
- Implement proper prop validation
- Handle loading and error states
- Use descriptive component names

\`\`\`typescript
// Good
interface AssessmentQuestionProps {
  question: Question;
  onAnswer: (answer: string) => void;
  isLoading?: boolean;
}

export function AssessmentQuestion({ 
  question, 
  onAnswer, 
  isLoading = false 
}: AssessmentQuestionProps) {
  // Component implementation
}
\`\`\`

### Styling
- Use Tailwind CSS classes
- Follow mobile-first responsive design
- Maintain consistent spacing and colors
- Use design system variables

\`\`\`typescript
// Good
<button className="bg-[#0071BC] hover:bg-[#005A94] text-white font-montserrat font-bold px-6 py-3 rounded-lg">

// Avoid inline styles
<button style={{backgroundColor: '#0071BC'}}>
\`\`\`

### File Organization
\`\`\`
components/
├── ui/              # Reusable UI components
├── forms/           # Form-specific components
├── assessment/      # Assessment-related components
└── layout/          # Layout components
\`\`\`

## 🧪 Testing Guidelines

### Manual Testing Checklist
Before submitting a PR, test:

#### Functionality
- [ ] Assessment flow completes successfully
- [ ] All programme pathways work correctly
- [ ] Form submissions process properly
- [ ] Navigation functions as expected
- [ ] Error states display appropriately

#### Responsive Design
- [ ] Mobile devices (320px - 768px)
- [ ] Tablets (768px - 1024px)
- [ ] Desktop (1024px+)
- [ ] Large screens (1440px+)

#### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

#### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Color contrast meets WCAG standards
- [ ] Focus indicators visible

### Test Scenarios
1. **New User Journey**
   - Complete assessment as first-time user
   - Verify appropriate recommendations
   - Test email signup flow

2. **Different User Types**
   - Infrastructure builder pathway
   - Student resources pathway
   - Advanced team pathway
   - Non-African user experience

3. **Error Handling**
   - Network connectivity issues
   - Invalid form submissions
   - API failures

## 🎨 Design Guidelines

### Visual Consistency
- Use established color palette
- Follow typography hierarchy
- Maintain consistent spacing
- Apply design system patterns

### User Experience
- Prioritize clarity and simplicity
- Provide clear feedback for actions
- Minimize cognitive load
- Ensure intuitive navigation

### Accessibility
- Use semantic HTML elements
- Provide alt text for images
- Ensure keyboard accessibility
- Maintain color contrast ratios

## 📚 Documentation

### Code Documentation
- Document complex functions
- Explain business logic
- Include usage examples
- Update README for new features

### API Documentation
- Document new endpoints
- Include request/response examples
- Explain error codes
- Update OpenAPI specs

### User Documentation
- Update user guides for new features
- Include screenshots for UI changes
- Explain configuration options
- Provide troubleshooting steps

## 🔍 Code Review Process

### Submitting a Pull Request
1. **Prepare Your PR**
   \`\`\`bash
   git push origin feature/your-feature-name
   \`\`\`

2. **Create Pull Request**
   - Use descriptive title
   - Include detailed description
   - Reference related issues
   - Add screenshots for UI changes

3. **PR Template**
   \`\`\`markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Performance improvement

   ## Testing
   - [ ] Manual testing completed
   - [ ] Cross-browser testing
   - [ ] Mobile responsiveness verified

   ## Screenshots
   (Include for UI changes)
   \`\`\`

### Review Criteria
Reviewers will check:
- Code quality and standards
- Functionality and testing
- Performance impact
- Security considerations
- Documentation updates

### Addressing Feedback
- Respond to all review comments
- Make requested changes promptly
- Ask questions if unclear
- Update PR description if needed

## 🐛 Bug Reports

### Before Reporting
1. Check existing issues
2. Reproduce the bug
3. Test in different browsers
4. Gather system information

### Bug Report Template
\`\`\`markdown
## Bug Description
Clear description of the issue

## Steps to Reproduce
1. Go to...
2. Click on...
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- Browser: Chrome 91
- OS: macOS 12
- Device: Desktop
- Screen size: 1920x1080

## Screenshots
(If applicable)
\`\`\`

## 💡 Feature Requests

### Feature Request Template
\`\`\`markdown
## Feature Description
Clear description of the proposed feature

## Problem Statement
What problem does this solve?

## Proposed Solution
How should this work?

## Alternatives Considered
Other approaches considered

## Additional Context
Any other relevant information
\`\`\`

## 🤝 Community Guidelines

### Code of Conduct
- Be respectful and inclusive
- Welcome newcomers
- Provide constructive feedback
- Focus on the project's mission

### Communication
- Use clear, professional language
- Be patient with questions
- Share knowledge generously
- Celebrate contributions

### Getting Help
- Check documentation first
- Search existing issues
- Ask specific questions
- Provide context and examples

## 🏆 Recognition

### Contributor Recognition
- Contributors listed in README
- Special recognition for major contributions
- Invitation to project discussions
- Opportunity to mentor new contributors

### Types of Contributions
We value all contributions:
- Code improvements
- Bug fixes
- Documentation updates
- Design enhancements
- Testing and QA
- User feedback
- Community support

## 📞 Contact

### Project Maintainers
- **Technical Lead**: digital.support@undp.org
- **Product Owner**: aihubfordevelopment@undp.org

### Community Channels
- GitHub Issues: Technical discussions
- Email: General inquiries
- Documentation: Project wiki

Thank you for contributing to AskHub and helping build Africa's AI future! 🚀
