import { Injectable } from '@angular/core';
import { TimerWrapper } from 'angular2/src/facade/async';

@Injectable()
export class DragulaServiceHelper {
  hasClass(el: any, name: string): boolean {
    return el.className.indexOf(name) > 0;
  }

  addClass(el: any, name: string) {
    if (!this.hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(' ') : name;
    }
  }

  removeClass(el: any, name: string) {
    if (this.hasClass(el, name)) {
      el.className = el.className.replace(name, '');
    }
  }

  onDrag(args: any) {
    let [e] = args;
    this.removeClass(e, 'ex-moved');
  }

  onDrop(args: any) {
    let [e] = args;
    this.addClass(e, 'ex-moved');
    TimerWrapper.setTimeout(() => {
      this.removeClass(e, 'ex-moved');
    }, 200);
  }
}
