from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    """
    Base class for SQLAlchemy models. All models should inherit from this class to ensure they are registered with the SQLAlchemy ORM.
    """
    pass