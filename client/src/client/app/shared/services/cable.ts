import { Injectable } from '@angular/core';
import * as Model             from '../models/index';
import * as Actions           from '../actions/index';
import * as Interface         from '../interfaces/index';
import {
  ActionCable,
  Consumer
} from '../../libs/action-cable/index';
import { Store }      from '@ngrx/store';

import 'rxjs/add/operator/map';

@Injectable()
export class Cable {
  actionCable: ActionCable;
  consumer: Consumer;

  constructor(private store: Store<Interface.AppStore>) {
    this.actionCable = new ActionCable();
  }

  start() {
    this.consumer = this.actionCable.createConsumer(`ws://localhost:3000/cable?jwt=${localStorage.getItem('jwt')}`);
  }

  subscribe() {
    this.consumer.subscriptions.create({channel: 'NotificationChannel'}, {
      connected: () => {
        console.log('connected');
      },
      received: (data: any[]) => {
        this.parse(data);
        //TODO: need a service to distinguish the type of notificaiton
        //TODO: based on the notification, need to dispatch new information
        this.store.dispatch({type: Actions.Notification.ADDED, payload: this.parse(data)});
      }
    });
  }

  parse(data: any[]): Model.Notification[] {
    return data.map(d => new Model.Notification(d));
  }
}
