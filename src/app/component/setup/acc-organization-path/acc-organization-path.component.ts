import { Component, OnInit } from '@angular/core';
import { CommonUtils } from '../../shared/common.component';
import { SetupService } from '../../../services/setup.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    moduleId: module.id,
    selector: 'acc-organization-path',
    templateUrl: 'acc-organization-path.component.html',
    styleUrls: ['acc-organization-path.component.scss']
})
export class AccOrganizationPathComponent implements OnInit {

    value: any = [];
    tempEdit: any = []
    description: any = [];
    name: any = [];
    orgList: any = [];
    displayList = [];

    edit: boolean = false;
    selector: number = 0;
    p: number = 1;
    constructor(private commonUtils: CommonUtils,
        private setupService: SetupService) { }

    ngOnInit() {
        console.log('onInit(): SampleDatePickerReactiveForms' + this.orgList);
        this.getDataInit();
    }

    getDataInit() {
        this.commonUtils.onStart();
        this.setupService.getInitAccData().then(
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

    checkStatusInit(data) {
        if (data.header.status == 'S') {
            this.orgList = data.detailSetupAcc.orgList;

            // this.accList.forEach(element => {
            //     let data = {
            //         id: element.id,
            //         more: true,
            //         orgName: element.orgName,
            //         orgPath: element.orgPath,
            //         subOrg: element.subOrg
            //     };
            //     this.displayList.push(data);
            // });

            // console.log(this.displayList);

        } else if (data.header.status == 'F') {
            console.log("error");
        }
    }

    // showSubOrg(input) {

    //     let tempList = [];
    //     //Add more data to templist
    //     this.displayList.forEach(function (element, index) {
    //         console.log(index + ": " + element);

    //         //Selected org
    //         if (input.id == element.id) {

    //             let data = {
    //                 id: element.id,
    //                 more: !element.more,
    //                 orgName: element.orgName,
    //                 orgPath: element.orgPath,
    //                 subOrg: element.subOrg
    //             };
    //             tempList.push(data);

    //             //Select more
    //             if (element.more) {
    //                 //Add subOrg of selected org
    //                 input.subOrg.forEach(sub => {
    //                     data = {
    //                         id: sub.id,
    //                         more: true,
    //                         orgName: sub.orgName,
    //                         orgPath: sub.orgPath,
    //                         subOrg: sub.subOrg
    //                     };
    //                     tempList.push(data);
    //                 });
    //             }
    //         }
    //         else {
    //             let data = {
    //                 id: element.id,
    //                 more: element.more,
    //                 orgName: element.orgName,
    //                 orgPath: element.orgPath,
    //                 subOrg: element.subOrg
    //             };
    //             tempList.push(data);
    //         }
    //     });


    //     // element => {

    //     //     //Selected org
    //     //     if (input.id == element.id) {

    //     //         let data = {
    //     //             id: element.id,
    //     //             more: !element.more,
    //     //             orgName: element.orgName,
    //     //             orgPath: element.orgPath,
    //     //             subOrg: element.subOrg
    //     //         };
    //     //         tempList.push(data);

    //     //         //Deselect
    //     //         if (!element.more) {
    //     //             breakFlag = true;
    //     //             return;
    //     //         }

    //     //         //Add subOrg of selected org
    //     //         input.subOrg.forEach(sub => {
    //     //             data = {
    //     //                 id: sub.id,
    //     //                 more: true,
    //     //                 orgName: sub.orgName,
    //     //                 orgPath: sub.orgPath,
    //     //                 subOrg: sub.subOrg
    //     //             };
    //     //             tempList.push(data);
    //     //         });
    //     //     }
    //     //     else {
    //     //         let data = {
    //     //             id: element.id,
    //     //             more: element.more,
    //     //             orgName: element.orgName,
    //     //             orgPath: element.orgPath,
    //     //             subOrg: element.subOrg
    //     //         };
    //     //         tempList.push(data);
    //     //     }
    //     // });

    //     this.displayList = tempList;

    //     console.log(tempList);

    // }

}
