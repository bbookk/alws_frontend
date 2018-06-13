import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonUtils } from './../component/shared/common.component';
@Injectable()
export class LoginC2aService {
    constructor(private http: HttpClient, private commonUtils: CommonUtils, private _router: Router) {
    }

    responseData(login_data) {
        return this.http.post("/api/loginUser=success",
            JSON.stringify({
                login_token: login_data,
            })
        );
    }


    login(data) {
        return this.http.post("/api/login",
            JSON.stringify({
                'login_info': {
                    'pin': data.pin,
                    'username': data.username
                }
            })
        )
    }

    logout() {
        this.commonUtils.onStart();
        this.http.post("/api/logout",
            JSON.stringify({
                'logout_info': {
                    'token': 'data.token',
                }
            })
        ).subscribe(
            res => {
                if (this.checkStatus(res)) {
                    //localStorage.removeItem('token');
                    return true
                }
                this.commonUtils.onStop();
                (err: HttpErrorResponse) => {
                    if (err.error instanceof Error) {
                        console.log("Client-side error occured.");
                    } else {
                        console.log("Server-side error occured.");
                    }
                    this.commonUtils.onStop();

                    return false
                }
            }
        )
    }



    // setToken2Localstorage(data) {
    //     localStorage.setItem("token", data.login_info_resp.token)
    // }

    checkStatus(data) {
        if (data.header.status == 'S') {
            return true
        } else if (data.header.status == 'F') {
            return false
        }
    }






}
