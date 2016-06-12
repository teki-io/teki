import { Injectable, Inject } from '@angular/core';
import * as Api               from '../../api/index';
import * as Model             from '../../models/index';
import * as Actions           from '../../actions/index';
import * as Interface         from '../../interfaces/index';
import { Observable }         from 'rxjs/Observable';
import { Store, Action }      from '@ngrx/store';
import { HttpErrorHandler }   from './../index';
import { BehaviorSubject }    from 'rxjs/Rx';

import 'rxjs/add/operator/map';

@Injectable()
export class Company {
  updating_shift_templates: Observable<boolean>;
  private actions = new BehaviorSubject<Action>({type: null, payload: null});

  constructor(@Inject(Api.Admin.Company) public api: Api.Admin.Company,
              private store: Store<Interface.AppStore>,
              private errorHandler: HttpErrorHandler) {

    const store$ = store.select<Interface.Admin.ICompanies>('admin.companies');
    this.updating_shift_templates = store$.map(({updating_shift_templates}: Interface.Admin.ICompanies) => updating_shift_templates);


    let updateShiftTemplates = this.actions
      .filter(({type}: Action) => type === Actions.Admin.Company.UPDATE_TEMPLATES_ORDER)
      .do(() => this.store.dispatch({type: Actions.Admin.Company.UPDATING_TEMPLATES_ORDER}))
      .mergeMap(({payload}: Action) => this._update_templates(payload));

    Observable
      .merge(updateShiftTemplates)
      .subscribe((action: Action) => this.store.dispatch(action));
  }

  update_templates(templates: Model.Admin.ShiftTemplate[]) {
    templates.forEach((template, i) => template.sort = i);
    this.actions.next({type: Actions.Admin.Company.UPDATE_TEMPLATES_ORDER, payload: templates});
  }

  private _update_templates(d: Model.Admin.ShiftTemplate[]): Observable<Action> {
    return this.api.update_templates_order(d)
      .do(payload => this.store.dispatch({ type: Actions.Admin.Company.UPDATED_TEMPLATES_ORDER, payload }))
      .catch(error => this.errorHandler.handle(error));
  }
}
