import {UserRepository} from "../../core/repositories/UserRepository";
import {User} from "../../core/Entities/User";

export class MongoDbUserRepository implements UserRepository{
    save(user: User) :void{
        const userModel = new UserModel(user);
        userModel.save().then()
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