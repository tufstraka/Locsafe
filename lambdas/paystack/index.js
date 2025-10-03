const https = require('https');
const crypto = require('crypto');

// Helper function to make HTTPS requests
const makeRequest = (options, data = null) => {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          console.log(`Response status code: ${res.statusCode}`);
          if (res.statusCode >= 400) {
            console.error('HTTP Error Response:', parsed);
          }
          resolve(parsed);
        } catch (error) {
          console.error('Failed to parse response:', responseData);
          reject(new Error(`Invalid JSON response: ${responseData}`));
        }
      });
    });
    
    req.on('error', (error) => {
      console.error('Request error:', error);
      reject(error);
    });
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
};

// Plan configurations matching the frontend
const PLANS = {
  basic: {
    name: 'Basic Plan',
    amount: 450000, // Amount in kobo (Ksh 4,500)
    currency: 'KES',
    description: 'Perfect for small businesses - Up to 200 assets',
    assets: '200',
    features: [
      'Real-time GPS tracking',
      'Basic analytics',
      'Email support',
      'Mobile app access',
      'Data export'
    ]
  },
  pro: {
    name: 'Pro Plan',
    amount: 950000, // Amount in kobo (Ksh 9,500)
    currency: 'KES',
    description: 'For growing enterprises - Up to 1000 assets',
    assets: '1000',
    features: [
      'Everything in Basic',
      'Advanced analytics',
      'Priority support',
      'API access',
      'Custom alerts',
      'Digital Product Passports'
    ]
  },
  enterprise: {
    name: 'Enterprise Plan',
    amount: null, // Custom pricing
    currency: 'KES',
    description: 'Unlimited scalability - Unlimited assets',
    assets: 'Unlimited',
    features: [
      'Everything in Pro',
      'Dedicated account manager',
      '24/7 phone support',
      'Custom integrations',
      'SLA guarantee',
      'Training & onboarding'
    ]
  }
};

// Main handler function
exports.handler = async (event) => {
  console.log('Lambda invoked with event:', JSON.stringify(event, null, 2));
  
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS' || event.requestContext?.http?.method === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'CORS preflight successful' })
    };
  }

  const path = event.path || event.rawPath || event.requestContext?.http?.path || '';
  const method = event.httpMethod || event.requestContext?.http?.method || 'GET';
  
  console.log(`Processing ${method} request to ${path}`);
  
  try {
    // Parse request body
    const body = event.body ? JSON.parse(event.body) : {};
    
    // Route handlers
    switch (true) {
      case path.includes('/initialize') && method === 'POST':
        return await initializePayment(body, headers);
        
      case path.includes('/verify') && method === 'GET': {
        const reference = event.queryStringParameters?.reference;
        return await verifyPayment(reference, headers);
      }
        
      case path.includes('/webhook') && method === 'POST':
        return await handleWebhook(event, headers);
        
      case path.includes('/plans') && method === 'GET':
        return await getPlans(headers);
        
      case path.includes('/callback') && method === 'POST':
        return await handleCallback(body, headers);
        
      default:
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ 
            error: 'Route not found',
            message: `The requested path ${path} was not found.`
          })
        };
    }
  } catch (error) {
    console.error('Lambda error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      })
    };
  }
};

