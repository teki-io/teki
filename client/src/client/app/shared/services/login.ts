import { Observable } from 'rxjs/Observable';
import { Injectable, Inject } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { API_ENDPOINTS, contentHeaders } from '../constants/index';

@Injectable()
export class LoginService {
  constructor(@Inject(Http) private http: Http) {}

  login(email: any, password: any):Observable<Response> {
    let user = { email, password };
    let body = JSON.stringify({ user });

    return this.http.post(API_ENDPOINTS.USER_SIGNIN, body, { headers: contentHeaders })
      .do((resp: any) => {
        localStorage.setItem('jwt', resp.json().token);
      });
  }

  logout():void {
    localStorage.removeItem('jwt');
  }

  isSignedIn():boolean {
    return localStorage.getItem('jwt') !== null;
  }
}
