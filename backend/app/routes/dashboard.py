from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from ..database import get_db
from ..models import Trip

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/")
def get_dashboard(db: Session = Depends(get_db)):

    total_trips = db.query(Trip).count()

    total_distance = (
        db.query(func.sum(Trip.distance)).scalar() or 0
    )

    average_speed = (
        db.query(func.avg(Trip.average_speed)).scalar() or 0
    )

    average_efficiency = (
        db.query(func.avg(Trip.efficiency_score)).scalar() or 0
    )

    return {
        "total_trips": total_trips,
        "total_distance": round(total_distance, 2),
        "average_speed": round(average_speed, 2),
        "average_efficiency": round(average_efficiency, 2)
    }