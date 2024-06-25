import { Role } from "./roleDto";

export class Auth {
    _id?:number;
    name?:string;
    token?:string;
    roles?:Role[];
}