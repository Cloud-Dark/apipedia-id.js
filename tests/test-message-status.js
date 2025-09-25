require('dotenv').config();
const apipedia = require('../index.js');

// Initialize the client with your keys from environment variables
const client = apipedia(
  process.env.APIPEDIA_APPKEY || 'your-appkey-here', 
  process.env.APIPEDIA_AUTHKEY || 'your-authkey-here'
);

async function testMessageStatus() {
  try {
    console.log('Testing Message Status functionality...');
    
    // Get all statuses for a specific message
    const allStatusResponse = await client.getMessageStatusAll('your-message-id');
    console.log('All message statuses:', allStatusResponse.getResult());
    
    // Get the last status of a message
    const lastStatusResponse = await client.getLastStatus('your-message-id');
    console.log('Last message status:', lastStatusResponse.getResult());
    
    // Get the last receipt status
    const receiptStatusResponse = await client.getLastReceiptStatus('your-message-id');
    console.log('Last receipt status:', receiptStatusResponse.getResult());
    
    // You can also chain these results to other platforms:
    // For example, send the status to WhatsApp
    // await allStatusResponse.toWhatsApp(process.env.TEST_WHATSAPP_NUMBER, 'Message Status: ');
    
    // Or send the status to Telegram
    // await lastStatusResponse.toTelegram(process.env.TEST_TELEGRAM_RECEIVER, 'Status Update: ');
    
    // Or send the status via SMS
    // await receiptStatusResponse.toSMS(process.env.TEST_SMS_NUMBER, 'Receipt Status: ');
  } catch (error) {
    console.error('Error testing message status:', error.message);
  }
}

// Run the test
testMessageStatus();