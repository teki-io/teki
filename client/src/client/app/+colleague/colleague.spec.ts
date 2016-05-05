import {
  TestComponentBuilder,
  describe,
  expect,
  inject,
  it
} from 'angular2/testing';
import { BaseComponent } from '../shared/core/index';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {ColleagueComponent} from './colleague';

export function main() {
  describe('Colleague component', () => {
    it('should work',
      inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb.createAsync(TestComponent)
          .then((rootTC: any) => {
            let settingDOMEl = rootTC.debugElement.children[0].nativeElement;

            expect(DOM.querySelectorAll(settingDOMEl, 'h2')[0].textContent).toEqual('Colleague');
          });
        }));
    });
}

@BaseComponent({
  selector: 'test-cmp',
  directives: [ColleagueComponent],
  template: '<teki-colleague></teki-colleague>'
})
class TestComponent {}
