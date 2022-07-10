import os
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from .models import Plant, PlantCreate, PlantRead
from sqlmodel import create_engine, SQLModel, Session, select
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

SQLITE_FILE = os.environ.get("SQLITE_FILE", "")

# api setup
app = FastAPI()
origins = [
    "http://localhost:3000",
    "localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# database setup
# sqllite_file = "/Users/ethancloin/PycharmProjects/PlantNursery/plant_nursery.db"
sqllite_url = f"sqlite:///{SQLITE_FILE}"
connect_args = {"check_same_thread": False}
engine = create_engine(sqllite_url, echo=True, connect_args=connect_args)


def create_db_and_tables():
    print("creating db and tables")
    # looks at my models which are tagged with "table=True"
    # and links them to the tables
    SQLModel.metadata.create_all(engine)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.post("/plants/", response_model=PlantRead)
async def create_new_plant(plant: PlantCreate):
    with Session(engine) as session:
        db_plant = Plant.from_orm(plant)
        session.add(db_plant)
        session.commit()
        session.refresh(db_plant)
        return db_plant


@app.get("/nursery/")
async def get_all_plants() -> list[Plant]:
    with Session(engine) as session:
        plants = session.exec(select(Plant)).all()
        return plants
    # return """
    # <html>
    #     <head>
    #         <title>Your Nursery</title>
    #     </head>
    #     <body>
    #         <h1>Your plants live here!</h1>
    #     </body>
    # </html>
    # """
