// Test script to verify Paystack configuration
const https = require('https');

// Test function to verify a payment directly
async function testVerifyPayment() {
  const reference = process.argv[2] || 'T401588093431473';
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  
  console.log('=== Paystack Verification Test ===');
  console.log('Reference:', reference);
  console.log('Secret Key present:', !!secretKey);
  
  if (!secretKey) {
    console.error('❌ PAYSTACK_SECRET_KEY is not set in environment variables');
    console.log('\nTo set it:');
    console.log('1. For local testing: export PAYSTACK_SECRET_KEY=sk_test_your_key_here');
    console.log('2. For Lambda: Add it in AWS Lambda Environment Variables');
    return;
  }
  
  console.log('Secret Key starts with:', secretKey.substring(0, 10) + '...');
  
  const options = {
    hostname: 'api.paystack.co',
    path: `/transaction/verify/${encodeURIComponent(reference)}`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${secretKey}`,
      'Content-Type': 'application/json'
    }
  };
  
  console.log('\nMaking request to:', `https://${options.hostname}${options.path}`);
  
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseData = '';
      
      console.log('Response Status Code:', res.statusCode);
      console.log('Response Headers:', res.headers);
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        console.log('\n=== API Response ===');
        try {
          const parsed = JSON.parse(responseData);
          console.log(JSON.stringify(parsed, null, 2));
          
          if (parsed.status === true && parsed.data) {
            console.log('\n✅ Payment verification successful!');
            console.log('Transaction Status:', parsed.data.status);
            console.log('Amount:', parsed.data.amount / 100, parsed.data.currency);
            console.log('Customer Email:', parsed.data.customer?.email);
          } else {
            console.log('\n❌ Verification failed:', parsed.message);
          }
          
          resolve(parsed);
        } catch (error) {
          console.error('Failed to parse response:', responseData);
          reject(error);
        }
      });
    });
    
    req.on('error', (error) => {
      console.error('Request error:', error);
      reject(error);
    });
    
    req.end();
  });
}

// Run the test
testVerifyPayment()
  .then(() => {
    console.log('\n=== Test Complete ===');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n=== Test Failed ===');
    console.error(error);
    process.exit(1);
  });