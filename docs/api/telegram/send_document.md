# telegramSendDocument() Method

The `telegramSendDocument()` method sends a document to a Telegram chat.

## Syntax
```javascript
client.telegramSendDocument(receiver, documentUrl, caption = '', filename = '')
```

## Parameters
- `receiver` (string): The chat ID of the recipient (e.g., "368628054")
- `documentUrl` (string): The URL of the document to send
- `caption` (optional, string): Caption text to accompany the document
- `filename` (optional, string): The filename to show for the document

## Examples
```javascript
// Send a document with caption and filename
client.telegramSendDocument('368628054', 'https://temp.apipedia.id/example/sample-1.pdf', 'Document caption', 'document.pdf');

// Send a document with only URL
client.telegramSendDocument('368628054', 'https://temp.apipedia.id/example/sample-1.pdf');
```

## Returns
Promise resolving to the API response data.

## Error Handling
Throws detailed error messages with status codes and error descriptions.