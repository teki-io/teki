import * as moment from 'moment';

export class ShiftTemplate {
  id:           number;
  startTime:    moment.Moment;
  endTime:      moment.Moment;
  name:         string;
  nickName:     string;
  notes:        string;
  sort:         number;

  constructor(data: any) {
    this.id        = data.id;
    this.startTime = moment(data.startTime, 'HH:mm');
    this.endTime   = moment(data.endTime, 'HH:mm');
    this.notes     = data.notes;
    this.name      = data.name;
    this.nickName  = data.nickName;
    this.sort      = data.sort || 0;
  }
}
