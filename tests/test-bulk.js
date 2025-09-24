require('dotenv').config();
const apipedia = require('../index');

// Test credentials - all from environment variables only
const appKey = process.env.APIPEDIA_APP_KEY;
const authKey = process.env.APIPEDIA_AUTH_KEY;
const receiverNumbers = [process.env.TEST_WHATSAPP_NUMBER, process.env.TEST_WHATSAPP_NUMBER_2];

// Check if required environment variables are set
if (!appKey || !authKey || !receiverNumbers[0]) {
  console.error('❌ Missing required environment variables. Please check .env file.');
  console.error('Required: APIPEDIA_APP_KEY, APIPEDIA_AUTH_KEY, TEST_WHATSAPP_NUMBER');
  console.error('Optional: TEST_WHATSAPP_NUMBER_2 for bulk testing');
  console.error('💡 Copy .env.example to .env and fill in your actual credentials.');
  process.exit(1);
}

// Use the same number twice if second number is not provided
if (!receiverNumbers[1]) {
  receiverNumbers[1] = receiverNumbers[0];
}

const client = apipedia(appKey, authKey);

async function runBulkTests() {
  console.log('Starting bulk messaging tests...\\n');

  try {
    // Test 1: Send bulk message V1 (same message to multiple recipients)
    console.log('Test 1: Sending bulk message V1 (same message to multiple recipients)...');
    const bulkV1Result = await client.bulkV1(receiverNumbers, 'Hello! This is a bulk message V1 test - same message to all recipients.');
    console.log('✓ Bulk V1 message sent successfully:', bulkV1Result);
  } catch (error) {
    console.error('✗ Error sending bulk V1 message:', error.message);
  }

  try {
    // Test 2: Send bulk message V2 (different messages to multiple recipients)
    console.log('\\nTest 2: Sending bulk message V2 (different messages to multiple recipients)...');
    const bulkV2Result = await client.bulkV2(
      receiverNumbers, 
      ['Hello! This is the first message in bulk V2 test.', 'Hello! This is the second message in bulk V2 test.']
    );
    console.log('✓ Bulk V2 message sent successfully:', bulkV2Result);
  } catch (error) {
    console.error('✗ Error sending bulk V2 message:', error.message);
  }

  console.log('\\nAll bulk messaging tests completed!');
}

runBulkTests();