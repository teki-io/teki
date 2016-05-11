import { Injectable } from '@angular/core';
import { API_ENDPOINTS,
         contentHeaders,
         Shift }  from '../index';
import { URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import 'rxjs/Rx';
import * as moment from 'moment';

@Injectable()
export class ApiShift {
  constructor(public authHttp: AuthHttp) {}

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

  create(shift: Shift) {
    let data = { shift: shift };
    return this.authHttp.post(API_ENDPOINTS.SHIFTS, JSON.stringify(data), { headers: contentHeaders })
      .map(res => res.json())
      .map((shift) => { return this.parse(shift); });
  }

  update(shift: Shift) {
    let data = { shift: shift };
    return this.authHttp.put(`${API_ENDPOINTS.SHIFTS}/${shift.id}`, JSON.stringify(data), { headers: contentHeaders })
      .map(res => res.json())
      .map((shift) => { return this.parse(shift); });
  }

  private parse(data: any): Shift {
    return new Shift(data);
  }
}
