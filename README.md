# ReserveX

ReserveX is a full-stack reservation management platform built for a book fair use case, with separate portals for vendors and administrators.

This repository is a **group project** and part of the **SENG 22212 - Software Architecture and Design** university group assignment.

## Project Modules

- `backend`: Spring Boot REST API with JWT authentication, role-based access, MySQL persistence, and email support.
- `online-portal`: Vendor-facing React app for authentication, stall browsing, reservations, and profile actions.
- `admin-portal`: Admin/employee React app for monitoring reservations and managing stalls.
- `database`: Data model reference (`db.sql`).

## Tech Stack

- **Backend**: Java 17, Spring Boot, Spring Security, Spring Data JPA, MySQL, Maven
- **Frontend**: React, Vite, Axios, React Router
- **Other**: JWT, SMTP email integration

## Core Features

- User registration and login with JWT
- Role-based authorization (`VENDOR`, `EMPLOYEE`)
- Stall listing and reservation workflows
- Reservation history retrieval
- Genre management for reserved stalls
- Admin dashboard access to stalls and reservations
- Contact form submission via backend email service

## Getting Started

### Prerequisites

- Java 17+
- Node.js 18+ and npm
- MySQL

### 1) Run Backend

```bash
cd backend
mvnw.cmd spring-boot:run
```

Backend runs on `http://localhost:8080` by default.

### 2) Run Online Portal

```bash
cd online-portal
npm install
npm run dev
```

### 3) Run Admin Portal

```bash
cd admin-portal
npm install
npm run dev
```

## Environment Notes

- Backend configuration is in `backend/src/main/resources/application.properties`.
- Online portal API base URL can be configured using:
  - `VITE_API_BASE_URL` (defaults to `http://localhost:8080/api`)

## API Overview (High-Level)

- Auth: `/api/auth/*`
- Users: `/api/users/*`
- Reservations: `/api/reservations/*`
- Stalls: `/api/stalls/*`
- Admin: `/api/admin/*`
- Genres: `/api/genres/*`
- Contact: `/api/contact`

## Academic Context

This codebase was developed collaboratively as a university coursework deliverable for:

**SENG 22212 - Software Architecture and Design**  
Group Assignment Project

