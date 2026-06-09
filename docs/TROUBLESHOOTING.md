# Troubleshooting Guide

## Common Issues and Solutions

### Development Environment

#### Node.js Version Issues
**Problem**: Build fails with Node.js version errors
\`\`\`
Error: The engine "node" is incompatible with this module
\`\`\`

**Solution**:
\`\`\`bash
# Check current Node.js version
node --version

# Install Node.js 18 or higher
# Using nvm (recommended)
nvm install 18
nvm use 18

# Verify installation
node --version
npm --version
\`\`\`

#### Dependency Installation Failures
**Problem**: `npm install` fails with permission or network errors

**Solutions**:
\`\`\`bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install

# If permission issues on macOS/Linux
sudo chown -R $(whoami) ~/.npm
\`\`\`

#### Environment Variables Not Loading
**Problem**: Application can't connect to Airtable

**Checklist**:
- [ ] `.env.local` file exists in project root
- [ ] Variable names match exactly (case-sensitive)
- [ ] No trailing spaces in values
- [ ] File is not committed to git (in `.gitignore`)

**Example `.env.local`**:
\`\`\`env
NEXT_PRIVATE_AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
NEXT_PRIVATE_AIRTABLE_TABLE_NAME=Responses
NEXT_PRIVATE_AIRTABLE_API_KEY=keyXXXXXXXXXXXXXX
\`\`\`

### Build and Deployment Issues

#### Next.js Build Failures
**Problem**: `npm run build` fails with TypeScript errors

**Solutions**:
\`\`\`bash
# Check for TypeScript errors
npx tsc --noEmit

# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
\`\`\`

**Common TypeScript Fixes**:
\`\`\`typescript
// Fix: Property does not exist on type
interface Props {
  onLaunchCoach: (trigger: string) => void;
}

// Fix: Object is possibly undefined
const country = responses.find(r => r.questionId === 'country')?.answer || '';

// Fix: Type assertion
const element = document.getElementById('menu') as HTMLElement;
\`\`\`

#### Vercel Deployment Issues
**Problem**: Deployment fails or environment variables not working

**Solutions**:
1. **Check Build Logs**
   - Go to Vercel dashboard
   - Click on failed deployment
   - Review build logs for errors

2. **Environment Variables**
   - Verify all required variables are set
   - Check variable names match code
   - Ensure no typos in values

3. **Build Settings**
   \`\`\`
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   \`\`\`

### Runtime Issues

#### Airtable Connection Errors
**Problem**: API calls to Airtable fail

**Error Messages**:
\`\`\`
INVALID_REQUEST_MISSING_FIELDS
INVALID_REQUEST_UNKNOWN_FIELD_NAME
NOT_FOUND
\`\`\`

**Solutions**:
1. **Verify Credentials**
   \`\`\`bash
   # Test API connection
   curl -H "Authorization: Bearer YOUR_API_KEY" \
        https://api.airtable.com/v0/YOUR_BASE_ID/YOUR_TABLE_NAME
   \`\`\`

2. **Check Field Mapping**
   - Verify field IDs in `api/save/route.tsx`
   - Ensure fields exist in Airtable table
   - Check field types match expected data

3. **Rate Limiting**
   - Airtable allows 5 requests/second
   - Implement retry logic for rate limits
   - Monitor usage in Airtable dashboard

#### Form Submission Issues
**Problem**: Assessment responses not saving

**Debugging Steps**:
1. **Check Browser Console**
   \`\`\`javascript
   // Open browser dev tools
   // Look for network errors in Console tab
   // Check Network tab for failed requests
   \`\`\`

2. **Verify Request Format**
   \`\`\`javascript
   // Expected request body
   {
     "responses": [
       {
         "questionId": "country",
         "question": "Which country are you in?",
         "answer": "Nigeria",
         "answerText": "Nigeria"
       }
     ],
     "sessionId": "uuid-here",
     "email": "user@example.com"
   }
   \`\`\`

3. **Test API Endpoint**
   \`\`\`bash
   curl -X POST http://localhost:3000/api/save \
     -H "Content-Type: application/json" \
     -d '{"responses":[],"sessionId":"test"}'
   \`\`\`

### UI and UX Issues

#### Mobile Menu Not Working
**Problem**: Mobile navigation doesn't open/close properly

**Solutions**:
1. **Check State Management**
   \`\`\`typescript
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   
   // Ensure toggle function works
   const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
   \`\`\`

2. **Verify Click Handlers**
   \`\`\`typescript
   // Make sure onClick is properly attached
   <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
   \`\`\`

3. **CSS Classes**
   \`\`\`typescript
   // Check conditional classes
   className={`menu ${isMobileMenuOpen ? 'open' : 'closed'}`}
   \`\`\`

#### Responsive Design Issues
**Problem**: Layout breaks on certain screen sizes

**Debugging**:
1. **Use Browser Dev Tools**
   - Toggle device toolbar
   - Test different screen sizes
   - Check CSS media queries

2. **Common Breakpoints**
   \`\`\`css
   /* Mobile */
   @media (max-width: 767px) { }
   
   /* Tablet */
   @media (min-width: 768px) and (max-width: 1023px) { }
   
   /* Desktop */
   @media (min-width: 1024px) { }
   \`\`\`

3. **Tailwind Responsive Classes**
   \`\`\`typescript
   // Mobile first approach
   className="w-full md:w-1/2 lg:w-1/3"
   \`\`\`

#### Assessment Flow Stuck
**Problem**: User can't progress through questions

**Common Causes**:
1. **State Not Updating**
   \`\`\`typescript
   // Check if responses array is updating
   console.log('Current responses:', responses);
   \`\`\`

2. **Validation Issues**
   \`\`\`typescript
   // Ensure validation logic is correct
   const canProceed = () => {
     return inputValue.trim().length > 0;
   };
   \`\`\`

3. **Event Handlers**
   \`\`\`typescript
   // Verify click handlers are attached
   const handleOptionSelect = (option) => {
     console.log('Option selected:', option);
     // Update state logic
   };
   \`\`\`

### Performance Issues

#### Slow Page Loading
**Problem**: Pages take too long to load

**Solutions**:
1. **Optimize Images**
   \`\`\`typescript
   // Use Next.js Image component
   import Image from 'next/image';
   
   <Image
     src="/images/hero.png"
     alt="Hero image"
     width={800}
     height={600}
     priority // For above-fold images
   />
   \`\`\`

2. **Code Splitting**
   \`\`\`typescript
   // Dynamic imports for heavy components
   const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
     loading: () => <p>Loading...</p>
   });
   \`\`\`

3. **Bundle Analysis**
   \`\`\`bash
   # Analyze bundle size
   npm install --save-dev @next/bundle-analyzer
   
   # Add to next.config.js
   const withBundleAnalyzer = require('@next/bundle-analyzer')({
     enabled: process.env.ANALYZE === 'true'
   });
   
   # Run analysis
   ANALYZE=true npm run build
   \`\`\`

#### Memory Leaks
**Problem**: Application becomes slow over time

**Solutions**:
1. **Clean Up Event Listeners**
   \`\`\`typescript
   useEffect(() => {
     const handleClick = () => { /* handler */ };
     document.addEventListener('click', handleClick);
     
     return () => {
       document.removeEventListener('click', handleClick);
     };
   }, []);
   \`\`\`

2. **Cancel Async Operations**
   \`\`\`typescript
   useEffect(() => {
     let cancelled = false;
     
     fetchData().then(data => {
       if (!cancelled) {
         setData(data);
       }
     });
     
     return () => {
       cancelled = true;
     };
   }, []);
   \`\`\`

### Browser Compatibility

#### Safari Issues
**Problem**: Features not working in Safari

**Common Fixes**:
1. **CSS Flexbox**
   \`\`\`css
   /* Add vendor prefixes */
   display: -webkit-flex;
   display: flex;
   \`\`\`

2. **JavaScript Features**
   \`\`\`typescript
   // Use polyfills for newer features
   // Check caniuse.com for compatibility
   \`\`\`

#### Internet Explorer (Legacy)
**Problem**: Application doesn't work in IE

**Solution**: 
- IE is not officially supported
- Display upgrade message for IE users
- Focus on modern browser support

### Data Issues

#### Duplicate Submissions
**Problem**: Same user data submitted multiple times

**Solutions**:
1. **Debounce Submissions**
   \`\`\`typescript
   const [isSubmitting, setIsSubmitting] = useState(false);
   
   const handleSubmit = async () => {
     if (isSubmitting) return;
     setIsSubmitting(true);
     
     try {
       await submitData();
     } finally {
       setIsSubmitting(false);
     }
   };
   \`\`\`

2. **Session Tracking**
   \`\`\`typescript
   // Use session ID to prevent duplicates
   const sessionId = useMemo(() => generateUUID(), []);
   \`\`\`

#### Data Validation Errors
**Problem**: Invalid data being submitted

**Solutions**:
1. **Client-Side Validation**
   \`\`\`typescript
   const validateEmail = (email: string) => {
     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
   };
   \`\`\`

2. **Server-Side Validation**
   \`\`\`typescript
   // In API route
   if (!email || !validateEmail(email)) {
     return NextResponse.json(
       { success: false, error: 'Invalid email' },
       { status: 400 }
     );
   }
   \`\`\`

## Getting Help

### Debug Information to Collect
When reporting issues, include:

1. **Environment Details**
   - Operating system and version
   - Browser and version
   - Node.js version
   - npm version

2. **Error Information**
   - Complete error messages
   - Browser console logs
   - Network request details
   - Steps to reproduce

3. **Code Context**
   - Relevant code snippets
   - Configuration files
   - Environment variables (without sensitive values)

### Support Channels
- **GitHub Issues**: Technical problems and bugs
- **Email Support**: digital.support@undp.org
- **Documentation**: Check docs/ folder first

### Emergency Contacts
For critical production issues:
- **Technical Lead**: digital.support@undp.org
- **Project Manager**: aihubfordevelopment@undp.org

Remember: Most issues have been encountered before. Check existing GitHub issues and documentation before creating new support requests.
