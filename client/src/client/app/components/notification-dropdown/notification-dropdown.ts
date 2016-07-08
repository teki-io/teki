import { HostListener } from '@angular/core';
import { BaseComponent, Model }     from '../../shared/index';
import { ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';
import * as Service from '../../shared/services/index';
import { Observable }       from 'rxjs/Observable';

@BaseComponent({
  selector: 'teki-notification-dropdown',
  templateUrl: 'app/components/notification-dropdown/notification-dropdown.html',
  styleUrls: ['app/components/notification-dropdown/notification-dropdown.css'],
  directives: [ROUTER_DIRECTIVES]
})

export class NotificationDropdownComponent {
  profile: Observable<Model.Profile>;
  clicked: boolean = false;

  constructor(private router: Router) {}

  @HostListener('click')
  public click() {
    this.clicked = !this.clicked;
  }
}
