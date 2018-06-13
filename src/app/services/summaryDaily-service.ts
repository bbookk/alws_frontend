import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { HttpHeaders,HttpClient,HttpErrorResponse } from '@angular/common/http';
@Injectable()
export class SummaryDailyService {
  constructor(private http: HttpClient) {
  }

  responseData(search_data) {


    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //   })
    // };
    // const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    // const options = new RequestOptions({ headers: headers });

    // console.log(search_data.name,search_data.surname,search_data.pin,search_data.date_to,search_data.date_from);
  
    return this.http.post("/api/report/getSummaryDaily",
      // { //old
      //   search_daily: {
      //     name: search_data.name,
      //     surname: search_data.surname,
      //     pin: search_data.pin,
      //     date_to : search_data.date_to,
      //     date_from : search_data.date_from
      //   } 
      // }s

      //new
      JSON.stringify({
        search_daily: search_data,
      })
    );

    
  }

  // getFromData(){
  //   return this.http.get("http://alws.orcsoft.mockable.io/getEmployeeDetail").toPromise();
  // }

}
