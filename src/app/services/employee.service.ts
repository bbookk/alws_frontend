import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonUtils } from './../component/shared/common.component';
@Injectable()
export class EmployeeService {
    constructor(private http: HttpClient, private commonUtils: CommonUtils, private _router: Router) {
    }

    getUserInfo() {
        return this.http.get("/api/employee");
    }

    checkStatus(data) {
        if (data.header.status == 'S') {
            return true
        } else if (data.header.status == 'F') {
            return false
        }
    }

    getEmployeeDetail() {
        let self = this
        return new Promise((resolve, reject) => {
      
          self.getUserInfo().subscribe(
            res => {
              if (self.checkStatus(res)) {
                resolve(res);
              } else {
                reject("Status Not Success");
                return
              }
              self.commonUtils.onStop();
            },
            (err: HttpErrorResponse) => {
              if (err.error instanceof Error) {
                reject("Client-side error occured.");
              } else {
                reject("Server-side error occured.");
      
              }
              self.commonUtils.onStop();
            }
          );
        });
      }

    






}
