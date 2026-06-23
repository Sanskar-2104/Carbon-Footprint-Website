describe('api config helpers', () => {
  const originalEnv = process.env.REACT_APP_API_BASE_URL;

  beforeEach(() => {
    jest.resetModules();
  });

  afterAll(() => {
    process.env.REACT_APP_API_BASE_URL = originalEnv;
  });

  test('uses REACT_APP_API_BASE_URL when defined', () => {
    process.env.REACT_APP_API_BASE_URL = 'https://my-api-server.com/';
    const { API_BASE_URL, apiUrl } = require('./config/api');
    expect(API_BASE_URL).toBe('https://my-api-server.com');
    expect(apiUrl('/test')).toBe('https://my-api-server.com/test');
  });

  test('falls back to default when REACT_APP_API_BASE_URL is not defined', () => {
    delete process.env.REACT_APP_API_BASE_URL;
    const { API_BASE_URL, apiUrl } = require('./config/api');
    expect(API_BASE_URL).toBe('http://localhost:5000');
    expect(apiUrl('/test')).toBe('http://localhost:5000/test');
  });
});
