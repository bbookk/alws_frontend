import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import { IMyDpOptions, IMyDateModel, IMyInputFieldChanged } from 'angular4-datepicker/src/my-date-picker';
import { CommonUtils } from '../../shared/common.component';
import { SetupService } from '../../../services/setup.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    moduleId: module.id,
    selector: 'keyword',
    templateUrl: 'keyword.component.html',
    styleUrls: ['keyword.component.scss']
})
export class KeywordComponent implements OnInit {

    type:any=[];
    description:any=[];
    abbrevlation:any=[];
    keywordCode:any=[]
    tempEdit:any=[]
    newCompensation :any=[];
    newDate:any =[];
    keywordList:any =[];
    edit:boolean =false;
    selector: number = 0;

    constructor(private commonUtils:CommonUtils,
    private setupService:SetupService) { }

    public myDatePickerOptions: IMyDpOptions = {

        dateFormat: 'dd/mm/yyyy',
        showClearDateBtn: false,
        showTodayBtn: false,
        editableDateField: false,
        openSelectorOnInputClick: true,
        selectorWidth: '200px',
        selectorHeight: '200px'
    
    };

    ngOnInit() {
        console.log('onInit(): SampleDatePickerReactiveForms');
        let index = 0
        this.initData();
    }

    initData(){
        this.commonUtils.onStart();
        this.setupService.getInitKeywordData().then(
            res=> {
              console.log(res);
              this.checkStatusInit(res);
              this.commonUtils.onStop();
            },
            (err: HttpErrorResponse) => {
              if (err.error instanceof Error) {
                console.log("Client-side error occured.");
              } else {
                console.log("Server-side error occured.",err.error);
              }
              this.commonUtils.onStop();
            }
        );
    }

    checkStatusInit(data) {
        let index = 0;
        if (data.header.status == 'S') {
          this.keywordList = data.detail_setup_keyword.result
          this.keywordList.forEach(element => {
            this.splitdate(index);
            index++
        });
          
        } else if (data.header.status == 'F') {
          console.log("error");
        }
    }

    checkStatusSave(data) {
        if (data.header.status == 'S') {
          
        } else if (data.header.status == 'F') {
          console.log("error");
        }
      }

    updateData(){
        this.setupService.getUpdateSpecialData(this.keywordList).then(
            res=> {
              console.log(res);
              this.checkStatusSave(res);
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

    isDisable(){
        if(this.edit){
            return false
        }
        else{
            return true
        }
    }

    setEdit(i){
        this.tempEdit[i] = this.keywordList[i];
        this.keywordList[i].edit = true ; 
        this.newDate[i] = this.keywordList[i].txtDate 
        this.newCompensation[i] = this.keywordList[i].compensation;
        this.keywordCode[i] = this.keywordList[i].keywordCode
        this.abbrevlation[i] = this.keywordList[i].abbrevlation
        this.description[i] = this.keywordList[i].description
        this.type[i] = this.keywordList[i].type
    }

    setSave(i){
        this.keywordList[i].txtDate = this.newDate[i];
        this.keywordList[i].compensation = this.newCompensation[i];
        this.keywordList[i].keywordCode = this.keywordCode[i];
        this.keywordList[i].edit = false ; 
        this.splitdate(i);
    }

    splitdate(i){
        let splitdate = this.keywordList[i].txtDate.split('/',3);
        this.keywordList[i].effectiveDate.date.day = Number(splitdate[0]);
        this.keywordList[i].effectiveDate.date.month = Number(splitdate[1]);
        this.keywordList[i].effectiveDate.date.year = Number(splitdate[2]);
        console.log(this.keywordList[i].effectiveDate.date)
    }


    setDelete(i){
        this.keywordList.splice(i, 1);
    }

    onInputFieldChanged(event: IMyInputFieldChanged,i) {
        this.newDate[i] = event.value;
        console.log('onInputFieldChanged(): Value: ', event.value, ' - dateFormat: ', event.dateFormat, ' - valid: ', event.valid);
    }

    checkbox(e,i){
        console.log(e);
        console.log(e.target.checked)
        if(e.target.checked){
            this.newCompensation[i] = true;
        }
        else{
            this.newCompensation[i] = false;
        }
    }

    setCancle(i){
        this.keywordList[i] = this.tempEdit[i];
        this.keywordList[i].edit = false ; 
        this.splitdate(i);
    }
}
