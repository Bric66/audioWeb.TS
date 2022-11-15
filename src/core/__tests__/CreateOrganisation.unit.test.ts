import {CreateOrganisation} from "../Usecases/organisation/CreateOrganisation";
import {V4IdGateway} from "./gateways/V4IdGateway";
import {InMemoryOrganisationRepository} from "./repositories/InMemoryOrganisationRepository";
import {Organisation} from "../Entities/Organisation";
import {User} from "../Entities/User";

const v4IdGateway = new V4IdGateway();
const inMemoryOrganisationRepository = new InMemoryOrganisationRepository();
const createOrganisation = new CreateOrganisation(inMemoryOrganisationRepository, v4IdGateway);


describe("Unit - CreateOrganisation", () => {
    it("should create a new organisation", () => {
        const result = createOrganisation.execute({
            userId: "1234",
            name: "jojo",
            statut: "quo",
            raisonSociale: "non tu as tort",
            siret: "123456789",
            street: "hell street",
            city: "Bogota",
            bp: "666",
            country: "Columbia",
            tva: "987654321",
            emoji: "",
        });
        expect(result.props.id).toBeTruthy();
        expect(result.props.userId).toEqual("1234");
        expect(result.props.created).toBeTruthy();
    })

    it("should throw organisation already exists", () => {
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
            created: new Date(),
            updated: null,
            emoji: "",
            invite: []
        })
        inMemoryOrganisationRepository.save(organisation);

        const result = () => createOrganisation.execute({
            userId: "1234",
            name: "jojo",
            statut: "quo",
            raisonSociale: "non tu as tort",
            siret: "123456789",
            street: "hell street",
            city: "Bogota",
            bp: "666",
            country: "Columbia",
            tva: "987654321",
            emoji: "",
        });
        expect(() => {
            result()
        }).toThrow();
    });
});






