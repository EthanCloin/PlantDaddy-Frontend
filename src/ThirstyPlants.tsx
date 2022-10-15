import PlantList from "./components/PlantList";
import "./ThirstyPlants.css";

const ThirstyPlants = () => {
  // service call to fetch plants where needWater=true
  // or filter plants from context or service call for fetch all

  const dummyThirstyPlants = [
    {
      nickname: "thirsty boi",
      species: "needus waterus",
      needsWater: true,
    },
  ];
  return (
    <div className="ThirstyPlants">
      <PlantList plants={dummyThirstyPlants} />
    </div>
  );
};

export default ThirstyPlants;