// Initialize payment with Paystack
async function initializePayment(body, headers) {
  const { email, phoneNumber, firstName, lastName, planId, metadata = {} } = body;
  
  // Validate required fields
  if (!email || !planId) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        error: 'Missing required fields',
        message: 'Email and plan ID are required'
      })
    };
  }
  
  // Get plan details
  const plan = PLANS[planId];
  if (!plan) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ 
        error: 'Invalid plan',
        message: 'The selected plan does not exist' 
      })
    };
  }
  
  // Handle enterprise plan
  if (planId === 'enterprise') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'redirect',
        message: 'Enterprise plan requires custom pricing',
        redirectUrl: '/contact'
      })
    };
  }
  
  const paymentData = {
    email,
    amount: plan.amount,
    currency: plan.currency,
    reference: `LOCSAFE_${Date.now()}_${Math.random().toString(36).substring(7).toUpperCase()}`,
    callback_url: `${process.env.FRONTEND_URL || 'https://locsafe.org'}/paywall?payment=success`,
    first_name: firstName || '',
    last_name: lastName || '',
    phone: phoneNumber || '',
    metadata: {
      ...metadata,
      planId,
      planName: plan.name,
      phoneNumber: phoneNumber || '',
      firstName: firstName || '',
      lastName: lastName || '',
      description: plan.description,
      features: plan.features.join(', '),
      timestamp: new Date().toISOString(),
      custom_fields: [
        {
          display_name: "Plan Type",
          variable_name: "plan_type",
          value: plan.name
        },
        {
          display_name: "Assets Limit",
          variable_name: "assets_limit",
          value: plan.assets || 'Unlimited'
        }
      ]
    },
    channels: ['card', 'bank', 'mobile_money', 'bank_transfer', 'ussd', 'qr', 'eft']
  };
  
  const options = {
    hostname: 'api.paystack.co',
    path: '/transaction/initialize',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY || ''}`,
      'Content-Type': 'application/json'
    }
  };
  
  try {
    const response = await makeRequest(options, paymentData);
    
    if (response.status) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          status: 'success',
          message: 'Payment initialized successfully',
          data: {
            authorization_url: response.data.authorization_url,
            access_code: response.data.access_code,
            reference: response.data.reference,
            planDetails: {
              name: plan.name,
              amount: plan.amount / 100, // Convert back to main currency
              currency: plan.currency,
              description: plan.description
            }
          }
        })
      };
    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          status: 'error',
          message: response.message || 'Failed to initialize payment'
        })
      };
    }
  } catch (error) {
    console.error('Paystack initialization error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: 'error',
        message: 'Failed to initialize payment',
        error: error.message
      })
    };
  }
}

// Verify payment status
async function verifyPayment(reference, headers) {
  if (!reference) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ 
        error: 'Missing reference',
        message: 'Payment reference is required' 
      })
    };
  }
  
  const options = {
    hostname: 'api.paystack.co',
    path: `/transaction/verify/${reference}`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
    }
  };
  
  try {
    const response = await makeRequest(options);

    console.log(response)
    
    if (response.status && response.data.status === 'success') {
      // Payment successful
      const paymentData = response.data;
      
      // To Do
      // 1. Update user subscription in database
      // 2. Send confirmation email
      // 3. Activate features based on plan
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          status: 'success',
          message: 'Payment verified successfully',
          data: {
            reference: paymentData.reference,
            amount: paymentData.amount / 100,
            currency: paymentData.currency,
            paidAt: paymentData.paid_at,
            channel: paymentData.channel,
            customerEmail: paymentData.customer.email,
            planId: paymentData.metadata?.planId,
            planName: paymentData.metadata?.planName
          }
        })
      };
    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          status: 'error',
          message: 'Payment verification failed',
          data: {
            reference,
            status: response.data?.status || 'unknown'
          }
        })
      };
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: 'error',
        message: 'Failed to verify payment',
        error: error.message
      })
    };
  }
}

// Handle Paystack webhooks
async function handleWebhook(event, headers) {
  const signature = event.headers['x-paystack-signature'];
  const body = event.body;
  
  // Verify webhook signature
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY || '')
    .update(body)
    .digest('hex');
  
  if (hash !== signature) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ 
        error: 'Invalid signature',
        message: 'Webhook signature verification failed' 
      })
    };
  }
  
  const webhookData = JSON.parse(body);
  const eventType = webhookData.event;
  
  console.log(`Processing webhook event: ${eventType}`);
  
  switch (eventType) {
    case 'charge.success':
      // Handle successful payment
      await handleSuccessfulPayment(webhookData.data);
      break;
      
    case 'charge.failed':
      // Handle failed payment
      await handleFailedPayment(webhookData.data);
      break;
      
    case 'subscription.create':
      // Handle new subscription
      await handleNewSubscription(webhookData.data);
      break;
      
    case 'subscription.disable':
      // Handle subscription cancellation
      await handleSubscriptionCancellation(webhookData.data);
      break;
      
    default:
      console.log(`Unhandled webhook event: ${eventType}`);
  }
  
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ 
      status: 'success',
      message: 'Webhook processed successfully' 
    })
  };
}

// Handle successful payment
async function handleSuccessfulPayment(data) {
  console.log('Processing successful payment:', data.reference);
  
  // Extract metadata
  const { planId, planName, phoneNumber, customerEmail } = data.metadata || {};
  
  // TODO: Implement these actions
  // 1. Update user subscription status in database
  // 2. Activate plan features
  // 3. Send confirmation email/SMS
  // 4. Log transaction for audit
  
  // Example notification (would integrate with actual notification service)
  console.log(`Payment successful for ${customerEmail}`);
  console.log(`Plan: ${planName} (${planId})`);
  console.log(`Amount: ${data.amount / 100} ${data.currency}`);
  console.log(`Phone: ${phoneNumber}`);
  
  return {
    success: true,
    reference: data.reference,
    planActivated: planId
  };
}

// Handle failed payment
async function handleFailedPayment(data) {
  console.log('Processing failed payment:', data.reference);
  
  const { customerEmail } = data.metadata || {};
  
  // TODO: Implement these actions
  // 1. Log failed transaction
  // 2. Send failure notification
  // 3. Update user dashboard with failure status
  
  console.log(`Payment failed for ${customerEmail}`);
  console.log(`Reason: ${data.gateway_response || 'Unknown'}`);
  
  return {
    success: false,
    reference: data.reference,
    reason: data.gateway_response
  };
}

// Handle new subscription
async function handleNewSubscription(data) {
  console.log('New subscription created:', data.subscription_code);
  
  // TODO: Implement subscription management
  // 1. Store subscription details
  // 2. Set up recurring billing
  // 3. Send welcome email
  
  return {
    success: true,
    subscriptionCode: data.subscription_code
  };
}

// Handle subscription cancellation
async function handleSubscriptionCancellation(data) {
  console.log('Subscription cancelled:', data.subscription_code);
  
  // TODO: Implement cancellation logic
  // 1. Deactivate features
  // 2. Send cancellation confirmation
  // 3. Schedule data retention/deletion
  
  return {
    success: true,
    subscriptionCode: data.subscription_code
  };
}

// Get available plans
async function getPlans(headers) {
  const plansArray = Object.entries(PLANS).map(([id, plan]) => ({
    id,
    ...plan,
    amount: plan.amount ? plan.amount / 100 : null // Convert to main currency
  }));
  
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      status: 'success',
      message: 'Plans retrieved successfully',
      data: plansArray
    })
  };
}

// Handle payment callback (for redirect flow)
async function handleCallback(body, headers) {
  const { reference, status } = body;
  
  if (status === 'success') {
    // Verify the payment
    const verificationResult = await verifyPayment(reference, headers);
    return verificationResult;
  } else {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        status: 'error',
        message: 'Payment was not successful',
        reference
      })
    };
  }
}

// Export for testing
module.exports = {
  handler: exports.handler,
  PLANS,
  initializePayment,
  verifyPayment,
  handleWebhook
};