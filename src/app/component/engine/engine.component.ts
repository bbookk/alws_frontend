import { Component, OnInit } from '@angular/core';
import { IMyInputFieldChanged, IMyDpOptions } from 'angular4-datepicker/src/my-date-picker';

import { HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { CommonUtils } from '../shared/common.component';
import { EngineService } from '../../services/engine.service';
@Component({
    moduleId: module.id,
    selector: 'engine',
    templateUrl: 'engine.component.html',
    styleUrls: ['engine.component.scss']
})
export class EngineComponent implements OnInit {

    public showResult: boolean = false;
    public isEditFlag: boolean = false;
    public Name: string;
    public Surname: string;

    newDate: any = [];
    value: any = [];
    tempEdit: any = []
    description: any = [];
    name: any = [];
    userdetail: any = [];
    edit: boolean = false;

    constructor(private commonUtils: CommonUtils,
        private setupService: EngineService) { }

    ngOnInit() {
        // this.getData();
    }

    checkStatusInit(data) {
        if (data.header.status == 'S') {
            let index = 0
            this.userdetail = data.detail_setup_userdetail.result;
        } else if (data.header.status == 'F') {
            console.log("error");
        }
    }

    clickedSearch() {
        this.showResult = true;

    }

    getData() {
        this.commonUtils.onStart();
        this.setupService.getInitUserdetailData().then(
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
}