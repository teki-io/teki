import { API_ENDPOINTS, Employee } from '../index';
import { ApiBase }    from './base';
import { Injectable } from '@angular/core';
import { AuthHttp }   from 'angular2-jwt/angular2-jwt';

@Injectable()
export class ApiEmployee extends ApiBase<Employee> {
  baseRoute: string = API_ENDPOINTS.EMPLOYEES;
  constructor(authHttp: AuthHttp) { super(authHttp); };
  stringifyParmas(data: Employee):string { return JSON.stringify({ employee: data }); };

  parse(data: any): Employee {
    return new Employee(data);
  }
}
