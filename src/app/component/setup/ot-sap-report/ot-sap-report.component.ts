
import { Component, OnInit } from '@angular/core';
import { CommonUtils } from '../../shared/common.component';
import { IMyInputFieldChanged, IMyDpOptions } from 'angular4-datepicker/src/my-date-picker';
import { SetupService } from '../../../services/setup.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';

@Component({
    moduleId: module.id,
    selector: 'ot-sap-report',
    templateUrl: 'ot-sap-report.component.html',
    styleUrls: ['ot-sap-report.component.scss']
})

export class OtSapReportComponent implements OnInit {

    public showResult: boolean = false;
    public isEditFlag: boolean = false;
    public Name: string;
    public Surname: string;

    newDate: any = [];
    value: any = [];
    tempEdit: any = []
    description: any = [];
    name: any = [];
    otsap: any = [];
    otsapDetail: any = [];
    edit: boolean = false;

    constructor(private commonUtils: CommonUtils,
        private setupService: SetupService) { }

    ngOnInit() {
        this.clickedSearch();
    }

    checkStatusInit(data) {
        if (data.header.status == 'S') {
            let index = 0
            this.otsap = data.detail_setup_otsap.result;
        } else if (data.header.status == 'F') {
            console.log("error");
        }
    }

    clickedSearch() {
        this.showResult = true;
        this.getData();
    }

    clickedDetail() {
        this.showResult = false;
        this.getDataDeail();
    }

    getData() {
        this.commonUtils.onStart();
        this.setupService.getInitOtSapData().then(
            res => {
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

    clearValue(){
        this.showResult = false;
        this.isEditFlag = false;
    }

    getDataDeail(): any {
        this.commonUtils.onStart();
        this.setupService.getInitOtSapDetailData().then(
            res => {
                console.log(res);
                this.checkStatusDetail(res);
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

    checkStatusDetail(data: any): any {
        if (data.header.status == 'S') {
            let index = 0
            this.otsapDetail = data.detail_setup_otsapDetail.result;
        } else if (data.header.status == 'F') {
            console.log("error");
        }
    }
}
