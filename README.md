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
checking - Contextual, free-text conversation - General ride
assistance

Architecture:

    User (+ optional JWT)
     ↓
    Chatbot Service
     ↓
    Context Builder (active ride, driver, user role)
     ↓
    Keyword tools (ETA / fraud / recommendation) → fast, deterministic answers
     ↓ (fallback for anything else)
    LLM (any OpenAI-compatible endpoint) with a per-request contextual system prompt
     ↓
    Response

The chatbot talks to any **OpenAI-compatible** chat-completions API via
the `openai` Python SDK, configured purely through environment
variables (`CHATBOT_API_KEY`, `CHATBOT_BASE_URL`, `CHATBOT_MODEL`) — no
provider-specific code. That means Groq, OpenRouter, Together AI,
DeepInfra, Google's OpenAI-compatible endpoint, or a local Ollama
server all work by just changing those three values.

### Setting up a free API key

Pick one, sign up, and paste the key into `backend/.env` as
`CHATBOT_API_KEY`:

  Provider                              Free tier                         Base URL
  -------------------------------------- ---------------------------------- --------------------------------------------------
  **Groq** (recommended)                Generous free tier, very fast      `https://api.groq.com/openai/v1`
  **OpenRouter**                        Several free models (`:free` tag)  `https://openrouter.ai/api/v1`
  **Google Gemini** (OpenAI-compat)     Free tier via AI Studio            `https://generativelanguage.googleapis.com/v1beta/openai/`
  **Ollama** (local, no key needed)     Unlimited, runs on your machine    `http://localhost:11434/v1` (any `CHATBOT_API_KEY` value works)

For Groq: create a free account at console.groq.com, generate an API
key, and check `client.models.list()` (or the console) for the current
free model catalogue — model IDs change over time. This project
defaults to `openai/gpt-oss-20b`.

If `CHATBOT_API_KEY` is left blank, the chatbot degrades gracefully:
the ETA / fraud / driver-recommendation quick-answers still work, and
free-text questions get a friendly "not configured yet" message
instead of an error.

Backend completed.

------------------------------------------------------------------------

# Live Tracking

Once a driver accepts a ride, both sides open a WebSocket connection
to `/ws/rides/{ride_id}?token=<jwt>`:

    Driver app  ──(lat, lng every few seconds)──▶  /ws/rides/{id}  ──▶  Passenger app

-   The driver's browser streams its location via the Geolocation API
    (`watchPosition`), or falls back to a simulated straight-line
    movement from pickup to destination if location access isn't
    available (useful for demos on a desktop browser).
-   The server persists the latest position on the driver's record and
    broadcasts it to everyone else connected to that ride.
-   The passenger's map shows a live 🚗 marker that updates in
    real time.
-   Ride status changes (accepted / completed / cancelled) are picked
    up via lightweight REST polling (every few seconds) rather than
    the socket, keeping the real-time channel dedicated to location
    only.

------------------------------------------------------------------------

# Frontend

Current framework: - React - Vite - Material UI (v9, light theme,
Inter typeface)

Pages: - Home (ride booking + live map) - Login - Register (rider or
driver signup) - Dashboard - Ride History - Driver Panel

Components: - Navbar - Sidebar - MapView - LocationSearch (address
autocomplete) - Chatbot (floating assistant widget)

Status: Functional end-to-end (auth → book a ride → live tracking →
history) for both riders and drivers.

------------------------------------------------------------------------

# APIs

## Authentication

-   POST /auth/register
-   POST /auth/login
-   GET /users/me

## Drivers

-   POST /drivers/register
-   GET /drivers/me
-   PATCH /drivers/status
-   PATCH /drivers/location

## Vehicles

-   POST /vehicles
-   GET /vehicles/me
-   PUT /vehicles
-   DELETE /vehicles

## Rides

-   POST /rides/request
-   GET /rides/history
-   GET /rides/active
-   GET /rides/pending (driver)
-   GET /rides/driver/active (driver)
-   GET /rides/{ride_id}
-   PATCH /rides/{ride_id}/accept (driver)
-   PATCH /rides/{ride_id}/complete (driver)
-   PATCH /rides/{ride_id}/cancel (passenger)

## Live Tracking

-   WS /ws/rides/{ride_id}?token=\<jwt\>

## AI

-   POST /ai/eta
-   POST /recommendation/driver
-   POST /fraud/check
-   POST /chatbot/chat

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
  AI Chatbot (contextual, LLM)   ✅
  React Setup                    ✅
  Material UI                    ✅
  OpenStreetMap                  ✅
  Route Drawing                  ✅
  Frontend-Backend Integration   ✅
  Live Tracking (WebSocket)      ✅
  Driver Panel (onboard/accept)  ✅
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

-   Responsive mobile UI
-   Progressive Web App
-   Vehicle registration UI for drivers
-   Ride cancellation reasons / ratings after a completed ride

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
-   Redis pub/sub for multi-instance WebSocket fan-out
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

## Phase 3 ✅

-   React Frontend
-   Material UI
-   Map Integration
-   Backend Integration

## Phase 4 🟡

-   Real-time Tracking ✅
-   Driver Dashboard ✅
-   Notifications
-   Payments

## Phase 5

-   Production Deployment
-   Monitoring
-   Cloud Infrastructure

------------------------------------------------------------------------

# Conclusion

SmartRideAI is a modular AI-powered ride-sharing platform combining
modern web development with practical machine learning. The backend
and frontend are fully integrated end-to-end: riders and drivers can
register, book or accept rides, see each other's live location on the
map, get an AI-predicted ETA and driver recommendation, run a
fraud-risk check, and talk to a context-aware chatbot. The architecture
is designed for future expansion toward production-scale intelligent
transportation systems.
