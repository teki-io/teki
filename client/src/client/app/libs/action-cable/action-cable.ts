import { Injectable } from '@angular/core';
import { Consumer } from './consumer';

/* tslint:disable */
@Injectable()
export class ActionCable {
  static INTERNAL = {
    'message_types': {
      'welcome': 'welcome',
      'ping': 'ping',
      'confirmation': 'confirm_subscription',
      'rejection': 'reject_subscription'
    },
    'default_mount_path': '/cable',
    'supported_protocols': ['actioncable-v1-json'],
    'unsupported_protocol': 'actioncable-unsupported'
  };

  private debugging: boolean = false;

  createConsumer(url: string) {
    url = url || this.getConfig('url') || ActionCable.INTERNAL.default_mount_path;
    return new Consumer(this.createWebSocketURL(url), this);
  }

  getConfig(name: string): string {
    let element = document.head.querySelector(`meta[name='action-cable-${name}']`);
    return element !== null ? element.getAttribute('content') : void 0;
  }

  createWebSocketURL(url: string): string {
    let a: any;
    if (url && !/^wss?:/i.test(url)) {
      a = document.createElement('a');
      a.href = url;
      a.href = a.href;
      a.protocol = a.protocol.replace('http', 'ws');
      return a.href;
    } else {
      return url;
    }
  }

  startDebugging() {
    this.debugging = true;
  };

  stopDebugging() {
    this.debugging = false;
  }

  log(...args: string[]) {
    if (this.debugging) {
      return console.log.apply(console, ['[ActionCable]'].concat([Date.now(), ...args]));
    }
  }
}
/* tslint:enable */
