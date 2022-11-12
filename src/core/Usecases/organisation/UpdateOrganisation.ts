import {UseCase} from "../Usecase";
import {User} from "../../Entities/User";
import {UserRepository} from "../../repositories/UserRepository";
import {PasswordGateway} from "../../gateways/PasswordGateway";
import {Organisation} from "../../Entities/Organisation";
import {OrganisationRepository} from "../../repositories/OrganisationRepository";

export type UserInput = {
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
    accessToken: string;
}

export class UpdateOrganisation implements UseCase<UserInput, Organisation> {

    constructor(private readonly organisationRepository: OrganisationRepository) {
    }

    execute(input: UserInput): Organisation {
        const organisation = this.organisationRepository.getByUserId(input.accessToken)
        if (!organisation) {
            throw new Error("organisation doesn't exist")
        }
        organisation.update({
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
        })
        this.organisationRepository.save(organisation);
        return organisation;
    }
}