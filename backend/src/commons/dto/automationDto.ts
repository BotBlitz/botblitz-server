import { IAutomation } from "../interface/IAutomation";

export class AutomationDto implements IAutomation {

    public _id: String;
    public name: String;
    public code: String;
    public filename: String;
    public description: String;
    public checksum: String;
    public version: String;
    public lastVersions: Number[];
    public createdBy: String;
    public createdAt: String;


    constructor(parameters :any){
        let { _id, name, code, filename, description, version, lastVersions, checksum, createdBy, createdAt } = parameters;
        
        this._id = _id;        
        this.code = code;
        this.name = name;
        this.filename = filename
        this.description = description;
        this.version = version;
        this.lastVersions = lastVersions;
        this.checksum = checksum;
        this.createdBy = createdBy;
        this.createdAt = createdAt
    }

}
