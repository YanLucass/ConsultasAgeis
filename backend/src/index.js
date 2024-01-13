import express from "express"
import dotenv from 'dotenv';
import pool from "../db/conn";
import cors from 'cors';
dotenv.config();

//import routes
import patientsRoutes from '../routes/patientsRoutes';

const port = 5000;
const app = express();

//set cors
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

//message traffic
app.use(express.json());

//define routes
app.use('/patients', patientsRoutes);


app.listen(5000, () => {
    console.log(`Serv running in ${port}`);
})