from math import sqrt


def normalize(value, minimum, maximum):

    if maximum == minimum:
        return 0

    return (value - minimum) / (maximum - minimum)


def distance_score(distance):

    """
    Smaller distance → higher score.
    """

    return max(0, 10 - distance)


def rating_score(driver):

    return driver.rating * 2


def acceptance_score(driver):

    return driver.acceptance_rate * 10


def experience_score(driver):

    return min(
        driver.total_trips / 100,
        10,
    )


def idle_score(driver):

    return min(
        driver.idle_minutes / 6,
        10,
    )


def calculate_score(
    driver,
    distance,
):

    score = (

        distance_score(distance) * 0.35

        +

        rating_score(driver) * 0.30

        +

        acceptance_score(driver) * 0.15

        +

        idle_score(driver) * 0.10

        +

        experience_score(driver) * 0.10

    )

    return round(score, 3)