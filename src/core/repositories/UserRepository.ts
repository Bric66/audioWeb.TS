import {User} from "../Entities/User";
import {UserUpdatedInput} from "../Usecases/user/UpdateUser";

export interface UserRepository {
    create(user: User): Promise<User>;

    getByEmail(email: string): Promise<User>;

    getById(id: string): Promise<User>;

    update(userInput: UserUpdatedInput): Promise<User>;

}