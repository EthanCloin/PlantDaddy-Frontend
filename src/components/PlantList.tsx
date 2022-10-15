import Plant from "../models/Plant";
import PlantInList from "./PlantInList";
import "./PlantList.css";

const dummyPlantData: Plant[] = [
  { nickname: "firsty", species: "plantus majorus", needsWater: false },
  { nickname: "secondy", species: "leafus citrun", needsWater: false },
  { nickname: "thirdy", species: "stemicus smith", needsWater: true },
  { nickname: "fourthy", species: "rootinitis expargus", needsWater: true },
];
const PlantList = () => {
  return (
    <div className="PlantList">
      {dummyPlantData.map((plant) => (
        <PlantInList plant={plant} />
      ))}
    </div>
  );
};

export default PlantList;
