

import {OrganisationRepository} from "../../repositories/OrganisationRepository";
import {UseCase} from "../Usecase";
import {IdGateway} from "../../gateways/IdGateway";
import {Organisation} from "../../Entities/Organisation";

export type OrganisationInput = {
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

}

export class CreateOrganisation implements UseCase<OrganisationInput, Organisation> {

    constructor(private readonly organisationRepository: OrganisationRepository,
                private readonly idGateway: IdGateway) {
    }

    execute(input:OrganisationInput): Organisation {
       const organisationExists = this.organisationRepository.getByUserId(input.userId);
        if (organisationExists) {
            throw new Error ('organisation already exists')
        }
        const id=this.idGateway.generate();
        const organisation=Organisation.create({
            id:id,
            userId:input.userId,
            name:input.name,
            statut:input.statut,
            raisonSociale:input.raisonSociale,
            siret:input.siret,
            street:input.street,
            city:input.city,
            bp:input.bp,
            country: input.country,
            tva:input.tva,
            emoji:input.emoji,
        })
this.organisationRepository.save(organisation)
        return (organisation)
    }
}