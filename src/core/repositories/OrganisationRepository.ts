import { Organisation } from "../Entities/Organisation";
import {UserUpdatedInput} from "../Usecases/user/UpdateUser";
import {User} from "../Entities/User";
import {OrganisationUpdatedInput} from "../Usecases/organisation/UpdateOrganisation";
import {InviteInput} from "../Usecases/organisation/SendInvitation";

export interface OrganisationRepository{
    create(organisation: Organisation):Promise<Organisation>;

    getByUserId(userId:string):Promise<Organisation>;

    update(organisationInput: OrganisationUpdatedInput): Promise<Organisation>;

    invitationExists(userId:string,email:string):Promise<boolean>;

    updateInvitationsSent(organisationInput: InviteInput): Promise<Organisation>
}