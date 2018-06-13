import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable()
export class MyInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const changedReq = req.clone(
            {
                headers: req.headers.set('Content-Type', 'application/json'),
                body: this.updateBody(req.body),
                url:this.updateUrl(req.url)
            }
        );
        return next.handle(changedReq);
    }


    private updateBody(body) {
        if (typeof (body) == "string") {
            body = JSON.parse(body);
            body.header = {
                'ref_id': 'ref_id',
                'language': localStorage.getItem('language') || 'EN'
            };
            return JSON.stringify(body);
        } else {
            return body;
        }
    }

    private updateUrl(req: string) {
        return environment.api_url + req;
    }
}