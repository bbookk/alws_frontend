import { Component, OnInit, HostListener } from '@angular/core';
import { IMyDpOptions, IMyDateModel } from 'angular4-datepicker/src/my-date-picker';
import { SummaryAdjustService} from '../../../services/summaryAdjust-service'
import { HttpErrorResponse } from '@angular/common/http';
import { CommonUtils } from '../../shared/common.component';

@Component({
  selector: 'app-summary-adjust-report',
  templateUrl: './summary-adjust-report.component.html',
  styleUrls: ['./summary-adjust-report.component.scss']
})
export class SummaryAdjustReportComponent implements OnInit {

  public showResult:boolean = false;
  public showPin:boolean = false;
  public showName:boolean = true;
  public dateTo: string;
  public dateFrom: string;
  public company : string;
  public businessUnit : string;
  public department : string;
  public section : string;
  public function : string;
  private KEYCODE_ENTER = 13;

  public resultRecord = [];

  public searchDetail = {
    company : '',
    businessUnit : '',
    department : '',
    section : '',
    function : '',
    dateFrom : '',
    dateTo : ''
  }

  public myDatePickerOptions: IMyDpOptions = {

    dateFormat: 'dd/mm/yyyy',
    showClearDateBtn: false,
    showTodayBtn: false,
    editableDateField: false,
    openSelectorOnInputClick: true,
    selectorWidth: '200px',
    selectorHeight: '200px'
    
  };
  

  constructor(private summaryAdjustService : SummaryAdjustService,
    private commonUtils:CommonUtils) {}

  ngOnInit() {
  }

  clickedSearch() {
    this.showResult = true;
    this.getData();
  }

  onDateChanged_to(event: IMyDateModel) {
    this.dateTo = event.formatted;
    // console.log(event.formatted);
  }

  onDateChanged_from(event: IMyDateModel) {
    this.dateFrom = event.formatted;
    // console.log(event.formatted);
  }

  getData() {
    console.log(this.searchDetail);
    this.searchDetail.company = this.company;
    this.searchDetail.businessUnit = this.businessUnit;
    this.searchDetail.department = this.department;
    this.searchDetail.section = this.section;
    this.searchDetail.function = this.function;
    this.searchDetail.dateFrom = this.dateFrom;
    this.searchDetail.dateTo = this.dateTo;
    this.commonUtils.onStart();
    this.summaryAdjustService.responseData(this.searchDetail).subscribe(
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
      this.resultRecord = data.searchAdjustResp.resultRecord;
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
