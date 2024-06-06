import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommonService } from "./commonService";
import { environment } from "@environment";
import { Path } from "@commons/enums/pathEnum";
import { LicenseResponse } from "@commons/dto/licenseResponse";
import { LicenseRequest } from "@commons/dto/licenseRequest";


@Injectable({
    providedIn: 'root'
})
export class LicenseService extends CommonService {

    constructor(private httpClient: HttpClient) {
        super()
    }

    create(license: LicenseRequest): Observable<LicenseRequest>{
        return this.httpClient.post(environment.urlCloud + Path.LICENSE_CREATE, license, this.httpOptions);
    }

    update(license: LicenseRequest): Observable<LicenseRequest>{
        return this.httpClient.put(environment.urlCloud + Path.LICENSE_CREATE, license, this.httpOptions);
    }

    findAll(): Observable<LicenseResponse> {
        return this.httpClient.get<LicenseResponse>(environment.urlCloud + Path.LICENSE_FIND_ALL, this.httpOptions)
    }
}