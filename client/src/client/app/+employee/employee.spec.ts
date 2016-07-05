import {
  describe,
  expect,
  inject,
  it
} from '@angular/core/testing';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { BaseComponent } from '../shared/core/index';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';
import {EmployeeComponent} from './employee';

export function main() {
  describe('Employee component', () => {
    it('should work',
      inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb.createAsync(TestComponent)
          .then((rootTC: any) => {
            let settingDOMEl = rootTC.debugElement.children[0].nativeElement;

            expect(getDOM().querySelectorAll(settingDOMEl, 'h2')[0].textContent).toEqual('Employees');
          });
        }));
    });
}

@BaseComponent({
  selector: 'test-cmp',
  directives: [EmployeeComponent],
  template: '<teki-employee></teki-employee>'
})
class TestComponent {}
