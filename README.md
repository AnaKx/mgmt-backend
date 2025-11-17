# mgmt API - User Management Backend

A production-ready RESTful API built with Node.js and Express, featuring JWT authentication, role-based access control, and secure user management.


## 🎯 Learning Goals

This project was developed to demonstrate proficiency in:

- **User Management**: CRUD operations with role-based permissions
- **Authentication & Security**: Industry-standard practices including JWT tokens and Argon2 password hashing
- **Server Architecture**: RESTful API design with proper error handling and validation
- **Database Design**: PostgreSQL schema design with proper relationships and constraints
- **Best Practices**: Environment variables, middleware patterns, and secure coding standards

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: Argon2
- **Deployment**: Railway
- **Environment Management**: dotenv

## 🏗️ Architecture

### Database Schema
```sql
users
├── id (UUID, PRIMARY KEY)
├── name (VARCHAR)
├── email (VARCHAR, UNIQUE)
├── password (VARCHAR) -- Argon2 hashed
├── is_admin (BOOLEAN)
├── has_access (BOOLEAN)
└── joined_at (TIMESTAMP)
```

### API Endpoints

#### Authentication Routes (`/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/signup` | Create new user account | No |
| POST | `/auth/login` | Login and receive JWT token | No |

#### User Management Routes (`/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users` | Get all users | Yes (Admin) |
| PATCH | `/users/:userId/revoke` | Revoke user access | Yes (Admin) |
| PATCH | `/users/:userId/restore` | Restore user access | Yes (Admin) |

### Security Features

- **Password Security**: Argon2 hashing (OWASP recommended)
- **Authentication**: JWT tokens with 7-day expiration
- **Authorization**: Middleware-based role checking
- **Input Validation**: Server-side validation for all inputs
- **Email Normalization**: Case-insensitive email handling
- **HTTPS**: Encrypted connections in production

### Middleware
```javascript
verifyToken    // Validates JWT tokens
requireAdmin   // Ensures user has admin privileges
```

## 🔐 Security Best Practices Implemented

1. **Password Storage**: Never store plain text passwords
2. **JWT Secrets**: Use cryptographically secure random strings
3. **Environment Variables**: Sensitive data never committed to Git
4. **Input Validation**: All user inputs validated and sanitized
5. **Error Handling**: Generic error messages to prevent information leakage
6. **HTTPS Only**: All production traffic encrypted
7. **Role-Based Access**: Admin endpoints protected with middleware

## 📚 Key Learnings

- **RESTful Design**: Proper HTTP methods, status codes, and endpoint structure
- **Authentication Flow**: Token generation, verification, and refresh strategies
- **Database Security**: Password hashing, SQL injection prevention
- **Middleware Patterns**: Reusable authentication and authorization logic
- **Error Handling**: Graceful failure and informative error responses
- **Production Deployment**: Environment configuration and cloud hosting

## 🔗 Related Projects

- [mgmt-ios](https://github.com/anakx/mgmt-ios) - iOS frontend application
