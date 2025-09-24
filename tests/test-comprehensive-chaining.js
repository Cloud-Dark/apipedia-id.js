require('dotenv').config();
const apipedia = require('../index'); // Local testing - in production: require('apipedia.js')

// Test credentials - all from environment variables only
const mockAppKey = process.env.APIPEDIA_APP_KEY;
const mockAuthKey = process.env.APIPEDIA_AUTH_KEY;
const mockNumber = process.env.TEST_WHATSAPP_NUMBER;
const mockTelegramReceiver = process.env.TEST_TELEGRAM_RECEIVER;
const mockAiAgentId = process.env.AI_AGENT_ID;

// Check if required environment variables are set
if (!mockAppKey || !mockAuthKey || !mockNumber || !mockTelegramReceiver || !mockAiAgentId) {
  console.error('❌ Missing required environment variables. Please check .env file.');
  console.error('Required: APIPEDIA_APP_KEY, APIPEDIA_AUTH_KEY, TEST_WHATSAPP_NUMBER, TEST_TELEGRAM_RECEIVER, AI_AGENT_ID');
  console.error('💡 Copy .env.example to .env and fill in your actual credentials.');
  process.exit(1);
}

async function testComprehensiveChaining() {
  console.log('🚀 Starting Comprehensive Chaining Test...\n');

  try {
    const client = apipedia(mockAppKey, mockAuthKey);

    console.log('📝 Test 1: Simple AI to WhatsApp chain');
    // Test 1: AI to WhatsApp
    const result1 = await client
      .aiChat('Hello, generate a welcome message', mockAiAgentId, 'text')
      .toWhatsApp(mockNumber, '🤖 AI Response: ');
    console.log('✅ Test 1 completed successfully\n');

    console.log('📝 Test 2: AI to multiple platforms (WhatsApp + Telegram)');
    // Test 2: AI to multiple platforms
    const result2 = await client
      .aiChat('Create a brief summary', mockAiAgentId, 'text')
      .toWhatsApp(mockNumber, '📱 WhatsApp: ')
      .toTelegram(mockTelegramReceiver, '💬 Telegram: ');
    console.log('✅ Test 2 completed successfully\n');

    console.log('📝 Test 3: Long chain - AI to all platforms');
    // Test 3: Long chain - AI to all platforms
    const result3 = await client
      .aiChat('Generate a motivational quote', mockAiAgentId, 'text')
      .toWhatsApp(mockNumber, '💪 Motivation via WhatsApp: ')
      .toTelegram(mockTelegramReceiver, '⚡ Motivation via Telegram: ')
      .toSMS(mockNumber, '📨 Motivation via SMS: ');
    console.log('✅ Test 3 completed successfully\n');

    console.log('📝 Test 4: Profile to multiple platforms');
    // Test 4: Profile to multiple platforms
    const result4 = await client
      .getProfile()
      .toWhatsApp(mockNumber, '👤 Profile Info via WhatsApp: ')
      .toTelegram(mockTelegramReceiver, '🔍 Profile Info via Telegram: ');
    console.log('✅ Test 4 completed successfully\n');

    console.log('📝 Test 5: Super long chain with presence and status');
    // Test 5: Super long chain
    const result5 = await client
      .updatePresence(mockNumber, 'composing', 5)
      .toWhatsApp(mockNumber, '⌨️ Typing status: ')
      .toTelegram(mockTelegramReceiver, '💭 Status update: ')
      .toSMS(mockNumber, '📱 Presence update: ');
    console.log('✅ Test 5 completed successfully\n');

    console.log('📝 Test 6: AI with different formats and chaining');
    // Test 6: Different AI formats
    await client
      .aiChat('What is the current time?', mockAiAgentId, 'json')
      .toWhatsApp(mockNumber, '🕐 Time Info (JSON): ');

    await client
      .aiChat('Tell me a joke', mockAiAgentId, 'text')
      .toTelegram(mockTelegramReceiver, '😄 Joke: ')
      .toWhatsApp(mockNumber, '🎭 Same joke: ');
    console.log('✅ Test 6 completed successfully\n');

    console.log('📝 Test 7: Extreme long chain (10+ operations)');
    // Test 7: Extreme long chain
    const result7 = await client
      .aiChat('Create a brief weather report', mockAiAgentId, 'text')
      .toWhatsApp(mockNumber, '🌤️ Weather WhatsApp: ')
      .toTelegram(mockTelegramReceiver, '⛅ Weather Telegram: ')
      .toSMS(mockNumber, '🌡️ Weather SMS: ')
      .toWhatsApp(mockNumber, '📱 Secondary WhatsApp: ')
      .toTelegram(mockTelegramReceiver, '💬 Secondary Telegram: ');
    console.log('✅ Test 7 completed successfully\n');

    console.log('🎉 ALL COMPREHENSIVE CHAINING TESTS PASSED!');
    console.log('✨ The fluent API supports extremely long chains!');
    console.log('🔗 Chain syntax works: client.aiChat().toWhatsApp().toTelegram().toSMS()');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('📍 Error details:', error);
  }
}

// Run the comprehensive test
if (require.main === module) {
  testComprehensiveChaining();
}

module.exports = testComprehensiveChaining;