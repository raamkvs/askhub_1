# Deployment Guide

## Overview

AskHub is deployed on Vercel with automatic deployments from the main branch. This guide covers deployment setup, configuration, and maintenance.

## Vercel Deployment

### Initial Setup

1. **Connect Repository**
   - Log into Vercel dashboard
   - Click "New Project"
   - Import from GitHub repository
   - Select the AskHub repository

2. **Configure Build Settings**
   \`\`\`
   Framework Preset: Next.js
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   \`\`\`

3. **Set Environment Variables**
   Navigate to Project Settings → Environment Variables:
   \`\`\`
   NEXT_PRIVATE_AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
   NEXT_PRIVATE_AIRTABLE_TABLE_NAME=YourTableName
   NEXT_PRIVATE_AIRTABLE_API_KEY=keyXXXXXXXXXXXXXX
   \`\`\`

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - Domain will be assigned (e.g., `askhub-xyz.vercel.app`)

### Custom Domain Setup

1. **Add Domain**
   - Go to Project Settings → Domains
   - Add your custom domain (e.g., `ask.aihubfordevelopment.org`)

2. **DNS Configuration**
   Add CNAME record in your DNS provider:
   \`\`\`
   Type: CNAME
   Name: ask
   Value: cname.vercel-dns.com
   \`\`\`

3. **SSL Certificate**
   - Vercel automatically provisions SSL certificates
   - HTTPS is enforced by default

### Environment Configuration

#### Production Variables
\`\`\`env
NEXT_PRIVATE_AIRTABLE_BASE_ID=appPRODUCTIONBASE
NEXT_PRIVATE_AIRTABLE_TABLE_NAME=Responses
NEXT_PRIVATE_AIRTABLE_API_KEY=keyPRODUCTIONKEY
\`\`\`

#### Preview Variables
\`\`\`env
NEXT_PRIVATE_AIRTABLE_BASE_ID=appSTAGINGBASE
NEXT_PRIVATE_AIRTABLE_TABLE_NAME=TestResponses
NEXT_PRIVATE_AIRTABLE_API_KEY=keySTAGINGKEY
\`\`\`

## Build Process

### Next.js Configuration
**File**: `next.config.mjs`

\`\`\`javascript
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}
\`\`\`

### Build Optimization
- **Image Optimization**: Disabled for compatibility
- **TypeScript**: Build errors ignored for deployment
- **ESLint**: Warnings don't block builds

### Build Commands
\`\`\`bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Linting
npm run lint
\`\`\`

## Monitoring & Analytics

### Vercel Analytics
- **Performance**: Core Web Vitals tracking
- **Usage**: Page views and user sessions
- **Errors**: Runtime error monitoring
- **Functions**: API route performance

### Google Analytics
Configured with tracking ID: `G-ESVPSCGLQ5`

\`\`\`javascript
// Implemented in app/layout.tsx
gtag('config', 'G-ESVPSCGLQ5');
\`\`\`

### Airtable Monitoring
- **API Usage**: Monitor request quotas
- **Data Quality**: Regular data validation
- **Backup**: Automated Airtable backups

## Performance Optimization

### Core Web Vitals
Target metrics:
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Optimization Strategies
1. **Image Optimization**
   - WebP format where supported
   - Appropriate sizing for different viewports
   - Lazy loading for below-fold images

2. **Code Splitting**
   - Route-based splitting with Next.js
   - Dynamic imports for heavy components
   - Tree shaking for unused code

3. **Caching**
   - Static assets cached at CDN level
   - API responses cached where appropriate
   - Browser caching headers optimized

## Security

### Environment Variables
- All sensitive data in environment variables
- `NEXT_PRIVATE_` prefix for server-only variables
- No secrets in client-side code

### API Security
- Rate limiting on API routes
- Input validation and sanitization
- CORS configuration
- HTTPS enforcement

### Content Security Policy
\`\`\`javascript
// Recommended CSP headers
"Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline';"
\`\`\`

## Backup & Recovery

### Data Backup
1. **Airtable Backups**
   - Weekly automated exports
   - Manual exports before major changes
   - Version control for schema changes

2. **Code Repository**
   - Git version control
   - Protected main branch
   - Regular commits with descriptive messages

### Disaster Recovery
1. **Vercel Rollback**
   - Previous deployments available in dashboard
   - One-click rollback to stable version
   - Deployment history maintained

2. **Database Recovery**
   - Airtable revision history
   - Point-in-time recovery available
   - Data export/import procedures

## Maintenance

### Regular Tasks

#### Weekly
- [ ] Review Vercel analytics
- [ ] Check Airtable usage quotas
- [ ] Monitor error logs
- [ ] Validate form submissions

#### Monthly
- [ ] Update dependencies
- [ ] Review performance metrics
- [ ] Backup Airtable data
- [ ] Security audit

#### Quarterly
- [ ] Comprehensive testing
- [ ] Performance optimization review
- [ ] User feedback analysis
- [ ] Infrastructure cost review

### Dependency Updates
\`\`\`bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update major versions carefully
npm install package@latest
\`\`\`

### Security Updates
- Monitor GitHub security advisories
- Update dependencies with security patches
- Regular security scanning with tools like `npm audit`

## Troubleshooting

### Common Issues

#### Build Failures
\`\`\`bash
# Clear Next.js cache
rm -rf .next

# Clear node modules
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run build
\`\`\`

#### Environment Variable Issues
- Verify variable names match exactly
- Check for trailing spaces or special characters
- Ensure variables are set in correct environment (production/preview)

#### Airtable Connection Issues
- Verify API key permissions
- Check base ID and table name
- Monitor rate limits and quotas

### Error Monitoring
- Vercel Functions logs
- Browser console errors
- Airtable API error responses
- Google Analytics error tracking

### Support Contacts
- **Vercel Support**: support@vercel.com
- **Airtable Support**: support@airtable.com
- **Technical Issues**: digital.support@undp.org

## Scaling Considerations

### Traffic Growth
- Vercel automatically scales serverless functions
- Monitor bandwidth usage and costs
- Consider CDN optimization for global users

### Data Growth
- Airtable record limits (50,000 per base on Pro plan)
- Consider data archiving strategies
- Monitor API rate limits with increased usage

### Feature Expansion
- Modular component architecture supports growth
- API design allows for additional endpoints
- Database schema can accommodate new fields

## Cost Management

### Vercel Pricing
- **Hobby Plan**: Free for personal projects
- **Pro Plan**: $20/month for commercial use
- **Enterprise**: Custom pricing for large scale

### Airtable Pricing
- **Free Plan**: 1,200 records per base
- **Plus Plan**: $10/month for 5,000 records
- **Pro Plan**: $20/month for 50,000 records

### Optimization Tips
- Monitor function execution time
- Optimize image sizes and formats
- Use efficient database queries
- Implement caching where appropriate
