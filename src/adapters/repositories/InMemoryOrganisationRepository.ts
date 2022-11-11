import {OrganisationRepository} from "../../core/repositories/OrganisationRepository";
import {Organisation} from "../../core/Entities/Organisation";

const dbOrganisation = new Map<string,Organisation>();

export class InMemoryOrganisationRepository implements OrganisationRepository{
    save(organisation: Organisation) :void{
        dbOrganisation.set(organisation.props.id,organisation);
    }

    getByUserId(id:string):Organisation {
       const organisation = dbOrganisation.get(id);

       return organisation;
    }
}