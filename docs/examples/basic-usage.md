# Basic Usage Examples

## Installation
```bash
npm install apipedia-waconsole
```

## Initialize Client
```javascript
const apipedia = require('apipedia-waconsole');

const client = apipedia('your-appkey', 'your-authkey');
```

## Send WhatsApp Text Message
```javascript
client.whatsapp('628998937095', 'Hello, World!');
```

## Send WhatsApp Media Message
```javascript
// Send with media URL
client.whatsapp('628998937095', 'Check this out!', 'https://example.com/image.jpg');

// Send with file path
client.whatsapp('628998937095', 'Check this out!', './path/to/image.jpg');

// Send with stream
const fs = require('fs');
const media = fs.createReadStream('path/to/image.jpg');
client.whatsapp('628998937095', 'Check this out!', media);
```

## Send Telegram Message
```javascript
// Initialize with valid credentials
const client = apipedia('your-appkey', '39QP5QQh3wLhl80zTl33ZjqBqc2AmsuHCfAlv0rwr5XrmZfofC');

// Send text message
client.telegramSendMessage('368628054', 'Hello from Telegram Bot!');

// Send image
client.telegramSendImage('368628054', 'https://example.com/photo.jpg', 'Photo caption');

// Send location
client.telegramSendLocation('368628054', -6.2088, 106.8456);

// Send document
client.telegramSendDocument('368628054', 'https://temp.apipedia.id/example/sample-1.pdf', 'Document caption', 'document.pdf');
```

## Error Handling
```javascript
async function sendMessageWithErrorHandling() {
  try {
    const result = await client.whatsapp('628998937095', 'Hello with error handling!');
    console.log('Message sent successfully:', result);
  } catch (error) {
    console.error('Error sending message:', error.message);
  }
}

sendMessageWithErrorHandling();
```