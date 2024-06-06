import { AutomationResponse } from "./automationsResponse";

export class LicenseResponse {
    code?:string;
    company?:string;
    expirationDate?:Date;
    status?:string;
    securityToken?:string
    automations?: AutomationResponse[];
}