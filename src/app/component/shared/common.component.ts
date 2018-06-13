import { Injectable } from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';

@Injectable()
export class CommonUtils {   
    timer;
    public loading = false;
    public lang = 'th';
    
    onStart() {
        this.loading = true;
        this.timer = setTimeout(() => {
            if (this.loading) {
                console.log("timeout");
                this.onStop();
            } 
        }, 300000)
    }
    onStop() {
        this.loading = false;
        console.timeEnd();
    }

    onLoad() {
        return this.loading;
    }

    switchLang(lang) {
       
    }
    
}
