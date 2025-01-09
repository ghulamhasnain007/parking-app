from sqlalchemy import Column, Integer, String, Boolean, DateTime
from app.core.database import Base
from datetime import datetime

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    full_name = Column(String(100), index=True)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(100), nullable=True)
    phone_num = Column(String(20), unique=True, nullable=False)
    state = Column(String(100), nullable=False)
    created_at = Column(DateTime, default=datetime.now, nullable=False)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)
    isAdmin = Column(Boolean, default=False)
    deleted = Column(Boolean, default=False)



# class Admin(Base):
#     __tablename__ = 'admin'

#     admin_id = Column(Integer, primary_key=True, autoincrement=True , index=True)
#     full_name = Column(String(100), index=True)
#     email = Column(String(255), unique=True, nullable=False)
#     password = Column(String(100), unique=True)
#     phone_num = Column(String(20), unique=True, nullable=False)
#     address = Column(String(200), nullable=False)
#     created_at = Column(DateTime, default=datetime.now, nullable=False)
#     updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)
    