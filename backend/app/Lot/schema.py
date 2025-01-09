from pydantic import BaseModel
from datetime import datetime

class LotCreate(BaseModel):
    name: str
    capacity: int
    location: str
    # created: str
    # last_updated: str


class LotResponse(BaseModel):
    id: int
    name: str
    capacity: int
    location: str
    created: datetime  # Change to datetime
    last_updated: datetime  # Change to datetime

    class Config:
        orm_mode = True