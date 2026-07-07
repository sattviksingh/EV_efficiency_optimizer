from fastapi import APIRouter

from ..schemas import (
    PredictionRequest,
    PredictionResponse,
)
from ..services.efficiency_service import EfficiencyService

router = APIRouter(
    prefix="/predict",
    tags=["AI Prediction"]
)


@router.post("/", response_model=PredictionResponse)
def predict(request: PredictionRequest):

    result = EfficiencyService.predict(
        request.model_dump()
    )

    return result