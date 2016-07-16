import { Consumer } from './consumer';
import { Subscriptions } from './subscriptions';
import { ConnectionMonitor } from './connection-monitor';
import { ActionCable } from './action-cable';

/* tslint:disable */
let bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

export class Connection {
  message_types = ActionCable.INTERNAL.message_types;
  reopenDelay = 500;
  protocols = [...ActionCable.INTERNAL.supported_protocols,
    ActionCable.INTERNAL.unsupported_protocol];
  monitor: ConnectionMonitor;
  subscriptions: Subscriptions;
  disconnected: boolean = true;
  webSocket: any = null;
  supportedProtocols: string[] = ActionCable.INTERNAL.supported_protocols;
  unsupportedProtocol: string = ActionCable.INTERNAL.unsupported_protocol;

  constructor(private consumer: Consumer, public actionCable: ActionCable) {
    this.subscriptions = this.consumer.subscriptions;
    this.monitor = new ConnectionMonitor(this, this.actionCable);
    this.open = bind(this.open, this);
  }

  send(data: any): boolean {
    if (this.isOpen) {
      this.webSocket.send(JSON.stringify(data));
      return true;
    } else {
      return false;
    }
  }

  open(): boolean {
    if (this.isActive) {
      this.actionCable.log(
        'Attempted to open WebSocket, but existing socket is ' + (this.getState())
      );
      throw new Error('Existing connection must be closed before opening');
    } else {
      this.actionCable.log(
        `Opening WebSocket, current state is ${this.getState()}, subprotocols: ${this.protocols}`
      );
      if (this.webSocket !== null) {
        this.uninstallEventHandlers();
      }
      this.webSocket = new WebSocket(this.consumer.url, this.protocols);
      this.installEventHandlers();
      this.monitor.start();
      return true;
    }
  };

  close({allowReconnect} = { allowReconnect: true }) {
    if (!allowReconnect) {
      this.monitor.stop();
    }
    if (this.isActive && this.webSocket !== null) {
      this.webSocket.close();
    }
  }

  reopen() {
    this.actionCable.log(`Reopening WebSocket, current state is ${this.getState()}`);
    if (this.isActive) {
      try {
        this.close();
      } catch (error) {
        this.actionCable.log('Failed to reopen WebSocket', error);
      } finally {
        this.actionCable.log(`Reopening WebSocket in ${this.reopenDelay}ms`);
        setTimeout(this.open, this.reopenDelay);
      }
    } else {
      this.open();
    }
  }

  getProtocol() {
    return (this.webSocket !== null ) ? this.webSocket.protocol : null;
  }

  get isActive(): boolean {
    return this.isState('open', 'connecting');
  }

  get isOpen(): boolean {
    return this.isState('open');
  }

  isProtocolSupported() {
    return this.supportedProtocols.indexOf(this.getProtocol()) >= 0;
  }

  isState(...states: string[]): boolean {
    return states.indexOf(this.getState()) > -1;
  }

  getState(): string {
    for (let state in WebSocket) {
      let value = WebSocket[state];
      if (this.webSocket !== null && value === this.webSocket.readyState) {
        return state.toLowerCase();
      }
    }
    return null;
  }




  installEventHandlers() {
    for (let eventName in this.events) {
      let handler = this.events[eventName].bind(this);
      this.webSocket['on' + eventName] = handler;
    }
  }

  uninstallEventHandlers() {
    for (let eventName in this.events) {
      this.webSocket['on' + eventName] = function() {};
    }
  }

  events = {
    message: function(event) {
      if (!this.isProtocolSupported()) {
        return;
      }
      let {identifier, message, type} = JSON.parse(event.data);
      switch (type) {
        case this.message_types.welcome:
          this.monitor.recordConnect();
          return this.subscriptions.reload();
        case this.message_types.ping:
          return this.monitor.recordPing();
        case this.message_types.confirmation:
          return this.subscriptions.notify(identifier, 'connected');
        case this.message_types.rejection:
          return this.subscriptions.reject(identifier);
        default:
          return this.subscriptions.notify(identifier, 'received', message);
      }
    },
    open: function() {
      this.actionCable.log(`WebSocket onopen event, using '${this.getProtocol()}' subprotocol`);
      this.disconnected = false;
      if (!this.isProtocolSupported()) {
        this.actionCable.log('Protocol is unsupported. Stopping monitor and disconnecting.');
        return this.close({
          allowReconnect: false
        });
      }
    },
    close: function(event) {
      this.actionCable.log('WebSocket onclose event');
      if (this.disconnected) {
        return;
      }
      this.disconnected = true;
      this.monitor.recordDisconnect();
      return this.subscriptions.notifyAll('disconnected', {
        willAttemptReconnect: this.monitor.isRunning
      });
    },
    error: function() {
      return this.actionCable.log('WebSocket onerror event');
    }
  };
}
/* tslint:enable */
