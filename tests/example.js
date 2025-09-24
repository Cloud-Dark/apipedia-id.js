const apipedia = require('./index');
const fs = require('fs');

// Using the actual credentials from the API reference
const api = apipedia('43b314f6-2d3c-4759-8003-0a4999aea3c2', '39QP5QQh3wLhl80zTl33ZjqBqc2AmsuHCfAlv0rwr5XrmZfofC');

// Kirim pesan teks ke nomor yang Anda tentukan
api.whatsapp('628998937095', 'Hello World!');

// Kirim pesan dengan media dari URL
api.whatsapp('628998937095', 'Check this PDF file', 'https://temp.apipedia.id/example/sample-1.pdf');

// Kirim pesan dengan media dari file path (uncomment to use)
// api.whatsapp('628998937095', 'Look at this image', './path/to/image.jpg');

// Kirim pesan dengan media dari stream (uncomment to use)
// const media = fs.createReadStream('./path/to/image.jpg');
// api.whatsapp('628998937095', 'Look at this image from stream', media);

// Contoh bulk message V1 - kirim pesan yang sama ke banyak nomor
async function sendBulkV1() {
  try {
    const result = await api.bulkV1(['628998937095', '6281615677582'], 'Pesan yang sama dikirim ke banyak nomor');
    console.log('Bulk V1 message sent successfully:', result);
  } catch (error) {
    console.error('Error sending bulk V1 message:', error.message);
  }
}

// Contoh bulk message V2 - kirim pesan berbeda ke banyak nomor
async function sendBulkV2() {
  try {
    const result = await api.bulkV2(
      ['628998937095', '6281615677582'], 
      ['Pesan pertama untuk nomor pertama', 'Pesan kedua untuk nomor kedua']
    );
    console.log('Bulk V2 message sent successfully:', result);
  } catch (error) {
    console.error('Error sending bulk V2 message:', error.message);
  }
}

// Error handling example
async function sendMessageWithErrorHandling() {
  try {
    const result = await api.whatsapp('628998937095', 'Hello with error handling!');
    console.log('Message sent successfully:', result);
  } catch (error) {
    console.error('Error sending message:', error.message);
  }
}

// Jalankan semua contoh
sendMessageWithErrorHandling();
sendBulkV1();
sendBulkV2();