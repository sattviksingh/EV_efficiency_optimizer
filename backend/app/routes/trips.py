from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from .. import crud, schemas

router = APIRouter(prefix="/trips", tags=["Trips"])


@router.post("/", response_model=schemas.TripResponse)
def create_trip(trip: schemas.TripCreate, db: Session = Depends(get_db)):
    return crud.create_trip(db, trip)


@router.get("/", response_model=list[schemas.TripResponse])
def get_all_trips(db: Session = Depends(get_db)):
    return crud.get_trips(db)