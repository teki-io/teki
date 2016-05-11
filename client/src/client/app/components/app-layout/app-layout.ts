import { BaseComponent } from '../../shared/index';
import { CORE_DIRECTIVES }     from '@angular/common';
import { SidebarComponent }    from '../sidebar/index';

@BaseComponent({
  selector: 'teki-app-layout',
  templateUrl: 'app/components/app-layout/app-layout.html',
  styleUrls: ['app/components/app-layout/app-layout.css'],
  directives: [SidebarComponent, CORE_DIRECTIVES]
})

export class AppLayoutComponent {
  open:boolean = false;

  onToggled() {
    this.open = !this.open;
  }
}
