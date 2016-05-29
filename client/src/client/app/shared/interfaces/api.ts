import { Observable } from 'rxjs/Observable';

export interface IApi<T> {
  baseRoute: string;
  getAll(): Observable<T[]>;
  create(data: T): Observable<T>;
  update(data: T): Observable<T>;
  destroy(data: T): Observable<T>;
  stringifyParam(data: T):string;
}
