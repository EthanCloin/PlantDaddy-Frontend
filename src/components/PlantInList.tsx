import Plant from "../models/Plant";
import "./PlantInList.css";

interface Props {
  plant: Plant;
}
const PlantInList = ({ plant }: Props) => {
  const wateredClass = plant.needsWater ? " needs-water" : "";
  return (
    <div className={"PlantInList" + wateredClass}>
      <h1 className="nickname">{plant.nickname}</h1>
      <h2 className="species">{plant.species}</h2>
      {plant.needsWater && <i className="water-icon">&#9748;</i>}
    </div>
  );
};

export default PlantInList;
