import express from "express";

const userRouter = express.Router();

import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY;

//import {InMemoryUserRepository} from "../../adapters/repositories/inMemory/InMemoryUserRepository";
import {SignUp} from "../../core/Usecases/user/SignUp";
import {V4IdGateway} from "../../adapters/gateways/V4IdGateway";
import {BcryptGateway} from "../../adapters/gateways/BcryptGateway";
import {SignIn} from "../../core/Usecases/user/SignIn";
import {authorization} from "../middlewares/JwtAuthorizationMiddleware";
import {AuthentifiedRequest} from "../types/AuthentifiedRequest";
import {UpdateUser} from "../../core/Usecases/user/UpdateUser";
import {MongoDbUserRepository} from "../../adapters/repositories/mongoDb/MongoDbUserRepository";

//const inMemoryUserRepository = new InMemoryUserRepository();
const mongoDbUserRepository = new MongoDbUserRepository();
const V4idGateway = new V4IdGateway();
const bcryptGateway = new BcryptGateway();
const signUp = new SignUp(mongoDbUserRepository, V4idGateway, bcryptGateway);
const signIn = new SignIn(mongoDbUserRepository, bcryptGateway);
const updateUser = new UpdateUser(mongoDbUserRepository, bcryptGateway)

userRouter.post("/signup", async (req, res) => {
    try {
        const body = {
            userName: req.body.userName.trim(),
            connexionType: req.body.connexionType,
            email: req.body.email.toLowerCase().trim(),
            password: req.body.password,
            picture: req.body.picture,
        };

        const user = await signUp.execute(body);

        return res.status(200).send({
            id: user.props.id,
            userName: user.props.userName,
            connexionType: user.props.connexionType,
            email: user.props.email,
            created: user.props.created,
            picture: user.props.picture,
        });
    } catch (err) {
        return res.status(400).send({
            message: err.message,
        })
    }
});

userRouter.post("/signin",async (req, res) => {
    try {
        const body = {
            email: req.body.email.toLowerCase().trim(),
            password: req.body.password,
        };

        const user = await signIn.execute(body);

        const accessKey = jwt.sign(
            {
                id: user.props.id,
                userName: user.props.userName,
                email: user.props.email
            },
            secretKey
        );
        return res.status(200).send({
            id: user.props.id,
            userName: user.props.userName,
            connexionType: user.props.connexionType,
            email: user.props.email,
            created: user.props.created,
            updated: user.props.updated,
            picture: user.props.picture,
            organisation: user.props.organisation,
            accesskey: accessKey,
        });
    } catch (err) {
        return res.status(400).send({
            message: err.message,
        })
    }
});

userRouter.use(authorization);

userRouter.patch("/update",async (req: AuthentifiedRequest, res) => {
    try {
        const body = {
            userName: req.body.userName.trim(),
            connexionType: req.body.connexionType,
            email: req.body.email.toLowerCase().trim(),
            password: req.body.password,
            picture: req.body.picture,
        };
        const updatedUser = await updateUser.execute({
            userName: body.userName,
            connexionType: body.connexionType,
            email: body.email,
            password: body.password,
            picture: body.picture,
            updated: new Date(),
            userId: req.user.id
        })
        return res.status(200).send({
            id: updatedUser.props.id,
            userName: updatedUser.props.userName,
            connexionType: updatedUser.props.connexionType,
            email: updatedUser.props.email,
            created: updatedUser.props.created,
            updated: updatedUser.props.updated,
            picture: updatedUser.props.picture,
            organisation: updatedUser.props.organisation,
        });
    } catch (err) {
        return res.status(400).send({
            message: err.message,
        })
    }
});

export {userRouter};

