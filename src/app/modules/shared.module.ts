import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyDatePickerModule } from 'angular4-datepicker/src/my-date-picker';
import { GoTopButtonModule } from 'ng2-go-top-button';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonUtils } from '../component/shared/common.component';


@NgModule({
  imports: [
    CommonModule,
    MyDatePickerModule,
    GoTopButtonModule,
  ],
  exports: [
    MyDatePickerModule,
    GoTopButtonModule,
  ],
  declarations: [],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {

}
