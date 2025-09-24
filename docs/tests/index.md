# Test Documentation

## Overview
This library includes comprehensive tests for all functionality using Jest for unit testing and real API calls for integration testing.

## Test Files

### apipedia.test.js
Location: `tests/apipedia.test.js`
- Unit tests for all library methods
- Mock implementations to prevent real API calls during unit tests
- Tests for individual messaging (text and media)
- Tests for bulk messaging (V1 and V2)
- Error handling tests
- Input validation tests

### test-send.js
Location: `test-send.js`
- Real API integration test for individual messaging
- Tests text message sending
- Tests media message sending with URL

### test-bulk.js
Location: `test-bulk.js`
- Real API integration test for bulk messaging
- Tests bulk V1 functionality (same message to multiple recipients)
- Tests bulk V2 functionality (different messages to multiple recipients)

## Running Tests

### Unit Tests
```bash
npm test
```

### All Tests (Unit + Integration)
The integration tests will make real API calls, so ensure you have valid credentials before running.

## Test Coverage
Tests cover:
- Individual text messaging
- Individual media messaging (file paths, URLs, streams)
- Bulk V1 messaging (same message to multiple recipients)
- Bulk V2 messaging (different messages to multiple recipients)
- Error handling for all methods
- Input validation
- API response handling