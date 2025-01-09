# @app.post("/spaces/{space_id}/book")
# def book_space(space_id: int, customer_id: str, start_time: datetime, end_time: datetime, db: Session = Depends(get_db)):
#     space = db.query(ParkingSpace).filter(ParkingSpace.id == space_id).first()
#     if not space or space.status != SpaceStatus.AVAILABLE:
#         raise HTTPException(status_code=400, detail="Space not available")
    
#     booking = Booking(
#         customer_id=customer_id,
#         lot_id=space.lot_id,
#         space_id=space_id,
#         start_time=start_time,
#         end_time=end_time,
#         status=BookingStatus.PENDING
#     )
#     space.status = SpaceStatus.RESERVED

#     db.add(booking)
#     db.commit()
#     return booking
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.Booking.schema import BookingCreateResponse, BookingCreate, BookingResponse, TicketCreate, TicketResponse
from app.core.database import get_db
from app.Booking.services import book_space, start_parking,end_parking, get_bookings, cancel_ticket
from app.Booking.model import Booking
from typing import List, Dict, Union
router = APIRouter()


@router.post('/space/{space_id}/book', tags=["Booking"], response_model=BookingCreateResponse)
def booking_space(space_id: int, booking: BookingCreate, db: Session = Depends(get_db)):
    try:
        # Call the service function for handling the booking logic
        return book_space(space_id, booking, db)
    except Exception as e:
        # If there's an error, return a 500 Internal Server Error
        raise HTTPException(status_code=500, detail=str(e))


# @router.post('/start/{booking_id}', tags=["Booking"], response_model=Dict[Union[str, TicketResponse]])
@router.post('/start/{booking_id}', tags=["Booking"], response_model=TicketResponse)
def booking_start(booking_id: int, db: Session=Depends(get_db)):
    return start_parking(booking_id, db)

@router.post('/end/{booking_id}', tags=["Booking"])
def booking_end(booking_id: int, db: Session=Depends(get_db)):
    return end_parking(booking_id, db)

@router.get("/admin/bookings", tags=["Admin"], response_model=List[BookingResponse])
def get_all_bookings(db: Session = Depends(get_db)):
    return get_bookings(db)


@router.post("/admin/{booking_id}/cancel", tags=["Admin"])
def booking_cancel(booking_id :int, db: Session = Depends(get_db)):
    return cancel_ticket(booking_id, db)