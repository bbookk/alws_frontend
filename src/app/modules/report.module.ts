import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule} from './shared.module';
import { SummaryDailyComponent } from '../component/report/summary-daily/summary-daily.component';
import { SummaryMonthlyComponent } from '../component/report/summary-monthly/summary-monthly.component';
// import { SummaryMonthlySupervisorComponent } from '../component/report/summary-monthly-supervisor/summary-monthly-supervisor.component';
import { SummarySupervisorComponent } from '../component/report/summary-supervisor/summary-supervisor.component';
import { SummarySuperSearchComponent } from '../component/report/summary-super-search/summary-super-search.component';
import { SummaryOrganizationComponent } from '../component/report/summary-organization/summary-organization.component';
import { ApproveAllowanceReportComponent } from '../component/report/approve-allowance-report/approve-allowance-report.component';
import { SummaryAdjustReportComponent } from '../component/report/summary-adjust-report/summary-adjust-report.component';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { MyInterceptor } from '../http/myInterceptor';

const REPORT_ROUTES: Routes = [
  { path: '', component: SummaryDailyComponent},
  { path: 'summary-daily', component: SummaryDailyComponent },
  { path: 'summary-monthly', component: SummaryMonthlyComponent },
  // { path: 'summary-monthly-supervisor', component: SummaryMonthlySupervisorComponent },
  { path: 'summary-supervisor', component: SummarySupervisorComponent },
  { path: 'summary-super-search', component: SummarySuperSearchComponent },
  { path: 'summary-organization', component: SummaryOrganizationComponent },
  { path: 'approve-allowance-report', component: ApproveAllowanceReportComponent },
  { path: 'summary-adjust-report', component: SummaryAdjustReportComponent },
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(REPORT_ROUTES)
    
  ],
  exports: [
    SummaryDailyComponent,
    SummaryMonthlyComponent,
    // SummaryMonthlySupervisorComponent,
    SummarySupervisorComponent,
    SummarySuperSearchComponent,
    SummaryOrganizationComponent,
    ApproveAllowanceReportComponent,
    SummaryAdjustReportComponent,
    RouterModule,
  ],
  declarations: [
    SummaryDailyComponent,
    SummaryMonthlyComponent,
    // SummaryMonthlySupervisorComponent,
    SummarySupervisorComponent,
    SummarySuperSearchComponent,
    SummaryOrganizationComponent,
    ApproveAllowanceReportComponent,
    SummaryAdjustReportComponent,
  ],
  providers:[{
    provide: HTTP_INTERCEPTORS,
    useClass: MyInterceptor,
    multi: true,
  }]

})
export class ReportModule { }
