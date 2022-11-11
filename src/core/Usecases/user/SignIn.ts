import {UseCase} from "../Usecase";
import {User} from "../../Entities/User";
import {UserRepository} from "../../repositories/UserRepository";
import {PasswordGateway} from "../../gateways/PasswordGateway";

export type UserInput = {
    email: string,
    password: string,
}

export class SignIn implements UseCase<UserInput, User> {

    constructor(private readonly userRepository: UserRepository,
                private readonly passwordGateway: PasswordGateway) {
    }

    execute(input: UserInput): User {
        const userExists = this.userRepository.getByEmail(input.email.toLowerCase().trim());
        if (!userExists) {
            throw new Error('user not found')
        }
        const hash = userExists.props.password

        const comparePasswords = this.passwordGateway.decrypt(input.password, hash)
        if (!comparePasswords) {
            throw new Error('user not found')
        }

        return userExists;
    }
}