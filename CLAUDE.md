# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `apipedia-waconsole`, a Node.js library that provides a unified API wrapper for the Apipedia Waconsole service. The library supports multiple messaging platforms (WhatsApp, Telegram, SMS) and AI chat functionality with a chainable API pattern.

## Core Architecture

The main library is implemented as a single class `Apipedia` in `index.js` with the following key design patterns:

- **Factory Function**: The module exports a factory function `apipedia(appkey, authkey)` that returns a new Apipedia instance
- **Chainable API**: All methods return `this` to enable method chaining (e.g., `client.aiChat().toWhatsApp()`)
- **Result Storage**: Each API call stores its response in `this.result` for chaining and cross-platform forwarding
- **Consistent Error Handling**: All methods use the same error handling pattern with detailed error messages

### API Endpoints Structure

The class defines separate base URLs for different services:
- WhatsApp: `https://waconsole.apipedia.id/api/create-message`
- Bulk messaging: `/api/bulk-messagev1` and `/api/bulk-messagev2`
- Telegram: `/api/telegram/*` (with sub-endpoints)
- SMS: `/api/sms/*` (with sub-endpoints)
- AI Chat: `/api/chat-ai/send-message`

### Method Categories

1. **WhatsApp Methods**: `whatsapp()` - supports text, media (file paths, URLs, streams)
2. **Bulk Messaging**: `bulkV1()` (same message to multiple recipients), `bulkV2()` (different messages)
3. **Telegram Methods**: `telegramSendMessage()`, `telegramSendImage()`, `telegramSendLocation()`, `telegramSendButtons()`, `telegramSendDocument()`
4. **SMS Methods**: `smsRegular()`, `smsVIP()`, `smsOTP()`, `smsVVIP()`
5. **AI Chat**: `aiChat(message, agent_id, format)`
6. **Cross-platform Forwarding**: `toWhatsApp()`, `toTelegram()`, `toSMS()`

### Media Handling

The WhatsApp `whatsapp()` method intelligently handles different media types:
- **File paths**: Uses `fs.createReadStream()` after checking existence
- **URLs**: Passes URLs directly to the API
- **Streams**: Accepts pre-created streams

## Development Commands

- **Run tests**: `npm test` (uses Jest)
- **Test coverage**: Jest is configured to collect coverage from `index.js`

## Testing Strategy

Tests are located in `tests/apipedia.test.js` and follow these patterns:

- **Mocking**: Uses Jest to mock `axios` and `fs` to avoid real API calls
- **Test Structure**: Organized by method with separate describe blocks
- **Error Testing**: Comprehensive error handling tests for API errors, network errors, and request errors
- **Mock Data**: Uses consistent mock credentials and phone numbers throughout tests

### Test Configuration

Jest config in `jest.config.js`:
- Test environment: Node.js
- Test pattern: `**/tests/**/*.test.js`
- Coverage collection from `index.js` only

## Key Implementation Details

### Form Data vs JSON

The library uses different request formats:
- **FormData**: WhatsApp and Telegram methods (for file uploads)
- **JSON**: Bulk messaging, SMS, and AI chat methods

### Error Handling Pattern

All API methods implement the same 3-tier error handling:
1. **API Errors** (`error.response`): Server responded with error status
2. **Network Errors** (`error.request`): Request made but no response
3. **Request Errors**: Other request setup issues

### Authentication

All API calls require:
- `appkey`: Application key for service identification
- `authkey`: Authentication key for user verification

These are passed to every API endpoint as form data or JSON payload parameters.

## cURL Examples

### SMS Methods

#### Regular SMS
```bash
curl --location 'https://waconsole.apipedia.id/api/sms/send-reguler' \
--header 'Content-Type: application/json' \
--data '{
   "appkey":"3fd4fd36-dea4-43db-a8a3-5e494d5d0c52",
   "authkey":"39QP5QQh3wLhl80zTl33ZjqBqc2AmsuHCfAlv0rwr5XrmZfofC",
   "to":"628998937095",
   "msg":"Example message"
}'
```

