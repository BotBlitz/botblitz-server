import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import {  Observable } from "rxjs";
import { CommonService } from "./commonService";
import { environment } from "@environment";
import { Path } from "@commons/enums/pathEnum";

@Injectable({
    providedIn: 'root'
})
export class UserService extends CommonService {

    constructor(private httpClient: HttpClient) {
        super()
    }

    findAllUsers(): Observable<any> {
        return this.httpClient.get<any>(environment.url + Path.USER_FIND_ALL, this.httpOptions)
    }
}