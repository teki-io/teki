import { Subscription } from './subscription';
import { Consumer } from './consumer';

/* tslint:disable */
export class Subscriptions {
  private subscriptions: Subscription[] = [];

  constructor(private consumer: Consumer) {}

  create(channel: any, mixin: any = {}) {
    let params = typeof channel === 'object' ? channel : { channel: channel };
    let subscription = new Subscription(this.consumer, params, mixin);
    return this.add(subscription);
  }

  add(subscription: Subscription): Subscription {
    this.subscriptions.push(subscription);
    this.consumer.ensureActiveConnection();
    this.notify(subscription, 'initialized');
    this.sendCommand(subscription, 'subscribe');
    return subscription;
  }

  remove(subscription: Subscription): Subscription {
    this.forget(subscription);
    if (!this.findAll(subscription.identifier).length) {
      this.sendCommand(subscription, 'unsubscribe');
    }
    return subscription;
  }

  reject(identifier: string): void {
    let subscriptions = this.findAll(identifier);
    for (let subscription of subscriptions) {
      this.forget(subscription);
      this.notify(subscription, 'rejected');
    }
  }

  forget(subscription: Subscription): Subscription {
    this.subscriptions = this.subscriptions.filter((s) => s !== subscription);
    return subscription;
  }

  findAll(identifier: string): Subscription[] {
    return this.subscriptions.filter((s) => s.identifier === identifier);
  }

  reload() {
    for (let subscription of this.subscriptions) {
      this.sendCommand(subscription, 'subscribe');
    }
  }

  notifyAll(callbackName: string, ...args) {
    for (let subscription of this.subscriptions) {
      this.notify(subscription, callbackName, args);
    }
  }

  notify(subscription: Subscription, callbackName: any, ...args) {
    let subscriptions: Subscription[] = [subscription];
    for (let subscription of subscriptions) {
      if (typeof subscription[callbackName] === 'function') {
        subscription[callbackName](args);
      }
    }
  };

  notify(subscription: string, callbackName: any, ...args) {
    let subscriptions: Subscription[] = this.findAll(subscription);
    for (let subscription of subscriptions) {
      if (typeof subscription[callbackName] === 'function') {
        subscription[callbackName](args);
      }
    }
  };

  sendCommand(subscription: Subscription, command: string): void {
    let {identifier} = subscription;
    this.consumer.send({
      command: command,
      identifier: identifier
    });
  };
}
/* tslint:enable */
