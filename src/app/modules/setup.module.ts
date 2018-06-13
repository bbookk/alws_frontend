import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AccOrganizationPathComponent } from '../component/setup/acc-organization-path/acc-organization-path.component';
import { SpecialDayComponent } from '../component/setup/special-day/special-day.component';
import { SystemConfigComponent } from '../component/setup/system-config/system-config.component';
import { UserRoleComponent } from '../component/setup/user-role/user-role.component';
import { WelfareComponent } from '../component/setup/welfare/welfare.component';
import { KeywordComponent } from '../component/setup/keyword/keyword.component';
import { UserDetailComponent } from '../component/setup/user-detail/user-detail.component';
import { MaxUsersOtCompensationComponent } from '../component/setup/max-users-ot-compensation/max-users-ot-compensation.component';
import { SharedModule } from './shared.module';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyInterceptor } from '../http/myInterceptor';
import { OtSapReportComponent } from '../component/setup/ot-sap-report/ot-sap-report.component';
import { AccOrgPathListComponent } from '../component/setup/acc-organization-path/acc-org-path-list/acc-org-path-list.component';

const SETUP_ROUTES: Routes = [
  { path: '', component: AccOrganizationPathComponent},
  { path: 'acc-organize-path', component: AccOrganizationPathComponent },
  { path: 'special-day', component: SpecialDayComponent },
  { path: 'system-config', component: SystemConfigComponent },
  { path: 'user-role', component: UserRoleComponent },
  { path: 'welfare', component: WelfareComponent },
  { path: 'keyword', component: KeywordComponent },
  { path: 'ot-sap-report', component: OtSapReportComponent },
  { path: 'user-detail', component: UserDetailComponent },
  { path: 'max-Users-ot-Compensation', component: MaxUsersOtCompensationComponent },
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(SETUP_ROUTES),
    ReactiveFormsModule
  ],
  exports: [
    AccOrganizationPathComponent,
    SpecialDayComponent,
    SystemConfigComponent,
    UserRoleComponent,
    WelfareComponent,
    KeywordComponent,
    OtSapReportComponent,
    UserDetailComponent,
    MaxUsersOtCompensationComponent,
    RouterModule,
    AccOrgPathListComponent,
  ],
  declarations: [
    AccOrganizationPathComponent,
    SpecialDayComponent,
    SystemConfigComponent,
    UserRoleComponent,
    WelfareComponent,
    KeywordComponent,
    OtSapReportComponent,
    UserDetailComponent,
    MaxUsersOtCompensationComponent,
    AccOrgPathListComponent,
  ],
  providers:[{
    provide: HTTP_INTERCEPTORS,
    useClass: MyInterceptor,
    multi: true,
  },FormBuilder]
})
export class SetupModule { }
