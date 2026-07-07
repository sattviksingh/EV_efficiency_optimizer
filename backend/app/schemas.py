from pydantic import BaseModel


# -----------------------------
# Trip Schemas
# -----------------------------

class TripCreate(BaseModel):
    driver: str
    distance: float
    battery: float
    speed: float
    efficiency: float


class TripResponse(TripCreate):
    id: int

    class Config:
        from_attributes = True


# -----------------------------
# AI Prediction Schema
# -----------------------------

class PredictionRequest(BaseModel):
    battery: float
    distance: float
    speed: float
    temperature: float
    traffic: str


# -----------------------------
# AI Prediction Response
# -----------------------------

class PredictionResponse(BaseModel):
    predicted_range: float
    battery_usage: float
    efficiency_score: float
    driving_score: int
    recommendation: str