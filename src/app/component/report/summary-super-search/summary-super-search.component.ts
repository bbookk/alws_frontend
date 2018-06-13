import { Component, OnInit } from '@angular/core';
import { IMyDpOptions } from 'angular4-datepicker/src/my-date-picker';
import { SummarySuperSearchService } from '../../../services/summarySuperSearch-service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonUtils } from '../../shared/common.component';

@Component({
  selector: 'app-summary-super-search',
  templateUrl: './summary-super-search.component.html',
  styleUrls: ['./summary-super-search.component.scss']
})
export class SummarySuperSearchComponent implements OnInit {

  public showResult:boolean = false;
  public searchBy:string = 'NAME';
  public search_type : string;
  public Name: string;
  public Surname: string;
  public pin: string;
  public company : string;
  public business_unit : string;
  public department : string;
  public section : string;
  public function : string;

  search_detail = {
    search_type : '',
    name: '',
    surname: '',
    pin: '',
    company : '',
    business_unit : '',
    department : '',
    section : '',
    function : ''
  }

  
  employee_detail = {
    pin: '',
    name: '',
    BL: '',
    company: '',
    BU: '',
    department: ''
  }

  public result;
  public arr_result = [];


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
    private summarySuperSearchService : SummarySuperSearchService,
    private commonUtils:CommonUtils) {}


  ngOnInit() {
  }

  clickedSearch() {
    this.showResult = true;
    this.getData();
  }

  getData() {
    console.log(this.search_detail);
    this.search_detail.search_type = this.search_type;
    this.search_detail.name = this.Name;
    this.search_detail.surname = this.Surname;
    this.search_detail.pin = this.pin;
    this.search_detail.company = this.company;
    this.search_detail.business_unit = this.business_unit;
    this.search_detail.department = this.department;
    this.search_detail.section = this.section;
    this.search_detail.function = this.function;
    this.commonUtils.onStart();
    this.summarySuperSearchService.responseData(this.search_detail).subscribe(
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
      const obj = data.search_superSearch_resp.employee_detail
      this.employee_detail.pin = obj.PIN;
      this.employee_detail.name = obj.Name;
      this.employee_detail.BL = obj.BL;
      this.employee_detail.company = obj.Company;
      this.employee_detail.BU = obj.BU;
      this.employee_detail.department = obj.Department;

      this.arr_result = data.search_superSearch_resp.result_record;
      //console.log(pin,name,bl,company,bu,department);
    } else if (data.header.status == 'F') {
      console.log("error");
    }
  }
}
