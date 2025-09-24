# Telegram Examples

## Telegram Setup

Initialize the client with your API credentials:

```javascript
const apipedia = require('apipedia-waconsole');

const client = apipedia('your-appkey', '39QP5QQh3wLhl80zTl33ZjqBqc2AmsuHCfAlv0rwr5XrmZfofC');
const telegramChatId = '368628054'; // Using the provided chat ID
```

## Send Text Message

```javascript
client.telegramSendMessage(telegramChatId, 'Hello from Telegram Bot!');
```

## Send Image

```javascript
// Send an image with caption
client.telegramSendImage(telegramChatId, 'https://example.com/photo.jpg', 'Photo caption');

// Send an image without caption
client.telegramSendImage(telegramChatId, 'https://example.com/photo.jpg');
```

## Send Location

```javascript
client.telegramSendLocation(telegramChatId, -6.2088, 106.8456);
```

## Send Buttons (Inline Keyboard)

```javascript
const buttons = [
  [
    {"text": "Option 1", "callback_data": "option_1"},
    {"text": "Option 2", "callback_data": "option_2"}
  ],
  [
    {"text": "Visit Website", "url": "https://example.com"}
  ]
];

client.telegramSendButtons(telegramChatId, 'Choose an option:', buttons);
```

## Send Document

```javascript
// Send a document with caption and filename
client.telegramSendDocument(
  telegramChatId, 
  'https://temp.apipedia.id/example/sample-1.pdf', 
  'Document caption', 
  'document.pdf'
);

// Send a document with only URL
client.telegramSendDocument(telegramChatId, 'https://temp.apipedia.id/example/sample-1.pdf');
```

## Complete Example with All Telegram Methods

```javascript
const apipedia = require('apipedia-waconsole');

// Initialize client
const client = apipedia('your-appkey', '39QP5QQh3wLhl80zTl33ZjqBqc2AmsuHCfAlv0rwr5XrmZfofC');
const telegramChatId = '368628054';

// Send a text message
client.telegramSendMessage(telegramChatId, 'Hello from Telegram Bot!');

// Send an image
client.telegramSendImage(telegramChatId, 'https://example.com/photo.jpg', 'Check out this photo!');

// Send a location
client.telegramSendLocation(telegramChatId, -6.2088, 106.8456);

// Send buttons
const buttons = [
  [
    {"text": "Option 1", "callback_data": "option_1"},
    {"text": "Option 2", "callback_data": "option_2"}
  ]
];
client.telegramSendButtons(telegramChatId, 'Choose an option:', buttons);

// Send a document
client.telegramSendDocument(
  telegramChatId, 
  'https://temp.apipedia.id/example/sample-1.pdf', 
  'Check out this document!', 
  'sample.pdf'
);
```

## Error Handling

```javascript
async function sendTelegramMessageWithErrorHandling() {
  try {
    const result = await client.telegramSendMessage(telegramChatId, 'Hello with error handling!');
    console.log('Telegram message sent successfully:', result);
  } catch (error) {
    console.error('Error sending Telegram message:', error.message);
  }
}

sendTelegramMessageWithErrorHandling();
```