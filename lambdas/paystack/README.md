# Paystack Payment Lambda Function

This Lambda function handles Paystack payment processing for the Locsafe platform, including payment initialization, verification, and webhook handling.

## Features

- **Payment Initialization**: Create payment sessions with Paystack
- **Payment Verification**: Verify successful payments
- **Webhook Processing**: Handle Paystack webhooks for real-time updates
- **Plan Management**: Support for Basic, Pro, and Enterprise plans
- **Secure Transactions**: Signature verification for webhooks

## Prerequisites

- Node.js 18+ 
- AWS Lambda or similar serverless platform
- Paystack account with API keys
- Frontend application (already configured in `/src/components/paywall.jsx`)

## Installation

1. Navigate to the lambda directory:
```bash
cd lambdas/paystack
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file with actual values:
```env
PAYSTACK_SECRET_KEY=sk_live_your_secret_key_here
PAYSTACK_PUBLIC_KEY=pk_live_your_public_key_here
FRONTEND_URL=https://loc-safe.com
```

## API Endpoints

### 1. Initialize Payment
**POST** `/initialize`

Request body:
```json
{
  "email": "customer@example.com",
  "phoneNumber": "+254701746774",
  "planId": "basic",
  "metadata": {
    "customerName": "John Doe"
  }
}
```

Response:
```json
{
  "status": "success",
  "message": "Payment initialized successfully",
  "data": {
    "authorization_url": "https://checkout.paystack.com/...",
    "access_code": "...",
    "reference": "LOCSAFE_...",
    "planDetails": {
      "name": "Basic Plan",
      "amount": 4500,
      "currency": "KES",
      "description": "Perfect for small businesses - Up to 200 assets"
    }
  }
}
```

### 2. Verify Payment
**GET** `/verify?reference=LOCSAFE_xxx`

Response:
```json
{
  "status": "success",
  "message": "Payment verified successfully",
  "data": {
    "reference": "LOCSAFE_xxx",
    "amount": 4500,
    "currency": "KES",
    "paidAt": "2025-01-01T12:00:00Z",
    "channel": "card",
    "customerEmail": "customer@example.com",
    "planId": "basic",
    "planName": "Basic Plan"
  }
}
```

### 3. Get Plans
**GET** `/plans`

Response:
```json
{
  "status": "success",
  "message": "Plans retrieved successfully",
  "data": [
    {
      "id": "basic",
      "name": "Basic Plan",
      "amount": 4500,
      "currency": "KES",
      "description": "Perfect for small businesses - Up to 200 assets",
      "features": [...]
    }
  ]
}
```

### 4. Webhook Handler
**POST** `/webhook`

Automatically processes Paystack webhook events:
- `charge.success` - Payment successful
- `charge.failed` - Payment failed
- `subscription.create` - New subscription
- `subscription.disable` - Subscription cancelled

## Deployment Options

### AWS Lambda

1. Create deployment package:
```bash
zip -r paystack-lambda.zip index.js package.json node_modules/
```

2. Create Lambda function in AWS Console:
   - Runtime: Node.js 18.x
   - Handler: `index.handler`
   - Memory: 256 MB
   - Timeout: 30 seconds

3. Add environment variables in Lambda configuration

4. Create API Gateway trigger:
   - Type: REST API or HTTP API
   - Configure routes for each endpoint

5. Update CORS settings in API Gateway

### Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel --prod
```

3. Add environment variables in Vercel dashboard

### Netlify Functions

1. Move the function to `netlify/functions/paystack.js`

2. Deploy:
```bash
netlify deploy --prod
```

3. Configure environment variables in Netlify dashboard

## Frontend Integration

Update your frontend environment variables:

```env
# For Vite-based projects (like this one)
VITE_PAYSTACK_LAMBDA_URL=https://your-lambda-url.amazonaws.com/paystack

# For Create React App
REACT_APP_PAYSTACK_LAMBDA_URL=https://your-lambda-url.amazonaws.com/paystack
```

The frontend component (`src/components/paywall.jsx`) is already configured to:
1. Initialize payments through the Lambda
2. Handle payment redirects
3. Verify payment status
4. Display appropriate success/error messages

## Testing

### Local Testing

1. Use AWS SAM for local Lambda testing:
```bash
sam local start-api
```

2. Test endpoints:
```bash
# Initialize payment
curl -X POST http://localhost:3000/initialize \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","planId":"basic"}'

# Verify payment
curl http://localhost:3000/verify?reference=LOCSAFE_test_ref
```

### Paystack Test Mode

Use test API keys for development:
- Test Secret Key: `sk_test_...`
- Test Public Key: `pk_test_...`

Test card details:
- Card Number: `4084084084084081`
- CVV: `408`
- Expiry: Any future date
- PIN: `0000`

## Security Considerations

1. **API Keys**: Never commit API keys to version control
2. **Webhook Verification**: Always verify webhook signatures
3. **HTTPS Only**: Ensure all endpoints use HTTPS
4. **Rate Limiting**: Implement rate limiting for production
5. **Input Validation**: Validate all user inputs
6. **Error Handling**: Don't expose sensitive error details

## Monitoring

Recommended monitoring setup:
1. CloudWatch Logs (for AWS Lambda)
2. Payment success/failure rates
3. Webhook processing times
4. Error tracking (Sentry, Rollbar)

## Support

For issues or questions:
- Paystack Documentation: https://paystack.com/docs
- AWS Lambda Docs: https://docs.aws.amazon.com/lambda
- Contact: support@loc-safe.com

## License

MIT License - See LICENSE file in project root