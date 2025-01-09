from fastapi import HTTPException, Depends, status, Request, Response
from sqlalchemy.orm import Session
from app.Lot.model import P_LOT
from app.Lot.schema import LotCreate, LotResponse
from datetime import datetime
from typing import List
import logging

logging.basicConfig(level=logging.DEBUG)


def create_parking_lot(lot: LotCreate, db):
    try:
        if not lot:
            raise ValueError("Please provide all information")
        parking_lot = P_LOT(
                name = lot.name,
                location = lot.location,
                capacity = lot.capacity
            )
            
            # Add the user to the database
        db.add(parking_lot)
        db.commit()
        db.refresh(parking_lot)

        return parking_lot
    
    except Exception as e:
        logging.error(f"Error creating parking lot: {e}")
        raise HTTPException(status_code=500, detail=f"{e}: Failed to create lot: Internal Server Error")
    
def update_parking_lot(lotid: int, lot: LotCreate, db):
    try:
        parking_lot = db.query(P_LOT).filter(P_LOT.id == lotid).first()

        if not parking_lot:
            raise HTTPException(status_code=404, detail=f'lot with id {lotid} is not define')

        parking_lot.name = lot.name
        parking_lot.capacity = lot.capacity
        parking_lot.location = lot.location

        db.commit()
        db.refresh(parking_lot)
        return parking_lot
    except Exception as e:
        logging.error(f"Something went wrong: {e}")
        raise HTTPException(status_code=500, detail='Something went wrong')



def reading_lot(db: Session) -> List[LotResponse]:
    parking_lots = db.query(P_LOT).filter(P_LOT.deleted == False).all()
    if not parking_lots:
        raise HTTPException(status_code=404, detail="Lots not found")
    return [
        LotResponse(
            id=lot.id,
            name=lot.name,
            capacity=lot.capacity,
            location= lot.location,
            created=lot.created_at,
            last_updated=lot.updated_at,
        )
        for lot in parking_lots
    ]


def deleting_parking_lot(lotid: int, db):
    parking_lot = db.query(P_LOT).filter(P_LOT.id == lotid).first()
    if not parking_lot:
        raise HTTPException(status_code=404, detail="Lot Not Found")
    parking_lot.deleted=True
    db.commit()

    return {"message": "Lot Deleted Successfully"}
