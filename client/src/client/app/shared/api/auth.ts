import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { API_ENDPOINTS, contentHeaders } from '../index';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class Auth {
  constructor(@Inject(Http) private http: Http) {}

  login(email: any, password: any): Observable<Response> {
    let user = { email, password };
    let body = JSON.stringify({ user });

    return this.http.post(API_ENDPOINTS.USER_SIGNIN, body, { headers: contentHeaders });
  }

  signup(email: any, password: any): Observable<Response> {
    let user = { email, password };
    let body = JSON.stringify({ user });

    return this.http.post(API_ENDPOINTS.CREAT_USER, body, { headers: contentHeaders });
  }
}
