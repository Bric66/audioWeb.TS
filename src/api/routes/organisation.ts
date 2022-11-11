import express from "express";

import {CreateOrganisation} from "../../core/Usecases/organisation/CreateOrganisation";
import {V4IdGateway} from "../../adapters/gateways/V4IdGateway";
import {InMemoryOrganisationRepository} from "../../adapters/repositories/InMemoryOrganisationRepository";
import {AuthentifiedRequest} from "../types/AuthentifiedRequest";

const organisationRouter = express.Router();

const V4idGateway = new V4IdGateway();
const inMemoryOrganisationRepository = new InMemoryOrganisationRepository()
const createOrganisation = new CreateOrganisation(inMemoryOrganisationRepository, V4idGateway)


organisationRouter.post("/", (req: AuthentifiedRequest, res) => {

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

    const organisation = createOrganisation.execute({
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
return res.status(200).send(organisation.props);

});


export {organisationRouter};