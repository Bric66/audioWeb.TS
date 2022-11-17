import {UseCase} from "../Usecase";
import {User} from "../../Entities/User";
import {UserRepository} from "../../repositories/UserRepository";
import {IdGateway} from "../../gateways/IdGateway";
import {PasswordGateway} from "../../gateways/PasswordGateway";

export type UserInput = {
    userName: string;
    connexionType: string;
    email: string;
    password: string;
    picture: string;
}

export class SignUp implements UseCase<UserInput, User> {

    constructor(private readonly userRepository: UserRepository,
                private readonly idGateway: IdGateway,
                private readonly passwordGateway: PasswordGateway) {
    }

    async execute(input: UserInput): Promise<User> {
        const userExists = await this.userRepository.getByEmail(input.email.toLowerCase().trim());
        if (userExists) {
            throw new Error('user already exists')
        }
        const id = this.idGateway.generate();
        const hash = this.passwordGateway.encrypt(input.password)
        const user = User.create({
            id: id,
            userName: input.userName,
            connexionType: input.connexionType,
            email: input.email,
            password: hash,
            picture: input.picture,
        })

        const result=await this.userRepository.create(user);
        return Promise.resolve(result);
    }
}