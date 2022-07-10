from sqlmodel import SQLModel, Field, create_engine
from typing import Optional
from enum import Enum


class Health(str, Enum):
    NEAR_DEATH = "near_death"
    POOR = "poor"
    OKAY = "okay"
    GOOD = "good"
    GREAT = "great"
    GLOWING = "glowing"


class PlantBase(SQLModel):
    name: str
    species: Optional[str] = "unknown"
    health: Health


class Plant(PlantBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)


class PlantCreate(PlantBase):
    pass


class PlantRead(PlantBase):
    id: int
