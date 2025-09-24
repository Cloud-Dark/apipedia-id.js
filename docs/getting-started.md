# Getting Started with apipedia-waconsole

This guide will help you get started with the apipedia-waconsole library for sending WhatsApp and Telegram messages.

## Prerequisites

- Node.js version 12 or higher
- Apipedia Waconsole API credentials (appkey and authkey)

## Installation

Install the library using npm:

```bash
npm install apipedia-waconsole
```

## Initialization

Initialize the client with your API credentials:

```javascript
const apipedia = require('apipedia-waconsole');

const client = apipedia('your-appkey', 'your-authkey');
```

## Basic Usage

### Send a WhatsApp Text Message

```javascript
client.whatsapp('628998937095', 'Hello, World!');
```

### Send a WhatsApp Media Message

```javascript
// With media URL
client.whatsapp('628998937095', 'Check this out!', 'https://example.com/image.jpg');

// With file path
client.whatsapp('628998937095', 'Check this out!', './path/to/image.jpg');

// With stream
const fs = require('fs');
const media = fs.createReadStream('./path/to/image.jpg');
client.whatsapp('628998937095', 'Check this out!', media);
```

### Send a Telegram Text Message

```javascript
client.telegramSendMessage('368628054', 'Hello from Telegram Bot!');
```

### Send a Telegram Image

```javascript
client.telegramSendImage('368628054', 'https://example.com/photo.jpg', 'Photo caption');
```

## Bulk Messaging (WhatsApp)

### Send Same Message to Multiple Recipients

```javascript
client.bulkV1(['628998937095', '6281615677582'], 'Same message to all recipients');
```

### Send Different Messages to Multiple Recipients

```javascript
client.bulkV2(
  ['628998937095', '6281615677582'], 
  ['Message for first', 'Message for second']
);
```

## Telegram Messaging

### Send Location

```javascript
client.telegramSendLocation('368628054', -6.2088, 106.8456);
```

### Send Document

```javascript
client.telegramSendDocument('368628054', 'https://temp.apipedia.id/example/sample-1.pdf', 'Document caption', 'document.pdf');
```

### Send Buttons (Inline Keyboard)

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

client.telegramSendButtons('368628054', 'Choose an option:', buttons);
```

## Error Handling

The library provides detailed error messages for different types of failures:

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

## Phone Number Format (WhatsApp)

Use international format for phone numbers without the `+` sign:
- Indonesia: 6281234567890 (not +62 812 3456 7890)
- US: 1234567890 (not +1 234 567 8900)

## Telegram Chat ID

For Telegram messaging, use the numeric chat ID:
- Example: 368628054

## Next Steps

- Explore the [API documentation](api/) for detailed method information
- Check out [more examples](examples/) for specific use cases
- Learn about [testing](tests/) if you want to contribute