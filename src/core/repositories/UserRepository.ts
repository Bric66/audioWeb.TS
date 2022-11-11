import {User} from "../Entities/User";

export interface UserRepository {
    save(user: User): void;

    getByEmail(email: string): User;

    getById(id: string): User;
}