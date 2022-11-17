import {UseCase} from "../Usecase";
import {User} from "../../Entities/User";
import {UserRepository} from "../../repositories/UserRepository";
import {PasswordGateway} from "../../gateways/PasswordGateway";

export type UserUpdatedInput = {
    userName: string,
    connexionType: string,
    email: string,
    password: string,
    picture: string,
    updated: Date,
    userId: string
}

export class UpdateUser implements UseCase<UserUpdatedInput, User> {

    constructor(private readonly userRepository: UserRepository,
                private readonly passwordGateway: PasswordGateway) {
    }

    async execute(input: UserUpdatedInput): Promise<User> {

        const user = await this.userRepository.update({
            userId: input.userId,
            userName: input.userName,
            connexionType: input.connexionType,
            email: input.email,
            password: this.passwordGateway.encrypt(input.password),
            picture: input.picture,
            updated: input.updated
        });

        return Promise.resolve(user);
    }
}