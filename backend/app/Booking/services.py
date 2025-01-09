from fastapi import HTTPException
from sqlalchemy.orm import Session
# from app.models import Booking, P_Space, SpaceStatus, BookingStatus
from app.Booking.model import Booking, BookingStatus, Ticket, TicketStatus
from app.Space.model import SpaceStatus, P_Space
from app.Booking.schema import BookingResponse, TicketCreate, TicketResponse
from typing import List, Dict
import datetime
import logging


def book_space(space_id: int, booking, db: Session):
    try:
        if not space_id:
            raise HTTPException(status_code=404, detail="Please provide space id")
        
        # Check if the space exists and is not deleted
        space = db.query(P_Space).filter(
            P_Space.space_id == space_id, 
            P_Space.deleted == False
        ).first()
        
        if not space:
            raise HTTPException(status_code=404, detail="Space does not exist")
        
        # Check if the space is available for the given time period
        overlapping_booking = db.query(Booking).filter(
            Booking.space_id == space_id,
            Booking.end_time > booking.start_time,  # Overlaps with the requested time
            Booking.start_time < booking.end_time  # Overlaps with the requested time
        ).first()

        if overlapping_booking:
            raise HTTPException(
                status_code=400, 
                detail="Space is already reserved for the requested time period"
            )
        
        # Validate that start_time is earlier than end_time
        if booking.start_time >= booking.end_time:
            raise HTTPException(
                status_code=400, 
                detail="Start time must be earlier than end time"
            )
        
        # Create the booking entry
        booking_entry = Booking(
            customer_id=booking.customer_id,
            lot_id=space.lot_id,
            space_id=space.space_id,
            start_time=booking.start_time,
            end_time=booking.end_time,
            status=BookingStatus.PENDING  # Or directly CONFIRMED if needed
        )
        
        # Update the space status to RESERVED
        space.status = SpaceStatus.RESERVED
        db.add(booking_entry)
        db.commit()
        db.refresh(booking_entry)  # Refresh the object after commit

        return {
            "message": "Space booked successfully for the given time period",
            "booking": booking_entry
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {e}")


# @app.post("/bookings/{booking_id}/start")
def start_parking(booking_id: int, db):
    try:

        booking = db.query(Booking).filter(Booking.id == booking_id).first()
        print(booking)
        if not booking or booking.status != BookingStatus.PENDING:
            raise HTTPException(status_code=400, detail="Invalid booking")
        
        ticket = Ticket(
            booking_id=booking_id,
            status=TicketStatus.ACTIVE,
            start_time=datetime.datetime.now(),
            end_time=None
        )
        booking.status = BookingStatus.ACTIVE

        db.add(ticket)
        db.commit()
        return ticket
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Something went wrong: {e}")

    

# @app.post("/bookings/{booking_id}/end")
def end_parking(booking_id: int, db):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    ticket = db.query(Ticket).filter(Ticket.booking_id == booking_id).first()

    if not booking or booking.status != BookingStatus.ACTIVE or not ticket:
        raise HTTPException(status_code=400, detail="Invalid session")

    ticket.status = TicketStatus.COMPLETED
    ticket.end_time = datetime.datetime.now()
    booking.status = BookingStatus.COMPLETED

    space = db.query(P_Space).filter(P_Space.space_id == booking.space_id).first()
    if space:
        space.status = SpaceStatus.AVAILABLE

    db.commit()
    return {"message": "Session ended"}

def get_bookings(db) -> List[BookingResponse]:
    try:
        all_bookings = db.query(Booking).all()
        if not all_bookings:
            return []

        return [
            BookingResponse(
                id=booking.id,
                customer_id=booking.customer_id,
                lot_id=booking.lot_id,
                space_id=booking.space_id,
                start_time=booking.start_time,
                end_time=booking.end_time,
                status=booking.status,
            )
            for booking in all_bookings
        ]

    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Internal Server Error while fetching bookings: {str(e)}"
        )



def cancel_ticket(booking_id, db):
    try:
        booking = db.query(Booking).filter(Booking.id == booking_id).first()
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not Found")
        booking.status = BookingStatus.CANCELLED
        space = db.query(P_Space).filter(P_Space.space_id == booking.space_id).first()
        if space:
            space.status = SpaceStatus.AVAILABLE
        db.commit()
        return {"message": "Booking Canceled"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Something went wrong: {booking}")