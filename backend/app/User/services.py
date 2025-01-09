from fastapi import HTTPException, status, Depends, Response, Request
from sqlalchemy.orm import Session
from typing import List
from app.User.model import User
from app.User.schema import UserCreate, UserResponse
from app.utils.hash_utils import get_password_hash
from app.services.auth_services import authenticate_user
from app.utils.jwt_utils import create_token, verify_google_token
import traceback
import logging

logging.basicConfig(level=logging.DEBUG)

    
    
async def create_user(user: UserCreate, db: Session):
    try:
        if not user.password:
            raise ValueError("The 'user' object is missing the 'password' attribute.")

        # Create a new user object
        db_user = User(
            full_name=user.full_name,
            email=user.email,
            password= get_password_hash(user.password),
            phone_num=user.phone_num,
            state=user.state,
        )
        
        # Add the user to the database
        db.add(db_user)
        db.commit()
        db.refresh(db_user)

        return db_user
    except Exception as e:
        logging.error(f"Error creating user: {e}")
        print( traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Error While Creating User {e}")
        
        # raise HTTPException(
        #     status_code=500,
        #     detail= f"Error {e}" #{
        #     #    "error": str(e),
        #     #    "message": "Failed to create user: Internal Server Error",
        #     #    "stack_trace": 
        #         #stack_trace ,
        #     #}
        # )
    

# def login_user(db: Session, email: str, password: str, response: Response):
#     try:
#         user = authenticate_user(db, email, password, is_admin=False)
#         # if not user:
#         #     logging.error("Error while authenticating")
#         #     return {"message": "Something went wrong while authenticating"}
#         if not user:
#             raise HTTPException(
#                 status_code=status.HTTP_401_UNAUTHORIZED,
#                 detail="Incorrect username or password",
#                 headers={"WWW-Authenticate": "Bearer"},
#             )
        
#         access_token = create_access_token(data={"sub": user.email})
#         response.set_cookie(
#             key="access_token",
#             value=access_token,
#             httponly=True,  # Prevent JavaScript access
#             # secure=True,    # Use HTTPS
#             samesite="Lax", # Mitigate CSRF
#         )
#         return {"access_token": access_token, "token_type": "bearer", "message": "succesfully login"}
#     except Exception as e:
#         logging.error(f"Error login user: {e}")
#         raise HTTPException(status_code=500, detail=f"{e}: Failed to login user: Internal Server Error")




def login_user(db: Session, email: str, password: str, response: Response):
    try:
        # user = authenticate_user(db, email, password, is_admin=False)
        user = authenticate_user(db, email, password)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # access_token = create_token(data={"sub": user.email})
        access_token = create_token(user.email, user.isAdmin)
        response.set_cookie(
            key="access_token",
            value=access_token,
            # httponly=True,  # Prevent JavaScript access
            # secure=True,    # Use HTTPS
            samesite="Lax", # Mitigate CSRF
        )
        
        # Checking if the cookie is set in the request
        # cookie_value = request.cookies.get("access_token")
        # if not cookie_value:
        #     raise HTTPException(status_code=400, detail="Cookie was not set correctly")

        return {
            "message": "successfully logged in",
            "token": {"access_token": access_token, "token_type": "bearer"},
            "user": user 
            }
    except Exception as e:
        logging.error(f"Error logging in user: {e}")
        raise HTTPException(status_code=500, detail=f"{e}: Failed to log in user: Internal Server Error")




# def get_current_admin(token: str = Depends(oauth2_scheme)):
#     payload = decode_access_token(token)
#     if payload.get("type") != "admin":
#         raise HTTPException(status_code=403, detail="Admin access required")
#     return payload


def get_one_user(uid: int, db: Session) -> List[UserResponse]:
    try:
        users = db.query(User).filter(User.id == uid)
        if not users:
            raise HTTPException(status_code=400, detail="No User Found")
        return [
            UserResponse(
                full_name=user.full_name,
                email=user.email,
                phone_num=user.phone_num,
                state=user.state,
                isAdmin = user.isAdmin
            )
            for user in users
        ]
    except Exception as e:
        logging.error(f"Error fetching a user: {e}")
        raise HTTPException(status_code=500, detail=f"{e}: Failed to fetching a user: Internal Server Error")


def get_all_users(db: Session) -> List[UserResponse]:
    try:
        all_users = db.query(User).filter(User.isAdmin==False).all()
        if not all_users:
            raise HTTPException(status_code=400, detail="No Users Found")
        return [
            UserResponse(
                id = user.id,
                full_name=user.full_name,
                email=user.email,
                phone_num=user.phone_num,
                state=user.state,
                isAdmin=user.isAdmin
            )
            for user in all_users
        ]
    except Exception as e:
        logging.error(f"Error Fetching Users: {e}")
        raise HTTPException(status_code=500, detail=f"{e}: Failed to fetching users: Internal Server Error")




def updating_user(uid:int, user: UserCreate, db: Session):
    try:

        filtered_user = db.query(User).filter(User.id == uid).first()
        if not filtered_user:
            raise HTTPException(status_code=400, detail="No User Found")
        
        filtered_user.full_name = user.full_name,
        filtered_user.email = user.email,
        filtered_user.phone_num = user.phone_num,
        filtered_user.state = user.state

        db.commit()
        db.refresh(filtered_user)

        return filtered_user
    except Exception as e:
        logging.error(f"Error updating user: {e}")
        raise HTTPException(status_code=500, detail=f"{e}: Failed to update user: Internal Server Error")




def get_user(request):
    print(request.state)

    user = request.state
    print(user)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required",
        )
    return {"message": "User details retrieved successfully", "user": user}




