import {Organisation} from "../../Entities/Organisation";
import {OrganisationRepository} from "../../repositories/OrganisationRepository";

export const dbOrganisation = new Map<string, Organisation>();

export class InMemoryOrganisationRepository implements OrganisationRepository {
    save(organisation: Organisation): void {
        dbOrganisation.set(organisation.props.userId, organisation);
    }

    getByUserId(id: string): Organisation {
        const organisation = dbOrganisation.get(id);

        return organisation;
    }

    invitationExists(userId: string, email: string): boolean {
        const organisation = this.getByUserId(userId);
        const values = Object.values(organisation.props.invite);
        const invitationAlreadySent = values.find(v => v.email === email);
        if (!invitationAlreadySent) {
            return false
        }
        return true
    };
}