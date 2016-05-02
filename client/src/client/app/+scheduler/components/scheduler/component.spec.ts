import {
  TestComponentBuilder,
  describe,
  expect,
  inject,
  it
} from 'angular2/testing';
import {Component} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {SchedulerComponent} from './component';

export function main() {
  describe('About component', () => {
    it('should work',
      inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb.createAsync(TestComponent)
          .then((rootTC: any) => {
            let schedulerDOMEl = rootTC.debugElement.children[0].nativeElement;

            expect(DOM.querySelectorAll(schedulerDOMEl, 'h2')[0].textContent).toEqual('Features');
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  directives: [SchedulerComponent],
  template: '<teki-scheduler></teki-scheduler>'
})
class TestComponent {}
