import { API_ENDPOINTS,
         contentHeaders,
         ShiftTemplate } from '../index';
import { Injectable } from 'angular2/core';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import 'rxjs/Rx';

@Injectable()
export class ApiShiftTemplate {
  constructor(public authHttp: AuthHttp) {}

  getAll() {
    return this.authHttp.get(API_ENDPOINTS.SHIFT_TEMPLATES)
      .map(res => res.json())
      .map((shifts: Array<any>) => {
        return shifts.map(d => this.parse(d));
      });
  }

  create(shiftTemplate: ShiftTemplate) {
    let data = JSON.stringify({ shiftTemplate: this.convertShiftTemplate(shiftTemplate) });
    return this.authHttp.post(API_ENDPOINTS.SHIFT_TEMPLATES, data, { headers: contentHeaders })
      .map(res => res.json())
      .map((shiftTemplate) => { return this.parse(shiftTemplate); });
  }

  update(shiftTemplate: ShiftTemplate) {
    let data = JSON.stringify({ shiftTemplate: this.convertShiftTemplate(shiftTemplate) });
    return this.authHttp.put(`${API_ENDPOINTS.SHIFT_TEMPLATES}/${shiftTemplate.id}`, data, { headers: contentHeaders })
      .map(res => res.json())
      .map((shiftTemplate) => { return this.parse(shiftTemplate); });
  }

  destroy(d: ShiftTemplate) {
    return this.authHttp.delete(`${API_ENDPOINTS.SHIFT_TEMPLATES}/${d.id}`)
      .map(res => res.json());
  }

  private parse(data: any): ShiftTemplate {
    return new ShiftTemplate(data);
  }

  private convertShiftTemplate(shiftTempate: ShiftTemplate): any {
    return {
      startTime: shiftTempate.startTime.local().format('HH:mm'),
      endTime: shiftTempate.endTime.local().format('HH:mm'),
      name: shiftTempate.name
    };
  }
}
