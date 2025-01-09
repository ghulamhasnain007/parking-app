# from pydantic import BaseModel
# import datetime

# class BookingCreate(BaseModel):
#     customer_id: int
#     lot_id: int
#     space_id: int
#     start_time: datetime
#     end_time: datetime
#     status: int

# class BookingResponse(BaseModel):
#     customer_id: int
#     lot_id: int
#     space_id: int
#     start_time: datetime
#     end_time: datetime
#     status: int
#     class Config:
#         orm_mode = True
    
from pydantic import BaseModel, ConfigDict
from typing import Optional
import datetime

class BookingCreate(BaseModel):
    customer_id: int
    lot_id: int
    # space_id: int
    start_time: datetime.datetime  # Use datetime.datetime
    end_time: datetime.datetime  # Use datetime.datetime
    # status: str

class BookingResponse(BaseModel):
    id: int
    customer_id: int
    lot_id: int
    space_id: int
    start_time: datetime.datetime  # Use datetime.datetime
    end_time: datetime.datetime  # Use datetime.datetime
    status: str


class BookingCreateResponse(BaseModel):
    message: str
    booking: BookingResponse
    
    model_config = ConfigDict(from_attributes=True)  # Updated for Pydantic V2


class TicketCreate(BaseModel):
    id : int
    booking_id : int
    status : str
    start_time : datetime.datetime
    end_time : datetime.datetime


class TicketResponse(BaseModel):
    id : int
    booking_id : int
    status : str
    start_time : datetime.datetime
    end_time: Optional[datetime.datetime]  # Mark as optional

