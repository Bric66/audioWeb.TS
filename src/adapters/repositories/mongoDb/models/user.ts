import {model, Schema} from "mongoose";

const userSchema = new Schema({
    id: {
        type: String,
    },
    userName: {
        type: String,
    },
    connexionType: {
        type:String,
    },
    email: {
        type:String,
    },
    password: {
        type:String,
    },
    created: {
        type: Date,
    },
    updated: {
        type: Date,
    },
    picture: {
        type: String,
    },
    organisation: {
        type: []
    }
})

export const UserModel=model('User',userSchema)