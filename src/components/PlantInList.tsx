import Plant from "../models/Plant";
import "./PlantInList.css";

interface Props {
  plant: Plant;
}
const PlantInList = ({ plant }: Props) => {
  return (
    <div className="PlantInList">
      <h1>{plant.nickname}</h1>
      <h2>{plant.species}</h2>
      {plant.needsWater && <i>&#9748;</i>}
    </div>
  );
};

export default PlantInList;
