import { Organisation } from "../Entities/Organisation";

export interface OrganisationRepository{
    save(user: Organisation):void;

    getByUserId(id:string):Organisation;

    invitationExists(userId:string,email:string):boolean;
}