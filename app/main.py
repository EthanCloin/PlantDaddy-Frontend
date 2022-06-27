from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from .models import Plant, PlantCreate, PlantRead
from sqlmodel import create_engine, SQLModel, Session


# database setup
sqllite_file = "/Users/ethancloin/PycharmProjects/PlantNursery/plant_nursery.db"
sqllite_url = f"sqlite:///{sqllite_file}"
connect_args = {"check_same_thread": False}
engine = create_engine(sqllite_url, echo=True, connect_args=connect_args)


def create_db_and_tables():
    print("creating db and tables")
    # looks at my models which are tagged with "table=True"
    # and links them to the tables
    SQLModel.metadata.create_all(engine)


# api setup
app = FastAPI()


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


@app.get("/nursery/", response_class=HTMLResponse)
async def view_nursery():
    return """
    <html>
        <head>
            <title>Your Nursery</title>
        </head>
        <body>
            <h1>Your plants live here!</h1>
        </body>
    </html>
    """


if __name__ == "__main__":
    pass
