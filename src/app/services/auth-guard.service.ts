import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonUtils } from './../component/shared/common.component';
import { SharedVariables } from '../services/shared.service';
import { LoginService } from '../services/login.service';
@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private http: HttpClient,
    private commonUtils: CommonUtils,
    private sharedService: SharedVariables,
    private loginService: LoginService) { }

  canActivate() {
    console.log('[AuthGuard]');
    // if (this.isAuthorize()) {
    //   return true;
    // } else {
    //   this.router.navigate(['/login']);
    //   return false;
    // }

    let self = this;
    this.http.get("/api/authen").subscribe(
      (res) => {
        if (this.checkStatus(res)) {
          return true

        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          self.loginService.loginIDS()
          return false

        } else {
          self.loginService.loginIDS()
          return false
        }
      }
    )
    return true

  }




  checkStatus(data) {
    if (data.header.status == 'S') {
      return true
    } else if (data.error.statusCode != 200) {
      return false
    }
  }


}
