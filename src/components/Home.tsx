import Plant from "../models/Plant";
import "./Home.css";
import PlantList from "./PlantList";

const dummyPlantData: Plant[] = [
  { nickname: "firsty", species: "plantus majorus", needsWater: false },
  { nickname: "secondy", species: "leafus citrun", needsWater: false },
  { nickname: "thirdy", species: "stemicus smith", needsWater: true },
  { nickname: "fourthy", species: "rootinitis expargus", needsWater: true },
];
const Home = () => {
  return (
    <div className="Home">
      <PlantList plants={dummyPlantData} />
    </div>
  );
};

export default Home;
