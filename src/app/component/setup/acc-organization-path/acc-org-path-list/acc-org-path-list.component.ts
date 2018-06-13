import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'acc-org-path-list',
    templateUrl: 'acc-org-path-list.component.html',
    styleUrls: ['acc-org-path-list.component.scss']
})
export class AccOrgPathListComponent {
    @Input() orgList;
    public showSub = [];

    constructor() { 
        
    }

    ngOnInit() {
        //Init variable
        for(var i=0; i<this.orgList.length;i++){
            this.showSub.push(false);
        }
    }

    showSubOrg(index){
        // console.log("index: " + index);
        // console.log("showSub[index]: " +this.showSub[index]);
        this.showSub[index] = !this.showSub[index];

    }
}
