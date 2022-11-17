import {UseCase} from "../Usecase";
import {User} from "../../Entities/User";
import {UserRepository} from "../../repositories/UserRepository";
import {PasswordGateway} from "../../gateways/PasswordGateway";
import {Organisation} from "../../Entities/Organisation";
import {OrganisationRepository} from "../../repositories/OrganisationRepository";

export type OrganisationUpdatedInput = {
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
    userId: string;
    updated: Date;
}

export class UpdateOrganisation implements UseCase<OrganisationUpdatedInput, Organisation> {

    constructor(private readonly organisationRepository: OrganisationRepository) {
    }

    async execute(input: OrganisationUpdatedInput): Promise<Organisation> {

        const organisation = await this.organisationRepository.update({
            name: input.name,
            statut: input.statut,
            raisonSociale: input.raisonSociale,
            siret: input.siret,
            street: input.street,
            city: input.city,
            bp: input.bp,
            country: input.country,
            tva: input.tva,
            emoji: input.emoji,
            userId: input.userId,
            updated: input.updated
        });
        return Promise.resolve(organisation);
    }
}