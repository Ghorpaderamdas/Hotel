# Hotel Kalsubai Admin Backend

A secure Spring Boot backend for Hotel Kalsubai admin management system.

## Features

- ✅ Secure admin authentication with JWT tokens
- ✅ Password hashing with BCrypt
- ✅ Role-based access control (ADMIN only)
- ✅ Password reset functionality with email
- ✅ PostgreSQL database integration
- ✅ CORS configuration for frontend integration
- ✅ Comprehensive error handling
- ✅ Input validation

## Tech Stack

- **Spring Boot 3.2.0**
- **Spring Security 6.x**
- **Spring Data JPA**
- **PostgreSQL**
- **JWT (JSON Web Tokens)**
- **BCrypt Password Encoding**
- **Maven**

## Prerequisites

- Java 17 or higher
- PostgreSQL 12 or higher
- Maven 3.6 or higher

## Setup Instructions

### 1. Database Setup

```bash
# Install PostgreSQL and create database
sudo -u postgres psql
CREATE DATABASE hotel_kalsubai_admin;
CREATE USER admin WITH PASSWORD 'admin123';
GRANT ALL PRIVILEGES ON DATABASE hotel_kalsubai_admin TO admin;
\q

# Run the schema script
psql -U admin -d hotel_kalsubai_admin -f database/schema.sql
```

### 2. Application Configuration

Update `src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/hotel_kalsubai_admin
    username: admin
    password: admin123
  
  mail:
    host: smtp.gmail.com
    username: your-email@gmail.com
    password: your-app-password

app:
  jwt:
    secret: your-secret-key-here
```

### 3. Run the Application

```bash
# Clone and navigate to backend directory
cd backend

# Install dependencies and run
mvn clean install
mvn spring-boot:run

# Application will start on http://localhost:8080
```

## API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |
| POST | `/api/auth/logout` | Admin logout |
| POST | `/api/auth/forgot-password` | Request password reset |
| POST | `/api/auth/reset-password` | Reset password with token |
| GET | `/api/auth/validate-reset-token` | Validate reset token |

### Admin Endpoints (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard` | Get dashboard data |
| GET | `/api/admin/profile` | Get admin profile |

## Default Admin Credentials

```
Username: admin
Password: admin123
Email: admin@hotelkalsubai.com
```

```
Username: superadmin
Password: admin123
Email: superadmin@hotelkalsubai.com
```

## Security Features

- **JWT Authentication**: Stateless token-based authentication
- **Password Hashing**: BCrypt with salt for secure password storage
- **Role-Based Access**: Only ADMIN role can access protected endpoints
- **CORS Protection**: Configured for specific frontend origins
- **Input Validation**: Comprehensive validation for all inputs
- **Token Expiration**: JWT tokens expire after 24 hours
- **Password Reset**: Secure token-based password reset with email

## Testing the API

### Login Request
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

### Access Protected Endpoint
```bash
curl -X GET http://localhost:8080/api/admin/dashboard \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Password Reset Request
```bash
curl -X POST http://localhost:8080/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@hotelkalsubai.com"
  }'
```

## Environment Variables

For production, set these environment variables:

```bash
export DB_USERNAME=your_db_username
export DB_PASSWORD=your_db_password
export JWT_SECRET=your_jwt_secret_key
export MAIL_USERNAME=your_email@gmail.com
export MAIL_PASSWORD=your_app_password
export CORS_ORIGINS=https://yourdomain.com
```

## Project Structure

```
backend/
├── src/main/java/com/hotelkalsubai/
│   ├── config/          # Security and other configurations
│   ├── controller/      # REST controllers
│   ├── dto/            # Data Transfer Objects
│   ├── entity/         # JPA entities
│   ├── exception/      # Exception handlers
│   ├── repository/     # Data repositories
│   ├── security/       # Security components (JWT, filters)
│   └── service/        # Business logic services
├── src/main/resources/
│   └── application.yml # Application configuration
├── database/
│   └── schema.sql     # Database schema
└── pom.xml           # Maven dependencies
```

## Error Handling

The application includes comprehensive error handling:

- **Validation Errors**: Returns field-specific validation messages
- **Authentication Errors**: Returns appropriate HTTP status codes
- **Authorization Errors**: Access denied messages
- **Generic Errors**: Graceful error responses

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.