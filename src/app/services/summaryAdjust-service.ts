import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SummaryAdjustService {
    constructor(private http: HttpClient) {
    }

    responseData(search_data) {
        return this.http.post("/api/report/getSummaryAdjust",
          JSON.stringify({
            search_summaryAdjust: search_data,
          })
        );
      }

}
