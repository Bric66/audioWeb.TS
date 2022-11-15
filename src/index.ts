import "dotenv/config";

const port = +process.env.PORT_KEY;

import express from "express";
import {userRouter} from "./api/routes/user";
import {organisationRouter} from "./api/routes/organisation";

import * as mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/dummy_data', (err) => {
    if (err) {
        throw err;
    }
    console.info('mongodb connected');
})

const app = express();

app.use(express.json());

app.use("/", userRouter)

app.use("/organisation", organisationRouter)

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
