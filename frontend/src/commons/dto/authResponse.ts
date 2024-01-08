import { CommonResponse } from "./commonResponse";
import { Permission } from "./permissionDto";

export class AuthResponse {
    code?: string;
    name?:string;
    token?: string;
    role?: Permission[];
}