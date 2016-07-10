import {
  BaseComponent,
  SecurityRouterOutlet,
  MultilingualService
} from '../../shared/index';
import { CORE_DIRECTIVES } from '@angular/common';
import {
  Router,
  ROUTER_DIRECTIVES,
  RouterLink,
  RouteConfig
} from '@angular/router-deprecated';
import { TekiRoutes } from './routes';
import { ViewContainerRef } from '@angular/core';
import { Modal, BS_MODAL_PROVIDERS } from 'angular2-modal/plugins/bootstrap/index';
import { Loading } from '../loading/index';
import * as Service from '../../shared/services/index';
import { ActionCable, Consumer } from '../../libs/action-cable/index';

@BaseComponent({
  selector: 'teki-app',
  templateUrl: 'app/components/app/app.html',
  styleUrls: ['app/components/app/app.css'],
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, SecurityRouterOutlet, Loading, RouterLink],
  viewProviders: [...BS_MODAL_PROVIDERS],
  providers: [MultilingualService, ActionCable]
})

//TODO: switch home route based on permissions
@RouteConfig(TekiRoutes)

export class AppComponent {
  constructor(
    public router: Router,
    private modal: Modal,
    private multilang: MultilingualService,
    private viewContainer: ViewContainerRef,
    private profileService: Service.Profile,
    private authService: Service.Auth,
    private cable: ActionCable
  ) {
    modal.defaultViewContainer = viewContainer;
    this.authService.loggedIn.subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        router.navigateByUrl('/');
      }
    });
    let test: Consumer = this.cable.createConsumer('ws://localhost:3000/cable');
    setTimeout(() => {
      test.subscriptions.create({channel: 'NotificationChannel'}, {
        connected: () => {
          console.log('connected');
        }
      });
    }, 3000);
  }

  ngOnInit() {
    this.profileService.load();
  }
}
