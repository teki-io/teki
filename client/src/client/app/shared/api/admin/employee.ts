import { API_ENDPOINTS, Model } from '../../index';
import { ApiBase }    from './../base';
import { Injectable } from '@angular/core';
import { AuthHttp }   from 'angular2-jwt/angular2-jwt';

@Injectable()
export class Employee extends ApiBase<Model.Admin.Employee> {
  baseRoute:string = API_ENDPOINTS.EMPLOYEES;

  constructor(authHttp: AuthHttp) {
    super(authHttp);
  };

  stringifyParam(data: Model.Admin.Employee): string {
    return JSON.stringify({employee: data});
  };

  parse(data: any): Model.Admin.Employee {
    return new Model.Admin.Employee(data);
  }
}
