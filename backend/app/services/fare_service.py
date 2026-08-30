from math import radians
from math import sin
from math import cos
from math import sqrt
from math import atan2


EARTH_RADIUS = 6371


def haversine(
    lat1,
    lon1,
    lat2,
    lon2,
):

    dlat = radians(lat2 - lat1)

    dlon = radians(lon2 - lon1)

    a = (
        sin(dlat / 2) ** 2
        +
        cos(radians(lat1))
        * cos(radians(lat2))
        * sin(dlon / 2) ** 2
    )

    c = 2 * atan2(
        sqrt(a),
        sqrt(1 - a)
    )

    return EARTH_RADIUS * c


def estimate_fare(distance):

    base = 60

    per_km = 18

    return round(
        base + distance * per_km,
        2
    )


def estimate_duration(distance):

    avg_speed = 22

    return round(
        distance / avg_speed * 60,
        1
    )