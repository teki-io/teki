import { API_ENDPOINTS, Model } from '../index';
import { ApiBase }    from './base';
import { Injectable } from '@angular/core';
import { AuthHttp }   from 'angular2-jwt/angular2-jwt';

@Injectable()
export class Employee extends ApiBase<Model.Employee> {
  baseRoute:string = API_ENDPOINTS.EMPLOYEES;

  constructor(authHttp: AuthHttp) {
    super(authHttp);
  };

  stringifyParam(data: Model.Employee): string {
    return JSON.stringify({employee: data});
  };

  parse(data: any): Model.Employee {
    return new Model.Employee(data);
  }
}
