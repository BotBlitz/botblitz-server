import { AutomationResponse } from "./automationsResponse";

export class LicenseRequest {
    code?:string;
    company?:string;
    expirationDate?:Date;
    status?:string;
    authorizationToken?:string;
    automations?: AutomationResponse[];
}