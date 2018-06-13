import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { HttpHeaders,HttpClient,HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class SummarySuperSearchService {
    constructor(private http: HttpClient) {
    }

    responseData(search_data) {
        return this.http.post("/api/report/getSummarySuperSearch",
          JSON.stringify({
            search_superSearch: search_data,
          })
        );
      }

}
