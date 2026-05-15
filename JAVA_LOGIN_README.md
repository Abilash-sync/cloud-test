# Code Studio - Java Login Application

A complete Spring Boot-based login and authentication system with JWT token support.

## 📋 Features

- **User Registration** - Create new user accounts with email and password
- **User Login** - Authenticate users with email/password
- **JWT Authentication** - Secure token-based authentication
- **Password Encryption** - BCrypt password hashing
- **User Management** - Store and manage user data with JPA
- **REST API** - Complete REST API endpoints for all operations
- **Frontend Integration** - HTML/CSS/JavaScript frontend with login and dashboard pages
- **CORS Support** - Cross-origin resource sharing enabled for frontend access
- **H2 Database** - In-memory database for development/testing

## 🏗️ Architecture

```
com.codestudio.login/
├── LoginApplication.java          # Main Spring Boot application
├── config/
│   └── SecurityConfig.java         # Security and password encoder configuration
├── controller/
│   └── AuthController.java         # REST API endpoints for auth
├── dto/
│   ├── LoginRequest.java           # Login request DTO
│   ├── LoginResponse.java          # Login response DTO
│   ├── RegisterRequest.java        # Registration request DTO
│   └── UserDTO.java                # User data transfer object
├── model/
│   └── User.java                   # User entity (JPA)
├── repository/
│   └── UserRepository.java         # Data access layer
├── security/
│   └── JwtTokenProvider.java       # JWT token generation and validation
└── service/
    └── UserService.java            # Business logic layer
```

## 🚀 Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.8.1 or higher
- Git

### Installation

1. **Clone the repository**
   ```bash
   cd /home/user/cloud-test
   ```

2. **Build the application**
   ```bash
   mvn clean install
   ```

3. **Run the application**
   ```bash
   mvn spring-boot:run
   ```

The application will start on `http://localhost:8080`

## 📱 Using the Frontend

### Login Page
- Navigate to `http://localhost:8080/login-backend.html`
- Enter your email and password
- Click "Login" to authenticate
- On successful login, you'll be redirected to the dashboard

### Register Page
- Click on the "Sign Up" tab on the login page
- Fill in your first name, last name, email, and password
- Confirm your password
- Click "Sign Up" to create an account
- On successful registration, you'll be logged in automatically

### Dashboard
- After successful login/registration, you'll see your user profile
- View your authentication token (JWT)
- Copy the token for API requests
- Click "Logout" to log out

## 🔌 API Endpoints

### Authentication Endpoints

#### 1. Login
**POST** `/api/auth/login`

Request:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response (Success):
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "fullName": "John Doe",
    "active": true,
    "createdAt": 1634567890123
  }
}
```

Response (Failure):
```json
{
  "success": false,
  "message": "Invalid email or password",
  "token": null,
  "user": null
}
```

#### 2. Register
**POST** `/api/auth/register`

Request:
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "firstName": "Jane",
  "lastName": "Smith"
}
```

Response (Success):
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "user": {
    "id": 2,
    "email": "newuser@example.com",
    "firstName": "Jane",
    "lastName": "Smith",
    "fullName": "Jane Smith",
    "active": true,
    "createdAt": 1634567890456
  }
}
```

#### 3. Verify Token
**POST** `/api/auth/verify`

Headers:
```
Authorization: Bearer <your_token>
```

Response:
```json
true
```

#### 4. Health Check
**GET** `/api/auth/health`

Response:
```
Health check passed
```

## 🔐 Using the JWT Token

### Authorization Header Format
```
Authorization: Bearer <your_jwt_token>
```

### Example cURL Request
```bash
curl -X POST http://localhost:8080/api/auth/verify \
  -H "Authorization: Bearer eyJhbGciOiJIUzUxMiJ9..." \
  -H "Content-Type: application/json"
```

### Example JavaScript Request
```javascript
const token = localStorage.getItem('token');

fetch('http://localhost:8080/api/auth/verify', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));
```

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at BIGINT NOT NULL,
  updated_at BIGINT
);
```

## 🔧 Configuration

Edit `src/main/resources/application.properties` to customize:

```properties
# Server Port
server.port=8080

# JWT Secret (change in production!)
jwt.secret=mySecretKeyForJWTTokenGenerationAndValidationWithMinimum32Characters

# Token Expiration (24 hours in milliseconds)
jwt.expiration=86400000

# Database URL (H2 in-memory for development)
spring.datasource.url=jdbc:h2:mem:testdb
```

## 📝 Test Credentials

After running the application, you can use the following test account:

**Email:** test@example.com  
**Password:** password123

You can also register new accounts through the frontend.

## 🐛 Common Issues

### CORS Error
If you get CORS errors, the backend is already configured with `@CrossOrigin(origins = "*")`. Make sure both the frontend and backend are running on the correct ports.

### Connection Refused
Make sure the backend is running on port 8080:
```bash
mvn spring-boot:run
```

### Token Not Working
- Ensure the token hasn't expired (default: 24 hours)
- Check that the Authorization header format is correct: `Bearer <token>`
- Regenerate a new token by logging in again

## 🛠️ Development

### Build the project
```bash
mvn clean install
```

### Run tests
```bash
mvn test
```

### Run the application in development mode
```bash
mvn spring-boot:run
```

### Generate executable JAR
```bash
mvn clean package
```

The JAR file will be in `target/login-app-1.0.0.jar`

### Run the JAR
```bash
java -jar target/login-app-1.0.0.jar
```

## 📚 Project Files

- **pom.xml** - Maven configuration with all dependencies
- **src/main/java/** - Java source code
- **src/main/resources/application.properties** - Application configuration
- **login-backend.html** - Frontend login page (connects to Java backend)
- **dashboard.html** - User dashboard after login
- **README.md** - This file

## 🔑 Key Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| Spring Boot | 3.1.5 | Framework |
| Spring Security | 6.1.x | Security |
| Spring Data JPA | 6.1.x | Data persistence |
| JWT (jjwt) | 0.12.3 | Token generation |
| H2 Database | Latest | In-memory DB |
| Lombok | Latest | Boilerplate reduction |
| Java | 17+ | Language |

## 📖 API Documentation

See the API endpoints section above for complete documentation.

## ⚖️ License

This project is part of Syncfusion Pvt Ltd's Code Studio product.

## 🤝 Support

For issues or questions, contact the development team.

---

**Last Updated:** 2024
