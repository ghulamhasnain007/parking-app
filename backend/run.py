import uvicorn
# from app.core.database import init_db


if __name__ == "__main__":
    # init_db()  # Initialize the database tables
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)



# from app.core.database import init_db, Base, engine

# def create_tables():
#     Base.metadata.create_all(bind=engine)