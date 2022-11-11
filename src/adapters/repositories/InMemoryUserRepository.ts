import {UserRepository} from "../../core/repositories/UserRepository";
import {User} from "../../core/Entities/User";

export const dbUser = new Map<string,User>();

export class InMemoryUserRepository implements UserRepository{
    saveByEmail(user: User) :void{
        dbUser.set(user.props.email,user);
    }


    getByEmail(email:string):User {
       const user = dbUser.get(email);
       return user;
    }

    getById(id: string): User {
        const user = dbUser.get(id);
        return user;
    }
}