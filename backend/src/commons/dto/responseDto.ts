import { HttpStatusCode } from "../../helpers/httpStatusCode";
import { IResponse } from "../interface/IResponse";

export class Response implements IResponse{

    code: number = HttpStatusCode.OK;
    message?: string;
    data?: any;

}
