# Production Environment Setup

## Airtable Production Configuration

### 1. Create Production Base
1. Log into Airtable
2. Create a new base called "AskHub Production"
3. Import the schema from your development base
4. Note the Base ID (starts with `app`)

### 2. Configure Table Structure
Ensure your table has these fields:
- `Session ID` (Single line text)
- `Email` (Email)
- `Timestamp` (Date and time)
- `Country` (Single select)
- `Role` (Single select)
- `Build Goal` (Single select)
- `AI Journey` (Single select)
- `AI Experience` (Single select)
- `Learning History` (Multiple select)
- `AI Goals` (Multiple select)
- `Team Size` (Single select)
- `Compute Experience` (Single select)

### 3. Generate API Key
1. Go to Account → API
2. Generate a new API key for production
3. Set appropriate permissions (read/write for your base)

## Environment Variables

### Required Variables
\`\`\`bash
NEXT_PRIVATE_AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
NEXT_PRIVATE_AIRTABLE_TABLE_NAME=Responses
NEXT_PRIVATE_AIRTABLE_API_KEY=keyXXXXXXXXXXXXXX
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
AIRTABLE_TABLE_NAME=Responses
AIRTABLE_API_KEY=keyXXXXXXXXXXXXXX
\`\`\`

### Setting Variables in Vercel
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable with the production values
5. Set environment to "Production"

## Domain Configuration

### Custom Domain Setup
1. **Purchase Domain** (if needed)
   - Recommended: `ask.yourdomain.com`
   - Alternative: `askhub.yourdomain.com`

2. **Configure DNS**
   \`\`\`
   Type: CNAME
   Name: ask
   Value: cname.vercel-dns.com
   TTL: 300
   \`\`\`

3. **Add to Vercel**
   - Project Settings → Domains
   - Add custom domain
   - Verify DNS configuration

### SSL Certificate
- Vercel automatically provisions SSL certificates
- HTTPS is enforced by default
- Certificate auto-renews

## Security Configuration

### Content Security Policy
The project includes security headers in `vercel.json`:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: origin-when-cross-origin
- Strict-Transport-Security: max-age=31536000

### Rate Limiting
API routes include basic rate limiting:
- Implemented in `/api/save/route.tsx`
- Prevents abuse and spam submissions

## Performance Optimization

### Image Optimization
- All images optimized for web
- Next.js Image component used throughout
- Appropriate sizing for different devices

### Caching Strategy
- Static assets cached at CDN level
- API responses cached appropriately
- Browser caching optimized

### Core Web Vitals Targets
- **LCP**: < 2.5 seconds
- **FID**: < 100 milliseconds  
- **CLS**: < 0.1

## Monitoring & Alerts

### Error Monitoring
- Vercel Functions provide error logs
- Monitor API route performance
- Set up alerts for critical errors

### Uptime Monitoring
Recommended tools:
- UptimeRobot (free)
- Pingdom
- StatusCake

### Performance Monitoring
- Vercel Speed Insights
- Google PageSpeed Insights
- Lighthouse CI

## Launch Checklist

### Pre-Launch
- [ ] All environment variables set
- [ ] Production Airtable base configured
- [ ] Build passes without errors
- [ ] All functionality tested
- [ ] Performance optimized
- [ ] Security headers configured

### Launch Day
- [ ] Deploy to production
- [ ] Test all functionality
- [ ] Verify form submissions
- [ ] Check error logs
- [ ] Monitor performance
- [ ] Run health checks

### Post-Launch
- [ ] Monitor performance metrics
- [ ] Review user feedback
- [ ] Check error logs daily
- [ ] Weekly analytics review
- [ ] Monthly security audit

Your AskHub application is now ready for production!
\`\`\`

```json file="package.json"
[v0-no-op-code-block-prefix]{
  "name": "my-v0-project",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "deploy": "bash scripts/deploy.sh",
    "health-check": "bash scripts/health-check.sh",
    "build:prod": "NODE_ENV=production next build",
    "start:prod": "NODE_ENV=production next start"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.9.1",
    "@radix-ui/react-accordion": "1.2.2",
    "@radix-ui/react-alert-dialog": "1.1.4",
    "@radix-ui/react-aspect-ratio": "1.1.1",
    "@radix-ui/react-avatar": "1.1.2",
    "@radix-ui/react-checkbox": "1.1.3",
    "@radix-ui/react-collapsible": "1.1.2",
    "@radix-ui/react-context-menu": "2.2.4",
    "@radix-ui/react-dialog": "1.1.4",
    "@radix-ui/react-dropdown-menu": "2.1.4",
    "@radix-ui/react-hover-card": "1.1.4",
    "@radix-ui/react-label": "2.1.1",
    "@radix-ui/react-menubar": "1.1.4",
    "@radix-ui/react-navigation-menu": "1.2.3",
    "@radix-ui/react-popover": "1.1.4",
    "@radix-ui/react-progress": "1.1.1",
    "@radix-ui/react-radio-group": "1.2.2",
    "@radix-ui/react-scroll-area": "1.2.2",
    "@radix-ui/react-select": "2.1.4",
    "@radix-ui/react-separator": "1.1.1",
    "@radix-ui/react-slider": "1.2.2",
    "@radix-ui/react-slot": "1.1.1",
    "@radix-ui/react-switch": "1.1.2",
    "@radix-ui/react-tabs": "1.1.2",
    "@radix-ui/react-toast": "1.2.4",
    "@radix-ui/react-toggle": "1.1.1",
    "@radix-ui/react-toggle-group": "1.1.1",
    "@radix-ui/react-tooltip": "1.1.6",
    "@vercel/analytics": "1.3.1",
    "autoprefixer": "^10.4.20",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "1.0.4",
    "date-fns": "4.1.0",
    "embla-carousel-react": "8.5.1",
    "geist": "^1.3.1",
    "input-otp": "1.4.1",
    "lucide-react": "^0.454.0",
    "next": "14.2.25",
    "next-themes": "^0.4.4",
    "react": "^19",
    "react-day-picker": "9.8.0",
    "react-dom": "^19",
    "react-hook-form": "^7.54.1",
    "react-resizable-panels": "^2.1.7",
    "recharts": "2.15.0",
    "sonner": "^1.7.1",
    "tailwind-merge": "^2.5.5",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^0.9.6",
    "zod": "^3.24.1"
  },
  "devDependencies": {
    "@types/node": "^22",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "postcss": "^8.5",
    "tailwindcss": "^3.4.17",
    "typescript": "5.7.3"
  }
}
