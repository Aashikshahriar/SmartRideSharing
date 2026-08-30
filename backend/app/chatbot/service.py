from app.chatbot.prompts import SYSTEM_PROMPT

from app.chatbot.llm import ChatLLM

from app.chatbot.tools import ChatTools


class ChatbotService:

    def __init__(self):

        self.llm = ChatLLM()

    def chat(

        self,

        message,

        db=None,

    ):

        msg = message.lower()

        ###################################################

        if "eta" in msg:

            eta = ChatTools.eta(8)

            return f"Estimated arrival time is {eta:.1f} minutes."

        ###################################################

        if "fraud" in msg:

            result = ChatTools.fraud()

            if result["fraud"]:

                return f"⚠ Fraud Detected (Risk Score {result['risk_score']})"

            return f"Ride appears normal (Risk Score {result['risk_score']})"

        ###################################################

        if (

            "driver" in msg

            or

            "recommend" in msg

        ):

            if db is None:

                return "Database unavailable."

            recommendation = ChatTools.recommend(

                db,

                23.8103,

                90.4125,

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

            SYSTEM_PROMPT,

            message,

        )


chatbot = ChatbotService()