import * as moment from 'moment';

export class Notification {
  id:         number;
  body:       string;
  isRead:     boolean;
  createdAt:  moment.Moment;

  constructor(data: any) {
    this.id         = data.id;
    this.body       = data.body;
    this.isRead     = data.isRead;
    this.createdAt  = data.createdAt;
  }
}
