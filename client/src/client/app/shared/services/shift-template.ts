import { Injectable, Inject }    from '@angular/core';
import { ShiftTemplate }         from '../models/index';
import { ShiftTemplateAction }   from '../actions/index';
import { AppStore }              from '../interfaces/index';
import { ApiShiftTemplate }      from '../api/index';
import { Observable }            from 'rxjs/Observable';
import { Store }                 from '@ngrx/store';
import { TranslateService }      from 'ng2-translate/ng2-translate';
import { HttpErrorHandler }      from './index';
import 'rxjs/add/operator/map';

@Injectable()
export class ShiftTemplateService {
  shiftTemplates:  Observable<ShiftTemplate[]>;

  constructor(@Inject(ApiShiftTemplate) public api: ApiShiftTemplate,
              private store: Store<AppStore>,
              private translate: TranslateService,
              private errorHandler: HttpErrorHandler) {
    this.shiftTemplates = store.select('shiftTemplates');
  }

  nameTaken(template: ShiftTemplate): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      this.shiftTemplates.subscribe((templates: ShiftTemplate[]) => {
        let result = _.find(templates, (d) => template.name === template.name && template.id !== template.id);
        if (_.isEmpty(result)) {
          resolve(true);
        } else {
          this.translate.get('shiftSettings.nameTaken').subscribe((msg: string) => reject(new Error(msg)));
        }
      });
    });
  }

  load() {
    this.api.getAll()
      .map(payload => ({ type: ShiftTemplateAction.ADD, payload }))
      .subscribe(action => this.store.dispatch(action));
  }

  save(template: ShiftTemplate) {
    (template.id) ? this.update(template) : this.create(template);
  }

  destroy(template: ShiftTemplate) {
    this.api.destroy(template)
      .subscribe(action => this.store.dispatch({ type: ShiftTemplateAction.DELETE, payload: template }));
  }

  private create(template: ShiftTemplate) {
    this.api.create(template)
      .map(payload => ({ type: ShiftTemplateAction.CREATE, payload }))
      .subscribe(
        (action) => this.store.dispatch(action),
        (e) => this.errorHandler.handle(e)
      );
  }

  private update(template: ShiftTemplate) {
    this.api.update(template)
      .map(payload => ({ type: ShiftTemplateAction.UPDATE, payload }))
      .subscribe(
        (action) => this.store.dispatch(action),
        (e) => this.errorHandler.handle(e)
      );
  }
}
