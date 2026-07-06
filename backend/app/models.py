from sqlalchemy import Column, Integer, Float, String, DateTime
from datetime import datetime

from .database import Base


class Trip(Base):
    __tablename__ = "trips"

    id = Column(Integer, primary_key=True, index=True)

    driver = Column(String, nullable=False)

    vehicle_model = Column(String, nullable=False)

    start_battery = Column(Float, nullable=False)

    end_battery = Column(Float, nullable=False)

    distance = Column(Float, nullable=False)

    average_speed = Column(Float, nullable=False)

    temperature = Column(Float, nullable=False)

    traffic_level = Column(String, nullable=False)

    energy_consumed = Column(Float, nullable=False)

    efficiency_score = Column(Float, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)