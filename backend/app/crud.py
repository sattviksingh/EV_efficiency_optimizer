from sqlalchemy.orm import Session

from . import models
from .services.efficiency_service import EfficiencyService


def create_trip(db: Session, trip):

    data = trip.model_dump()

    efficiency = EfficiencyService.calculate_efficiency(
        data["distance"],
        data["energy_consumed"]
    )

    data["efficiency_score"] = efficiency

    db_trip = models.Trip(**data)

    db.add(db_trip)

    db.commit()

    db.refresh(db_trip)

    return db_trip


def get_trips(db: Session):
    return db.query(models.Trip).all()