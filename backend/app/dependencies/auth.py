# from fastapi import Depends, HTTPException, Request, status
# from app.utils.jwt_utils import decode_access_token

# async def get_current_user(request: Request):
#     token = request.cookies.get("access_token")
#     if not token:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Authentication token is missing.",
#         )

#     try:
#         # Decode the token
#         user = decode_access_token(token)
#         return user
#     except Exception:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Invalid or expired token.",
#         )


# async def admin_only(user: dict = Depends(get_current_user)):
#     if user.get("role") != "admin":
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="Admin access required.",
#         )
#     return user


from fastapi import Depends, HTTPException
from app.utils.jwt_utils import is_authenticated

def is_admin(user: dict = Depends(is_authenticated)) -> dict:
    if not user.get("isAdmin"):
        raise HTTPException(status_code=403, detail="Forbidden: Admins only")
    return user  # Return the user for further use if needed
