# 🚖 SmartRideAI

## An AI-Powered Intelligent Ride Sharing Platform

**Version:** 0.1 (Development Build)

**Backend:** FastAPI + SQLAlchemy + SQLite\
**Frontend:** React + Vite + Material UI + React Leaflet\
**AI Modules:** Scikit-learn + Python

------------------------------------------------------------------------

# Project Overview

SmartRideAI is an AI-enhanced ride-sharing platform designed to improve
traditional ride-hailing systems by integrating intelligent
decision-making into multiple stages of the ride lifecycle.

Unlike conventional ride-sharing applications, SmartRideAI incorporates
Artificial Intelligence to:

-   Predict ride ETA
-   Recommend the best available driver
-   Detect fraudulent rides
-   Provide an AI-powered chatbot assistant

The project follows a modular software architecture where each AI
component operates independently while remaining fully integrated with
the backend APIs.

------------------------------------------------------------------------

# Technology Stack

## Backend

-   FastAPI
-   SQLAlchemy ORM
-   Alembic
-   SQLite
-   Pydantic
-   JWT Authentication
-   Passlib (bcrypt)

## Frontend

-   React
-   Vite
-   Material UI
-   Axios
-   React Router
-   React Leaflet
-   OpenStreetMap

## AI Modules

-   Scikit-learn
-   Pandas
-   NumPy
-   Joblib

## External APIs

-   OpenStreetMap
-   OSRM Routing API

------------------------------------------------------------------------

# Project Structure

``` text
SmartRideAI/
│
├── backend/
│   ├── app/
│   ├── ai/
│   ├── alembic/
│   ├── database/
│   └── requirements.txt
│
├── frontend_final/
│
├── simulation/
│
└── README.md
```

------------------------------------------------------------------------

# Backend Architecture

    API
     ↓
    Services
     ↓
    Repositories
     ↓
    Database

### API Layer

-   Authentication
-   Driver APIs
-   Vehicle APIs
-   Ride APIs
-   AI APIs
-   Chatbot APIs

### Service Layer

Contains business logic: - User Registration - Login - Ride Request -
Driver Recommendation - ETA Prediction

### Repository Layer

Responsible for SQLAlchemy CRUD operations.

### Database

Current tables: - Users - Drivers - Vehicles - Rides

------------------------------------------------------------------------

# Modules

## Authentication

### Implemented

-   User Registration
-   User Login
-   Password Hashing
-   JWT Authentication
-   Protected Endpoints

------------------------------------------------------------------------

## Driver Module

-   Create Driver
-   Read Driver
-   Update Driver
-   Delete Driver

------------------------------------------------------------------------

## Vehicle Module

-   Create Vehicle
-   Read Vehicle
-   Update Vehicle
-   Delete Vehicle

------------------------------------------------------------------------

## Ride Module

-   Request Ride
-   Cancel Ride
-   Complete Ride
-   Ride Status Management

Backend completed. Frontend integration in progress.

------------------------------------------------------------------------

# AI Modules

## ETA Prediction

**Purpose:** Estimate ride arrival time.

**Current Model:** Random Forest Regressor

**Input** - Distance - Hour - Weekday - Traffic

**Output** - Estimated arrival time

Status: Backend completed.

------------------------------------------------------------------------

## Driver Recommendation

**Purpose:** Recommend the most suitable driver.

Current scoring considers: - Driver rating - Acceptance rate - Idle
time - Total completed trips

Status: Completed.

------------------------------------------------------------------------

## Fraud Detection

**Purpose:** Detect suspicious ride requests.

Features: - Distance - Duration - Fare - Driver rating - Passenger
rating - Cancellation rates - GPS jump - Daily rides

Current model: - Random Forest Classifier

Status: Completed.

------------------------------------------------------------------------

## AI Chatbot

Current capabilities: - ETA queries - Driver recommendation - Fraud
checking - General ride assistance

Architecture:

    User
     ↓
    Chatbot
     ↓
    Intent Detection
     ↓
    AI Tools
     ↓
    Response

Backend completed.

------------------------------------------------------------------------

# Frontend

Current framework: - React - Vite - Material UI

Pages: - Home - Login - Register - Dashboard - Ride History

Components: - Navbar - Sidebar - MapView

Status: Under active development.

------------------------------------------------------------------------

# APIs

## Authentication

-   POST /auth/register
-   POST /auth/login

## Drivers

-   GET
-   POST
-   PUT
-   DELETE

## Vehicles

-   GET
-   POST
-   PUT
-   DELETE

## Rides

-   POST /rides/request
-   POST /rides/cancel
-   POST /rides/complete

## AI

-   POST /ai/eta
-   POST /recommendation
-   POST /fraud
-   POST /chatbot

------------------------------------------------------------------------

# How to Run

## Backend

``` bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

# copy the env template and fill in real values
copy .env.example .env

# create/upgrade the SQLite database
alembic upgrade head

# regenerate the ETA model locally (not committed - exceeds GitHub's 100MB limit)
cd ai
python train_eta.py
cd ..

uvicorn app.main:app --reload
```

Swagger:

    http://127.0.0.1:8000/docs

## Frontend

``` bash
cd frontend_final
npm install
npm run dev
```

Frontend:

    http://localhost:5173

------------------------------------------------------------------------

# Current Feature Status

  Feature                        Status
  ------------------------------ --------
  Authentication                 ✅
  JWT                            ✅
  Driver CRUD                    ✅
  Vehicle CRUD                   ✅
  Ride CRUD                      ✅
  ETA Prediction                 ✅
  Driver Recommendation          ✅
  Fraud Detection                ✅
  AI Chatbot Backend             ✅
  React Setup                    ✅
  Material UI                    ✅
  OpenStreetMap                  🟡
  Route Drawing                  🟡
  Frontend-Backend Integration   🟡
  Live Tracking                  ❌
  Payments                       ❌

------------------------------------------------------------------------

# Future Improvements

## AI

-   XGBoost/LightGBM ETA models
-   Reinforcement Learning driver recommendation
-   Deep anomaly detection for fraud
-   RAG-enabled chatbot with memory
-   Voice assistant

## Frontend

-   Live ride tracking
-   Interactive routing
-   Responsive mobile UI
-   Progressive Web App
-   Dark/Light mode

## Backend

-   PostgreSQL
-   Redis
-   Celery
-   Docker
-   Kubernetes
-   Nginx

## Security

-   OAuth2
-   Google Login
-   RBAC
-   Rate limiting
-   Audit logging

## Scalability

-   Microservices
-   RabbitMQ/Kafka
-   WebSockets
-   Cloud deployment
-   CI/CD

------------------------------------------------------------------------

# Development Roadmap

## Phase 1 ✅

-   Backend
-   Database
-   Authentication
-   CRUD APIs

## Phase 2 ✅

-   ETA Prediction
-   Driver Recommendation
-   Fraud Detection
-   Chatbot Backend

## Phase 3 🟡

-   React Frontend
-   Material UI
-   Map Integration
-   Backend Integration

## Phase 4

-   Real-time Tracking
-   Notifications
-   Payments
-   Driver Dashboard

## Phase 5

-   Production Deployment
-   Monitoring
-   Cloud Infrastructure

------------------------------------------------------------------------

# Conclusion

SmartRideAI is a modular AI-powered ride-sharing platform combining
modern web development with practical machine learning. The backend is
largely complete and supports authentication, ride management, and
multiple AI services. The frontend foundation has been established and
is being integrated with the backend. The architecture is designed for
future expansion toward production-scale intelligent transportation
systems.
