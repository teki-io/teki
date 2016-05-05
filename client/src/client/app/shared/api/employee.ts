import { API_ENDPOINTS, contentHeaders } from '../constants/index';
import { Injectable } from 'angular2/core';
import { Employee } from '../models/employee';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import 'rxjs/Rx';

@Injectable()
export class ApiEmployee {
  endpoint: string = '/api/employees';

  constructor(public authHttp: AuthHttp) {}

  getAll() {
    return this.authHttp.get(API_ENDPOINTS.EMPLOYEES)
      .map(res => res.json())
      .map((employees: Array<any>) => {
        return employees.map(d => this.parse(d));
      });
  }

  create(employee: Employee) {
    let data = JSON.stringify({ employee: employee });
    return this.authHttp.post(API_ENDPOINTS.EMPLOYEES, data, { headers: contentHeaders })
      .map(res => res.json())
      .map((employee) => { return this.parse(employee); });
  }

  update(employee: Employee) {
    let data = JSON.stringify({ employee: employee });
    return this.authHttp.put(`${API_ENDPOINTS.EMPLOYEES}/${employee.id}`, data, { headers: contentHeaders })
      .map(res => res.json())
      .map((employee) => { return this.parse(employee); });
  }

  destroy(employee: Employee) {
    return this.authHttp.delete(`${API_ENDPOINTS.EMPLOYEES}/${employee.id}`)
      .map(res => res.json());
  }

  private parse(data: any): Employee {
    return new Employee(data);
  }
}
