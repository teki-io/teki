import {
  TestComponentBuilder,
  describe,
  expect,
  inject,
  it
} from 'angular2/testing';
import {Component} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {SettingComponent} from './setting.component';

export function main() {
  describe('Setting component', () => {
    it('should work',
      inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb.createAsync(TestComponent)
          .then((rootTC: any) => {
            let settingDOMEl = rootTC.debugElement.children[0].nativeElement;

            expect(DOM.querySelectorAll(settingDOMEl, 'h2')[0].textContent).toEqual('Setting');
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  directives: [SettingComponent],
  template: '<teki-setting></teki-setting>'
})
class TestComponent {}
