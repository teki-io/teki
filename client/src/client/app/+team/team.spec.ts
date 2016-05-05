import {
  TestComponentBuilder,
  describe,
  expect,
  inject,
  it
} from 'angular2/testing';
import { BaseComponent } from '../shared/core/index';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {TeamComponent} from './team';

export function main() {
  describe('Team component', () => {
    it('should work',
      inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb.createAsync(TestComponent)
          .then((rootTC: any) => {
            let settingDOMEl = rootTC.debugElement.children[0].nativeElement;

            expect(DOM.querySelectorAll(settingDOMEl, 'h2')[0].textContent).toEqual('Team');
          });
        }));
    });
}

@BaseComponent({
  selector: 'test-cmp',
  directives: [TeamComponent],
  template: '<teki-team></teki-team>'
})
class TestComponent {}
