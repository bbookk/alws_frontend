
import { Component, OnInit } from '@angular/core';
import { CommonUtils } from '../../shared/common.component';
import { IMyInputFieldChanged, IMyDpOptions } from 'angular4-datepicker/src/my-date-picker';
import { SetupService } from '../../../services/setup.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';

@Component({
    moduleId: module.id,
    selector: 'max-users-ot-compensation',
    templateUrl: 'max-users-ot-compensation.component.html',
    styleUrls: ['max-users-ot-compensation.component.scss']
})

export class MaxUsersOtCompensationComponent implements OnInit {

    public showResult: boolean = false;
    public isEditFlag: boolean = false;
    public Name: string;
    public Surname: string;

    newDate: any = [];
    value: any = [];
    tempEdit: any = []
    description: any = [];
    name: any = [];
    maxuser: any = [];
    edit: boolean = false;

    constructor(private commonUtils: CommonUtils,
        private setupService: SetupService) { }

    ngOnInit() {
       
    }

    checkStatusInit(data) {
        if (data.header.status == 'S') {
            let index = 0
            this.maxuser = data.detail_setup_maxuser.result;
        } else if (data.header.status == 'F') {
            console.log("error");
        }
    }

    clickedSearch() {
        this.showResult = true;
        this.getData();
    }

    getData() {
        this.commonUtils.onStart();
        this.setupService.getInitMaxUserData().then(
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
