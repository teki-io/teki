import {
  Output,
  Input,
  EventEmitter
}      from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router-deprecated';
import { BaseComponent }     from '../../shared/index';
import * as Service from '../../shared/services/index';

@BaseComponent({
  selector: 'teki-sidebar',
  templateUrl: 'app/components/sidebar/sidebar.html',
  styleUrls: ['app/components/sidebar/sidebar.css'],
  directives: [ROUTER_DIRECTIVES]
})

export class SidebarComponent {
  @Output() toggled:EventEmitter<any> = new EventEmitter();
  @Input()  open:boolean = false;

  constructor (public router: Router, private authService: Service.Auth) {}

  toggle() {
    this.toggled.emit({});
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
