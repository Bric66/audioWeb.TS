/*export enum ConnexionType {
    google = "google",
    facebook = "facebook",
    email = "email",
}*/

export type UserProperties = {
    id: string;
    userName: string;
    connexionType: string;
    email: string;
    password: string;
    created: Date;
    updated: Date;
    picture: string;
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
        })
    }


    update(props: {
        userName: string,
        connexionType: string,
        email: string,
        password: string,
        picture: string,
    }) {
        this.props.userName = props.userName
        this.props.connexionType = props.connexionType
        this.props.email = props.email
        this.props.password = props.password
        this.props.picture = props.picture
    }

/*linkOrganisation(props: {
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
}) {

}*/


}




