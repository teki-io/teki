import { Output,
         EventEmitter }      from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router-deprecated';
import { BaseComponent }     from '../../shared/index';

@BaseComponent({
  selector: 'teki-sidebar',
  templateUrl: 'app/components/sidebar/sidebar.html',
  styleUrls: ['app/components/sidebar/sidebar.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class SidebarComponent {
  @Output() toggled:EventEmitter<any> = new EventEmitter();
  jwt: string;

  constructor (public router: Router) {
    this.jwt = localStorage.getItem('jwt');
  }

  toggle() {
    this.toggled.emit({});
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/login');
  }
}