#### VIP SMS
```bash
curl --location 'https://waconsole.apipedia.id/api/sms/send-vip' \
--header 'Content-Type: application/json' \
--data '{
   "appkey":"3fd4fd36-dea4-43db-a8a3-5e494d5d0c52",
   "authkey":"39QP5QQh3wLhl80zTl33ZjqBqc2AmsuHCfAlv0rwr5XrmZfofC",
   "to":"628998937095",
   "msg":"Example VIP message"
}'
```

#### OTP SMS
```bash
curl --location 'https://waconsole.apipedia.id/api/sms/send-otp' \
--header 'Content-Type: application/json' \
--data '{
   "appkey":"3fd4fd36-dea4-43db-a8a3-5e494d5d0c52",
   "authkey":"39QP5QQh3wLhl80zTl33ZjqBqc2AmsuHCfAlv0rwr5XrmZfofC",
   "to":"628998937095",
   "msg":"Your OTP code is: 123456"
}'
```

#### VVIP SMS
```bash
curl --location 'https://waconsole.apipedia.id/api/sms/send-vvip' \
--header 'Content-Type: application/json' \
--data '{
   "appkey":"3fd4fd36-dea4-43db-a8a3-5e494d5d0c52",
   "authkey":"39QP5QQh3wLhl80zTl33ZjqBqc2AmsuHCfAlv0rwr5XrmZfofC",
   "to":"628998937095",
   "msg":"Example VVIP message"
}'
```

### AI Chat Methods

#### JSON Response Format
```bash
curl --location 'https://waconsole.apipedia.id/api/chat-ai/send-message' \
--header 'Content-Type: application/json' \
--data '{
   "appkey":"c6b6c7a4-604c-42b6-80c3-ea680587b460",
   "authkey":"39QP5QQh3wLhl80zTl33ZjqBqc2AmsuHCfAlv0rwr5XrmZfofC",
   "message":"Hello, how can you help me?",
   "agent_id":"9c3bab54-ac37-4891-b855-656e93a240cd",
   "format":"json"
}'
```

#### Text Response Format
```bash
curl --location 'https://waconsole.apipedia.id/api/chat-ai/send-message' \
--header 'Content-Type: application/json' \
--data '{
   "appkey":"c6b6c7a4-604c-42b6-80c3-ea680587b460",
   "authkey":"39QP5QQh3wLhl80zTl33ZjqBqc2AmsuHCfAlv0rwr5XrmZfofC",
   "message":"coba beri contoh puisi?",
   "agent_id":"9c3bab54-ac37-4891-b855-656e93a240cd",
   "format":"text"
}'
```

### Profile and Status Methods

#### Get Profile
```bash
curl --location --request GET 'https://waconsole.apipedia.id/api/profile/raw' \
--header 'Content-Type: application/json' \
--data '{
   "appkey":"Insert your APP Key",
   "authkey":"Insert your Auth Key"
}'
```

#### Update Presence
```bash
curl --location 'https://waconsole.apipedia.id/api/presence/update' \
--header 'Content-Type: application/json' \
--data '{
   "appkey":"Insert your APP Key",
   "authkey":"Insert your Auth Key",
   "receiver": "628998937095",
   "presence": "composing",
   "duration": 10
}'
```

#### Get Message Status (All)
```bash
curl --location --request GET 'https://waconsole.apipedia.id/api/messages/status/all' \
--header 'Content-Type: application/json' \
--data '{
   "appkey":"Insert your APP Key",
   "authkey":"Insert your Auth Key",
   "message_id":"MESSAGE_ID"
}'
```

#### Get Last Status
```bash
curl --location --request GET 'https://waconsole.apipedia.id/api/status/last' \
--header 'Content-Type: application/json' \
--data '{
   "appkey":"Insert your APP Key",
   "authkey":"Insert your Auth Key",
   "message_id":"MESSAGE_ID"
}'
```

#### Get Last Receipt Status
```bash
curl --location --request GET 'https://waconsole.apipedia.id/api/messages/status/last/receipt' \
--header 'Content-Type: application/json' \
--data '{
   "appkey":"Insert your APP Key",
   "authkey":"Insert your Auth Key",
   "message_id":"MESSAGE_ID"
}'
```