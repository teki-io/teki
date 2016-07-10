import { Consumer } from './consumer';

/* tslint:disable */
export class Subscription {
  identifier: string;
  static extend(object: any, properties: any = {}): any {
    var key, value;
    for (key in properties) {
      value = properties[key];
      object[key] = value;
    }
    return object;
  };

  constructor(private consumer: Consumer, params: any = {}, mixin: any = {}) {
    this.identifier = JSON.stringify(params);
    Subscription.extend(this, mixin);
  }

  perform(action: string, data: any = {}): void {
    data.action = action;
    this.send(data);
  }

  send(data: any = {}): void {
    this.consumer.send({
      command: 'message',
      identifier: this.identifier,
      data: JSON.stringify(data)
    });
  }

  unsubscribe(): void {
    this.consumer.subscriptions.remove(this);
  }
}
/* tslint:enable */
