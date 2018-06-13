
import { BrowserModule, } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute, Routes } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { HttpModule } from '@angular/http';
import { MyDatePickerModule } from 'angular4-datepicker/src/my-date-picker';
import { GoTopButtonModule } from 'ng2-go-top-button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared.module';
import { TestService } from './services/test-service';
import { SummaryDailyService } from './services/summaryDaily-service';
import { SummaryMonthlyService } from './services/summaryMonthly-service';
import { SummarySupervisorService } from './services/summarySupervisor-service';
import { SummarySuperSearchService } from './services/summarySuperSearch-service';
import { SummaryOrganizationService } from './services/summaryOrganization-service';
import { SummaryAdjustService } from './services/summaryAdjust-service';
import { ApproveAllowanceService } from './services/approveAllowance-service';
import { LoginService } from './services/login.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MyInterceptor } from './http/myInterceptor';
import { ReportModule } from './modules/report.module';
import { enableProdMode } from '@angular/core';
import { LoadingModule } from 'ngx-loading';
import { CommonUtils } from './component/shared/common.component';
import { CanActivateViaAuthGuard } from './services/auth-guard.service';
import { SetupService } from './services/setup.service';
import { LoginC2aComponent } from './component/authen/login-c2a/login-c2a.component';
import { LoginC2aService } from './services/login-c2a-service';
import { EmployeeService } from './services/employee.service';
import { ModalComponent } from './component/shared/modal.component';
import { EngineService } from './services/engine.service';
import { SharedVariables } from './services/shared.service';
import { AuthorizeService } from './services/authorize.service';
import { ModalTemplateComponent } from './component/shared/modal-template.component';
const APP_ROUTE: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'loginC2a', component: LoginC2aComponent },
  // { path: 'home/:pin', component: HomeComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: 'home/:pin', component: HomeComponent },
  { path: 'report', loadChildren: './modules/report.module#ReportModule' },
  { path: 'setup', loadChildren: './modules/setup.module#SetupModule' },
  { path: 'engine', loadChildren: './modules/engine.module#EngineModule' }
];
enableProdMode();
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    LoginC2aComponent,
    ModalComponent,
    ModalTemplateComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(APP_ROUTE),
    HttpClientModule,//new for ang4
    FormsModule,
    BrowserAnimationsModule,
    SharedModule,
    LoadingModule
  ],
  providers: [TestService,
    SummaryDailyService,
    LoginService,
    SummaryMonthlyService,
    SummarySupervisorService,
    SetupService,
    SummarySuperSearchService,
    SummaryOrganizationService,
    SummaryAdjustService,
    ApproveAllowanceService,
    LoginC2aService,
    EmployeeService,
    CommonUtils,
    EngineService,
    SharedVariables,
    AuthorizeService,
    CanActivateViaAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
