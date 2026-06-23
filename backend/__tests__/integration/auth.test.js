import { jest } from '@jest/globals';

jest.unstable_mockModule('mongoose', () => {
  const actual = jest.requireActual('mongoose');
  actual.connect = jest.fn().mockResolvedValue(true);
  return {
    default: actual,
    ...actual,
  };
});

jest.unstable_mockModule('../../config/nodemailer.js', () => ({
  sendVerificationMail: jest.fn().mockResolvedValue(true),
  sendResetPasswordMail: jest.fn().mockResolvedValue(true),
}));

// Dynamically import everything to avoid top-level static import issues
const { default: request } = await import('supertest');
const { default: express } = await import('express');
const { default: jwt } = await import('jsonwebtoken');
const { default: bcrypt } = await import('bcryptjs');
const { default: User } = await import('../../models/User.js');
const { default: authRoute } = await import('../../routes/authRoute.js');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoute);

describe('Auth Integration Tests', () => {
  const testSecret = 'test-jwt-secret';

  beforeAll(() => {
    process.env.JWT_SECRET = testSecret;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    test('success with valid data (201 + token)', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue(null);
      jest.spyOn(User.prototype, 'save').mockResolvedValue({});
      jest.spyOn(bcrypt, 'genSalt').mockResolvedValue('salt');
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedpassword');

      const res = await request(app).post('/api/auth/register').send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
    });

    test('reject duplicate email (409)', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue({ email: 'duplicate@example.com' });

      const res = await request(app).post('/api/auth/register').send({
        name: 'Jane Doe',
        email: 'duplicate@example.com',
        password: 'password123',
      });

      expect(res.status).toBe(409);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('exists');
    });

    test('reject missing email (400)', async () => {
      const res = await request(app).post('/api/auth/register').send({
        name: 'Jane Doe',
        password: 'password123',
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    test('reject short password (400)', async () => {
      const res = await request(app).post('/api/auth/register').send({
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: '123',
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('characters');
    });

    test('reject invalid email format (400)', async () => {
      const res = await request(app).post('/api/auth/register').send({
        name: 'Jane Doe',
        email: 'not-an-email',
        password: 'password123',
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('format');
    });
  });

  describe('POST /api/auth/login', () => {
    test('reject wrong password (401)', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue({
        email: 'john@example.com',
        password: 'hashedpassword',
        verified: true,
      });
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      const res = await request(app).post('/api/auth/login').send({
        email: 'john@example.com',
        password: 'wrongpassword',
      });

      expect(res.status).toBe(401);
      expect(res.body.message).toContain('Invalid');
    });

    test('reject missing email (400)', async () => {
      const res = await request(app).post('/api/auth/login').send({
        password: 'password123',
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    test('reject unregistered email (401)', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue(null);

      const res = await request(app).post('/api/auth/login').send({
        email: 'unregistered@example.com',
        password: 'password123',
      });

      expect(res.status).toBe(401);
      expect(res.body.message).toContain('Invalid');
    });
  });

  describe('GET /api/auth/me', () => {
    test('reject no token (401)', async () => {
      const res = await request(app).get('/api/auth/me');
      expect(res.status).toBe(401);
    });

    test('reject invalid token (401)', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalid-token-string');
      expect(res.status).toBe(401);
    });

    test('reject expired token (401)', async () => {
      const expiredToken = jwt.sign(
        { id: 'user-123', exp: Math.floor(Date.now() / 1000) - 60 },
        testSecret
      );
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${expiredToken}`);
      expect(res.status).toBe(401);
      expect(res.body.message).toContain('expired');
    });

    test('success with valid token (200)', async () => {
      const validToken = jwt.sign({ id: 'user-123' }, testSecret);
      jest.spyOn(User, 'findById').mockReturnValue({
        select: jest.fn().mockResolvedValue({
          id: 'user-123',
          name: 'John Doe',
          email: 'john@example.com',
        }),
      });

      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${validToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.user).toEqual({
        id: 'user-123',
        name: 'John Doe',
        email: 'john@example.com',
      });
    });
  });

  describe('POST /api/auth/register with Guest Cache migration', () => {
    test('success and migrate guest cache when present', async () => {
      const { default: GuestCache } = await import('../../services/GuestCache.js');
      const { default: Footprint } = await import('../../models/Footprint.js');

      const ip = '::ffff:127.0.0.1';
      GuestCache[ip] = {
        transportEmissions: 10,
        electricityEmissions: 20,
        foodEmissions: 30,
        shoppingEmissions: 40,
        total: 100,
      };
      GuestCache['127.0.0.1'] = {
        transportEmissions: 10,
        electricityEmissions: 20,
        foodEmissions: 30,
        shoppingEmissions: 40,
        total: 100,
      };

      jest.spyOn(User, 'findOne').mockResolvedValue(null);
      jest.spyOn(User.prototype, 'save').mockResolvedValue({});
      const footprintSaveSpy = jest.spyOn(Footprint.prototype, 'save').mockResolvedValue({});
      jest.spyOn(bcrypt, 'genSalt').mockResolvedValue('salt');
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedpassword');

      const res = await request(app).post('/api/auth/register').send({
        name: 'Jane Guest',
        email: 'janeguest@example.com',
        password: 'password123',
      });

      expect(res.status).toBe(201);
      expect(footprintSaveSpy).toHaveBeenCalled();
      expect(GuestCache[ip]).toBeUndefined();
    });

    test('auto-verify user when email sending fails on register', async () => {
      const { sendVerificationMail } = await import('../../config/nodemailer.js');
      sendVerificationMail.mockRejectedValueOnce(new Error('SMTP error'));

      jest.spyOn(User, 'findOne').mockResolvedValue(null);
      const userSaveSpy = jest.spyOn(User.prototype, 'save').mockResolvedValue({});
      jest.spyOn(bcrypt, 'genSalt').mockResolvedValue('salt');
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedpassword');

      const res = await request(app).post('/api/auth/register').send({
        name: 'John Mail Fail',
        email: 'johnfail@example.com',
        password: 'password123',
      });

      expect(res.status).toBe(201);
      const savedUser = userSaveSpy.mock.instances[userSaveSpy.mock.instances.length - 1];
      expect(savedUser.verified).toBe(true);
    });

    test('should return 500 when database fails during registration', async () => {
      jest.spyOn(User, 'findOne').mockRejectedValue(new Error('Db connection error'));

      const res = await request(app).post('/api/auth/register').send({
        name: 'John Error',
        email: 'johnerror@example.com',
        password: 'password123',
      });

      expect(res.status).toBe(500);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Db connection error');
    });
  });

  describe('POST /api/auth/login extra checks', () => {
    test('reject missing password (400)', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: 'john@example.com',
      });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    test('reject unverified user (400)', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue({
        email: 'john@example.com',
        password: 'hashedpassword',
        verified: false,
      });

      const res = await request(app).post('/api/auth/login').send({
        email: 'john@example.com',
        password: 'password123',
      });
      expect(res.status).toBe(400);
      expect(res.body.message).toContain('verify your email');
    });

    test('login success (200 + token)', async () => {
      const mockUser = {
        _id: 'user-123',
        email: 'john@example.com',
        password: 'hashedpassword',
        verified: true,
      };
      jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const res = await request(app).post('/api/auth/login').send({
        email: 'john@example.com',
        password: 'password123',
      });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
    });

    test('login database / internal error (500)', async () => {
      jest.spyOn(User, 'findOne').mockRejectedValue(new Error('Db error'));

      const res = await request(app).post('/api/auth/login').send({
        email: 'john@example.com',
        password: 'password123',
      });

      expect(res.status).toBe(500);
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/auth/me extra checks', () => {
    test('getMe user not found (404)', async () => {
      const validToken = jwt.sign({ id: 'non-existent' }, testSecret);
      jest.spyOn(User, 'findById').mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${validToken}`);

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });

    test('getMe internal error (500)', async () => {
      const validToken = jwt.sign({ id: 'user-123' }, testSecret);
      jest.spyOn(User, 'findById').mockReturnValue({
        select: jest.fn().mockRejectedValue(new Error('Db error')),
      });

      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${validToken}`);

      expect(res.status).toBe(500);
      expect(res.body.success).toBe(false);
    });

    test('getMe unauthorized due to missing user id in token (401)', async () => {
      const tokenNoId = jwt.sign({ email: 'user@example.com' }, testSecret);
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${tokenNoId}`);

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('Unauthorized');
    });
  });

  describe('GET /api/auth/verify-email/:token', () => {
    test('success: verifies user and redirects to frontend verified=true', async () => {
      const mockToken = jwt.sign({ id: 'user-123' }, testSecret);
      const mockUserInstance = {
        _id: 'user-123',
        verified: false,
        verificationToken: mockToken,
        save: jest.fn().mockResolvedValue({}),
      };

      jest.spyOn(User, 'findById').mockResolvedValue(mockUserInstance);

      const res = await request(app).get(`/api/auth/verify-email/${mockToken}`);

      expect(User.findById).toHaveBeenCalledWith({ _id: 'user-123' });
      expect(mockUserInstance.verified).toBe(true);
      expect(mockUserInstance.verificationToken).toBeNull();
      expect(mockUserInstance.save).toHaveBeenCalled();
      expect(res.status).toBe(302);
      expect(res.headers.location).toContain('verified=true');
    });

    test('invalid token format / expired redirects to verified=false', async () => {
      const res = await request(app).get('/api/auth/verify-email/invalidtoken');
      expect(res.status).toBe(302);
      expect(res.headers.location).toContain('verified=false');
    });

    test('user not found returns 404', async () => {
      const mockToken = jwt.sign({ id: 'non-existent' }, testSecret);
      jest.spyOn(User, 'findById').mockResolvedValue(null);

      const res = await request(app).get(`/api/auth/verify-email/${mockToken}`);
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('Invalid token');
    });
  });

  describe('POST /api/auth/forgot-password', () => {
    test('success: generates reset token and sends email', async () => {
      const { sendResetPasswordMail } = await import('../../config/nodemailer.js');
      const mockUserInstance = {
        email: 'user@example.com',
        resetPasswordToken: null,
        save: jest.fn().mockResolvedValue({}),
      };

      jest.spyOn(User, 'findOne').mockResolvedValue(mockUserInstance);

      const res = await request(app)
        .post('/api/auth/forgot-password')
        .send({ email: 'user@example.com' });

      expect(User.findOne).toHaveBeenCalledWith({ email: 'user@example.com' });
      expect(mockUserInstance.resetPasswordToken).toBeDefined();
      expect(mockUserInstance.save).toHaveBeenCalled();
      expect(sendResetPasswordMail).toHaveBeenCalledWith(
        'user@example.com',
        mockUserInstance.resetPasswordToken
      );
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    test('returns 404 if user not found', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue(null);

      const res = await request(app)
        .post('/api/auth/forgot-password')
        .send({ email: 'nonexistent@example.com' });

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('not found');
    });

    test('returns 500 on database error', async () => {
      jest.spyOn(User, 'findOne').mockRejectedValue(new Error('Database breakdown'));

      const res = await request(app)
        .post('/api/auth/forgot-password')
        .send({ email: 'error@example.com' });

      expect(res.status).toBe(500);
      expect(res.body.error).toBe('Database breakdown');
    });
  });

  describe('PUT /api/auth/reset-password/:token', () => {
    test('success: resets user password', async () => {
      const mockToken = jwt.sign({ email: 'user@example.com' }, testSecret);
      const mockUserInstance = {
        email: 'user@example.com',
        password: 'oldpassword',
        resetPasswordToken: mockToken,
        save: jest.fn().mockResolvedValue({}),
      };

      jest.spyOn(User, 'findOne').mockResolvedValue(mockUserInstance);
      jest.spyOn(bcrypt, 'genSalt').mockResolvedValue('salt');
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('newhashedpassword');

      const res = await request(app)
        .put(`/api/auth/reset-password/${mockToken}`)
        .send({ password: 'newpassword123' });

      expect(User.findOne).toHaveBeenCalledWith({ email: 'user@example.com' });
      expect(mockUserInstance.password).toBe('newhashedpassword');
      expect(mockUserInstance.resetPasswordToken).toBeNull();
      expect(mockUserInstance.save).toHaveBeenCalled();
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    test('returns 404 if user not found', async () => {
      const mockToken = jwt.sign({ email: 'nonexistent@example.com' }, testSecret);
      jest.spyOn(User, 'findOne').mockResolvedValue(null);

      const res = await request(app)
        .put(`/api/auth/reset-password/${mockToken}`)
        .send({ password: 'newpassword123' });

      expect(res.status).toBe(404);
      expect(res.body.error).toContain('User not found');
    });

    test('returns 500 if token is invalid or expired', async () => {
      const res = await request(app)
        .put('/api/auth/reset-password/invalidtoken')
        .send({ password: 'newpassword123' });

      expect(res.status).toBe(500);
      expect(res.body.error).toBeDefined();
    });
  });

  describe('fallback JWT_SECRET checks', () => {
    const originalSecret = process.env.JWT_SECRET;

    beforeEach(() => {
      delete process.env.JWT_SECRET;
    });

    afterEach(() => {
      process.env.JWT_SECRET = originalSecret;
    });

    test('register/login/verifyEmail/forgotPassword/resetPassword work with fallback JWT_SECRET', async () => {
      // 1. Register
      jest.spyOn(User, 'findOne').mockResolvedValue(null);
      jest.spyOn(User.prototype, 'save').mockResolvedValue({});
      jest.spyOn(bcrypt, 'genSalt').mockResolvedValue('salt');
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedpassword');

      const registerRes = await request(app).post('/api/auth/register').send({
        name: 'John Fallback',
        email: 'johnfallback@example.com',
        password: 'password123',
      });
      expect(registerRes.status).toBe(201);

      // 2. Login
      const mockUser = {
        _id: 'user-123',
        email: 'johnfallback@example.com',
        password: 'hashedpassword',
        verified: true,
      };
      jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const loginRes = await request(app).post('/api/auth/login').send({
        email: 'johnfallback@example.com',
        password: 'password123',
      });
      expect(loginRes.status).toBe(200);

      // 3. VerifyEmail
      const fallbackVerifyToken = jwt.sign({ id: 'user-123' }, 'secret');
      const mockUserInstance = {
        _id: 'user-123',
        verified: false,
        verificationToken: fallbackVerifyToken,
        save: jest.fn().mockResolvedValue({}),
      };
      jest.spyOn(User, 'findById').mockResolvedValue(mockUserInstance);
      const verifyRes = await request(app).get(`/api/auth/verify-email/${fallbackVerifyToken}`);
      expect(verifyRes.status).toBe(302);

      // 4. ForgotPassword
      const mockUserForgotInstance = {
        email: 'johnfallback@example.com',
        resetPasswordToken: null,
        save: jest.fn().mockResolvedValue({}),
      };
      jest.spyOn(User, 'findOne').mockResolvedValue(mockUserForgotInstance);
      const forgotRes = await request(app)
        .post('/api/auth/forgot-password')
        .send({ email: 'johnfallback@example.com' });
      expect(forgotRes.status).toBe(200);

      // 5. ResetPassword
      const fallbackResetToken = jwt.sign({ email: 'johnfallback@example.com' }, 'secret');
      const mockUserResetInstance = {
        email: 'johnfallback@example.com',
        password: 'oldpassword',
        resetPasswordToken: fallbackResetToken,
        save: jest.fn().mockResolvedValue({}),
      };
      jest.spyOn(User, 'findOne').mockResolvedValue(mockUserResetInstance);
      jest.spyOn(bcrypt, 'genSalt').mockResolvedValue('salt');
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('newhashedpassword');

      const resetRes = await request(app)
        .put(`/api/auth/reset-password/${fallbackResetToken}`)
        .send({ password: 'newpassword123' });
      expect(resetRes.status).toBe(200);
    });
  });
});
