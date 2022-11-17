import {UserProperties} from "./User";

export type OrganisationProperties = {
    id: string;
    userId: string
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
    invite: any[];
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
        userId: string
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
            invite: []
        })
    }

    update(props: {
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
        updated:Date;
    }) {
        this.props.name = props.name
        this.props.statut = props.statut
        this.props.raisonSociale = props.raisonSociale
        this.props.siret = props.siret
        this.props.street = props.street
        this.props.city = props.city
        this.props.bp = props.bp
        this.props.country = props.country
        this.props.tva = props.tva
        this.props.emoji = props.emoji
        this.props.updated= props.updated
    }

//     SendInvitation(props: {
//         userId: string;
//         email: string;
//         name: string;
//     }) {
//
//         const invitationAlreadySent = this.props.invite.find(item => item.props.email === props.email);
//         if (invitationAlreadySent) {
//             throw new Error('mail already sent')
//         }
//
//         this.props.invite.push({
//             name: props.name,
//             email: props.email,
//             date: new Date()
//         });
// // this.organisationRepository.save(organisation);
// // await this.mailGateway.SendInvitation(input.email, organisation.props.name);
// //
//         return organisation/*(props:{
//         invite: string
//     }){
//         this.props.invite = props.invite
//     }
// */
//     }
}