# async def google_auth(token: str, db: Session = Depends(get_db), response: Response = None):
# async def google_auth(user, response, db):
async def google_auth(user, db):
    try:
        # Check if user exists
        print(user)
        user_in_db = db.query(User).filter(User.email == user.email).first()  # Use a different variable to avoid name conflict
        if not user_in_db:
            # Create a new user if not already registered
            db_user = User(
                full_name=user.full_name,
                email=user.email,
                password='',  # Assuming no password is required for Google sign-up
                phone_num=user.phone_num,
                state=user.state,
            )
            db.add(db_user)
            db.commit()
            db.refresh(db_user)
        print(db_user)
        # Generate access token
        access_token = create_token(db_user.email, db_user.isAdmin)
        # response.set_cookie(key="access_token", value=access_token, samesite="Lax")

        return {
            "message": "Google authentication successful",
            "token": {"access_token": access_token, "token_type": "bearer"},
            # "user": user_in_db,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error during Google authentication: {e}")



# async def google_auth(user: UserCreate, db):
#     try:
#         # Check if the user already exists (based on the email)
#         existing_user = db.query(User).filter(User.email == user.email).first()
        
#         if existing_user:
#             # If user exists, sign them in (return the user or a token)
#             return {"message": "User signed in successfully", "user": existing_user}
#         else:
#             # If user doesn't exist, create a new user
#             db_user = User(
#                 full_name=user.full_name,
#                 email=user.email,
#                 phone_num=user.phone_num,
#                 state=user.state,
#                 password=None  # No password for Google sign-in
#             )
            
#             # Add the new user to the database
#             db.add(db_user)
#             db.commit()
#             db.refresh(db_user)
            
#             return {"message": "User created successfully", "user": db_user}
    
#     except Exception as e:
#         raise HTTPException(status_code=500, detail="Error processing the request")
    











# async def google_signup(token, phone_num, state, db):
#     try:
#         # Verify Google token
#         payload = await verify_google_token(token)
#         print(payload)
#         if not payload:
#             raise HTTPException(status_code=401, detail="Invalid Google token")

#         # Check if user exists
#         user = db.query(User).filter(User.email == payload["email"]).first()
#         if not user:
#             # Create a new user if not already registered
#             user = create_user(
#                 UserCreate(
#                     full_name=payload.get("name"),
#                     email=payload.get("email"),
#                     phone_num=phone_num,
#                     state=state,
#                 ),
#                 db,
#             )

#         return {user}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error during Google authentication: {e}")





# def google_signup(token, phone_num, state, db):
#     try:
#         # Verify Google token
#         print(token)
#         payload = verify_google_token(token)
#         print(payload)
#         if not payload:
#             raise HTTPException(status_code=401, detail=f"Invalid Google token {token}")

#         # Check if user exists
#         user = db.query(User).filter(User.email == payload["email"]).first()
#         if not user:
#             # Create a new user if not already registered
#             user = create_user(
#                 UserCreate(
#                     full_name=payload.get("name"),
#                     email=payload.get("email"),
#                     password=None,
#                     phone_num=phone_num,
#                     state=state,
#                 ),
#                 db,
#             )

#         # Return user details
#         return {
#             "id": user.id,
#             "full_name": user.full_name,
#             "email": user.email,
#             "phone_num": user.phone_num,
#             "state": user.state,
#             "isAdmin": user.isAdmin,
#         }
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error during Google authentication: {e}")
    



# async def register_google(token, phone_num, state):
#     try:
#         if not token:
#             raise HTTPException(status_code=400, deatil="Please provide a token")
#         print(token)
#         user_info = verify_google_token(token)
#         print(user_info)
#         if not user_info:
#             HTTPException(status_code=500, detail="Wrong while fetching user")
#         print(user_info)
#         # return { user_info }
#         return user_info
#     except Exception as e:
#         HTTPException(status_code=500, detail=f"Internal server Error {user_info}")




# async def register_google(token, phone_num, state, db):
#     try:
#         if not token:
#             raise HTTPException(status_code=400, detail="Please provide a token")
        
#         user_info = verify_google_token(token)
#         if not user_info:
#             raise HTTPException(status_code=500, detail="Error while fetching user info")
        
#         print(user_info)
#         db_user = User(
#             full_name=user_info["name"],
#             email=user_info["email"],
#             password= None,
#             phone_num=phone_num,
#             state=state,
#         )
        
#         # Add the user to the database
#         db.add(db_user)
#         db.commit()
#         db.refresh(db_user)

#         return db_user

#         # return user_info
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Internal server error: {str(e), user_info["name"]}")
    
