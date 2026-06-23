import { jest } from '@jest/globals';

let mockCalculatorError = false;

// Mock authMiddleware to always allow requests and set req.user based on headers
jest.unstable_mockModule('../../middleware/authMiddleware.js', () => ({
  default: (req, res, next) => {
    if (req.headers.unauthorized === 'true') {
      // do not set user
    } else if (req.headers.missinguserid === 'true') {
      req.user = {};
    } else {
      req.user = { id: 'test-user-id' };
    }
    next();
  },
}));

// Mock carbonCalculator.js to support throwing error on demand
jest.unstable_mockModule('../../utils/carbonCalculator.js', () => ({
  calculateEmissions: (data) => {
    if (mockCalculatorError) {
      throw new Error('Simulated calculator error');
    }
    const isEco = data.mode === 'bike' || data.ecoFriendly === 'true' || data.ecoFriendly === true;
    if (isEco) {
      return {
        transportEmissions: 1,
        electricityEmissions: 1,
        foodEmissions: 1,
        shoppingEmissions: 1,
        total: 4,
      };
    }
    return {
      transportEmissions: 10,
      electricityEmissions: 10,
      foodEmissions: 10,
      shoppingEmissions: 10,
      total: 40,
    };
  },
  getEmissionGrade: (total) => {
    return total <= 5 ? 'A' : 'F';
  },
  calculatePoints: (total) => {
    return total <= 5 ? 95 : 10;
  },
}));

// Mock mongoose connect and model compiling
jest.unstable_mockModule('mongoose', () => {
  const actual = jest.requireActual('mongoose');
  actual.connect = jest.fn().mockResolvedValue(true);
  return {
    default: actual,
    ...actual,
  };
});

// Dynamically import everything after mocks are registered
const { default: request } = await import('supertest');
const { default: express } = await import('express');
const { default: Footprint } = await import('../../models/Footprint.js');
const { default: carbonRoute } = await import('../../routes/carbonRoute.js');

const app = express();
app.use(express.json());
app.use('/api/carbon', carbonRoute);

