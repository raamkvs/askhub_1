# AskHub Production Deployment Guide

## Quick Deployment Steps

### 1. Prepare for Deployment

Ensure all environment variables are properly set and the project is ready for production:

\`\`\`bash
# Install dependencies
npm install

# Run production build locally to test
npm run build

# Test the production build
npm start
\`\`\`

### 2. Deploy to Vercel (Recommended)

#### Option A: Deploy via Vercel CLI
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
\`\`\`

#### Option B: Deploy via GitHub Integration
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically deploy on push to main branch

### 3. Set Production Environment Variables

In your Vercel dashboard, add these environment variables:

\`\`\`
NEXT_PRIVATE_AIRTABLE_BASE_ID=your_production_base_id
NEXT_PRIVATE_AIRTABLE_TABLE_NAME=your_production_table_name  
NEXT_PRIVATE_AIRTABLE_API_KEY=your_production_api_key
AIRTABLE_BASE_ID=your_production_base_id
AIRTABLE_TABLE_NAME=your_production_table_name
AIRTABLE_API_KEY=your_production_api_key
\`\`\`

### 4. Configure Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed by Vercel

## Production Checklist

- [ ] Environment variables configured
- [ ] Airtable production base set up
- [ ] Build passes without errors
- [ ] All forms tested and working
- [ ] Analytics configured
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Performance optimized

## Post-Deployment Verification

1. **Test Core Functionality**
   - Landing page loads correctly
   - Assessment flow works end-to-end
   - Form submissions save to Airtable
   - All navigation links work

2. **Performance Check**
   - Run Lighthouse audit
   - Verify Core Web Vitals
   - Test on mobile devices

3. **Analytics Verification**
   - Google Analytics tracking active
   - Vercel Analytics enabled
   - Form submission tracking working

## Monitoring & Maintenance

- Monitor Vercel dashboard for errors
- Check Airtable for form submissions
- Review analytics data regularly
- Keep dependencies updated

Your AskHub application is now ready for production deployment!
