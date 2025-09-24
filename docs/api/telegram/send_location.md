# telegramSendLocation() Method

The `telegramSendLocation()` method sends a location message to a Telegram chat.

## Syntax
```javascript
client.telegramSendLocation(receiver, latitude, longitude)
```

## Parameters
- `receiver` (string): The chat ID of the recipient (e.g., "368628054")
- `latitude` (string|number): Latitude coordinate (e.g., "-6.2088")
- `longitude` (string|number): Longitude coordinate (e.g., "106.8456")

## Examples
```javascript
// Send a location
client.telegramSendLocation('368628054', -6.2088, 106.8456);
```

## Returns
Promise resolving to the API response data.

## Error Handling
Throws detailed error messages with status codes and error descriptions.