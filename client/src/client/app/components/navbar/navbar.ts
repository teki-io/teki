import { BaseComponent, Model }     from '../../shared/index';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import * as Service from '../../shared/services/index';
import { Observable }       from 'rxjs/Observable';
import { UserDropdownComponent } from '../user-dropdown/index';

@BaseComponent({
  selector: 'teki-navbar',
  templateUrl: 'app/components/navbar/navbar.html',
  styleUrls: ['app/components/navbar/navbar.css'],
  directives: [ROUTER_DIRECTIVES, UserDropdownComponent]
})

export class NavBarComponent {
  profile: Observable<Model.Profile>;

  constructor(private profileService: Service.Profile) {
    this.profile = this.profileService.profile;
  }
}
