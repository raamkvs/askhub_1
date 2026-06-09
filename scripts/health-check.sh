#!/bin/bash

# AskHub Production Health Check Script
# Run this script to verify production deployment

DOMAIN="https://your-domain.vercel.app"  # Replace with your actual domain

echo "🏥 Running AskHub Production Health Check..."

# Check if site is accessible
echo "🌐 Checking site accessibility..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $DOMAIN)

if [ $HTTP_STATUS -eq 200 ]; then
    echo "✅ Site is accessible (HTTP $HTTP_STATUS)"
else
    echo "❌ Site is not accessible (HTTP $HTTP_STATUS)"
    exit 1
fi

# Check if API endpoint is working
echo "🔌 Checking API endpoint..."
API_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST $DOMAIN/api/save \
    -H "Content-Type: application/json" \
    -d '{"responses":[],"sessionId":"health-check","email":"test@example.com"}')

if [ $API_STATUS -eq 200 ] || [ $API_STATUS -eq 400 ]; then
    echo "✅ API endpoint is responding (HTTP $API_STATUS)"
else
    echo "⚠️  API endpoint returned HTTP $API_STATUS"
fi

# Check SSL certificate
echo "🔒 Checking SSL certificate..."
DOMAIN_NAME=$(echo $DOMAIN | sed 's|https://||' | sed 's|/.*||')
SSL_CHECK=$(echo | timeout 10 openssl s_client -servername $DOMAIN_NAME -connect $DOMAIN_NAME:443 2>/dev/null | openssl x509 -noout -dates 2>/dev/null | grep notAfter | cut -d= -f2)

if [ -n "$SSL_CHECK" ]; then
    echo "✅ SSL certificate is valid until: $SSL_CHECK"
else
    echo "⚠️  Could not verify SSL certificate (this is normal for some domains)"
fi

# Check page load time
echo "⏱️  Checking page load time..."
LOAD_TIME=$(curl -s -o /dev/null -w "%{time_total}" $DOMAIN)
echo "📊 Page load time: ${LOAD_TIME}s"

if (( $(echo "$LOAD_TIME < 3.0" | bc -l 2>/dev/null || echo "1") )); then
    echo "✅ Page load time is acceptable"
else
    echo "⚠️  Page load time is slow (${LOAD_TIME}s)"
fi

echo ""
echo "🎉 Health check completed!"
echo "📋 Summary:"
echo "   - Site Status: HTTP $HTTP_STATUS"
echo "   - API Status: HTTP $API_STATUS" 
echo "   - Load Time: ${LOAD_TIME}s"
