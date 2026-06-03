import bcrypt from 'bcryptjs';

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
export class User implements IUser {
  id: string;
  email: string;
  username: string;
  password: string;
  createdAt: Date;

  constructor(email: string, password: string, username: string) {
    this.id = generateId();
    this.email = email;
    this.username = username;
    this.password = password;
    this.createdAt = new Date();
  }

  /**
   * Hash the password using bcrypt
   */
  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  /**
   * Verify a plain text password against the hashed password
   */
  async verifyPassword(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.password);
  }

  /**
   * Return user data without password
   */
  toJSON() {
    const { password, ...data } = this as any;
    return data;
  }
}

// In-memory user store
const userStore = new Map<string, User>();

/**
 * Generate unique user ID
 */
function generateId(): string {
  return 'user_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Create a new user with hashed password
 */
export async function createUser(
  email: string,
  password: string,
  username: string
): Promise<User> {
  // Check if user already exists
  if (findUserByEmail(email)) {
    throw new Error('User with this email already exists');
  }

  const user = new User(email, password, username);
  await user.hashPassword();
  userStore.set(user.id, user);

  return user;
}

/**
 * Find user by email
 */
export function findUserByEmail(email: string): User | undefined {
  for (const user of userStore.values()) {
    if (user.email === email) {
      return user;
    }
  }
  return undefined;
}

/**
 * Find user by ID
 */
export function findUserById(id: string): User | undefined {
  return userStore.get(id);
}

/**
 * Get all users
 */
export function getAllUsers(): User[] {
  return Array.from(userStore.values());
}

/**
 * Clear all users (for testing)
 */
export function clearAllUsers(): void {
  userStore.clear();
}
