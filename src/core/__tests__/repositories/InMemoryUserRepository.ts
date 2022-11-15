import {User} from "../../Entities/User";
import {UserRepository} from "../../repositories/UserRepository";


export const dbUser = new Map<string,User>();

export class InMemoryUserRepository implements UserRepository{
    save(user: User) :void{
        dbUser.set(user.props.id,user);
    }
    getByEmail(email:string):User {
      const values = Array.from(dbUser.values());
      const user=values.find(v => v.props.email === email);
      return user;
    }
    getById(id: string): User {
        const user = dbUser.get(id);
        return user;
    }
}