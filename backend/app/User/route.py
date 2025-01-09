from fastapi import (
    APIRouter,
    Depends,
    Request,
    HTTPException,
    status,
    Response,
    Cookie,
    Query,
)
from sqlalchemy.orm import Session
from app.User.services import (
    create_user,
    login_user,
    get_all_users,
    get_one_user,
    updating_user,
    google_auth,
    # google_signup,
    # register_google
)
from app.User.schema import UserCreate, UserResponse, LoginResponse, UserSignup
from app.core.database import get_db
from fastapi.security import OAuth2PasswordRequestForm
from app.dependencies.auth import is_admin
from app.utils.jwt_utils import is_authenticated
from typing import List, Dict

from google.auth.transport import requests
from google.oauth2 import id_token

# from app.services.auth_services import login_user

router = APIRouter()


@router.post("/register", tags=["Registration"])
async def add_user(user: UserCreate, db: Session = Depends(get_db)):
    print(f"User from routes: {user}, Type: {type(user)}")
    print(f"DB from routes: {db}, Type: {type(db)}")
    return await create_user(user, db)


@router.post("/login", tags=["Authentication"], response_model=LoginResponse)
def login(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    return login_user(db, form_data.username, form_data.password, response)


# @router.post("/auth/google", tags=["Authentication"])
# def google_auth(user: UserCreate, db: Session = Depends(get_db)):
#     return google_auth(user, db)


@router.get("/admin/dashboard")
def admin_dashboard(user: dict = Depends(is_admin)):
    return {"message": "Welcome to the admin dashboard!", "user": user}


@router.get("/profile")
def user_profile(user: dict = Depends(is_authenticated)):
    return {"message": "Welcome to your profile!", "user": user}


@router.get("/admin/users", tags=["Admin"], response_model=List[UserResponse])
def read_users(db: Session = Depends(get_db)):
    return get_all_users(db)


@router.get("/admin/user/{user_id}", tags=["Admin"], response_model=List[UserResponse])
def read_users(user_id: int, db: Session = Depends(get_db)):
    return get_one_user(user_id, db)


@router.get("/all", tags=["Admin"], response_model=List[UserResponse])
def all_user(db: Session = Depends(get_db)):
    return get_all_users(db)


@router.patch("/{user_id}/update", tags=["Admin"])
def update_user(user_id: int, user: UserCreate, db: Session = Depends(get_db)):
    return updating_user(user_id, user, db)


# @router.post("/login", tags=["Authentication"])
# def login(
#     response: Response,
#     request: Request,
#     form_data: OAuth2PasswordRequestForm = Depends(),
#     db: Session = Depends(get_db)
# ):
#     return login_user(db, form_data.username, form_data.password, response, request)


@router.get("/me")
async def user_me(request: Request):
    # get_user(request)
    print(request)
    # user = request.state.user
    # print(user)
    # if not user:
    #     raise HTTPException(
    #         status_code=status.HTTP_401_UNAUTHORIZED,
    #         detail="Authentication required",
    #     )
    return {"message": "User details retrieved successfully", "user": request}


@router.get("/check-cookie")
def check_cookie(access_token: str = Cookie(None)):
    if access_token:
        return {"message": "Cookie is set", "access_token": access_token}
    return {"message": "No cookie set"}



# @router.post("/google-signup", tags=["Authentication"], response_model=UserResponse)
# def signup_google(token: str, phone_num:str, state: str, db: Session = Depends(get_db)):
#     return google_signup(token, phone_num, state, db)


# @router.post("/google-signup", tags=["Authentication"], response_model=UserResponse)
# def signup_google(token: str, phone_num: str, state: str, db: Session = Depends(get_db)):
#     return google_signup(token, phone_num, state, db)


# CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"


# test_token = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg5Y2UzNTk4YzQ3M2FmMWJkYTRiZmY5NWU2Yzg3MzY0NTAyMDZmYmEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4NDkwMjMyNDc4OTAtNDQyMDhjZzV2MzNsamFrMTRhamRoMXQ1cnIxdTBxdjcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4NDkwMjMyNDc4OTAtNDQyMDhjZzV2MzNsamFrMTRhamRoMXQ1cnIxdTBxdjcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDE4MTkzNjc3MTQxMjc3NTQ5ODYiLCJlbWFpbCI6ImdoYXNuYWluNjY4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYmYiOjE3MzYzMTMwMjYsIm5hbWUiOiJHaHVsYW0gSGFzbmFpbiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJa29zOHktakw3NmZwSWdwVTkzUjVFak1MY3liSkpZTXl6UDNoSWRYd3EwY0l6QWR3PXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkdodWxhbSIsImZhbWlseV9uYW1lIjoiSGFzbmFpbiIsImlhdCI6MTczNjMxMzMyNiwiZXhwIjoxNzM2MzE2OTI2LCJqdGkiOiIxMWZjMDNmZjRkODg1YmE3ZTc3NmFkNjI4MzRmODdkZDI4YmUwNDk4In0.bxSZY8tLCauyEOvX9dCmytrAjOxab_rLRxDB1FAa6svS6yVyIZtqFSfXiG5tVchVzetrgOpVnzbnDbAPXh2uWuQbW3wrEsY00yCTSFLF2XEREcCLj2AAk_hvF6her7xhf3V5dMDMaRM35DmKVrBOx_381hTvcHVSsY_Ve31U-yfh_Rt8XAT0sQLyaEp-l8MTq_55Mzs-GwFkF8YbZB8trAVNjVqi9daK_JXdCoVXoRXq0tEhohsyhsSltRA7DtRq6JN622A98vMj2ogPeKll2MLYE3SaCUxOxgf9rVj5JTLFBNIFqBvxBEdppiAH7YOFvrGzkvjfmikxGYZ_CZM0xg"





# @router.post("/signup/google", tags=["Authentication"])
# async def sigup_google(token: str = Query(...), phone_num: str = Query(...), state: str = Query(...), db: Session=Depends(get_db)):
#     return await register_google(token, phone_num, state, db)







# @router.post("/google/signup", tags=["Authentication"])
# async def google_signup(user: UserCreate, response: Response, db: Session = Depends(get_db)):
#     return await google_auth(user, response, db)

@router.post("/google/signup", tags=["Authentication"])
async def google_signup(user: UserSignup,db: Session = Depends(get_db)):
    print("Validated user data:", user)  # Log validated data
    return await google_auth(user, db)

# @router.post("/google-signup", tags=["Authentication"])
# async def google_signup(
#     token: str = Query(...), phone_num: str = Query(...), state: str = Query(...)
# ):
#     try:
#         # Verify the token
#         test_token = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg5Y2UzNTk4YzQ3M2FmMWJkYTRiZmY5NWU2Yzg3MzY0NTAyMDZmYmEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4NDkwMjMyNDc4OTAtNDQyMDhjZzV2MzNsamFrMTRhamRoMXQ1cnIxdTBxdjcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4NDkwMjMyNDc4OTAtNDQyMDhjZzV2MzNsamFrMTRhamRoMXQ1cnIxdTBxdjcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDE4MTkzNjc3MTQxMjc3NTQ5ODYiLCJlbWFpbCI6ImdoYXNuYWluNjY4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYmYiOjE3MzYzMTgzODYsIm5hbWUiOiJHaHVsYW0gSGFzbmFpbiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJa29zOHktakw3NmZwSWdwVTkzUjVFak1MY3liSkpZTXl6UDNoSWRYd3EwY0l6QWR3PXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkdodWxhbSIsImZhbWlseV9uYW1lIjoiSGFzbmFpbiIsImlhdCI6MTczNjMxODY4NiwiZXhwIjoxNzM2MzIyMjg2LCJqdGkiOiI2ZGE1ZmQ5MzA5NmFlYzdjZjFhNDhmNWVkNTI5MDRiOTllOWY1MjNkIn0.kl9Ek4KUPNPY0j4M7McHjktaJaMF0JNqsTYixakvPEkjEDNVVV0jMxizHHCR6ZMctLw3AIV6LNWDBGpfeuwzE0VNv5ggPsJ7OGGPY857_Z5UHXXpSG1nEh1eCkLb1Cswdm8YSEvHJ3V2glzIKN0p9xGSxNeN0TJmdK0EpOyzMcWOaLZAgkmGg6N1EVPt6NRdbaZYRhKmZ77-oqdh7oeDQcw2bnLZGFHceRRqmzYafMwmTslpP3l3dmlj7Bx8mp2BWkn7PF-C8E3MFM1loEfcR0a6c6FD0DCw_wl4zyEt8bkT0RvTBLhcmtHjzG6dvq5i7KBlii8zrmcaFzqmEbk0NQ"
#         print(token)
#         print(test_token)
#         # idinfo = id_token.verify_oauth2_token(test_token, requests.Request(), CLIENT_ID)
#         idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)

#         # Ensure the token is issued by Google
#         if idinfo["iss"] not in ["accounts.google.com", "https://accounts.google.com"]:
#             raise HTTPException(
#                 status_code=401, detail=f"Invalid token issuer {token}."
#             )

#         # Extract user details
#         user_info = {
#             "user_id": idinfo["sub"],  # Google user ID
#             "email": idinfo["email"],
#             "name": idinfo.get("name"),
#             "picture": idinfo.get("picture"),
#         }

#         # Log or use the user_info as needed
#         print(f"Verified user: {user_info}")

#         return {
#             "message": "Google signup successful",
#             "user_info": user_info,
#             "phone_num": phone_num,
#             "state": state,
#         }

#     except ValueError as e:
#         raise HTTPException(
#             status_code=400,
#             detail=f"Error during Google authentication: {str(e), test_token} ",
#         )
