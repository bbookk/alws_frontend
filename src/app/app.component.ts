import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonUtils } from './component/shared/common.component';
import { LoginC2aService } from '../app/services/login-c2a-service';
import { Subscription } from 'rxjs/Subscription';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedVariables } from './services/shared.service';
import { EmployeeService } from './services/employee.service';
import { AuthorizeService } from './services/authorize.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading: boolean;
  constructor(public _router: Router, http: HttpClient,
    public commonUtils: CommonUtils, private activatedRoute: ActivatedRoute,
    private loginC2aService: LoginC2aService,
    private sharedService: SharedVariables,
    private employeeService: EmployeeService,
    private authorizeService: AuthorizeService,
  ) {
    let self = this
    let param = location.search.substring(1).split('&');
    if (param[0] != "") {
      let data = setParamC2A(param);
      if (data.c2aPram) {
        this.commonUtils.onLoad();
        this.loginC2aService.login(data).subscribe(
          res => {
            if (self.loginC2aService.checkStatus(res)) {
              //self.loginC2aService.setToken2Localstorage(res)
              self.setUserInfo(data.pin)
              self.commonUtils.onStop();
            }
          },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              console.log("Client-side error occured.");
            } else {
              console.log("Server-side error occured.");
            }
            self.commonUtils.onStop();
          }
        );
      }
    } else {

      this.commonUtils.onLoad();
      this.bypassPermission() 
      this._router.navigate(['/home', '']);
      this.commonUtils.onStop();
    }

    //this.loginC2aService.
    // this.loading = this.commonUtils.
    // this._router.navigate(['/home']);
  }

  setUserInfo(pin) {

    let self = this
    if (self.sharedService.getUserInfoResp() == null) {
      self.employeeService.getEmployeeDetail().then((resp: any) => {
        self.sharedService.setUserInfoResp(resp.employee_info);
        self.authorizeService.setPermission(self.sharedService.getListRole())
        self._router.navigate(['/home', pin]);
      }).catch((error) => {
        throw (error)
      });
    }

  }

  bypassPermission() {
    let self = this
    self.authorizeService.setPermission(null)
    self._router.navigate(['/home', '']);
  }

  // ngOnInit() {
  //   this.loading = this.commonUtils.onLoad();
  //   this._router.navigate(['/home']);
  // }


}
function setParamC2A(param) {
  let data = {
    pin: '',
    username: '',
    c2aPram: false
  }

  param.forEach(e => {
    if (e.split('=')[0] == 'router') {
      if ('loginC2A' == e.split('=')[1]) {
        data.c2aPram = true
      } else {
        data.c2aPram = false
      }
    }
    if (e.split('=')[0] == 'pin') {
      data.pin = e.split('=')[1]
    } if (e.split('=')[0] == 'username') {
      data.username = e.split('=')[1]
    }
  })

  return data

}



