import { Component, OnInit } from '@angular/core';
import { CommonUtils } from '../../shared/common.component';
import { SetupService } from '../../../services/setup.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    moduleId: module.id,
    selector: 'system-config',
    templateUrl: 'system-config.component.html',
    styleUrls: ['system-config.component.scss']
})
export class SystemConfigComponent implements OnInit {

    value: any=[];
    tempEdit:any=[]
    description :any=[];
    name:any =[];
    dataConfig = [];
    edit:boolean =false;
    selector: number = 0;
    p: number = 1;
    constructor(private commonUtils:CommonUtils,
        private setupService:SetupService) { }

    ngOnInit() {
        console.log('onInit(): SampleDatePickerReactiveForms'+this.dataConfig);
        this.getDataInit();
    }

    getDataInit(){
        this.commonUtils.onStart();
        this.setupService.getInitConfigData().then(
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
        if (data.header.status == 'S') {
          this.dataConfig = data.detail_setup_config.result
          
        } else if (data.header.status == 'F') {
          console.log("error");
        }
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
        this.tempEdit[i] = this.dataConfig[i];
        this.dataConfig[i].edit = true ; 
        this.name[i] = this.dataConfig[i].name 
        this.description[i] = this.dataConfig[i].description 
        this.value[i] = this.dataConfig[i].value 
    }

    setSave(i){
        this.dataConfig[i].name = this.name[i];
        this.dataConfig[i].description = this.description[i];
        this.dataConfig[i].value = this.value[i];
        this.dataConfig[i].edit = false ; 
    }


    setCancle(i){
        this.dataConfig[i] = this.tempEdit[i];
        this.dataConfig[i].edit = false ; 
    }
}
