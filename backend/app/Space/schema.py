from pydantic import BaseModel, ConfigDict
from datetime import datetime

class SpaceCreate(BaseModel):
    space_name: str
    # lot_id: int
    # created: str
    # last_updated: str


class SpaceResponse(BaseModel):
    space_id: int
    space_name: str
    lot_id: int
    created_at: datetime  # Change to datetime
    updated_at: datetime  # Change to datetime

    model_config = ConfigDict(from_attributes=True)