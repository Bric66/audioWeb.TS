import express from "express";
const organisationRouter = express.Router();

import {CreateOrganisation} from "../../core/Usecases/organisation/CreateOrganisation";
import {V4IdGateway} from "../../adapters/gateways/V4IdGateway";
import {AuthentifiedRequest} from "../types/AuthentifiedRequest";
import {InMemoryUserRepository} from "../../adapters/repositories/InMemoryUserRepository";

const V4idGateway = new V4IdGateway();
const inMemoryUserRepository = new InMemoryUserRepository();
const createOrganisation = new CreateOrganisation(inMemoryUserRepository, V4idGateway);

organisationRouter.post("/create", (req: AuthentifiedRequest, res) => {
    try {
        const body = {
            name: req.body.name,
            statut: req.body.statut,
            raisonSociale: req.body.raisonSociale,
            siret: req.body.siret,
            street: req.body.street,
            city: req.body.city,
            bp: req.body.bp,
            country: req.body.country,
            tva: req.body.tva,
            emoji: req.body.emoji,
        }
        const user = createOrganisation.execute({
            userId: req.user.id,
            name: body.name,
            statut: body.statut,
            raisonSociale: body.raisonSociale,
            siret: body.siret,
            street: body.street,
            city: body.city,
            bp: body.bp,
            country: body.country,
            tva: body.tva,
            emoji: body.emoji,
        })
        return res.status(200).send(user.props.organisation);
    } catch (err) {
        return res.status(400).send({
            message: err.message,
        })
    }
});


export {organisationRouter};