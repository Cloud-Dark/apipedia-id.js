# Bulk Messaging Examples

## Bulk V1 - Same Message to Multiple Recipients

Send the same message to multiple recipients using the `bulkV1()` method:

```javascript
const apipedia = require('apipedia-waconsole');
const client = apipedia('your-appkey', 'your-authkey');

// Using an array of phone numbers
client.bulkV1(
  ['628998937095', '6281615677582'], 
  'Same message to all recipients'
);

// Using a pipe-separated string of phone numbers
client.bulkV1(
  '628998937095|6281615677582', 
  'Same message to all recipients'
);

// With error handling
async function sendBulkV1() {
  try {
    const result = await client.bulkV1(
      ['628998937095', '6281615677582'], 
      'Same message to all recipients'
    );
    console.log('Bulk V1 message sent successfully:', result);
  } catch (error) {
    console.error('Error sending bulk V1 message:', error.message);
  }
}

sendBulkV1();
```

## Bulk V2 - Different Messages to Multiple Recipients

Send different messages to multiple recipients using the `bulkV2()` method:

```javascript
// Using arrays for both numbers and messages
client.bulkV2(
  ['628998937095', '6281615677582'], 
  ['Message for first recipient', 'Message for second recipient']
);

// Using pipe-separated strings
client.bulkV2(
  '628998937095|6281615677582', 
  'Message for first|Message for second'
);

// With error handling
async function sendBulkV2() {
  try {
    const result = await client.bulkV2(
      ['628998937095', '6281615677582'], 
      ['Message for first', 'Message for second']
    );
    console.log('Bulk V2 message sent successfully:', result);
  } catch (error) {
    console.error('Error sending bulk V2 message:', error.message);
  }
}

sendBulkV2();
```

## Complete Example with All Methods

```javascript
const apipedia = require('apipedia-waconsole');
const fs = require('fs');

// Initialize client
const client = apipedia('your-appkey', 'your-authkey');

// Send individual text message
client.whatsapp('628998937095', 'Hello World!');

// Send individual media message
client.whatsapp('628998937095', 'Check this PDF file', 'https://temp.apipedia.id/example/sample-1.pdf');

// Send bulk message V1
client.bulkV1(['628998937095', '6281615677582'], 'Same message to all recipients');

// Send bulk message V2
client.bulkV2(
  ['628998937095', '6281615677582'], 
  ['Message for first', 'Message for second']
);
```