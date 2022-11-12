import {UseCase} from "../Usecase";
import {OrganisationRepository} from "../../repositories/OrganisationRepository";
import {MailGateway} from "../../gateways/MailGateway";
import {Organisation} from "../../Entities/Organisation";


export type InviteInput = {
    accessToken: string;
    email: string;
    name: string;
}

export class SendInvitation implements UseCase<InviteInput, Promise<Organisation>> {

    constructor(private readonly organisationRepository: OrganisationRepository,
                private readonly mailgateway: MailGateway) {
    }

    async execute(input: InviteInput): Promise<Organisation> {
        const organisation = this.organisationRepository.getByUserId(input.accessToken);
        const invitationAlreadySent = this.organisationRepository.invitationExists(input.accessToken, input.email);
        if (invitationAlreadySent) {
            throw new Error('mail already sent')
        }
            organisation.props.invite.push({
                name: input.name,
                email: input.email,
                date: new Date()
            });
            this.organisationRepository.save(organisation);

        await this.mailgateway.SendInvitation(input.email, organisation.props.name);
        return organisation
    }

}