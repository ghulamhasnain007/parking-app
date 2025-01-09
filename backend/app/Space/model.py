from sqlalchemy import Column, String, Integer, Boolean, ForeignKey, DateTime, Enum
from app.core.database import Base
# from app.models import parkinglot_model, booking_model 
# from app.models.booking_model import Booking
from datetime import datetime
import enum
from sqlalchemy.orm import relationship

class SpaceStatus(str, enum.Enum):
    AVAILABLE = "Available"
    RESERVED = "Reserved"
    BOOKED = "Booked"


class P_Space(Base):
    __tablename__ = 'parking_space'

    space_id = Column(Integer, primary_key=True)
    space_name = Column(String(200), unique=True, nullable=False)
    lot_id = Column(Integer, ForeignKey("parking_lot.id", ondelete="CASCADE"))
    status = Column(Enum(SpaceStatus), default=SpaceStatus.AVAILABLE)
    created_at = Column(DateTime, default=datetime.now, nullable=False)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)  
    deleted = Column(Boolean, default=False)
    lot = relationship("P_LOT", back_populates="spaces")
    bookings = relationship("Booking", back_populates="space")

