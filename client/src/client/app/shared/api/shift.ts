import { API_ENDPOINTS, Shift } from '../index';
import { ApiBase }    from './base';
import { Injectable } from '@angular/core';
import { AuthHttp }   from 'angular2-jwt/angular2-jwt';
import { URLSearchParams } from '@angular/http';
import * as moment from 'moment';

@Injectable()
export class ApiShift extends ApiBase<Shift> {
  baseRoute: string = API_ENDPOINTS.SHIFTS;
  constructor(authHttp: AuthHttp) { super(authHttp); };

  getAll(from: moment.Moment = null, to: moment.Moment = null) {
    let params: URLSearchParams = new URLSearchParams();
    if (from) params.set('from', from.format('YYYY-MM-DD'));
    if (to) params.set('to', to.format('YYYY-MM-DD'));

    return this.authHttp.get(API_ENDPOINTS.SHIFTS, { search: params })
      .map(res => res.json())
      .map((shifts: Array<any>) => {
        return shifts.map(d => this.parse(d));
      });
  }

  stringifyParmas(data: Shift):string { return JSON.stringify({ shift: data }); };

  parse(data: any): Shift {
    return new Shift(data);
  }
}
