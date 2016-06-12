import { AuthHttp }       from 'angular2-jwt/angular2-jwt';
import { contentHeaders } from '../index';
import { IApi }           from '../interfaces/index';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class ApiBase<TModel> implements IApi<TModel> {
  baseRoute: string;

  constructor(public authHttp: AuthHttp) {}

  getAll(query = {}): Observable<TModel[]> {
    return this.authHttp.get(this.baseRoute, query)
      .map(res => res.json())
      .map((employees: Array<any>) => {
        return employees.map(d => this.parse(d));
      });
  }

  create(data: TModel): Observable<TModel> {
    let str = this.stringifyParam(data);
    return this.authHttp.post(this.baseRoute, str, { headers: contentHeaders })
      .map(res => res.json())
      .map(employee => this.parse(employee));
  }

  update(data: any): Observable<TModel> {
    let str = this.stringifyParam(data);
    return this.authHttp.put(`${this.baseRoute}/${data.id || ''}`, str, { headers: contentHeaders })
      .map(res => res.json())
      .map(employee => this.parse(employee));
  }

  destroy(data: any): Observable<TModel> {
    return this.authHttp.delete(`${this.baseRoute}/${data.id}`)
      .map(res => res.json());
  }

  stringifyParam(data: TModel):string { return JSON.stringify(data); };

  parse(data: any):TModel { return <TModel>data.json(); };
}
