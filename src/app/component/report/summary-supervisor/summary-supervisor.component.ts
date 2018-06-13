import { Component, OnInit , HostListener } from '@angular/core';
import { IMyDpOptions , IMyDateModel} from 'angular4-datepicker/src/my-date-picker';
import { SummarySupervisorService } from '../../../services/summarySupervisor-service';
import { Headers, Http, RequestOptions, RequestMethod, ResponseContentType } from '@angular/http';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { CommonUtils } from '../../shared/common.component';

@Component({
  selector: 'app-summary-supervisor',
  templateUrl: './summary-supervisor.component.html',
  styleUrls: ['./summary-supervisor.component.scss']
})
export class SummarySupervisorComponent implements OnInit {

  public showResult:boolean = false;
  public searchBy:string = 'NAME';
  public name: string;
  public surname: string;
  public pin: string;
  public dateTo: string;
  public dateFrom: string;
  private KEYCODE_ENTER = 13;

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
  

  constructor(private http: HttpClient, 
    private summarySupervisorService: SummarySupervisorService,
    private commonUtils:CommonUtils) { }

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
    this.searchDetail.name = this.name;
    this.searchDetail.surname = this.surname;
    this.searchDetail.pin = this.pin;
    this.searchDetail.dateFrom = this.dateFrom;
    this.searchDetail.dateTo = this.dateTo;
    this.commonUtils.onStart();
    this.summarySupervisorService.responseData(this.searchDetail).subscribe(
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
      this.resultRecord = data.searchSupervisorResp.resultRecord;
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
