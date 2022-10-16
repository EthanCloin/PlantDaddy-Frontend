import { useEffect, useState } from "react";
import Plant from "../models/Plant";
import { getAllPlants } from "../services/PlantDaddyService";
import "./Home.css";
import PlantList from "./PlantList";

// const dummyPlantData: Plant[] = [
//   { nickname: "firsty", species: "plantus majorus", needsWater: false },
//   { nickname: "secondy", species: "leafus citrun", needsWater: false },
//   { nickname: "thirdy", species: "stemicus smith", needsWater: true },
//   { nickname: "fourthy", species: "rootinitis expargus", needsWater: true },
// ];
const Home = () => {
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    getAllPlants().then((res) => setPlants(res));
  }, []);
  return (
    <div className="Home">
      <PlantList plants={plants} />
    </div>
  );
};

export default Home;
