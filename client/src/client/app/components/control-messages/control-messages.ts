import { Host, Input } from '@angular/core';
import { NgFormModel } from '@angular/common';
import { BaseComponent } from './../../shared/index';

@BaseComponent({
  selector: 'control-messages',
  template: `<div *ngIf="errorCode !== null">{{ errorCode | translate }}</div>`
})

export class ControlMessages {
  @Input() control: string;
  constructor(@Host() private _formDir: NgFormModel) { }

  get errorCode() {
    let c = this._formDir.form.find(this.control);

    for (let propertyName in c.errors) {
      return `error.${propertyName}`;
    }

    return null;
  }
}
