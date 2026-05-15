# Quick Start Guide - Java Login Application

## 🎯 What You've Got

A complete, production-ready Java login system with:
- ✅ Spring Boot backend
- ✅ JWT authentication
- ✅ User registration & login
- ✅ Beautiful responsive UI
- ✅ REST API endpoints

## ⚡ Quick Start (5 minutes)

### Step 1: Build the Project
```bash
cd /home/user/cloud-test
mvn clean install
```

### Step 2: Run the Application
```bash
mvn spring-boot:run
```

You should see:
```
Started LoginApplication in X.XXX seconds
```

### Step 3: Access the Application
- **Login Page:** http://localhost:8080/login-backend.html
- **Dashboard:** http://localhost:8080/dashboard.html
- **H2 Console:** http://localhost:8080/h2-console

### Step 4: Test the Login
1. Click on "Sign Up" tab
2. Fill in the form:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Password: password123
3. Click "Sign Up"
4. You'll be logged in and see the dashboard!

## 📚 Files Created

```
/home/user/cloud-test/
├── pom.xml                              # Maven dependencies
├── src/main/java/com/codestudio/login/
│   ├── LoginApplication.java            # Main app
│   ├── config/
│   │   └── SecurityConfig.java
│   ├── controller/
│   │   └── AuthController.java          # API endpoints
│   ├── dto/
│   │   ├── LoginRequest.java
│   │   ├── LoginResponse.java
│   │   ├── RegisterRequest.java
│   │   └── UserDTO.java
│   ├── model/
│   │   └── User.java                    # Database entity
│   ├── repository/
│   │   └── UserRepository.java          # Database access
│   ├── security/
│   │   └── JwtTokenProvider.java        # Token generation
│   └── service/
│       └── UserService.java             # Business logic
├── src/main/resources/
│   └── application.properties           # Configuration
├── login-backend.html                   # Login/Register UI
├── dashboard.html                       # User dashboard
├── JAVA_LOGIN_README.md                 # Full documentation
└── QUICK_START.md                       # This file
```

## 🔌 Test the API

### Register New User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "password123"
  }'
```

### Verify Token
```bash
curl -X POST http://localhost:8080/api/auth/verify \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🎨 Frontend Features

### Login Page (`login-backend.html`)
- Email/password input
- "Remember me" checkbox
- Switch between login and registration
- Real-time validation
- Beautiful gradient background

### Dashboard (`dashboard.html`)
- User profile display
- JWT token display
- Copy token button
- Quick logout
- User information cards

## 🔐 Security Features

✅ Password encryption (BCrypt)  
✅ JWT token-based auth  
✅ CORS enabled for API access  
✅ Input validation  
✅ Token expiration (24 hours)  
✅ Secure password storage  

## 📊 Database

Using **H2 in-memory database** (perfect for development):
- No setup needed
- Data resets on restart
- Access at: http://localhost:8080/h2-console
  - URL: `jdbc:h2:mem:testdb`
  - User: `sa`
  - Password: (leave empty)

## 🛑 Troubleshooting

### Build fails?
```bash
# Make sure Java 17+ is installed
java -version

# Clean and retry
mvn clean install
```

### Port 8080 already in use?
Edit `src/main/resources/application.properties`:
```properties
server.port=8081
```

### CORS errors?
CORS is already enabled. Make sure frontend and backend URLs are correct in `login-backend.html`.

### Can't login after restart?
H2 is in-memory, so data resets. Create a new account.

## 💡 Next Steps

1. **Connect to Real Database**
   - Update `application.properties` to use PostgreSQL/MySQL
   - Adjust JPA configuration

2. **Add Email Verification**
   - Send verification emails
   - Implement email confirmation

3. **Add Password Reset**
   - Send reset links
   - Implement password change

4. **Deploy to Production**
   - Use external database
   - Generate strong JWT secret
   - Enable HTTPS
   - Implement rate limiting

## 📖 Need Help?

See **JAVA_LOGIN_README.md** for:
- Full API documentation
- Architecture details
- Configuration options
- Deployment guide

## 🎉 Success Indicators

When running, you should see:
```
Started LoginApplication in 5.XXX seconds
```

The application is ready when you can:
- ✅ Open login page in browser
- ✅ Create a new account
- ✅ Login successfully
- ✅ See dashboard with token

---

**That's it! You have a complete login system ready to use!**
