import { API_ENDPOINTS, Model } from '../index';
import { ApiBase }    from './base';
import { Injectable } from '@angular/core';
import { AuthHttp }   from 'angular2-jwt/angular2-jwt';

@Injectable()
export class Profile extends ApiBase<Model.Profile> {
  baseRoute: string = API_ENDPOINTS.PROFILE;
  constructor(authHttp: AuthHttp) { super(authHttp); };

  getAll(): any {
    return this.authHttp.get(API_ENDPOINTS.PROFILE)
      .map(res => res.json())
      .map((profile: any) => this.parse(profile));
  }

  stringifyParam(data: Model.Profile):string { return JSON.stringify({ profile: data }); };

  parse(data: any): Model.Profile {
    return new Model.Profile(data);
  }
}
