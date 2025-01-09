import jwt
from datetime import datetime, timedelta, timezone
from jwt import PyJWTError
from fastapi import HTTPException, status, Request, Cookie
from typing import Optional
from google.auth.transport import requests
from google.oauth2 import id_token
from dotenv import load_dotenv
import os


load_dotenv()

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
clientId = os.getenv("CLIENT_ID")



# CLIENT_ID = clientId

# def verify_google_token(token):
#     try:
#         idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
        
#         if idinfo["iss"] not in ["accounts.google.com", "https://accounts.google.com"]:
#             raise HTTPException(status_code=401, detail="Invalid token issuer.")
        
#         user_info = {
#             "user_id": idinfo["sub"],
#             "email": idinfo["email"],
#             "name": idinfo.get("name"),
#             "picture": idinfo.get("picture"),
#         }
#         return user_info
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error verifying token: {str(e)}")

def create_token(email: str, is_admin: bool) -> str:
    payload = {
        "sub": email,
        "isAdmin": is_admin,
        "exp": datetime.now() + timedelta(hours=1),
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token


def is_authenticated(request: Request) -> dict:
    # Extract token from Authorization header
    auth_header = request.headers.get("Authorization")
    
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Access denied. No token provided."
        )
    
    
    token = auth_header.split(" ")[1]  # Extract the token
    print(token)
    
    try:
        # Decode and verify the token
        print(token)
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print(payload)
        return payload  # Return decoded payload (e.g., user info)
    
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Token has expired."
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid token."
        )


# def verify_google_token(token: str):
#     try:
#         # Replace with your Google OAuth client ID
#         # GOOGLE_CLIENT_ID = "ID"
#         payload = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)
#         # payload = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)
#         print(payload)
#         return payload  
#     except ValueError as e:
#         return None



# class TokenData(BaseModel):
#     token: str

# def verify_google_token(token: str):
#     # Fetch Google public keys
#     # certs_response = requests.get(GOOGLE_CERTS_URL)
#     certs_response = requests.get
#     if certs_response.status_code != 200:
#         raise HTTPException(status_code=500, detail="Unable to fetch Google public keys.")
    
#     certs = certs_response.json()
    
#     # Decode and validate token
#     try:
#         decoded_token = jwt.decode(
#             token,
#             certs,
#             algorithms=["RS256"],
#             audience=CLIENT_ID,
#             issuer=GOOGLE_ISSUER
#         )
#         return decoded_token
#     except jwt.ExpiredSignatureError:
#         raise HTTPException(status_code=401, detail="Token has expired.")
#     except jwt.JWTClaimsError:
#         raise HTTPException(status_code=401, detail="Invalid claims. Check the audience and issuer.")
#     except Exception as e:
#         raise HTTPException(status_code=401, detail=f"Token verification failed: {str(e)}")