from pydantic import BaseModel
from typing import Optional

# class UserCreate(BaseModel):
#     full_name: str  # Change 'fullname' to 'full_name'
#     email: str
#     password: str | None
#     phone_num: str
#     state: str

class UserCreate(BaseModel):
    full_name: str
    email: str
    password: Optional[str] = None
    phone_num: Optional[str] = None
    state: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    full_name: str
    email: str
    phone_num: str
    state: str
    isAdmin: bool
    class Config:
        orm_mode = True


# class LoginSchema(BaseModel):
#     email: str
#     password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str | None = None

class LoginResponse(BaseModel):
    message: str
    token: Token
    user: UserResponse


class GoogleUserResponse(BaseModel):
    full_name: str
    email: str
    phone_num: str
    state: str
    isAdmin: bool
    class Config:
        orm_mode = True


class UserSignup(BaseModel):
    full_name: str
    email: str
    # password: str = None  # password can be null for Google signup
    phone_num: str
    state: str