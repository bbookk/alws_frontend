import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SetupService {
    constructor(private http: HttpClient) {
    }

    getUpdateSpecialData(data) {
        return this.http.post("/api/setup/save-specialday", JSON.stringify({
            "specialday_update_request": {
              specialday: data
            }
          })).toPromise();
    }

    getInitSpecialData(){
        return this.http.get("/api/setup/specialday").toPromise();
    }

    getInitConfigData(){
        return this.http.get("/api/setup/config").toPromise();
    }

    getInitWelfareData(){
        return this.http.get("/api/setup/welfare").toPromise();
    }

    getInitAccData(){
        return this.http.get("/api/setup/acc").toPromise();
    }

    getInitUserroleData(){
        return this.http.get("/api/setup/userrole").toPromise();
    }

    getInitUserdetailData(){
        return this.http.get("/api/setup/userdetail").toPromise();
    }

    getInitOtsaosetuData(){
        return this.http.get("/api/setup/userdetail").toPromise();
    }

    getInitKeywordData(){
        return this.http.get("/api/setup/keyword").toPromise();
    }

    getInitMaxUserData(){
        return this.http.get("/api/setup/maxuser").toPromise();
    }

    getInitOtSapData(): any {
         return this.http.get("/api/setup/otsap").toPromise();
    }

    getInitOtSapDetailData(): any {
         return this.http.get("/api/setup/otsapdetail").toPromise();
    }
}