from app.repositories.driver_repository import (
    get_online_drivers,
)

from app.algorithms.haversine import haversine

from app.algorithms.recommendations import (
    calculate_score,
)


def recommend_driver(
    db,
    pickup_lat,
    pickup_lon,
):

    drivers = get_online_drivers(db)

    if len(drivers) == 0:
        return None

    recommendations = []

    for driver in drivers:

        distance = haversine(

            pickup_lat,

            pickup_lon,

            driver.current_lat,

            driver.current_lon,

        )

        score = calculate_score(
            driver,
            distance,
        )

        recommendations.append(

            {

                "driver": driver,

                "score": score,

                "distance": distance,

            }

        )

    recommendations.sort(

        key=lambda x: x["score"],

        reverse=True,

    )

    return recommendations[0]