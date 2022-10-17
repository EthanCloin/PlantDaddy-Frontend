import axios from "axios";
import Plant, { PlantResponse } from "../models/Plant";

const currentUrl = "http://0.0.0.0:8000";

export const createPlant = (plant: Plant) => {
  return axios
    .get(`${currentUrl}/plants/new`, {
      params: {
        ...plant,
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const getAllPlants = (): Promise<PlantResponse[]> => {
  const path = `${currentUrl}/plants/`;
  return axios.get(`${currentUrl}/plants/`).then((res) => {
    console.log(path);
    console.log(res);
    return res.data;
  });
};
