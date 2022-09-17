import config from "./config";
import { Button } from "@mui/material";
import FastAPIClient from "./client";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TestImage from "./test_data/plant_eg.jpeg";
const client = new FastAPIClient(config);

const App = () => {
  const [plants, setPlants] = useState([]);

  const getAllPlants = async () => {
    client.getNursery().then((data) => {
      console.log(data);
      setPlants(data.data);
    });
  };
  return (
    <div>
      <Button variant="contained" onClick={getAllPlants}>
        My Button
      </Button>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {plants.map((plant, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Card style={{ height: "100%" }} variant="outlined">
              {plant.name}
              <img
                src={TestImage}
                alt={"stock photo of a plant: " + plant.name}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default App;
