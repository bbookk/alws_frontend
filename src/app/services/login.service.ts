import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {
  }

  responseData(login_data) {
    return this.http.post("/api/loginUser=success",
      JSON.stringify({
        login_token: login_data,
      })
    );
  }


  loginIDS() {
    //return this.http.get("/login/ids");

    window.location.href = 'https://10.137.16.118/login/ids';
  }




}
