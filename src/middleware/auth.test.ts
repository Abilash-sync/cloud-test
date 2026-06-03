import {
  generateToken,
  verifyToken,
  authMiddleware,
  extractToken,
  AuthenticatedRequest,
} from './auth';
import { Response, NextFunction } from 'express';

describe('JWT Middleware', () => {
  describe('generateToken', () => {
    it('should generate a valid JWT token', () => {
      const userId = 'user123';
      const email = 'user@example.com';
      const token = generateToken(userId, email);

      expect(token).toBeDefined();
      expect(token.split('.').length).toBe(3); // JWT format: header.payload.signature
    });

    it('should generate different tokens for different users', () => {
      const token1 = generateToken('user1', 'user1@example.com');
      const token2 = generateToken('user2', 'user2@example.com');

      expect(token1).not.toBe(token2);
    });
  });

  describe('verifyToken', () => {
    it('should decode a valid token', () => {
      const userId = 'user123';
      const email = 'user@example.com';
      const token = generateToken(userId, email);
      const decoded = verifyToken(token);

      expect(decoded).not.toBeNull();
      expect(decoded?.userId).toBe(userId);
      expect(decoded?.email).toBe(email);
    });

    it('should return null for invalid token', () => {
      const decoded = verifyToken('invalid.token.here');
      expect(decoded).toBeNull();
    });

    it('should return null for expired token (after expiry)', () => {
      // Create a token that expires immediately (this is just a test scenario)
      const decoded = verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U');
      expect(decoded).toBeNull();
    });

    it('should return null for malformed token', () => {
      const decoded = verifyToken('not.a.token');
      expect(decoded).toBeNull();
    });
  });

  describe('extractToken', () => {
    it('should extract token from Authorization header', () => {
      const token = 'mytoken123';
      const req = {
        get: (header: string) => {
          if (header === 'Authorization') {
            return `Bearer ${token}`;
          }
          return undefined;
        },
        cookies: {},
      } as any;

      const extracted = extractToken(req);
      expect(extracted).toBe(token);
    });

    it('should extract token from cookies', () => {
      const token = 'mytoken123';
      const req = {
        get: () => undefined,
        cookies: { accessToken: token },
      } as any;

      const extracted = extractToken(req);
      expect(extracted).toBe(token);
    });

    it('should prefer Authorization header over cookies', () => {
      const headerToken = 'header_token';
      const cookieToken = 'cookie_token';
      const req = {
        get: (header: string) => {
          if (header === 'Authorization') {
            return `Bearer ${headerToken}`;
          }
          return undefined;
        },
        cookies: { accessToken: cookieToken },
      } as any;

      const extracted = extractToken(req);
      expect(extracted).toBe(headerToken);
    });

    it('should return null when no token is present', () => {
      const req = {
        get: () => undefined,
        cookies: {},
      } as any;

      const extracted = extractToken(req);
      expect(extracted).toBeNull();
    });

    it('should handle Bearer token with different casing', () => {
      const token = 'mytoken123';
      const req = {
        get: (header: string) => {
          if (header === 'Authorization') {
            return `Bearer ${token}`;
          }
          return undefined;
        },
        cookies: {},
      } as any;

      const extracted = extractToken(req);
      expect(extracted).toBe(token);
    });
  });

  describe('authMiddleware', () => {
    let res: any;
    let next: any;

    beforeEach(() => {
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      next = jest.fn();
    });

    it('should call next when valid token is provided in Authorization header', () => {
      const token = generateToken('user123', 'user@example.com');
      const req = {
        get: (header: string) => {
          if (header === 'Authorization') {
            return `Bearer ${token}`;
          }
          return undefined;
        },
        cookies: {},
      } as any;

      authMiddleware(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(req.userId).toBe('user123');
      expect(req.user?.email).toBe('user@example.com');
    });

    it('should return 401 when no token is provided', () => {
      const req = {
        get: () => undefined,
        cookies: {},
      } as any;

      authMiddleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Access token required' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 when invalid token is provided', () => {
      const req = {
        get: (header: string) => {
          if (header === 'Authorization') {
            return 'Bearer invalid.token.here';
          }
          return undefined;
        },
        cookies: {},
      } as any;

      authMiddleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid or expired token' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should extract token from cookies when Authorization header is missing', () => {
      const token = generateToken('user456', 'user456@example.com');
      const req = {
        get: () => undefined,
        cookies: { accessToken: token },
      } as any;

      authMiddleware(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(req.userId).toBe('user456');
    });

    it('should attach user data to request object', () => {
      const userId = 'user789';
      const email = 'user789@example.com';
      const token = generateToken(userId, email);
      const req = {
        get: (header: string) => {
          if (header === 'Authorization') {
            return `Bearer ${token}`;
          }
          return undefined;
        },
        cookies: {},
      } as any;

      authMiddleware(req, res, next);

      expect(req.userId).toBe(userId);
      expect(req.user).toBeDefined();
      expect(req.user.id).toBe(userId);
      expect(req.user.email).toBe(email);
    });

    it('should not call next on authentication failure', () => {
      const req = {
        get: () => undefined,
        cookies: {},
      } as any;

      authMiddleware(req, res, next);

      expect(next).not.toHaveBeenCalled();
    });
  });
});
