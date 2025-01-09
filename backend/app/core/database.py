# from sqlalchemy import create_engine
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker

# # Use pg8000 as the PostgreSQL driver
# DATABASE_URL = "postgresql+pg8000://testuser:password@localhost:5432/testdb"

# # Create engine using pg8000 as the driver
# engine = create_engine(DATABASE_URL, echo=True)

# print(DATABASE_URL)

# # SessionLocal will be used for creating database sessions
# SessionLocal = sessionmaker(autoflush=False, bind=engine)

# # Base class for models
# Base = declarative_base()
# Base.metadata.create_all(bind=engine)

# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# from sqlalchemy import create_engine
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker

# # Use pg8000 as the PostgreSQL driver
# DATABASE_URL = "postgresql+pg8000://testuser:password@localhost:5432/testdb"

# # Create engine using pg8000 as the driver
# engine = create_engine(DATABASE_URL, echo=True)

# # SessionLocal will be used for creating database sessions
# SessionLocal = sessionmaker(autoflush=False, bind=engine)

# # Base class for models
# Base = declarative_base()

# # Import the models so that SQLAlchemy can discover them
# from app.models.user_models import User  # Ensure that this import is after defining Base

# # Create tables if they do not exist yet
# Base.metadata.create_all(bind=engine)

# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()



from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql+pg8000://testuser:password@localhost:5432/testdb"
# DATABASE_URL="postgresql+pg8000://pgadmin:ABCabc123!@192.168.10.23:7200/new_db"

engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autoflush=False, bind=engine)
Base = declarative_base()

# def init_db():
#     from app.models.user_models import User  # Delayed import to avoid circular dependency
#     from app.models.parkinglot_model import P_LOT # Add ParkingLot model
    
#     Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
