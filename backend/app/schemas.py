from datetime import datetime

from pydantic import BaseModel, ConfigDict


class TripCreate(BaseModel):
    driver: str
    vehicle_model: str
    start_battery: float
    end_battery: float
    distance: float
    average_speed: float
    temperature: float
    traffic_level: str
    energy_consumed: float


class TripResponse(TripCreate):
    id: int
    efficiency_score: float | None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class PredictionRequest(BaseModel):
    battery: float
    distance: float
    speed: float
    temperature: float
    traffic: str


class PredictionResponse(BaseModel):
    predicted_range: float
    battery_usage: float
    efficiency_score: float
    recommendation: str