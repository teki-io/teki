import { BaseComponent, Model } from '../../shared/index';
import { CORE_DIRECTIVES }     from '@angular/common';
import { SidebarComponent }    from '../sidebar/index';
import { NavBarComponent }   from '../navbar/index';
import * as Service from '../../shared/services/index';
import { Observable }       from 'rxjs/Observable';

@BaseComponent({
  selector: 'teki-app-layout',
  templateUrl: 'app/components/app-layout/app-layout.html',
  styleUrls: ['app/components/app-layout/app-layout.css'],
  directives: [NavBarComponent, SidebarComponent, CORE_DIRECTIVES]
})

export class AppLayoutComponent {
  open:boolean = false;
  profile: Observable<Model.Profile>;
  loading: Observable<boolean>;

  constructor(private profileService: Service.Profile) {
    this.profile = this.profileService.profile;
    this.loading = this.profileService.loading;
  }

  onToggled() {
    this.open = !this.open;
  }
}
