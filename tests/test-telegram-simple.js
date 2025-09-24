require('dotenv').config();
const apipedia = require('../index');

// Test credentials - all from environment variables only
const appKey = process.env.APIPEDIA_APP_KEY;
const authKey = process.env.APIPEDIA_AUTH_KEY;
const telegramChatId = process.env.TEST_TELEGRAM_RECEIVER;

// Check if required environment variables are set
if (!appKey || !authKey || !telegramChatId) {
  console.error('❌ Missing required environment variables. Please check .env file.');
  console.error('Required: APIPEDIA_APP_KEY, APIPEDIA_AUTH_KEY, TEST_TELEGRAM_RECEIVER');
  console.error('💡 Copy .env.example to .env and fill in your actual credentials.');
  process.exit(1);
}

const client = apipedia(appKey, authKey);

async function runTelegramTests() {
  console.log('Starting Telegram messaging tests...\n');

  try {
    // Test 1: Send Telegram text message
    console.log('Test 1: Sending Telegram text message...');
    const textResult = await client.telegramSendMessage(telegramChatId, 'Hello from Telegram Bot!');
    console.log('✓ Telegram text message sent successfully:', textResult);
  } catch (error) {
    console.error('✗ Error sending Telegram text message:', error);
  }

  try {
    // Test 2: Send Telegram image
    console.log('\nTest 2: Sending Telegram image...');
    const imageResult = await client.telegramSendImage(
      telegramChatId, 
      'https://example.com/photo.jpg', 
      'This is a test photo image'
    );
    console.log('✓ Telegram image sent successfully:', imageResult);
  } catch (error) {
    console.error('✗ Error sending Telegram image:', error);
  }
}

runTelegramTests();