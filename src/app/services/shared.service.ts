import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedVariables {
    public userInfoChangedSource;
    public observableEvents;
    public userInfoResp: any = null;
    public userRoleResp: any = null;

    constructor() {
        this.userInfoChangedSource = new Subject<any>();
        this.observableEvents = this.userInfoChangedSource.asObservable();
    }

    setUserInfoResp(newUserInfoResp: any) {
        console.log("data in app = ", newUserInfoResp);
        this.userInfoResp = newUserInfoResp;
        this.setRole(newUserInfoResp)
        this.userInfoChangedSource.next(newUserInfoResp);
    }

    getUserInfoResp() {
        return this.userInfoResp;
    }


    setRole(objRole) {
        //this.userRoleResp = objRole.authorize_info.functions
        this.userRoleResp = objRole.authorize_info.functions
    }

    getListRole(){
        return this.userRoleResp
    }

}


