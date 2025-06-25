# 🔐 Authentication Service - FlyEasy

**Standalone microservice handling secure identity management for FlyEasy's flight booking platform**

[![Build Status](https://img.shields.io/github/actions/workflow/status/flyeasy/auth-service/ci.yml?branch=main)](https://github.com/flyeasy/auth-service/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Microservice](https://img.shields.io/badge/architecture-microservice-brightgreen)](https://microservices.io)

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
- Refresh token rotation
- OAuth 2.0 social login (Google, Apple, Facebook)

### Security
- RBAC (Role-Based Access Control)
- Rate limiting (10 requests/min)
- Password policy enforcement
- Automatic token blacklisting

### Integrations
- gRPC for internal service communication
- Kafka events for user lifecycle changes
- Redis session management

## 🛠 Tech Stack
| Category       | Technology                          |
|----------------|-------------------------------------|
| Framework      | NestJS                              |
| Database       | PostgreSQL (Users), Redis (Sessions)|
| APIs           | REST, gRPC                          |
| Security       | Helmet, CSRF, Argon2                |
| Observability  | Prometheus, Grafana                 |
| Messaging      | Kafka                               |

## 📚 API Documentation
Explore our API endpoints:

```bash
# Get access token
POST /auth/login
Body: { "email": "user@flyeasy.com", "password": "secret" }