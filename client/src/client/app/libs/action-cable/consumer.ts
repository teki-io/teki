import { Subscriptions } from './subscriptions';
import { Connection } from './connection';
import { ActionCable } from './action-cable';

/* tslint:disable */
export class Consumer {
  public subscriptions: Subscriptions;
  connection: Connection;

  constructor(public url: string, actionCable: ActionCable) {
    this.url = url;
    this.subscriptions = new Subscriptions(this);
    this.connection = new Connection(this, actionCable);
  }

  send(data: any): void {
    this.connection.send(data);
  }

  connect(): void {
    this.connection.open();
  }

  disconnect(): void {
    this.connection.close({ allowReconnect: false });
  }

  ensureActiveConnection(): void {
    if (!this.connection.isActive) {
      this.connection.open();
    }
  }
}
/* tslint:enable */
