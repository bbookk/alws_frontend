import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { CommonUtils } from '../shared/common.component';
import { Subscription } from 'rxjs/Subscription';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SharedVariables } from '../../services/shared.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})



export class HomeComponent implements OnInit {

  wordObj = {
    username: '',
    position: '',
    department: '',
    lastLogin: ''
  }

  objUserInfo = {}
  pin: number;

  constructor(
    public employeeService: EmployeeService,
    public commonUtils: CommonUtils,
    public route: ActivatedRoute,
    public shardService: SharedVariables
  ) { }

  ngOnInit() {
    let self = this;

    if (this.shardService.getUserInfoResp() == null) {
      this.employeeService.getEmployeeDetail().then((resp: any) => {
        console.log(resp)
        setUserInfo(resp, self);
        setInformation2Screen(resp, self);
      }).catch((error) => {
        throw (error)
      });
    } else {
      let x = self.shardService.getUserInfoResp();
      console.log(x)
    }

    this.route.params.subscribe(params => {
      self.pin = +params['pin']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
    });
    if (self.pin != 0) {
      this.commonUtils.onStart();
      this.employeeService.getUserInfo().subscribe(
        res => {
          if (this.employeeService.checkStatus(res)) {
            setUserInfo(res, self)
            setInformation2Screen(res, self);
          } else {

          }
          this.commonUtils.onStop();
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
          this.commonUtils.onStop();
        }
      );
    }
  }
}

function setUserInfo(res, self) {
  let employeeInfo = res.employee_info

  for (let obj in employeeInfo) {
    self.objUserInfo[obj] = employeeInfo[obj]
  }
}

function setInformation2Screen(data, self) {
  let employeeInfo = data.employee_info
  self.wordObj.username = employeeInfo.name_th + " " + employeeInfo.surname_th;
  self.wordObj.position = employeeInfo.position;
  self.wordObj.department = employeeInfo.org_name;
  self.wordObj.lastLogin = '';
}
