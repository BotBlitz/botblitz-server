import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import {  Observable } from "rxjs";
import { CommonService } from "./commonService";
import { environment } from "@environment";
import { Path } from "@commons/enums/pathEnum";

@Injectable({
    providedIn: 'root'
})
export class AutomationService extends CommonService {

    constructor(private httpClient: HttpClient) {
        super()
    }

    findAll(): Observable<any> {
        return this.httpClient.get<any>(environment.url + Path.AUTOMATION_FIND_ALL, this.httpOptions)
    }

    upload(formData: FormData): Observable<any> {
        
        return this.httpClient.post<any>(environment.urlCloud + Path.AUTOMATION_UPLOAD, formData);
    }
}