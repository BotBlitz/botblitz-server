import { CommonResponse } from "./commonResponse";
import { Permission } from "./permissionDto";

export class AuthResponse {
    idUser?: number;
    name?:string;
    token?: string;
    roles?: Permission[];
}