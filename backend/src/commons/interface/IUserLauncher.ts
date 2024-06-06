import { IAutomation } from "./IAutomation";

export interface IUserLauncher {
    _id:string;
    code:string;
    name:string;
    username: string;
    password: string;
    launcherToken: string;
    status: string;
    expirationDate: Date;
    automations: IAutomation[];
    createdAt:Date;
    updatedAt:Date;
}