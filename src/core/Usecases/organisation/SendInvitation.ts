import {UseCase} from "../Usecase";
import {OrganisationRepository} from "../../repositories/OrganisationRepository";
import {MailGateway} from "../../gateways/MailGateway";
import {Organisation} from "../../Entities/Organisation";


export type InviteInput = {
    userId: string;
    email: string;
    name: string;
    date: Date
}

export class SendInvitation implements UseCase<InviteInput, Promise<Organisation>> {

    constructor(private readonly organisationRepository: OrganisationRepository,
                private readonly mailGateway: MailGateway) {
    }

    async execute(input: InviteInput): Promise<Organisation> {
        const organisation = await this.organisationRepository.getByUserId(input.userId);

        await this.mailGateway.SendInvitation(input.email, organisation.props.name);

        const invitationAlreadySent = await this.organisationRepository.invitationExists(input.userId, input.email);
        if (!invitationAlreadySent) {
            await this.organisationRepository.updateInvitationsSent({
                userId: input.userId,
                name: input.name,
                email: input.email,
                date: new Date()
            })
        }
        return Promise.resolve(organisation);
    }

}