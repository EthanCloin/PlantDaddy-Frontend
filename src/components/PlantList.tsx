import Plant from "../models/Plant";
import PlantInList from "./PlantInList";
import "./PlantList.css";

interface Props {
  plants: Plant[];
}
const PlantList = ({ plants }: Props) => {
  return (
    <div className="PlantList">
      {plants.map((plant) => (
        <PlantInList plant={plant} />
      ))}
    </div>
  );
};

export default PlantList;
