import {UseCase} from "../Usecase";
import {User} from "../../Entities/User";
import {UserRepository} from "../../repositories/UserRepository";
import {PasswordGateway} from "../../gateways/PasswordGateway";

export type UserInput = {
    userName: string,
    connexionType: string,
    email: string,
    password: string,
    picture: string,
    accessToken: string
}

export class UpdateUser implements UseCase<UserInput, User> {

    constructor(private readonly userRepository: UserRepository,
                private readonly passwordGateway: PasswordGateway) {

    }

    execute(input: UserInput): User {
        const user = this.userRepository.getByEmail(input.accessToken);
        user.update({
            userName: input.userName,
            connexionType: input.connexionType,
            email: input.email,
            password:this.passwordGateway.encrypt(input.password) ,
            picture: input.picture,
        })
this.userRepository.saveByEmail(user);

        return user;
    }

}