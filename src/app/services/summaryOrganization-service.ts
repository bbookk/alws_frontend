import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { HttpHeaders,HttpClient,HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class SummaryOrganizationService {
    constructor(private http: HttpClient) {
    }

  responseData(search_data) {
    return this.http.post("/api/report/getSummaryOrganization",
      JSON.stringify({
        search_organization: search_data,
      })
    );
  }

  getCompany(){
    return this.http.get('/api/organize').toPromise();
  }

  getOrganize(value){
    return this.http.get('/api/organize/'+value).toPromise();
  }

}
