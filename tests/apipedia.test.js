require('dotenv').config();
const apipedia = require('../index'); // Local testing - in production: require('apipedia.js')
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

// Test data - all from environment variables only
const mockAppKey = process.env.APIPEDIA_APP_KEY;
const mockAuthKey = process.env.APIPEDIA_AUTH_KEY;
const mockNumber = process.env.TEST_WHATSAPP_NUMBER;
const mockMessage = 'Test message';
const mockTelegramReceiver = process.env.TEST_TELEGRAM_RECEIVER;
const mockTelegramText = 'Hello from Telegram Bot!';
const mockAiAgentId = process.env.AI_AGENT_ID;

// Check if required environment variables are set
if (!mockAppKey || !mockAuthKey || !mockNumber || !mockTelegramReceiver || !mockAiAgentId) {
  console.error('❌ Missing required environment variables. Please check .env file.');
  console.error('Required: APIPEDIA_APP_KEY, APIPEDIA_AUTH_KEY, TEST_WHATSAPP_NUMBER, TEST_TELEGRAM_RECEIVER, AI_AGENT_ID');
  process.exit(1);
}

// Mock axios to avoid making real API calls during tests
jest.mock('axios');
jest.mock('fs');

describe('Apipedia Library', () => {
  let client;

  beforeEach(() => {
    client = apipedia(mockAppKey, mockAuthKey);
    // Reset mocks before each test
    axios.post.mockReset();
  });

  describe('whatsapp method - Text Messages', () => {
    test('should send a text message successfully', async () => {
      // Mock successful API response
      const mockResponse = { data: { success: true, message: 'Message sent successfully' } };
      axios.post.mockResolvedValue(mockResponse);

      const result = await client.whatsapp(mockNumber, mockMessage);

      // Verify the API was called with correct parameters
      expect(axios.post).toHaveBeenCalledWith(
        'https://waconsole.apipedia.id/api/create-message',
        expect.any(FormData),
        {
          headers: expect.objectContaining({
            'content-type': expect.stringContaining('multipart/form-data')
          })
        }
      );

      expect(result).toEqual(mockResponse.data);
    });

    test('should handle API errors when sending text message', async () => {
      // Mock API error response
      const mockError = {
        response: {
          status: 400,
          data: { message: 'Invalid parameters' }
        }
      };
      axios.post.mockRejectedValue(mockError);

      await expect(client.whatsapp(mockNumber, mockMessage)).rejects.toThrow('API Error: 400 - Invalid parameters');
    });

    test('should handle network errors when sending text message', async () => {
      // Mock network error (no response)
      const mockError = {
        request: {}
      };
      axios.post.mockRejectedValue(mockError);

      await expect(client.whatsapp(mockNumber, mockMessage)).rejects.toThrow('Network Error: No response received from API');
    });

    test('should handle request setup errors when sending text message', async () => {
      // Mock general request error
      const mockError = {
        message: 'Request failed'
      };
      axios.post.mockRejectedValue(mockError);

      await expect(client.whatsapp(mockNumber, mockMessage)).rejects.toThrow('Request Error: Request failed');
    });
  });

  describe('whatsapp method - Media Messages', () => {
    test('should send a media message with file stream successfully', async () => {
      // Mock successful API response
      const mockResponse = { data: { success: true, message: 'Media message sent successfully' } };
      axios.post.mockResolvedValue(mockResponse);

      // Create a mock for a file stream
      const mockMediaStream = {
        pipe: jest.fn(),
        on: jest.fn(),
        path: 'test/path/to/file.jpg'
      };

      const result = await client.whatsapp(mockNumber, mockMessage, mockMediaStream);

      // Verify the API was called with correct parameters including file
      expect(axios.post).toHaveBeenCalledWith(
        'https://waconsole.apipedia.id/api/create-message',
        expect.any(FormData),
        {
          headers: expect.objectContaining({
            'content-type': expect.stringContaining('multipart/form-data')
          })
        }
      );

      expect(result).toEqual(mockResponse.data);
    });

    test('should send a media message with file path successfully', async () => {
      // Mock successful API response
      const mockResponse = { data: { success: true, message: 'Media message sent successfully' } };
      axios.post.mockResolvedValue(mockResponse);
      
      // Mock fs.existsSync to return true for the test file
      fs.existsSync.mockReturnValue(true);

      // Mock a file stream
      const mockReadStream = {
        pipe: jest.fn(),
        on: jest.fn()
      };
      jest.spyOn(fs, 'createReadStream').mockReturnValue(mockReadStream);

      const filePath = './test-file.jpg';
      const result = await client.whatsapp(mockNumber, mockMessage, filePath);

      expect(fs.existsSync).toHaveBeenCalledWith(filePath);
      expect(fs.createReadStream).toHaveBeenCalledWith(filePath);
      expect(axios.post).toHaveBeenCalledWith(
        'https://waconsole.apipedia.id/api/create-message',
        expect.any(FormData),
        expect.objectContaining({
          headers: expect.objectContaining({
            'content-type': expect.stringContaining('multipart/form-data')
          })
        })
      );
      expect(result).toEqual(mockResponse.data);
    });

    test('should throw error when file does not exist', async () => {
      // Mock fs.existsSync to return false
      fs.existsSync.mockReturnValue(false);

      const invalidFilePath = './nonexistent-file.jpg';
      
      await expect(client.whatsapp(mockNumber, mockMessage, invalidFilePath))
        .rejects
        .toThrow('File does not exist: ./nonexistent-file.jpg');
    });

    test('should send a media message with URL successfully', async () => {
      // Mock successful API response
      const mockResponse = { data: { success: true, message: 'Media message with URL sent successfully' } };
      axios.post.mockResolvedValue(mockResponse);

      const mediaUrl = 'https://temp.apipedia.id/example/sample-1.pdf';
      const result = await client.whatsapp(mockNumber, mockMessage, mediaUrl);

      expect(axios.post).toHaveBeenCalledWith(
        'https://waconsole.apipedia.id/api/create-message',
        expect.any(FormData),
        {
          headers: expect.objectContaining({
            'content-type': expect.stringContaining('multipart/form-data')
          })
        }
      );

      expect(result).toEqual(mockResponse.data);
    });

    test('should handle API errors when sending media message', async () => {
      // Mock API error response
      const mockError = {
        response: {
          status: 401,
          data: { message: 'Unauthorized' }
        }
      };
      axios.post.mockRejectedValue(mockError);

      const mockMediaStream = {
        pipe: jest.fn(),
        on: jest.fn()
      };

      await expect(client.whatsapp(mockNumber, mockMessage, mockMediaStream))
        .rejects
        .toThrow('API Error: 401 - Unauthorized');
    });
  });

  describe('bulkV1 method - Bulk Message V1 (Same Message)', () => {
    test('should send bulk message V1 with array of numbers successfully', async () => {
      // Mock successful API response
      const mockResponse = { data: { success: true, message: 'Bulk message V1 sent successfully' } };
      axios.post.mockResolvedValue(mockResponse);

      const numbers = ['628998937095', '6281615677582'];
      const result = await client.bulkV1(numbers, mockMessage);

      expect(axios.post).toHaveBeenCalledWith(
        'https://waconsole.apipedia.id/api/bulk-messagev1',
        {
          appkey: mockAppKey,
          authkey: mockAuthKey,
          to: '628998937095|6281615677582',
          message: mockMessage
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      expect(result).toEqual(mockResponse.data);
    });

    test('should send bulk message V1 with pipe-separated string of numbers successfully', async () => {
      // Mock successful API response
      const mockResponse = { data: { success: true, message: 'Bulk message V1 sent successfully' } };
      axios.post.mockResolvedValue(mockResponse);

      const numbers = '628998937095|6281615677582';
      const result = await client.bulkV1(numbers, mockMessage);

      expect(axios.post).toHaveBeenCalledWith(
        'https://waconsole.apipedia.id/api/bulk-messagev1',
        {
          appkey: mockAppKey,
          authkey: mockAuthKey,
          to: '628998937095|6281615677582',
          message: mockMessage
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      expect(result).toEqual(mockResponse.data);
    });

    test('should handle API errors when sending bulk message V1', async () => {
      // Mock API error response
      const mockError = {
        response: {
          status: 400,
          data: { message: 'Invalid parameters for bulk message' }
        }
      };
      axios.post.mockRejectedValue(mockError);

      const numbers = ['628998937095', '6281615677582'];
      
      await expect(client.bulkV1(numbers, mockMessage))
        .rejects
        .toThrow('API Error: 400 - Invalid parameters for bulk message');
    });
  });

  describe('bulkV2 method - Bulk Message V2 (Different Messages)', () => {
    test('should send bulk message V2 with array of numbers and array of messages successfully', async () => {
      // Mock successful API response
      const mockResponse = { data: { success: true, message: 'Bulk message V2 sent successfully' } };
      axios.post.mockResolvedValue(mockResponse);

      const numbers = ['628998937095', '6281615677582'];
      const messages = ['Hello to first user', 'Hello to second user'];
      const result = await client.bulkV2(numbers, messages);

      expect(axios.post).toHaveBeenCalledWith(
        'https://waconsole.apipedia.id/api/bulk-messagev2',
        {
          appkey: mockAppKey,
          authkey: mockAuthKey,
          to: '628998937095|6281615677582',
          message: 'Hello to first user|Hello to second user'
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      expect(result).toEqual(mockResponse.data);
    });

    test('should send bulk message V2 with pipe-separated strings successfully', async () => {
      // Mock successful API response
      const mockResponse = { data: { success: true, message: 'Bulk message V2 sent successfully' } };
      axios.post.mockResolvedValue(mockResponse);

      const numbers = '628998937095|6281615677582';
      const messages = 'Hello to first user|Hello to second user';
      const result = await client.bulkV2(numbers, messages);

      expect(axios.post).toHaveBeenCalledWith(
        'https://waconsole.apipedia.id/api/bulk-messagev2',
        {
          appkey: mockAppKey,
          authkey: mockAuthKey,
          to: '628998937095|6281615677582',
          message: 'Hello to first user|Hello to second user'
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      expect(result).toEqual(mockResponse.data);
    });

    test('should handle API errors when sending bulk message V2', async () => {
      // Mock API error response
      const mockError = {
        response: {
          status: 400,
          data: { message: 'Invalid parameters for bulk message V2' }
        }
      };
      axios.post.mockRejectedValue(mockError);

      const numbers = ['628998937095', '6281615677582'];
      const messages = ['Hello to first user', 'Hello to second user'];
      
      await expect(client.bulkV2(numbers, messages))
        .rejects
        .toThrow('API Error: 400 - Invalid parameters for bulk message V2');
    });
  });

  describe('telegramSendMessage method', () => {
    test('should send a Telegram text message successfully', async () => {
      // Mock successful API response
      const mockResponse = { data: { success: true, message: 'Telegram message sent successfully' } };
      axios.post.mockResolvedValue(mockResponse);

      const result = await client.telegramSendMessage(mockTelegramReceiver, mockTelegramText);

      expect(axios.post).toHaveBeenCalledWith(
        'https://waconsole.apipedia.id/api/telegram/send_message',
        expect.any(FormData),
        {
          headers: expect.objectContaining({
            'content-type': expect.stringContaining('multipart/form-data')
          })
        }
      );

      expect(result).toEqual(mockResponse.data);
    });

    test('should handle API errors when sending Telegram text message', async () => {
      // Mock API error response
      const mockError = {
        response: {
          status: 400,
          data: { message: 'Invalid parameters for Telegram message' }
        }
      };
      axios.post.mockRejectedValue(mockError);

      await expect(client.telegramSendMessage(mockTelegramReceiver, mockTelegramText))
        .rejects
        .toThrow('API Error: 400 - Invalid parameters for Telegram message');
    });
  });

  describe('telegramSendImage method', () => {
    test('should send a Telegram image message successfully', async () => {
      // Mock successful API response
      const mockResponse = { data: { success: true, message: 'Telegram image sent successfully' } };
      axios.post.mockResolvedValue(mockResponse);

      const imageUrl = 'https://example.com/photo.jpg';
      const caption = 'Photo caption';
      const result = await client.telegramSendImage(mockTelegramReceiver, imageUrl, caption);

      expect(axios.post).toHaveBeenCalledWith(
        'https://waconsole.apipedia.id/api/telegram/send_image',
        expect.any(FormData),
        {
          headers: expect.objectContaining({
            'content-type': expect.stringContaining('multipart/form-data')
          })
        }
      );

      expect(result).toEqual(mockResponse.data);
    });

    test('should handle API errors when sending Telegram image', async () => {
      // Mock API error response
      const mockError = {
        response: {
          status: 400,
          data: { message: 'Invalid parameters for Telegram image' }
        }
      };
      axios.post.mockRejectedValue(mockError);

      await expect(client.telegramSendImage(mockTelegramReceiver, 'https://example.com/photo.jpg', 'Photo caption'))
        .rejects
        .toThrow('API Error: 400 - Invalid parameters for Telegram image');
    });
  });

  describe('telegramSendLocation method', () => {
    test('should send a Telegram location message successfully', async () => {
      // Mock successful API response
      const mockResponse = { data: { success: true, message: 'Telegram location sent successfully' } };
      axios.post.mockResolvedValue(mockResponse);

      const latitude = -6.2088;
      const longitude = 106.8456;
      const result = await client.telegramSendLocation(mockTelegramReceiver, latitude, longitude);

      expect(axios.post).toHaveBeenCalledWith(
        'https://waconsole.apipedia.id/api/telegram/send_location',
        expect.any(FormData),
        {
          headers: expect.objectContaining({
            'content-type': expect.stringContaining('multipart/form-data')
          })
        }
      );

      expect(result).toEqual(mockResponse.data);
    });

    test('should handle API errors when sending Telegram location', async () => {
      // Mock API error response
      const mockError = {
        response: {
          status: 400,
          data: { message: 'Invalid parameters for Telegram location' }
        }
      };
      axios.post.mockRejectedValue(mockError);

      await expect(client.telegramSendLocation(mockTelegramReceiver, -6.2088, 106.8456))
        .rejects
        .toThrow('API Error: 400 - Invalid parameters for Telegram location');
    });
  });

  describe('telegramSendButtons method', () => {
    test('should send a Telegram message with buttons successfully', async () => {
      // Mock successful API response
      const mockResponse = { data: { success: true, message: 'Telegram buttons sent successfully' } };
      axios.post.mockResolvedValue(mockResponse);

      const body = 'Choose an option:';
      const buttons = [
        [
          {"text": "Option 1", "callback_data": "option_1"},
          {"text": "Option 2", "callback_data": "option_2"}
        ],
        [
          {"text": "Visit Website", "url": "https://example.com"}
        ]
      ];
      const result = await client.telegramSendButtons(mockTelegramReceiver, body, buttons);

      expect(axios.post).toHaveBeenCalledWith(
        'https://waconsole.apipedia.id/api/telegram/send_buttons',
        expect.any(FormData),
        {
          headers: expect.objectContaining({
            'content-type': expect.stringContaining('multipart/form-data')
          })
        }
      );

      expect(result).toEqual(mockResponse.data);
    });

    test('should handle API errors when sending Telegram buttons', async () => {
      // Mock API error response
      const mockError = {
        response: {
          status: 400,
          data: { message: 'Invalid parameters for Telegram buttons' }
        }
      };
      axios.post.mockRejectedValue(mockError);

      const buttons = [
        [
          {"text": "Option 1", "callback_data": "option_1"}
        ]
      ];
      
      await expect(client.telegramSendButtons(mockTelegramReceiver, 'Choose an option:', buttons))
        .rejects
        .toThrow('API Error: 400 - Invalid parameters for Telegram buttons');
    });
  });

  describe('telegramSendDocument method', () => {
    test('should send a Telegram document successfully', async () => {
      // Mock successful API response
      const mockResponse = { data: { success: true, message: 'Telegram document sent successfully' } };
      axios.post.mockResolvedValue(mockResponse);

      const documentUrl = 'https://temp.apipedia.id/example/sample-1.pdf';
      const caption = 'Document caption';
      const filename = 'document.pdf';
      const result = await client.telegramSendDocument(mockTelegramReceiver, documentUrl, caption, filename);

      expect(axios.post).toHaveBeenCalledWith(
        'https://waconsole.apipedia.id/api/telegram/send_document',
        expect.any(FormData),
        {
          headers: expect.objectContaining({
            'content-type': expect.stringContaining('multipart/form-data')
          })
        }
      );

      expect(result).toEqual(mockResponse.data);
    });

    test('should handle API errors when sending Telegram document', async () => {
      // Mock API error response
      const mockError = {
        response: {
          status: 400,
          data: { message: 'Invalid parameters for Telegram document' }
        }
      };
      axios.post.mockRejectedValue(mockError);

      await expect(client.telegramSendDocument(mockTelegramReceiver, 'https://example.com/document.pdf', 'Document caption', 'document.pdf'))
        .rejects
        .toThrow('API Error: 400 - Invalid parameters for Telegram document');
    });
  });

  describe('Initialization', () => {
    test('should create a client instance with appkey and authkey', () => {
      const testClient = apipedia('test-appkey', 'test-authkey');
      
      expect(testClient).toHaveProperty('whatsapp');
      expect(typeof testClient.whatsapp).toBe('function');
      expect(testClient).toHaveProperty('bulkV1');
      expect(typeof testClient.bulkV1).toBe('function');
      expect(testClient).toHaveProperty('bulkV2');
      expect(typeof testClient.bulkV2).toBe('function');
      expect(testClient).toHaveProperty('telegramSendMessage');
      expect(typeof testClient.telegramSendMessage).toBe('function');
      expect(testClient).toHaveProperty('telegramSendImage');
      expect(typeof testClient.telegramSendImage).toBe('function');
      expect(testClient).toHaveProperty('telegramSendLocation');
      expect(typeof testClient.telegramSendLocation).toBe('function');
      expect(testClient).toHaveProperty('telegramSendButtons');
      expect(typeof testClient.telegramSendButtons).toBe('function');
      expect(testClient).toHaveProperty('telegramSendDocument');
      expect(typeof testClient.telegramSendDocument).toBe('function');
      expect(testClient.appkey).toBe('test-appkey');
      expect(testClient.authkey).toBe('test-authkey');
    });
  });
});