# from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum
# from sqlalchemy.orm import relationship
# from datetime import datetime
# import enum
# # from app.models import user_models, space_model, ticket_model
# from app.core.database import Base

# class BookingStatus(str, enum.Enum):
#     PENDING = "Pending"
#     ACTIVE = "Active"
#     COMPLETED = "Completed"
#     CANCELLED = "Cancelled"

# class Booking(Base):
#     __tablename__ = "bookings"

#     id = Column(Integer, primary_key=True, index=True)
#     customer_id = Column(Integer, ForeignKey("users.id"), nullable=False)  # ForeignKey to User model
#     lot_id = Column(Integer, ForeignKey("parking_lot.id"))
#     space_id = Column(Integer, ForeignKey("parking_space.space_id"))
#     start_time = Column(DateTime, nullable=False)
#     end_time = Column(DateTime, nullable=False)
#     status = Column(Enum(BookingStatus), default=BookingStatus.PENDING)
    
#     customer = relationship("User", backref="bookings")  # Relationship to User model
#     space = relationship("P_Space", back_populates="bookings")  # Relationship to ParkingSpace model
#     tickets = relationship("Ticket", back_populates="booking")  # Relationship to Ticket model



from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
import enum
from app.core.database import Base


class BookingStatus(str, enum.Enum):
    PENDING = "Pending"
    ACTIVE = "Active"
    COMPLETED = "Completed"
    CANCELLED = "Cancelled"


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    customer_id = Column(Integer, ForeignKey("users.id"), nullable=False)  # ForeignKey to User model
    lot_id = Column(Integer, ForeignKey("parking_lot.id"), nullable=False)  # ForeignKey to ParkingLot model
    space_id = Column(Integer, ForeignKey("parking_space.space_id"), nullable=False)  # ForeignKey to ParkingSpace model
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)
    status = Column(Enum(BookingStatus), default=BookingStatus.PENDING)

    # Relationships
    customer = relationship("User", backref="bookings")  # User model relationship
    space = relationship("P_Space", back_populates="bookings")  # ParkingSpace model relationship
    tickets = relationship("Ticket", back_populates="booking")  # Delayed resolution using string "Ticket"

class TicketStatus(str, enum.Enum):
    PENDING = "Pending"
    ACTIVE = "Active"
    COMPLETED = "Completed"
    CANCELLED = "Cancelled"


class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    booking_id = Column(Integer, ForeignKey("bookings.id"), nullable=False)  # ForeignKey to Booking model
    status = Column(Enum(TicketStatus), default=TicketStatus.PENDING)
    start_time = Column(DateTime, nullable=True)
    end_time = Column(DateTime, nullable=True)

    # Relationships
    booking = relationship("Booking", back_populates="tickets")  # Delayed resolution using string "Booking"