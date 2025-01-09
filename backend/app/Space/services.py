from fastapi import HTTPException, Depends, status
from app.Space.model import P_Space
from app.Space.schema import SpaceCreate, SpaceResponse
from app.Lot.model import P_LOT
from typing import List
import logging

logging.basicConfig(level=logging.DEBUG)


def create_space(space: SpaceCreate, lot_id: int, db):
    try:
        # Fetch the parking lot details
        parking_lot = db.query(P_LOT).filter(
            P_LOT.id == lot_id,  # Ensure `lot_id` is an integer
            P_LOT.deleted == False
        ).first()
        
        if not parking_lot:
            raise HTTPException(status_code=404, detail="Parking lot not found")
        
        # Count existing spaces in the parking lot
        existing_space_count = db.query(P_Space).filter(
            P_Space.lot_id == lot_id,
            P_Space.deleted == False
        ).count()
        
        # Check if adding another space exceeds capacity
        if existing_space_count >= parking_lot.capacity:
            raise HTTPException(
                status_code=400, 
                detail=f"Cannot add more spaces. Parking lot capacity is {parking_lot.capacity} and {existing_space_count} spaces are already defined."
            )
        
        # Add the new space
        new_space = P_Space(
            space_name=space.space_name,
            lot_id=lot_id
        )
        db.add(new_space)
        db.commit()
        db.refresh(new_space)
        
        return {"message": "Parking space created successfully", "space": new_space}
    
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")




def get_space(lot_id: int, db) -> List[SpaceResponse]:
    try:
        if not lot_id:
            raise HTTPException(status_code=404, detail="Please provide Lot ID")
        
        spaces = (
            db.query(P_Space)
            .join(P_LOT, P_Space.lot_id == P_LOT.id)
            .filter(
                P_Space.lot_id == lot_id, 
                P_LOT.deleted == False, 
                P_Space.deleted == False  # Ensure space is not soft-deleted
            )
            .all()
        )

        print("Output: ", spaces)

        if not spaces:
            return []

        return [
            SpaceResponse(
                space_id=space.space_id,
                space_name=space.space_name,
                lot_id=lot_id,
                created_at=space.created_at,
                updated_at=space.updated_at
            )
            for space in spaces
        ]
    except Exception as e:
        logging.error(f"Error reading parking space: {e}")
        raise HTTPException(status_code=500, detail=f"{e}: Failed to read space: Internal Server Error")



def update_space(space_id: int, space_data, db):
    space = db.query(P_Space).filter(P_Space.space_id == space_id).first()
    if not space:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Space not found")
    
    # Update space attributes
    for key, value in space_data.items():
        setattr(space, key, value)

    db.commit()
    db.refresh(space)
    return space


def delete_space(space_id: int, db):
    try:
        if not space_id:
            raise HTTPException(status_code=404, detail="Please provide Id")
        space = db.query(P_Space).filter(P_Space.space_id == space_id).first()

        if not space:
            raise HTTPException(status_code=404, detail="No Space Found with that Id")
        
        space.deleted = True
        db.commit()
        return { "message": "Space Deleted Successfully"}
    except Exception as e:
        logging.error(f"Something went wrong while deleting: {e}")
        raise HTTPException(status_code=500, detail=f"Space Deleting Failed: Internal Server Error {e}")
    