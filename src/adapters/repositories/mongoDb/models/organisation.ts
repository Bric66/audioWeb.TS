import {model, Schema} from "mongoose";

const organisationSchema = new Schema({
    id: {
        type: String,
    },
    userId: {
        type: String,
    },
    name: {
        type:String,
    },
    statut: {
        type:String,
    },
    raisonSociale: {
        type:String,
    },
    siret: {
        type: String,
    },
    street: {
        type: String,
    },
    city: {
        type: String,
    },
    bp: {
        type: String,
    },
    country: {
        type: String,
    },
    tva: {
        type: String,
    },
    created: {
        type: Date,
    },
    updated: {
        type: Date,
    },
    emoji: {
        type: String,
    },
    invite: {
        type: []
    }
})

export const OrganisationModel = model('Organisation', organisationSchema)

