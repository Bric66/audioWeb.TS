import {Organisation} from "./Organisation";

export type UserProperties = {
    id: string;
    userName: string;
    connexionType: string;
    email: string;
    password: string;
    created: Date;
    updated: Date;
    picture: string;
    organisation: any[];
}

export class User {
    props: UserProperties;

    constructor(props: UserProperties) {
        this.props = props;
    }

    static create(props: {
        id: string;
        userName: string;
        connexionType: string,
        email: string;
        password: string;
        picture: string;
    }) {
        return new User({
            id: props.id,
            userName: props.userName.trim(),
            connexionType: props.connexionType,
            email: props.email.toLowerCase().trim(),
            password: props.password,
            created: new Date(),
            updated: null,
            picture: props.picture,
            organisation: [],
        })
    }

    update(props: {
        userName: string,
        connexionType: string,
        email: string,
        password: string,
        picture: string,
        updated: Date
    }) {
        this.props.userName = props.userName;
        this.props.connexionType = props.connexionType;
        this.props.email = props.email;
        this.props.password = props.password;
        this.props.picture = props.picture;
        this.props.updated = props.updated
    }

   /* linkOrganisation(props: {
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
        invite: string;
    }) {
        const organisationExists = this.props.organisation.find(item => item.props.id === props.id);
        if (organisationExists) {
            throw new Error('organisation already exists')
        }
        const organisation = Organisation.create({
            id: props.id,
            userId: this.props.id,
            name: props.name,
            statut: props.statut,
            raisonSociale: props.raisonSociale,
            siret: props.siret,
            street: props.street,
            city: props.city,
            bp: props.bp,
            country: props.country,
            tva: props.tva,
            emoji: props.emoji,
        })
        this.props.organisation.push(organisation.props);
        return organisation.props;
    }

    updateOrganisation(props:{
        id: string,
        name: string;
        statut: string;
        raisonSociale: string;
        siret: string;
        street: string;
        city: string;
        bp: string;
        country: string;
        tva: string;
        updated: Date;
        emoji: string;
    }){
        const organisationExists = this.props.organisation.find(item => item.props.id === props.id)[0];
        if (!organisationExists) {
            throw new Error("organisation doesn't exist")
        }
        const organisation = Organisation.update({
            = props.id,
            this.props.name: props.name,
            statut: props.statut,
            raisonSociale: props.raisonSociale,
            siret: props.siret,
            street: props.street,
            city: props.city,
            bp: props.bp,
            country: props.country,
            tva: props.tva,
            updated: props.updated,
            emoji: props.emoji,
        })
        this.props.organisation.push(organisation.props);
        return organisation.props;*/
    }








