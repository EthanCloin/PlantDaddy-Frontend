import config from './config';
import { Button } from '@mui/material';
import FastAPIClient from "./client";
import {useState} from "react";

const client = new FastAPIClient(config);

const App = () => {

    const [plants, setPlants] = useState([])

    const getAllPlants = async () => {
    client.getNursury().then((data) => {
        console.log(data)
        setPlants(data.data)
    })
}
    return (
        <div>
            <div>
                {plants.map(x => x.name)}
            </div>
            <div>
                <Button variant="contained" onClick={getAllPlants}>My Button</Button>
            </div>
        </div>
    )
};



export default App

