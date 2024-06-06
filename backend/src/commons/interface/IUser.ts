import { IUserRole } from "./IUserRole";

export interface IUser {
    idUser?:number;
    name?:string;
    username?:string;
    password?:string;
    status?:string;
    isAdmin?:number;
    roles?:IUserRole[];
    createAt?:Date;
    updateAt?:Date;
}