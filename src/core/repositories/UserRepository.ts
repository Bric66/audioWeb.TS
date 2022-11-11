import { User } from "../Entities/User";

export interface UserRepository{
    saveByEmail(user: User):void;



    getByEmail(email:string):User;

    getById(id:string):User;
}