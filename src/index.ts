import "dotenv/config";
import express from "express";
import {userRouter} from "./api/routes/user";
import {organisationRouter} from "./api/routes/organisation";

const app=express();
const port=3003;

app.use(express.json());

app.use("/",userRouter)

app.use("/organisation",organisationRouter)

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})
