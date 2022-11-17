import {UserRepository} from "../../../core/repositories/UserRepository";
import {User, UserProperties} from "../../../core/Entities/User";
import {UserModel} from "./models/user";
import {UserUpdatedInput} from "../../../core/Usecases/user/UpdateUser";




export class MongoDbUserRepository implements UserRepository {
    async create(user: User): Promise<User> {
        const userModel = new UserModel(user.props);
        await userModel.save().then(() => console.log('User created'));
        return Promise.resolve(user);
    }

    async getByEmail(email: string): Promise<User> {
        const user = await UserModel.findOne({email: email});
        if (!user) {
            return null;
        }
        const userProperties: UserProperties = {
            id: user.id,
            userName: user.userName,
            connexionType: user.connexionType,
            email: user.email,
            password: user.password,
            created: user.created,
            updated: user.updated,
            organisation: user.organisation,
            picture: user.picture
        }
        const userFound = new User(userProperties);
        return Promise.resolve(userFound);
    }

    async getById(id: string): Promise<User> {
        const user = await UserModel.findOne({id: id});
        if (!user) {
            return null
        }
        const userProperties: UserProperties = {
            id: user.id,
            userName: user.userName,
            connexionType: user.connexionType,
            email: user.email,
            password: user.password,
            created: user.created,
            updated: user.updated,
            organisation: user.organisation,
            picture: user.picture
        }
        const userFound=new User(userProperties)
        return Promise.resolve(userFound);
    }

    async update(userInput: UserUpdatedInput): Promise<User> {
        await UserModel.updateOne(
            {id: userInput.userId},
            {
                userName: userInput.userName,
                connexionType: userInput.connexionType,
                email: userInput.email,
                password: userInput.password,
                picture: userInput.picture,
                updated: userInput.updated
            },
            {upsert: true,}
        ).then(() => console.log('User updated'));
        const result=await this.getById(userInput.userId);
        return Promise.resolve(result);
    }
}