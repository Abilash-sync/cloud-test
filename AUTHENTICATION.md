# Authentication System

A complete authentication system for Express.js with JWT, including User Model, Login/Logout routes, middleware, and comprehensive tests.

## Features

✅ **User Model** - TypeScript class with:
  - Password hashing with bcrypt
  - Password verification
  - JSON serialization (excludes sensitive data)
  - In-memory storage (easily replaceable with database)

✅ **Authentication Routes** - Express endpoints for:
  - User registration with validation
  - User login with credential verification
  - User logout
  - Get current user profile

✅ **JWT Middleware** - Secure token-based authentication:
  - Token generation and verification
  - Header extraction (Bearer tokens)
  - Cookie extraction fallback
  - Automatic user context attachment

✅ **Comprehensive Tests** - 57 unit and integration tests covering:
  - User model operations
  - Token generation and verification
  - Middleware functionality
  - Route handlers and error cases

## Project Structure

```
src/
├── models/
│   ├── User.ts           # User model and store
│   └── User.test.ts      # User model tests
├── middleware/
│   ├── auth.ts           # JWT middleware
│   └── auth.test.ts      # Middleware tests
├── routes/
│   ├── auth.ts           # Authentication routes
│   └── auth.test.ts      # Route tests
├── app.ts                # Express application setup
└── index.ts              # Server entry point

dist/                      # Compiled JavaScript output
```

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Edit `.env`:
```
PORT=3000
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRY=24h
NODE_ENV=development
```

## Running

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Tests
```bash
npm test                 # Run all tests once
npm run test:watch      # Run tests in watch mode
```

## API Endpoints

### Register User
```
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "username": "username"
}

Response (201):
{
  "message": "User registered successfully",
  "user": {
    "id": "user_abc123",
    "email": "user@example.com",
    "username": "username",
    "createdAt": "2024-01-01T10:00:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response (200):
{
  "message": "Login successful",
  "user": {
    "id": "user_abc123",
    "email": "user@example.com",
    "username": "username",
    "createdAt": "2024-01-01T10:00:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Logout
```
POST /auth/logout
Authorization: Bearer <token>

Response (200):
{
  "message": "Logout successful"
}
```

### Get Current User
```
GET /auth/me
Authorization: Bearer <token>

Response (200):
{
  "user": {
    "id": "user_abc123",
    "email": "user@example.com",
    "username": "username",
    "createdAt": "2024-01-01T10:00:00Z"
  }
}
```

### Health Check
```
GET /health

Response (200):
{
  "status": "OK"
}
```

## Authentication Methods

### Bearer Token (Header)
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Cookie
```
Cookie: accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

The middleware checks the header first, then falls back to cookies.

## Error Handling

### 400 Bad Request
- Missing required fields
- Invalid email format
- Password too short (< 6 characters)
- User already exists
- Missing credentials

### 401 Unauthorized
- No token provided
- Invalid token
- Expired token
- Invalid credentials

### 500 Internal Server Error
- Unexpected server errors

## User Model API

### Constructor
```typescript
const user = new User(email: string, password: string, username: string);
```

### Methods
```typescript
// Hash the password (one-way)
await user.hashPassword(): Promise<void>

// Verify plaintext password against hash
await user.verifyPassword(plainPassword: string): Promise<boolean>

// Get user data without password
user.toJSON(): { id, email, username, createdAt }
```

### Factory Functions
```typescript
// Create user with hashed password
const user = await createUser(email: string, password: string, username: string): Promise<User>

// Find by email
const user = findUserByEmail(email: string): User | undefined

// Find by ID
const user = findUserById(id: string): User | undefined

// Get all users
const users = getAllUsers(): User[]

// Clear all users (testing only)
clearAllUsers(): void
```

## Middleware API

### Generate Token
```typescript
const token = generateToken(userId: string, email: string): string
```

### Verify Token
```typescript
const decoded = verifyToken(token: string): { userId: string; email: string } | null
```

### Extract Token
```typescript
const token = extractToken(req: AuthenticatedRequest): string | null
```

### Auth Middleware
```typescript
app.use(authMiddleware);
// After middleware: req.userId and req.user are populated
```

## Testing

The project includes 57 comprehensive tests:

### User Model Tests (30 tests)
- Constructor and ID generation
- Password hashing and verification
- JSON serialization
- User creation and persistence
- Finding users by email/ID
- Retrieving all users

### Middleware Tests (16 tests)
- Token generation with unique IDs
- Token verification and decoding
- Invalid and malformed tokens
- Token extraction from headers
- Token extraction from cookies
- Header preference over cookies
- Middleware success and failure cases
- User context attachment

### Routes Tests (11 tests)
- User registration validation
- Login with correct/incorrect credentials
- Logout with/without token
- Get current user profile
- Health check endpoint

Run tests with:
```bash
npm test                           # Run all tests
npm test -- --watch              # Watch mode
npm test -- --coverage           # With coverage report
npm test -- src/models/User.test.ts  # Specific test file
```

## Security Best Practices

1. **Change JWT_SECRET in Production**
   - Use a strong, random secret (at least 32 characters)
   - Store in environment variables
   - Rotate periodically

2. **Password Requirements**
   - Minimum 6 characters (configurable)
   - Always hash before storing
   - Use bcrypt with salt rounds (default: 10)

3. **Token Management**
   - Set appropriate expiry time (default: 24h)
   - Include refresh token mechanism for long sessions
   - Store securely in httpOnly cookies

4. **HTTPS**
   - Always use HTTPS in production
   - Never send tokens over plain HTTP

5. **Input Validation**
   - Validate all user inputs
   - Sanitize email and username
   - Rate limit authentication endpoints

6. **Database**
   - Replace in-memory storage with secure database
   - Use parameterized queries to prevent SQL injection
   - Hash passwords with strong algorithms

## Production Checklist

- [ ] Change JWT_SECRET to a strong random value
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Replace in-memory storage with database
- [ ] Implement rate limiting on auth endpoints
- [ ] Add email verification
- [ ] Implement refresh token mechanism
- [ ] Add 2FA/MFA support
- [ ] Set up logging and monitoring
- [ ] Implement API versioning
- [ ] Add CORS configuration if needed
- [ ] Set secure cookie flags (httpOnly, Secure, SameSite)

## Example Usage

### Starting the Server
```bash
npm run dev
# Server running on http://localhost:3000
```

### Creating a New User
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepass123",
    "username": "john_doe"
  }'
```

### Logging In
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepass123"
  }'
```

### Accessing Protected Route
```bash
curl -X GET http://localhost:3000/auth/me \
  -H "Authorization: Bearer <your-token-here>"
```

## Contributing

1. Add tests for new features
2. Ensure all tests pass: `npm test`
3. Build successfully: `npm run build`
4. Update documentation

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
