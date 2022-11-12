import "dotenv/config";
const port = +process.env.PORT_KEY;

import express from "express";
import {userRouter} from "./api/routes/user";
import {organisationRouter} from "./api/routes/organisation";

const app = express();

app.use(express.json());

app.use("/", userRouter)

app.use("/organisation", organisationRouter)

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
