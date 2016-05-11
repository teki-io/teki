import {
  describe,
  expect,
  inject,
  it
} from '@angular/core/testing';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { BaseComponent } from '../shared/core/index';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';
import {TeamComponent} from './team';

export function main() {
  describe('Team component', () => {
    it('should work',
      inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb.createAsync(TestComponent)
          .then((rootTC: any) => {
            let settingDOMEl = rootTC.debugElement.children[0].nativeElement;

            expect(getDOM().querySelectorAll(settingDOMEl, 'h2')[0].textContent).toEqual('Team');
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
