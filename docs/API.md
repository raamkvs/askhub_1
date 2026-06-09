# API Documentation

## Overview

AskHub uses a minimal API surface with Next.js API routes for data persistence and external integrations.

## Endpoints

### POST /api/save

Saves user assessment responses to Airtable.

#### Request Body
\`\`\`typescript
{
  responses: UserResponse[],
  sessionId: string,
  email?: string
}
\`\`\`

#### UserResponse Interface
\`\`\`typescript
interface UserResponse {
  questionId: string;
  question: string;
  answer: string;
  answerText: string;
}
\`\`\`

#### Response
\`\`\`typescript
// Success
{
  success: true
}

// Error
{
  success: false,
  error: string
}
\`\`\`

#### Example Request
\`\`\`javascript
const response = await fetch('/api/save', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    responses: [
      {
        questionId: 'country',
        question: 'Which country are you in?',
        answer: 'Nigeria',
        answerText: 'Nigeria'
      }
    ],
    sessionId: 'uuid-here',
    email: 'user@example.com'
  })
});
\`\`\`

## Airtable Integration

### Field Mapping
The API maps assessment questions to Airtable field IDs:

| Question ID | Airtable Field ID | Description |
|-------------|-------------------|-------------|
| country | fldpmAdlHqwe9PsCS | User's country |
| role | fldO5uCGgefs7gpRa | User's professional role |
| build-goal | fldXVQk3ouHwAr3hx | What they want to build |
| ai-journey | fld05GrR98I7o28pc | AI journey stage |
| ai-experience | fldbrAiv6dWIXAVwn | AI experience level |
| learning-history | fldn21ariYL7s0moq | Previous AI learning |
| ai-goals | fldjAyOibMPBESy3Y | AI goals and objectives |
| team-size | fld0btfsVQ4gCxiO1 | Team composition |
| compute-experience | fld1YpOi7NBcyO59C | Compute experience level |

### Standard Fields
Every record includes:
- `fldPSqbodvtYcTqc1`: Session ID
- `fldrxV7JnxDL7HR1s`: Email address
- `fldDEhp5uQe7DHjIk`: Timestamp

### Error Handling
- Network errors return 500 status
- Invalid data returns 400 status
- Airtable API errors are logged and returned

## Environment Variables

### Required Variables
\`\`\`env
NEXT_PRIVATE_AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
NEXT_PRIVATE_AIRTABLE_TABLE_NAME=TableName
NEXT_PRIVATE_AIRTABLE_API_KEY=keyXXXXXXXXXXXXXX
\`\`\`

### Security Notes
- All Airtable variables use `NEXT_PRIVATE_` prefix
- API key should have write access to the specified table
- Base ID and table name are project-specific

## Rate Limiting

### Airtable Limits
- 5 requests per second per base
- 1,200 requests per workspace per hour
- The API includes basic error handling for rate limits

### Recommendations
- Implement client-side debouncing for rapid submissions
- Consider caching for read operations
- Monitor usage via Airtable dashboard

## Testing

### Manual Testing
\`\`\`bash
curl -X POST http://localhost:3000/api/save \
  -H "Content-Type: application/json" \
  -d '{
    "responses": [
      {
        "questionId": "country",
        "question": "Which country are you in?",
        "answer": "Kenya",
        "answerText": "Kenya"
      }
    ],
    "sessionId": "test-session-123"
  }'
\`\`\`

### Expected Response
\`\`\`json
{
  "success": true
}
\`\`\`

## Error Codes

| Status | Description | Action |
|--------|-------------|---------|
| 200 | Success | Data saved successfully |
| 400 | Bad Request | Check request format |
| 500 | Server Error | Check Airtable connection |
| 429 | Rate Limited | Retry after delay |

## Monitoring

### Logging
- All API calls are logged with timestamps
- Errors include full stack traces
- Airtable responses are logged for debugging

### Metrics to Track
- API response times
- Success/failure rates
- Airtable quota usage
- Geographic distribution of requests
