import express from "express";

const organisationRouter = express.Router();

import {CreateOrganisation} from "../../core/Usecases/organisation/CreateOrganisation";
import {V4IdGateway} from "../../adapters/gateways/V4IdGateway";
import {AuthentifiedRequest} from "../types/AuthentifiedRequest";
import {UpdateOrganisation} from "../../core/Usecases/organisation/UpdateOrganisation";
import {SendInvitation} from "../../core/Usecases/organisation/SendInvitation";
import {NodeMailerGateway} from "../../adapters/gateways/NodeMailerGateway";
import {MongoDbOrganisationRepository} from "../../adapters/repositories/mongoDb/MongoDbOrganisationRepository";

const mongoDbOrganisationRepository = new MongoDbOrganisationRepository();
const V4idGateway = new V4IdGateway();
const nodeMailerGateway = new NodeMailerGateway();
const createOrganisation = new CreateOrganisation(mongoDbOrganisationRepository, V4idGateway);
const updateOrganisation = new UpdateOrganisation(mongoDbOrganisationRepository)
const sendInvitation = new SendInvitation(mongoDbOrganisationRepository, nodeMailerGateway)

organisationRouter.post("/",async (req: AuthentifiedRequest, res) => {
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
        const organisation = await createOrganisation.execute({
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
    } catch (err) {
        return res.status(400).send({
            message: err.message,
        })
    }
});


organisationRouter.patch("/", async (req: AuthentifiedRequest, res) => {
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
        const organisation = await updateOrganisation.execute({
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
            userId: req.user.id,
            updated: new Date()
        })
        return res.status(200).send(organisation);
    } catch (err) {
        return res.status(400).send({
            message: err.message,
        })
    }
});

organisationRouter.post("/sendInvitation", async (req: AuthentifiedRequest, res) => {
    try {
        const body = {
            email: req.body.email,
            name: req.body.name,
        }
        await sendInvitation.execute({
            email: body.email,
            name: body.name,
            userId: req.user.id,
            date: new Date()
        })

        return res.status(200).send({
            message: "Mail sent successfully",
            date: new Date()
        });
    } catch (err) {
        return res.status(400).send({
            message: err.message,
        })
    }
});

export {organisationRouter};