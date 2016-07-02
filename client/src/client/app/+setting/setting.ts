import { BaseComponent } from '../shared/core/index';
import { LangSwitcherComponent } from '../shared/i18n/index';
import { PrivatePage, Model } from '../shared/index';
import { Widget }           from '../components/widget/index';
import { WidgetBody }       from '../components/widget-body/index';
import { AppLayoutComponent } from '../components/app-layout/index';
import * as Service from '../shared/services/index';
import { Observable }       from 'rxjs/Observable';

@BaseComponent({
  selector: 'teki-setting',
  templateUrl: 'app/+setting/setting.html',
  styleUrls: ['app/+setting/setting.css'],
  directives: [LangSwitcherComponent, AppLayoutComponent, Widget, WidgetBody]
})

@PrivatePage()
export class SettingComponent {
  profile: Observable<Model.Profile>;
  constructor(private profileService: Service.Profile) {
    this.profile = this.profileService.profile;
  }
}
