import {Organisation} from "../../Entities/Organisation";
import {InMemoryOrganisationRepository} from "./InMemoryOrganisationRepository";
import {UpdateOrganisation} from "../../Usecases/organisation/UpdateOrganisation";

const inMemoryOrganisationRepository= new InMemoryOrganisationRepository()
const updateOrganisation= new UpdateOrganisation(inMemoryOrganisationRepository)

describe('unit - UpdateOrganisation', () => {
    it("should update organisation", () => {
        const organisation = new Organisation({
            id: "123456789",
            userId: "1234",
            name: "acdc",
            statut: "rockband",
            raisonSociale: "music",
            siret: "123456",
            street: "hell street ",
            city: "bogota",
            bp: "1234",
            country: "france",
            tva: "1234",
            created: null,
            updated: null,
            emoji: "",
            invite: []
        })
        inMemoryOrganisationRepository.save(organisation);
        const result=updateOrganisation.execute({
            name: "metallica",
            statut: "rockband2",
            raisonSociale: "heavymusic",
            siret: "123456789",
            street: "heaven street ",
            city: "New York",
            bp: "123456",
            country: "USA",
            tva: "123456",
            emoji: "image.jpg",
            userId: "1234",
        })
        expect(result.props.name).toEqual("metallica")
        expect(result.props.updated).toBeTruthy();
    })

    it("should throw if organisation doesn't exist", () => {
        const result = () => updateOrganisation.execute({
            name: "metallica",
            statut: "rockband2",
            raisonSociale: "heavymusic",
            siret: "123456789",
            street: "heaven street ",
            city: "New York",
            bp: "123456",
            country: "USA",
            tva: "123456",
            emoji: "image.jpg",
            userId: "",
        });
        expect(() => {
            result()
        }).toThrow();
    });
})