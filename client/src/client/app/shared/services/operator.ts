import { Injectable } from 'angular2/core';
import * as _ from 'lodash';

@Injectable()
export class Operator {
  static update(array: any[], data: any):void {
    let index = _.findIndex(array, {id: data.id});
    if (index > -1) {
      array[index] = data;
    } else {
      array.unshift(data);
    }
  }
}
