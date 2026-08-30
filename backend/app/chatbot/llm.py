import ollama


class ChatLLM:

    def __init__(self):

        self.model = "qwen3:8b"
        # change if using llama3.2

    def generate(

        self,

        system,

        prompt,

    ):

        try:

            response = ollama.chat(

                model=self.model,

                messages=[

                    {

                        "role": "system",

                        "content": system,

                    },

                    {

                        "role": "user",

                        "content": prompt,

                    },

                ],

            )

            return response["message"]["content"]

        except Exception:

            return (
                "Sorry, the AI assistant is currently unavailable. "
                "Try asking about ETA, fraud, or driver recommendations."
            )