from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .routes import trips, dashboard, predict

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="EV Efficiency Optimizer API",
    version="1.0.0",
    description="Backend API for EV Driving Efficiency Optimizer",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://ev-efficiency-optimizer.vercel.app",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(trips.router)
app.include_router(dashboard.router)
app.include_router(predict.router)


@app.get("/")
def root():
    return {
        "message": "Backend Running Successfully 🚗⚡",
        "status": "ok",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
    }