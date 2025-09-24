require('dotenv').config();
const apipedia = require('../index');

// Test credentials - all from environment variables only
const appKey = process.env.APIPEDIA_APP_KEY;
const authKey = process.env.APIPEDIA_AUTH_KEY;
const receiverNumber = process.env.TEST_WHATSAPP_NUMBER;

// Check if required environment variables are set
if (!appKey || !authKey || !receiverNumber) {
  console.error('❌ Missing required environment variables. Please check .env file.');
  console.error('Required: APIPEDIA_APP_KEY, APIPEDIA_AUTH_KEY, TEST_WHATSAPP_NUMBER');
  console.error('💡 Copy .env.example to .env and fill in your actual credentials.');
  process.exit(1);
}

const client = apipedia(appKey, authKey);

async function runTests() {
  console.log('Starting tests for apipedia-waconsole library...\\n');

  try {
    // Test 1: Send a text message
    console.log('Test 1: Sending text message...');
    const textResult = await client.whatsapp(receiverNumber, 'Hello! This is a test text message from the updated library.');
    console.log('✓ Text message sent successfully:', textResult);
  } catch (error) {
    console.error('✗ Error sending text message:', error.message);
  }

  try {
    // Test 2: Send a media message with URL
    console.log('\\nTest 2: Sending media message with URL...');
    const mediaResult = await client.whatsapp(
      receiverNumber, 
      'Check out this sample PDF file!', 
      'https://temp.apipedia.id/example/sample-1.pdf'
    );
    console.log('✓ Media message sent successfully:', mediaResult);
  } catch (error) {
    console.error('✗ Error sending media message:', error.message);
  }

  console.log('\\nAll tests completed!');
}

runTests();