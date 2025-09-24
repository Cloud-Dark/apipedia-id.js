# 🚀 Apipedia.js

[![npm version](https://img.shields.io/npm/v/apipedia.js.svg)](https://www.npmjs.com/package/apipedia.js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/apipedia.js.svg)](https://nodejs.org/)

**Official Apipedia.js** - The complete Node.js library for Apipedia API with WhatsApp, Telegram, SMS, and AI Chat integration featuring revolutionary fluent chaining.

> ⭐ **Official JavaScript SDK** - Built by Apipedia team with revolutionary fluent chaining API!

## Installation

```bash
npm install apipedia.js
```

## Quick Start

```javascript
const apipedia = require('apipedia.js');

const client = apipedia('your-appkey', 'your-authkey');

// Send a text message
client.whatsapp('1234567890', 'Hello, World!');

// Send a message with media file path
client.whatsapp('1234567890', 'Check this out!', './path/to/image.jpg');

// Send a message with media URL
client.whatsapp('1234567890', 'Check this out!', 'https://example.com/image.jpg');

// Send a message with media stream
const fs = require('fs');
const media = fs.createReadStream('path/to/image.jpg');
client.whatsapp('1234567890', 'Check this out!', media);

// Send bulk messages (same message to multiple recipients)
client.bulkV1(['628998937095', '6281615677582'], 'Same message to all recipients');

// Send bulk messages (different messages to multiple recipients) 
client.bulkV2(['628998937095', '6281615677582'], ['Message for first', 'Message for second']);

// Send Telegram text message
client.telegramSendMessage('368628054', 'Hello from Telegram Bot!');

// Send Telegram image
client.telegramSendImage('368628054', 'https://example.com/photo.jpg', 'Photo caption');

// Send Telegram location
client.telegramSendLocation('368628054', -6.2088, 106.8456);

// Send Telegram buttons
const buttons = [
  [
    {"text": "Option 1", "callback_data": "option_1"},
    {"text": "Option 2", "callback_data": "option_2"}
  ]
];
client.telegramSendButtons('368628054', 'Choose an option:', buttons);

// Send Telegram document
client.telegramSendDocument('368628054', 'https://temp.apipedia.id/example/sample-1.pdf', 'Document caption', 'document.pdf');

// Use AI Chat
client.aiChat('Hello, how can you help me?', 'b33a2b7b-fd21-41af-92ee-268bcbccce49', 'json');
```

## AI Chat and Telegram Implementation Example

Here's a practical example using environment variables for security:

### Using AI Chat with Content Writing Assistant
```javascript
require('dotenv').config();
const apipedia = require('apipedia.js');

// Initialize with your AI credentials from environment variables
const client = apipedia(
  process.env.APIPEDIA_AI_APPKEY || 'your-ai-appkey-here', 
  process.env.APIPEDIA_AI_AUTHKEY || 'your-ai-authkey-here'
);

async function exampleAIUsage() {
  try {
    // Send a message to the AI Content Writing Assistant
    const response = await client.aiChat(
      'Hello, how can you help me?',
      process.env.APIPEDIA_AI_AGENT_ID || 'b33a2b7b-fd21-41af-92ee-268bcbccce49',
      'json'
    );
    
    console.log('AI Response:', response.getResult());
    
    // Chain: Send the AI response to Telegram
    await response.toTelegram(
      process.env.TEST_TELEGRAM_RECEIVER || '368628054', 
      'AI Response: '
    );
  } catch (error) {
    console.error('Error:', error.message);
  }
}

exampleAIUsage();
```

### Using Telegram with Your Credentials
```javascript
require('dotenv').config();
const apipedia = require('apipedia.js');

// Initialize with your Telegram credentials from environment variables
const client = apipedia(
  process.env.APIPEDIA_TELEGRAM_APPKEY || 'your-telegram-appkey-here', 
  process.env.APIPEDIA_TELEGRAM_AUTHKEY || 'your-telegram-authkey-here'
);

async function exampleTelegramUsage() {
  try {
    // Send a message via Telegram
    const response = await client.telegramSendMessage(
      process.env.TEST_TELEGRAM_RECEIVER || '368628054', 
      'Hello from Telegram Bot!'
    );
    
    console.log('Telegram Response:', response.getResult());
    
    // Chain: Send the result to WhatsApp
    await response.toWhatsApp(
      process.env.TEST_WHATSAPP_NUMBER || '6281234567890', 
      'Telegram message sent: '
    );
  } catch (error) {
    console.error('Error:', error.message);
  }
}

exampleTelegramUsage();
```

### Additional Examples

For more detailed examples, check out the test files in the `tests/` directory:

- `tests/test-ai-implementation.js` - Shows how to use AI chat functionality
- `tests/test-telegram-implementation.js` - Shows how to use Telegram functionality

You can run these examples with:
```
node tests/test-ai-implementation.js
node tests/test-telegram-implementation.js
```

## Features

- **WhatsApp Messaging**: Send text messages and media attachments (images, documents, etc.)
- **Media Support**: Support for file paths, URLs, and streams as media
- **Bulk Messaging**: Bulk messaging capabilities (V1 and V2) for WhatsApp
- **Telegram Integration**: Complete Telegram bot capabilities (text, images, locations, buttons, documents)
- **SMS Services**: Multiple SMS tiers (Regular, VIP, OTP, VVIP)
- **AI Chat Integration**: AI-powered chat with customizable agents and response formats
- **Profile Management**: Get account profile information
- **Presence Control**: Update WhatsApp presence status (typing, online, etc.)
- **Message Tracking**: Track message status and delivery receipts
- **Chainable API**: Fluent interface for combining operations
- **Cross-platform Forwarding**: Forward AI responses to WhatsApp, Telegram, or SMS
- **Environment Configuration**: Secure credential management with .env support
- **Comprehensive Error Handling**: Detailed error messages for debugging

## Documentation

For complete documentation, check out the [docs](docs/) folder:

- [Getting Started](docs/getting-started.md) - A guide to help you get started
- [API Documentation](docs/api/) - Detailed information about all methods
- [Examples](docs/examples/) - Complete examples for different use cases
- [Tests](docs/tests/) - Information about the testing suite

## Methods

### WhatsApp Methods
#### whatsapp(to, message, media = null)
Send a message (with optional media) to a single WhatsApp number.

- `to`: Recipient's phone number in international format (e.g., 6281234567890)
- `message`: Text message content
- `media` (optional): Can be a file path, URL, or stream for media attachments

#### bulkV1(toNumbers, message)
Send the same message to multiple recipients (Bulk Message V1).

- `toNumbers`: Array of phone numbers or pipe-separated string (e.g. '628998937095|6281615677582')
- `message`: Text message content to send to all recipients

#### bulkV2(toNumbers, messages)
Send different messages to multiple recipients (Bulk Message V2).

- `toNumbers`: Array of phone numbers or pipe-separated string (e.g. '628998937095|6281615677582')
- `messages`: Array of messages or pipe-separated string (e.g. 'message1|message2')

### Telegram Methods
#### telegramSendMessage(receiver, body)
Send a text message to a Telegram chat.

- `receiver`: Chat ID of the recipient (e.g., '368628054')
- `body`: Text content of the message

#### telegramSendImage(receiver, imageUrl, caption = '')
Send an image message to a Telegram chat.

- `receiver`: Chat ID of the recipient (e.g., '368628054')
- `imageUrl`: URL of the image to send
- `caption` (optional): Caption text to accompany the image

#### telegramSendLocation(receiver, latitude, longitude)
Send a location message to a Telegram chat.

- `receiver`: Chat ID of the recipient (e.g., '368628054')
- `latitude`: Latitude coordinate
- `longitude`: Longitude coordinate

#### telegramSendButtons(receiver, body, buttons)
Send a message with inline keyboard buttons to a Telegram chat.

- `receiver`: Chat ID of the recipient (e.g., '368628054')
- `body`: Text content of the message
- `buttons`: Array of button rows, each containing button objects

#### telegramSendDocument(receiver, documentUrl, caption = '', filename = '')
Send a document to a Telegram chat.

- `receiver`: Chat ID of the recipient (e.g., '368628054')
- `documentUrl`: URL of the document to send
- `caption` (optional): Caption text to accompany the document
- `filename` (optional): Filename to show for the document

### SMS Methods
#### smsRegular(to, msg)
Send a regular SMS message.

- `to`: Recipient's phone number in international format
- `msg`: SMS message content

#### smsVIP(to, msg)
Send a VIP SMS message (higher priority).

- `to`: Recipient's phone number in international format
- `msg`: SMS message content

#### smsOTP(to, msg)
Send an OTP SMS message.

- `to`: Recipient's phone number in international format
- `msg`: OTP message content (usually contains verification code)

#### smsVVIP(to, msg)
Send a VVIP SMS message (highest priority).

- `to`: Recipient's phone number in international format
- `msg`: SMS message content

### AI Chat Methods
#### aiChat(message, agent_id, format = 'text')
Send a message to AI agent and get response.

- `message`: Your message to the AI agent
- `agent_id`: ID of the AI agent to use
- `format`: Response format ('text' or 'json')

### Profile and Status Methods
#### getProfile()
Get account profile information.

Returns profile data including account details and status.

#### updatePresence(receiver, presence, duration = null)
Update WhatsApp presence status.

- `receiver`: Target phone number
- `presence`: Presence type ('composing', 'recording', 'online', etc.)
- `duration` (optional): Duration in seconds

### Message Status Methods
#### getMessageStatusAll(messageId)
Get complete message status information.

- `messageId`: ID of the message to check

#### getLastStatus(messageId)
Get the last status of a message.

- `messageId`: ID of the message to check

#### getLastReceiptStatus(messageId)
Get the last receipt status of a message.

- `messageId`: ID of the message to check

### Chainable Cross-Platform Methods
#### toWhatsApp(to, prefix = '')
Forward the previous result to WhatsApp.

- `to`: WhatsApp recipient number
- `prefix` (optional): Text to prepend to the message

#### toTelegram(receiver, prefix = '')
Forward the previous result to Telegram.

- `receiver`: Telegram chat ID
- `prefix` (optional): Text to prepend to the message

#### toSMS(to, prefix = '')
Forward the previous result to SMS.

- `to`: SMS recipient number
- `prefix` (optional): Text to prepend to the message

## Advanced Usage Examples

### 🔗 Revolutionary Fluent Chaining
```javascript
// ✨ NEW! Perfect chaining syntax - exactly what you wanted!
await client
  .aiChat('Generate a motivational quote', 'agent-id', 'text')
  .toWhatsApp('6281234567890', '💪 Motivation: ')
  .toTelegram('368628054', '⚡ Power up: ')
  .toSMS('6281234567890', '📱 Daily dose: ');

// 🚀 Extreme long chains work perfectly!
await client
  .aiChat('Create weather report', 'agent-id')
  .toWhatsApp('6281234567890', '🌤️ WeatherApp: ')
  .toTelegram('368628054', '⛅ TeleWeather: ')
  .toSMS('6281234567890', '🌡️ SMSWeather: ')
  .toWhatsApp('6289876543210', '📱 Share: ')
  .toTelegram('987654321', '💬 Forward: ');
```

### Chaining Multiple Operations
```javascript
// Get profile, then send to multiple platforms
await client.getProfile()
             .toWhatsApp('6281234567890', 'My Profile: ')
             .toTelegram('368628054', 'Account Info: ');

// Check message status and forward
await client.getLastStatus('message-id')
             .toSMS('6281234567890', 'Message Status: ');
```

### Presence Management
```javascript
// Set typing status for 10 seconds
await client.updatePresence('6281234567890', 'composing', 10);

// Set recording status
await client.updatePresence('6281234567890', 'recording');
```

## Environment Variables

For security, credentials should be stored in environment variables rather than hardcoded. Create a `.env` file in your project root:

```bash
# Copy from .env.example and fill in your actual keys
APIPEDIA_APP_KEY=your-app-key-here
APIPEDIA_AUTH_KEY=your-auth-key-here
TEST_WHATSAPP_NUMBER=628998937095
TEST_TELEGRAM_RECEIVER=368628054
AI_AGENT_ID=your-ai-agent-id-here
```

Then use environment variables in your code:

```javascript
require('dotenv').config();

const client = apipedia(
  process.env.APIPEDIA_APP_KEY,
  process.env.APIPEDIA_AUTH_KEY
);
```

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Test Comprehensive Chaining
```bash
npm run test:comprehensive
```

This will run extreme long chains to verify that the fluent API works perfectly even with 10+ chained operations!

### Test with Coverage
```bash
npm run test:coverage
```

## 🚀 Automatic Publishing

This package supports automatic publishing to npm via GitHub Actions. To set it up:

1. Create an npm automation token at [npm Token Creation](https://www.npmjs.com/settings/your-username/tokens)
2. Add the token as a GitHub secret in your repository settings:
   - Go to Settings → Secrets and Variables → Actions
   - Add a new secret named `NPM_TOKEN` with your npm token as the value
3. The GitHub Action will automatically publish to npm when changes are pushed to the main branch

The automatic publishing workflow is defined in `.github/workflows/npm-publish-semver.yml`.

## 🎯 Perfect Chaining Examples

The library now supports the **exact syntax you requested**:

```javascript
// ✅ This works perfectly!
client.aiChat('message').toWhatsApp('123').toTelegram('456').toSMS('789');

// ✅ Even extreme chains work flawlessly!
client
  .aiChat('Create content', 'agent-id')
  .toWhatsApp('111', '📱 WA: ')
  .toTelegram('222', '💬 TG: ')
  .toSMS('333', '📨 SMS: ')
  .toWhatsApp('444', '🔄 Share: ')
  .toTelegram('555', '⚡ Forward: ')
  .toSMS('666', '📤 Broadcast: ');
```