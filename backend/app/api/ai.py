from datetime import datetime

from fastapi import APIRouter

from app.schemas.eta import (

    ETARequest,

    ETAResponse,

)

from app.ai.eta_service import (

    predict_eta,

)

router = APIRouter(

    prefix="/ai",

    tags=["Artificial Intelligence"],

)


@router.post(

    "/eta",

    response_model=ETAResponse,

)

def eta(

    req: ETARequest,

):

    now = datetime.now()

    result = predict_eta(

        req.distance,

        now.hour,

        now.weekday(),

        req.traffic,

    )

    return {

        "eta_minutes":result

    }