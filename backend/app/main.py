# # app/main.py
# from fastapi import FastAPI

# # Create an instance of the FastAPI class
# app = FastAPI()

# # Define a root endpoint
# @app.get("/")
# def read_root():
#     return {"message": "Welcome to the FastAPI app!"}

# # Define a dynamic endpoint
# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: str = None):
#     return {"item_id": item_id, "query": q}

# # Define a POST endpoint
# @app.post("/items/")
# def create_item(item: dict):
#     return {"item": item}


from fastapi import FastAPI

from app.User.route import router as user_route
from app.Lot.routes import router as lot_routes
from app.Booking.routes import router as booking_routes
from app.Space.routes import router as space_routes
from fastapi.middleware.cors import CORSMiddleware
# from app.routes.admin_routes import router as admin_route

app = FastAPI()


# origins = [
#     "http://localhost.tiangolo.com",
#     "https://localhost.tiangolo.com",
#     "http://localhost",
#     "http://localhost:8080",
#     "http://localhost:3000",
#     "http://localhost:5173"
# ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_route, prefix="/api/user")
app.include_router(lot_routes, prefix="/api/lot")
app.include_router(booking_routes, prefix="/api/booking")
app.include_router(space_routes, prefix='/api/space')

# app.include_router(admin_route, prefix="/api/admin")

