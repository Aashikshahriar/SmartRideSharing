from app.database.connection import SessionLocal
from app.models.user import User

db = SessionLocal()

users = db.query(User).all()

for user in users:
    print(user.id)
    print(user.name)
    print(user.email)
    print(user.phone)
    print(user.role)
    print("-------------------")

db.close()