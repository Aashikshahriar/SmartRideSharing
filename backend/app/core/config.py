from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parents[2]

class Settings(BaseSettings):
    PROJECT_NAME: str
    VERSION: str
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    # Chatbot LLM - any OpenAI-compatible endpoint (Groq, OpenRouter,
    # Together, local Ollama, ...). Unset CHATBOT_API_KEY disables the
    # free-text assistant gracefully; the rule-based tools still work.
    CHATBOT_API_KEY: str | None = None
    CHATBOT_BASE_URL: str = "https://api.groq.com/openai/v1"
    CHATBOT_MODEL: str = "openai/gpt-oss-20b"

    model_config = SettingsConfigDict(
        env_file=BASE_DIR / ".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

settings = Settings()