import { API_ENDPOINTS } from '../constants/index';
import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import 'rxjs/Rx';

@Injectable()
export class AuthenticationService {
  jwt_token:any = null;

  constructor(public http: Http) {}

  authenticateUser(user: any) {

    return this.http.post(
      API_ENDPOINTS.USER_SIGNIN,
      JSON.stringify({ 'user': user }),
      {}
      ).map(res => res.json());
  }

  createNewUser(user: any) {
    return this.http.post(
      API_ENDPOINTS.CREAT_USER,
      JSON.stringify({ 'user': user }),
      {}
      ).map(res => res.json());
  }
}
