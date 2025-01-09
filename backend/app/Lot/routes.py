from fastapi import APIRouter, HTTPException, status, Request, Response, Depends
from app.Lot.schema import LotCreate, LotResponse
from app.Space.schema import SpaceCreate, SpaceResponse
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.Lot.services import create_parking_lot, reading_lot, update_parking_lot, deleting_parking_lot
from app.Space.services import create_space, get_space, update_space, delete_space
from  typing import List, Dict

router = APIRouter()

@router.post('/create', tags=['Parking Lot'])
def add_lot(lot: LotCreate, db: Session=Depends(get_db)):
    return create_parking_lot(lot, db)


@router.get('/', tags=['Parking Lot'], response_model=List[LotResponse])
def read_lots(db: Session = Depends(get_db)):
    return reading_lot(db)

@router.patch('/{lotid}/update', tags=['Parking Lot'])
def update_lots(lotid: int, lot: LotCreate, db: Session = Depends(get_db)):
    return update_parking_lot(lotid, lot, db)

@router.patch('/{lotid}/delete', tags=['Parking Lot'])
def delete_lots(lotid:int, db: Session = Depends(get_db)):
    return deleting_parking_lot(lotid, db)