describe('Carbon Integration Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/carbon/calculate', () => {
    const defaultPayload = {
      transport: {
        mode: 'car',
        dailyDistance: 20,
        carpool: 'no',
        noOfPassenger: 1,
        driveFrequency: 'daily',
      },
      energy: { energyType: 'fossil', electricityBill: 150 },
      food: { meatFrequency: '2-3', dairyFrequency: 'daily' },
      shopping: {
        purchaseCategory: 'small_clothing',
        shoppingFrequency: 'frequently',
        clothingPurchase: 'frequently',
      },
    };

    test('returns totalEmission > 0, breakdown, grade, non-negative points', async () => {
      const res = await request(app).post('/api/carbon/calculate').send(defaultPayload);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.totalEmission).toBeGreaterThan(0);
      expect(res.body.breakdown).toEqual(
        expect.objectContaining({
          food: expect.any(Number),
          transport: expect.any(Number),
          shopping: expect.any(Number),
          electricity: expect.any(Number),
        })
      );
      expect(['A', 'B', 'C', 'D', 'E', 'F']).toContain(res.body.grade);
      expect(res.body.points).toBeGreaterThanOrEqual(0);
    });

    test('rejects negative km/kWh values (400)', async () => {
      const badPayload = {
        ...defaultPayload,
        transport: { ...defaultPayload.transport, dailyDistance: -10 },
      };

      const res = await request(app).post('/api/carbon/calculate').send(badPayload);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    test('eco-friendly payload produces lower emission than high-carbon payload', async () => {
      const ecoPayload = {
        transport: { mode: 'bike', dailyDistance: 20 },
        energy: { energyType: 'renewable', electricityBill: 150 },
        food: { meatFrequency: 'never', dairyFrequency: 'never' },
        shopping: {
          purchaseCategory: 'small_clothing',
          shoppingFrequency: 'never',
          clothingPurchase: 'never',
          ecoFriendly: 'true',
        },
      };

      const highCarbonPayload = {
        transport: {
          mode: 'car',
          dailyDistance: 20,
          carpool: 'no',
          noOfPassenger: 1,
          driveFrequency: 'daily',
        },
        energy: { energyType: 'fossil', electricityBill: 150 },
        food: { meatFrequency: '4+', meatLover: 5, dairyFrequency: 'multiple' },
        shopping: {
          purchaseCategory: 'small_clothing',
          shoppingFrequency: 'frequently',
          clothingPurchase: 'frequently',
          ecoFriendly: 'false',
        },
      };

      const ecoRes = await request(app).post('/api/carbon/calculate').send(ecoPayload);

      const highRes = await request(app).post('/api/carbon/calculate').send(highCarbonPayload);

      expect(ecoRes.body.totalEmission).toBeLessThan(highRes.body.totalEmission);
    });

    test('uses default mode walking if transport.mode is missing', async () => {
      const res = await request(app)
        .post('/api/carbon/calculate')
        .send({
          transport: { dailyDistance: 20 },
        });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe('GET /api/carbon/history', () => {
    test('returns array of records with createdAt and totalEmission', async () => {
      const mockRecords = [
        { total: 12.5, date: new Date('2026-06-01'), createdAt: new Date('2026-06-01') },
        { total: 8.4, date: new Date('2026-06-02'), createdAt: new Date('2026-06-02') },
      ];

      jest.spyOn(Footprint, 'find').mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockRecords),
      });

      const res = await request(app).get('/api/carbon/history');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(2);
      expect(res.body[0]).toEqual(
        expect.objectContaining({
          createdAt: expect.any(String),
          totalEmission: 12.5,
        })
      );
    });

    test('returns history records with fallback date if createdAt is missing', async () => {
      const mockRecords = [{ total: 12.5, date: new Date('2026-06-01') }];
      jest.spyOn(Footprint, 'find').mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockRecords),
      });
      const res = await request(app).get('/api/carbon/history');
      expect(res.status).toBe(200);
      expect(res.body[0].createdAt).toBeDefined();
    });
  });

  describe('GET /api/carbon/summary', () => {
    test('returns averageEmission of user footprints', async () => {
      const mockRecords = [{ total: 10 }, { total: 20 }];

      jest.spyOn(Footprint, 'find').mockResolvedValue(mockRecords);

      const res = await request(app).get('/api/carbon/summary');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        averageEmission: 15,
      });
    });
  });

  describe('POST /api/carbon/save', () => {
    test('returns 200 or 201 on saving footprint', async () => {
      jest.spyOn(Footprint.prototype, 'save').mockResolvedValue({});

      const res = await request(app).post('/api/carbon/save').send({
        transportEmissions: 5.2,
        electricityEmissions: 3.1,
        foodEmissions: 4.5,
        shoppingEmissions: 2.0,
        totalEmission: 14.8,
      });

      expect([200, 201]).toContain(res.status);
      expect(res.body.success).toBe(true);
    });

    test('saves footprint with default values if emissions are missing', async () => {
      jest.spyOn(Footprint.prototype, 'save').mockResolvedValue({});
      const res = await request(app).post('/api/carbon/save').send({
        transportEmissions: null,
        electricityEmissions: undefined,
        foodEmissions: 0,
        shoppingEmissions: 0,
        totalEmission: null,
      });
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
    });
  });

  describe('Ternary and edge cases for summary', () => {
    test('returns averageEmission = 0 when footprints array is empty', async () => {
      jest.spyOn(Footprint, 'find').mockResolvedValue([]);
      const res = await request(app).get('/api/carbon/summary');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ averageEmission: 0 });
    });
  });

  describe('Unauthorized/missing user ID checks', () => {
    test('history rejects unauthorized request (401)', async () => {
      const res = await request(app).get('/api/carbon/history').set('unauthorized', 'true');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    test('history rejects missing user id request (401)', async () => {
      const res = await request(app).get('/api/carbon/history').set('missinguserid', 'true');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    test('summary rejects unauthorized request (401)', async () => {
      const res = await request(app).get('/api/carbon/summary').set('unauthorized', 'true');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    test('summary rejects missing user id request (401)', async () => {
      const res = await request(app).get('/api/carbon/summary').set('missinguserid', 'true');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    test('save rejects unauthorized request (401)', async () => {
      const res = await request(app).post('/api/carbon/save').send({}).set('unauthorized', 'true');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    test('save rejects missing user id request (401)', async () => {
      const res = await request(app).post('/api/carbon/save').send({}).set('missinguserid', 'true');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  describe('Calculate validation for negative numbers', () => {
    test('rejects negative electricityBill', async () => {
      const res = await request(app)
        .post('/api/carbon/calculate')
        .send({
          energy: { electricityBill: -5 },
        });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    test('rejects negative noOfPassenger', async () => {
      const res = await request(app)
        .post('/api/carbon/calculate')
        .send({
          transport: { noOfPassenger: -2 },
        });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    test('rejects negative meatLover', async () => {
      const res = await request(app)
        .post('/api/carbon/calculate')
        .send({
          food: { meatLover: -1 },
        });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('Internal Server Error (500) catch blocks', () => {
    test('calculate returns 500 when calculation fails', async () => {
      mockCalculatorError = true;
      try {
        const res = await request(app)
          .post('/api/carbon/calculate')
          .send({
            transport: { mode: 'car', dailyDistance: 10 },
          });
        expect(res.status).toBe(500);
        expect(res.body.success).toBe(false);
      } finally {
        mockCalculatorError = false;
      }
    });

    test('history returns 500 when find fails', async () => {
      jest.spyOn(Footprint, 'find').mockImplementation(() => {
        throw new Error('Database find error');
      });
      const res = await request(app).get('/api/carbon/history');
      expect(res.status).toBe(500);
      expect(res.body.success).toBe(false);
    });

    test('summary returns 500 when find fails', async () => {
      jest.spyOn(Footprint, 'find').mockRejectedValue(new Error('Database summary error'));
      const res = await request(app).get('/api/carbon/summary');
      expect(res.status).toBe(500);
      expect(res.body.success).toBe(false);
    });

    test('save returns 500 when save fails', async () => {
      jest.spyOn(Footprint.prototype, 'save').mockRejectedValue(new Error('Database save error'));
      const res = await request(app).post('/api/carbon/save').send({
        totalEmission: 15,
      });
      expect(res.status).toBe(500);
      expect(res.body.success).toBe(false);
    });
  });
});
