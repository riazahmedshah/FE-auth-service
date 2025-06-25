# 🔐 Authentication Service - FlyEasy

**Secure identity management for FlyEasy's flight booking platform**


## 📌 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [API Documentation](#-api-documentation)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

## ✨ Features
### Core Authentication
- JWT-based stateless authentication
- Role-based access control (RBAC)
- Secure password hashing

### Security
- Input validation with Zod
- Rate limiting
- Password policy enforcement

## 🛠 Tech Stack
| Component       | Technology               |
|-----------------|--------------------------|
| Runtime         | Node.js                  |
| Framework       | Express                  |
| Language        | TypeScript               |
| Database        | PostgreSQL               |
| Validation      | Zod                      |
| Authentication  | JWT, bcrypt              |
| API Style       | RESTful                  |

<!-- ## 📚 API Documentation -->

### Authentication Endpoints

#### User Registration
```bash
POST /auth/user
Content-Type: application/json

{
  "username": "flyeasy",
  "email": "user@flyeasy.com",
  "password": "secret"
}

POST /auth/login
Content-Type: application/json

{
  "email": "user@flyeasy.com",
  "password": "secret"
}
```
