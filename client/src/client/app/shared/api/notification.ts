import { API_ENDPOINTS, Model } from '../index';
import { ApiBase }    from './base';
import { Injectable } from '@angular/core';
import { AuthHttp }   from 'angular2-jwt/angular2-jwt';

@Injectable()
export class Notification extends ApiBase<Model.Notification> {
  baseRoute: string = API_ENDPOINTS.NOTIFICATIONS;
  constructor(authHttp: AuthHttp) { super(authHttp); };

  stringifyParam(data: Model.Notification):string { return JSON.stringify({ notification: data }); };

  parse(data: any): Model.Notification {
    return new Model.Notification(data);
  }
}
