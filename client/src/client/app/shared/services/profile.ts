import { Injectable, Inject } from '@angular/core';
import * as Api               from '../api/index';
import * as Model             from '../models/index';
import * as Actions           from '../actions/index';
import * as Interface         from '../interfaces/index';
import { Observable }         from 'rxjs/Observable';
import { Store, Action }      from '@ngrx/store';
import { HttpErrorHandler }   from './index';
import { BehaviorSubject }    from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class Profile {
  loading: Observable<boolean>;
  profile: Observable<Model.Profile>;
  private actions = new BehaviorSubject<Action>({type: null, payload: null});

  constructor(@Inject(Api.Profile) private api: Api.Profile,
              private store: Store<Interface.AppStore>,
              private errorHandler: HttpErrorHandler) {

    const store$ = store.select<Interface.IProfile>('profile');
    this.profile = store$.map(({profile}: Interface.IProfile) => profile);
    this.loading  = store$.map(({loading}: Interface.IProfile) => loading);

    let loadProfile = this.actions
      .filter(({type}: Action) => type === Actions.Profile.LOAD)
      .do(() => this.store.dispatch({type: Actions.Profile.LOADING}))
      .mergeMap(() => this._load());

    Observable
      .merge(loadProfile)
      .subscribe((action: Action) => this.store.dispatch(action));
  }

  load() {
    this.actions.next({type: Actions.Profile.LOAD});
  }

  private _load(): Observable<Action> {
    return this.api.getAll()
      .do((payload: Profile) => this.store.dispatch({type: Actions.Profile.LOADED, payload }))
      .catch((error: any) => {
        this.store.dispatch({type: Actions.Profile.ERROR});
        this.errorHandler.handle(error);
      });
  }
}
