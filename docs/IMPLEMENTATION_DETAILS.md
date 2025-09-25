## Implementation Details: AI Chat and Telegram Features

## Overview
This document details the implementation of the AI Chat and Telegram features in the Apipedia library. Both features were already implemented in the `index.js` file but are now demonstrated with concrete examples that use environment variables for security.

## AI Chat Feature

### Implementation
The AI Chat functionality is implemented in the `aiChat` method of the `Apipedia` class:

```javascript
async aiChat(message, agent_id, format = 'text') {
  const data = {
    appkey: this.appkey,
    authkey: this.authkey,
    message: message,
    agent_id: agent_id,
    format: format
  };

  try {
    const response = await axios.post(`${this.aiBaseURL}/send-message`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.result = response.data;
    return this; // For chaining
  } catch (error) {
    // Error handling code...
  }
}
```

### Usage
```javascript
require('dotenv').config();
const apipedia = require('./index.js');
const client = apipedia(
  process.env.APIPEDIA_AI_APPKEY, 
  process.env.APIPEDIA_AI_AUTHKEY
);

// Use the AI chat functionality
const response = await client.aiChat(
  'Hello, how can you help me?',
  process.env.APIPEDIA_AI_AGENT_ID,
  'json'
);

console.log(response.getResult());
```

### Features
- Sends messages to the AI chat endpoint
- Supports various response formats (text, json)
- Works with different agents
- Integrates with the chainable API system
- Can forward AI responses to other platforms (WhatsApp, Telegram, SMS)

## Telegram Feature

### Implementation
The Telegram functionality is implemented in several methods of the `Apipedia` class:

1. `telegramSendMessage(receiver, body)` - Send simple text messages
2. `telegramSendImage(receiver, imageUrl, caption)` - Send images
3. `telegramSendLocation(receiver, latitude, longitude)` - Send location
4. `telegramSendButtons(receiver, body, buttons)` - Send messages with buttons
5. `telegramSendDocument(receiver, documentUrl, caption, filename)` - Send documents

Example implementation:
```javascript
async telegramSendMessage(receiver, body) {
  const formData = new FormData();
  formData.append('appkey', this.appkey);
  formData.append('authkey', this.authkey);
  formData.append('receiver', receiver);
  formData.append('body', body);

  try {
    const response = await axios.post(`${this.telegramBaseURL}/send_message`, formData, {
      headers: {
        ...formData.getHeaders()
      }
    });
    this.result = response.data;
    return this; // For chaining
  } catch (error) {
    // Error handling code...
  }
}
```

### Usage
```javascript
require('dotenv').config();
const apipedia = require('./index.js');
const client = apipedia(
  process.env.APIPEDIA_TELEGRAM_APPKEY, 
  process.env.APIPEDIA_TELEGRAM_AUTHKEY
);

// Send a simple text message via Telegram
const response = await client.telegramSendMessage(
  process.env.TEST_TELEGRAM_RECEIVER, 
  'Hello from Telegram Bot!'
);

console.log(response.getResult());

// Send an image
await client.telegramSendImage(
  process.env.TEST_TELEGRAM_RECEIVER, 
  'https://example.com/image.jpg', 
  'Here is an image'
);

// Send a location
await client.telegramSendLocation(
  process.env.TEST_TELEGRAM_RECEIVER, 
  -6.200000, 
  106.816666
);
```

### Features
- Send various types of content (text, images, locations, buttons, documents)
- Uses multipart/form-data for transmission
- Integrates with the chainable API system
- Can receive responses from other platforms (AI, WhatsApp, SMS) and forward them to Telegram

## Environment Variables

For security, credentials should be stored in environment variables rather than hardcoded. Create a `.env` file in your project root:

```bash
# AI credentials
APIPEDIA_AI_APPKEY=your-ai-appkey-here
APIPEDIA_AI_AUTHKEY=your-ai-authkey-here
APIPEDIA_AI_AGENT_ID=your-ai-agent-id-here

# Telegram credentials
APIPEDIA_TELEGRAM_APPKEY=your-telegram-appkey-here
APIPEDIA_TELEGRAM_AUTHKEY=your-telegram-authkey-here

# Other configuration
TEST_TELEGRAM_RECEIVER=368628054
TEST_WHATSAPP_NUMBER=6281234567890
TEST_SMS_NUMBER=6281234567890
```

Then load the environment variables in your code:
```javascript
require('dotenv').config();
```

## Chainable API

Both features integrate with the library's chainable API system, allowing you to combine operations:

```javascript
// Get AI response and send it to Telegram
await client.aiChat('Hello', process.env.APIPEDIA_AI_AGENT_ID)
  .toTelegram(process.env.TEST_TELEGRAM_RECEIVER, 'AI Response: ');

// Send WhatsApp message and forward response to AI
await client.whatsapp(process.env.TEST_WHATSAPP_NUMBER, 'Hello')
  .toTelegram(process.env.TEST_TELEGRAM_RECEIVER, 'WhatsApp message received: ');
```

## Message Status Feature

### Implementation
The Message Status functionality is implemented in three methods of the `Apipedia` class:

1. `getMessageStatusAll(messageId)` - Get complete message status information from `/api/messages/status/all`
2. `getLastStatus(messageId)` - Get the last status of a message from `/api/status/last`
3. `getLastReceiptStatus(messageId)` - Get the last receipt status from `/api/messages/status/last/receipt`

Example implementation for getMessageStatusAll:
```javascript
async getMessageStatusAll(messageId) {
  const data = {
    appkey: this.appkey,
    authkey: this.authkey,
    message_id: messageId
  };

  try {
    const response = await axios.get(`${this.messagesBaseURL}/status/all`, {
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    });
    this.result = response.data;
    return this; // For chaining
  } catch (error) {
    // Error handling code...
  }
}
```

### Usage
```javascript
require('dotenv').config();
const apipedia = require('./index.js');
const client = apipedia(
  process.env.APIPEDIA_APPKEY, 
  process.env.APIPEDIA_AUTHKEY
);

// Get all statuses for a specific message
const response = await client.getMessageStatusAll('your-message-id');
console.log(response.getResult());

// Get the last status of a message
const lastStatus = await client.getLastStatus('your-message-id');
console.log(lastStatus.getResult());

// Get the last receipt status
const receiptStatus = await client.getLastReceiptStatus('your-message-id');
console.log(receiptStatus.getResult());
```

### Features
- Track complete message status information
- Monitor message delivery and read receipts
- Integrates with the chainable API system
- Can forward status information to other platforms (WhatsApp, Telegram, SMS)

## Example Files

The following example files have been created to demonstrate usage:

1. `tests/test-ai-implementation.js` - Shows how to use AI chat functionality with environment variables
2. `tests/test-telegram-implementation.js` - Shows how to use Telegram functionality with environment variables
3. `docs/message-status-examples.md` - Shows how to use message status functionality with direct API calls and library methods

You can run these examples with:
```
node tests/test-ai-implementation.js
node tests/test-telegram-implementation.js
```

Make sure to set up your `.env` file with the appropriate credentials before running these examples.