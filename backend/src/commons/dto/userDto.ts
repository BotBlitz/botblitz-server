import { IAutomation } from "../interface/IAutomation";
import { IUser } from "../interface/IUser";

export class User implements IUser {
    _id:string;
    code:string;
    name:string;
    username: string;
    password: string;
    launcherToken: string;
    status: string;
    expirationDate: Date;
    automations: IAutomation[];
    createdAt: Date;
    updatedAt: Date;

    constructor (parameter:any = {}){
        let {  _id, code, name, username, password, launcherToken, status, expirationDate, automations, createdAt, updatedAt } = parameter
        
        this._id = _id;
        this.code = code;
        this.name = name;
        this.username = username;
        this.password = password;
        this.launcherToken = launcherToken;
        this.status = status
        this.automations = automations;
        this.expirationDate = expirationDate;
        this.createdAt  = createdAt;
        this.updatedAt = updatedAt;

    }
}