import { Component, OnInit, HostListener } from '@angular/core';
import { IMyDpOptions, IMyDateModel } from 'angular4-datepicker/src/my-date-picker';
import { SummaryOrganizationService } from '../../../services/summaryOrganization-service'
import { HttpErrorResponse } from '@angular/common/http';
import { CommonUtils } from '../../shared/common.component';

@Component({
  selector: 'app-summary-organization',
  templateUrl: './summary-organization.component.html',
  styleUrls: ['./summary-organization.component.scss']
})
export class SummaryOrganizationComponent implements OnInit {

  public showResult: boolean = false;
  public showPin: boolean = false;
  public showName: boolean = true;
  public dateTo: string;
  public dateFrom: string;
  public company: string;
  public businessUnit: string;
  public department: string;
  public section: string;
  public function: string;
  private KEYCODE_ENTER = 13;
  private list = [];
  public companyList = [];
  public resultRecord = [];
  public mySelect = -1;

  public searchDetail = {
    company: '',
    businessUnit: '',
    department: '',
    section: '',
    function: '',
    dateFrom: '',
    dateTo: ''
  }

  public organize_info = {
    coList: [],
    buList: [],
    dpList: [],
    scList: [],
    fcList: []
  }

  public data2screen = {
    coList: [],
    buList: [],
    dpList: [],
    scList: [],
    fcList: []
  }


  public myDatePickerOptions: IMyDpOptions = {

    dateFormat: 'dd/mm/yyyy',
    showClearDateBtn: false,
    showTodayBtn: false,
    editableDateField: false,
    openSelectorOnInputClick: true,
    selectorWidth: '200px',
    selectorHeight: '200px'

  };   // Initialized to specific date (09.10.2018).
  public periodFrom: any = {
    date: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: 1
    }
  };
  public periodTo: any = {
    date: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    }
  };
  constructor(private summaryOrganizationService: SummaryOrganizationService,
    private commonUtils: CommonUtils) { }

  ngOnInit() {
    this.getCompany();
    this.businessUnit = "";
    this.department = "";
    this.section = "";
    this.function = "";
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

  onCompanyChange(companyValue) {
    this.data2screen = {
      coList: [],
      buList: [],
      dpList: [],
      scList: [],
      fcList: []
    }
    let orgCode = this.getOrgCode(companyValue);
    console.log(orgCode)
    this.getOrganization(orgCode);
  }

  initialData() {
    console.log(this.searchDetail);
    this.searchDetail.company = this.company;
    this.searchDetail.businessUnit = this.businessUnit;
    this.searchDetail.department = this.department;
    this.searchDetail.section = this.section;
    this.searchDetail.function = this.function;
    this.searchDetail.dateFrom = this.dateFrom;
    this.searchDetail.dateTo = this.dateTo;
  }

  getData() {
    this.initialData();
    this.commonUtils.onStart();
    this.summaryOrganizationService.responseData(this.searchDetail).subscribe(
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
      this.resultRecord = data.searchOrganizationResp.resultRecord;
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

  getOrganization(organizeCode) {
    this.summaryOrganizationService.getOrganize(organizeCode).then((resp: any) => {
      // console.log(resp)
      this.organize_info.coList = resp.organize_info.co_list;
      this.organize_info.buList = resp.organize_info.bu_list;
      this.organize_info.dpList = resp.organize_info.dp_list;
      this.organize_info.scList = resp.organize_info.sc_list;
      this.organize_info.fcList = resp.organize_info.fc_list;
      this.findOrgCode(organizeCode);
    })
  }

  getRelateOrganization(value){
    console.log(value)
    this.summaryOrganizationService.getOrganize(value).then((resp : any) => {
      console.log(resp)
    })
  }

  findOrgCode(orgCode) {
    for (let i = 0; i < this.organize_info.buList.length; i++) {
      if (this.organize_info.buList[i].higher_org === orgCode) {
        this.data2screen.buList.push(this.organize_info.buList[i].org_name)
      }
    }
    for (let i = 0; i < this.organize_info.dpList.length; i++) {
      if (this.organize_info.dpList[i].higher_org === orgCode) {
        this.data2screen.dpList.push(this.organize_info.dpList[i].org_name)
      }
    }
    for (let i = 0; i < this.organize_info.scList.length; i++) {
      if (this.organize_info.scList[i].higher_org === orgCode) {
        this.data2screen.scList.push(this.organize_info.scList[i].org_name)
      }
    }
    for (let i = 0; i < this.organize_info.fcList.length; i++) {
      if (this.organize_info.fcList[i].higher_org === orgCode) {
        this.data2screen.fcList.push(this.organize_info.fcList[i].org_name)
      }
    }
  }

  getCompany() {
    this.summaryOrganizationService.getCompany().then((resp: any) => {
      let coList = resp.organize_info.co_list;
      for (let i = 0; i < coList.length; i++) {
        this.list.push(coList[i]);
        this.companyList.push(coList[i].company_dec_en)
      }
      this.company = this.companyList[0];
    })
  }

  getOrgCode(companyName) {
    let obj = this.list.find(array => array.company_dec_en === companyName);
    return obj.org_code;
  }

  clearDropdown() {
    this.data2screen = {
      coList: [],
      buList: [],
      dpList: [],
      scList: [],
      fcList: []
    }

    this.company = this.companyList[0];
    this.businessUnit = "";
    this.department = "";
    this.section = "";
    this.function = "";
  }
}
