import {User} from "../../Entities/User";
import {UserRepository} from "../../repositories/UserRepository";

export const dbUser = new Map<string,User>();

export class InMemoryUserRepository implements UserRepository{
    create(user: User) :Promise<User>{
        dbUser.set(user.props.id,user);
        return Promise.resolve(user)
    }
    getByEmail(email:string):Promise<User> {
        const values = Array.from(dbUser.values());
        const user=values.find(v => v.props.email === email);
        return Promise.resolve(user);
    }
    getById(id: string): Promise<User> {
        const user = dbUser.get(id);
        return Promise.resolve(user);
    }
}