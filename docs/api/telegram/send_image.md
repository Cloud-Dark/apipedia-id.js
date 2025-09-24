# telegramSendImage() Method

The `telegramSendImage()` method sends an image message to a Telegram chat.

## Syntax
```javascript
client.telegramSendImage(receiver, imageUrl, caption = '')
```

## Parameters
- `receiver` (string): The chat ID of the recipient (e.g., "368628054")
- `imageUrl` (string): The URL of the image to send
- `caption` (optional, string): Caption text to accompany the image

## Examples
```javascript
// Send an image with caption
client.telegramSendImage('368628054', 'https://example.com/photo.jpg', 'Photo caption');

// Send an image without caption
client.telegramSendImage('368628054', 'https://example.com/photo.jpg');
```

## Returns
Promise resolving to the API response data.

## Error Handling
Throws detailed error messages with status codes and error descriptions.