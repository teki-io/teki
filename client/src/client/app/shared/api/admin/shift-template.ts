import { API_ENDPOINTS, Model } from '../../index';
import { ApiBase }    from './../base';
import { Injectable } from '@angular/core';
import { AuthHttp }   from 'angular2-jwt/angular2-jwt';

@Injectable()
export class ShiftTemplate extends ApiBase<Model.Admin.ShiftTemplate> {
  baseRoute: string = API_ENDPOINTS.SHIFT_TEMPLATES;

  constructor(authHttp: AuthHttp) { super(authHttp); };

  stringifyParam(data: Model.Admin.ShiftTemplate):string {
    return JSON.stringify({ shiftTemplate: this.convertShiftTemplate(data)});
  };

  parse(data: any): Model.Admin.ShiftTemplate {
    return new Model.Admin.ShiftTemplate(data);
  }

  private convertShiftTemplate(shiftTemplate: Model.Admin.ShiftTemplate): any {
    return {
      startTime: shiftTemplate.startTime.local().format('HH:mm'),
      endTime: shiftTemplate.endTime.local().format('HH:mm'),
      name: shiftTemplate.name
    };
  }
}
