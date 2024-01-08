import { HttpHeaders } from "@angular/common/http";

export class CommonService {
    protected httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': '*/*',
        })
    }
}