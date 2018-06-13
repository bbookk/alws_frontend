import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import { IMyDpOptions, IMyDateModel, IMyInputFieldChanged } from 'angular4-datepicker/src/my-date-picker';
import { CommonUtils } from '../../shared/common.component';
import { SetupService } from '../../../services/setup.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    moduleId: module.id,
    selector: 'special-day',
    templateUrl: 'special-day.component.html',
    styleUrls: ['special-day.component.scss']
})
export class SpecialDayComponent implements OnInit {

    nameDay:any=[]
    tempEdit:any=[]
    newCompensation :any=[];
    newDate:any =[];
    speacialDay:any =[];
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
        this.setupService.getInitSpecialData().then(
            res=> {
              console.log(res);
              this.checkStatusInit(res);
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

    checkStatusInit(data) {
        let index = 0;
        if (data.header.status == 'S') {
          this.speacialDay = data.detail_setup_speacialday.result
          this.speacialDay.forEach(element => {
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
        this.setupService.getUpdateSpecialData(this.speacialDay).then(
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
        this.tempEdit[i] = this.speacialDay[i];
        this.speacialDay[i].edit = true ; 
        this.newDate[i] = this.speacialDay[i].txtDate 
        this.newCompensation[i] = this.speacialDay[i].compensation;
        this.nameDay[i] = this.speacialDay[i].speacialDay
    }

    setSave(i){
        this.speacialDay[i].txtDate = this.newDate[i];
        this.speacialDay[i].compensation = this.newCompensation[i];
        this.speacialDay[i].speacialDay = this.nameDay[i];
        this.speacialDay[i].edit = false ; 
        this.splitdate(i);
    }

    splitdate(i){
        let splitdate = this.speacialDay[i].txtDate.split('/',3);
        this.speacialDay[i].date.date.day = Number(splitdate[0]);
        this.speacialDay[i].date.date.month = Number(splitdate[1]);
        this.speacialDay[i].date.date.year = Number(splitdate[2]);
        console.log(this.speacialDay[i].date.date)
    }


    setDelete(i){
        this.speacialDay.splice(i, 1);
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
        this.speacialDay[i] = this.tempEdit[i];
        this.speacialDay[i].edit = false ; 
        this.splitdate(i);
    }
}
