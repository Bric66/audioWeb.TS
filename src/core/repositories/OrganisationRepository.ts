import { Organisation } from "../Entities/Organisation";

export interface OrganisationRepository{
    save(user: Organisation):void;

    getByUserId(id:string):Organisation;
}