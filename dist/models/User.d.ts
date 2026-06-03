export interface IUser {
    id: string;
    email: string;
    username: string;
    password: string;
    createdAt: Date;
}
/**
 * User Model - In-memory storage for demo purposes
 * In production, use a database like MongoDB, PostgreSQL, etc.
 */
export declare class User implements IUser {
    id: string;
    email: string;
    username: string;
    password: string;
    createdAt: Date;
    constructor(email: string, password: string, username: string);
    /**
     * Hash the password using bcrypt
     */
    hashPassword(): Promise<void>;
    /**
     * Verify a plain text password against the hashed password
     */
    verifyPassword(plainPassword: string): Promise<boolean>;
    /**
     * Return user data without password
     */
    toJSON(): any;
}
/**
 * Create a new user with hashed password
 */
export declare function createUser(email: string, password: string, username: string): Promise<User>;
/**
 * Find user by email
 */
export declare function findUserByEmail(email: string): User | undefined;
/**
 * Find user by ID
 */
export declare function findUserById(id: string): User | undefined;
/**
 * Get all users
 */
export declare function getAllUsers(): User[];
/**
 * Clear all users (for testing)
 */
export declare function clearAllUsers(): void;
//# sourceMappingURL=User.d.ts.map