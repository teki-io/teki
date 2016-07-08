import { HostListener } from '@angular/core';
import { BaseComponent, Model }     from '../../shared/index';
import * as Service from '../../shared/services/index';
import { Observable }       from 'rxjs/Observable';

@BaseComponent({
  selector: 'teki-notification-dropdown',
  templateUrl: 'app/components/notification-dropdown/notification-dropdown.html',
  styleUrls: ['app/components/notification-dropdown/notification-dropdown.css']
})

export class NotificationDropdownComponent {
  notifications: Observable<Model.Notification[]>;
  clicked: boolean = false;

  constructor(private notificationsService: Service.Notification) {
    this.notifications = this.notificationsService.notifications;
  }

  ngOnInit() {
    this.notificationsService.load();
  }

  @HostListener('click')
  public click() {
    this.clicked = !this.clicked;
  }
}
