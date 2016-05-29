import * as moment from 'moment';

export class Shift {
  id:              number;
  startTime:       moment.Moment;
  endTime:         moment.Moment;
  notes:           string;
  name:            string;
  nickName:        string;
  shiftTemplateId: number;
  employeeName:    string;
  employeeId:      number;

  constructor(data: any) {
    this.id              = data.id;
    this.startTime       = moment.utc(data.startTime, 'YYYY-MM-DDTHH:mm:ss').local();
    this.endTime         = moment.utc(data.endTime,'YYYY-MM-DDTHH:mm:ss').local();
    this.notes           = data.notes;
    this.name            = data.name;
    this.nickName        = data.nickName;
    this.employeeName    = data.employeeName;
    this.shiftTemplateId = data.shiftTemplateId;
    this.employeeId      = data.employeeId;
  }
}
