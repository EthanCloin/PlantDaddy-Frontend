import os
from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import HTMLResponse
from .models import Plant, PlantCreate, PlantRead, Health
from sqlmodel import create_engine, SQLModel, Session, select
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

SQLITE_FILE = os.environ.get("SQLITE_FILE", "")

# api setup
app = FastAPI()
origins = ["http://localhost:3000", "localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# database setup
# sqllite_file = "/Users/ethancloin/PycharmProjects/PlantNursery/plant_nursery.db"
sqllite_url = f"sqlite:///{SQLITE_FILE}"
connect_args = {"check_same_thread": False}
engine = create_engine(sqllite_url, echo=True, connect_args=connect_args)


def create_db_and_tables():
    print(f"creating db and tables at {sqllite_url}")
    # looks at my models which are tagged with "table=True"
    # and links them to the tables
    SQLModel.metadata.create_all(engine)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.post("/plants/new/", response_model=PlantRead)
async def create_new_plant(plant: PlantCreate):
    with Session(engine) as session:
        db_plant = Plant.from_orm(plant)
        session.add(db_plant)
        session.commit()
        session.refresh(db_plant)
        return db_plant


@app.get("/nursery/")
async def get_all_plants(
    offset: int = 0, limit: int = Query(default=20, lte=100)
) -> list[Plant]:
    with Session(engine) as session:
        plants = session.exec(select(Plant).offset(offset).limit(limit)).all()
        return plants


@app.get("/plants/id/{plant_id}", response_model=PlantRead)
async def get_plant_by_id(plant_id: int):
    with Session(engine) as session:
        plant = session.get(Plant, plant_id)
        if not plant:
            raise HTTPException(status_code=404, detail="Plant not found")
        return plant


@app.get("/plants/health/{plant_health}", response_model=list[Plant])
async def get_plants_by_health(
    plant_health: Health, offset: int = 0, limit: int = Query(default=10, lte=100)
):

    with Session(engine) as session:
        stmt = (
            select(Plant)
            .where(Plant.health == plant_health)
            .offset(offset)
            .limit(limit)
        )
        result = session.exec(stmt)
        plants = result.all()
        return plants
