import {UseCase} from "../Usecase";
import {OrganisationRepository} from "../../repositories/OrganisationRepository";
import {MailGateway} from "../../gateways/MailGateway";
import {Organisation} from "../../Entities/Organisation";


export type InviteInput = {
    userId: string;
    email: string;
    name: string;
}

export class SendInvitation implements UseCase<InviteInput, Promise<Organisation>> {

    constructor(private readonly organisationRepository: OrganisationRepository,
                private readonly mailGateway: MailGateway) {
    }

    async execute(input: InviteInput): Promise<Organisation> {
        const organisation = this.organisationRepository.getByUserId(input.userId);
        const invitationAlreadySent = this.organisationRepository.invitationExists(input.userId, input.email);
        if (invitationAlreadySent) {
            throw new Error('mail already sent')
        }
            organisation.props.invite.push({
                name: input.name,
                email: input.email,
                date: new Date()
            });
            this.organisationRepository.save(organisation);
        await this.mailGateway.SendInvitation(input.email, organisation.props.name);

        return organisation
    }

}