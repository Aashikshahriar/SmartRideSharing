from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ------------------------
# API Routers
# ------------------------
from app.api.auth import router as auth_router
from app.api.drivers import router as driver_router
from app.api.users import router as user_router
from app.api.vehicles import router as vehicle_router
from app.api.rides import router as ride_router
from app.api.ai import router as ai_router
from app.api.recommendation import (
    router as recommendation_router,
)
from app.api.fraud import (
    router as fraud_router,
)
from app.api.chatbot import (
    router as chatbot_router,
)


# ------------------------
# Import models for Alembic
# (Do NOT remove)
# ------------------------
import app.models.user
import app.models.driver
import app.models.vehicle
import app.models.ride



app = FastAPI(
    title="SmartRideAI API",
    version="1.0.0",
    description="AI-Powered Ride Sharing Backend",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ------------------------
# CORS (allow the Vite dev frontend to call this API)
# ------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------
# Register Routers
# ------------------------
app.include_router(auth_router)
app.include_router(user_router)
app.include_router(driver_router)
app.include_router(vehicle_router)
app.include_router(ride_router)
app.include_router(ai_router)
app.include_router(fraud_router)
app.include_router(
    recommendation_router
)
app.include_router(
    chatbot_router
)

# ------------------------
# Root
# ------------------------
@app.get("/", tags=["Root"])
def root():
    return {
        "application": "SmartRideAI",
        "version": "1.0.0",
        "status": "Running",
        "docs": "/docs"
    }


# ------------------------
# Health Check
# ------------------------
@app.get("/health", tags=["Health"])
def health():
    return {
        "status": "healthy"
    }