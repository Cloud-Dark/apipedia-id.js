# telegramSendButtons() Method

The `telegramSendButtons()` method sends a message with inline keyboard buttons to a Telegram chat.

## Syntax
```javascript
client.telegramSendButtons(receiver, body, buttons)
```

## Parameters
- `receiver` (string): The chat ID of the recipient (e.g., "368628054")
- `body` (string): The text content of the message
- `buttons` (array): Array of button rows, where each row is an array of button objects

## Button Object Properties
- `text` (string): The text displayed on the button
- `callback_data` (string, optional): Data sent when the button is clicked
- `url` (string, optional): URL to open when the button is clicked

## Examples
```javascript
// Send a message with buttons
const buttons = [
  [
    {"text": "Option 1", "callback_data": "option_1"},
    {"text": "Option 2", "callback_data": "option_2"}
  ],
  [
    {"text": "Visit Website", "url": "https://example.com"}
  ]
];

client.telegramSendButtons('368628054', 'Choose an option:', buttons);
```

## Returns
Promise resolving to the API response data.

## Error Handling
Throws detailed error messages with status codes and error descriptions.