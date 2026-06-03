"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
exports.createUser = createUser;
exports.findUserByEmail = findUserByEmail;
exports.findUserById = findUserById;
exports.getAllUsers = getAllUsers;
exports.clearAllUsers = clearAllUsers;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
/**
 * User Model - In-memory storage for demo purposes
 * In production, use a database like MongoDB, PostgreSQL, etc.
 */
class User {
    constructor(email, password, username) {
        this.id = generateId();
        this.email = email;
        this.username = username;
        this.password = password;
        this.createdAt = new Date();
    }
    /**
     * Hash the password using bcrypt
     */
    async hashPassword() {
        const salt = await bcryptjs_1.default.genSalt(10);
        this.password = await bcryptjs_1.default.hash(this.password, salt);
    }
    /**
     * Verify a plain text password against the hashed password
     */
    async verifyPassword(plainPassword) {
        return bcryptjs_1.default.compare(plainPassword, this.password);
    }
    /**
     * Return user data without password
     */
    toJSON() {
        const { password, ...data } = this;
        return data;
    }
}
exports.User = User;
// In-memory user store
const userStore = new Map();
/**
 * Generate unique user ID
 */
function generateId() {
    return 'user_' + Math.random().toString(36).substr(2, 9);
}
/**
 * Create a new user with hashed password
 */
async function createUser(email, password, username) {
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
function findUserByEmail(email) {
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
function findUserById(id) {
    return userStore.get(id);
}
/**
 * Get all users
 */
function getAllUsers() {
    return Array.from(userStore.values());
}
/**
 * Clear all users (for testing)
 */
function clearAllUsers() {
    userStore.clear();
}
//# sourceMappingURL=User.js.map