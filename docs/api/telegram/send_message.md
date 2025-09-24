# telegramSendMessage() Method

The `telegramSendMessage()` method sends a text message to a Telegram chat.

## Syntax
```javascript
client.telegramSendMessage(receiver, body)
```

## Parameters
- `receiver` (string): The chat ID of the recipient (e.g., "368628054")
- `body` (string): The text content of the message to send

## Examples
```javascript
// Send a simple text message
client.telegramSendMessage('368628054', 'Hello from Telegram Bot!');
```

## Returns
Promise resolving to the API response data.

## Error Handling
Throws detailed error messages with status codes and error descriptions.