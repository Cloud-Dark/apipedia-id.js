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
    console.error('✗ Error sending Telegram text message:', error.message);
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
    console.error('✗ Error sending Telegram image:', error.message);
  }

  try {
    // Test 3: Send Telegram location
    console.log('\nTest 3: Sending Telegram location...');
    const locationResult = await client.telegramSendLocation(telegramChatId, -6.2088, 106.8456);
    console.log('✓ Telegram location sent successfully:', locationResult);
  } catch (error) {
    console.error('✗ Error sending Telegram location:', error.message);
  }

  try {
    // Test 4: Send Telegram document
    console.log('\nTest 4: Sending Telegram document...');
    const documentResult = await client.telegramSendDocument(
      telegramChatId,
      'https://temp.apipedia.id/example/sample-1.pdf',
      'Document caption',
      'sample.pdf'
    );
    console.log('✓ Telegram document sent successfully:', documentResult);
  } catch (error) {
    console.error('✗ Error sending Telegram document:', error.message);
  }

  try {
    // Test 5: Send Telegram buttons
    console.log('\nTest 5: Sending Telegram buttons...');
    const buttons = [
      [
        {\"text\": \"Option 1\", \"callback_data\": \"option_1\"},
        {\"text\": \"Option 2\", \"callback_data\": \"option_2\"}
      ],
      [
        {\"text\": \"Visit Website\", \"url\": \"https://example.com\"}
      ]
    ];
    const buttonsResult = await client.telegramSendButtons(
      telegramChatId,
      'Choose an option:',
      buttons
    );
    console.log('✓ Telegram buttons sent successfully:', buttonsResult);
  } catch (error) {
    console.error('✗ Error sending Telegram buttons:', error.message);
  }

  console.log('\nAll Telegram messaging tests completed!');
}

runTelegramTests();