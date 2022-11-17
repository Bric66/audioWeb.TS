import {OrganisationRepository} from "../../../core/repositories/OrganisationRepository";
import {Organisation, OrganisationProperties} from "../../../core/Entities/Organisation";
import {OrganisationModel} from "./models/organisation";
import {OrganisationUpdatedInput} from "../../../core/Usecases/organisation/UpdateOrganisation";
import {InviteInput} from "../../../core/Usecases/organisation/SendInvitation";


export class MongoDbOrganisationRepository implements OrganisationRepository {

    async create(organisation: Organisation): Promise<Organisation> {
        const organisationModel = new OrganisationModel(organisation.props);
        await organisationModel.save().then(() => console.log('Organisation created'));
        return Promise.resolve(organisation);
    }


    async getByUserId(userId: string): Promise<Organisation> {
        const organisation = await OrganisationModel.findOne({userId: userId})
        if (!organisation) {
            return null;
        }

        const organisationProperties: OrganisationProperties = {
            id: organisation.id,
            userId: organisation.userId,
            name: organisation.name,
            statut: organisation.statut,
            raisonSociale: organisation.raisonSociale,
            siret: organisation.siret,
            street: organisation.street,
            city: organisation.city,
            bp: organisation.bp,
            country: organisation.country,
            tva: organisation.tva,
            created: organisation.created,
            updated: organisation.updated,
            emoji: organisation.emoji,
            invite: organisation.invite,
        }
        const organisationFound = new Organisation(organisationProperties);
        return Promise.resolve(organisationFound);
    }

    async update(organisationInput: OrganisationUpdatedInput): Promise<Organisation> {
        const organisation = await this.getByUserId(organisationInput.userId);
        await OrganisationModel.updateOne(
            {id: organisation.props.id},
            {
                name: organisationInput.name,
                statut: organisationInput.statut,
                raisonSociale: organisationInput.raisonSociale,
                siret: organisationInput.siret,
                street: organisationInput.street,
                city: organisationInput.city,
                bp: organisationInput.bp,
                country: organisationInput.country,
                tva: organisationInput.tva,
                emoji: organisationInput.emoji,
                updated: organisationInput.updated,
            },
            {upsert: true,}
        ).then(() => console.log('Organisation updated'));
        const result = await this.getByUserId(organisationInput.userId);
        return Promise.resolve(result);
    }

    async invitationExists(userId: string, email: string): Promise<boolean> {
        const organisation = await this.getByUserId(userId);
        const values = Object.values(organisation.props.invite);
        const invitationAlreadySent = values.find(v => v.email === email);
        if (!invitationAlreadySent) {
            return Promise.resolve(false);
        }
        return Promise.resolve(true)
    }

    async updateInvitationsSent(organisationInput: InviteInput): Promise<Organisation> {
        const organisation = await this.getByUserId(organisationInput.userId);

        // const mailSent = organisation.props.invite.push({
        //     name: organisationInput.name,
        //     email: organisationInput.email,
        //     date: organisationInput.date
        // })
        await OrganisationModel.updateOne(
            {id: organisation.props.id},
            {
                $push:
                    {
                        invite: {
                            name: organisationInput.name,
                            email: organisationInput.email,
                            date: organisationInput.date
                        }
                    }
            },
            {upsert: true,}
        ).then(() => console.log('invitationStorage updated'));
        const result = await this.getByUserId(organisationInput.userId);
        return Promise.resolve(result);
    }


}

