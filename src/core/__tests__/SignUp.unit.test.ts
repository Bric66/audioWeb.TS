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

    it('should create a user', async () => {
        const result = await signUp.execute({
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

    it("should throw user already exists", async () => {
        const email = "zzzzzz"
        const user = new User({
            id: v4IdGateway.generate(),
            userName: "jojo",
            connexionType: "email",
            email: email,
            password: bcryptGateway.encrypt("jojo"),
            created: null,
            updated: null,
            picture: "",
            organisation: []
        })
        await inMemoryUserRepository.create(user)

        const result = signUp.execute({
            userName: "jojo",
            connexionType: "email",
            email: email,
            password: "jojo",
            picture: "",
        });

        await expect(result).rejects.toThrowError(new Error('user already exists'))

    });
});

