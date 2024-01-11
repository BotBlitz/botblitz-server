import { Role } from "./roleDto";

export class Auth {
    idUser?:number;
    name?:string;
    token?:string;
    roles?:Role[];
}