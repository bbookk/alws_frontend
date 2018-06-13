import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonUtils } from '../shared/common.component';
import { LoginC2aService } from '../../services/login-c2a-service';
import { SharedVariables } from '../../services/shared.service';
import { EmployeeService } from '../../services/employee.service';
import { AuthorizeService } from '../../services/authorize.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public visible = false;
  public visibleAnimate = false;
  public time: string;
  public day: string;
  public isHome = false;
  currentLanguage: string;

  public menu: any;
  public mainMenu: any;

  @ViewChild('modal') modal;
  constructor(public router: Router,
    public commonUtils: CommonUtils, public loginC2aService: LoginC2aService,
    public shardService: SharedVariables,
    public employeeService: EmployeeService,
    public authorizeService: AuthorizeService) {
    var m_names = new Array("Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul", "Aug", "Sep",
      "Oct", "Nov", "Dec");

    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth();
    var curr_year = d.getFullYear();

    setInterval(() => {
      this.time = new Date().toTimeString().split(" ")[0];
      this.day = curr_date + " " + m_names[curr_month] + " " + curr_year;
    }, 1);
  }

  ngOnInit() {
    let self = this;
    this.menu = this.authorizeService.getMenu()
    this.currentLanguage = 'TH';
    this.mainMenu = this.authorizeService.getMainMenu()
 
    // if (this.shardService.getUserInfoResp() == null) {
    //   this.employeeService.getEmployeeDetail('00020180').then((resp: any) => {
    //     self.shardService.setUserInfoResp(resp.employee_info);
    //     self.authorizeService.setPermission(self.shardService.getListRole())
    //   }).catch((error) => {
    //     throw (error)
    //   });
    // } else {
    //   let x = self.shardService.getUserInfoResp();
    //   console.log(x)
    // }
  }

  isHidden(menuid) {
    return this.authorizeService.checkPermission(menuid)
  }
  isHiddenMain(menuid) {
    return this.authorizeService.checkPermissionMain(menuid)
  }

  openNav(event) {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
    document.getElementById("mySidenav").style.marginLeft = "0";
  }

  closeNav(event) {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
    document.getElementById("mySidenav").style.marginLeft = "-270px";
  }

  onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.closeNav(event);
    }
  }

  changeLanguage(lang) {
    // this.translateService.use(lang);
    this.currentLanguage = lang;
    this.commonUtils.switchLang(this.currentLanguage);
  }

  clickLogout() {
    let isLogout = this.loginC2aService.logout()
    if (isLogout) {
      this.modal.show();
    }
    this.modal.show();
  }


}
