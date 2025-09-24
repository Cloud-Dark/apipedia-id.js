require('dotenv').config();
const apipedia = require('./index.js');

// Initialize the client with your keys from environment variables
const client = apipedia(
  process.env.APIPEDIA_TELEGRAM_APPKEY || 'your-telegram-appkey-here', 
  process.env.APIPEDIA_TELEGRAM_AUTHKEY || 'your-telegram-authkey-here'
);

async function testTelegram() {
  try {
    console.log('Testing Telegram functionality...');
    
    // Send a simple text message via Telegram
    const response = await client.telegramSendMessage(
      process.env.TEST_TELEGRAM_RECEIVER || '368628054', 
      'Hello from Telegram Bot!'
    );
    
    console.log('Telegram Response:', response.getResult());
    
    // You can also send other types of content via Telegram:
    
    // Send an image
    // await client.telegramSendImage(process.env.TEST_TELEGRAM_RECEIVER, 'https://example.com/image.jpg', 'Here is an image');
    
    // Send a location
    // await client.telegramSendLocation(process.env.TEST_TELEGRAM_RECEIVER, -6.200000, 106.816666);
    
    // Send buttons
    /*
    const buttons = [
      [
        { text: 'Button 1', callback_data: 'btn1' },
        { text: 'Button 2', url: 'https://example.com' }
      ]
    ];
    await client.telegramSendButtons(process.env.TEST_TELEGRAM_RECEIVER, 'Choose an option:', buttons);
    */
    
    // Send a document
    // await client.telegramSendDocument(process.env.TEST_TELEGRAM_RECEIVER, 'https://example.com/document.pdf', 'Here is a document');
  } catch (error) {
    console.error('Error testing Telegram:', error.message);
  }
}

// Run the test
testTelegram();