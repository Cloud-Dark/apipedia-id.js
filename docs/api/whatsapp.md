# whatsapp() Method

The `whatsapp()` method sends a message (with optional media) to a single WhatsApp number.

## Syntax
```javascript
client.whatsapp(to, message, media = null)
```

## Parameters
- `to` (string): Recipient's phone number in international format (e.g., 6281234567890)
- `message` (string): Text message content
- `media` (optional, string|stream): Can be a file path, URL, or stream for media attachments

## Examples
```javascript
// Send a text message
client.whatsapp('628998937095', 'Hello, World!');

// Send a message with media file path
client.whatsapp('628998937095', 'Check this out!', './path/to/image.jpg');

// Send a message with media URL
client.whatsapp('628998937095', 'Check this out!', 'https://example.com/image.jpg');

// Send a message with media stream
const fs = require('fs');
const media = fs.createReadStream('path/to/image.jpg');
client.whatsapp('628998937095', 'Check this out!', media);
```

## Returns
Promise resolving to the API response data.

## Error Handling
Throws detailed error messages with status codes and error descriptions.