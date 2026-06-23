import axios from 'axios';
import { calculateEmission, getHistory, getSummary, saveResult } from '../../services/carbonApi';

jest.mock('axios');

describe('carbonApi service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('calculateEmission()', () => {
    const payload = { test: 'data' };

    test('calls POST to /carbon/calculate and returns response data', async () => {
      const responseData = {
        success: true,
        totalEmission: 12.5,
        grade: 'B',
        points: 80,
        breakdown: { food: 3, transport: 5, shopping: 2.5, electricity: 2 },
      };
      axios.post.mockResolvedValue({ data: responseData });

      const result = await calculateEmission(payload);

      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/carbon/calculate'),
        payload,
        expect.any(Object)
      );
      expect(result).toEqual(responseData);
    });

    test('throws error on 400 Bad Request', async () => {
      const errorResponse = {
        response: { status: 400, data: { message: 'Invalid values' } },
      };
      axios.post.mockRejectedValue(errorResponse);

      await expect(calculateEmission(payload)).rejects.toThrow('Bad Request');
    });

    test('throws error on network error', async () => {
      const networkError = new Error('Network Error');
      axios.post.mockRejectedValue(networkError);

      await expect(calculateEmission(payload)).rejects.toThrow('Network Error');
    });
  });

  describe('getHistory()', () => {
    test('calls GET to /carbon/history and returns list', async () => {
      const responseData = [{ id: 1, totalEmission: 10 }];
      axios.get.mockResolvedValue({ data: responseData });

      const result = await getHistory();

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('/carbon/history'),
        expect.any(Object)
      );
      expect(result).toEqual(responseData);
    });

    test('throws error on API failure', async () => {
      axios.get.mockRejectedValue(new Error('Server Error'));
      await expect(getHistory()).rejects.toThrow('Server Error');
    });
  });

  describe('getSummary()', () => {
    test('calls GET to /carbon/summary and returns summary object', async () => {
      const responseData = { averageEmission: 15.2 };
      axios.get.mockResolvedValue({ data: responseData });

      const result = await getSummary();

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('/carbon/summary'),
        expect.any(Object)
      );
      expect(result).toEqual(responseData);
    });

    test('throws error on API failure', async () => {
      axios.get.mockRejectedValue(new Error('Server Error'));
      await expect(getSummary()).rejects.toThrow('Server Error');
    });
  });

  describe('saveResult()', () => {
    const payload = { totalEmission: 12.5 };

    test('calls POST to /carbon/save and returns response data', async () => {
      const responseData = { success: true };
      axios.post.mockResolvedValue({ data: responseData });

      const result = await saveResult(payload);

      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/carbon/save'),
        payload,
        expect.any(Object)
      );
      expect(result).toEqual(responseData);
    });

    test('throws error on API failure', async () => {
      axios.post.mockRejectedValue(new Error('Server Error'));
      await expect(saveResult(payload)).rejects.toThrow('Server Error');
    });
  });

  describe('with token in localStorage', () => {
    beforeEach(() => {
      jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('mock-token');
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test('calls calculateEmission with Authorization header', async () => {
      axios.post.mockResolvedValue({ data: {} });
      await calculateEmission({ test: 'data' });
      expect(axios.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object),
        expect.objectContaining({
          headers: { Authorization: 'Bearer mock-token' },
        })
      );
    });

    test('calls getHistory with Authorization header', async () => {
      axios.get.mockResolvedValue({ data: {} });
      await getHistory();
      expect(axios.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: { Authorization: 'Bearer mock-token' },
        })
      );
    });

    test('calls getSummary with Authorization header', async () => {
      axios.get.mockResolvedValue({ data: {} });
      await getSummary();
      expect(axios.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: { Authorization: 'Bearer mock-token' },
        })
      );
    });

    test('calls saveResult with Authorization header', async () => {
      axios.post.mockResolvedValue({ data: {} });
      await saveResult({ test: 'data' });
      expect(axios.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object),
        expect.objectContaining({
          headers: { Authorization: 'Bearer mock-token' },
        })
      );
    });
  });
});
