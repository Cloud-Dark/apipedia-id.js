# apipedia-id.js Project Context

## Project Overview
**apipedia-id.js** is a Node.js library that provides a client interface for the Apipedia Waconsole API. This library allows developers to send WhatsApp messages through the Apipedia service using appkey and authkey authentication. The library enables sending text messages, media files to individual contacts, and bulk messaging to multiple recipients.

**Project Type:** Node.js Library
**Name:** apipedia-waconsole
**Version:** 1.0.0

## Architecture & Dependencies
- **Main Dependencies:**
  - `axios` (^1.6.0) - For making HTTP requests to the Apipedia API
  - `form-data` (^4.0.0) - For creating multipart/form-data requests when sending media

- **Core File Structure:**
  - `index.js` - Main implementation containing the Apipedia class and factory function
  - `example.js` - Usage example demonstrating library functionality
  - `README.md` - Basic documentation with installation and usage instructions
  - `package.json` - Project metadata and dependencies
  - `tests/apipedia.test.js` - Comprehensive test suite for all functionality
  - `QWEN.md` - Project context documentation
  - `jest.config.js` - Jest configuration
  - `test-send.js` - Real API test script

## Functionality
The library provides a single class `Apipedia` with multiple methods:

### Individual Messaging:
- `whatsapp(to, message, media = null)` - Send text and media messages to single contact
  - Supports text messages
  - Supports media attachments as file paths, URLs, or streams

### Bulk Messaging:
- `bulkV1(toNumbers, message)` - Send same message to multiple recipients
- `bulkV2(toNumbers, messages)` - Send different messages to multiple recipients

## Building and Running
- **Installation:** `npm install apipedia-waconsole`
- **Usage:** `const apipedia = require('apipedia-waconsole');`
- **Example Implementation:**
  ```javascript
  const client = apipedia('your-appkey', 'your-authkey');
  
  // Individual message
  client.whatsapp('1234567890', 'Hello, World!');
  
  // Bulk message V1 (same message to multiple recipients)
  client.bulkV1(['628998937095', '6281615677582'], 'Same message to all recipients');
  
  // Bulk message V2 (different messages to multiple recipients)
  client.bulkV2(['628998937095', '6281615677582'], ['Message 1', 'Message 2']);
  ```

## Development Conventions
- The library uses a factory function pattern to create client instances
- Authentication uses appkey and authkey passed during initialization
- Multiple API endpoints are supported:
  - Individual messages: `https://waconsole.apipedia.id/api/create-message`
  - Bulk V1 messages: `https://waconsole.apipedia.id/api/bulk-messagev1`
  - Bulk V2 messages: `https://waconsole.apipedia.id/api/bulk-messagev2`
- Uses async/await for handling API requests
- Form data is used for individual message requests with media
- JSON is used for bulk message requests
- Comprehensive error handling with detailed messages

## Testing
- Full test suite available with Jest
- Tests cover both individual and bulk messaging functionality
- Mock implementations to prevent real API calls during unit tests
- Real API tests implemented in test-send.js
- Run tests with: `npm test`

## API Documentation
The library communicates with multiple Apipedia Waconsole API endpoints:

### Individual Messaging:
- Endpoint: `https://waconsole.apipedia.id/api/create-message`
- Method: POST
- Content-Type: multipart/form-data
- Parameters:
  - `appkey`: Application key for authentication
  - `authkey`: Authorization key for authentication
  - `to`: Recipient's phone number
  - `message`: Text message content
  - `file`: Optional media file for sending with the message

### Bulk Messaging V1 (Same Message):
- Endpoint: `https://waconsole.apipedia.id/api/bulk-messagev1`
- Method: POST
- Content-Type: application/json
- Parameters:
  - `appkey`: Application key for authentication
  - `authkey`: Authorization key for authentication
  - `to`: Pipe-separated list of recipient phone numbers (e.g., "628998937095|6281615677582")
  - `message`: Text message content to send to all recipients

### Bulk Messaging V2 (Different Messages):
- Endpoint: `https://waconsole.apipedia.id/api/bulk-messagev2`
- Method: POST
- Content-Type: application/json
- Parameters:
  - `appkey`: Application key for authentication
  - `authkey`: Authorization key for authentication
  - `to`: Pipe-separated list of recipient phone numbers (e.g., "628998937095|6281615677582")
  - `message`: Pipe-separated list of messages matching the numbers (e.g., "message1|message2")