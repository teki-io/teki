import { HostListener } from '@angular/core';
import { BaseComponent, Model }     from '../../shared/index';
import { ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';
import * as Service from '../../shared/services/index';
import { Observable }       from 'rxjs/Observable';

@BaseComponent({
  selector: 'teki-user-dropdown',
  templateUrl: 'app/components/user-dropdown/user-dropdown.html',
  styleUrls: ['app/components/user-dropdown/user-dropdown.css'],
  directives: [ROUTER_DIRECTIVES]
})

export class UserDropdownComponent {
  profile: Observable<Model.Profile>;
  clicked: boolean = false;

  constructor(private profileService: Service.Profile, private router: Router) {
    this.profile = this.profileService.profile;
  }

  public logout() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/login');
  }

  @HostListener('click')
  public click() {
    this.clicked = !this.clicked;
  }
}
