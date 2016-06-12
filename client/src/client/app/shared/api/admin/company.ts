import { API_ENDPOINTS, Model } from '../../index';
import { ApiBase }    from './../base';
import { Injectable } from '@angular/core';
import { AuthHttp }   from 'angular2-jwt/angular2-jwt';

@Injectable()
export class Company extends ApiBase<Model.Admin.Company> {
  baseRoute:string = API_ENDPOINTS.ADMIN.COMPANIES;

  constructor(authHttp: AuthHttp) {
    super(authHttp);
  };

  update_templates_order(templates: Model.Admin.ShiftTemplate[]) {
    let company = { shiftTemplatesAttributes: templates };
    return this.update(company);
  }

  stringifyParam(data: Model.Admin.Company): string {
    return JSON.stringify({company: data});
  };

  parse(data: any): Model.Admin.Company {
    return new Model.Admin.Company(data);
  }
}
