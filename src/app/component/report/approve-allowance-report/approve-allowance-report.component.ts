import { Component, OnInit , HostListener} from '@angular/core';
import { IMyDpOptions, IMyDateModel } from 'angular4-datepicker/src/my-date-picker';
import { Headers, Http, RequestOptions, RequestMethod, ResponseContentType } from '@angular/http';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { ApproveAllowanceService } from '../../../services/approveAllowance-service';
import { CommonUtils } from '../../shared/common.component';

@Component({
  selector: 'app-approve-allowance-report',
  templateUrl: './approve-allowance-report.component.html',
  styleUrls: ['./approve-allowance-report.component.scss']
})
export class ApproveAllowanceReportComponent implements OnInit {

  public showResult: boolean = false;
  public showPin: boolean = false;
  public showName: boolean = true;
  public month: string;
  public company: string;
  public businessUnit: string;
  public department: string;
  public section: string;
  public function: string;
  public empType: string;
  private KEYCODE_ENTER = 13;

  public result;
  public resultRecord = [];

  public searchDetail = {
    company: '',
    businessUnit: '',
    department: '',
    section: '',
    function: '',
    month: '',
    empType: ''
  }

  public myDatePickerOptions: IMyDpOptions = {

    dateFormat: 'mm/yyyy',
    showClearDateBtn: false,
    showTodayBtn: false,
    editableDateField: false,
    openSelectorOnInputClick: true,
    selectorWidth: '200px',
    selectorHeight: '200px'

  };


  constructor(private approveAllowanceervice : ApproveAllowanceService,
    private commonUtils:CommonUtils) { }

  ngOnInit() {
  }

  clickedSearch() {
    this.showResult = true;
    this.getData();
  }

  onDateChanged(event: IMyDateModel) {
    this.month = event.formatted;
    // console.log(event.formatted);
  }


  getData() {
    console.log(this.searchDetail);
    this.searchDetail.company = this.company;
    this.searchDetail.businessUnit = this.businessUnit;
    this.searchDetail.department = this.department;
    this.searchDetail.section = this.section;
    this.searchDetail.function = this.function;
    this.searchDetail.month = this.month;
    this.searchDetail.empType = this.empType;
    this.commonUtils.onStart();
    this.approveAllowanceervice.responseData(this.searchDetail).subscribe(
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
      this.resultRecord = data.searchApproveResp.resultRecord;
      //console.log(pin,name,bl,company,bu,department);
    } else if (data.header.status == 'F') {
      console.log("error");
    }
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === this.KEYCODE_ENTER) {
      console.log('enter is pressed!')
    }
  }
}
