# Paystack Lambda Deployment Guide

## 🚨 Important: Environment Variables

The Lambda function **MUST** have the `PAYSTACK_SECRET_KEY` environment variable set, otherwise payment verification will fail.

## Quick Troubleshooting

### Test Your Configuration Locally

1. **Set your Paystack secret key:**
```bash
export PAYSTACK_SECRET_KEY=sk_test_your_actual_key_here
```

2. **Test verification:**
```bash
cd lambdas/paystack
node test-verify.js T401588093431473
```

This will show you:
- If the secret key is configured
- The actual API response from Paystack
- Any error messages

## AWS Lambda Deployment Steps

### 1. Prepare the Deployment Package

```bash
cd lambdas/paystack
npm install
zip -r ../paystack.zip .
```

### 2. Create Lambda Function in AWS Console

1. Go to AWS Lambda Console
2. Click "Create function"
3. Choose:
   - Function name: `paystack-payment-handler`
   - Runtime: Node.js 18.x or 20.x
   - Architecture: x86_64

### 3. Upload Code

1. In Function code section, click "Upload from" → ".zip file"
2. Upload the `paystack.zip` file
3. Set Handler to: `index.handler`

### 4. Configure Environment Variables (CRITICAL!)

In the Lambda function:
1. Go to **Configuration** → **Environment variables**
2. Click **Edit**
3. Add these variables:

| Key | Value | Required |
|-----|-------|----------|
| `PAYSTACK_SECRET_KEY` | `sk_test_xxxxx` (your actual key) | ✅ YES |
| `FRONTEND_URL` | `https://locsafe.org` | Optional |
| `NODE_ENV` | `production` | Optional |

⚠️ **Without `PAYSTACK_SECRET_KEY`, all payment verifications will fail!**

### 5. Create Function URL

1. Go to **Configuration** → **Function URL**
2. Click **Create function URL**
3. Settings:
   - Auth type: NONE (for public API)
   - CORS: Enable
   - Allow origins: `*`
   - Allow methods: `GET, POST, OPTIONS`
4. Save the Function URL (you'll need this for frontend)

### 6. Set Permissions

Ensure the Lambda execution role has basic permissions:
- `AWSLambdaBasicExecutionRole` (for CloudWatch logs)

### 7. Configure Settings

- **Memory**: 256 MB (sufficient for this function)
- **Timeout**: 30 seconds
- **Reserved concurrent executions**: Leave blank (or set based on expected load)

## Testing Your Deployed Lambda

### Test Verification Endpoint

```bash
# Replace with your actual Function URL and reference
curl "https://your-function-url.lambda-url.region.on.aws/verify?reference=T401588093431473"
```

Expected successful response:
```json
{
  "status": "success",
  "message": "Payment verified successfully",
  "data": {
    "reference": "T401588093431473",
    "amount": 4500,
    "currency": "KES",
    "customerEmail": "customer@example.com"
  }
}
```

### Common Errors and Solutions

#### Error: "Payment gateway configuration error"
```json
{
  "status": "error",
  "message": "Payment gateway configuration error. Please contact support.",
  "debug": "Missing PAYSTACK_SECRET_KEY environment variable"
}
```
**Solution**: Add `PAYSTACK_SECRET_KEY` to Lambda environment variables

#### Error: "Invalid API Key"
```json
{
  "status": "error",
  "message": "Invalid API Key"
}
```
**Solution**: 
- Verify your Paystack secret key is correct
- Ensure you're using test keys for test environment
- Check if the key starts with `sk_test_` for test or `sk_live_` for production

#### Error: "No transaction found"
```json
{
  "status": "error",
  "message": "No transaction found with the given reference"
}
```
**Solution**: 
- The reference doesn't exist in your Paystack account
- Ensure you're using the correct Paystack account
- For test references, ensure you're using test keys

## Frontend Configuration

Update your `.env` file:
```env
# Your Lambda Function URL
VITE_PAYSTACK_LAMBDA_URL=https://xxxxxxxxx.lambda-url.us-east-1.on.aws

# Your Paystack Public Key
VITE_PAYSTACK_PUBLIC_KEY=pk_test_your_public_key_here
```

## Monitoring

### CloudWatch Logs

1. Go to CloudWatch → Log groups
2. Find `/aws/lambda/paystack-payment-handler`
3. Check recent logs for any errors

### Enable Detailed Logging

The Lambda already includes console.log statements that will appear in CloudWatch:
- Request details
- API responses
- Error messages

## Security Best Practices

1. **Never commit secret keys** to version control
2. **Use different keys** for test and production
3. **Rotate keys regularly** through Paystack dashboard
4. **Monitor failed attempts** in CloudWatch logs
5. **Set up alerts** for repeated failures

## Vercel/Netlify Alternative Deployment

### Vercel
```bash
vercel --prod
# Set environment variables in Vercel dashboard
```

### Netlify Functions
1. Move function to `netlify/functions/paystack.js`
2. Deploy: `netlify deploy --prod`
3. Set environment variables in Netlify dashboard

## Need Help?

1. Check CloudWatch logs for detailed error messages
2. Run the local test script to verify API connectivity
3. Ensure your Paystack account is active and keys are valid
4. Contact Paystack support for API-related issues