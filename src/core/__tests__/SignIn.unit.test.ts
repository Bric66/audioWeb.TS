import {BcryptGateway} from "./gateways/BcryptGateway";
import {InMemoryUserRepository} from "./repositories/InMemoryUserRepository";
import {SignIn} from "../Usecases/user/SignIn";
import {User} from "../Entities/User";


const bcryptGateway = new BcryptGateway();
const inMemoryUserRepository = new InMemoryUserRepository();
const signIn = new SignIn(inMemoryUserRepository, bcryptGateway);


describe('Unit - SignIn', () => {
    let user: User
    beforeAll(() => {
        user = new User({
            id: "111",
            userName: "222",
            connexionType: "email",
            email: "jojo@gmail.com",
            password: bcryptGateway.encrypt("1234"),
            created: null,
            updated: null,
            picture: "",
            organisation: []
        })
        inMemoryUserRepository.save(user)
    })

    it('should connect jojo with the good password', () => {

        const result = signIn.execute({
            email: user.props.email,
            password: "1234",
        });

        expect(result.props.id).toEqual("111")
        expect(result.props.userName).toEqual("222");
        expect(result.props.connexionType).toEqual("email");
        expect(result.props.email).toEqual("jojo@gmail.com");
        expect(bcryptGateway.decrypt("1234", result.props.password)).toEqual(true);
        expect(result.props.picture).toEqual("");
        expect(result.props.created).toEqual(null);
        expect(result.props.updated).toEqual(null);
        expect(result.props.organisation).toEqual([]);
    })
    it('should not connect jojo with the wrong password', () => {
        const result = () => signIn.execute({
            email: user.props.email,
            password: "bad password",
        });
        expect(() => {
            result()
        }).toThrow();
    })

    it("should throw if user doesn't exist", () => {
        const result = () => signIn.execute({
            email: "bad mail",
            password: "password",
        });
        expect(() => {
            result()
        }).toThrow();
    });
});