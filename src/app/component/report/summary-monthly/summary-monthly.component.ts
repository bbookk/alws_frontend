import { Component, OnInit , HostListener } from '@angular/core';
import { IMyDpOptions,  IMyDateModel } from 'angular4-datepicker/src/my-date-picker';
import { Router } from '@angular/router';
import { SummaryMonthlyService } from '../../../services/summaryMonthly-service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonUtils } from '../../shared/common.component';

@Component({
  selector: 'app-summary-monthly',
  templateUrl: './summary-monthly.component.html',
  styleUrls: ['./summary-monthly.component.scss']
})
export class SummaryMonthlyComponent implements OnInit {

  public SUPERVISOR = 'Supervisor';
  public showResult: boolean = false;
  public searchBy: string = 'NAME';
  public name: string;
  public surname: string;
  public pin: string;
  public dateTo: string;
  public dateFrom: string;
  public empType : string;
  private KEYCODE_ENTER = 13;

  public employeeDetail = {
    pin: '',
    name: '',
    bl: '',
    company: '',
    bu: '',
    department: ''
  }

  public searchDetail = {
    empType : '',
    name: '',
    surname: '',
    pin: '',
    dateFrom: '',
    dateTo: ''
  }

  public resultRecord = [];

  public myDatePickerOptions: IMyDpOptions = {

    dateFormat: 'dd/mm/yyyy',
    showClearDateBtn: false,
    showTodayBtn: false,
    editableDateField: false,
    openSelectorOnInputClick: true,
    selectorWidth: '200px',
    selectorHeight: '200px'

  };


  constructor(private router : Router, 
    private summaryMonthlyService : SummaryMonthlyService ,
    private commonUtils:CommonUtils) { }

  ngOnInit() {
    this.empType = 'Agent';
  }

  clickedSearch() {
    this.getData();
    this.showResult = true;
  }

  getData() {
    console.log(this.searchDetail);
    this.searchDetail.empType = this.empType;
    this.searchDetail.name = this.name;
    this.searchDetail.surname = this.surname;
    this.searchDetail.pin = this.pin;
    this.searchDetail.dateFrom = this.dateFrom;
    this.searchDetail.dateTo = this.dateTo;
    this.commonUtils.onStart();
    this.summaryMonthlyService.responseData(this.searchDetail).subscribe(
      res=> {
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
      const obj = data.searchMonthlyResp.employeeDetail;
      this.employeeDetail.pin = obj.pin;
      this.employeeDetail.name = obj.name;
      this.employeeDetail.bl = obj.bl;
      this.employeeDetail.company = obj.company;
      this.employeeDetail.bu = obj.bu;
      this.employeeDetail.department = obj.department;

      this.resultRecord = data.searchMonthlyResp.resultRecord;
    } else if (data.header.status == 'F') {
      console.log("error");
    }
  }


  onDateChanged_to(event: IMyDateModel) {
    this.dateTo = event.formatted;
    // console.log(event.formatted);
  }

  onDateChanged_from(event: IMyDateModel) {
    this.dateFrom = event.formatted;
    // console.log(event.formatted);
  }

  onChangeEmpType(){
    console.log("change emptype")
    this.showResult = false;
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === this.KEYCODE_ENTER) {
      console.log('enter is pressed!')
    }
  }

} 
