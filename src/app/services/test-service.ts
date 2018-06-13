import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class TestService {
  constructor(private http: Http) {
  }

  requestLoginToken() {

    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.get('https://private-e6931-getdata17.apiary-mock.com/data',
      options
    ).toPromise()
  }

    requestLoginToken1() {

    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.get('https://private-e6931-getdata17.apiary-mock.com/data',
      options
    )
  }


}
