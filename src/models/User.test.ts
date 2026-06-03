import {
  User,
  createUser,
  findUserByEmail,
  findUserById,
  getAllUsers,
  clearAllUsers,
} from './User';

describe('User Model', () => {
  beforeEach(() => {
    clearAllUsers();
  });

  describe('User constructor', () => {
    it('should create a new user with required fields', () => {
      const user = new User('test@example.com', 'password123', 'testuser');

      expect(user.email).toBe('test@example.com');
      expect(user.username).toBe('testuser');
      expect(user.password).toBe('password123');
      expect(user.id).toBeDefined();
      expect(user.createdAt).toBeDefined();
      expect(user.id).toMatch(/^user_/);
    });

    it('should generate unique IDs for different users', () => {
      const user1 = new User('user1@example.com', 'password123', 'user1');
      const user2 = new User('user2@example.com', 'password123', 'user2');

      expect(user1.id).not.toBe(user2.id);
    });
  });

  describe('hashPassword', () => {
    it('should hash the password', async () => {
      const user = new User('test@example.com', 'password123', 'testuser');
      const originalPassword = user.password;

      await user.hashPassword();

      expect(user.password).not.toBe(originalPassword);
      expect(user.password.length).toBeGreaterThan(originalPassword.length);
    });

    it('should produce different hashes for the same password', async () => {
      const user1 = new User('user1@example.com', 'password123', 'user1');
      const user2 = new User('user2@example.com', 'password123', 'user2');

      await user1.hashPassword();
      await user2.hashPassword();

      expect(user1.password).not.toBe(user2.password);
    });
  });

  describe('verifyPassword', () => {
    it('should return true for correct password', async () => {
      const plainPassword = 'password123';
      const user = new User('test@example.com', plainPassword, 'testuser');
      await user.hashPassword();

      const isValid = await user.verifyPassword(plainPassword);

      expect(isValid).toBe(true);
    });

    it('should return false for incorrect password', async () => {
      const user = new User('test@example.com', 'password123', 'testuser');
      await user.hashPassword();

      const isValid = await user.verifyPassword('wrongpassword');

      expect(isValid).toBe(false);
    });

    it('should be case sensitive', async () => {
      const user = new User('test@example.com', 'Password123', 'testuser');
      await user.hashPassword();

      const isValidLower = await user.verifyPassword('password123');
      const isValidUpper = await user.verifyPassword('PASSWORD123');

      expect(isValidLower).toBe(false);
      expect(isValidUpper).toBe(false);
    });
  });

  describe('toJSON', () => {
    it('should return user data without password', () => {
      const user = new User('test@example.com', 'password123', 'testuser');
      const json = user.toJSON();

      expect(json.id).toBeDefined();
      expect(json.email).toBe('test@example.com');
      expect(json.username).toBe('testuser');
      expect(json.password).toBeUndefined();
      expect(json.createdAt).toBeDefined();
    });
  });

  describe('createUser', () => {
    it('should create and hash a user password', async () => {
      const user = await createUser('test@example.com', 'password123', 'testuser');

      expect(user.email).toBe('test@example.com');
      expect(user.username).toBe('testuser');
      expect(user.password).not.toBe('password123'); // Should be hashed
      expect(user.id).toBeDefined();
    });

    it('should throw error if user with same email already exists', async () => {
      await createUser('test@example.com', 'password123', 'testuser');

      await expect(
        createUser('test@example.com', 'password456', 'anotheruser')
      ).rejects.toThrow('User with this email already exists');
    });

    it('should persist user in store', async () => {
      const user = await createUser('test@example.com', 'password123', 'testuser');
      const found = findUserById(user.id);

      expect(found).toBeDefined();
      expect(found?.email).toBe('test@example.com');
    });
  });

  describe('findUserByEmail', () => {
    it('should find user by email', async () => {
      const email = 'test@example.com';
      await createUser(email, 'password123', 'testuser');

      const found = findUserByEmail(email);

      expect(found).toBeDefined();
      expect(found?.email).toBe(email);
    });

    it('should return undefined if user not found', () => {
      const found = findUserByEmail('nonexistent@example.com');
      expect(found).toBeUndefined();
    });

    it('should be case sensitive', async () => {
      await createUser('test@example.com', 'password123', 'testuser');

      const found = findUserByEmail('TEST@EXAMPLE.COM');
      expect(found).toBeUndefined();
    });
  });

  describe('findUserById', () => {
    it('should find user by ID', async () => {
      const user = await createUser('test@example.com', 'password123', 'testuser');
      const found = findUserById(user.id);

      expect(found).toBeDefined();
      expect(found?.id).toBe(user.id);
      expect(found?.email).toBe('test@example.com');
    });

    it('should return undefined if user not found', () => {
      const found = findUserById('nonexistent_id');
      expect(found).toBeUndefined();
    });
  });

  describe('getAllUsers', () => {
    it('should return empty array initially', () => {
      const users = getAllUsers();
      expect(users).toEqual([]);
    });

    it('should return all created users', async () => {
      await createUser('user1@example.com', 'password123', 'user1');
      await createUser('user2@example.com', 'password456', 'user2');
      await createUser('user3@example.com', 'password789', 'user3');

      const users = getAllUsers();

      expect(users).toHaveLength(3);
      expect(users.map(u => u.email)).toContain('user1@example.com');
      expect(users.map(u => u.email)).toContain('user2@example.com');
      expect(users.map(u => u.email)).toContain('user3@example.com');
    });
  });

  describe('clearAllUsers', () => {
    it('should remove all users from store', async () => {
      await createUser('user1@example.com', 'password123', 'user1');
      await createUser('user2@example.com', 'password456', 'user2');

      clearAllUsers();

      expect(getAllUsers()).toHaveLength(0);
    });
  });
});
