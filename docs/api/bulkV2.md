# bulkV2() Method

The `bulkV2()` method sends different messages to multiple recipients (Bulk Message V2).

## Syntax
```javascript
client.bulkV2(toNumbers, messages)
```

## Parameters
- `toNumbers` (array|string): Array of phone numbers or pipe-separated string (e.g. '628998937095|6281615677582')
- `messages` (array|string): Array of messages or pipe-separated string (e.g. 'message1|message2')

## Examples
```javascript
// Using arrays for both numbers and messages
client.bulkV2(
  ['628998937095', '6281615677582'], 
  ['Message for first', 'Message for second']
);

// Using pipe-separated strings
client.bulkV2(
  '628998937095|6281615677582', 
  'Message for first|Message for second'
);
```

## Returns
Promise resolving to the API response data.

## Error Handling
Throws detailed error messages with status codes and error descriptions.