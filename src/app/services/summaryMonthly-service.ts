import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { HttpHeaders,HttpClient,HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class SummaryMonthlyService {
    constructor(private http: HttpClient) {
    }

    responseData(search_data) {

        return this.http.post("/api/report/getSummaryMonthly?Type="+search_data.empType,
    
          //new
          JSON.stringify({
            search_monthly: search_data,
          })
        );

    }

}
