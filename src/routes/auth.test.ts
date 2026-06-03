import request from 'supertest';
import createApp from '../app';
import { clearAllUsers, createUser } from '../models/User';
import { generateToken } from '../middleware/auth';

describe('Auth Routes', () => {
  const app = createApp();

  beforeEach(() => {
    clearAllUsers();
  });

  describe('POST /auth/register', () => {
    it('should register a new user successfully', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'newuser@example.com',
          password: 'password123',
          username: 'newuser',
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User registered successfully');
      expect(response.body.user.email).toBe('newuser@example.com');
      expect(response.body.user.username).toBe('newuser');
      expect(response.body.user.password).toBeUndefined(); // Password should not be returned
      expect(response.body.token).toBeDefined();
    });

    it('should return 400 if required fields are missing', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'newuser@example.com',
          // Missing password and username
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });

    it('should return 400 if password is too short', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'newuser@example.com',
          password: '123', // Too short
          username: 'newuser',
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('at least 6 characters');
    });

    it('should return 400 if user with same email already exists', async () => {
      const email = 'existing@example.com';
      await createUser(email, 'password123', 'existinguser');

      const response = await request(app)
        .post('/auth/register')
        .send({
          email,
          password: 'password456',
          username: 'newuser',
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('already exists');
    });

    it('should return a valid JWT token', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'newuser@example.com',
          password: 'password123',
          username: 'newuser',
        });

      expect(response.status).toBe(201);
      const token = response.body.token;
      expect(token.split('.').length).toBe(3); // JWT format
    });

    it('should generate different tokens for different users', async () => {
      const res1 = await request(app)
        .post('/auth/register')
        .send({
          email: 'user1@example.com',
          password: 'password123',
          username: 'user1',
        });

      const res2 = await request(app)
        .post('/auth/register')
        .send({
          email: 'user2@example.com',
          password: 'password456',
          username: 'user2',
        });

      expect(res1.body.token).not.toBe(res2.body.token);
    });
  });

  describe('POST /auth/login', () => {
    beforeEach(async () => {
      await createUser('testuser@example.com', 'password123', 'testuser');
    });

    it('should login successfully with correct credentials', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'testuser@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Login successful');
      expect(response.body.user.email).toBe('testuser@example.com');
      expect(response.body.user.username).toBe('testuser');
      expect(response.body.user.password).toBeUndefined();
      expect(response.body.token).toBeDefined();
    });

    it('should return 400 if email is missing', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          password: 'password123',
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Email and password are required');
    });

    it('should return 400 if password is missing', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'testuser@example.com',
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Email and password are required');
    });

    it('should return 401 if user does not exist', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(401);
      expect(response.body.error).toContain('Invalid email or password');
    });

    it('should return 401 if password is incorrect', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'testuser@example.com',
          password: 'wrongpassword',
        });

      expect(response.status).toBe(401);
      expect(response.body.error).toContain('Invalid email or password');
    });

    it('should return a valid JWT token', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'testuser@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(200);
      const token = response.body.token;
      expect(token.split('.').length).toBe(3); // JWT format
    });

    it('should return 401 for case-sensitive email', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'TESTUSER@EXAMPLE.COM',
          password: 'password123',
        });

      expect(response.status).toBe(401);
    });
  });

  describe('POST /auth/logout', () => {
    let token: string;

    beforeEach(async () => {
      const user = await createUser('testuser@example.com', 'password123', 'testuser');
      token = generateToken(user.id, user.email);
    });

    it('should logout successfully with valid token', async () => {
      const response = await request(app)
        .post('/auth/logout')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Logout successful');
    });

    it('should return 401 if no token is provided', async () => {
      const response = await request(app)
        .post('/auth/logout');

      expect(response.status).toBe(401);
      expect(response.body.error).toContain('Access token required');
    });

    it('should return 401 if invalid token is provided', async () => {
      const response = await request(app)
        .post('/auth/logout')
        .set('Authorization', 'Bearer invalid.token.here');

      expect(response.status).toBe(401);
      expect(response.body.error).toContain('Invalid or expired token');
    });

    it('should accept token from Authorization header', async () => {
      const response = await request(app)
        .post('/auth/logout')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
    });
  });

  describe('GET /auth/me', () => {
    let token: string;
    let userId: string;

    beforeEach(async () => {
      const user = await createUser('testuser@example.com', 'password123', 'testuser');
      userId = user.id;
      token = generateToken(userId, user.email);
    });

    it('should return current user with valid token', async () => {
      const response = await request(app)
        .get('/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.user.id).toBe(userId);
      expect(response.body.user.email).toBe('testuser@example.com');
      expect(response.body.user.username).toBe('testuser');
      expect(response.body.user.password).toBeUndefined();
    });

    it('should return 401 if no token is provided', async () => {
      const response = await request(app)
        .get('/auth/me');

      expect(response.status).toBe(401);
      expect(response.body.error).toContain('Access token required');
    });

    it('should return 401 if invalid token is provided', async () => {
      const response = await request(app)
        .get('/auth/me')
        .set('Authorization', 'Bearer invalid.token.here');

      expect(response.status).toBe(401);
      expect(response.body.error).toContain('Invalid or expired token');
    });
  });

  describe('Health check', () => {
    it('should return 200 for health check', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('OK');
    });
  });
});
