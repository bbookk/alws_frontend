import { Component, OnInit, Directive, HostListener } from '@angular/core';
import { IMyDpOptions, IMyDateModel } from 'angular4-datepicker/src/my-date-picker';
import 'rxjs/add/operator/toPromise';
import { SummaryDailyService } from '../../../services/summaryDaily-service';
import { Headers, RequestOptions, RequestMethod, ResponseContentType } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonUtils } from '../../shared/common.component';
import { SharedVariables } from '../../../services/shared.service';
@Component({
  selector: 'app-summary-daily',
  templateUrl: './summary-daily.component.html',
  styleUrls: ['./summary-daily.component.scss'],
})
export class SummaryDailyComponent implements OnInit {

  private KEYCODE_ENTER = 13;

  public showResult: boolean = false;
  public searchBy: string = 'NAME';
  public name: string;
  public surname: string;
  public pin: string;
  public dateTo: string;
  public dateFrom: string;
  public editData: any;

  public employeeDetail = {
    pin: '',
    name: '',
    bl: '',
    company: '',
    bu: '',
    department: ''
  }

  // public recordResult = {
  //   date: '',
  //   schedule_start: '',
  //   schedule_end: '',
  //   ot_start: '',
  //   ot_end: '',
  //   actual_in: '',
  //   actual_out: '',
  //   trans: '',
  //   shift: '',
  //   ot_hour_1: '',
  //   ot_hour_1_5: '',
  //   ot_hour_3: '',
  //   remark: '',
  //   update_date: '',
  //   update_by: ''
  // }

  public searchDetail = {
    name: '',
    surname: '',
    pin: '',
    dateFrom: '',
    dateTo: ''
  }

  public editDate = {
    schedule: {
      date: {
        start: {}, end: {}
      },
      time: {
        start: '', end: ''
      }
    },
    actual: {
      date: {
        start: {}, end: {}
      },
      time: {
        start: '', end: ''
      }
    },
    ot: {
      date: {
        start: {}, end: {}
      },
      time: {
        start: '', end: ''
      }
    },
    leave: []
  }

  public result;
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

  constructor(
    private http: HttpClient,
    private summaryDailyservice: SummaryDailyService,
    private commonUtils: CommonUtils,
    private sharedService: SharedVariables
  ) {

  }


  ngOnInit() {
    let _value: any
    this.sharedService.observableEvents.subscribe(
      value => {
        _value = value;
        console.log(_value)
      });

    console.log('xxxx',_value)

  }

  isLate() {
    for (let i = 0; i < this.resultRecord.length; i++) {
      let clock_in = parseInt(this.resultRecord[i].actual.clockIn.replace(':', '')) / 100;
      let clock_out = parseInt(this.resultRecord[i].actual.clockOut.replace(':', '')) / 100;
      let schedule_start = parseInt(this.resultRecord[i].schedule.start.replace(':', '')) / 100;
      let schedule_end = parseInt(this.resultRecord[i].schedule.end.replace(':', '')) / 100;
      // console.log(this.arrResult)
      let lost = 'Lost (06:00 - 15:00)';
      if (clock_in > schedule_start) {
        this.resultRecord[i].actual.styleIn = "red";
      }
      if (clock_out < schedule_end) {
        this.resultRecord[i].actual.styleOut = "red";
      }
      if (this.resultRecord[i].remark == lost) {
        this.resultRecord[i].styleRemark = "red";
      }
    }
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
    // console.log(this.searchDetail);
    this.searchDetail.name = this.name;
    this.searchDetail.surname = this.surname;
    this.searchDetail.pin = this.pin;
    this.searchDetail.dateFrom = this.dateFrom;
    this.searchDetail.dateTo = this.dateTo;
    this.commonUtils.onStart();
    this.summaryDailyservice.responseData(this.searchDetail)
      .subscribe(
        res => {
          // console.log(res);
          this.checkStatus(res);
          this.isLate();
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
      const obj = data.searchDailyResp.employeeDetail;
      this.employeeDetail.pin = obj.pin;
      this.employeeDetail.name = obj.name;
      this.employeeDetail.bl = obj.bl;
      this.employeeDetail.company = obj.company;
      this.employeeDetail.bu = obj.bu;
      this.employeeDetail.department = obj.department;

      this.resultRecord = data.searchDailyResp.resultRecord;
    } else if (data.header.status == 'F') {
      console.log("error");
    }
  }

  isEditFlag: boolean = false;
  getIndex(data) {
    //deep copy object
    this.editData = JSON.parse(JSON.stringify(data));

    //Set date to datepicker
    let scheduleStart = this.editData.schedule.start.split(" ");
    let scheduleEnd = this.editData.schedule.end.split(" ");
    this.editDate.schedule.date.start = this.splitdate(scheduleStart[0]);
    this.editDate.schedule.time.start = scheduleStart[1].split(":")[0];
    this.editDate.schedule.date.end = this.splitdate(scheduleEnd[0]);
    this.editDate.schedule.time.end = scheduleEnd[1].split(":")[0];

    console.log(this.editDate.schedule.time.end);


    this.isEditFlag = !this.isEditFlag;
    this.showResult = !this.showResult;

  }

  backToSearch() {
    this.isEditFlag = !this.isEditFlag;
    this.showResult = !this.showResult;
  }


  splitdate(dateString) {
    let splitdate = dateString.split('/', 3);
    let date: any = {
      date: {
        day: Number(splitdate[0]),
        month: Number(splitdate[1]),
        year: Number(splitdate[2]),
      }
    };
    // console.log(date.date);
    return date;
  }




  // edit(value) {
  //   let editdata = value;
  //   for (let i = 0; i < this.arrResult.length; i++) {
  //     if (this.arrResult[i].id == value.id) {
  //       this.arrResult[i] = value;
  //     }
  //   }
  // }



  // getData_toEdit(data, index:string){
  //   // this.isEditFlag =  !this.isEditFlag;
  //   const obj = getIndex(index).record_result.searchDailyResp.record_result
  //   this.record_result.date = obj.Date;


  // }
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === this.KEYCODE_ENTER) {
      console.log('enter is pressed!')
    }
  }

  addLeave(event) {
    // this.click++;
    // console.log(this.click)
    // if (this.click === 2) {
    //   document.getElementById('addLeave').setAttribute('disabled', 'true');
    // }
  }


}



