import { Http, HTTP_PROVIDERS } from '@angular/http';
import { provide, enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { APP_BASE_HREF } from '@angular/common';
import * as App from './app/shared/index';
import { AppComponent } from './app/components/index';
import { AuthConfig, AuthHttp } from 'angular2-jwt/angular2-jwt';
import { provideStore } from '@ngrx/store';
import { MODAL_BROWSER_PROVIDERS } from 'angular2-modal/platform-browser/index';

if ('<%= ENV %>' === 'prod') { enableProdMode(); }

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  MODAL_BROWSER_PROVIDERS,
  provideStore(App.APP_STORE),
  provide(APP_BASE_HREF, { useValue: '<%= APP_BASE %>' }),
  provide(AuthHttp, {
    useFactory: (http: Http) => {
      return new AuthHttp(new AuthConfig({
        noJwtError: true,
        tokenName: 'jwt'
      }), http);
    },
    deps: [Http]
  }),
  App.APP_PROVIDERS
]).catch(err => console.error(err));

// In order to start the Service Worker located at "./worker.js"
// uncomment this line. More about Service Workers here
// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
//
// if ('serviceWorker' in navigator) {
//   (<any>navigator).serviceWorker.register('./worker.js').then((registration: any) =>
//       console.log('ServiceWorker registration successful with scope: ', registration.scope))
//     .catch((err: any) =>
//       console.log('ServiceWorker registration failed: ', err));
// }
