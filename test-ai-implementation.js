require('dotenv').config();
const apipedia = require('./index.js');

// Initialize the client with your keys from environment variables
const client = apipedia(
  process.env.APIPEDIA_AI_APPKEY || 'your-ai-appkey-here', 
  process.env.APIPEDIA_AI_AUTHKEY || 'your-ai-authkey-here'
);

async function testAIChat() {
  try {
    console.log('Testing AI Chat functionality...');
    
    // Using the AI chat method (already implemented in your codebase)
    const response = await client.aiChat(
      'Hello, how can you help me?', 
      process.env.APIPEDIA_AI_AGENT_ID || 'b33a2b7b-fd21-41af-92ee-268bcbccce49', 
      'json'
    );
    
    console.log('AI Response:', response.getResult());
    
    // You can also chain the response to send it to other platforms
    // For example, send the AI response to WhatsApp
    // await response.toWhatsApp(process.env.TEST_WHATSAPP_NUMBER, 'AI Response: ');
    
    // Or send the AI response to Telegram
    // await response.toTelegram(process.env.TEST_TELEGRAM_RECEIVER, 'AI Response: ');
    
    // Or send the AI response via SMS
    // await response.toSMS(process.env.TEST_SMS_NUMBER, 'AI Response: ');
  } catch (error) {
    console.error('Error testing AI chat:', error.message);
  }
}

// Run the test
testAIChat();