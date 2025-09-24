# bulkV1() Method

The `bulkV1()` method sends the same message to multiple recipients (Bulk Message V1).

## Syntax
```javascript
client.bulkV1(toNumbers, message)
```

## Parameters
- `toNumbers` (array|string): Array of phone numbers or pipe-separated string (e.g. '628998937095|6281615677582')
- `message` (string): Text message content to send to all recipients

## Examples
```javascript
// Using an array of phone numbers
client.bulkV1(['628998937095', '6281615677582'], 'Same message to all recipients');

// Using a pipe-separated string of phone numbers
client.bulkV1('628998937095|6281615677582', 'Same message to all recipients');
```

## Returns
Promise resolving to the API response data.

## Error Handling
Throws detailed error messages with status codes and error descriptions.