import {BcryptGateway} from "./gateways/BcryptGateway";
import {V4IdGateway} from "./gateways/V4IdGateway";
import {InMemoryUserRepository} from "./repositories/InMemoryUserRepository";
import {SignUp} from "../Usecases/user/SignUp";
import {User} from "../Entities/User";


const bcryptGateway = new BcryptGateway();
const v4IdGateway = new V4IdGateway();
const inMemoryUserRepository = new InMemoryUserRepository();
const signUp = new SignUp(inMemoryUserRepository, v4IdGateway, bcryptGateway);


describe('Unit - SignUp', () => {
    it('should create a user', () => {
        const result = signUp.execute({
            userName: "bibi",
            connexionType: "email",
            email: "bibi@mail.com",
            password: "bibi",
            picture: "",
        });
        expect(result.props.id).toBeTruthy();
        expect(result.props.userName).toEqual("bibi");
        expect(result.props.connexionType).toEqual("email");
        expect(result.props.email).toEqual("bibi@mail.com");
        expect(bcryptGateway.decrypt("bibi", result.props.password)).toEqual(true);
        //expect(result.props.picture).toEqual("");
        expect(result.props.created).toBeTruthy();
        //expect(result.props.updated).toEqual(null);
        expect(result.props.organisation).toEqual([]);
    })

    it("should throw user already exists", () => {
        const user = new User({
            id: v4IdGateway.generate(),
            userName: "jojo",
            connexionType: "email",
            email: "jojo@mail.com",
            password: bcryptGateway.encrypt("jojo"),
            created: null,
            updated: null,
            picture: "",
            organisation: []
        })
        inMemoryUserRepository.save(user)

        const result = () => signUp.execute({
            userName: "jojo",
            connexionType: "email",
            email: "jojo@mail.com",
            password: "jojo",
            picture: "",
        });
        expect(() => {
            result()
        }).toThrow();
    });
});

