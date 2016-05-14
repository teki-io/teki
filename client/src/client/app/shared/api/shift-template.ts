import { API_ENDPOINTS, ShiftTemplate } from '../index';
import { ApiBase }    from './base';
import { Injectable } from '@angular/core';
import { AuthHttp }   from 'angular2-jwt/angular2-jwt';

@Injectable()
export class ApiShiftTemplate extends ApiBase<ShiftTemplate> {
  baseRoute: string = API_ENDPOINTS.SHIFT_TEMPLATES;

  constructor(authHttp: AuthHttp) { super(authHttp); };

  stringifyParmas(data: ShiftTemplate):string {
    return JSON.stringify({ shiftTemplate: this.convertShiftTemplate(data)});
  };

  parse(data: any): ShiftTemplate {
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
