import {
  describe,
  expect,
  inject,
  it
} from '@angular/core/testing';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { BaseComponent } from '../shared/core/index';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';
import { SettingComponent } from './setting';

export function main() {
  describe('Setting component', () => {
    it('should work',
      inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb.createAsync(TestComponent)
          .then((rootTC: any) => {
            let settingDOMEl = rootTC.debugElement.children[0].nativeElement;

            expect(getDOM().querySelectorAll(settingDOMEl, 'h2')[0].textContent).toEqual('Setting');
          });
        }));
    });
}

@BaseComponent({
  selector: 'test-cmp',
  directives: [SettingComponent],
  template: '<teki-setting></teki-setting>'
})
class TestComponent {}
