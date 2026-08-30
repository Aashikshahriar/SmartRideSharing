from openai import OpenAI

from app.core.config import settings


class ChatLLM:

    def __init__(self):

        self.enabled = bool(settings.CHATBOT_API_KEY)

        self.client = None

        if self.enabled:

            self.client = OpenAI(
                api_key=settings.CHATBOT_API_KEY,
                base_url=settings.CHATBOT_BASE_URL,
            )

    def generate(self, system, prompt):

        if not self.enabled:

            return (
                "The free-text assistant isn't configured yet — set "
                "CHATBOT_API_KEY in the backend .env file (see README for "
                "free API key sources). I can still answer ETA, fraud, and "
                "driver recommendation questions in the meantime."
            )

        try:

            response = self.client.chat.completions.create(

                model=settings.CHATBOT_MODEL,

                messages=[
                    {"role": "system", "content": system},
                    {"role": "user", "content": prompt},
                ],

                temperature=0.4,

                max_tokens=400,

            )

            return response.choices[0].message.content

        except Exception:

            return (
                "Sorry, the AI assistant is currently unavailable. "
                "Try asking about ETA, fraud, or driver recommendations."
            )
