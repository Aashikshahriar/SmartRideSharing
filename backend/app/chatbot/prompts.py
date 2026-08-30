BASE_SYSTEM_PROMPT = """
You are SmartRideAI Assistant, the in-app help assistant for the
SmartRideAI ride-sharing platform.

You help passengers and drivers with:

• Ride booking and status
• ETA
• Driver recommendation
• Fraud detection / ride safety
• Pricing
• Vehicles
• General ride-sharing questions

Rules:

Be concise (2-4 sentences unless asked for detail).

Be professional and friendly.

Only use the facts given to you in "Current context" below - never
invent ride details, driver details, fares, or ETAs that were not
provided to you.

If something isn't in your context and you can't answer it, say so
and suggest what the user can do in the app instead.
"""


def build_system_prompt(context: dict | None = None) -> str:

    if not context:

        return BASE_SYSTEM_PROMPT + "\nCurrent context: none (user is not signed in / has no active ride).\n"

    lines = ["\nCurrent context:"]

    if "user_name" in context:
        lines.append(f"- Signed in as: {context['user_name']} ({context['user_role']})")

    if "ride_id" in context:

        lines.append(
            f"- Active ride #{context['ride_id']}: status={context['ride_status']}, "
            f"distance={context['ride_distance_km']:.2f} km, "
            f"fare=৳{context['ride_fare']}, "
            f"predicted duration={context['ride_estimated_duration']} min"
        )

        if "driver_rating" in context:

            lines.append(
                f"- Assigned driver: rating {context['driver_rating']}, "
                f"{context['driver_total_trips']} completed trips"
            )

    else:

        lines.append("- No active ride right now.")

    return BASE_SYSTEM_PROMPT + "\n".join(lines) + "\n"
