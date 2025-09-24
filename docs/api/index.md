# API Documentation

## WhatsApp Messaging APIs

### Individual Messaging API
Endpoint: `https://waconsole.apipedia.id/api/create-message`
Method: POST
Content-Type: multipart/form-data

Parameters:
- `appkey`: Application key for authentication
- `authkey`: Authorization key for authentication
- `to`: Recipient's phone number
- `message`: Text message content
- `file`: Optional media file for sending with the message

### Bulk Messaging V1 API (Same Message)
Endpoint: `https://waconsole.apipedia.id/api/bulk-messagev1`
Method: POST
Content-Type: application/json

Parameters:
- `appkey`: Application key for authentication
- `authkey`: Authorization key for authentication
- `to`: Pipe-separated list of recipient phone numbers (e.g., "628998937095|6281615677582")
- `message`: Text message content to send to all recipients

### Bulk Messaging V2 API (Different Messages)
Endpoint: `https://waconsole.apipedia.id/api/bulk-messagev2`
Method: POST
Content-Type: application/json

Parameters:
- `appkey`: Application key for authentication
- `authkey`: Authorization key for authentication
- `to`: Pipe-separated list of recipient phone numbers (e.g., "628998937095|6281615677582")
- `message`: Pipe-separated list of messages matching the numbers (e.g., "message1|message2")

## Telegram Messaging APIs

### Telegram Send Message
Endpoint: `https://waconsole.apipedia.id/api/telegram/send_message`
Method: POST
Content-Type: multipart/form-data

Parameters:
- `appkey`: Application key for authentication
- `authkey`: Authorization key for authentication
- `receiver`: Chat ID of the recipient (e.g., "368628054")
- `body`: Text content of the message

### Telegram Send Image
Endpoint: `https://waconsole.apipedia.id/api/telegram/send_image`
Method: POST
Content-Type: multipart/form-data

Parameters:
- `appkey`: Application key for authentication
- `authkey`: Authorization key for authentication
- `receiver`: Chat ID of the recipient (e.g., "368628054")
- `image_url`: URL of the image to send
- `caption`: Optional caption text for the image

### Telegram Send Location
Endpoint: `https://waconsole.apipedia.id/api/telegram/send_location`
Method: POST
Content-Type: multipart/form-data

Parameters:
- `appkey`: Application key for authentication
- `authkey`: Authorization key for authentication
- `receiver`: Chat ID of the recipient (e.g., "368628054")
- `latitude`: Latitude coordinate
- `longitude`: Longitude coordinate

### Telegram Send Buttons
Endpoint: `https://waconsole.apipedia.id/api/telegram/send_buttons`
Method: POST
Content-Type: multipart/form-data

Parameters:
- `appkey`: Application key for authentication
- `authkey`: Authorization key for authentication
- `receiver`: Chat ID of the recipient (e.g., "368628054")
- `body`: Text content of the message
- `buttons`: Formatted button data for inline keyboard

### Telegram Send Document
Endpoint: `https://waconsole.apipedia.id/api/telegram/send_document`
Method: POST
Content-Type: multipart/form-data

Parameters:
- `appkey`: Application key for authentication
- `authkey`: Authorization key for authentication
- `receiver`: Chat ID of the recipient (e.g., "368628054")
- `document_url`: URL of the document to send
- `caption`: Optional caption text for the document
- `filename`: Optional filename to show for the document