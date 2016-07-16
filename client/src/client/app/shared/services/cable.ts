import { Injectable } from '@angular/core';
import * as Model             from '../models/index';
import * as Actions           from '../actions/index';
import * as Interface         from '../interfaces/index';
import {
  ActionCable,
  Consumer
} from '../../libs/action-cable/index';
import { Store }      from '@ngrx/store';
import { NotificationTypes } from './cable/notification-types';

import 'rxjs/add/operator/map';

interface IActionCableNotification {
  type: string;
  payload: Model.Notification;
}

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
        let cableNotifications = this.parse(data);
        //TODO: based on the notification, dispatch new objects
        //EX: if user is assigned with new shift, need to dispatch ACTIONS.SHIFT.ADDED
        cableNotifications.forEach((cableNotification) => {
          switch (cableNotification.type) {
            case NotificationTypes.USER_HAS_BEEN_ASSIGNED_SHIFT:
              this.store.dispatch({type: Actions.Notification.ADDED, payload: cableNotification.payload});
              break;
            default:
              break;
          }
        });
      }
    });
  }

  parse(data: any[]): IActionCableNotification[] {
    return data.map(d => JSON.parse(d))
      .map(d => <IActionCableNotification>{ type: d.type, payload: new Model.Notification(d.payload)});
  }
}
