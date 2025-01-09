from fastapi import APIRouter, Depends
from app.Space.schema import SpaceCreate, SpaceResponse
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.Space.services import create_space, get_space, delete_space, update_space
from typing import List

router = APIRouter()



@router.post('/{lot_id}/create-space', tags=['Space'])
def add_space(space: SpaceCreate, lot_id: int, db: Session=Depends(get_db)):
    return create_space(space, lot_id, db)

@router.get('/{lot_id}/', tags=['Space'], response_model=List[SpaceResponse])
def read_space(lot_id: int, db:Session=Depends(get_db)):
    return get_space(lot_id, db)

@router.patch('/{space_id}/update-space', tags=['Space'], response_model=SpaceResponse)
def update_space_route(space_id: int, space: SpaceCreate, db: Session = Depends(get_db)):
    return update_space(space_id, space.model_dump(exclude_unset=True), db)

@router.patch('/{space_id}/delete-space', tags=['Space'])
def update_space_route(space_id: int, db: Session = Depends(get_db)):
    return delete_space(space_id, db)