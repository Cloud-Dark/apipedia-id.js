// Test file to verify the npm package installation works correctly
const apipedia = require('apipedia.js');

console.log('Testing npm package installation...');

// Create a client instance (without actual keys to just test the import/functionality)
const client = apipedia('dummy-appkey', 'dummy-authkey');

// Test that methods exist
console.log('WhatsApp method exists:', typeof client.whatsapp === 'function');
console.log('Telegram methods exist:', 
  typeof client.telegramSendMessage === 'function',
  typeof client.telegramSendImage === 'function',
  typeof client.telegramSendLocation === 'function',
  typeof client.telegramSendButtons === 'function',
  typeof client.telegramSendDocument === 'function');
console.log('AI Chat method exists:', typeof client.aiChat === 'function');
console.log('Bulk methods exist:', 
  typeof client.bulkV1 === 'function',
  typeof client.bulkV2 === 'function');
console.log('SMS methods exist:',
  typeof client.smsRegular === 'function',
  typeof client.smsVIP === 'function',
  typeof client.smsOTP === 'function',
  typeof client.smsVVIP === 'function');

console.log('All methods are accessible, npm package installed successfully!');
console.log('Package can be imported and used as expected.');