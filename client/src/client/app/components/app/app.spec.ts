import {
  describe,
  expect,
  inject,
  it,
  beforeEachProviders
} from '@angular/core/testing';
import { TestComponentBuilder } from '@angular/compiler/testing';
import {Component, provide} from '@angular/core';
import {DirectiveResolver} from '@angular/compiler';

import {RouteRegistry, ROUTER_PRIMARY_COMPONENT} from '@angular/router-deprecated';
import {Location} from '@angular/common';
import {SpyLocation} from '@angular/common/testing';

import {getDOM} from '@angular/platform-browser/src/dom/dom_adapter';
import {AppComponent} from './app';

export function main() {

  describe('App component', () => {

    // Support for testing component that uses Router
    beforeEachProviders(() => [
      RouteRegistry,
      DirectiveResolver,
      provide(Location, {useClass: SpyLocation}),
      provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent})
    ]);

    it('should work',
      inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb.createAsync(TestComponent)
          .then(rootTC => {
            rootTC.detectChanges();
            let appDOMEl = rootTC.debugElement.children[0].nativeElement;
            expect(getDOM().querySelectorAll(appDOMEl, 'teki-app > teki-navbar > nav > a')[1].href)
              .toMatch(/http:\/\/localhost:\d+\/about/);
          });
      }));
  });
}

@Component({
  selector: 'test-cmp',
  template: '<teki-app></teki-app>',
  directives: [AppComponent]
})
class TestComponent {}
