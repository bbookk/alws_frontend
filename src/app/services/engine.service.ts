import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EngineService {
  constructor(private http: HttpClient) {
  }

  getInitUserdetailData(){
    return this.http.get("/api/setup/userdetail").toPromise();
  }



}
