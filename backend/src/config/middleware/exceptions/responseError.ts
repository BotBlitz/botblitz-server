import { HttpStatusCode } from '../../../helpers/httpStatusCode'


export class ResponseError {
    public readonly code: number;
    public readonly isOperational: boolean;
    public readonly name: string;
    public readonly message: string;
    public readonly description: string;

    constructor(parameters:any){
        let {code, name, message, description, isOperational} = parameters
        this.code = code;
        this.name = name;
        this.message = message;
        this.description = description;
        this.isOperational = isOperational
    }
  }