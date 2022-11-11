import {UseCase} from "../Usecase";
import {IdGateway} from "../../gateways/IdGateway";
import {User} from "../../Entities/User";
import {UserRepository} from "../../repositories/UserRepository";

export type OrganisationInput = {
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
}

export class CreateOrganisation implements UseCase<OrganisationInput, User> {

    constructor(private readonly userRepository: UserRepository,
                private readonly idGateway: IdGateway) {
    }

    execute(input: OrganisationInput): User {
        const user = this.userRepository.getById(input.userId);
        const id = this.idGateway.generate();
        user.linkOrganisation({
            id: id,
            userId: input.userId,
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
            created: new Date(),
            updated: null,
        })
        this.userRepository.save(user);
        return user;
    }
}