import {UserProperties} from "./User";

export type OrganisationProperties = {
    id: string;
    userId:string
    name: string;
    statut: string;
    raisonSociale: string;
    siret: string;
    street: string;
    city: string;
    bp: string;
    country: string;
    tva: string;
    created: Date;
    updated: Date;
    emoji: string;
}


export class Organisation {
    props: OrganisationProperties;
    userProperties: UserProperties;

    constructor(props: OrganisationProperties
                 ) {
        this.props = props;
    }

    static create(props: {
        id: string;
        userId:string
        name: string;
        statut: string;
        raisonSociale: string;
        siret: string;
        street: string;
        city: string;
        bp: string;
        country: string;
        tva: string;
        emoji: string;

    }) {
        return new Organisation({
            id: props.id,
            userId: props.userId,
            name: props.name,
            statut: props.statut,
            raisonSociale: props.raisonSociale,
            siret: props.siret,
            street: props.street,
            city: props.city,
            bp: props.bp,
            country: props.country,
            tva: props.tva,
            created: new Date(),
            updated: null,
            emoji: props.emoji,
        })
    }
}