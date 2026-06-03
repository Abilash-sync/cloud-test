import { Request, Response, NextFunction } from 'express';
export interface AuthenticatedRequest extends Request {
    userId?: string;
    user?: {
        id: string;
        email: string;
    };
}
/**
 * Generate JWT token
 */
export declare function generateToken(userId: string, email: string): string;
/**
 * Verify and decode JWT token
 */
export declare function verifyToken(token: string): {
    userId: string;
    email: string;
} | null;
/**
 * JWT authentication middleware
 */
export declare function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): void;
/**
 * Extract token from request headers or cookies
 */
export declare function extractToken(req: AuthenticatedRequest): string | null;
//# sourceMappingURL=auth.d.ts.map