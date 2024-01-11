import mongoose from "mongoose";
import { IUser } from "../interface/IUser";
import { IRepository } from "../interface/IRepository";
import { randomUUID } from "crypto";

const userSchema = new mongoose.Schema({
    code: {
        type: String,
        require: true,
        unique: true,
    },
    
    name: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    launcherToken: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        require: true,
    },
    expiration_date: {
        type: Date,
        require:false
    },
    automations: {
        type: [String],
        require: true,
    },
    createdAt: {
        type: Date,
        require: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        require: true
    }

}, { collection: 'users' })

type UserType = IUser & mongoose.Document
const UserModel = mongoose.model<UserType>('user', userSchema)

class UserRepository implements IRepository{

    public async findAll() {
        return UserModel.find().select('-password').exec();    
    }

    public async findByCode(code:string){      
        return await UserModel.findOne({code: code}).select('-password').exec();
    }

    public async findById(id: string) {
        return await UserModel.findById(id).select('-password').exec();
    }

    public async findByUsername(username:string){
        return await UserModel.findOne({username: username});
    }

    public async save(user: IUser){    
        user.code = randomUUID()
        let entity = await UserModel.findOne({code:user.code}).select('-password').exec();
        if (!entity){
            await UserModel.create(user);
            return;
        }
        await UserModel.updateOne({code:user.code}, user)
    }
}

export const userRespository = new UserRepository()