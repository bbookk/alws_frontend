import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonUtils } from '../shared/common.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  currentLanguage: string;
  username : string;
  password : string;

  loginData = {
    username : '',
    password : ''
  }

  constructor(private router : Router, 
    private loginService : LoginService,
    private commonUtils:CommonUtils) { }

  ngOnInit() {
    this.currentLanguage = 'TH';
  }

  clickLogin() {
    // this.router.navigate(['/home']);
    this.getUser();
  }

  changeLanguage(lang) {
    // this.translateService.use(lang);
    this.currentLanguage = lang;
  }

  getUser(){
    console.log(this.loginData);
    this.loginData.username = this.username;
    this.loginData.password = this.password;
    this.commonUtils.onStart();
    this.loginService.responseData(this.loginData).subscribe(
      res => {
        console.log(res);
        this.checkStatus(res);
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

  checkStatus(data) {
    if (data.header.status == 'S') {
      console.log("Success");
    } else if (data.header.status == 'F') {
      console.log("error");
    }
  }


  login() {

    // this.loginService.login().subscribe(
    //   res => {
    //     console.log(res);
    //     this.checkStatus(res);
    //     this.commonUtils.onStop();
    //   },
    //   (err: HttpErrorResponse) => {
    //     if (err.error instanceof Error) {
    //       console.log("Client-side error occured.");
    //     } else {
    //       console.log("Server-side error occured.");
    //     }
    //     this.commonUtils.onStop();
    //   }
    // );
  }

  

}
