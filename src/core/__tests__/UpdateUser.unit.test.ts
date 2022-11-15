import {User} from "../Entities/User";
import {InMemoryUserRepository} from "./repositories/InMemoryUserRepository";
import {BcryptGateway} from "./gateways/BcryptGateway";
import {UpdateUser} from "../Usecases/user/UpdateUser";

const inMemoryUserRepository= new InMemoryUserRepository();
const bcryptGateway= new BcryptGateway();
const updateUser= new UpdateUser(inMemoryUserRepository, bcryptGateway);



describe('Unit - UpdateUser', () => {
    const user = new User({
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
    const userId=user.props.id
    inMemoryUserRepository.save(user)

    it('should update user', () => {

        const result = updateUser.execute({
            userName: "1234",
            connexionType: "google",
            email: "bibi@gmail.com",
            password: "5678",
            picture: "image.jpg",
            updated: null,
            userId: user.props.id
        });

        expect(result.props.id).toEqual("111")
        expect(result.props.userName).toEqual("1234");
        expect(result.props.connexionType).toEqual("google");
        expect(result.props.email).toEqual("bibi@gmail.com");
        expect(bcryptGateway.decrypt("5678",result.props.password)).toEqual(true);
        expect(result.props.picture).toEqual("image.jpg");
        expect(result.props.created).toEqual(null);
        expect(result.props.updated).toEqual(null);
        expect(result.props.organisation).toEqual([]);
    })
});