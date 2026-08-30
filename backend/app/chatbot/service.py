from app.chatbot.prompts import build_system_prompt

from app.chatbot.llm import ChatLLM

from app.chatbot.tools import ChatTools

from app.repositories.ride_repository import get_active_ride

from app.repositories.driver_repository import get_by_id as get_driver_by_id


def build_context(db, user):

    if db is None or user is None:
        return {}

    context = {
        "user_name": user.name,
        "user_role": user.role,
    }

    active_ride = get_active_ride(db, user.id)

    if active_ride:

        context["ride_id"] = active_ride.id
        context["ride_status"] = active_ride.status
        context["ride_fare"] = active_ride.fare
        context["ride_distance_km"] = active_ride.distance_km
        context["ride_estimated_duration"] = active_ride.estimated_duration

        if active_ride.driver_id:

            driver = get_driver_by_id(db, active_ride.driver_id)

            if driver:
                context["driver_rating"] = driver.rating
                context["driver_total_trips"] = driver.total_trips

    return context


class ChatbotService:

    def __init__(self):

        self.llm = ChatLLM()

    def chat(self, message, db=None, user=None):

        msg = message.lower()

        context = build_context(db, user)

        ###################################################

        if "eta" in msg:

            distance = context.get("ride_distance_km", 8)

            eta = ChatTools.eta(distance)

            return f"Estimated arrival time is {eta:.1f} minutes."

        ###################################################

        if "fraud" in msg or "safe" in msg:

            if "ride_fare" in context:

                result = ChatTools.fraud(
                    trip_distance=context["ride_distance_km"],
                    ride_duration=context["ride_estimated_duration"],
                    fare=context["ride_fare"],
                    driver_rating=context.get("driver_rating", 4.8),
                )

            else:

                result = ChatTools.fraud()

            if result["fraud"]:

                return f"⚠ This ride looks unusual (risk score {result['risk_score']})."

            return f"This ride looks normal (risk score {result['risk_score']})."

        ###################################################

        if "driver" in msg or "recommend" in msg:

            if db is None:

                return "Database unavailable."

            pickup_lat = 23.8103
            pickup_lon = 90.4125

            recommendation = ChatTools.recommend(
                db,
                pickup_lat,
                pickup_lon,
            )

            if recommendation is None:

                return "No driver is currently available."

            driver = recommendation["driver"]

            return (
                f"Recommended Driver #{driver.id}\n"
                f"Rating : {driver.rating}\n"
                f"Score : {recommendation['score']:.2f}"
            )

        ###################################################

        return self.llm.generate(
            build_system_prompt(context),
            message,
        )


chatbot = ChatbotService()
