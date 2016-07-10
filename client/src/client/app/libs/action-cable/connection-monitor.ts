import { Connection } from './connection';
import { ActionCable } from './action-cable';

/* tslint:disable */
let bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

export class ConnectionMonitor {
  static clamp(numb: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, numb));
  };
  static now() { return new Date().getTime(); }
  static secondsSince(time: Date): number { return (ConnectionMonitor.now() - time) / 1000; };

  pollInterval: any = {
    min: 3,
    max: 30
  };

  staleThreshold = 6;
  reconnectAttempts: number = 0;
  startedAt = null;
  stoppedAt = null;
  pingedAt = null;
  disconnectedAt = null;
  pollTimeout = null;

  constructor(private connection: Connection, private actionCable: ActionCable) {
    this.visibilityDidChange = bind(this.visibilityDidChange, this);
  }

  start() {
    if (!this.isRunning) {
      this.startedAt = ConnectionMonitor.now();
      this.stoppedAt = null;
      this.startPolling();
      document.addEventListener('visibilitychange', this.visibilityDidChange);
      this.actionCable.log(
        `ConnectionMonitor started. pollInterval = ${this.getPollInterval()} ms`
      );
    }
  }

  stop() {
    if (this.isRunning) {
      this.stoppedAt = ConnectionMonitor.now();
      this.stopPolling();
      document.removeEventListener('visibilitychange', this.visibilityDidChange);
      this.actionCable.log('ConnectionMonitor stopped');
    }
  };

  get isRunning(): boolean {
    return this.startedAt && !this.stoppedAt;
  }

  recordPing() {
    this.pingedAt = ConnectionMonitor.now();
  };

  recordConnect() {
    this.reconnectAttempts = 0;
    this.recordPing();
    this.disconnectedAt = null;
    this.actionCable.log('ConnectionMonitor recorded connect');
  }

  recordDisconnect() {
    this.disconnectedAt = ConnectionMonitor.now();
    this.actionCable.log('ConnectionMonitor recorded disconnect');
  }

  startPolling() {
    this.stopPolling();
    this.poll();
  }

  stopPolling() {
    clearTimeout(this.pollTimeout);
  }

  poll() {
    this.pollTimeout = setTimeout(() => {
      this.reconnectIfStale();
      this.poll();
    }, this.getPollInterval());
  }

  getPollInterval(): number {
    let {min, max} = this.pollInterval;
    let interval = 5 * Math.log(this.reconnectAttempts + 1);
    return Math.round(ConnectionMonitor.clamp(interval, min, max) * 1000);
  }

  reconnectIfStale() {
    if (this.connectionIsStale()) {
      this.actionCable.log(`ConnectionMonitor detected stale connection.
        reconnectAttempts = ${this.reconnectAttempts}, pollInterval = ${this.getPollInterval()} ms,
        time disconnected = ${ConnectionMonitor.secondsSince(this.disconnectedAt)}s,
        stale threshold = ${this.staleThreshold} s`);
      this.reconnectAttempts++;
      if (this.disconnectedRecently()) {
        this.actionCable.log('ConnectionMonitor skipping reopening recent disconnect');
      } else {
        this.actionCable.log('ConnectionMonitor reopening');
        this.connection.reopen();
      }
    }
  }

  connectionIsStale(): boolean {
    return ConnectionMonitor.secondsSince((this.pingedAt || this.startedAt)) > this.staleThreshold;
  }

  disconnectedRecently(): boolean {
    return this.disconnectedAt &&
      ConnectionMonitor.secondsSince(this.disconnectedAt) < this.staleThreshold;
  }


  visibilityDidChange() {
    if (document.visibilityState === 'visible') {
      setTimeout(() => {
        if (this.connectionIsStale() || !this.connection.isOpen) {
          this.actionCable.log(`ConnectionMonitor reopening stale connection on visibilitychange.
          visbilityState = ${document.visibilityState}`);
          this.connection.reopen();
        }
      }, 200);
    }
  }
}
/* tslint:enable */
